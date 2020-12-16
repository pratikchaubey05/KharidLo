import React , { useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux" ;
import {Row, Col, Image, ListGroup, Card, Button, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listProductDetails} from "../actions/productActions";

function ProductScreen({match, history}){
    const [qty, setQty] = useState(0);
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails ;

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id));
    },[dispatch, match]);

    // Handler to deal with add to cart submit button
    const addToCartHandler = () =>{
        // history.push is used to redirect and add the location in history object
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    return(
     <>
         <Link className="btn btn-dark my-3 rounded" to="/"> &lt; Go Back </Link>
         {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>:(
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
                {/* We are using useState hooks to handle qty */}
                        {
                            product.countInStock > 0 && (
                                <ListGroup.Item className="listgroupitem pb-0">
                                   <Row> 
                                   <Col>Qty:</Col>
                                    <Col>
                                        <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                            {
                                                [...Array(product.countInStock).keys()].map((x) => { return (
                                                    <option value={x+1} key={x+1}>
                                                        {x+1}
                                                    </option>)} )
                                            }
                                        </Form.Control>
                                    </Col>
                                    </Row>

                                </ListGroup.Item>
                            )
                        }
                        <hr />
                        <ListGroup.Item className="listgroupitem pt-2">
                            <Button 
                            onClick={addToCartHandler}
                            className="btn btn-block btn-dark" 
                            type="button" 
                            disabled={product.countInStock===0}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                </Card>
             </Col>
         </Row>
         )}
         
     </>
 );
}

export default ProductScreen;