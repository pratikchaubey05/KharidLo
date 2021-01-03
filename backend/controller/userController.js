// Main desc: Controller to Authenticate User
//Dedicated controllers to handle the functionality. This has been done to make code cleaner

// desc: As mongoose returns promise and to Handle exception/error we want to avoid writting try and catch. hence this.
import asynchandler from "express-async-handler" ;
import User from "../models/userModel.js" ;
// To generate JWT
import generateToken from "../utils/generateToken.js";

// @desc: Auth user & get Token
// @route: POST /users/login
// @access: Public
const authUser = asynchandler(async (req, res) => {
    const {email, password} = req.body ;

    const user = await User.findOne({email:email})
    // if user exist and model method promise returns true...
    if(user && ( await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401) ;  //401: unauthorized
        throw new Error("Invalid Email or Password!!!") ;
    }
});

// @desc: Register New User
// @route: POST /users
// @access: Public
const registerUser = asynchandler(async (req, res) => {
    const {name, email, password} = req.body ;

    const userExists = await User.findOne({email:email})

    // checking if the account is registered with email id
    if(userExists){
        res.status(400); //400: Bad request
        throw new Error("User Already Exists!!!");
    }
    
    const user = await User.create({
        name,
        email,
        password
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });  //201: Created something
    }else{
        res.status(400);
        throw new Error("Invalid User Data!");

    }
});




// @desc: Get User Profile
// @route: GET /api/users/profile
// @access: Private
const getUserProfile = asynchandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    //const user = req.user ;
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(404);
        throw new Error("User Not Found!!!");
    }
});

// @desc: Update User Profile
// @route: PUT api/users/profile
// @access: Private
const updateUserProfile = asynchandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    //const user = req.user ;
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })

    }else{
        res.status(404);
        throw new Error("User Not Found!!!");
    }
});

// @desc: Get all users
// @route: GET /api/users
// @access: Private/Admin
const getUsers = asynchandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});


export {authUser,registerUser, getUserProfile, updateUserProfile, getUsers} ;
