import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import NewsDetailView from '@/views/main/news/detail-view';

export default function Page() {
    const siteTitle = `Tin tức - ${CONFIG.appName}`;
    return (
        <>
            <Helmet>
                <title>{siteTitle}</title>
            </Helmet>
            <NewsDetailView />
        </>
    );
}


