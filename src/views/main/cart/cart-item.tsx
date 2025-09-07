import { useResponsive } from '@/hooks/use-responsive';

import CartItemMobile from './cart-item-mobile';
import CartItemDesktop from './cart-item-desktop';

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
