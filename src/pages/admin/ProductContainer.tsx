import React, { Component } from 'react';
import ProductsComponents from 'views/admin/products/ProductsComponents';
class ProductContainer extends Component<any, any> {
    render(): React.ReactNode {
        return <ProductsComponents {...this.props} />;
    }
}
export default ProductContainer;
