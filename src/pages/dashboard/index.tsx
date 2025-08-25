import { CONFIG } from '@/config-global';
import { paths } from '@/routes/paths';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <Navigate to={paths.dashboard.home} replace />
        </>
    );
}
