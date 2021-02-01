import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../../routes";
import Navbar from "../navbar/Navbar";
import LandingPage from "../landingpage/LandingPage";
import ProductList from "../landingpage/ProductList";
import "../../../App.css";
import AboutComponents from "../about/AboutComponents";
import Footer from "../footer/Footer";
class HomeComponents extends Component {
  render() {
    return (
      <div className="wrapper">
        <Navbar />
        <Switch>
          {routes.map((prop, key) => {
            if (prop.layout === `/trang-chu`) {
              if (prop.path != '/') {
                return (
                  <Route
                    component={(props) => (
                      <prop.component
                        {...props}
                        someThingProps="this is some props"
                      />
                    )}
                    key={key}
                    path={prop.layout + prop.path}
                  />
                );
              } else {
                return (
                  <>
                    <LandingPage />
                    <ProductList />
                    <AboutComponents />
                  </>
                );
              }
            }
            return null;
          })}
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default HomeComponents;
