/**
 * HomePage.jsx
 * ------------
 * Dashboard shown after a successful login.
 * Displays a welcome message, stats, employee card, and activity feed.
 *
 * Logout button navigates the user back to the Login page.
 *
 * TODO: Replace static data with real API calls to Spring Boot backend:
 *   GET /api/employees/me         → logged-in employee profile
 *   GET /api/dashboard/stats      → headcount, attendance, etc.
 *   GET /api/activity/recent      → recent activity feed
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeCard from '../components/EmployeeCard.jsx';
import './HomePage.css';

// ─── Static mock data (replace with API data later) ──────────────────────────

// Employee profile — TODO: fetch from GET /api/employees/me
const MOCK_EMPLOYEE = {
  name:        'Alex Johnson',
  role:        'Senior Software Engineer',
  department:  'Engineering',
  employeeId:  'EMP-2024-042',
  joinDate:    'March 2022',
  status:      'Active',
};

// Dashboard stats — TODO: fetch from GET /api/dashboard/stats
const MOCK_STATS = [
  { icon: '👥', label: 'Total Employees', value: '248',  change: '+12 this month', dir: 'up',   color: '#00c6ff' },
  { icon: '✅', label: 'Present Today',   value: '214',  change: '86% attendance',  dir: 'up',   color: '#22d3a0' },
  { icon: '📋', label: 'Open Leaves',     value: '18',   change: '3 pending review',dir: 'down', color: '#ffbc44' },
  { icon: '🏆', label: 'Avg Performance', value: '92%',  change: '+4% vs last qtr', dir: 'up',   color: '#a78bfa' },
];

// Recent activity — TODO: fetch from GET /api/activity/recent
const MOCK_ACTIVITY = [
  { icon: '🔐', bg: 'rgba(0,198,255,0.12)',    text: 'You logged in',            time: 'Just now'      },
  { icon: '📄', bg: 'rgba(255,188,68,0.12)',   text: 'Payslip for May available',time: '2 hours ago'   },
  { icon: '🎉', bg: 'rgba(34,211,160,0.12)',   text: 'Work anniversary — 2 years!',time:'Yesterday'    },
  { icon: '📅', bg: 'rgba(167,139,250,0.12)',  text: 'Leave request approved',   time: '3 days ago'    },
  { icon: '📢', bg: 'rgba(255,91,127,0.12)',   text: 'Company-wide meeting Friday',time:'Last week'    },
];

// Quick links
const QUICK_LINKS = [
  { icon: '📊', label: 'My Reports'     },
  { icon: '🗓️', label: 'Apply Leave'    },
  { icon: '💰', label: 'Payroll'        },
  { icon: '⚙️', label: 'Settings'       },
];

// ─── Live clock helper ─────────────────────────────────────────────────────────
function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ─── HomePage Component ───────────────────────────────────────────────────────
function HomePage() {
  const navigate  = useNavigate();
  const clockTime = useClock();

  // ── Logout handler: clears state and goes to login ──
  const handleLogout = () => {
    // TODO: When backend is connected, also invalidate the session/token:
    //   await fetch('http://localhost:8080/api/auth/logout', { method: 'POST' });
    //   localStorage.removeItem('token');

    navigate('/'); // Redirect to Login page
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="home-page">

      {/* ══ Top Navigation Bar ══ */}
      <nav className="home-navbar">
        {/* Left: Brand */}
        <div className="navbar-brand">
          <div className="navbar-logo">🏢</div>
          <span className="navbar-title">EmpTrack</span>
        </div>

        {/* Right: Clock + Logout */}
        <div className="navbar-right">
          <span className="navbar-time">🕐 {clockTime}</span>

          <button className="btn-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* ══ Main Content ══ */}
      <main className="home-main">

        {/* ── Welcome Banner ── */}
        <section className="welcome-section">
          <p className="welcome-greeting">👋 Good day!</p>
          <h1 className="welcome-title">
            Welcome back,{' '}
            <span>{MOCK_EMPLOYEE.name.split(' ')[0]}</span>
          </h1>
          <p className="welcome-subtitle">
            Here's a snapshot of your workspace. Everything looks good today.
            Have a productive day! 🚀
          </p>
        </section>

        {/* ── Stats Row ── */}
        <div className="stats-row">
          {MOCK_STATS.map((stat, index) => (
            <div
              key={index}
              className="stat-card"
              style={{ '--stat-color': stat.color }}
            >
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className={`stat-change ${stat.dir}`}>
                {stat.dir === 'up' ? '↑' : '↓'} {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* ── Dashboard Grid: Employee Card + Activity ── */}
        <div className="dashboard-grid">

          {/* ── Left: Employee Profile Card ── */}
          <EmployeeCard
            name={MOCK_EMPLOYEE.name}
            role={MOCK_EMPLOYEE.role}
            department={MOCK_EMPLOYEE.department}
            employeeId={MOCK_EMPLOYEE.employeeId}
            joinDate={MOCK_EMPLOYEE.joinDate}
            status={MOCK_EMPLOYEE.status}
          />

          {/* ── Right: Activity + Quick Links ── */}
          <div className="activity-section">

            {/* Recent Activity Feed */}
            <h2 className="section-title">📋 Recent Activity</h2>
            <div className="activity-feed">
              {MOCK_ACTIVITY.map((item, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-dot" style={{ background: item.bg }}>
                    {item.icon}
                  </div>
                  <div className="activity-text">
                    <strong>{item.text}</strong>
                    <span>⏱ {item.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <h2 className="section-title" style={{ marginTop: 'var(--space-sm)' }}>
              ⚡ Quick Actions
            </h2>
            <div className="quick-links">
              <div className="quick-links-grid">
                {QUICK_LINKS.map((link, index) => (
                  <button key={index} className="quick-link-btn">
                    <span className="ql-icon">{link.icon}</span>
                    <span className="ql-label">{link.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ══ Footer ══ */}
      <footer className="home-footer">
        EmpTrack v1.0.0 · College Mini Project · Built with React.js + React Router DOM
      </footer>
    </div>
  );
}

export default HomePage;
