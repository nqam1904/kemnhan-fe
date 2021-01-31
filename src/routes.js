import ProductDetail from "./components/user/product/ProductDetail";
import Login from "./components/admin/login/Login";
import HomeContainer from "./containers/admin/HomeContainer";
import CartComponent from "./components/user/cart/CartComponent";
import HomeComponents from "./components/user/home/HomeComponents";

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
    path: "/details",
    component: ProductDetail,
    layout: "/home",
    title: "Product Detail",
  },
  {
    path: "/",
    component: HomeComponents,
    layout: "/trang-chu",
    title: "Home",
  },
];

export default routes;
