import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../../routes";
import Navbar from "../navbar/Navbar";
import LandingPage from "../landingpage/LandingPage";
import ProductList from "../landingpage/ProductList";
import AboutComponents from "../about/AboutComponents";
import Footer from "../footer/Footer";
import ScrollToTop from '../../../shared/ScrollToTop'
import { Button, Modal } from 'react-bootstrap'
class HomeComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
  }
  componentDidMount() {
    // this.setState({
    //   modal: true
    // })
  }

  render() {
    const { modal } = this.state;
    return (
      <div className="wrapper">
        <div class="pyro"><div class="before"></div><div class="after"></div></div>
        <Modal show={modal}
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={() => { this.setState({ modal: false }) }}>
          <Modal.Header closeButton>
            <Modal.Title>Kemnhanonline thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Kính chúc quý khách 1 năm mới an khang thịnh vượng, tấn tài tấn lộc, vạn sự như ý
          </Modal.Body>
          <Modal.Footer>

            <Button variant="primary" onClick={() => { this.setState({ modal: false }) }}>
              Đóng
          </Button>
          </Modal.Footer>
        </Modal>
        <Navbar />


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
                  path={prop.path}

                />
              );
            }
            return null;
          })}
          {window.location.pathname !== "/chi-tiet-san-pham" && (
            <>

              <LandingPage />
              <ProductList />
              <AboutComponents />
            </>
          )}
        </Switch>
        <ScrollToTop />
        <Footer />
      </div>
    );
  }
}

export default HomeComponents;
