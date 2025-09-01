import ImageAssets from 'constants/ImagesAsset';
import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import resolveImageUrl from 'utils/image-url';

interface ItemProductShowProps {
    id: string | number;
    name: string;
    description: string;
    images?: string;
    isFeature: boolean;
    isActive: boolean;
    price?: number;
}

const ItemProductShow: React.FC<ItemProductShowProps> = (props: any) => {
    const [imageSrc, setImageSrc] = React.useState<string>(
        props.images ? resolveImageUrl(props.images) : ImageAssets.logo
    );

    useEffect(() => {
        setImageSrc(props.images ? resolveImageUrl(props.images) : ImageAssets.logo);
    }, []);

    return (
        <Card
            className="product-card"
            onClick={() => {
                window.open(`/chi-tiet-san-pham?id=${props.id}`, '_blank');
            }}
            style={{ cursor: 'pointer' }}
        >
            <Card.Img
                variant="top"
                src={imageSrc}
                alt={props.name}
                onError={() => setImageSrc(ImageAssets.logo)}
                className="product-card__img"
            />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                {props.price !== undefined && (
                    <div style={{ color: '#fa541c', fontWeight: 700 }}>
                        Giá: {props.price?.toLocaleString('vi-VN')} đ
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default ItemProductShow;
