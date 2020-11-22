import React from "react";
import {Link} from "react-router-dom";
import {Row, Col, Image, ListGroup, Card, Button} from "react-bootstrap";
import Rating from "../components/Rating";
import Products from "../products" ;

function ProductScreen({match}){
 const product = Products.find(p => p._id === match.params.id);
    return(
     <>
         <Link className="btn btn-dark my-3 rounded" to="/"> &lt; Go Back </Link>
         <Row>
             <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
             </Col>
             <Col md={3}>
             <ListGroup>
                <ListGroup.Item className="listgroupitem py-0">
                 <h3>{product.name}</h3>
                </ListGroup.Item>
                <hr/>
                <ListGroup.Item className="listgroupitem py-0">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <hr/>
                <ListGroup.Item className="listgroupitem py-0">
                    Price: ${product.price}
                </ListGroup.Item>
                <hr/>
                <ListGroup.Item className="listgroupitem py-0">
                    Description: {product.description}
                </ListGroup.Item>
            </ListGroup>
             </Col>
             <Col md={3}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item className="listgroupitem">
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item className="listgroupitem pb-0">
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    {product.countInStock >0? "In Stock": "Out Of Stock"}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <hr />
                        <ListGroup.Item className="listgroupitem pt -0">
                            <Button className="btn btn-block btn-dark" type="button" disabled={product.countInStock===0}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                </Card>
             </Col>
         </Row>
     </>
 );
}

export default ProductScreen;