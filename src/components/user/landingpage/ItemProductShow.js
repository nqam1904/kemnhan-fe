import React from "react";
import { API_URL } from "../../../config/setting";
import "./ItemProductShow.css";
import { createBrowserHistory } from "history";
const history = createBrowserHistory({
  forceRefresh: true
  });

const ItemProductShow = (props) => {
  // function getProduct(id) {
  //   props.getProduct(id);
  // }
  // console.log(props.images)
  // props.propsURL
  return (

      <div className="card_item" onClick={() => history.push("/trang-chu/chi-tiet-san-pham?id=1")}>
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
    // </Link>
  );
};

export default ItemProductShow;
