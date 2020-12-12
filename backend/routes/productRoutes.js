// This is a middleware to handle all the request on "/api/products" 
// we are using Router(), to handle the requests

import express from "express";
const router = express.Router();
// desc: As mongoose returns promise and to Handle exception/error we want to avoid writting try and catch. hence this.
import asynchandler from "express-async-handler" ;

import Product from "../models/productModel.js" ;

// @desc: Fetch all products
// @route: GET /api/products
// @access: Public
router.get("/", asynchandler(async(req, res)=>{
    const products = await Product.find({}) ;
    // throw new Error("Testing Error");
    res.json(products) ;
}));

// @desc: Fetch single product
// @route: GET /api/products/:id
// @access: Public
router.get("/:id", asynchandler(async(req, res)=>{ 
    const product = await Product.findById(req.params.id) ;
    if(product){
    res.json(product) ;
    }else{
        res.status(404);
        throw new Error("Product Not Found!!!"); // As we are using custom error handler i.e., server.js->middlerware/errorMiddleware.js
        // res.status(404).json({message: "Product not found"}) ;
    }
})) ;

export default router ;


//Note: 1) Ensure you run seeder script so that data is present in the DB