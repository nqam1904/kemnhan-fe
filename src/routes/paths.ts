// ----------------------------------------------------------------------

const ROOTS = {
  DASHBOARD: '/dashboard',
  MAIN: '',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  // AUTH
  auth: {
    signIn: `/sign-in`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    home: `${ROOTS.DASHBOARD}/home`,
    account: `${ROOTS.DASHBOARD}/account`,
    category: `${ROOTS.DASHBOARD}/category`,
    customer: `${ROOTS.DASHBOARD}/customer`,
    order: `${ROOTS.DASHBOARD}/order`,
    product: `${ROOTS.DASHBOARD}/product`,
    media: `${ROOTS.DASHBOARD}/media`,
    banner: `${ROOTS.DASHBOARD}/banner`,
    news: `${ROOTS.DASHBOARD}/news`,
    setting: `${ROOTS.DASHBOARD}/setting`,
  },
  // MAIN
  main: {
    root: ROOTS.MAIN,
    home: `${ROOTS.MAIN}/trang-chu`,
    about: `${ROOTS.MAIN}/gioi-thieu`,
    product: `${ROOTS.MAIN}/san-pham`,
    productDetail: (id: string | number) => `${ROOTS.MAIN}/chi-tiet-san-pham/${id}`,
    news: `${ROOTS.MAIN}/tin-tuc`,
    cart: `${ROOTS.MAIN}/gio-hang`,
    checkout: `${ROOTS.MAIN}/thanh-toan`,
    contact: `${ROOTS.MAIN}/lien-he`,
    successPayment: `${ROOTS.MAIN}/thanh-toan-thanh-cong`,
  },
};
