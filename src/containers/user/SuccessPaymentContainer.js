import React, { Component } from 'react';
import SuccessPayment from '../../components/user/cart/SuccessPayment';
class SuccessPaymentContainer extends Component {
    render() {
        return <SuccessPayment {...this.props} />;
    }
}

export default SuccessPaymentContainer;
