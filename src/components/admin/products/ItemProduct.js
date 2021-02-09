import React from 'react';
import { API_URL } from '../../../config/setting';
import { currencyFormat, formatSubstring } from '../../../shared/Function'
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
        <td><img src={`${API_URL}/static/${props.images}`} alt={props.name} width="80" /></td>
        <td>{currencyFormat(props.sellPrice)}</td>
        <td>{props.soldQuantity}</td>
        <td>{props.unit}</td>
        <td>{props.stockQuantity}</td>
        <td>{formatSubstring(props.description)}</td>
        <td>{props.isFeature.toString()}</td>
        <td>{props.isActive.toString()}</td>
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