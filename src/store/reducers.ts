import { combineReducers } from '@reduxjs/toolkit';

import auth from './slices/auth';
import cart from './slices/cart';
import user from './slices/user';
import notify from './slices/notify';
import { RTKQueryApi } from './create-api';

// * Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    // Slices
    auth,
    user,
    notify,
    cart,
    // Create slice from api
    // Create slice from api
    [RTKQueryApi.reducerPath]: RTKQueryApi.reducer,
});

export default rootReducer;
