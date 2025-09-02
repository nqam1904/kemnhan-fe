import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import HomeView from '@/views/dashboard/home/view';

const metadata = { title: `Trang chủ - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <HomeView />
        </>
    );
}
