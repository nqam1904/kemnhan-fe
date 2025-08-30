import { endpoints } from 'utils/axios';

import { RTKQueryApi } from '../create-api';
import type {
    Account,
    AccountCreateRequest,
    AccountListResponse,
    AccountUpdateRequest,
} from '../types/account';

export const accountApi = RTKQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        getListUser: builder.query<AccountListResponse, void>({
            query: () => ({
                url: `${endpoints.dashboard.account}`,
                method: 'GET',
            }),
        }),
        createUser: builder.mutation<Account, { body: AccountCreateRequest }>({
            query: ({ body }) => ({
                url: `${endpoints.dashboard.account}`,
                method: 'POST',
                body,
            }),
        }),
        updateUser: builder.mutation<Account, { id: string | number; body: AccountUpdateRequest }>({
            query: ({ id, body }) => ({
                url: `${endpoints.dashboard.account}/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteUser: builder.mutation<{ success: boolean } | void, { id: string | number }>({
            query: ({ id }) => ({
                url: `${endpoints.dashboard.account}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useLazyGetListUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = accountApi;
