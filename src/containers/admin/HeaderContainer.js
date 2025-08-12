import React, { Component } from 'react';
import HeaderComponents from '../../components/admin/header/HeaderComponents';
import { connect } from 'react-redux';

import { loginAction, logOutAction } from '../../redux/action/loginAction';
class HeaderContainer extends Component {
    render() {
        return (
            <div>
                <HeaderComponents {...this.porps} />
            </div>
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
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
