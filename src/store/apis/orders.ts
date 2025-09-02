import { endpoints } from '@/utils/axios';

import { RTKQueryApi } from '../create-api';

import type { Order, OrderListResponse, UpdateOrderStatusRequest } from '../types/order';

export const ordersApi = RTKQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<OrderListResponse, void>({
            query: () => ({ url: endpoints.dashboard.orders, method: 'GET' }),
        }),
        updateOrderStatus: builder.mutation<
            Order,
            { id: string | number; body: UpdateOrderStatusRequest }
        >({
            query: ({ id, body }) => ({
                url: `${endpoints.dashboard.orders}/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const { useGetOrdersQuery, useUpdateOrderStatusMutation } = ordersApi;
