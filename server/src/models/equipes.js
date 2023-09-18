import mongoose from 'mongoose';

const equipeSchema = mongoose.Schema({
    ID : {
        type : Number ,
        required: true,
    },
    tuteur :{
        type :  mongoose.Schema.Types.ObjectId ,   ref : "tuteurs" ,
        required : true ,    
    },
    etudiants : [{
        type : mongoose.Schema.Types.ObjectId , ref : "etudiants",
        required : true ,
    }],
    salle : {
        type : mongoose.Schema.Types.ObjectId , ref : "salles",
        required : true,
    }
});

export const equipeModel = mongoose.model("equipes" , equipeSchema)