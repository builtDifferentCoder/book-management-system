import jwt from 'jsonwebtoken';
import User from "../models/user.js";

const authenticationMiddleware = async(req, res, next) => {
    let token
    //get the token from jwt cookies
    token=req.cookies.jwt

    //if token exists decode it
    if(token){
        try {
          const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
          req.user=await User.findById(decodedToken.userId)
              .select("-password");
          next()
        }catch(err){
            res.status(401).json({error:"Not authorized.Token failed"})
        }
    }else{
        res.status(401).json({error:"Not authorized.No token provided"})
    }
}

const authorizeMiddleware = async(req, res, next) => {
    if(req.user&&req.user.role==="admin"){
        next()
    }
    else{
        res.status(401).json({error:"Not authorized as an admin"})
    }
}

export {authenticationMiddleware,authorizeMiddleware};