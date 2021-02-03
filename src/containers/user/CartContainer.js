import React, { Component } from 'react';
import CartComponent from '../../components/user/cart/CartComponent';
import { connect } from 'react-redux';
class CartContainer extends Component {
    render() {
        return (
            <CartComponent {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItem: state.cartReducers,
    }
}

export default connect(mapStateToProps, null)(CartContainer);