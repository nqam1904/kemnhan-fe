import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import OrderView from '@/views/dashboard/order/view';

const metadata = { title: `Hóa đơn - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <OrderView />
        </>
    );
}
