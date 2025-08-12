import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SuccessPayment from './components/user/cart/SuccessPayment';
import Home from './components/user/home/HomeComponents';
import Admin from './containers/admin/App';
import Login from './containers/admin/LoginContainers';

const App = ({ history }) => {
    return (
        <ConnectedRouter history={history}>
            <Route component={SuccessPayment} path="/success" />
            <Switch>
                <Route component={Login} path="/login" />
                <Route component={Admin} path="/admin" />
                <Route component={Home} path="/" />
            </Switch>
        </ConnectedRouter>
    );
};

App.propTypes = {
    history: PropTypes.object,
};

export default App;
