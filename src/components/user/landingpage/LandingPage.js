import React, { Component } from "react";
import "./LandingPage.css";
class LandingPage extends Component {
  render() {

    return (
      <div className="landing">
        <img src={require('../../../res/image/bg3.png').default} />
      </div>
    );
  }
}
export default LandingPage;
