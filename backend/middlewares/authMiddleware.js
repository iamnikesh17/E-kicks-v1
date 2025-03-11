const User = require("../Model/User");
const appError = require("../utils/appError");
const jwt=require("jsonwebtoken");

const protect=async (req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        console.log(token);
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log(decoded);
        console.log("nikesh")
        const user=await User.findById(decoded.userId);
        if(!user){
            return next(appError("not authorized or authenticated",401))
        }
        req.user=user;
        next();
    }catch(error){
        next(appError(error.message))
    }
}

const admin=async (req,res,next)=>{
    if( req.user && !req.user.role === "admin"){
        return next(appError("not authorized to perform this action",403))
    }
    next();
}

module.exports={
    protect,
    admin,
 
}



