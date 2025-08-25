import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { MainLayout } from 'layouts/main/main';

import { SplashScreen } from '@/components';

import NotFoundPage from '@/pages/dashboard/not-found-page';
import ProductListPage from '@/views/main/home/product-list';

const ComingSoonPage = lazy(() => import('pages/coming-soon'));
const HomePage = lazy(() => import('pages/main/home-page'));
const AboutPage = lazy(() => import('pages/main/about-page'));
const ProductDetailPage = lazy(() => import('pages/main/product-page'));
const NewsPage = lazy(() => import('pages/main/news-page'));
const CartPage = lazy(() => import('pages/main/cart-page'));
const SuccessPaymentPage = lazy(() => import('pages/main/payment-page'));

// ----------------------------------------------------------------------
// Error
const Page500 = lazy(() => import('pages/error/500'));
const Page403 = lazy(() => import('pages/error/403'));
const Page404 = lazy(() => import('pages/error/404'));

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
                path: 'trang-chu',
                children: [
                    { index: true, element: <HomePage /> },
                    { path: 'gioi-thieu', element: <AboutPage /> },
                    { path: 'san-pham', element: <ProductListPage /> },
                    { path: 'chi-tiet-san-pham/:id', element: <ProductDetailPage /> },
                    { path: 'tin-tuc', element: <NewsPage /> },
                    { path: 'gio-hang', element: <CartPage /> },
                    { path: 'thanh-toan-thanh-cong', element: <SuccessPaymentPage /> },
                    {
                        path: 'not-found',
                        element: <NotFoundPage />,
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
