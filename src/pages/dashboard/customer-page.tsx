import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import CustomView from '@/views/dashboard/customer/view';

const metadata = { title: `Khách hàng - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <CustomView />
        </>
    );
}
