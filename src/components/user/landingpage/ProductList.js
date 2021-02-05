import axios from "axios";
import React, { Component } from "react";
import ItemProductShow from "./ItemProductShow";
import { API_URL } from "../../../config/setting";
import "./ProductList.css";
// import ProductDetail from "../product/ProductDetail";
import history from "../../../store/Route";
// import { Link } from "react-router-dom";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  showProduct = (products) => {
    var result = null;
    if (products.length > 0) {
      result = products.slice(0, 6).map((item, idx) => {
        return (
          <div key={idx} className="item_product">
            <ItemProductShow
              name={item.name}
              id={item.id}
              description={item.description}
              images={item.images[0].key}
              isFeature={item.isFeature}
              isActive={item.isActive}
              //   getProduct={this.getProduct}
              propsURL={`/trang-chu/chi-tiet-san-pham?id=${item.id}`}
            />
          </div>
        );
      });
    }
    return result;
  };
  getProduct = (id) => {
    return history.push({
      pathname: `/trang-chu/chi-tiet-san-pham/${id}`,
    });
  };
  render() {
    const { products } = this.state;
    return (
      <div className="page__product">
        <div className="list__products">
          <div className="text">
            <p className="text-detail">
              Cần gì nến và hoa, khi kem chính là một món quà
            </p>
          </div>
          <div className="list_product">{this.showProduct(products)}</div>
        </div>
      </div>
    );
  }
}

export default ProductList;
