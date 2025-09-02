import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { GuestGuard } from '@/auth/guard';
import { SplashScreen } from '@/components';

const Jwt = {
    SignInPage: lazy(() =>
        import('@/auth/view/jwt-sign-in-view').then((m) => ({ default: m.JwtSignInView }))
    ),
};
const authJwt = {
    path: '',
    children: [
        {
            path: 'sign-in',
            element: (
                <GuestGuard>
                    <Jwt.SignInPage />
                </GuestGuard>
            ),
        },
    ],
};
export const authRoutes = [
    {
        path: '',
        element: (
            <Suspense fallback={<SplashScreen />}>
                <Outlet />
            </Suspense>
        ),
        children: [authJwt],
    },
];
