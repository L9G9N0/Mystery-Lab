# Release Procedures & Versioning

This document describes how versions are managed, tagged, and deployed for the **Mystery Lab** platform.

---

## 📌 Versioning Strategy
We adhere strictly to [Semantic Versioning (SemVer)](https://semver.org/). Version numbers follow the format `MAJOR.MINOR.PATCH`:
* **MAJOR**: Unresolved database migrations, breaking changes to API endpoints, or radical frontend overhauls that break backward compatibility.
* **MINOR**: New API endpoints, new UI components, non-breaking schema additions (e.g. adding new tracking columns).
* **PATCH**: Bug fixes, Vercel dependency optimizations (such as pinning python or using wheels), or documentation updates.

---

## 📦 Build & Release Workflow

### 1. Verification Checklist
Before releasing any code change:
1. Ensure all local tests pass successfully:
   ```bash
   make test
   ```
2. Verify the production frontend build compiles without type errors:
   ```bash
   npm run build
   ```
3. Verify that environment variables (`.env`) match the required keys in `app/core/config.py`.

### 2. Creating a Release Tag
When ready to create a release:
1. Standardize and log the release version in `CHANGELOG.md`.
2. Commit the changes and tag the commit in git:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   ```
3. Push the tag to GitHub:
   ```bash
   git push origin v1.0.0
   ```

### 3. Deployments
* **GitHub main push**: Triggers Vercel to automatically build the latest frontend code and compile the serverless functions in `api/index.py`.
* **Vercel Deployments**: Auto-promotes successful builds to production if pushed directly to the `main` branch.
