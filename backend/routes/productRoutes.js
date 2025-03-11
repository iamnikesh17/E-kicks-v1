const express=require("express");
const multer=require("multer");
const { createProduct, getAllProducts, updateProduct, AdminFetchAllProducts, getProductById,deleteProduct } = require("../Controllers/productController");
const storage = require("../config/cloudinary");

const productRoutes=express.Router();

const upload=multer({
    storage:storage
})

productRoutes.route("/").post(upload.single("image"),createProduct).get(getAllProducts);
productRoutes.route("/all-products").get(AdminFetchAllProducts);
productRoutes.route("/:id").put(upload.single("image"),updateProduct).get(getProductById).delete(deleteProduct);


module.exports=productRoutes;