import * as types from '../action/cartAction'
// var data = JSON.parse(localStorage.getItem('cart'));
// var initialState = data ? data : []
var initialState = [
    {
        product: {
            id: 1,
            name: "kem trà xanh",
            image: "http://103.159.50.98:3000/static/1612204748131.jpg",
            price: 80000,
            description: "kem mát lạnh"
        },
        quantity: 5
    },
    {
        product: {
            id: 1,
            name: "kem trà xanh",
            image: "http://103.159.50.98:3000/static/1612204748131.jpg",
            price: 80000,
            description: "kem mát lạnh"
        },
        quantity: 5
    }
]

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
            // state.push(action.item)
            console.log(action)
            return state

        default: return state
    }
}

export default cartReducers;

