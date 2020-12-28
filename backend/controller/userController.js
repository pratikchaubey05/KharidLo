// Main desc: Controller to Authenticate User
//Dedicated controllers to handle the functionality. This has been done to make code cleaner

// desc: As mongoose returns promise and to Handle exception/error we want to avoid writting try and catch. hence this.
import asynchandler from "express-async-handler" ;
import User from "../models/userModel.js" ;


// @desc: Auth user & get Token
// @route: POST /users/login
// @access: Public
const authUser = asynchandler(async (req, res) => {
    const {email, password} = req.body ;

    const user = await User.findOne({email:email})
    // if user exist and model method promise returns true...
    if(user && ( await user.matchPassword(password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    }else{
        res.status(401) ;  //401: unauthorized
        throw new Error("Invalid Email or Password!!!") ;
    }
});

export {authUser} ;
