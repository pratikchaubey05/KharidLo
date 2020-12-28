// This is a middleware to handle all the request on "/api/users" 
// we are using Router(), to handle the requests
// We will redirect request to respective controller.

import express from "express";
const router = express.Router();
import {authUser} from "../controller/userController.js";


// router.get("/", getProducts);  : We can do like this also but we will use Route() for chaining.
router.post("/login", authUser) ;

export default router ;


//Note: 1) Ensure you run seeder script so that data is present in the DB