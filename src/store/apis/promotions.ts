import { endpoints } from '@/utils/axios';

import { RTKQueryApi } from '../create-api';

import type {
  Promotion,
  PromotionListResponse,
  PromotionCreateRequest,
  PromotionUpdateRequest,
} from '../types/promotion';

export const promotionsApi = RTKQueryApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromotions: builder.query<PromotionListResponse, void>({
      query: () => ({
        url: endpoints.main.promotions,
        method: 'GET',
      }),
    }),
    getPromotion: builder.query<Promotion, { id: string | number }>({
      query: ({ id }) => ({
        url: `${endpoints.main.promotions}/${id}`,
        method: 'GET',
      }),
    }),
    createPromotion: builder.mutation<Promotion, { body: PromotionCreateRequest | FormData }>({
      query: ({ body }) => ({
        url: endpoints.main.promotions,
        method: 'POST',
        body,
      }),
    }),
    updatePromotion: builder.mutation<
      Promotion,
      { id: string | number; body: PromotionUpdateRequest }
    >({
      query: ({ id, body }) => ({
        url: `${endpoints.main.promotions}/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    deletePromotion: builder.mutation<{ success: boolean } | void, { id: string | number }>({
      query: ({ id }) => ({
        url: `${endpoints.main.promotions}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPromotionsQuery,
  useGetPromotionQuery,
  useCreatePromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionsApi;
