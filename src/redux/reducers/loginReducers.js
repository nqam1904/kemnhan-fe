import *as Types from '../action/loginAction';

const initialState = {
    loading: false,
    data: null,
    error: null
}
const loginReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN:
            return Object.assign({}, state, {
                loading: false,
                error: null,
                data: action.data
            })
        case Types.LOGIN_SUCCESS:
            // localStorage.setItem("token", action.data.access_token)
            console.log(action)

            return Object.assign({}, state, {
                loading: false,
                error: false,
                data: action.response.user
            })

        case Types.LOGIN_ERROR:
            return Object.assign({}, state, {
                loading: false,
                data: null,
                error: action.error
            })
        default:
            return state
    }
}

export default loginReducers;