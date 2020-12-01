// * Defining schema and model for users collection in mongoDB

import mongoose from "mongoose" ;


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

// compiling the model based on above schema
const User = mongoose.model("User", userSchema);

export default User ;