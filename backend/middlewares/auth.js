const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req,res,next) =>{
    try {
        //token extract
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        //if token missing ,then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message: "Token is missing",
            })
        }

        // Verify the token
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            //verification issue
            return res.status(401).json({
                success:false,
                message:"Session is expire, please login again",
                
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Something went wrong while validating token"
        })
    }
}
