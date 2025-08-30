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

export type Order = {
    id: number | string;
    customer: OrderCustomer;
    amountTotal: number;
    note?: string;
    status: number; // 1: chờ duyệt, 2: đang giao, 3: hoàn thành, 4: từ chối
    createDate: string;
    orderDetails: OrderDetail[];
};

export type OrderListResponse = Order[];

export type UpdateOrderStatusRequest = { status: number };
