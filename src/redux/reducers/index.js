import { combineReducers } from "redux";
import loginReducers from "./loginReducers";
import categoryReducers from "./categoryReducers";
import { connectRouter } from "connected-react-router";
import cartReducers from "./cartReducers";
const allReducers = (history) =>
  combineReducers({
    loginReducers,
    categoryReducers,
    cartReducers,
    router: connectRouter(history),
  });
export default allReducers;
