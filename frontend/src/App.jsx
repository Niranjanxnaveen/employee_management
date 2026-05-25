/**
 * App.jsx
 * -------
 * Root component of the application.
 * Sets up React Router DOM so we can navigate between pages
 * without reloading the browser (Single Page Application).
 *
 * Routes:
 *   /          → LoginPage   (default landing page)
 *   /signup    → SignupPage
 *   /home      → HomePage    (shown after login)
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import all three pages
import LoginPage  from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import HomePage   from './pages/HomePage.jsx';

function App() {
  return (
    /*
     * BrowserRouter enables client-side routing.
     * It listens to the URL and renders the matching component.
     */
    <BrowserRouter>
      <Routes>
        {/* Default route → Login */}
        <Route path="/"       element={<LoginPage />}  />

        {/* Signup route */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Home / Dashboard route (shown after successful login) */}
        <Route path="/home"   element={<HomePage />}   />

        {/* Catch-all: redirect unknown URLs back to login */}
        <Route path="*"       element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
