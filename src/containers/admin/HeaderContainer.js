import React, { Component } from "react";
import HeaderComponents from "../../components/admin/header/HeaderComponents";

class HeaderContainer extends Component {
  render() {
    return (
      <div>
        <HeaderComponents {...this.porps} />
      </div>
    );
  }
}
export default HeaderContainer;
