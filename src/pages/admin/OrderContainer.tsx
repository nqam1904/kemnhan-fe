import React, { Component } from 'react';
import OrderComponents from 'views/admin/orders/OrderComponents';
class OrderContainer extends Component<any, any> {
    render(): React.ReactNode {
        return <OrderComponents {...this.props} />;
    }
}

export default OrderContainer;
