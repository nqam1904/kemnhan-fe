import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeAllCart, removeCartItem, updateCartItem } from '../../store/slices/cart';
import CartComponent from '../../views/main/cart/CartComponent';

interface CartContainerProps {
    cartItem: any[];
    actUpdateItem: (itemUpdate: any, quantity: number) => void;
    actDeleteItem: (id: string | number) => void;
    actDeleteAll: () => void;
}

class CartContainer extends Component<CartContainerProps> {
    render(): React.ReactNode {
        return <CartComponent {...this.props} />;
    }
}

const mapStateToProps = (state: any) => {
    return {
        cartItem: state.cart,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actUpdateItem: (itemUpdate: any, quantity: number) => {
            dispatch(updateCartItem({ id: itemUpdate, quantityDelta: quantity }));
        },
        actDeleteItem: (id: string | number) => {
            dispatch(removeCartItem({ id }));
        },
        actDeleteAll: () => {
            dispatch(removeAllCart());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
