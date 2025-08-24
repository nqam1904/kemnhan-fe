import React, { Component } from 'react';
import SuccessPayment from 'views/main/cart/SuccessPayment';
class SuccessPaymentContainer extends Component<any, any> {
    render(): React.ReactNode {
        return <SuccessPayment {...this.props} />;
    }
}

export default SuccessPaymentContainer;
