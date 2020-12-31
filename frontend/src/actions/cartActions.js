// Action creators for Cart
import axios from "axios";
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS} from "../constants/cartConstant.js";


// we are using Thunk to get dispatch and make async call
// We also want to store entire cart to out local storage
//we will getState to get our entire state tree
export const addToCart = (id, qty)=> async (dispatch, getState )=>{
    const {data} = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty
        }
    });
    // Storing in local storage
    // code to get the state of storage is in store.js
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

}

// Action creator for removing an element from the Cart

export const removeFromCart = (id)=> async (dispatch, getState )=>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });
    // Storing in local storage
    // code to get the state of storage is in store.js
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// Desc: Action creator for shipping address
export const saveShippingAddress = (data)=> async (dispatch)=>{
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    });
    // Storing in local storage
    // code to get the state of storage is in store.js
    localStorage.setItem("shippingAddress", JSON.stringify(data))   ;
}