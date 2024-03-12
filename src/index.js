import React from 'react';
import App from './components/App.jsx';
import { createRoot } from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import './api/mocks';
import './i18n';
import './index.scss';
import './fonts.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>);
