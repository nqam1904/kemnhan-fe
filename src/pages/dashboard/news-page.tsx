import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import NewsComponent from '@/views/dashboard/news/view';

const metadata = { title: `Tin tức - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <NewsComponent />
        </>
    );
}
