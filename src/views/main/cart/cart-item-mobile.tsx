import { fNumber } from '@/utils/format-number';
import ImageAssets from '@/constants/ImagesAsset';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface CartItemMobileProps {
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

function CartItemMobile(props: CartItemMobileProps) {
    const { item, onDeleteItem, subItem, plusItem } = props;

    return (
        <div className="cart_item_mobile">
            <div className="cart_thumb_mobile">
                <div className="cart_delete">
                    <img src={ImageAssets.delete} alt="delete" onClick={onDeleteItem} />
                </div>
                {/* @ts-ignore */}
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
            <div className="content_item_mobile">
                <p className="title_item_cart">{item.product.name}</p>
                <p className="cart_price">{fNumber(item.product.price || 0)} đ</p>
            </div>
            <div className="cart_qty_mobile">
                <button type="button" className="qty_btn" onClick={() => subItem()} aria-label="Giảm">&minus;</button>
                <div className="quantity" aria-live="polite">{item.quantity}</div>
                <button type="button" className="qty_btn" onClick={() => plusItem()} aria-label="Tăng">+</button>
            </div>
        </div>
    );
}

export default CartItemMobile;
