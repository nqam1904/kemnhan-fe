import { fNumber } from '@/utils/format-number';
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
            <div className="cart_thumb">
                <button type="button" className="cart_delete" onClick={() => onDeleteItem()}>
                    <img src={ImageAssets.delete} alt="delete" />
                </button>
                <LazyLoadImage
                    effect="blur"
                    src={item.product.image || ImageAssets.logo}
                    placeholderSrc={ImageAssets.logo}
                    alt={item.product.name}
                    onError={(e: any) => {
                        if (e?.target) e.target.src = ImageAssets.logo;
                    }}
                />
            </div>
            <div className="content_item">
                <div className="mota">
                    <p className="title_item_cart">{item.product.name}</p>
                    <p className="cart_price">{fNumber((item as any)?.product?.price || 0)} đ</p>
                    <p className="title_item_cart description__cart">
                        {formatSubstring(item.product.description)}
                    </p>
                </div>
            </div>
            <div className="cart_qty">
                <button type="button" className="qty_btn" onClick={() => subItem()} aria-label="Giảm">&minus;</button>
                <div className="quantity" aria-live="polite">{item.quantity}</div>
                <button type="button" className="qty_btn" onClick={() => plusItem()} aria-label="Tăng">+</button>
            </div>
        </div>
    );
}

export default CartItem;
