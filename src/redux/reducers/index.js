import { combineReducers } from 'redux';
import loginReducers from './loginReducers';
import categoryReducers from './categoryReducers';
const allReducers = combineReducers({
    loginReducers,categoryReducers,
});
export default allReducers;
