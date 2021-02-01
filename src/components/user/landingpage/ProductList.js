import axios from "axios";
import React, { Component } from "react";
import ItemProductShow from "./ItemProductShow";
import { API_URL } from "../../../config/setting";
import './ProductList.css'
import ProductDetail from "../product/ProductDetail";
import { Route } from "react-router-dom";
import history from "../../../store/Route";

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }
    componentDidMount() {
        axios.get(`${API_URL}/products`)
            .then((res) => {
                this.setState({ products: res.data })
            })
            .catch((err) => { console.log(err) })
    }
    showProduct = (products) => {
        var result = null;
        if (products.length > 0) {
            result = products.slice(0, 6).map((item) => {
                return (
                    <div className="item_product">
                        <ItemProductShow
                            name={item.name}
                            id={item.id}
                            description={item.description}
                            images={item.images[0].key}
                            isFeature={item.isFeature}
                            isActive={item.isActive}
                            getProduct={this.getProduct}
                        />
                    </div>
                )
            })
        }
        return result;
    }
    getProduct = (id) => {
        history.push(`/trang-chu/chi-tiet-san-pham/${id}`)
    }
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
                    <div className="list_product">
                        {this.showProduct(products)}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductList;
