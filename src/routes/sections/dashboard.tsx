import AccountContainer from 'pages/admin/AccountContainer';
import CategoryContainer from 'pages/admin/CategoryContainer';
import CustomerContainer from 'pages/admin/CustomerContainer';
import HeaderContainer from 'pages/admin/HeaderContainer';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingScreen } from 'components/loading-screen';

import HomeContainer from 'pages/admin/HomeContainer';
import MediaContainer from 'pages/admin/MediaContainer';
import NewsContainer from 'pages/admin/NewsContainer';
import NotFoundContainer from 'pages/admin/NotFoundContainer';
import OrderContainer from 'pages/admin/OrderContainer';
import ProductContainer from 'pages/admin/ProductContainer';
import SettingContainer from 'pages/admin/SettingContainer';

export const dashboardRoutes = [
    {
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <Outlet />
            </Suspense>
        ),
        children: [
            {
                element: (
                    <Suspense fallback={<LoadingScreen />}>
                        <Outlet />
                    </Suspense>
                ),
                path: 'dashboard',
                children: [
                    { index: true, element: <HomeContainer /> },
                    { path: 'account', element: <AccountContainer /> },
                    { path: 'category', element: <CategoryContainer /> },
                    { path: 'customer', element: <CustomerContainer /> },
                    { path: 'header', element: <HeaderContainer /> },
                    { path: 'media', element: <MediaContainer /> },
                    { path: 'news', element: <NewsContainer /> },
                    { path: 'order', element: <OrderContainer /> },
                    { path: 'product', element: <ProductContainer /> },
                    { path: 'setting', element: <SettingContainer /> },
                    { path: '*', element: <NotFoundContainer /> },
                ],
            },
        ],
    },
];
