import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';
// import 'datatables.net';
// import 'datatables.net-dt/css/jquery.dataTables.css';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import configureStore, { history } from "./configureStore";
import App from "./App";
import './App.css'
import "./index.css";
import "react-activity/dist/react-activity.css";
let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,

  document.getElementById(`root`)
);

