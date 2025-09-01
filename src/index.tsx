import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode, Suspense } from 'react';
import 'react-activity/dist/react-activity.css';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { buildProvidersTree } from 'utils/providerTree';
import App from './App';
import './app.css';
import './index.css';

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
