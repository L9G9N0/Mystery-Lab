# Project Roadmap

This document outlines the proposed direction and future milestones for the **Mystery Lab** science education platform.

---

## 🗺️ Future Milestones

### Phase 1: Core Platform Optimization (Near-Term)
* [ ] **Error Boundaries**: Implement React error boundary elements in the frontend to catch runtime script crashes and render fallback components gracefully.
* [ ] **Supabase Auth Hook**: Add automatic token refreshing in `AuthContext.tsx` to handle long-lived user sessions seamlessly without requiring manual re-logins.
* [ ] **Test Coverage Expansion**: Write frontend component tests using Vitest and React Testing Library to verify form states and dynamic modal toggles.

### Phase 2: User Experience Enhancements (Mid-Term)
* [ ] **Interactive Experiments**: Move from a static list of experiments to real interactive WebGL/Three.js-based virtual laboratory challenges.
* [ ] **Kit Progress Tracking**: Add gamification elements in the user profile page to let children check off completed science kit challenges and earn badges.
* [ ] **Email Automated Flows**: Integrate a service like **Resend** or **SendGrid** in the FastAPI backend to send confirmation emails automatically when users submit bookings or contact forms.

### Phase 3: Administrative Control (Long-Term)
* [ ] **Advanced Analytics Panel**: Build dynamic charts on the `AdminDashboard` using `recharts` to show monthly subscription metrics and booking trends.
* [ ] **Role Management**: Support granular permissions (e.g. support staff, editor, super-admin) in the `admins` database table instead of binary boolean flags.
