import { CONFIG } from '@/config-global';
import AccountComponent from '@/views/dashboard/account/view';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `Account - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <AccountComponent />
        </>
    );
}
