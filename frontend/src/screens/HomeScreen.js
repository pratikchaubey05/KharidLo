import React, { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listProducts} from "../actions/productActions";


function HomeScreen(){

    // As we are using hooks, we dont have to use highorder function connect() and dont need to map state to props.
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, products} = productDetails;
    
    // If running on local:  Here as the frontend is running one 3000 server and backend on 5000, here for URL given localhost is backend but as we are accessing it from frontend it gives error. so we need to add proxy in our package.json 
    useEffect(()=>{
        dispatch(listProducts()) ;
    },[dispatch]);

    return(
        <>
        <h1>Latest Products:</h1>
        {loading ? <Loader />:error?<Message variant="danger">{error}</Message>:
        <Row>
            {products.map((product, i) => {
                return(
                    <Col key={i} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>) 
            })}
        </Row>}
        
        </>
    );
}

export default HomeScreen ;