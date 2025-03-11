const User = require("../Model/User");
const appError = require("../utils/appError");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(appError("Please provide all required fields", 400));
    }
    try {
        const user = await User.findOne({ email }).select("-password");
        if (user) {
            return next(appError("User already exists", 400));
        }
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        next(appError(error.message, 500));
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(appError("Please provide email and password", 400));
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(appError("Invalid credentials", 401));
        }
        const checkPassword = await user.comparePassword(password);
        if (!checkPassword) {
            return next(appError("Invalid credentials", 401));
        }
        const token = generateToken(user._id, res);
        res.json(user);
    } catch (error) {
        next(appError(error.message, 500));
    }
}

const logoutUser=async (req,res,next)=>{
    try {
        res.cookie("jwt","",{
            expires:new Date(0),
            httpOnly:true,
            secure: process.env.NODE_ENV!=='development',
            sameSite: "strict"
        })

        res.status(200).json({
            msg:"Logged out successfully"
        })
    } catch (error) {
        next(appError(error.message,401))
    }
}


const updateUserProfile=async (req,res,next)=>{
    try{
        const user=await User.findById(req.user._id);
        if(!user){
            return next(new appError("User not found",404))
        }
        if(req.body.password){
            user.password=req.body.password || user.password
        }
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        await user.save();
        res.json(user);

    }catch(error){
        next(appError(error.message,500))
    }
}


const userProfile=async (req,res,next)=>{
    try{
        const user=await User.findById(req.user._id);
        if(!user){
            return next(new appError("User not found",404))
        }
        res.json(user);
    }catch(error){
        next(appError(error.message,500))
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    userProfile
}