import moment from 'moment';
import React from 'react';
import { Badge } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { API_URL } from '../../../config/setting';
import ImageAssets from '../../../constants/ImagesAsset';
import { formatSubstring } from '../../../utils/Function';
import './NewsStyle.css';

const ItemNews = (props) => {
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
                <td>{props.id}</td>
                <td>{props.name}</td>
                <td>
                    <LazyLoadImage
                        effect="blur"
                        src={`${API_URL}/static/${props.images}`}
                        alt={props.name}
                        width="80"
                        placeholderSrc={ImageAssets.logo}
                    />
                </td>
                <td
                    dangerouslySetInnerHTML={{
                        __html: formatSubstring(props.content),
                    }}
                ></td>
                <td>{moment(props.endDate).format('DD-MM-yyyy')}</td>
                <td className="text-center">
                    <Badge className="status_active" onClick={() => props.onActive()}>
                        {props.isActive === true ? (
                            <img src={ImageAssets.icEye} width={25} alt="active" />
                        ) : (
                            <img src={ImageAssets.icNoEye} width={25} alt="inactive" />
                        )}
                    </Badge>
                </td>
                <td className="text-center">
                    <button className="btn btn-warning mt-10 mr-10 white" onClick={() => onUpdate(props.id)}>
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

export default ItemNews;
