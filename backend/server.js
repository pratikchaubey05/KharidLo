import express from "express" ;
import dotenv from "dotenv" ;
import products from "./data/products.js" ;

dotenv.config();    
const app = express();



app.get("/", (req, res)=>{
    res.send("My API is running") ;
}) ;
// To get complete producrs list
app.get("/api/products", (req, res)=>{
    res.json(products) ;
}) ;

// to get specific product
app.get("/api/products/:id", (req, res)=>{
    const product = products.find(p => p._id === req.params.id) ;
    res.json(product) ;
}) ;

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port: ${PORT}`)) ;