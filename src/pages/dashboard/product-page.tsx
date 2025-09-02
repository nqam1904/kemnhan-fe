import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import ProductsView from '@/views/dashboard/products/view';

const metadata = { title: `Sản phẩm - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <ProductsView />
        </>
    );
}
