import { useResponsive } from '@/hooks/use-responsive';

import CartItemDesktop from './cart-item-desktop';
import CartItemMobile from './cart-item-mobile';

interface CartItemProps {
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

function CartItem(props: CartItemProps) {
    const { isMobile } = useResponsive();

    if (isMobile) {
        return <CartItemMobile {...props} />;
    }

    return <CartItemDesktop {...props} />;
}

export default CartItem;
