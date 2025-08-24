import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../store/slices/cart';
import ProductDetail from '../../views/main/product/ProductDetail';
export class ProductContainer extends Component<any, any> {
    render(): React.ReactNode {
        return <ProductDetail {...(this.props as any)} />;
    }
}

const mapStateToProps = (state: any) => {
    return {
        data: state.cart,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actAddToCart: (item: any) => {
            dispatch(addToCart(item));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
