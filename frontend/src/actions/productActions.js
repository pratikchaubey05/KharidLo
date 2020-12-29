// Action responsible for making a backend request and get data.
// This is an Action creator

import axios from "axios";
import {PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from "../constants/productConstants.js";

//1) similar task what useffect did in homescreen component earlier
//2)  Below function is an action creator. 
//3) Above constant "PRODUCT_LIST_REQUEST" are actual actions that we dispatch to reducer
//4) we make async request using redux-thunk. It allows to add a function within a function. so that it can return a function instead of action object, to carry out async task
export const listProducts = () => async (dispatch)=>{
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        });
        // fetching data from backend API.
        const {data} = await axios.get("/api/products") ;
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        
    }
}


// Action creator for product details request
export const listProductDetails = (id) => async (dispatch)=>{
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });
        // fetching data from backend API.
        const {data} = await axios.get(`/api/products/${id}`) ;
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
        
    }
}