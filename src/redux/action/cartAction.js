export const ADD_TO_CART = 'ADD_TO_CART';

export const actAddToCart = (product, quantity) => {
    return {
        type: ADD_TO_CART,
        product,
        quantity
    }
}