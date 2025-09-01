import { CONFIG } from '@/config-global';
import CategoryView from '@/views/dashboard/category/view';
import { Helmet } from 'react-helmet-async';

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
