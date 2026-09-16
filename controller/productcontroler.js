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

module.exports = { createproduct };
