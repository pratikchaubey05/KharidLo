// DESC: This is the Shipping Screen
import React, {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/FormContainer";
import {saveShippingAddress} from "../actions/cartActions";

const ShippingScreen = ({history}) => {

    const cart = useSelector(state => state.cart ) ;
    const {shippingAddress} = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [pincode, setPincode] = useState(shippingAddress.pincode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e)=> {
       e.preventDefault();
       dispatch(saveShippingAddress({address, city, pincode, country})) ;
       history.push("/payment");
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address" required value={address} onChange={(e)=> setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City:</Form.Label>
                    <Form.Control type="text" placeholder="Enter City" required value={city} onChange={(e)=> setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="pincode">
                    <Form.Label>Pincode:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Pincode" required value={pincode} onChange={(e)=> setPincode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country:</Form.Label>
                    <Form.Control type="text" placeholder="Country" required value={country} onChange={(e)=> setCountry(e.target.value)}></Form.Control>
                </Form.Group> 
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
