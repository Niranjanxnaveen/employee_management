# 🏢 EmpTrack — Employee Login Management System
### College Mini Project | React.js Frontend

A premium, modern Employee Login Management System built with **React.js**, **React Router DOM**, and **CSS3**. Designed for easy Spring Boot backend integration.

---

## 📁 Project Structure

```
employee-login-system/
├── index.html                    ← HTML entry point
├── package.json                  ← Dependencies & scripts
├── vite.config.js                ← Vite bundler config
│
└── src/
    ├── main.jsx                  ← React app bootstrap
    ├── App.jsx                   ← Router setup (3 routes)
    ├── index.css                 ← Global styles & CSS variables
    │
    ├── pages/
    │   ├── LoginPage.jsx         ← Login form + validation
    │   ├── LoginPage.css
    │   ├── SignupPage.jsx        ← Registration form + validation
    │   ├── SignupPage.css
    │   ├── HomePage.jsx          ← Dashboard after login
    │   └── HomePage.css
    │
    └── components/
        ├── EmployeeCard.jsx      ← Reusable employee profile card
        └── EmployeeCard.css
```

---

## 🚀 Installation & Running

### Prerequisites
- **Node.js** v16 or higher → [Download here](https://nodejs.org)
- **npm** (comes with Node.js)

### Steps

```bash
# 1. Navigate into the project folder
cd employee-login-system

# 2. Install all dependencies (react, react-dom, react-router-dom, vite)
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser and visit:
#    http://localhost:5173
```

### Build for Production
```bash
npm run build     # Creates optimized files in /dist folder
npm run preview   # Preview the production build locally
```

---

## 📄 Pages & Navigation

| Route      | Page        | Description                              |
|------------|-------------|------------------------------------------|
| `/`        | Login Page  | Email + password login with validation   |
| `/signup`  | Signup Page | Registration with 4 fields + validation  |
| `/home`    | Home Page   | Dashboard with employee card & stats     |

**Current navigation flow:**
- Login → validates fields → navigates to `/home`
- Signup → validates fields → shows success → redirects to `/`
- Logout button → navigates to `/`

---

## ✅ Features Implemented

### Login Page
- [x] Email & password fields
- [x] Show/Hide password toggle (👁️)
- [x] Frontend validation (empty, email format, min length)
- [x] Error messages with shake animation
- [x] Loading state on submit
- [x] Navigate to Home on success
- [x] `// TODO` comment for Spring Boot API connection

### Signup Page
- [x] Full Name, Email, Password, Confirm Password fields
- [x] Password strength meter (Weak / Fair / Strong)
- [x] Validation: empty fields, email format, password match
- [x] Show/Hide toggles on both password fields
- [x] Success banner before redirect
- [x] `// TODO` comment for Spring Boot API connection

### Home / Dashboard Page
- [x] Sticky top navigation bar with live clock
- [x] Welcome message with gradient name highlight
- [x] 4 stats cards (employees, attendance, leaves, performance)
- [x] Employee profile card (reusable component)
- [x] Recent activity feed
- [x] Quick action buttons
- [x] Logout button → redirects to Login

---

## 🔌 Connecting Spring Boot Backend (Future)

Search for `// TODO` comments in the code. There are two main connection points:

### 1. Login API (`src/pages/LoginPage.jsx`)
```javascript
// Uncomment and replace the fetch URL:
const response = await fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
```

### 2. Register API (`src/pages/SignupPage.jsx`)
```javascript
const response = await fetch('http://localhost:8080/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fullName, email, password }),
});
```

### 3. Employee Data API (`src/pages/HomePage.jsx`)
```javascript
const response = await fetch('http://localhost:8080/api/employees/me', {
  headers: { 'Authorization': `Bearer ${token}` },
});
```

---

## 🎨 Design System

| Token             | Value                        |
|-------------------|------------------------------|
| Primary Accent    | `#00c6ff` (Electric Cyan)    |
| Secondary Accent  | `#7b5ea7` (Soft Violet)      |
| Background        | Deep navy gradient           |
| Cards             | Glassmorphism (blur + opacity)|
| Heading Font      | Outfit (Google Fonts)        |
| Body Font         | DM Sans (Google Fonts)       |
| Border Radius     | 8px → 32px scale             |

---

## 📦 Dependencies

| Package          | Version  | Purpose                         |
|------------------|----------|---------------------------------|
| react            | ^18.2.0  | UI library                      |
| react-dom        | ^18.2.0  | React DOM renderer              |
| react-router-dom | ^6.20.0  | Client-side routing             |
| vite             | ^5.0.0   | Dev server & build tool         |

---

## 💡 Key React Concepts Used

- **Functional Components** — All pages are functions, not classes
- **useState Hook** — For form fields, errors, loading, toggles
- **useEffect Hook** — For the live clock in the navbar
- **useNavigate Hook** — Programmatic navigation between pages
- **React Router v6** — `<BrowserRouter>`, `<Routes>`, `<Route>`
- **Props** — EmployeeCard receives data from HomePage
- **defaultProps** — Fallback values for EmployeeCard

---

*Built with ❤️ as a College Mini Project*
