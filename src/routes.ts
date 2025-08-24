import React from 'react';
// import ProductComponents from "./components/user/product/ProductComponents";
import HomeContainer from './pages/admin/HomeContainer';
import AboutContainer from './pages/user/AboutContainer';
import CartContainer from './pages/user/CartContainer';
import NewsContainer from './pages/user/NewsContainer';
import ProductContainer from './pages/user/ProductContainer';
import SuccessPaymentContainer from './views/main/cart/SuccessPayment';
import ProductList from './views/main/landing-page/ProductList';
import Navbar from './views/main/navbar/Navbar';

interface RouteItem {
    path: string;
    component: React.ComponentType<any>;
    layout: string;
    title?: string;
}

const routes: RouteItem[] = [
    {
        path: '/admin',
        component: HomeContainer,
        layout: '/',
        title: 'Quản lý',
    },
    {
        path: '/gio-hang',
        component: CartContainer,
        layout: '/trang-chu',
        title: 'Giỏ hàng',
    },
    {
        path: '/about',
        component: AboutContainer,
        layout: '/trang-chu',
    },
    {
        path: '/home',
        component: Navbar,
        layout: '/trang-chu',
    },
    {
        path: '/product',
        component: ProductList,
        layout: '/trang-chu',
    },
    {
        path: '/chi-tiet-san-pham',
        component: ProductContainer,
        layout: '/trang-chu',
        title: 'Giỏ hàng',
    },
    {
        path: '/news',
        component: NewsContainer,
        layout: '/trang-chu',
        title: 'Khuyến mãi',
    },
    {
        path: '/SuccessPayment',
        component: SuccessPaymentContainer,
        layout: '/success',
        title: 'Thành công',
    },
];

export default routes;
