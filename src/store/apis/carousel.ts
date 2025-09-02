import { endpoints } from '@/utils/axios';

import { RTKQueryApi } from '../create-api';

import type { Carousel, CarouselListResponse } from '../types/carousel';

export const carouselApi = RTKQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getCarousels: builder.query<CarouselListResponse, void>({
            query: () => ({
                url: endpoints.dashboard.carousels,
                method: 'GET',
            }),
        }),
        getCarousel: builder.query<Carousel, string | number>({
            query: (id) => ({
                url: `${endpoints.dashboard.carousels}/${id}`,
                method: 'GET',
            }),
        }),
        createCarousel: builder.mutation<Carousel, { body: FormData | any }>({
            query: ({ body }) => ({
                url: endpoints.dashboard.carousels,
                method: 'POST',
                body,
            }),
        }),
        updateCarousel: builder.mutation<Carousel, { id: string | number; body: any }>({
            query: ({ id, body }) => ({
                url: `${endpoints.dashboard.carousels}/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteCarousel: builder.mutation<{ success: boolean } | void, { id: string | number }>({
            query: ({ id }) => ({
                url: `${endpoints.dashboard.carousels}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetCarouselsQuery,
    useGetCarouselQuery,
    useCreateCarouselMutation,
    useUpdateCarouselMutation,
    useDeleteCarouselMutation,
} = carouselApi;
