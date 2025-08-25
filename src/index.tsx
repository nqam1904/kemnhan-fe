import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-activity/dist/react-activity.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './app';
import './app.css';
import './index.css';
import { buildProvidersTree } from 'utils/providerTree';
import { StrictMode, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

const ProvidersTree = buildProvidersTree([
    [StrictMode],
    [HelmetProvider],
    [BrowserRouter, { future: { v7_startTransition: true, v7_relativeSplatPath: true } }],
    [Suspense],
]);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ProvidersTree>
        <App />
    </ProvidersTree>
);
