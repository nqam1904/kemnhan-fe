import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteChangeScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        // Always reset scroll on route changes
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        // Fallbacks for some browsers
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, [location.pathname, location.search, location.hash]);

    return null;
}


