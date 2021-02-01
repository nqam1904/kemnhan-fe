import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/user/home/HomeComponents";
import App from "./containers/admin/App";
import './index.css'
import Login from "./containers/admin/LoginContainers";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Redirect,
  Route,
  Router,
  HashRouter,
  Switch,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import allReducers from "./redux/reducers";
import rootSaga from "./redux/middleware/saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
const hist = createBrowserHistory();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HashRouter>
        <Router history={hist}>
          <Switch>
            <Route component={Home} path="/trang-chu" />
            <Route component={Login} path="/login" />
            <Route component={App} path="/admin" />
            <Redirect to="/trang-chu" />
          </Switch>
        </Router>
      </HashRouter>
    </BrowserRouter>
  </Provider>,

  document.getElementById(`root`)
);
sagaMiddleware.run(rootSaga);
