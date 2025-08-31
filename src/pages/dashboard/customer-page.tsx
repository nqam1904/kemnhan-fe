import { CONFIG } from '@/config-global';
import CustomerComponent from '@/views/dashboard/customer/view';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `Khách hàng - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <CustomerComponent />
        </>
    );
}
