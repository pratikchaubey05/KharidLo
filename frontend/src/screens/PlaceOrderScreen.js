// DESC: This is the PlaceOrder screen basically a summary of your order before placing it.

import React, {useState} from "react";
import {Link} from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderScreen = () => {

    const disptach = useDispatch();
    
    const cart = useSelector(state => state.cart );

    // Providing decimal value
    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2);
    }
    //Desc: Calculate Prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0 ));

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100) ;
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2))) ;
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2) ;

    const placeOrderHandler = () => {
        console.log("orders");
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="placeOrder">
                            <h2>SHIPPING</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.pincode}, {" "} {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item className="placeOrder">
                            <h2>PAYMENT</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item className="placeOrder">
                            <h2>ORDER ITEMS</h2>
                            {cart.cartItems.length === 0? <Message>Your Cart is Empty!</Message> : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item,index)=> (
                                        <ListGroup.Item key={index} className="placeOrder">
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>

                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="placeOrder">
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <hr />
                        <ListGroup.Item className="placeOrder">
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <hr />
                        <ListGroup.Item className="placeOrder">
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <hr />
                        <ListGroup.Item className="placeOrder">
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <hr />
                        <ListGroup.Item className="placeOrder">
                            <Row>
                                <Col>TOTAL</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <hr />
                        <ListGroup.Item className="placeOrder">
                            <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
                        </ListGroup.Item>
                    </ListGroup> 
                </Card>    
                </Col>
            </Row>
        </>    
    )
}

export default PlaceOrderScreen
