// This is the entrance of backend.
// It is having initial routes handling.

import express from "express" ;
import dotenv from "dotenv" ;

// import products from "./data/products.js" ;  As now we are using DB to get data
import connectDB from "./config/db.js" ;

// This is to import middleware to handle product routes
import productRoutes from "./routes/productRoutes.js";

// dotenv.config is being used so that we can access .env file lets us use env vars.
dotenv.config();    

// This is used to connect to our DB
connectDB() ;

const app = express();


app.get("/", (req, res)=>{
    res.send("My API is running") ;
}) ;

//Middleware to handle product routes
app.use("/api/products", productRoutes);


const PORT = process.env.PORT || 5000 ;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port: ${PORT}`)) ;