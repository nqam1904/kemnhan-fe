import React, { Component } from 'react';
import HomeComponents from '../../components/admin/home/HomeComponents';
import { connect } from 'react-redux';
import { loginAction } from '../../redux/action/loginAction';
class HomeContainer extends Component {
    render() {
        return (
            <div>
                <HomeComponents {...this.props} />
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
