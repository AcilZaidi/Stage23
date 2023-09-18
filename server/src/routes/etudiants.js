import  express  from "express";
import {etudiantModel} from '../models/etudiants.js';


const router = express.Router();

router.post("/",async (req , res) => {
    const etudiant = new etudiantModel(req.body);
        
        // autre notation : ...req.body, aya haja f body 
        // wala direct etudiantModel(req.body)
    
    try{
        const response = await etudiant.save();
        res.json(response);
    }
    catch(err){res.json(err)}
});

router.get("/",async (req , res) => {
    try{
        const response = await etudiantModel.find({});
        res.json(response);
    }
    catch(err){res.json(err)}
});

// get by id
router.get("/:id", async(req, res )=>{
    const etudiantId = req.params.id;
    try {
        const foundEtudiant = await etudiantModel.findById(etudiantId);
        if(!foundEtudiant) {
            return res.status(404).json({message : 'Error fetching Etudiant'})
        }
        res.json(foundEtudiant);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching etudiant', error: err.message });
    }
})

router.delete("/:id", async (req, res) => {
    const etudiantId = req.params.id;

    try {
        const deletedEtudiant = await etudiantModel.findByIdAndDelete(etudiantId);

        if (!deletedEtudiant) {
            return res.status(404).json({ message: "Etudiant not found" });
        }

        res.json({ message: "Etudiant deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting etudiant", error: err.message });
    }
});

/* router.delete("/:id",async (req , res) => {
    const etudidant = new etudiantModel(req.body);
        
        // autre notation : ...req.body, aya haja f body 
        // wala direct etudiantModel(req.body)
    
    try{
        const response = await etudidant.save();
        res.json(response);
    }
    catch(err){res.json(err)}
}); */

router.put("/:id", async (req, res) => {
    const etuidantId = req.params.id;

    try {
        const updatedEtudiant = await etuidantModel.findByIdAndUpdate(etuidantId, req.body, { new: true });

        if (!updatedEtudiant) {
            return res.status(404).json({ message: "Etudiant not found" });
        }

        res.json(updatedEtudiant);
    } catch (err) {
        res.status(500).json({ message: "Error updating etuidant", error: err.message });
    }
});

export {router as etudiantRouter}; 
