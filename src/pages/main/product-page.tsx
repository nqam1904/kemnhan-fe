import { CONFIG } from '@/config-global';
import { addToCart } from '@/store/slices/cart';
import ProductDetail from '@/views/main/product-detail/view';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

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
