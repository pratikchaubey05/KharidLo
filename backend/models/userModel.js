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
        type: Boolean,
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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt) ;
} );

// compiling the model based on above schema
const User = mongoose.model("User", userSchema);

export default User ;