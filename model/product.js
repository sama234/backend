const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    pdf:{
        type:String,
        required:true
    },
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
    }
});

module.exports = mongoose.model("products", productSchema);