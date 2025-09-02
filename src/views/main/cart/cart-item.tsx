import ImageAssets from '@/constants/ImagesAsset';
import { formatSubstring } from '@/utils/format-string';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface CartItemProps {
    item: {
        product: {
            image: string;
            name: string;
            description: string;
        };
        quantity: number;
    };
    onDeleteItem: () => void;
    subItem: () => void;
    plusItem: () => void;
}

function CartItem(props: CartItemProps) {
    const { item, onDeleteItem, subItem, plusItem } = props;

    return (
        <div className="cart_item">
            <div className="content_item">
                <div className="item_delete_1" onClick={() => onDeleteItem()}>
                    <img src={ImageAssets.delete} alt="delete" />
                </div>
                <LazyLoadImage effect="blur" src={item.product.image} alt={item.product.name} />
                <div className="mota">
                    <p className="title_item_cart">{item.product.name}</p>
                    <p className="title_item_cart description__cart">
                        {formatSubstring(item.product.description)}
                    </p>
                </div>
            </div>
            <div className="option_item">
                <img src={ImageAssets.tru} alt="minus" onClick={() => subItem()} />
                <div className="quantity">{item.quantity}</div>
                <img src={ImageAssets.plus} alt="plus" onClick={() => plusItem()} />
            </div>
        </div>
    );
}

export default CartItem;
