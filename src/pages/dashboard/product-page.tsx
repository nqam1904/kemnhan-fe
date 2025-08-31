import { CONFIG } from '@/config-global';
import ProductsComponents from '@/views/dashboard/products/view';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `Sản phẩm - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <ProductsComponents />
        </>
    );
}
