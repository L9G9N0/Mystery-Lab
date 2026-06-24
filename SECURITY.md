# Security Model & Policies

We take the security of **Mystery Lab** seriously. This document describes our security architecture, Row Level Security (RLS) configuration, and vulnerability reporting procedures.

---

## 🔒 Security Architecture

### 1. User Authentication
* Frontend authentication is managed directly by **Supabase Auth** (`supabase.auth.signInWithPassword`, `signUp`).
* When a user logs in, Supabase issues a JSON Web Token (JWT).
* The frontend includes this token as a `Bearer` header in all requests sent to the FastAPI backend:
  ```http
  Authorization: Bearer <JWT_TOKEN>
  ```

### 2. Backend Authorization Engine
* The FastAPI backend verifies the JWT on protected endpoints using `get_current_user` inside [endpoints.py](file:///Users/legend27648/agy-cli-projects/Mystery-Lab/app/api/endpoints.py).
* `get_current_user` calls `supabase.auth.get_user(jwt=token)` to validate the session token.
* Admin route validation is handled by `get_current_admin`. It queries the `admins` table to verify if the user's UUID possesses administrative privileges. If not, it throws a `403 Forbidden` error.

---

## 🛡️ Database Row Level Security (RLS)
We enforce strict data isolation inside the database. Every table has RLS enabled.

| Table | Read Access (SELECT) | Write Access (INSERT/UPDATE/DELETE) |
| :--- | :--- | :--- |
| `admins` | Authenticated Admins | Nobody (Manual SQL seed only) |
| `profiles` | Owner (User UUID matches profile ID) OR Admins | Owner (User UUID matches profile ID) |
| `science_kits` | Public (Anonymous visitors can view kits) | Authenticated Admins only |
| `experiments` | Public (Anonymous visitors can read) | Authenticated Admins only |
| `bookmarks` | Owner (User UUID matches bookmark owner) | Owner (User UUID matches bookmark owner) |
| `contact_requests`| Authenticated Admins only | Public (Anyone can submit enquiries) |
| `newsletter` | Authenticated Admins only | Public (Anyone can subscribe) |
| `bookings` | Owner (User UUID matches booking) OR Admins | Owner (User UUID matches booking) OR Admins |
| `feedback` | Public (Anyone can view reviews) | Authenticated Users only (User ID matches profile) |
| `activity_logs` | Authenticated Admins only | Authenticated Admins only |

---

## 🚨 Reporting a Vulnerability
If you discover a security vulnerability (such as SQL injections, RLS bypasses, or data exposure):
1. **Do not** open a public GitHub issue.
2. Send a detailed report to the project maintainers or email the owner directly at `hariomroy8800@gmail.com`.
3. Include clear steps to reproduce the vulnerability, along with screenshots or mock requests if applicable.
4. We will investigate the issue and roll out a patch as soon as possible.
