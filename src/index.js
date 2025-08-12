import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-activity/dist/react-activity.css';
import App from './App';
import './App.css';
import './index.css';

let store = configureStore();

// Disable console.log in production
if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-console
    console.log = () => {};
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>
);
