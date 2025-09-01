import { CONFIG } from '@/config-global';
import NewsView from '@/views/main/news/view';
import { Helmet } from 'react-helmet-async';

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
