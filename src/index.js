import React from 'react';
import App from './components/App.jsx';
import { createRoot } from 'react-dom/client';
import './api/mocks';
import './index.scss';
import './fonts.css';

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App />);