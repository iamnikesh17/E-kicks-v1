const express=require("express");
const { registerUser, loginUser, logoutUser, updateUserProfile,userProfile } = require("../Controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const userRoutes=express.Router();

userRoutes.route("/").post(registerUser).put(protect,updateUserProfile);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/logout").post(logoutUser);
userRoutes.route("/profile").get(protect,userProfile)


module.exports=userRoutes;