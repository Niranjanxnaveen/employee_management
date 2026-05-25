/**
 * HomePage.jsx
 * ------------
 * Red Turtle Coffee — Staff Portal Home / Company Overview
 *
 * Reads the logged-in user's name from React Router location state:
 *   location.state.userName  →  set by LoginPage on navigate('/home', { state: { userName } })
 *
 * If state is missing (e.g. user refreshed the page), falls back to "Staff Member".
 *
 * Logout button navigates back to the Login page.
 *
 * TODO: Replace static data with Spring Boot API calls:
 *   GET /api/company/overview  → stats, announcements
 *   GET /api/menu/featured     → featured menu items
 *   GET /api/employees/me      → logged-in user profile
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HomePage.css';

// ─── Static company data (replace with API later) ──────────────────────────────

const COMPANY_STATS = [
  { value: '2009', label: 'Founded',         icon: '📅', suffix: '' },
  { value: '1,200', label: 'Cups Daily',     icon: '☕', suffix: '+' },
  { value: '4.9',  label: 'Customer Rating', icon: '⭐', suffix: '/5' },
  { value: '38',   label: 'Staff Members',   icon: '👥', suffix: '' },
];

const FEATURED_MENU = [
  {
    name:        'Signature Espresso',
    description: 'Our house blend — bold, smooth, with a caramel finish. Roasted in-house every morning.',
    price:       '₹180',
    badge:       'Best Seller',
    emoji:       '☕',
    badgeClass:  'badge-hot',
  },
  {
    name:        'Turtle Latte',
    description: 'Velvety steamed milk layered over a double shot, lightly dusted with cinnamon.',
    price:       '₹220',
    badge:       'Signature',
    emoji:       '🐢',
    badgeClass:  'badge-signature',
  },
  {
    name:        'Cold Brew Blend',
    description: 'Steeped 18 hours for a naturally sweet, full-bodied cold coffee with zero bitterness.',
    price:       '₹250',
    badge:       'New',
    emoji:       '🧊',
    badgeClass:  'badge-new',
  },
  {
    name:        'Hazelnut Mocha',
    description: 'Rich Belgian chocolate, hazelnut syrup and espresso — a dessert in a cup.',
    price:       '₹260',
    badge:       'Popular',
    emoji:       '🍫',
    badgeClass:  'badge-hot',
  },
  {
    name:        'Butter Croissant',
    description: 'Freshly baked every morning. Flaky, golden layers with European-style butter.',
    price:       '₹120',
    badge:       'Fresh Daily',
    emoji:       '🥐',
    badgeClass:  'badge-new',
  },
  {
    name:        'Matcha Latte',
    description: 'Ceremonial-grade matcha whisked with oat milk — earthy, creamy, energising.',
    price:       '₹230',
    badge:       'Staff Fav',
    emoji:       '🍵',
    badgeClass:  'badge-signature',
  },
];

const ANNOUNCEMENTS = [
  { icon: '📢', text: 'New winter menu launches Dec 1st — staff tasting on Nov 28.',  time: 'Today'        },
  { icon: '🏆', text: 'Red Turtle wins "Best Café 2024" — Chennai Food Awards.',        time: '2 days ago'   },
  { icon: '🎓', text: 'Barista certification training: sign up by Nov 30.',             time: '3 days ago'   },
  { icon: '🎉', text: 'Team outing confirmed — Dec 14, Mahabalipuram.',                 time: 'Last week'    },
];

// ─── Live clock ────────────────────────────────────────────────────────────────
function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ─── Greeting based on time of day ────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return '🌅 Good morning';
  if (h < 17) return '☀️ Good afternoon';
  return '🌙 Good evening';
}

// ─── HomePage Component ────────────────────────────────────────────────────────
function HomePage() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const clockTime = useClock();

  /*
   * Read the userName passed from LoginPage via router state.
   * Falls back to 'Staff Member' if the page was refreshed
   * (router state is lost on refresh — handle with backend session later).
   *
   * TODO: When backend is connected, fetch user info from the token/session
   *   instead of relying on router state:
   *   const { data } = await fetch('/api/employees/me', { headers: { Authorization: `Bearer ${token}` } });
   *   setUserName(data.fullName);
   */
  const userName = location.state?.userName || 'Staff Member';

  // Show only first name in the greeting
  const firstName = userName.split(' ')[0];

  // ── Logout ──
  const handleLogout = () => {
    // TODO: invalidate session/token on backend:
    //await fetch('http://localhost:8080/api/auth/logout', { method: 'POST' });
    navigate('/');
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="home-page">

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════════ */}
      <nav className="home-navbar">

        {/* Left: Brand */}
        <div className="navbar-brand">
          <div className="navbar-logo">🐢</div>
          <div className="navbar-brand-text">
            <span className="navbar-title">Red Turtle</span>
            <span className="navbar-sub">Coffee Shop</span>
          </div>
        </div>

        {/* Right: clock + user chip + logout */}
        <div className="navbar-right">
          <span className="navbar-clock">☕ {clockTime}</span>

          {/*
           * User name chip — displays the name received from LoginPage state.
           * When backend is connected, replace with the name from the API/token.
           */}
          <div className="user-chip">
            <div className="user-chip-avatar">
              {/* First letter of the user's name as avatar */}
              {firstName.charAt(0).toUpperCase()}
            </div>
            <span className="user-chip-name">{userName}</span>
          </div>

          <button className="btn-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* ══ HERO SECTION ════════════════════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">{getGreeting()}, {firstName}!</p>
          <h1 className="hero-title">
            Welcome to<br />
            <span className="hero-brand-name">Red Turtle</span>
          </h1>
          <p className="hero-tagline">
            Crafting exceptional coffee experiences since 2009. Every cup tells a story —
            and you're part of the team that makes it happen.
          </p>
          <div className="hero-badges">
            <span className="hero-badge">☕ Specialty Coffee</span>
            <span className="hero-badge">🌱 Ethically Sourced</span>
            <span className="hero-badge">📍 Chennai, India</span>
          </div>
        </div>
        <div className="hero-emblem">
          <div className="emblem-ring">
            <div className="emblem-inner">🐢</div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ═══════════════════════════════════════════════════════════ */}
      <section className="stats-section">
        {COMPANY_STATS.map((stat, i) => (
          <div className="stat-item" key={i}>
            <span className="stat-icon">{stat.icon}</span>
            <span className="stat-value">{stat.value}{stat.suffix}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      <div className="home-main">

        {/* ══ ABOUT SECTION ═══════════════════════════════════════════════════ */}
        <section className="about-section">
          <div className="section-tag">Our Story</div>
          <h2 className="section-title">More than just coffee</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                Red Turtle Coffee was born in 2009 in the heart of Chennai, founded by
                two friends who believed great coffee deserved more than a paper cup.
                Starting with a single espresso machine and a rented corner spot, we
                grew into a beloved neighbourhood café through craft, consistency,
                and community.
              </p>
              <p>
                We source all our beans directly from small farms in Coorg, Chikmagalur,
                and Araku Valley — building long-term relationships with farmers who
                share our commitment to quality and sustainability. Every batch is
                small-roasted on-premises for peak freshness.
              </p>
              <p>
                Today, our team of{' '}
                <strong>38 passionate people</strong> — baristas, roasters, bakers,
                and front-of-house staff — serve over 1,200 cups daily to a loyal
                community of regulars and newcomers alike.
              </p>
            </div>
            <div className="about-values">
              {[
                { icon: '🌱', title: 'Sustainably Sourced',  desc: 'Direct trade with Indian farms. No middlemen, maximum quality.' },
                { icon: '🔥', title: 'Roasted Fresh Daily',  desc: 'Every batch roasted on-site each morning before opening.' },
                { icon: '🤝', title: 'Community First',      desc: 'A welcoming space for every guest, every single day.' },
                { icon: '🏆', title: 'Award Winning',        desc: 'Chennai Food Awards — Best Café 2022, 2023 & 2024.' },
              ].map((v, i) => (
                <div className="value-card" key={i}>
                  <span className="value-icon">{v.icon}</span>
                  <div>
                    <strong>{v.title}</strong>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURED MENU ═══════════════════════════════════════════════════ */}
        <section className="menu-section">
          <div className="section-tag">Our Menu</div>
          <h2 className="section-title">Featured offerings</h2>
          <div className="menu-grid">
            {FEATURED_MENU.map((item, i) => (
              <div className="menu-card" key={i}>
                <div className="menu-card-top">
                  <span className="menu-emoji">{item.emoji}</span>
                  <span className={`menu-badge ${item.badgeClass}`}>{item.badge}</span>
                </div>
                <h3 className="menu-name">{item.name}</h3>
                <p className="menu-desc">{item.description}</p>
                <div className="menu-price">{item.price}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ ANNOUNCEMENTS ═══════════════════════════════════════════════════ */}
        <section className="announcements-section">
          <div className="section-tag">Staff Board</div>
          <h2 className="section-title">Latest announcements</h2>
          <div className="announcements-list">
            {ANNOUNCEMENTS.map((a, i) => (
              <div className="announcement-item" key={i}>
                <span className="ann-icon">{a.icon}</span>
                <div className="ann-text">
                  <p>{a.text}</p>
                  <span className="ann-time">⏱ {a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>{/* end .home-main */}

      {/* ══ FOOTER ══════════════════════════════════════════════════════════════ */}
      <footer className="home-footer">
        <span>🐢 Red Turtle Coffee Shop</span>
        <span>·</span>
        <span>📍 Anna Nagar, Chennai</span>
        <span>·</span>
        <span>☕ Open 7 AM – 10 PM daily</span>
        <span>·</span>
        <span>Staff Portal v1.0</span>
      </footer>

    </div>
  );
}

export default HomePage;
