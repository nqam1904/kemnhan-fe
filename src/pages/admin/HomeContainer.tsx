import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeComponents from 'views/admin/home/HomeComponents';

interface HomeContainerProps {
    loading: boolean;
    error: any;
    data: any;
    loginAction: (data: any) => void;
}

class HomeContainer extends Component<HomeContainerProps> {
    render(): React.ReactNode {
        return (
            <div>
                <HomeComponents {...this.props} />
            </div>
        );
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
        loginAction: (data: any) => {},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
