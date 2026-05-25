/**
 * EmployeeCard.jsx
 * ----------------
 * A reusable card component that displays employee information.
 * Currently uses static/mock data.
 *
 * TODO: Replace props with real employee data fetched from Spring Boot API.
 *   Example: GET /api/employees/{id}  →  { name, role, dept, id, joinDate, status }
 */

import React from 'react';
import './EmployeeCard.css';

function EmployeeCard({ name, role, department, employeeId, joinDate, status }) {
  return (
    <div className="emp-card">

      {/* ── Avatar section ── */}
      <div className="emp-card__avatar-wrap">
        <div className="emp-card__avatar">
          {/* Show first letter of the name as avatar */}
          {name ? name.charAt(0).toUpperCase() : 'E'}
        </div>
        {/* Online/Offline status dot */}
        <span className={`emp-card__status-dot ${status === 'Active' ? 'active' : 'inactive'}`} />
      </div>

      {/* ── Name & Role ── */}
      <div className="emp-card__info">
        <h3 className="emp-card__name">{name}</h3>
        <p  className="emp-card__role">{role}</p>
      </div>

      {/* ── Divider ── */}
      <div className="emp-card__divider" />

      {/* ── Detail grid ── */}
      <div className="emp-card__details">
        <div className="emp-card__detail-item">
          <span className="emp-card__detail-label">🏢 Department</span>
          <span className="emp-card__detail-value">{department}</span>
        </div>
        <div className="emp-card__detail-item">
          <span className="emp-card__detail-label">🪪 Employee ID</span>
          <span className="emp-card__detail-value">{employeeId}</span>
        </div>
        <div className="emp-card__detail-item">
          <span className="emp-card__detail-label">📅 Joined</span>
          <span className="emp-card__detail-value">{joinDate}</span>
        </div>
        <div className="emp-card__detail-item">
          <span className="emp-card__detail-label">⚡ Status</span>
          <span className={`emp-card__badge ${status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Default props (used if no data is passed) ──────────────────────────────────
EmployeeCard.defaultProps = {
  name:        'Demo Employee',
  role:        'Software Engineer',
  department:  'Engineering',
  employeeId:  'EMP-0001',
  joinDate:    'Jan 2024',
  status:      'Active',
};

export default EmployeeCard;
