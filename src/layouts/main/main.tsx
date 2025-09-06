import type { ReactNode } from 'react';

import { paths } from '@/routes/paths';
import { usePathname } from '@/routes/hooks';
import { useMemo, useState, useEffect } from 'react';
import { ScrollToTop, FloatingContacts } from '@/components';

import Footer from './footer/Footer';
import Navbar from './nav/desktop/Navbar';

type MainLayoutProps = {
    children?: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth <= 1190);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    const isHome = useMemo(
        () => pathname === '/' || pathname === paths.main.home,
        [pathname]
    );

    return (
        <div className="wrapper">
            <Navbar />
            {!isHome && <div style={{ height: 150 }} aria-hidden="true" />}
            {isHome && isMobile && <div style={{ height: 56 }} aria-hidden="true" />}
            {children}
            <Footer />
            <ScrollToTop />
            <FloatingContacts />
        </div>
    );
}

export default MainLayout;
