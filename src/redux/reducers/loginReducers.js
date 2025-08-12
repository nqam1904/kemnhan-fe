import * as Types from '../action/loginAction';

const initialState = {
    result: null,
    loading: false,
    data: null,
    error: null,
};
const loginReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return Object.assign({}, state, {
                loading: true,
                error: null,
                data: null,
            });
        case Types.LOGIN_SUCCESS:
            localStorage.setItem('token', action.response.access_token);
            return Object.assign({}, state, {
                result: true,
                loading: false,
                error: false,
                data: action.response,
            });

        case Types.LOGIN_ERROR:
            return Object.assign({}, state, {
                result: false,
                loading: false,
                data: null,
                error: action.error,
            });
        case Types.LOGOUT:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: null,
            });
        default:
            return state;
    }
};

export default loginReducers;
