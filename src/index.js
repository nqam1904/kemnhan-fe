import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore, { history } from "./configureStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import "react-toastify/dist/ReactToastify.css";
import "react-activity/dist/react-activity.css";
import App from "./App";
import './App.css'
import "./index.css";

let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,

  document.getElementById(`root`)
);

