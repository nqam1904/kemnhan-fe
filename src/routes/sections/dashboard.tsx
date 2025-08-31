import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingScreen } from '@/components';
import { AuthGuard } from 'auth/guard';
import { DashboardLayout } from 'layouts/dashboard/main';

const AccountPage = lazy(() => import('pages/dashboard/account-page'));
const HomePage = lazy(() => import('pages/dashboard/home-page'));
const CategoryPage = lazy(() => import('pages/dashboard/category-page'));
const CustomerPage = lazy(() => import('pages/dashboard/customer-page'));
const Index = lazy(() => import('pages/dashboard'));
const MediaPage = lazy(() => import('pages/dashboard/media-page'));
const NewsPage = lazy(() => import('pages/dashboard/news-page'));
const BannerPage = lazy(() => import('pages/dashboard/banner-page'));
const NotFoundPage = lazy(() => import('pages/dashboard/not-found-page'));
const OrderPage = lazy(() => import('pages/dashboard/order-page'));
const ProductPage = lazy(() => import('pages/dashboard/product-page'));
const SettingPage = lazy(() => import('pages/dashboard/setting-page'));

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
                    <AuthGuard>
                        <DashboardLayout>
                            <Suspense fallback={<LoadingScreen />}>
                                <Outlet />
                            </Suspense>
                        </DashboardLayout>
                    </AuthGuard>
                ),
                path: 'dashboard',
                children: [
                    { index: true, element: <Index /> },
                    { path: 'home', element: <HomePage /> },
                    { path: 'account', element: <AccountPage /> },
                    { path: 'category', element: <CategoryPage /> },
                    { path: 'customer', element: <CustomerPage /> },
                    { path: 'media', element: <MediaPage /> },
                    { path: 'banner', element: <BannerPage /> },
                    { path: 'news', element: <NewsPage /> },
                    { path: 'order', element: <OrderPage /> },
                    { path: 'product', element: <ProductPage /> },
                    { path: 'setting', element: <SettingPage /> },
                ],
            },
            { path: 'dashboard/*', element: <NotFoundPage /> },
        ],
    },
];
