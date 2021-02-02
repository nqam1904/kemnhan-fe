import * as types from '../action/cartAction'
var data = JSON.parse(localStorage.getItem('cart'));
var initialState = data ? data : []

const cartReducers = ( state = initialState, action ) => {
    switch ( action.type){
        case types.ADD_TO_CART:
            return [...state]
        default:return [...state]
    }
}

export default cartReducers;