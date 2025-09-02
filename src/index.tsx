import './app.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-activity/dist/react-activity.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Suspense, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { buildProvidersTree } from '@/utils/providerTree';

import App from './App';

const ProvidersTree = buildProvidersTree([
    [StrictMode],
    [HelmetProvider],
    [BrowserRouter, { future: { v7_startTransition: true, v7_relativeSplatPath: true } }],
    [Suspense],
]);

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
    <ProvidersTree>
        <App />
    </ProvidersTree>
);
