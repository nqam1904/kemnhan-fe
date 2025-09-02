import { endpoints } from '@/utils/axios';

import { setTokens } from '../slices/auth';
import { RTKQueryApi } from '../create-api';

import type { SignInRequest, SignInResponse } from '../types/auth';

export const authApi = RTKQueryApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<SignInResponse, SignInRequest>({
            query: (body) => ({
                url: endpoints.auth.signIn,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_record, { dispatch, queryFulfilled }) {
                const { data: result } = await queryFulfilled;

                if (result) {
                    const { access_token = '' } = result;
                    dispatch(setTokens({ accessToken: access_token }));
                }
            },
        }),

        getAuthorizeMe: builder.query<any, { id: number }>({
            query: ({ id }) => ({
                url: `${endpoints.auth.authorizeMe}/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useSignInMutation, useLazyGetAuthorizeMeQuery } = authApi;
