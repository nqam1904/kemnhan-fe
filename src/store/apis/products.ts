import { endpoints } from '@/utils/axios';

import { RTKQueryApi } from '../create-api';

export const productsApi = RTKQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<any, void>({
            query: () => ({
                url: endpoints.main.products,
                method: 'GET',
            }),
        }),
        createProduct: builder.mutation<any, { body: any }>({
            query: ({ body }) => ({
                url: endpoints.main.products,
                method: 'POST',
                body,
            }),
        }),
        updateProduct: builder.mutation<any, { id: string | number; body: any }>({
            query: ({ id, body }) => ({
                url: `${endpoints.main.products}/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteProduct: builder.mutation<{ success: boolean } | void, { id: string | number }>({
            query: ({ id }) => ({
                url: `${endpoints.main.products}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;
