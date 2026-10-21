const User=require("../model/user")
const bcrypt=require("bcrypt")
const nodemailer=require("nodemailer")

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

const getall=async(req,res)=>{
    try{
        const user=await User.find()
        if(!user){
            return res.status(404).json({message:"not found"})
        }
        res.status(200).json({message:"Data fetched successfully",user})

    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}


const getbyid=async(req,res)=>{
    try{
        const userid=req.params.id
        const user = await User.findById(userid)
        if(!user){
            return res.status(404).json({message:"not found"})
        }
        res.status(200).json({message:"data fetched successffuuly",user})

    }
     catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
    
}


const deleteuser=async(req,res)=>{
    try{
        const userid=req.params.id
        const user = await User.findByIdAndDelete(userid)
        if(!user){
            return res.status(404).json({message:"not found"})
        }
        res.status(200).json({message:"user delete  successffuuly",user})

    }
     catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
    
}


const upadteuser=async(req,res)=>{
    try{
        const userid=req.params.id
        
        const user = await User.findByIdAndUpdate(userid,req.body,{new:true})
        if(!user){
            return res.status(404).json({message:"not found"})
        }
        res.status(200).json({message:"user updtae  successffuuly",user})

    }
     catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
    
}

const generateotp = () => {
    let digit = "0123456789";
    let otp = "";

    for (let i = 0; i < 6; i++) {
        otp += digit[Math.floor(Math.random() * digit.length)];
    }
    return otp;
};
const tarnsporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.APP_PASS
    }
})



const loginwithotp=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
        return   res.status(404).json({message:"Email not found"})
        }
        const comparepass=await bcrypt.compare(password,user.password)
        if(!comparepass){
            res.status(400).json({message:"Incorrect pass"})
        }
        const otp=generateotp()
        user.otp=otp
        await user.save()

       const mailoption = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "OTP VERIFICATION CODE",

    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
    </head>

    <body style="
        margin: 0;
        padding: 0;
        background-color: #f3f4f6;
        font-family: Arial, Helvetica, sans-serif;
    ">

        <div style="
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        ">

            <!-- Header -->
            <div style="
                background-color: #111827;
                padding: 30px;
                text-align: center;
            ">
                <h1 style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 28px;
                ">
                    Shop<span style="color: #facc15;">Easy</span>
                </h1>

                <p style="
                    margin: 8px 0 0;
                    color: #d1d5db;
                    font-size: 14px;
                ">
                    Secure Account Verification
                </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px; text-align: center;">

                <h2 style="
                    margin: 0 0 15px;
                    color: #111827;
                    font-size: 24px;
                ">
                    Verify Your Email
                </h2>

                <p style="
                    color: #6b7280;
                    font-size: 15px;
                    line-height: 1.6;
                    margin-bottom: 30px;
                ">
                    Use the verification code below to complete your
                    account verification.
                </p>

                <!-- OTP -->
                <div style="
                    display: inline-block;
                    background-color: #fef9c3;
                    border: 2px dashed #facc15;
                    border-radius: 12px;
                    padding: 18px 30px;
                    margin-bottom: 25px;
                ">
                    <span style="
                        font-size: 36px;
                        font-weight: bold;
                        letter-spacing: 10px;
                        color: #111827;
                    ">
                        ${otp}
                    </span>
                </div>

                <p style="
                    color: #6b7280;
                    font-size: 14px;
                    margin: 10px 0;
                ">
                    This OTP is valid for a limited time.
                </p>

                <p style="
                    color: #9ca3af;
                    font-size: 13px;
                    line-height: 1.5;
                    margin-top: 25px;
                ">
                    If you did not request this verification code,
                    you can safely ignore this email.
                </p>

            </div>

            <!-- Footer -->
            <div style="
                background-color: #f9fafb;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #e5e7eb;
            ">
                <p style="
                    margin: 0;
                    color: #9ca3af;
                    font-size: 12px;
                ">
                    © 2026 ShopEasy. All rights reserved.
                </p>
            </div>

        </div>

    </body>
    </html>
    `
};
        await tarnsporter.sendMail(mailoption)
        res.status(200).json({message:"OTP SEND Successfully"})
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error",error:error.message})
    }
}

const verifyotp=async(req,res)=>{
    try{
        const {email,otp}=req.body
        const user=await User.findOne({email})
          if(!user){
        return   res.status(404).json({message:"Email not found"})
        }
        if(user.otp!=otp){
            return res.status(400).json({message:"invalid otp"})
        }
        user.otp=null
        await user.save()

        res.status(200).json({message:"Login Succesful"})


    }
    catch(error){
         res.status(500).json({message:"Internal Server Error",error:error.message})
    }
}


// forgot 
// simple meial pe otp brj diy a
// update  body otp email newpass



const uploadavatar=async(req,res)=>{
    try{
        const userid=req.params.id
        const user=await User.findById(userid)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"})
        }
        user.avatar=req.file.path
        await user.save()
        res.status(200).json({message:"Avatar uploaded successfully"})

    }
    catch(error){
        res.status(500).json({message:"Internal Server Error",error:error.message})
    }
}
    





module.exports={createuser,uploadavatar,loginuser,phoneuser,getall,getbyid,deleteuser,upadteuser,loginwithotp,verifyotp} 