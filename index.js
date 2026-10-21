require("dotenv").config();
const express=require("express")
const mongoose=require("mongoose")
const router=require("./routes/userroutes")
const cors=require("cors")
const { swaggerUi, swaggerSpec } = require("./swagger");
const PORT=process.env.PORT

const app=express()
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
mongoose.connect(process.env.MONGOURL)
.then(()=>{
    console.log("mongodb connected successfully")
})
.catch((err)=>{
    console.log("Not Connected")
})

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176"
    ]
}));


app.use("/uploads",express.static("uploads"))

app.use("/api",router)
app.use("/api/products",require("./routes/productroutes"))


app.listen(PORT,()=>{
    console.log("your Port is running on ",PORT)
})



// create, get6, getbyid ,update , delete 