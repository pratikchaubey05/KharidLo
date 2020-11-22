import React from "react";
import {Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";


function HomeScreen(){
    return(
        <>
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