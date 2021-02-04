import * as types from '../action/cartAction'
var data = JSON.parse(localStorage.getItem('cart'));
var initialState = data ? data : []
// var initialState = [
//     {
//         product: {
//             id: 1,
//             name: "kem trà xanh",
//             image: "http://103.159.50.98:3000/static/1612204748131.jpg",
//             price: 80000,
//             description: "kem mát lạnh"
//         },
//         quantity: 5
//     },
//     {
//         product: {
//             id: 1,
//             name: "kem trà xanh",
//             image: "http://103.159.50.98:3000/static/1612204748131.jpg",
//             price: 80000,
//             description: "kem mát lạnh"
//         },
//         quantity: 5
//     }
// ]

const cartReducers = (state = initialState, action) => {
    var { product, quantity } = action;
    var index = -1;
    switch (action.type) {
        case types.ADD_TO_CART:
            index = findProductInCart(state, product);
            if (index !== -1) {
                state[index].quantity += quantity;
            } else {
                state.push(action.item)
            }
            localStorage.setItem('cart', JSON.stringify(state))
            return [...state]

        default: return state
    }
}
var findProductInCart = (cart, product) => {
    var index = -1;
    if (cart.length > 0) {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].product.id === product.id) {
                index = i;
                break;
            }
        }
    }
    return index;
}
export default cartReducers;

