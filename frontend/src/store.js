// Connect our Reducers and any middleware. Here we create store(a single point of truth)

import { createStore, combineReducers, applyMiddleware} from "redux" ;

//Standard way to define async action creators. Middleware
import thunk from "redux-thunk" ;

// To use devtools to check on States
import {composeWithDevTools} from "redux-devtools-extension"; 
//importing productsreducers
import {productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer} from "./reducers/productReducers";
//importing cartReducer
import{cartReducer} from "./reducers/cartReducers";
//importing userReducer
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer} from "./reducers/userReducers";
//importing order create Reducer, order details reducer
import {orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer} from "./reducers/orderReducers";

// All Reducers go here.
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy : orderListMyReducer
    
});

// getting cart data from local storage
const cartItemsFromStorage = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): [];

// getting user info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo")): null ;

// getting shipping Address from local storage
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")? JSON.parse(localStorage.getItem("shippingAddress")): {} ;


//Initiate state of store
const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
};

//
const middleware = [thunk] ;

// creating our Redux store
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)) ) ;

export default store;