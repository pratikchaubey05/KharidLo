import React, {useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios"; // axios is used to make http request

// import products from "../products";     As from now we will be getting this from backend


function HomeScreen(){
    
    const [products, setProducts] = useState([]);
    // If running on local:  Here as the frontend is running one 3000 server and backend on 5000, here for URL given localhost is backend but as we are accessing it from frontend it gives error. so we need to add proxy in our package.json 
    useEffect(()=>{
        axios.get("/api/products").then(({data})=>{
            setProducts(data) ;
        })
    },[]);

    return(
        <>
        <h1>Latest Products:</h1>
        <Row>
            {products.map((product, i) => {
                return(
                    <Col key={i} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>) 
            })}
        </Row>
        </>
    );
}

export default HomeScreen ;