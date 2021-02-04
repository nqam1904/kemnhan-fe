import React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config/setting";
import "./ItemProductShow.css";

const ItemProductShow = (props) => {
  function getProduct(id) {
    props.getProduct(id);
  }
  // console.log(props.images)
  return (
    <Link to={props.propsURL}>
      <div className="card_item">
        <img
          className="image"
          src={`${API_URL}/static/${props.images}`}
          alt={props.name}
        />
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
          {props.isActive === true ? (
            ""
          ) : (
            <div className="button_detail">Hết hàng</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ItemProductShow;
