// import ProductComponents from "./components/user/product/ProductComponents";
import Login from "./components/admin/login/Login";
import HomeContainer from "./containers/admin/HomeContainer";
// import CartComponent from "./components/user/cart/CartComponent";
// import HomeComponents from "./components/user/home/HomeComponents";
// import ProductDetail from "./components/user/product/ProductDetail";
// import ProductList from "./components/user/landingpage/ProductList";
import ProductContainer from "./containers/user/ProductContainer";
import CartContainer from "./containers/user/CartContainer";
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
  // {
  //   path: "/san-pham",
  //   component: ProductList,
  //   layout: "/trang-chu",
  //   title: "Sản phẩm",
  // },
  {
    path: "/chi-tiet-san-pham",
    component: ProductContainer,
    layout: "/trang-chu",
    title: "Giỏ hàng",
  },
];

export default routes;
