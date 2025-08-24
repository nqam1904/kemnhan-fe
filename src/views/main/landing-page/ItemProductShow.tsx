import { CONFIG } from 'config-global';
import ImageAssets from 'constants/ImagesAsset';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useRouter } from 'routes/hooks';
import './ItemProductShow.css';

interface ItemProductShowProps {
    id: string | number;
    name: string;
    description: string;
    images: string;
    isFeature: boolean;
    isActive: boolean;
    propsURL?: string;
}

const ItemProductShow: React.FC<ItemProductShowProps> = (props: any) => {
    const router = useRouter();
    return (
        <div className="card_item" onClick={() => router.push(`/chi-tiet-san-pham?id=${props.id}`)}>
            <LazyLoadImage
                className="image"
                effect="blur"
                src={`${CONFIG.imageUrl || CONFIG.serverUrl}/static/${props.images}`}
                alt={props.name}
                placeholderSrc={ImageAssets.logo}
            />
            <h5 id="title1" aria-hidden="true">
                {props.name}
            </h5>
            <div className="overlay">
                <div className="description">{props.description}</div>
                {props.isFeature === true ? <div className="button_detail">Nổi bật</div> : ''}
                {/* {props.isActive === true ? (
          ""
        ) : (
            <div className="button_detail">Hết hàng</div>
          )} */}
            </div>
        </div>
    );
};

export default ItemProductShow;
