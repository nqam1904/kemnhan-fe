import { endpoints } from '@/utils/axios';
import { RTKQueryApi } from '../create-api';

export const aboutApi = RTKQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getAbout: builder.query<any, void>({
            query: () => ({
                url: endpoints.main.settings,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetAboutQuery } = aboutApi;
