import { endpoints } from '@/utils/axios';
import { RTKQueryApi } from '../create-api';

export const promotionsApi = RTKQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getPromotions: builder.query<any, void>({
            query: () => ({
                url: endpoints.main.promotions,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetPromotionsQuery } = promotionsApi;
