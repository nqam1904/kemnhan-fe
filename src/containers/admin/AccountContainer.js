import React, { Component } from 'react';
import AccountComponent from '../../components/admin/account/AccountComponent'
class AccountContainer extends Component {
    render() {
        return (
            <AccountComponent {...this.props} />
        );
    }
}

export default AccountContainer;