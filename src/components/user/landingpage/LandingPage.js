import React, { Component } from "react";
import "./LandingPage.css";
class LandingPage extends Component {
  render() {
    return (
      <div className="landing" id="home">
        <img alt="#" src={require("../../../res/image/bg3.png").default} />
      </div>
    );
  }
}
export default LandingPage;
