import React, { Component } from 'react';
import CartComponent from '../../components/user/cart/CartComponent';
import { connect } from 'react-redux';
import { actDeleteAll, actDeleteItem, actUpdateItem } from '../../redux/action/cartAction'
class CartContainer extends Component {
    render() {
        return (
            <CartComponent {...this.props} />
        );
    }
}


const mapStateToProps = (state) => {
    // console.log(state)
    return {
        cartItem: state.cartReducers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actUpdateItem: (itemUpdate, quantity) => {
            dispatch(actUpdateItem(itemUpdate, quantity));
        },
        actDeleteItem: (id) => {
            dispatch(actDeleteItem(id));
        },
        actDeleteAll: () => {
            dispatch(actDeleteAll())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)