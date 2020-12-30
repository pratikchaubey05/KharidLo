// This is a middleware to handle all the request on "/api/users" 
// we are using Router(), to handle the requests
// We will redirect request to respective controller.

import express from "express";
const router = express.Router();
import {authUser,registerUser, getUserProfile, updateUserProfile} from "../controller/userController.js";
// Middleware To Validate Token
import {protect} from "../middleware/authMiddleware.js";

// router.get("/", getProducts);  : We can do like this also but we will use Route() for chaining.

router.route("/").post(registerUser) ;
router.post("/login", authUser) ;
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile) ;

export default router ;


//Note: 1) Ensure you run seeder script so that data is present in the DB