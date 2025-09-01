import { FloatingContacts, ScrollToTop } from '@/components';
import { ReactNode } from 'react';
import Footer from './footer/Footer';
import Navbar from './nav/desktop/Navbar';

type MainLayoutProps = {
    children?: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="wrapper">
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
            <FloatingContacts />
        </div>
    );
}

export default MainLayout;
