import React from "react";
import {Link} from "react-router-dom"; 
import {Card} from "react-bootstrap";
import Rating from "./Rating";

// Here in argument i have used destructuring instead of props
function Product({product}){
    return(
        <>
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                 <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </div>
                </Card.Text>
                <Card.Text style={{fontSize: "1.5rem"}}>
                    <strong>${product.price}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    );
}

export default Product ;