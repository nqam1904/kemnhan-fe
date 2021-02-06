import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import allReducers from "./redux/reducers";
import rootSaga from "./redux/middleware/saga/rootSaga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware(); 


export const history = createBrowserHistory({
  forceRefresh: true,
});
export default function configureStore(preloadedState) {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    allReducers(history),
    preloadedState,
    composeEnhancer(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

