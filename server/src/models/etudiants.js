import mongoose from "mongoose";

const EtudiantSchema = mongoose.Schema(
    {   ID :{
        type: String,
        required: true,
        min : 8
    },
        nom: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      prenom: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      specialite : {
        type: String,
        required: true,
      },
       CI : {
        type: String ,
        required: true,
      }, 
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      }}
);
export const etudiantModel = mongoose.model("etudiants",EtudiantSchema);