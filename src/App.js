import React from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/user/home/HomeComponents";
import Admin from "./containers/admin/App";
import Login from "./containers/admin/LoginContainers";
import NotFoundPageComponent from "./components/user/NotFoundPage/NotFoundPageComponent";

const Page404 = () => {
  return <NotFoundPageComponent />;
};

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route component={Login} path="/login" />
        <Route component={Admin} path="/admin" />
        <Route component={Home} path="/" />
        {/* <Route component={Page404} /> */}
        {/* <Redirect from="/" to="/" /> */}
      </Switch>
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object,
};

export default App;
