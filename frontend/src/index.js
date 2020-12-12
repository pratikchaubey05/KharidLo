import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux" ;
import store from "./store.js";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";

ReactDOM.render(
  // The Provider makes the Redux store available to any nested components that have been wrapped in the connect() function.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

