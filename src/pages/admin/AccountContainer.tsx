import React, { Component } from 'react';
import { connect } from 'react-redux';
// Removed legacy actions import (not present in this project)
import AccountComponent from 'views/admin/account/AccountComponent';

class AccountContainer extends Component<any, any> {
    render(): React.ReactNode {
        return <AccountComponent {...this.props} />;
    }
}
const mapStateToProps = (state: any) => {
    return {
        loading: state.loginReducers.loading,
        error: state.loginReducers.error,
        data: state.loginReducers.data,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        // No actions wired; keep props minimal while porting
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);
