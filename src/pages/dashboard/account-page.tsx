import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import Account from '@/views/dashboard/account/view';

const metadata = { title: `Tài khoản - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <Account />
        </>
    );
}
