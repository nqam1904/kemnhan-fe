export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_TO_CART = 'UPDATE_TO_CART';
export const REMOVE_CART = 'REMOVE_CART';

export const actAddToCart = (item) => {
    return {
        type: ADD_TO_CART,
        item: item
    }
}

export const actUpdateItem = (item) => {
    return {
        type: UPDATE_TO_CART,
        item: item
    }
}
export const actDeleteItem = (item) => {
    return {
        type: REMOVE_CART,
        item: item
    }
}