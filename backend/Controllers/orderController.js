const Order = require("../Model/Order");
const appError = require("../utils/appError")

const createOrder=async (req,res,next)=>{
    try{
        const {items,shippingAddress,itemsPrice,totalPrice,taxPrice,shippingPrice}=req.body;
        console.log("nikesh sunam")

        console.log(req.user);
        if(!items || items.length===0){
            return next(new appError("No items in the order",400))
        }
        if(!shippingAddress){
            return next(new appError("No shipping address provided",400))
        }
        const order=await Order.create({
            user:req.user._id,
            items:items.map((item)=>({
                product:item._id,
                name:item.name,
                qty:item.qty,
                price:item.price
            })),
            itemsPrice,
            totalPrice,
            taxPrice,
            shippingPrice,
            shippingAddress
        })
        res.status(201).json(order)

    }catch(error){
        next(appError(error.message,500))
    }
}

const myOrders=async (req,res,next)=>{
    try{
        const orders=await Order.find({user:req.user._id});
        if(!orders){
            return next(new appError("No orders found",404))
        }
        res.json(orders)
    }catch(error){
        next(appError(error.message,500))
    }
}


const getOrderById=async (req,res,next)=>{
    try{
        const order=await Order.findById(req.params.id);
        if(!order){
            return next(new appError("Order not found",404))
        }
        res.json(order);
    }catch(error){
        next(appError(error.message,500))
    }
}

module.exports={
    createOrder,
    myOrders,
    getOrderById
}