import React, { Component } from 'react';
import OrderComponents from '../../components/admin/order/OrderComponents'
class OrderContainer extends Component {
    render() {
        return (
           <OrderComponents {...this.props}/>
        );
    }
}

export default OrderContainer;