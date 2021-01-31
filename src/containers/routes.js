import NotFoundContainer from "./admin/NotFoundContainer";
import CategoryContainer from "./admin/CategoryContainer";
import HomeContainer from "./admin/HomeContainer";
import ProductContainer from "./admin/ProductContainer";
import AccountContainer from "./admin/AccountContainer";
const routes = [
  {
    path: "/admin",
    exact: true,
    main: () => <HomeContainer />,
  },
  {
    path: "/admin/category",
    exact: false,
    main: () => <CategoryContainer />,
  },
  {
    path: "/admin/product",
    exact: false,
    main: () => <ProductContainer />,
  },
  {
    path: "/admin/account",
    exact: false,
    main: () => <AccountContainer />,
  },
  {
    path: "/admin/notfound",
    exact: false,
    main: () => <NotFoundContainer />,
  },
];
export default routes;
