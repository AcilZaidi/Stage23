import mongoose from 'mongoose';


const salleSchema = mongoose.Schema(
    {
        nombreSalle : {
            type: String,
            required : true
        },
        
    }
);

export const salleModel = mongoose.model("salles" , salleSchema);