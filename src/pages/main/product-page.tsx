import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '@/store/apis/products';
import ProductDetail from '@/views/main/product-detail/view';

export default function Page() {
    const { id } = useParams<{ id: string }>();
    const { data: product } = useGetProductQuery({ id: id as string }, { skip: !id });
    const dynamicTitle = `${product?.name || 'Product'} - ${CONFIG.appName}`;

    return (
        <>
            <Helmet>
                <title>{dynamicTitle}</title>
            </Helmet>
            <ProductDetail />
        </>
    );
}
