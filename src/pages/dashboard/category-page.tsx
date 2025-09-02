import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import CategoryView from '@/views/dashboard/category/view';

const metadata = { title: `Danh mục - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <CategoryView />
        </>
    );
}
