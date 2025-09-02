import { endpoints } from '@/utils/axios';

import { RTKQueryApi } from '../create-api';

import type { Customer, CustomerListResponse } from '../types/customer';

export const customersApi = RTKQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query<CustomerListResponse, void>({
            query: () => ({ url: endpoints.dashboard.customers, method: 'GET' }),
        }),
        getCustomerById: builder.query<Customer, string | number>({
            query: (id) => ({ url: `${endpoints.dashboard.customers}/${id}`, method: 'GET' }),
        }),
    }),
});

export const { useGetCustomersQuery, useLazyGetCustomerByIdQuery } = customersApi;
