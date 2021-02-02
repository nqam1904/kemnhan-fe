import { combineReducers } from 'redux';
import loginReducers from './loginReducers';
import categoryReducers from './categoryReducers';
import cartReducers from './cartReducers';
const allReducers = combineReducers({
    loginReducers,categoryReducers,cartReducers
});
export default allReducers;
