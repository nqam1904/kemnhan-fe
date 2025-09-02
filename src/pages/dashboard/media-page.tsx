import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import MediaComponent from '@/views/dashboard/media/media-view';

// ----------------------------------------------------------------------

const metadata = { title: `Media - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <MediaComponent />
        </>
    );
}
