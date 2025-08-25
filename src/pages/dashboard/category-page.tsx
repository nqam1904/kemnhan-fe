import { CONFIG } from '@/config-global';
import CategoryComponents from '@/views/dashboard/category/view';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `Category - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <CategoryComponents />
        </>
    );
}
