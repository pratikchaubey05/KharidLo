// * Defining schema and model for users collection in mongoDB

import mongoose from "mongoose" ;
import bcrypt from "bcryptjs" ;

// schema for collection is being defined
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: String,
        required: true,
        default: false
    }
},{
    timestamps: true
});

// We are using a method to check and compare password which are encrypted using bcrypt
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// compiling the model based on above schema
const User = mongoose.model("User", userSchema);

export default User ;