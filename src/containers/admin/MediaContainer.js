import React, { Component } from 'react';
import MediaComponent from '../../components/admin/Media/MediaComponent';
import { connect } from "react-redux";
import { loginAction, logOutAction } from '../../redux/action/loginAction';
class MediaContainer extends Component {
  render() {
    return (
      <MediaComponent {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaContainer);