// Action responsible for making a backend request and get data.
// This is an Action creator

import axios from "axios";
import {PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL
} from "../constants/productConstants.js";

//1) similar task what useffect did in homescreen component earlier
//2)  Below function is an action creator. 
//3) Above constant "PRODUCT_LIST_REQUEST" are actual actions that we dispatch to reducer
//4) we make async request using redux-thunk. It allows to add a function within a function. so that it can return a function instead of action object, to carry out async task and give access to dispatch and getState of redux store
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



// DESC: Action creator to get delete a product. Admin only
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        });

        // destructuring state to get token
        const {userLogin:{userInfo}} = getState();

        // Sending data with a header, a content type of application/json 
        // Also, pass Token for protected routes
        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        
        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}



// DESC: Action creator to get create a product. Admin only
export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        });

        // destructuring state to get token
        const {userLogin:{userInfo}} = getState();

        // Sending data with a header, a content type of application/json 
        // Also, pass Token for protected routes
        const config = {
            headers: {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.post(`/api/products`,{}, config) ;

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


// DESC: Action creator to get create a product. Admin only
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        });

        // destructuring state to get token
        const {userLogin:{userInfo}} = getState();

        // Sending data with a header, a content type of application/json 
        // Also, pass Token for protected routes
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        
        const {data} = await axios.put(`/api/products/${product._id}`, product, config) ;

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
