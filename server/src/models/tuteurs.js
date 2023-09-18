import mongoose from 'mongoose';

const tuteurSchema = mongoose.Schema({
    nom: {
        type :String,
        required : true 
    },
    prenom :{
        type :String,
        required : true
    },
    telephone: {
        type :Number,
        unique :true
    } ,
    email : {
        type :String,
        required : true,
        
    },
    departement : {
        type :String,
        required : true
    },
    savedEquipe : [{ type :mongoose.Schema.Types.ObjectId , ref : "equipes"}],
});

export const tuteurModel = mongoose.model("tuteurs" , tuteurSchema)