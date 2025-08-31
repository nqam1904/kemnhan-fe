import { CONFIG } from '@/config-global';
import SettingComponent from '@/views/dashboard/setting/view';
import { Helmet } from 'react-helmet-async';

const metadata = { title: `Cài đặt - ${CONFIG.appName}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <SettingComponent />
        </>
    );
}
