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


// All Reducers go here.
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

// getting cart data from local storage
const cartItemsFromStorage = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): [];

//Initiate state of store
const initialState = {
    cart: { cartItems: cartItemsFromStorage}
};

//
const middleware = [thunk] ;

// creating our Redux store
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)) ) ;

export default store;