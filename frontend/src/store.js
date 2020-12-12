// Connect our Reducers and any middleware. Here we create store(a single point of truth)

import { createStore, combineReducers, applyMiddleware} from "redux" ;

//Standard way to define async action creators. Middleware
import thunk from "redux-thunk" ;

// To use devtools to check on States
import {composeWithDevTools} from "redux-devtools-extension"; 
//importing productsreducers
import {productListReducer} from "./reducers/productReducers";

// All Reducers go here.
const reducer = combineReducers({
    productList: productListReducer,
});

//Initiate state of store
const initialState = {};

//
const middleware = [thunk] ;

// creating our Redux store
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)) ) ;

export default store;