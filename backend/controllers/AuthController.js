import {User} from "../models/UserModel.js";
import bcrypt from "bcrypt"
import {generateToken} from "../utils/generateToken.js";

export const login = async (req,res) => {
    const {email , password } =  req.body

    try {
        const user =  await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false , message: "User not found"});
        }
        const passmatch =  bcrypt.compare(password, user.password);
        if(!passmatch){
            return res.status(400).json({success:false, message: "Invalid credentials"});
        }
        const token = await generateToken(user._id);
        return res.status(200).json({success:true , message: "Login successful", token});
        
        
    } catch (error) {
        res.status(500).json({success:false , message: "Internal server error"});
    }
    
}


export const register = async (req, res) => {
    const {name,email,password} = req.body

    try {
        const user = await User.findOne({email});
        if(user){
            return res.status(404).json({succes:false , message:"user already exists"})
        }

        const hashedpassword = await bcrypt.hash(password,10)
        const newUser = await User.create({name,email,password:hashedpassword});

        const token = await generateToken(newUser._id);
        return res.status(201).json({success:true , message:"User registered successfully", newUser:{name:newUser.name, email:newUser.email}, token})
    } catch (error) {
        return res.status(500).json({success:false , message:"Error", error: error.message});
    }
}


export default { login, register };