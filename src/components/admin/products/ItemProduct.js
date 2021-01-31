import React from 'react';

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
        <td><img src={props.images} alt={props.name} width="60" /></td>
        <td>{props.displayPrice}</td>
        <td>{props.sellPrice}</td>
        <td>{props.unit}</td>
        <td>{props.stockQuantity}</td>
        <td>{props.description}</td>
        <td>{props.isFeature.toString()}</td>
        <td>{props.isActive.toString()}</td>
        <td className="text-center">
          <button
            className="btn btn-warning mr-10 white"
            onClick={() => onEdit(props.id)}
          >
            Sửa
            </button>
          <button className="btn btn-danger" onClick={() => onDelete(props.id)}>
            Xóa
            </button>
        </td>
      </tr>
    </>
  );
};

export default ItemProduct;