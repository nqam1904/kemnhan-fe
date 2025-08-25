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
    }),
});

export const { useGetProductsQuery } = productsApi;
