# Changelog

All notable changes to the **Mystery Lab** project will be documented in this file.

---

## [1.1.0] - 2026-06-24
### Added
* Created Vercel serverless integration using `vercel.json` and `api/index.py` ASGI handler.
* Created `.python-version` locking Python runtime to 3.12.
* Configured dynamic `base` path in `vite.config.ts` depending on the `VERCEL` build environment, resolving assets path mismatch (blank page issue).
* Added active URL check in `src/lib/supabase.ts` to sanitize and validate `VITE_SUPABASE_URL` during client-side startup, preventing app crashes.

### Changed
* Unpinned dependencies in `requirements.txt` to loose ranges, enabling Vercel's `uv` compiler to resolve precompiled wheels on any architecture instantly.

---

## [1.0.0] - 2026-06-23
### Added
* Added FastAPI python backend in `app/` folder.
* Created Supabase DB SQL migrations schema at `migrations/supabase_schema.sql` with Row Level Security (RLS) policies and seed data.
* Implemented `AuthContext.tsx` and `AuthModal.tsx` for secure user account authorization.
* Created `AdminDashboard.tsx` component to allow administrators to monitor client bookings and enquiries.
* Implemented unit and integration test suites in the `tests/` directory (`test_api.py`, `test_verify_mystery_lab.py`).
* Added `Dockerfile` and `render.yaml` for containerized hosting support.

### Changed
* Refactored static elements in frontend modules (Contact, Header, ScienceKits, PricingPackages) to communicate with backend API endpoints instead of static mockups.

---

## [0.1.0] - 2026-06-20
### Added
* Initial static mockup codebase.
* Implemented space-themed landing UI with Framer Motion animations.
* Set up Radix UI, Lucide icons, and Tailwind CSS design tokens.
