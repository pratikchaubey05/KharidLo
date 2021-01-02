// This is a middleware to handle all the request on "/api/orders" 
// we are using Router(), to handle the requests
// We will redirect request to respective controller.

import express from "express";
const router = express.Router();
import {addOrderItems} from "../controller/orderController.js";
import {protect} from "../middleware/authMiddleware.js";

// router.get("/", getProducts);  : We can do like this also but we will use Route() for chaining.
router.route("/").post(protect, addOrderItems) ;

export default router ;


//Note: 1) Ensure you run seeder script so that data is present in the DB