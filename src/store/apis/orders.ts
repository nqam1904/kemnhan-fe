import { endpoints } from '@/utils/axios';

import { RTKQueryApi } from '../create-api';

import type { Order, OrderListResponse, UpdateOrderStatusRequest } from '../types/order';

export const ordersApi = RTKQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, { body: any }>({
      query: ({ body }) => ({
        url: endpoints.dashboard.orders,
        method: 'POST',
        body,
      }),
    }),
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

export const { useCreateOrderMutation, useGetOrdersQuery, useUpdateOrderStatusMutation } =
  ordersApi;
