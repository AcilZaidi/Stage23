import express from "express";
import multer from "multer";
import { salleModel } from "../models/salles.js";
import excelToJson from 'convert-excel-to-json'
import xlsx from 'xlsx'

const router = express.Router();

// get all salles
router.get("/", async (req, res) => {
  try {
    const response = await salleModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
// get one
router.get("/:id", async (req, res) => {
  const salleId = req.params.id;
  try {
    const foundSalle = await salleModel.findById(salleId); // Corrected part
    if (!foundSalle) {
      return res.status(404).send("Salle not found");
    }
    res.json(foundSalle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving salle", error: error.message });
  }
});
// post
router.post("/", async (req, res) => {
  const salle = new salleModel(req.body);

  // autre notation : ...req.body, aya haja f body
  // wala direct salleModel(req.body)

  try {
    const response = await salle.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const salleId = req.params.id;

  try {
    const deletedSalle = await salleModel.findByIdAndDelete(salleId);

    if (!deletedSalle) {
      return res.status(404).json({ message: "Salle not found" });
    }

    res.json({ message: "Salle deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting salle", error: err.message });
  }
});
// put
router.put("/:id", async (req, res) => {
  const salleId = req.params.id;

  try {
    const updatedSalle = await salleModel.findByIdAndUpdate(salleId, req.body, {
      new: true,
    });

    if (!updatedSalle) {
      return res.status(404).json({ message: "Salle not found" });
    }

    res.json(updatedSalle);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating salle", error: err.message });
  }
});

// upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/"); // Set the directory where files will be saved
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
});

router.post("/api/upload-excel", upload.single("file"), async (req, res) => {
    try {
      const jsonData = excelToJson({
        source: req.file.buffer, // Excel file buffer
        columnToKey: {
          A: 'nombreSalle', // Map Excel column to your data field
        },
      });
  
      if (!jsonData || !jsonData.Sheet1) {
        return res.status(400).json({ error: "Invalid Excel data" });
      }
  
      const salleDataArray = jsonData.Sheet1; // Change 'Sheet1' to your actual sheet name
      const insertedSalles = [];
  
      for (const salleData of salleDataArray) {
        const newSalle = new salleModel({
          nombreSalle: salleData.nombreSalle,
        });
  
        const insertedSalle = await newSalle.save();
        insertedSalles.push(insertedSalle);
      }
  
      res.json({ message: "Data imported successfully", insertedSalles });
    } catch (error) {
      console.error("Error importing data:", error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
//

export { router as salleRouter };
