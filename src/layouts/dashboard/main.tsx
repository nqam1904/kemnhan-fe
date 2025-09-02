import type { ReactNode } from 'react';

import Navbar from './nav/desktop/Navbar';

type DashboardLayoutProps = {
    children?: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div>
            <Navbar />
            <div className="d-flex flex-column flex-fill p-4">{children}</div>
        </div>
    );
}

export default DashboardLayout;
