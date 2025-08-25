import { CONFIG } from '@/config-global';
import AboutComponents from '@/views/main/about/view';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `About - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <AboutComponents />
        </>
    );
}
