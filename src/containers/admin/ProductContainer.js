import React, { Component } from 'react';
import ProductsComponents from '../../components/admin/products/ProductsComponents';
class ProductContainer extends Component {
    render() {
        return <ProductsComponents {...this.props} />;
    }
}
export default ProductContainer;
