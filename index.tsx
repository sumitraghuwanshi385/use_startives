import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./global.css";

window.onerror = function (msg, url, lineNo, columnNo, error) {
  document.body.innerHTML =
    "<h1 style='color:red'>JS ERROR: " + msg + "</h1>";
};

import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { HashRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);