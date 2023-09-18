import  express  from "express";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { userModel } from "../models/users.js";


const router = express.Router();

 router.post("/register", async ( req , res) => {
    const{nom, prenom, email, password} =req.body;
    const user = await userModel.findOne({email});

    if(user)
    {
        return res.json({message :"user existant"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newuser = new userModel({nom, prenom, email, password:hashedPassword});
    await newuser.save();
    res.json({message : "saved successfully !"});
});

router.post("/login", async ( req , res) =>{
    const { email , password} = req.body;
    const user = await userModel.findOne({email});

    if(!user)
    {
        return res.json({message :"user non existant"})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if (!password){
        return res.json({message : "wrong password!!"});
    }
    // generate token
    const token = jwt.sign({ id : user._id} , "secret");
    res.json({token , userId : user._id});
}); 

export {router as userRouter}; 