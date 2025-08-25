import { CONFIG } from '@/config-global';
import OrderComponents from '@/views/dashboard/order/view';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `Order - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <OrderComponents />
        </>
    );
}
