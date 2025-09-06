import { paths } from '@/routes/paths';
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
import resolveImageUrl from '@/utils/image-url';
import ImageAssets from '@/constants/ImagesAsset';

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
    const { id, name, description, images, price } = props;
    const [imageSrc, setImageSrc] = React.useState<string>(
        images ? resolveImageUrl(images) : ImageAssets.logo
    );

    useEffect(() => {
        setImageSrc(images ? resolveImageUrl(images) : ImageAssets.logo);
    }, []);

    return (
        <Card
            className="product-card"
            onClick={() => {
                window.open(paths.main.productDetail(id), '_blank');
            }}
            style={{ cursor: 'pointer' }}
        >
            <Card.Img
                variant="top"
                src={imageSrc}
                alt={name}
                onError={() => setImageSrc(ImageAssets.logo)}
                className="product-card__img"
            />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text className="product-card__desc" title={description}>
                    {description}
                </Card.Text>
                {price !== undefined && (
                    <div style={{ color: '#fa541c', fontWeight: 700 }}>
                        Giá: {price?.toLocaleString('vi-VN')} đ
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default ItemProductShow;
