import React, { Component } from "react";
import "./ProductDetail.css";
import axios from "axios";
import { API_URL } from "../../../config/setting";
import { toast, ToastContainer } from "react-toastify";
import { history } from "../../../configureStore";
import { currencyFormat } from '../../../shared/Function';
import { LazyLoadImage } from 'react-lazy-load-image-component';
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
      unit: "",
      description: "",
      shopeeUrl: "",
      displayPrice: 0,
      isActive: false,
      isFeature: false,
      images: [],
      sellPrice: 0,
      selectedImage: null,
      dataImage: [],
      quantity: 0,
      note: "",
      loading: true,
    };
  }
  async componentDidMount() {
    await this.getProductDetail();
  }
  getRouteParams = () => {
    const search = new URLSearchParams(history.location.search);
    const params = {};

    for (let p of search.entries()) {
      params[p[0]] = p[1];
    }

    return params;
  };
  getProductDetail = () => {
    const { id } = this.getRouteParams();
    console.log(id)
    axios
      .get(`${API_URL}/products/${id}`)
      .then((res) =>
        this.setState({
          name: res.data.name,
          unit: res.data.unit,
          description: res.data.description,
          shopeeUrl: res.data.shopeeUrl,
          sellPrice: res.data.sellPrice,
          isActive: res.data.isActive,
          isFeature: res.data.isFeature,
          selectedImage: `${API_URL}/static/${res.data.images[0].key}`,
          dataImage: res.data.images,
          loading: false,
        }, () => {

          console.log(res.data);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };
  handleClick = (image) => {
    this.setState(
      {
        selectedImage: `${API_URL}/static/${image.key}`,
      },
      () => {
        console.log(image.key);
      }
    );
  };
  addCart = (product) => {
    const { id } = this.getRouteParams();
    const data = {
      product: {
        id: parseInt(id),
        name: this.state.name,
        image: this.state.selectedImage,
        price: this.state.sellPrice,
        description: this.state.description,
      },
      quantity: 1,
    };

    this.props.actAddToCart(data);
    console.log("data cart", id, this.props.data);
    toast.success("Thêm vào giỏ thành công!");
  };
  render() {
    const {
      name,
      unit,
      description,
      shopeeUrl,
      sellPrice,
      selectedImage,
      dataImage,
      id,
      loading,
    } = this.state;

    return (
      <>
        {" "}
        {loading ? (
          <>Loading</>
        ) : (
            <div className="container-fluid">
              <ToastContainer autoClose={2000} />
              <div className="page_product_detail">
                <div className="product_img">
                  {/* <img src={require('../../../res/image/image.png').default} /> */}
                  <LazyLoadImage
                    effect="blur"
                    src={selectedImage}
                    placeholderSrc={process.env.PUBLIC_URL + "/logo.png"}
                    alt="#" />
                  {/* {selectedImage.length < 0 ?  <img className="image" src={`${API_URL}/static/${props.images}`} alt={props.name} /> : (<img src={selectedImage}/>)} */}
                  {/* <div className="product_img_slide">
                    {dataImage.map((x, index) => {
                      return (
                        <figure key={index}>
                          <img
                            key={index}
                            src={`${API_URL}/static/${x.key}`}
                            onClick={(e) => this.handleClick(x)}
                            alt={x.name}
                          />
                        </figure>
                      );
                    })}
                  </div> */}
                </div>
                <div className="product_body">
                  <div className="product_content">
                    <p className="content">{name}</p>
                    <p className="content_price">
                      {currencyFormat(sellPrice)}đ/{unit}
                    </p>
                    <p className="content_des">{description}</p>
                    <div id="btn_cart" onClick={() => this.addCart(id)} className="btn_mobile_cart">
                      <p>Mua ngay</p>
                    </div>
                  </div>
                  <div className="option_detail">
                    <div className="btn_buy" onClick={() => this.addCart(id)}>
                      <span>Mua Ngay</span>
                    </div>
                    <div className="btn_shopee" onClick={() => window.open(shopeeUrl, '_blank')}>
                      <img src={require('../../../res/image/shopee.png').default} width={25} /><span>Shopee</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )
        }
      </>
    );
  }
}

export default ProductDetail;
