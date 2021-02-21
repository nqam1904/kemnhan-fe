import React from 'react';
import { Badge } from 'react-bootstrap';
import { API_URL } from '../../../config/setting';
import { currencyFormat, formatSubstring } from '../../../shared/Function';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const ItemProduct = props => {
  console.log(props.images);
  function onDelete(id) {
    if (window.confirm(`Bạn có muốn xóa ${props.name} ? `)) {
      props.onDelete(id);
    }
  }

  function onEdit(id) {
    props.onEdit(id);
  }
  return (

    <>
      <tr>
        <td>{props.index + 1}</td>
        <td>{props.name}</td>
        <td>
          <LazyLoadImage
            effect="blur"
            src={`${API_URL}/static/${props.images}`}
            alt={props.name}
            width="80"
            placeholderSrc={process.env.PUBLIC_URL + "/logo.png"} />
        </td>
        <td>{currencyFormat(props.sellPrice)} VNĐ</td>
        <td>{props.soldQuantity}</td>
        <td>{props.unit}</td>
        <td>{props.stockQuantity}</td>
        <td>{formatSubstring(props.description)}</td>
        <td className="text-center">
          <Badge variant={props.isFeature === true ? '' : ''} onClick={() => props.onFeature()}>
            {props.isFeature === true ? <img src={require('../../../res/image/ic_eye.png').default} width={25} alt="" /> : <img src={require('../../../res/image/ic_no_eye.png').default} width={25} alt="" />}
          </Badge>

        </td>
        <td className="text-center">
          <Badge variant={props.isActive === true ? '' : ''} onClick={() => props.onActive()}>
            {props.isActive === true ? <img src={require('../../../res/image/ic_eye.png').default} width={25} alt="" /> : <img src={require('../../../res/image/ic_no_eye.png').default} width={25} alt="" />}
          </Badge>

        </td>
        <td className="text-center">
          <button
            className="btn btn-warning mt-10 mr-10 white"
            onClick={() => onEdit(props.id)}
          >
            Sửa
            </button>
          <button className="btn btn-danger mt-10" onClick={() => onDelete(props.id)}>
            Xóa
            </button>
        </td>
      </tr>
    </>
  );
};

export default ItemProduct;