# Public vs Dashboard Layout – Step by Step Guide

## Overview

The VU LMS Buddy app now uses a **dual-layout pattern** similar to real-world LMS platforms (Coursera, Udemy, edX):

- **Guest (not signed in)**: Marketing-style public site – **no sidebar**
- **Logged in**: Dashboard-style app – **dark sidebar + topbar** (matches `dashboard/` folder aesthetic)

---

## Step 1: Layout Architecture

### Public Layout (`PublicLayout.jsx`)
- **Path**: `frontend/src/layouts/PublicLayout.jsx`
- **Used when**: User is NOT signed in
- **Contains**: Navbar + main content (no sidebar)
- **Purpose**: Landing, marketing, and browse experience

### Dashboard Layout (`DashboardLayout.jsx`)
- **Path**: `frontend/src/layouts/DashboardLayout.jsx`
- **Used when**: User IS signed in
- **Contains**: Dark gradient Sidebar (fixed) + Topbar (greeting, search) + main content — **no Navbar**
- **Purpose**: Learning, analytics, profile, course management
- **Style**: Matches `dashboard/` folder (blue gradient sidebar, white topbar, #f6f8fa bg)

### Layout Switcher (`MainLayout.jsx`)
- **Path**: `frontend/src/layouts/MainLayout.jsx`
- **Logic**: Checks `state.auth.user` – if present → `DashboardLayout`, else → `PublicLayout`

---

## Step 2: New / Updated Files

| File | Action |
|------|--------|
| `layouts/PublicLayout.jsx` | **Created** – Navbar + Outlet |
| `layouts/DashboardLayout.jsx` | **Created** – Dark Sidebar + Topbar + Outlet (dashboard-folder style) |
| `components/DashboardSidebar.jsx` | **Created** – Dark gradient sidebar (Home, Analytics, Courses, categories, Profile, Logout) |
| `components/DashboardTopbar.jsx` | **Created** – Greeting, search, Settings link |
| `styles/dashboard.css` | **Created** – Dashboard layout CSS (sidebar, topbar, main) |
| `pages/Profile.jsx` | **Created** – Basic profile page |
| `layouts/MainLayout.jsx` | **Updated** – Auth-based layout switch |
| `layouts/AuthLayout.jsx` | **Updated** – Redirect logged-in users to `/` |
| `App.jsx` | **Updated** – Profile route, Analytics protected |

---

## Step 3: Route Structure (unchanged URLs)

| Route | Layout (Guest) | Layout (Logged in) | Access |
|-------|----------------|--------------------|--------|
| `/` | PublicLayout | DashboardLayout | All |
| `/courses` | PublicLayout | DashboardLayout | All |
| `/courses/:id` | PublicLayout | DashboardLayout | All |
| `/pricing` | PublicLayout | DashboardLayout | All |
| `/contact` | PublicLayout | DashboardLayout | All |
| `/analytics` | N/A (redirect login) | DashboardLayout | Protected |
| `/profile` | N/A (redirect login) | DashboardLayout | Protected |
| `/auth/login`, `/auth/register` | AuthLayout | Redirect to `/` | All |

---

## Step 4: User Flow

### Guest Flow
1. User visits `/` → `PublicLayout` (no sidebar)
2. Can browse Home, Courses, Pricing, Contact
3. Clicks Login/Register → `AuthLayout`
4. After login → Redirect to `/` → `DashboardLayout` (with sidebar)

### Logged-in Flow
1. User visits `/` → `DashboardLayout` (sidebar visible)
2. Sidebar: Home, Analytics, All Courses, categories, Profile
3. Visits `/auth/login` → Redirect to `/`
4. Logout → Redirect to `/auth/login`

---

## Step 5: Dashboard Sidebar Sections

1. **Dashboard** – Home, Analytics
2. **Learning Paths** – All Courses + category filters
3. **Account** – Profile Settings

---

## Step 6: What Stayed the Same

- All page URLs (`/`, `/courses`, `/pricing`, etc.) – no route changes
- Navbar – same for both layouts (Home, Courses, Pricing, Contact + user menu)
- Auth flow – login/register still redirect to `/`
- Protected routes – Quiz, Notes, SubjectiveQuestions, Admin, Analytics, Profile
- Old `Sidebar.jsx` – still in codebase but not used (can be removed later)

---

## Step 7: Testing Checklist

- [ ] Visit `/` as guest → no sidebar
- [ ] Login → redirect to `/` with sidebar
- [ ] Visit `/courses`, `/pricing` as guest → no sidebar
- [ ] Visit `/analytics` as guest → redirect to login
- [ ] Visit `/profile` as guest → redirect to login
- [ ] Visit `/auth/login` when logged in → redirect to `/`
- [ ] Logout → redirect to login page

---

## Quick Reference

```
Guest  → PublicLayout  → Navbar only
User   → DashboardLayout → Navbar + DashboardSidebar
```
