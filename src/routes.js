import ProductComponents from "./components/user/product/ProductComponents";
import Login from "./components/admin/login/Login";
import HomeContainer from "./containers/admin/HomeContainer";
import CartComponent from "./components/user/cart/CartComponent";
import HomeComponents from "./components/user/home/HomeComponents";
import ProductDetail from "./components/user/product/ProductDetail";
import ProductContainer from "./containers/user/ProductContainer";
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
    layout: "/admin/home",
    title: "Quản lý",
  },
  {
    path: "/gio-hang",
    component: CartComponent,
    layout: "/trang-chu",
    title: "Giỏ hàng",
  },
  {
    path: "/san-pham",
    component: ProductComponents,
    layout: "/trang-chu",
    title: "Sản phẩm",
  },
  {
    path: "/chi-tiet-san-pham/:id",
    component: ProductContainer,
    layout: "/trang-chu",
    title: "Giỏ hàng",
  },
  {
    path: "/",
    component: HomeComponents,
    layout: "/trang-chu",
    title: "Home",
  },
];

export default routes;
