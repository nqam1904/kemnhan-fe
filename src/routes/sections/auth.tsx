import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { SplashScreen } from 'components/loading-screen';

const Jwt = {
    SignInPage: lazy(() =>
        import('auth/view/jwt-sign-in-view').then((m) => ({ default: m.JwtSignInView }))
    ),
};

export const authRoutes = [
    {
        element: (
            <Suspense fallback={<SplashScreen />}>
                <Outlet />
            </Suspense>
        ),
        children: [
            {
                path: 'sign-in',
                element: <Jwt.SignInPage />,
            },
        ],
    },
];
