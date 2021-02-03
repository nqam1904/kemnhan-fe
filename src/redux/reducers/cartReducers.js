import * as types from '../action/cartAction'
// var data = JSON.parse(localStorage.getItem('cart'));
// var initialState = data ? data : []
var initialState = []

const cartReducers = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TO_CART:
            // if (state.length === 0) {
            //     state.push(action.item)
            // }
            // else {
            //     for (var product of state) {
            //         if (product.productId == action.item.productId) {
            //             product.quantity += 1
            //         }
            //         else {
            //             state.push(action.item)
            //         }
            //     }
            // }
            state.push(action.item)
            return state

        default: return state
    }
}

export default cartReducers;

