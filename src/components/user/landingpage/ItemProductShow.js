import React from "react";
import { API_URL } from "../../../config/setting";
import "./ItemProductShow.css";
import { history } from "../../../configureStore";
import { LazyLoadImage } from 'react-lazy-load-image-component';
const ItemProductShow = (props) => {
  // function getProduct(id) {
  //   props.getProduct(id);
  // }
  // console.log(props.images)
  // props.propsURL
  return (

    <div className="card_item" onClick={() => history.push(`/chi-tiet-san-pham?id=${props.id}`)}>
      <LazyLoadImage
        className="image"
        effect="blur"
        src={`${API_URL}/static/${props.images}`}
        alt={props.name}
        placeholderSrc={process.env.PUBLIC_URL + "/logo.png"} />
      <h5 id="title1" aria-hidden="true">
        {props.name}
      </h5>
      <div className="overlay">
        <div className="description">{props.description}</div>
        {props.isFeature === true ? (
          <div className="button_detail">Nổi bật</div>
        ) : (
            ""
          )}
        {/* {props.isActive === true ? (
          ""
        ) : (
            <div className="button_detail">Hết hàng</div>
          )} */}
      </div>
    </div>
    // </Link>
  );
};

export default ItemProductShow;
