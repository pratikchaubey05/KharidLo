// Connect our Reducers and any middleware. Here we create store(a single point of truth)

import { createStore, combineReducers, applyMiddleware} from "redux" ;

//Standard way to define async action creators. Middleware
import thunk from "redux-thunk" ;

// To use devtools to check on States
import {composeWithDevTools} from "redux-devtools-extension"; 
//importing productsreducers
import {productListReducer, productDetailsReducer} from "./reducers/productReducers";
//importing cartReducer
import{cartReducer} from "./reducers/cartReducers";
//importing userReducer
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer} from "./reducers/userReducers";
//importing userReducer
import {orderCreateReducer} from "./reducers/orderReducers";



// All Reducers go here.
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer
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