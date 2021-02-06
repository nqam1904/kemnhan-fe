import React, { Component } from "react";
import HeaderContainer from "./HeaderContainer";
import routes from "../routes";
import { Switch, Route } from "react-router-dom";
class App extends Component {
  showContent = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
  render() {
    return (
      <>
        <HeaderContainer />
        <div className="container-fluid">{this.showContent(routes)}</div>
      </>
    );
  }
}

export default App;
