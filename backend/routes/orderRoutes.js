// This is a middleware to handle all the request on "/api/orders" 
// we are using Router(), to handle the requests
// We will redirect request to respective controller.

import express from "express";
const router = express.Router();
import {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders} from "../controller/orderController.js";
import {protect} from "../middleware/authMiddleware.js";

// router.get("/", getProducts);  : We can do like this also but we will use Route() for chaining.
router.route("/").post(protect, addOrderItems) ;
// To display all the orders of the loggedin user
router.route("/myorders").get(protect, getMyOrders) ;
// updating the order details with paid
router.route("/:id/pay").put(protect, updateOrderToPaid);
// Put the below route at the bottom as if any routes has param it may take it as id
router.route("/:id").get(protect, getOrderById);


export default router ;


//Note: 1) Ensure you run seeder script so that data is present in the DB