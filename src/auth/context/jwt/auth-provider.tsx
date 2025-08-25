import { isEmpty } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useSetState } from 'hooks/use-set-state';

import { setTokens } from 'store/slices/auth';

import { AuthContext } from '../auth-context';
import { STORAGE_ACCESS_TOKEN, STORAGE_REFRESH_TOKEN } from './constant';
import { setSession } from './utils';

import type { AuthState } from '../../types';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

type Props = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
    const dispatch = useDispatch();
    const { state, setState } = useSetState<AuthState>({
        user: null,
        loading: true,
    });

    const checkUserSession = useCallback(async () => {
        try {
            const accessToken =
                sessionStorage.getItem(STORAGE_ACCESS_TOKEN) ||
                localStorage.getItem(STORAGE_ACCESS_TOKEN);
            const refreshToken =
                sessionStorage.getItem(STORAGE_REFRESH_TOKEN) ||
                localStorage.getItem(STORAGE_REFRESH_TOKEN);

            if (accessToken) {
                setSession(accessToken, refreshToken);
                dispatch(setTokens({ accessToken, refreshToken: refreshToken ?? '' }));
                const user = {};
                if (!isEmpty(user)) {
                    setState({ user: { ...user, accessToken, refreshToken }, loading: false });
                } else {
                    setState({ user: null, loading: false });
                }
            } else {
                setState({ user: null, loading: false });
            }
        } catch (error) {
            console.error(error);
            setState({ user: null, loading: false });
        }
    }, []);

    useEffect(() => {
        checkUserSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ----------------------------------------------------------------------

    const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

    const status = state.loading ? 'loading' : checkAuthenticated;

    const memoizedValue = useMemo(
        () => ({
            user: state.user
                ? {
                      ...state.user,
                      role: state.user?.role ?? 'admin',
                  }
                : null,
            checkUserSession,
            setState,
            loading: status === 'loading',
            authenticated: status === 'authenticated',
            unauthenticated: status === 'unauthenticated',
        }),
        [checkUserSession, state.user, status, setState]
    );

    return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
