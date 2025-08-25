import { CONFIG } from '@/config-global';
import NewsComponents from '@/views/main/news/view';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `News - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <NewsComponents />
        </>
    );
}
