import { CONFIG } from '@/config-global';
import HomeView from '@/views/dashboard/home/view';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `Dashboard - ${CONFIG.appName}` };

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
