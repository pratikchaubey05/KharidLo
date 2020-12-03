// This script is a seeder script responsible for filling mongoDB from sample data. This is not a part of application. Its an independent script therefore we have imported all the required libraries again

import mongoose from "mongoose";
import dotenv from "dotenv" ;
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js" ;

dotenv.config();
connectDB();

// Here, below we will create two functions: importData and destroyData. As we are dealing with mongoose everything that is returned is a promise.

const importData = async ()=> {
    try {
        // Before inserting we have emptied our DB
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Here we are inserting all the users in DB
        const createdUsers = await User.insertMany(users);
        
        // Now, to fill product we also have to fill user field of schema
        const adminUser = createdUsers[0]._id ;
        const sampleProducts = products.map(product => {
            return({...product, user: adminUser});
        });

        await Product.insertMany(sampleProducts) ;
        console.log("Data Imported!");
        process.exit(); // to safely close this task after completion
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


const destroyData = async ()=> {
    try {
        // Before inserting we have emptied our DB
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        
        console.log("Data Deleted!");
        process.exit(); // to safely close this task after completion
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// Now to have this script run we can do this by two Method. if we want to directly run 1) using command:
//     node backend/seeder -d   -> to delete
//     we can write following code:
//here process.argv property simply returns an array of arguments passed in CLI
// this code is used in both method
 if(process.argv[2] === "-d"){
     destroyData();
 }else{
     importData();
 }

// OR 

// we can simply add scripts in our package.json which i have used. 
// to run script use : npm run data:import  -> to import data  or npm run data:destroy to destroy data