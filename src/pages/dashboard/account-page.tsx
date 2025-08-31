import { CONFIG } from '@/config-global';
import Account from '@/views/dashboard/account/view';
import { Helmet } from 'react-helmet-async';

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
