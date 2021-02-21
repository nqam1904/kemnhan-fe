// import ProductComponents from "./components/user/product/ProductComponents";
import Login from "./components/admin/login/Login";
import HomeContainer from "./containers/admin/HomeContainer";
import AboutContainer from "./containers/user/AboutContainer";
import ProductContainer from "./containers/user/ProductContainer";
import CartContainer from "./containers/user/CartContainer";
import Navbar from "./components/user/navbar/Navbar";
import ProductList from "./components/user/landingpage/ProductList";
import SuccessPaymentContainer from './components/user/cart/SuccessPayment'
import NewsContainer from "./containers/user/NewsContainer";
const routes = [
  {
    path: "/login",
    component: Login,
    layout: "/admin",
    title: "Login",
  },
  {
    path: "/admin",
    component: HomeContainer,
    layout: "/",
    title: "Quản lý",
  },
  {
    path: "/gio-hang",
    component: CartContainer,
    layout: "/trang-chu",
    title: "Giỏ hàng",

  },
  {
    path: "/about",
    component: AboutContainer,
    layout: "/trang-chu",
  },
  {
    path: "/home",
    component: Navbar,
    layout: "/trang-chu",
  },
  {
    path: "/product",
    component: ProductList,
    layout: "/trang-chu",

  },
  {
    path: "/chi-tiet-san-pham",
    component: ProductContainer,
    layout: "/trang-chu",
    title: "Giỏ hàng",
  },
  {
    path: '/news',
    component: NewsContainer,
    layout: "/trang-chu",
    title: 'Khuyến mãi'
  },
  {
    path: "/SuccessPayment",
    component: SuccessPaymentContainer,
    layout: "/success",
    title: "Thành công",
  }
];

export default routes;
