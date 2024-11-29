import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const adminVerify = (req, res, next) => {
    try {
        const token = req.cookies?.Admin_Token;
        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }
        const successtoken = jwt.verify(token, process.env.JWT_SECRET);
        if(successtoken){
            next();
        }else{
            return res.status(401).json({ message: "Token is Not Valid" });
        }
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        res.status(500).json({ error: error.message });
    }
};
