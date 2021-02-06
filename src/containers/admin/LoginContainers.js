import React from 'react';
import { connect } from "react-redux";
import LoginComponent from '../../components/admin/login/Login'
import { loginAction } from '../../redux/action/loginAction';
class LoginContainer extends React.Component {
    render() {
        return (
            <LoginComponent {...this.props} />
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state)
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);