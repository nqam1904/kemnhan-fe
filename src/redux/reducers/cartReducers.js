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
    var { item } = action;
    var index = -1;
    console.log('cc', state.length)
    switch (action.type) {
        case types.ADD_TO_CART:

            if (state.length == 0 || state == []) {
                state.push(item)
                console.log('ok')
            }
            else {
                console.log('ko')
                // for (var itemCart of state) {
                //     if (itemCart.product.id === item.product.id) {
                //         itemCart.quantity += 1
                //         console.log('old', itemCart.product.id, item.product.id, itemCart.quantity, item.quantity)
                //         break;
                //     }
                //     else {
                //         console.log('new')
                //         state.push(action.item)
                //         break;
                //     }
                // }
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
//////////////////////////////////////////////////
var findProductInCart = (item) => {
    var index = -1;
    if (item.length > 0) {
        for (var i = 0; i < item.length; i++) {
            if (item[i].product.id === item.id) {
                index = i;
                break;
            }
        }
    }
    return index;
}
export default cartReducers;

