import React, { Component } from 'react';
import { connect } from 'react-redux';
// Removed legacy actions import (not present in this project)
import CustomerComponent from 'views/admin/customer/CustomerComponent';
class CustomerContainer extends Component<any, any> {
    render(): React.ReactNode {
        return <CustomerComponent {...this.props} />;
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);
