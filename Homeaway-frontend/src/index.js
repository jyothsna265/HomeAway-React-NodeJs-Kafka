// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();



import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
//import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import './index.css';
import App from './App';
import RootReducer from "./Redux/index";
//import RootReducer from "./Redux/reducer";
//import { reducer as RootReducer }from "redux-form";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as serviceWorker from './serviceWorker';

//middleware settings
// To resolve promise to store we use apply
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise, thunk, logger)));
//createStoreWithMiddleware(RootReducer)

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();