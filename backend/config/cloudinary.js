const dotenv=require("dotenv")
dotenv.config()
const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const storage=new CloudinaryStorage({
    cloudinary,
    allowedFormats:["jpg",'png'],
    params:{
        folder:"E-kicks-v1",
        transformation:[{width:500,height:500,crop:"limit"}]
        
    }
})

module.exports=storage;




