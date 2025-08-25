import { ReactNode } from 'react';
import Navbar from './nav/desktop/Navbar';

type DashboardLayoutProps = {
    children?: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

export default DashboardLayout;
