import { paths } from '@/routes/paths';
import { CONFIG } from '@/config-global';
import { SplashScreen } from '@/components';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from '@/routes/hooks';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
    const router = useRouter();

    const pathname = usePathname();

    const searchParams = useSearchParams();

    const { authenticated, loading } = useAuthContext();

    const [isChecking, setIsChecking] = useState<boolean>(true);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const checkPermissions = async (): Promise<void> => {
        if (loading) {
            return;
        }

        if (!authenticated) {
            const { method } = CONFIG.auth;

            const signInPath = {
                jwt: paths.auth.signIn,
            }[method];

            const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;

            router.replace(href);
            return;
        }

        setIsChecking(false);
    };

    useEffect(() => {
        checkPermissions();
    }, [authenticated, loading]);

    if (isChecking) {
        return <SplashScreen />;
    }

    return <>{children}</>;
}
