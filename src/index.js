import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import configureStore, { history } from "./configureStore";
import App from "./App";

// const sagaMiddleware = createSagaMiddleware();
let store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,

  document.getElementById(`root`)
);
