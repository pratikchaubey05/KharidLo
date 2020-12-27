// This is a middleware to handle all the request on "/api/products" 
// we are using Router(), to handle the requests
// We will redirect request to respective controller.

import express from "express";
const router = express.Router();
import {getProductById, getProducts} from "../controller/productController.js";

// router.get("/", getProducts);  : We can do like this also but we will use Route() for chaining.
router.route("/").get(getProducts) ;
router.route("/:id").get(getProductById) ;

export default router ;


//Note: 1) Ensure you run seeder script so that data is present in the DB