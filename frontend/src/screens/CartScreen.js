import React, {useEffect} from "react" ;
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Message from "../components/Message";
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from "react-bootstrap";
import {addToCart, removeFromCart} from "../actions/cartActions";

const CartScreen = ({match, location, history}) => {
    // 1) location is used to get qty from the URL. 2) history is used to redirect
    const productId = match.params.id ;
    const qty = location.search ? Number(location.search.split("=")[1]) : 1 ;
    const dispatch = useDispatch() ;
    // getting cart state from the store
    const cart =  useSelector(state => state.cart) ;
    const {cartItems} = cart ; 
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    
    // Handler for Removing any product from cart
    const removeFromCartHandler= (id)=>{
        dispatch(removeFromCart(id));
    }

    // Checkout Handler
    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ?( 
                <Message>
                    Your Cart is Empty! <Link to="/"> <u>&lt;Go Back </u></Link>
                </Message>):(
                    <ListGroup variant="flush">
                        {
                            cartItems.map(item => (
                                <ListGroup.Item key={item.product} className="shoppingCartItem">
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                        <Form.Control as="select" value={item.qty} onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value))) }>
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => { return (
                                                    <option value={x+1} key={x+1}>
                                                        {x+1}
                                                    </option>)} )
                                            }
                                        </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}> <i className="fas fa-trash" /> </Button>
                                        </Col>
                                        
                                    </Row>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                ) }
            </Col>

            {/* @desc: Column to display the subtotal and btn checkout */}
            <Col mod={4}>
            <Card>
                <ListGroup>
                    <ListGroup.Item className="shoppingCartSubtotal" >
                        <h2>
                            SUBTOTAL ({cartItems.reduce((acc, item) => acc+item.qty, 0)}) ITEMS
                        </h2>
                        $ {cartItems.reduce((acc, item) => acc + (item.qty * item.price),0).toFixed(2)}
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup.Item className="shoppingCartSubtotal" >
                    <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>PROCEED TO CHECKOUT</Button>
                </ListGroup.Item>
            </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
