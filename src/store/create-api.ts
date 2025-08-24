import type {
    BaseQueryApi,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { isEmpty } from 'lodash';
import { Mutex } from 'utils/mutex';

import { CONFIG } from 'config-global';

import { STORAGE_ACCESS_TOKEN, STORAGE_REFRESH_TOKEN } from 'auth/context/jwt';
import { signOut as jwtSignOut } from 'auth/context/jwt/action';

import errors from './errors';
import { isErrorWithMessage, isFetchBaseQueryError } from './helpers';
import { setTokens } from './slices/auth';
import { showNotify } from './slices/notify';

import type { RootState } from '.';
import type { RefreshTokenResponse } from './types/auth';
import type { NotifyState } from './types/notify';

const signOut = jwtSignOut;

// Using async-mutex to prevent multiple calls to '/refreshToken' when multiple calls fail with 401 Unauthorized errors.
// create a new mutex
const mutex = new Mutex();

const onBaseQueryError = (queryError: FetchBaseQueryError, api: BaseQueryApi) => {
    let record: NotifyState = {
        type: 'error',
        message: 'Error!',
        description: errors.BAD_REQUEST,
    };

    if (isErrorWithMessage(queryError.data)) {
        const { error, message } = queryError.data;
        record.message = error;
        record.description = message || message?.[0];
    }

    switch (queryError.status) {
        case 405:
            record = {
                ...record,
                message: 'Method Not Allowed!',
                description: errors.METHOD_NOT_ALLOWED,
            };
            break;
        case 401:
            record = {
                ...record,
                message: 'Unauthorized!',
                description: errors.UNAUTHORIZED,
            };
            break;
        default:
            break;
    }

    api.dispatch(showNotify(record));
};

const baseQuery = () =>
    fetchBaseQuery({
        baseUrl: `${CONFIG.serverUrl}/`,
        cache: 'no-cache',

        // * Handle header before send request
        prepareHeaders: (headers, { getState }) => {
            // * By default, if we have a token in the store, let's use that for authenticated requests
            const { tokens } = (getState() as RootState).auth;
            const accessToken =
                sessionStorage.getItem(STORAGE_ACCESS_TOKEN) ||
                localStorage.getItem(STORAGE_ACCESS_TOKEN);
            const availableToken = accessToken || tokens?.accessToken;

            if (availableToken) {
                headers.set('Authorization', `Bearer ${availableToken}`);
            }

            return headers;
        },
    });

const baseQueryInit = () =>
    fetchBaseQuery({
        baseUrl: `${CONFIG.serverUrl}/`,
    });

const dynamicBaseQuery: BaseQueryFn<any | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery()(args, api, extraOptions);

    if (isFetchBaseQueryError(result.error)) {
        if (result.error.status === 401) {
            // checking whether the mutex is locked
            if (!mutex.isLocked()) {
                const release = await mutex.acquire();

                try {
                    /* A call to the refresh token endpoint to get a new access token. */
                    // Refresh to get new access token
                    const { tokens } = (api.getState() as RootState).auth;
                    const currentToken =
                        sessionStorage.getItem(STORAGE_REFRESH_TOKEN) ||
                        localStorage.getItem(STORAGE_REFRESH_TOKEN);
                    const availableToken = currentToken || tokens?.refreshToken;

                    const { data } = await baseQueryInit()(
                        {
                            url: 'auth/refresh-token',
                            method: 'POST',
                            params: {
                                refreshToken: availableToken,
                            },
                        },
                        api,
                        extraOptions
                    );

                    if (!isEmpty(data)) {
                        const { token, refreshToken } = data as RefreshTokenResponse['data'];
                        api.dispatch(setTokens({ accessToken: token, refreshToken }));
                        localStorage.setItem(STORAGE_ACCESS_TOKEN, token);
                        localStorage.setItem(STORAGE_REFRESH_TOKEN, refreshToken);
                        window.location.reload();
                    } else {
                        // api.dispatch(disconnectSocket());
                        await signOut();
                        window.location.reload();
                    }
                    await signOut();
                    window.location.reload();
                } finally {
                    // release must be called once the mutex should be released again.
                    release();
                }
            } else {
                // wait until the mutex is available without locking it
                await mutex.waitForUnlock();
                result = await baseQuery()(args, api, extraOptions);
            }
        } else {
            onBaseQueryError(result.error, api);
        }

        let message = 'An error occurred while fetching the data.';
        if (isErrorWithMessage(result.error?.data)) {
            message =
                result?.error?.data?.message ||
                result?.error?.data?.message?.[0] ||
                'An error occurred while fetching the data.';
        }

        throw new Error(message);
    }

    return result;
};

// * Chú ý RTK Query là dùng để query (kết nối API), chứ không phải dùng để code async trong Redux thay cho createAsyncThunk.
export const RTKQueryApi = createApi({
    // * Tương tự tên Slice khi tạo Slice thông thường
    reducerPath: 'RTKQueryApi',

    // * Common config for all resquest
    baseQuery: dynamicBaseQuery,

    tagTypes: ['User'],
    refetchOnMountOrArgChange: true,

    // * endpoints (call request)
    endpoints: () => ({}),
});
