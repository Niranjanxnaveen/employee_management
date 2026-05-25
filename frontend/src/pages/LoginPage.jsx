/**
 * LoginPage.jsx
 * -------------
 * Login page with email + password fields,
 * show/hide password toggle, and basic validation.
 *
 * On successful validation, navigates to /home.
 * TODO: Connect Spring Boot Login API here (see handleLogin).
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import './LoginPage.css';

// ─── Helper: very simple email format check ───────────────────────────────────
function isValidEmail(email) {
  // Basic regex: must have something@something.something
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── LoginPage Component ──────────────────────────────────────────────────────
function LoginPage() {
  // useNavigate() lets us redirect to another route
  const navigate = useNavigate();

  // ── State: form field values ──
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  // ── State: show/hide password toggle ──
  const [showPassword, setShowPassword] = useState(false);

  // ── State: validation error messages (empty string = no error) ──
  const [errors, setErrors] = useState({ email: '', password: '' });

  // ── State: loading (for future API call) ──
  const [loading, setLoading] = useState(false);

  // ── Validate all fields; returns true if valid ──
  const validate = () => {
    let newErrors = { email: '', password: '' };
    let valid = true;

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ── Handle form submission ──
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent browser page refresh

    // Step 1: Validate inputs
    if (!validate()) return;

    setLoading(true);

    // ──────────────────────────────────────────────────────────────────────────
    // TODO: Connect Spring Boot Login API here
    //
    // Example (replace with your actual Spring Boot endpoint):
    //
    // try {
    //   const response = await fetch('http://localhost:8080/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });
    //
    //   const data = await response.json();
    //
    //   if (response.ok) {
    //     // Save token: localStorage.setItem('token', data.token);
    //     navigate('/home');
    //   } else {
    //     setErrors({ ...errors, password: data.message || 'Invalid credentials.' });
    //   }
    // } catch (err) {
    //   console.error('Login API error:', err);
    //   setErrors({ ...errors, password: 'Server error. Please try again.' });
    // } finally {
    //   setLoading(false);
    // }
    // ──────────────────────────────────────────────────────────────────────────

    // ── TEMPORARY: Simulate a short delay and navigate to Home ──
    // (Remove this block once the API is connected above)
    try {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.text();

  setLoading(false);

  if (data === "Login Successful!") {
    navigate('/home');
  } else {
    setErrors({
      ...errors,
      password: 'Invalid Email or Password',
    });
  }

} catch (error) {
  console.error('Login Error:', error);

  setLoading(false);

  setErrors({
    ...errors,
    password: 'Server Error',
  });
}
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="login-page">
      <div className="login-card">

        {/* ── Brand / Logo ── */}
        <div className="login-brand">
          <div className="login-logo">🏢</div>
          <h1>EmpTrack</h1>
          <p>Employee Management System</p>
        </div>

        <h2 className="login-heading">Sign in to your account</h2>

        {/* ── Login Form ── */}
        <form onSubmit={handleLogin} noValidate>

          {/* ── Email field ── */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                id="email"
                type="email"
                className={`form-input no-toggle ${errors.email ? 'input-error' : ''}`}
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // Clear error as user types
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                autoComplete="email"
              />
            </div>
            {/* Show error message if validation fails */}
            {errors.email && <span className="error-msg">⚠ {errors.email}</span>}
          </div>

          {/* ── Password field ── */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'} /* Toggle type */
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                autoComplete="current-password"
              />
              {/* Show/Hide password toggle */}
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="error-msg">⚠ {errors.password}</span>}
          </div>

          {/* ── Login Button ── */}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '⏳ Signing in...' : '🚀 Sign In'}
          </button>

          <div className="btn-divider">or</div>

          {/* ── Go to Signup ── */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign Up
          </button>
        </form>

        {/* ── Footer note ── */}
        <p className="login-footer">
          🔐 Secure employee portal · v1.0.0
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
