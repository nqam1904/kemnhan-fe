import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { MainLayout } from 'layouts/main';

import { SplashScreen } from 'components/loading-screen';

const ComingSoonPage = lazy(() => import('pages/coming-soon'));

// ----------------------------------------------------------------------
// Error
const Page500 = lazy(() => import('pages/error/500'));
const Page403 = lazy(() => import('pages/error/403'));
const Page404 = lazy(() => import('pages/error/404'));
// Blank
const BlankPage = lazy(() => import('pages/blank'));

// ----------------------------------------------------------------------

export const mainRoutes = [
    {
        element: (
            <Suspense fallback={<SplashScreen />}>
                <Outlet />
            </Suspense>
        ),
        children: [
            {
                element: (
                    <MainLayout>
                        <Outlet />
                    </MainLayout>
                ),
                children: [
                    {
                        path: 'blank',
                        element: <BlankPage />,
                    },
                ],
            },
            {
                path: 'coming-soon',
                element: <ComingSoonPage />,
            },
            { path: '500', element: <Page500 /> },
            { path: '404', element: <Page404 /> },
            { path: '403', element: <Page403 /> },
        ],
    },
];
