/**
 * main.jsx
 * --------
 * Entry point of the React application.
 * This is where React attaches to the HTML page (index.html → div#root).
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Global base styles

// ReactDOM.createRoot() is the modern React 18 way to start the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* StrictMode helps catch bugs during development — does NOT affect production */}
    <App />
  </React.StrictMode>
);
