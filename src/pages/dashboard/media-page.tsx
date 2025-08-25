import { CONFIG } from '@/config-global';
import MediaComponent from '@/views/dashboard/media/media-view';
import { Helmet } from 'react-helmet-async';

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
