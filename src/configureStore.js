import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import allReducers from "./redux/reducers";

export const history = createBrowserHistory({
  forceRefresh: true,
});

export default function configureStore(preloadedState) {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    allReducers(history),
    preloadedState,
    composeEnhancer(applyMiddleware(routerMiddleware(history)))
  );
  return store;
}
