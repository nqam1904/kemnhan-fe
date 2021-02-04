export const ADD_TO_CART = 'ADD_TO_CART';
export const EDDIT_TO_CART = 'EDDIT_TO_CART';
export const REMOVE_CART = 'REMOVE_CART';
export const actAddToCart = (item) => {
    return {
        type: ADD_TO_CART,
        item: item
    }
}