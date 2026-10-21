const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "ShopEasy API",
            version: "1.0.0",
            description: "API documentation for ShopEasy"
        },
        servers: [
            {
                url: "http://localhost:4000"
            },{
                url:"https://backend-7hep.onrender.com"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };