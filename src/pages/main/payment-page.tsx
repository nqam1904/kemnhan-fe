import { CONFIG } from '@/config-global';
import SuccessPayment from '@/views/main/cart/success-payment';
import { Helmet } from 'react-helmet-async';

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
