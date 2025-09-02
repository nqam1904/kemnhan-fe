import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import NewsView from '@/views/main/news/view';

const metadata = { title: `Tin tức - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <NewsView />
        </>
    );
}
