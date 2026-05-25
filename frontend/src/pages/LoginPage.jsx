/**
 * LoginPage.jsx
 */

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoginPage.css';

// ─── Helper: simple email format check ───────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── LoginPage Component ──────────────────────────────────────────────────────
function LoginPage() {
  const navigate  = useNavigate();

  const location = useLocation();
  const registeredName  = location.state?.registeredName  || '';
  const registeredEmail = location.state?.registeredEmail || '';

  // ── Form state (pre-fill email from signup if available) ──
  const [email,    setEmail]    = useState(registeredEmail);
  const [password, setPassword] = useState('');

  // ── Show/hide password ──
  const [showPassword, setShowPassword] = useState(false);

  // ── Validation errors ──
  const [errors,  setErrors]  = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // ── Validation ──
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

  // ── Handle login submit ──
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
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

  const data = await response.json();

  setLoading(false);

  if (data) {

    navigate('/home', {
      state: {
        userName: data.name
      }
    });

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

        {/* ── Brand ── */}
        <div className="login-brand">
          <div className="login-logo">🐢</div>
          <h1>Red Turtle</h1>
          <p>Staff Login Portal</p>
        </div>

        {/* If arriving from signup, show a welcome hint */}
        {registeredName && (
          <div className="welcome-hint">
            👋 Welcome, <strong>{registeredName}</strong>! Please sign in.
          </div>
        )}

        <h2 className="login-heading">Sign in to your account</h2>

        {/* ── Login Form ── */}
        <form onSubmit={handleLogin} noValidate>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                id="email"
                type="email"
                className={`form-input no-toggle ${errors.email ? 'input-error' : ''}`}
                placeholder="you@redturtle.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="error-msg">⚠ {errors.email}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="error-msg">⚠ {errors.password}</span>}
          </div>

          {/* Login Button */}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '⏳ Signing in...' : '☕ Sign In'}
          </button>

          <div className="btn-divider">or</div>

          {/* Go to Signup */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign Up
          </button>
        </form>

        <p className="login-footer">🐢 Red Turtle Coffee · Staff Portal</p>
      </div>
    </div>
  );
}

export default LoginPage;
