const Product = require("../model/product");

const createproduct = async (req, res) => {
    try {

        const {
            name,
            description,
            price,
            category,
            brand,
            image,
            pdf,
            stock,
            rating
        } = req.body;

        const newproduct = await Product.create({
            name,
            description,
            price,
            category,
            brand,
            image,
            pdf,
            stock,
            rating
        });

        res.status(201).json({
            message: "Product Created Successfully",
            newproduct
        });

    } catch (error) {

        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });

    }
};

// const pdfupload = async (req, res) => {
//     try {
//         const productid = req.params.id;
//         const product = await Product.findById(productid);
//         if (!product
// ) {
//             return res.status(404).json({ message: "Product not found" });
//         }       




const getbyid=async(req,res)=>{
    try{
        const productid=req.params.id
        const product = await Product.findById(productid)
        if(!product){
            return res.status(404).json({message:"not found"})
        }
        res.status(200).json({message:"data fetched successfully",product})

    }
     catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
    
}

const  getallproducts=async(req,res)=>{
    try{
        const product=await Product.find()
        if(!product){
            return res.status(404).json({message:"not found"})
        }
        res.status(200).json({message:"Data fetched successfully",product})

    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

const deleteproduct=async(req,res)=>{
    try{
        const productid=req.params.id
        const product = await Product.findByIdAndDelete(productid)
        if(!product){
            return res.status(404).json({message:"not found"})
        }
        res.status(200).json({message:"product delete  successffuuly",product})

    }
     catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
    
}

const updateinfo=async(req,res)=>{
    try{
        const productid=req.params.id
       
        const product = await Product.findByIdAndUpdate(productid,req.body,{new:true})
        if(!product){
            return res.status(404).json({message:"not found"})
        }
        res.status(200).json({message:"Item updated successfully",product})
    }
     catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
    
}



module.exports = { createproduct, getbyid, getallproducts, deleteproduct, updateinfo};
