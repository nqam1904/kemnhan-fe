import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import HomeView from '@/views/main/home/view';

const metadata = { title: `${CONFIG.appName} - Trang chủ` };

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
