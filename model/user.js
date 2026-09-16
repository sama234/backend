const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:Number
    },
    country:{
        type:String
    },
    password:{
        type:String
    }
})

module.exports=mongoose.model("users",userSchema)