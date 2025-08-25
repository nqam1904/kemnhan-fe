import { CONFIG } from '@/config-global';
import HomeView from '@/views/main/home/view';
import { Helmet } from 'react-helmet-async';

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
