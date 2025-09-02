import { CONFIG } from '@/config-global';
import { Helmet } from 'react-helmet-async';
import SettingComponent from '@/views/dashboard/setting/view';

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
