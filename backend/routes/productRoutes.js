// This is a middleware to handle all the request on "/api/products" 
// we are using Router(), to handle the requests
// We will redirect request to respective controller.

import express from "express";
const router = express.Router();
import {getProductById, getProducts, deleteProduct,createProduct, updateProduct} from "../controller/productController.js";
// Middleware To Validate Token
import {protect, admin} from "../middleware/authMiddleware.js";


// router.get("/", getProducts);  : We can do like this also but we will use Route() for chaining.
router.route("/").get(getProducts).post(protect, admin, createProduct) ;
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct) ;

export default router ;


//Note: 1) Ensure you run seeder script so that data is present in the DB