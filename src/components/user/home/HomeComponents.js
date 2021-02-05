import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../../routes";
import Navbar from "../navbar/Navbar";
import LandingPage from "../landingpage/LandingPage";
import ProductList from "../landingpage/ProductList";
import AboutComponents from "../about/AboutComponents";
import Footer from "../footer/Footer";

class HomeComponents extends Component {
  render() {
    return (
      <div className="wrapper">
        <Navbar />
        <LandingPage />
        <Switch>
          {routes.map((prop, key) => {
            if (prop.layout === `/trang-chu`) {
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
            }
            return null;
          })}
        </Switch>
        {window.location.pathname !== "/trang-chu/chi-tiet-san-pham" && (
          <>

            <ProductList />
            <AboutComponents />
          </>
        )}
        <Footer />
      </div>
    );
  }
}

export default HomeComponents;
