// DESC: This is the order details screen basically a summary of your order.

import React, {useState, useEffect} from "react";
// required to make a backend call to get paypal client id
import axios from "axios";
// This dependency is installed to get Paypal buttons for payment
import {PayPalButton} from "react-paypal-button-v2" ;
import {Link} from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader.js";
import {getOrderDetails, payOrder, deliverOrder} from "../actions/orderActions.js";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";

const OrderScreen = ({match, history}) => {

    const orderId = match.params.id ; 

    const [sdkReady, setSdkReady] = useState(false) ;

    const dispatch = useDispatch();
    
    // getting userinfo
    const userLogin = useSelector((state) => state.userLogin) ;
    const {userInfo} = userLogin ;

    // After placing the order checking for the status
    const orderDetails = useSelector((state) => state.orderDetails) ;
    const {order, loading, error} = orderDetails ;

    // Checking if the payment was successful
    const orderPay = useSelector((state) => state.orderPay) ;
    const {success: successPay, loading: loadingPay} = orderPay ;

    // updating delivered status
    const orderDeliver = useSelector((state) => state.orderDeliver) ;
    const {success: successDeliver, loading: loadingDeliver} = orderDeliver ;
    
    if(!loading){
    // Providing decimal value
    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2);
    }
    //Desc: Calculate Prices
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0 ));
    }

    useEffect(() => {
        // check if user has logged in
        if(!userInfo){
            history.push("/login");
        }

        // we are adding paypal script dynamically
        const addPayPalScript = async () =>{
            const {data: clientId} = await axios.get("/api/config/paypal");
            // vanilla JS to create an element
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true
            script.onload = ()=>{
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }

        if(!order || order._id !== orderId || successPay || successDeliver){
            // so that it doesnt go in infinite loop
            dispatch({type: ORDER_PAY_RESET});
            dispatch({type: ORDER_DELIVER_RESET});

            dispatch(getOrderDetails(orderId)) ;
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript();
            }else{
                setSdkReady(true) ;
            }
        }
    }, [order, orderId, dispatch, successPay, successDeliver, userInfo, history]);

    const successPaymentHandler = (paymentResult) =>{
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(orderId));
    }

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <>
        <h1>Order {order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="placeOrder">
                            <h2>SHIPPING</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.pincode}, {" "} {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant="success">Delivered On {order.deliveredAt}</Message> : <Message variant="danger">Not Delivered </Message>}
                        </ListGroup.Item>

                        <ListGroup.Item className="placeOrder">
                            <h2>PAYMENT</h2>
                            <p><strong>Method: </strong>
                            {order.paymentMethod}</p>
                            {order.isPaid ? <Message variant="success">Paid On {order.paidAt}</Message> : <Message variant="danger">Not Paid </Message>}
                        </ListGroup.Item>

                        <ListGroup.Item className="placeOrder">
                            <h2>ORDER ITEMS</h2>
                            {order.orderItems.length === 0? <Message>Your Order is Empty!</Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item,index)=> (
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
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <hr />
                        <ListGroup.Item className="placeOrder">
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <hr />
                        <ListGroup.Item className="placeOrder">
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <hr />
                        <ListGroup.Item className="placeOrder">
                            <Row>
                                <Col>TOTAL</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item className="placeOrder">
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader />:(
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                )}
                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (<>
                            <hr />
                            <ListGroup.Item className="placeOrder">
                                <Button type="button" className="btn btn-block" onClick={deliverHandler}>Mark As Delivered</Button>
                            </ListGroup.Item>
                            </>
                        )}
                    </ListGroup> 
                </Card>    
                </Col>
            </Row>
    </> 
}

export default OrderScreen
