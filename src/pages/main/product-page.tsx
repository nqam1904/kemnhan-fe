import { CONFIG } from '@/config-global';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { addToCart } from '@/store/slices/cart';
import ProductDetail from '@/views/main/product-detail/view';

const metadata = { title: `Product - ${CONFIG.appName}` };

export default function Page() {
    const dispatch = useDispatch();

    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <ProductDetail actAddToCart={(item: any) => dispatch(addToCart(item))} />
        </>
    );
}
