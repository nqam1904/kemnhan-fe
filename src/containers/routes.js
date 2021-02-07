import NotFoundContainer from "./admin/NotFoundContainer";
import CategoryContainer from "./admin/CategoryContainer";
import HomeContainer from "./admin/HomeContainer";
import ProductContainer from "./admin/ProductContainer";
import AccountContainer from "./admin/AccountContainer";
import OrderContainer from "./admin/OrderContainer";
import MediaContainer from "./admin/MediaContainer";
import CustomerContainer from "./admin/CustomerContainer";
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
    path: "/admin/order",
    exact: false,
    main: () => <OrderContainer />,
  },
  {
    path: "/admin/notfound",
    exact: false,
    main: () => <NotFoundContainer />,
  },
  {
    path: "/admin/media",
    exact: false,
    main: () => <MediaContainer />
  },
  {
    path: "/admin/customer",
    exact: false,
    main: () => <CustomerContainer />,
  }
];
export default routes;
