const express=require("express");
const { protect } = require("../middlewares/authMiddleware");
const { createOrder,myOrders, getOrderById } = require("../Controllers/orderController");

const orderRoutes=express.Router();

orderRoutes.route("/").post(protect,createOrder);
orderRoutes.route("/my-orders").get(protect,myOrders)
orderRoutes.route('/:id').get(protect,getOrderById);

module.exports=orderRoutes;
