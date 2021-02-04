import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductDetail from '../../components/user/product/ProductDetail'
import { actAddToCart } from '../../redux/action/cartAction'
export class ProductContainer extends Component {
    render() {
        return (
            <ProductDetail {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        data: state.cartReducers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actAddToCart: (product) => {
            dispatch(actAddToCart(product, 1));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer)
