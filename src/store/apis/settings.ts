import { endpoints } from '@/utils/axios';

import { RTKQueryApi } from '../create-api';

import type { Setting, SettingListResponse, SettingUpdateRequest } from '../types/setting';

export const settingsApi = RTKQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getSettings: builder.query<SettingListResponse, void>({
            query: () => ({ url: endpoints.main.settings, method: 'GET' }),
        }),
        getSettingById: builder.query<Setting, string | number>({
            query: (id) => ({ url: `${endpoints.main.settings}/${id}`, method: 'GET' }),
        }),
        updateSetting: builder.mutation<
            Setting,
            { id: string | number; body: SettingUpdateRequest }
        >({
            query: ({ id, body }) => ({
                url: `${endpoints.main.settings}/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const { useGetSettingsQuery, useLazyGetSettingByIdQuery, useUpdateSettingMutation } =
    settingsApi;
