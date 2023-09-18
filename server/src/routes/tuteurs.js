import express from 'express';
import { tuteurModel } from '../models/tuteurs.js'

const router = express();

// get all tuteurs
router.get('/' , async(req , res) =>{
    try {
        const response = await tuteurModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});
// Get a specific tuteur by ID
router.get('/:id', async (req, res) => {
    const tuteurId = req.params.id;

    try {
        const foundTuteur = await tuteurModel.findById(tuteurId);

        if (!foundTuteur) {
            return res.status(404).json({ message: 'Tuteur not found' });
        }

        res.json(foundTuteur);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tuteur', error: err.message });
    }
});

// edit
router.put("/:id", async (req, res) => {
    const tuteurId = req.params.id;

    try {
        const updatedTuteur = await tuteurModel.findByIdAndUpdate(tuteurId, req.body, { new: true });

        if (!updatedTuteur) {
            return res.status(404).json({ message: "Tuteur not found" });
        }

        res.json(updatedTuteur);
    } catch (err) {
        res.status(500).json({ message: "Error updating tuteur", error: err.message });
    }
});

// post 
router.post('/',async(req , res) => {
    const tuteur = new tuteurModel(req.body);
    try {
        const response = await tuteur.save();
        console.log("maarche")
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.delete("/:id", async (req, res) => {
    const tuteurId = req.params.id;

    try {
        const deletedTuteur = await tuteurModel.findByIdAndDelete(tuteurId);

        if (!deletedTuteur) {
            return res.status(404).json({ message: "Tuteur not found" });
        }

        res.json({ message: "Tuteur deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting tuteur", error: err.message });
    }
});

export { router as tuteurRouter};