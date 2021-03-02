import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { API_URL } from '../../../config/setting';
import { Badge } from 'react-bootstrap';
import moment from 'moment'
import './NewsStyle.css';
import parse from 'html-react-parser'
const ItemNews = props => {

  function onDelete(id) {
    if (window.confirm(`Bạn có muốn xóa ${props.name} ? `)) {
      props.onDelete(id);
    }
  }

  function onUpdate(id) {
    props.onUpdate(id);
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
        <td>{props.content}</td>
        <td>{moment(props.endDate).format("DD-MM-yyyy")}</td>
        <td className="text-center">
          <Badge className="status_active" variant={props.isActive === true ? 'success' : 'danger'} onClick={() => props.onActive()}>
            {props.isActive === true ? "Hiển thị" : "Ẩn"}
          </Badge>
        </td>
        <td className="text-center">
          <button
            className="btn btn-warning mt-10 mr-10 white"
            onClick={() => onUpdate(props.id)}
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
}

export default ItemNews;