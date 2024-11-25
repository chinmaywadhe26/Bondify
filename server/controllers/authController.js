import { User } from './../db/models/User.model.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup  = async (req, res) => {
    const {name, email, password, profile, publicId} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success: false, message: "please login"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name ,email, password: hashedPassword, profile, publicId
        });
        await user.save();
        return res.status(201).json({success: true, message: "Sign up successful"})
    }catch(error){
        return res.status(500).json({
            success: false, 
            message: error.message
        })
    }
} 

export const login = async (req, res) => {
        const {email, password} = req.body;    
    try{    
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({success: false, message: "please signup"})
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({success: false, message: "invalid credentials"})
            }

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });
            return res.status(200).json({
                success: true, 
                message: "Login successful",
                token, 
                data: {
                    id: user._id, 
                    name: user.name, 
                    email: user.email,
                    profile: user.profile,
                    favourites: user.favourites, 
                    disliked: user.disliked,
                    
                },
            })

        }catch(error){
            return res.status(500).json({
                success: false, 
                message: error.message
            })
        }
} 

export const checkAuth = async(req, res) => {
    const reqId = req.id;
    try{
            const user = await User.findById(reqId).select("-password");
            if(!user){
                return res.status(400).json({
                    success: false, message: "user not found"
                })
            }
            return res.status(200).json({
                success: true, data: user
            })
    }catch(error){
        return res.status(500).json({
            success: false, message: error.message
        })
    }
}