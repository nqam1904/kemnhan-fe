import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `404 - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <div className="App">
                <h1>404! Không tìm thấy trang 😥</h1>
            </div>
        </>
    );
}
