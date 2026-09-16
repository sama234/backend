const express = require("express");
const { createproduct } = require("../controller/productcontroler");

const router = express.Router();

router.post("/createproduct", createproduct);

module.exports = router;