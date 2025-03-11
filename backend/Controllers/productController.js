const Product = require("../Model/Product");
const appError = require("../utils/appError");

const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, stock, category } = req.body;
    console.log(category)
    const image = req.file.path || "";
    const product = await Product.create({
      name,
      price,
      description,
      stock,
      category,
      image,
    });
    res.status(201).json(product);
  } catch (error) {
    next(appError(error.message));
  }
};



const getAllProducts = async (req, res, next) => {
  try {
    const {category="All",rating=0,minPrice=0,maxPrice=1000000000,page=1,keyword=""}=req.query;
    const limit=8;
    
    let query={}
    if(category && category!=="All"){
      query.category=category
    }
     // Filter by rating
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }
    if(keyword){
      query.name = { $regex: keyword, $options: "i" };
    }

  
     // Filter by price range
    if (minPrice && maxPrice) {
      query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }

    const skip=(page-1)*limit;
    const products=await Product.find(query).skip(skip).limit(Number(limit));
    const total=await Product.countDocuments(query);

      res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(appError(error.message));
  }
};




const updateProduct=async (req,res,next)=>{
  try{
    const product=await Product.findById(req.params.id);
    console.log(req.params.id);
    if(!product){
      return next(appError("Product not found",404))
    }
    console.log("nikesh sunam")

    const image = req.file ? req.file.path : "";
    if(image){
      product.image=image;
    }

  
    product.name=req.body.name || product.name;
    product.price=req.body.price || product.price;
    product.description=req.body.description || product.description;
    product.stock=req.body.stock || product.stock;
    // product.rating=req.body.rating || product.rating;
    product.category=req.body.category || product.category;
    // product.sale=req.body.sale || product.sale;
    // product.discountPrice=req.body.discountPrice || product.discountPrice;
 
    await product.save()

    res.status(200).json(product)

  }catch(error){
    next(appError(error.message))
  }
}


const AdminFetchAllProducts=async (req,res,next)=>{
  try{
    const {page}=req.query;

    const limit=8;
    const skip=(page-1)*limit;

    const products=await Product.find({}).skip(Number(skip)).limit(Number(limit)).populate("category");
  
    const total=await Product.countDocuments();
    res.json({
      products,
      total,
      page:Number(page),
      pages:Math.ceil(total/limit)
    });
  }catch(error){
    next(appError(error.message))
  }
}

const getProductById=async (req,res,next)=>{
  try{
    const product=await Product.findById(req.params.id).populate("category");
    if(!product){
      return next(appError("Product not found",404))
    }
    res.json(product)
  }catch(error){
    next(appError(error.message))
  }
}

const deleteProduct=async (req,res,next)=>{
  try{
    const product=await Product.findByIdAndDelete(req.params.id);
    if(!product){
      return next(appError("Product not found",404))
    }
    res.json({message:"Product deleted successfully"})
  }catch(error){
    next(appError(error.message))
  }
 
}

module.exports={
    createProduct,
    getAllProducts,
    updateProduct,
    AdminFetchAllProducts,
    getProductById,
    deleteProduct
}