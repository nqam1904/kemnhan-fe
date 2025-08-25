import ImageAssets from 'constants/ImagesAsset';
import { Badge } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fNumber } from 'utils/format-number';
import { formatSubstring } from 'utils/format-string';
import resolveImageUrl from 'utils/image-url';

interface ItemProductProps {
    id: any;
    name: string;
    sellPrice: number;
    stockQuantity: number;
    soldQuantity: number;
    isFeature: boolean;
    isActive: boolean;
    onEdit: (id: any) => void;
    onDelete: (id: any) => void;
    onUpdateStatus: (id: any, status: any) => void;
    onFeature: () => void;
    onActive: () => void;
}

const ItemProduct = (props: any) => {
    function onDelete(id: any) {
        if (window.confirm(`Bạn có muốn xóa ${props.name} ? `)) {
            props.onDelete(id);
        }
    }

    function onEdit(id: any) {
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
                        src={resolveImageUrl(`static/${props.images}`)}
                        alt={props.name}
                        width="80"
                        placeholderSrc={ImageAssets.logo}
                    />
                </td>
                <td>{fNumber(props.sellPrice)} VNĐ</td>
                <td>{props.soldQuantity}</td>
                <td>{props.unit}</td>
                <td>{props.stockQuantity}</td>
                <td>{formatSubstring(props.description)}</td>
                <td className="text-center">
                    <Badge
                        variant={props.isFeature === true ? '' : ''}
                        onClick={() => props.onFeature()}
                    >
                        {props.isFeature === true ? (
                            <img src={ImageAssets.icEye} width={25} alt="feature" />
                        ) : (
                            <img src={ImageAssets.icNoEye} width={25} alt="not feature" />
                        )}
                    </Badge>
                </td>
                <td className="text-center">
                    <Badge
                        variant={props.isActive === true ? '' : ''}
                        onClick={() => props.onActive()}
                    >
                        {props.isActive === true ? (
                            <img src={ImageAssets.icEye} width={25} alt="active" />
                        ) : (
                            <img src={ImageAssets.icNoEye} width={25} alt="inactive" />
                        )}
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
