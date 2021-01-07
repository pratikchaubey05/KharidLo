// Desc: Action creators for placing and creating an order
import axios from "axios";
import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL} from "../constants/orderConstants";


// DESC: Create an Order Action Creator
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
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
        
        const {data} = await axios.post(`/api/orders`, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

// DESC: Get an Order details Action Creator
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
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
        
        const {data} = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


// DESC: Update paid order details Action Creator
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
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
        
        const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


// DESC: Update deliver order details Action Creator. Admin Only
export const deliverOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
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
        
        const {data} = await axios.put(`/api/orders/${orderId}/deliver`,{}, config);

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}



// DESC: Action creator to get all the order by a user, for profile screen
export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
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
        
        const {data} = await axios.get("/api/orders/myorders", config)

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}


// DESC: Action creator to get all the order. Admin Only
export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
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
        
        const {data} = await axios.get("/api/orders", config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
