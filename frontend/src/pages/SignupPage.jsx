/**
 * SignupPage.jsx
 * -------------
 * Registration page with full name, email, password,
 * confirm password fields, validation, and password strength meter.
 *
 * TODO: Connect Spring Boot Register API here (see handleSignup).
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

// ─── Helper: email format check ───────────────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Helper: password strength (returns 'weak' | 'fair' | 'strong') ──────────
function getPasswordStrength(password) {
  if (password.length < 6)  return 'weak';
  if (password.length < 10) return 'fair';

  const hasUpper   = /[A-Z]/.test(password);
  const hasNumber  = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (hasUpper && hasNumber && hasSpecial) return 'strong';
  if (hasNumber || hasUpper)               return 'fair';
  return 'weak';
}

// ─── SignupPage Component ─────────────────────────────────────────────────────
function SignupPage() {
  const navigate = useNavigate();

  // ── State: form fields ──
  const [formData, setFormData] = useState({
    fullName:        '',
    email:           '',
    password:        '',
    confirmPassword: '',
  });

  // ── State: show/hide toggles ──
  const [showPassword,        setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ── State: errors ──
  const [errors, setErrors] = useState({});

  // ── State: loading & success ──
  const [loading, setLoading]       = useState(false);
  const [success, setSuccess]       = useState(false);

  // ── Derived: password strength ──
  const strength = formData.password ? getPasswordStrength(formData.password) : null;

  // ── Generic change handler for all inputs ──
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear that specific field's error when user starts typing
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  // ── Validate all fields ──
  const validate = () => {
    const newErrors = {};

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters.';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true = no errors
  };

  // ── Handle form submission ──
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // ──────────────────────────────────────────────────────────────────────────
    // TODO: Connect Spring Boot Register API here
    //
    // Example (replace with your actual Spring Boot endpoint):
    //
    // try {
    //   const response = await fetch('http://localhost:8080/api/auth/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       fullName: formData.fullName,
    //       email:    formData.email,
    //       password: formData.password,
    //     }),
    //   });
    //
    //   const data = await response.json();
    //
    //   if (response.ok) {
    //     setSuccess(true);
    //     setTimeout(() => navigate('/'), 2000); // Redirect to login after 2s
    //   } else {
    //     setErrors({ email: data.message || 'Registration failed.' });
    //   }
    // } catch (err) {
    //   console.error('Register API error:', err);
    //   setErrors({ email: 'Server error. Please try again.' });
    // } finally {
    //   setLoading(false);
    // }
    // ──────────────────────────────────────────────────────────────────────────

    // ── TEMPORARY: Simulate success and redirect to login ──
    try {
  const response = await fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    }),
  });

  const data = await response.text();

  setLoading(false);

  if (data === "Employee Registered Successfully!") {

    setSuccess(true);

    setTimeout(() => {
      navigate('/');
    }, 2000);

  } else {

    setErrors({
      ...errors,
      email: 'Registration Failed',
    });
  }

} catch (error) {

  console.error('Register Error:', error);

  setLoading(false);

  setErrors({
    ...errors,
    email: 'Server Error',
  });
}
  };

  // ─── Strength bar helper ───────────────────────────────────────────────────
  const getBarClass = (barIndex) => {
    // bar 1 lights up for any strength; bar 2 for fair/strong; bar 3 for strong
    if (!strength) return '';
    if (strength === 'weak'   && barIndex <= 1) return 'weak';
    if (strength === 'fair'   && barIndex <= 2) return 'fair';
    if (strength === 'strong' && barIndex <= 3) return 'strong';
    return '';
  };

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="signup-page">
      <div className="signup-card">

        {/* ── Brand ── */}
        <div className="signup-brand">
          <div className="signup-logo">👤</div>
          <h1>Create Account</h1>
          <p>Join the EmpTrack employee portal</p>
        </div>

        {/* ── Success banner (shown after registration) ── */}
        {success && (
          <div className="success-banner">
            ✅ Account created! Redirecting to login...
          </div>
        )}

        {/* ── Signup Form ── */}
        <form className="signup-form" onSubmit={handleSignup} noValidate>

          {/* ── Full Name ── */}
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <div className="input-wrapper">
              <span className="input-icon">🧑</span>
              <input
                id="fullName"
                type="text"
                className={`form-input no-toggle ${errors.fullName ? 'input-error' : ''}`}
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange('fullName')}
                autoComplete="name"
              />
            </div>
            {errors.fullName && <span className="error-msg">⚠ {errors.fullName}</span>}
          </div>

          {/* ── Email ── */}
          <div className="form-group">
            <label htmlFor="regEmail">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉️</span>
              <input
                id="regEmail"
                type="email"
                className={`form-input no-toggle ${errors.email ? 'input-error' : ''}`}
                placeholder="john@company.com"
                value={formData.email}
                onChange={handleChange('email')}
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="error-msg">⚠ {errors.email}</span>}
          </div>

          {/* ── Password ── */}
          <div className="form-group">
            <label htmlFor="regPassword">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                id="regPassword"
                type={showPassword ? 'text' : 'password'}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange('password')}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="error-msg">⚠ {errors.password}</span>}

            {/* Password strength indicator */}
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bars">
                  <div className={`strength-bar ${getBarClass(1)}`} />
                  <div className={`strength-bar ${getBarClass(2)}`} />
                  <div className={`strength-bar ${getBarClass(3)}`} />
                </div>
                <span className={`strength-label ${strength}`}>
                  {strength === 'weak'   && 'Weak'}
                  {strength === 'fair'   && 'Fair'}
                  {strength === 'strong' && 'Strong'}
                </span>
              </div>
            )}
          </div>

          {/* ── Confirm Password ── */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔑</span>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-msg">⚠ {errors.confirmPassword}</span>
            )}
          </div>

          {/* ── Register Button ── */}
          <button type="submit" className="btn-primary" disabled={loading || success}>
            {loading ? '⏳ Creating account...' : '✨ Create Account'}
          </button>

          <div className="btn-divider">already a member?</div>

          {/* ── Back to Login ── */}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/')}
          >
            ← Back to Login
          </button>
        </form>

        <p className="signup-footer">
          🔐 Secure employee portal · v1.0.0
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
