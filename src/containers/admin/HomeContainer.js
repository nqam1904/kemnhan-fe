import React, { Component } from "react";
import HomeComponents from "../../components/admin/home/HomeComponents";

class HomeContainer extends Component {
  render() {
    return (
      <div>
        <HomeComponents {...this.props} />
      </div>
    );
  }
}

export default HomeContainer;
