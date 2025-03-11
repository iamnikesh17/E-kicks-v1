const express=require("express");
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const cors=require("cors");
const path=require("path");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
dotenv.config()

dbConnect();

const app=express();
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true  // enables cookies on the client side to be sent with requests to the server
}))

// routes

app.use("/api/v1/products",productRoutes);
app.use("/api/v1/categories",categoryRoutes);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/orders",orderRoutes);

// end routes

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/","dist","index.html"));
    });
}


app.use(globalErrorHandler)

const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})