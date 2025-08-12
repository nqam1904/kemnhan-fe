import * as types from '../action/cartAction';
var data = JSON.parse(localStorage.getItem('cart'));
var initialState = data ? data : [];

const cartReducers = (state = initialState, action) => {
    var { item, idItemDelete, itemUpdate, quantityUpdate } = action;
    switch (action.type) {
        case types.ADD_TO_CART:
            if (state.length === 0 || state === []) {
                state.push(item);
            } else {
                const find = state.find((itemCart) => itemCart.product.id === item.product.id);
                if (find !== undefined) {
                    var i = state.indexOf(find);
                    state[i].quantity += 1;
                } else {
                    state.push(action.item);
                }
            }
            localStorage.setItem('cart', JSON.stringify(state));
            return state;
        /////////////////////////////////////
        case types.UPDATE_TO_CART:
            const find1 = state.find((itemCart) => itemCart.product.id === itemUpdate);
            if (find1 !== undefined) {
                var i1 = state.indexOf(find1);
                state[i1].quantity += quantityUpdate;
            }
            localStorage.setItem('cart', JSON.stringify(state));
            return state;
        /////////////////////////////////////
        case types.REMOVE_CART:
            const find2 = state.find((itemCart) => itemCart.product.id === idItemDelete);
            if (find2 !== undefined) {
                var i2 = state.indexOf(find2);
                state.splice(i2, 1);
            }
            if (state.length === 0) {
                localStorage.removeItem('cart');
            } else {
                localStorage.setItem('cart', JSON.stringify(state));
            }
            return state;
        //////////////////////////////////
        case types.REMOVE_All_CART:
            state = [];
            localStorage.removeItem('cart');
            return state;
        default:
            return state;
    }
};

export default cartReducers;
