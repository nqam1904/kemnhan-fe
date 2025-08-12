import React from 'react';
import { Badge } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { API_URL } from '../../../config/setting';
import ImageAssets from '../../../constants/ImagesAsset';
import { currencyFormat, formatSubstring } from '../../../utils/Function';
const ItemProduct = (props) => {
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
                        placeholderSrc={ImageAssets.logo}
                    />
                </td>
                <td>{currencyFormat(props.sellPrice)} VNĐ</td>
                <td>{props.soldQuantity}</td>
                <td>{props.unit}</td>
                <td>{props.stockQuantity}</td>
                <td>{formatSubstring(props.description)}</td>
                <td className="text-center">
                    <Badge variant={props.isFeature === true ? '' : ''} onClick={() => props.onFeature()}>
                        {props.isFeature === true ? (
                            <img src={ImageAssets.icEye} width={25} alt="feature" />
                        ) : (
                            <img src={ImageAssets.icNoEye} width={25} alt="not feature" />
                        )}
                    </Badge>
                </td>
                <td className="text-center">
                    <Badge variant={props.isActive === true ? '' : ''} onClick={() => props.onActive()}>
                        {props.isActive === true ? (
                            <img src={ImageAssets.icEye} width={25} alt="active" />
                        ) : (
                            <img src={ImageAssets.icNoEye} width={25} alt="inactive" />
                        )}
                    </Badge>
                </td>
                <td className="text-center">
                    <button className="btn btn-warning mt-10 mr-10 white" onClick={() => onEdit(props.id)}>
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
