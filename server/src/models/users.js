import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
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
          email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
          },
          password: {
            type: String,
            required: true,
            min: 5,
          }/* ,
          departement :{
            type: String,
            required: true,
            min: 5,
          }, */
          /* ,
          picturePath: {
            type: String,
            default: "",
          } */
    }
);
export const userModel = mongoose.model("user",userSchema);
