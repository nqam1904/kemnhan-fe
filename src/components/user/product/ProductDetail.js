import React, { Component } from "react";
import './ProductDetail.css';
import axios from 'axios';
import { API_URL } from "../../../config/setting";

const dataImage = [
  { name: require('../../../res/image/bacha.jpg').default },
  { name: require('../../../res/image/chanh.jpg').default },
  { name: require('../../../res/image/mangcau.jpg').default },
  { name: require('../../../res/image/socola.jpg').default },
]
class ProductDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      unit: "",
      description: "",
      shopeeUrl: "",
      displayPrice: 0,
      isActive: false,
      isFeature: false,
      images: [],
      selectedImage: null
    }
  }
  async componentDidMount() {
    await this.getProductDetail()
  }
  getProductDetail = () => {
    const id = this.props.match.params.id;
    axios.get(`${API_URL}/products/${id}`)
      .then(res =>
        this.setState({
          name: res.data.name,
          unit: res.data.unit,
          description: res.data.description,
          shopeeUrl: res.data.shopeeUrl,
          displayPrice: res.data.displayPrice,
          isActive: res.data.isActive,
          isFeature: res.data.isFeature,
          selectedImage: res.data.images
        })
      ).catch(err => { console.log(err) })
  }
  handleClick = image => {
    this.setState(
      {
        selectedImage: image.name
      });
  };
  render() {
    const { name, unit, description, shopeeUrl, displayPrice, selectedImage, images } = this.state

    return (
      <div className="container-fluid">
        <div className="page_product_detail">
          <div className="product_img">
            {/* <img src={require('../../../res/image/image.png').default} /> */}
            <img src={selectedImage} />

            <div className="product_img_slide">
              {dataImage.map((x, index) => {
                return (
                  <figure>
                    <img
                      src={x.name}
                      onClick={e => this.handleClick(x)}
                    />
                  </figure>
                );
              })}
            </div>
          </div>
          <div className="product_body">
            <div className="product_content">
              <p className="content">{name}</p>
              <p className="content_price">{displayPrice}/{unit}</p>
              <p className="content_des">{description}</p>
            </div>
            <div className="option_detail">
              <div className="btn_buy" onClick={() => { alert('them gio hang') }}><span>Mua Ngay</span></div>
              <div className="btn_buy"><span>Shoppe</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
