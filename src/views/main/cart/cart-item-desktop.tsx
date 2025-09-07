import { fNumber } from '@/utils/format-number';
import ImageAssets from '@/constants/ImagesAsset';
import { formatSubstring } from '@/utils/format-string';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface CartItemDesktopProps {
    item: {
        product: {
            image: string;
            name: string;
            description: string;
            price: number;
        };
        quantity: number;
    };
    onDeleteItem: () => void;
    subItem: () => void;
    plusItem: () => void;
}

function CartItemDesktop(props: CartItemDesktopProps) {
    const { item, onDeleteItem, subItem, plusItem } = props;

    return (
        <div className="cart_item_desktop">
            <div className="cart_thumb">
                <div className="cart_delete">
                    <img src={ImageAssets.delete} alt="delete" onClick={onDeleteItem} />
                </div>
                <LazyLoadImage
                    effect="blur"
                    className="cart_product_img"
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
                    <p className="cart_price">{fNumber(item.product.price || 0)} đ</p>
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

export default CartItemDesktop;
