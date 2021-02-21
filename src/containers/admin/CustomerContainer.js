import React, { Component } from 'react';
import CustomerComponent from '../../components/admin/customer/CustomerComponent'
import { connect } from "react-redux";
import { loginAction, logOutAction } from '../../redux/action/loginAction';
class CustomerContainer extends Component {
  render() {
    return (
      <CustomerComponent {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {

  return {
    loading: state.loginReducers.loading,
    error: state.loginReducers.error,
    data: state.loginReducers.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (data) => {
      dispatch(loginAction(data));
    },
    logOutAction: () => {
      dispatch(logOutAction());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContainer);