import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import SuccessPayment from '@/views/main/cart/success-payment';

const metadata = { title: `Payment - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <SuccessPayment />
        </>
    );
}
