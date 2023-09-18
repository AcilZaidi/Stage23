import express from 'express';
import {equipeModel} from "../models/equipes.js";

const router = express.Router();

// get all equipes
router.get('/', async(req, res) => {
    try {
        const response = await equipeModel.find({});
        return res.json(response);
    } catch (err) {
        res.json(err);
    }
});

// post
router.post("/" , async(req,res) =>{
    const equipe = new equipeModel(req.body);
    try {
        const response = await equipe.save();
    } catch (err) {
        res.json(err);        
    }
});

// delete
router.delete("/:id", async(req, res) =>{
    try {
       /*  const equipe = await equipeModel ;
        equipe.findByIdAndRemove(req.params.id) */
        // a tester
        const reponse = await equipeModel.findByIdAndRemove(req.params.id);
        res.json(reponse);
    } catch (err) {
        res.json(err);        
    }
});

export { router as equipeRouter};