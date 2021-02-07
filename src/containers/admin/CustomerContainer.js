import React, { Component } from 'react';
import CustomerComponent from '../../components/admin/customer/CustomerComponent'
class CustomerContainer extends Component {
  render() {
    return (
      <CustomerComponent {...this.props} />
    );
  }
}

export default CustomerContainer;