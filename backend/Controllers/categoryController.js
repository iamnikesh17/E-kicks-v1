const Category = require("../Model/Category")
const appError = require("../utils/appError")

const createCategory=async (req,res,next)=>{
    try{
        const {name}=req.body;
        const category=await Category.findOne({name});
        if(category){
            return next(new appError("Category already exists",400))
        }
        const newCategory=await Category.create({name});
        res.status(201).json(newCategory);
    }catch(error){
        next(appError(error.message))
    }
}

const getAllCategories=async (req,res,next)=>{
    try{
        const categories=await Category.find({});
        res.json(categories);
    }catch(error){
        next(appError(error.message))
    }
}

const updateCategory=async (req,res,next)=>{
    try{
        const {name}=req.body;
        const updatedCategory=await Category.findByIdAndUpdate(req.params.id,name,{new:true,runValidators:true});
        if(!updatedCategory){
            return next(new appError("Category not found",404))
        }
        res.json(updatedCategory);
    }catch(error){
        next(appError(error.message))
    }
}

const deleteCategory=async (req,res,next)=>{
    try{
        const deletedCategory=await Category.findByIdAndDelete(req.params.id);
        if(!deletedCategory){
            return next(new appError("Category not found",404))
        }
        res.json({message:"Category deleted successfully"});
    }catch(error){
        next(appError(error.message))
    }
}


module.exports={
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}
