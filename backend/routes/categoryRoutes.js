const express=require("express");
const { createCategory, getAllCategories } = require("../Controllers/categoryController");

const categoryRoutes=express.Router();

categoryRoutes.route("/").post(createCategory).get(getAllCategories);

module.exports=categoryRoutes;