import * as types from '../action/cartAction'
var data = JSON.parse(localStorage.getItem('cart'));
var initialState = data ? data : []


const cartReducers = (state = initialState, action) => {
    var { item } = action;
    switch (action.type) {
        case types.ADD_TO_CART:
            if (state.length == 0 || state == []) {
                state.push(item)
            }
            else {
                const find = state.find((itemCart) =>
                    itemCart.product.id === item.product.id
                )
                if (find !== undefined) {
                    var i = state.indexOf(find)
                    state[i].quantity += 1
                }
                else {
                    state.push(action.item)
                }

            }
            localStorage.setItem('cart', JSON.stringify(state))
            return state

        default: return state
    }
}

export default cartReducers;

