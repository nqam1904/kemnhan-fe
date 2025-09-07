export type OrderDetail = {
  id: number | string;
  productId: number | string;
  productName?: string;
  quantity: number;
  price: number;
  amount: number;
};

export type OrderCustomer = {
  id?: number | string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
};

export type OrderLine = {
  id: number | string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  name: string;
  note?: string;
  product?: {
    id: number | string;
    name: string;
    description?: string;
    unit?: string;
    sku?: string;
    sellPrice: number;
    images?: any[];
    categories?: any[];
  };
  createDate: string;
  writeDate?: string;
};

export type Order = {
  id: number | string;
  customer: OrderCustomer;
  amountTotal: number;
  discount?: number;
  shippingFee?: number;
  name?: string;
  note?: string;
  status: number; // 1: chờ duyệt, 2: đang giao, 3: hoàn thành, 4: từ chối
  date: string;
  expectDateDelivery?: string;
  dateDoneDelivery?: string;
  createDate: string;
  writeDate?: string;
  orderDetails?: OrderDetail[];
  lines?: OrderLine[];
};

export type OrderListResponse = Order[];

export type UpdateOrderStatusRequest = { status: number };
