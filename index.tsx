import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import { Analytics } from '@vercel/analytics/react';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

if (import.meta.env.DEV) {
  window.onerror = function (msg) {
    document.body.innerHTML =
      "<h1 style='color:red'>JS ERROR: " + msg + "</h1>";
  };
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <App />
          <Analytics />
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);