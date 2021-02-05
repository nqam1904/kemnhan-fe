export const ADD_TO_CART = 'ADD_TO_CART';
export const UPDATE_TO_CART = 'UPDATE_TO_CART';
export const REMOVE_CART = 'REMOVE_CART';
export const REMOVE_All_CART = 'REMOVE_All_CART'
export const actAddToCart = (item) => {
    return {
        type: ADD_TO_CART,
        item: item
    }
}

export const actUpdateItem = (itemUpdate, quantity) => {
    return {
        type: UPDATE_TO_CART,
        itemUpdate: itemUpdate,
        quantityUpdate: quantity
    }
}
export const actDeleteItem = (id) => {
    return {
        type: REMOVE_CART,
        idItemDelete: id
    }
}

export const actDeleteAll = () => {
    return {
        type: REMOVE_All_CART,
    }
}