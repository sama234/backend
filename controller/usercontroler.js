const User=require("../model/user")
const bcrypt=require("bcrypt")

const createuser=async(req,res)=>{
    try{
const {name,email,phone,country,password}=req.body
const user=await User.findOne({email})
if(user){
 return   res.status(400).json({message:"Email Already exist"}) 
}
const haspassword=await bcrypt.hash(password,10)
const newuser=await User.create({
    name,email,phone,country,password:haspassword
})
await newuser.save()

res.status(201).json({message:"User Created Sucessfully",newuser})
    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})

    }
}

const loginuser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"Email not found"})
        }
       
        const comparepasswr=await bcrypt.compare(password,user.password)
         if(!comparepasswr){
            return res.status(400).json({message:"Incorrect password"})
        }

        res.status(200).json({message:"Login Successfully"})

    }
    catch(error){
        res.status(500).json({message:"Internal Server error",error:error.message})
    }
}

const phoneuser=async(req,res)=>{
    try{
        const {number,password}=req.body
        const user=await User.findOne({number})
        if(!user){
            return res.status(404).json({message:"Number not found"})
        }
          const checkpass=await bcrypt.compare(password,user.password)
         if(!checkpass){
            return res.status(400).json({message:"Incorrect password"})
        }

        res.status(200).json({message:"Login Successfully"})

    }
    catch(error){
        res.status(500).json({message:"Internal Server error",error:error.message})

}

}

module.exports={createuser,loginuser,phoneuser} 