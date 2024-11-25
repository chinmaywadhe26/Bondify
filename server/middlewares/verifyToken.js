import jwt from 'jsonwebtoken'

export const verifyToken = async(req, res, next) => {
    const headers = req.headers["authorization"];
    const token  = headers.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success: false, 
            message: "Access denied"

        })
    }

    try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.id = decoded.id;
            next();
    }catch(error){
        return res.status(500).json({
            success: false, message: error.message
        })
    }
}