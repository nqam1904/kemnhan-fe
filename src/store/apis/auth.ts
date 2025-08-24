import { endpoints } from 'utils/axios';

import { RTKQueryApi } from '../create-api';

import { setTokens } from '../slices/auth';
import type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../types/auth';

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

                if (result?.data) {
                    const { token = '', refreshToken = '' } = result.data;
                    dispatch(setTokens({ accessToken: token, refreshToken }));
                }
            },
        }),
        signUp: builder.mutation<SignUpResponse, SignUpRequest>({
            query: (body) => ({
                url: endpoints.auth.signUp,
                method: 'POST',
                body,
            }),
        }),
        getAuthorizeMe: builder.query<any, void>({
            query: () => ({
                url: endpoints.auth.authorizeMe,
                method: 'GET',
            }),
        }),
    }),
});

// Export hooks for usage in functional components
export const { useSignInMutation, useSignUpMutation, useLazyGetAuthorizeMeQuery } = authApi;
