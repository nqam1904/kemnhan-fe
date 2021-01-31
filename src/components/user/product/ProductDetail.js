import React, { Component } from "react";

class ProductComponents extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div class="about">
        <div class="aboutText" data-aos="fade-up" data-aos-duration="1000">
          <h1>
            Why is it important that <br />{" "}
          </h1>
          <img src="img/doctor-woman-400px.png" alt="" />
        </div>
        <div class="aboutList" data-aos="fade-left" data-aos-duration="1000">
          this is page details product
        </div>
      </div>
    );
  }
}

export default ProductComponents;
