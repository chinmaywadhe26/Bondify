import {User} from "../db/models/User.model.js"

export const getUsers = async(req, res) => {
        try{    
                const users = await User.find({});
                if(!users){
                    return res.status(404).json({
                        success: false, 
                        message: "users not found"
                    })
                }                     

                return res.status(200).json({
                    success: true,
                    data: users,
                })
        }catch(error){
            return res.staus(500).json({
                succesS:false, message: error.message
            })
        }
}