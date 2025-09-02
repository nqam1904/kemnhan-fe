import type { ReactNode} from 'react';

import { useMemo } from 'react';
import { paths } from '@/routes/paths';
import { usePathname } from '@/routes/hooks';
import { ScrollToTop, FloatingContacts } from '@/components';

import Footer from './footer/Footer';
import Navbar from './nav/desktop/Navbar';

type MainLayoutProps = {
    children?: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
    const pathname = usePathname();
    const isHome = useMemo(
        () => pathname === '/' || pathname === paths.main.home,
        [pathname]
    );

    return (
        <div className="wrapper">
            <Navbar />
            {!isHome && <div style={{ height: 200 }} aria-hidden="true" />}
            {children}
            <Footer />
            <ScrollToTop />
            <FloatingContacts />
        </div>
    );
}

export default MainLayout;
