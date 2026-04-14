import dotenv from "dotenv";
import { AuthRequest } from "../middleware.js";
import { Response } from "express";
import { loginSchema, signUpSchema } from "../utils/validatinScehma.js";
import { Usermodel } from "../models/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken"
dotenv.config();



const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT secret is not defined");
}

//Route 1 : Signup logic

export const signupController = async(req:AuthRequest , res: Response) =>{


    try{

        const parsed = signUpSchema.safeParse(req.body);

        if(!parsed.success){

             return res.status(400).json({message:"Invalid input"})
        }

        const {username,password} = parsed.data;


        const existingUser = await Usermodel.findOne({username});
        if(existingUser){

            return  res.status(400).json({message:" User already exits"});

        }

        const hashedPassword =  await bcrypt.hash(password,10)

        await Usermodel.create({

            username,
            password:hashedPassword,
        });

        return res.status(200).json({ message: "User signed up successfully" });


    }
    catch(error){

        return res.status(500).json({ error: "Internal server error" });


    }
}


//login logic

export const loginController = async(req:AuthRequest, res:Response)=>{

    try{

        const parsed = loginSchema.safeParse(req.body)
        if(!parsed.success){

            return  res.status(400).json({ message: "Invalid input" });

        }

        const {username, password} = parsed.data
     
        const user = await Usermodel.findOne({username});

        if(!user){

             return res.status(400).json({ message: "User not found" });

        }

        const isValid = await bcrypt.compare(password ,user.password)
        if(!isValid ){

             return res.status(400).json({message:"Password invalid"})
        }

     const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
       expiresIn: "1h",
     });

        return res.status(200).json({ message: "Login succesfully " ,token});



    }catch(error){


        return res.status(500).json({error:"internal server error"})
    }
}
