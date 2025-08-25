import { useDispatch, useSelector } from 'react-redux';
import { removeAllCart, removeCartItem, updateCartItem } from '../../store/slices/cart';
import CartComponent from '../../views/main/cart/view';

export default function CartPage() {
    const dispatch = useDispatch();
    const cartItem = useSelector((state: any) => state.cart);

    const actUpdateItem = (itemUpdate: any, quantity: number) => {
        dispatch(updateCartItem({ id: itemUpdate, quantityDelta: quantity }));
    };
    const actDeleteItem = (id: string | number) => {
        dispatch(removeCartItem({ id }));
    };
    const actDeleteAll = () => {
        dispatch(removeAllCart());
    };

    return (
        <CartComponent
            cartItem={cartItem}
            actUpdateItem={actUpdateItem}
            actDeleteItem={actDeleteItem}
            actDeleteAll={actDeleteAll}
        />
    );
}
