import React, { Component } from "react";
import './ProductDetail.css';
import axios from 'axios';
import { API_URL } from "../../../config/setting";


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
      selectedImage: null,
      dataImage:[],
    }
  }
  async componentDidMount() {
    await this.getProductDetail()
  }
  getProductDetail = () => {
    const id = this.props.match.params.id;
    const path = 
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
          selectedImage: `${API_URL}/static/${res.data.images[0].key}`,
          dataImage:`${API_URL}/static/${res.data.images}`
        },()=>{
          console.log(this.state.dataImage)
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
    const { name, unit, description, shopeeUrl, displayPrice, selectedImage, dataImage } = this.state
console.log(dataImage,'aaaa')
    return (
      <div className="container-fluid">
        <div className="page_product_detail">
          <div className="product_img">
            {/* <img src={require('../../../res/image/image.png').default} /> */}
            <img src={selectedImage} />
{/* {selectedImage.length < 0 ?  <img className="image" src={`${API_URL}/static/${props.images}`} alt={props.name} /> : (<img src={selectedImage}/>)} */}
            <div className="product_img_slide">
              {/* {dataImage.map((x, index) => {
                return (
                  <figure>
                    <img
                    key={index}
                      src={x.key}
                      onClick={e => this.handleClick(x)}
                      alt={x.name}
                    />
                  </figure>
                );
              })} */}
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
