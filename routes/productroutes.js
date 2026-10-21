const express = require("express");
const { createproduct, getbyid, getallproducts, deleteproduct, updateinfo } = require("../controller/productcontroler");

const router = express.Router();

router.post("/createproduct", createproduct);
router.get("/getbyid/:id", getbyid);
router.get("/getallproducts",getallproducts);
router.delete("/deleteproduct/:id", deleteproduct);


router.put("/updateinfo/:id", updateinfo);
router


module.exports = router;