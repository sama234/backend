const express=require("express")
const mongoose=require("mongoose")
const router=require("./routes/userroutes")
const PORT=4000

const app=express()
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/Node")
.then(()=>{
    console.log("mongodb connected successfully")
})
.catch((err)=>{
    console.log("Not Connected")
})

app.use("/api",router)
app.use("/api",require("./routes/productroutes"))


app.listen(PORT,()=>{
    console.log("your Port is running on ",PORT)
})

