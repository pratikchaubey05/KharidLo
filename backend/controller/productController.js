// Main desc: Functionality to fetch products or product by ID
//Dedicated controllers to handle the functionality. This has been done to make code cleaner

// desc: As mongoose returns promise and to Handle exception/error we want to avoid writting try and catch. hence this.
import asynchandler from "express-async-handler" ;
import Product from "../models/productModel.js" ;


// @desc: Fetch all products
// @route: GET /api/products
// @access: Public
const getProducts = asynchandler(async (req, res) => {
    const products = await Product.find({}) ;
    // throw new Error("Testing Error");
    res.json(products) ;
})


// @desc: Fetch single product
// @route: GET /api/products/:id
// @access: Public
const getProductById = asynchandler(async (req, res) => {
    const product = await Product.findById(req.params.id) ;
    if(product){
    res.json(product) ;
    }else{
        res.status(404);
        throw new Error("Product Not Found!!!"); // As we are using custom error handler i.e., server.js->middlerware/errorMiddleware.js
        // res.status(404).json({message: "Product not found"}) ;
    }
})

// @desc: Delete a product
// @route: DELETE /api/products/:id
// @access: Private/admin
const deleteProduct = asynchandler(async (req, res) => {
    const product = await Product.findById(req.params.id) ;
    if(product){
    await product.remove();
    res.json({message: "Product Removed"});
    }else{
        res.status(404);
        throw new Error("Product Not Found!!!"); // As we are using custom error handler i.e., server.js->middlerware/errorMiddleware.js
        // res.status(404).json({message: "Product not found"}) ;
    }
})


export {getProducts, getProductById, deleteProduct} ;