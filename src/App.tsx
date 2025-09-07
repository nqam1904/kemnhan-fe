// ----------------------------------------------------------------------

import { Router } from '@/routes/sections';
import { ToastContainer } from 'react-toastify';
import { RouteChangeScrollToTop } from '@/routes/components';
import { AuthProvider as JwtAuthProvider } from '@/auth/context/jwt';

import { ProgressBar } from './components';
import ReduxProvider from './store/provider';
import { buildProvidersTree } from './utils/providerTree';

// ----------------------------------------------------------------------

const ProvidersTree = buildProvidersTree([[ReduxProvider], [JwtAuthProvider], [ProgressBar]]);

export default function App() {
    return (
        <ProvidersTree>
            <ToastContainer autoClose={1000} />
            <RouteChangeScrollToTop />
            <Router />
        </ProvidersTree>
    );
}
