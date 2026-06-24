# Architectural Design & Decoupling

This document describes the high-level system architecture, client-server decoupling, authentication strategy, data structures, and database security rules of the **Mystery Lab** platform.

---

## 🏗️ System Overview

The platform uses a decoupled client-server architecture consisting of:
1. **React Single Page Application (SPA)**: Serves as the interactive landing page and client shell, written in TypeScript and styled using Tailwind CSS and Framer Motion.
2. **FastAPI Backend Engine**: Serves as a stateless REST service that processes client requests, handles validation schemas via Pydantic, and interacts with the database.
3. **Supabase Cloud Engine**: Manages user authentication (Supabase Auth) and relational tables (PostgreSQL) secured by Row Level Security (RLS) policies.

```mermaid
graph TD
    Client["React Frontend (Vite)"]
    API["FastAPI Backend (Vercel)"]
    DB["PostgreSQL (Supabase)"]
    Auth["Supabase Auth"]

    Client -->|1. Authenticate & Get Token| Auth
    Client -->|2. Send REST requests + JWT token| API
    API -->|3. Validate JWT & queries data| DB
    Client -->|Optional direct reads| DB
```

---

## 👥 Authentication & Authorization Flows

### Sign In & Token Issuance Flow
```mermaid
sequenceDiagram
    participant User as Visitor (Browser)
    participant Front as React Frontend
    participant SupaAuth as Supabase Auth Server

    User->>Front: Enter credentials in AuthModal
    Front->>SupaAuth: signInWithPassword(email, password)
    SupaAuth-->>Front: Return Session Obj (with JWT access_token)
    Front->>Front: Store Session in AuthContext state
```

### Authenticated Request Validation Flow
```mermaid
sequenceDiagram
    participant Front as React Frontend
    participant FastAPI as FastAPI Backend Engine
    participant SupaAuth as Supabase Auth Server
    participant DB as PostgreSQL Database

    Front->>FastAPI: GET /auth/profile/ (Bearer JWT Token)
    FastAPI->>SupaAuth: get_user(jwt=token)
    alt Token is valid
        SupaAuth-->>FastAPI: Return User Object (UUID: user_id)
        FastAPI->>DB: Query profile table where id = user_id
        DB-->>FastAPI: Return profile data
        FastAPI-->>Front: 200 OK (profile JSON payload)
    else Token is invalid/expired
        SupaAuth-->>FastAPI: Error Response
        FastAPI-->>Front: 401 Unauthorized
    end
```

---

## 🛡️ Database Schema & Security Layer

The database contains 10 primary tables configured in [supabase_schema.sql](file:///Users/legend27648/agy-cli-projects/Mystery-Lab/migrations/supabase_schema.sql):

### Security Policies & Row Level Security (RLS)
PostgreSQL's Row Level Security is active across all tables, ensuring strict data isolation. 

To determine administrative access, we define a helper function `is_admin(user_id)` inside the database:
```sql
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM admins WHERE admins.user_id = $1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

This helper function runs with `SECURITY DEFINER` privileges (similar to setuid), allowing standard users to query their authorization level against the protected `admins` table securely.
