const express=require("express")
const { createuser, loginuser, phoneuser } = require("../controller/usercontroler")
const router=express.Router()


router.post("/craeteuser",createuser)
router.post("/loginwithemail",loginuser)
router.post("/loginwithnumber",phoneuser)

module.exports=router