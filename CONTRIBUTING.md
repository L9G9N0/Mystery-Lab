# Contributing to Mystery Lab

We welcome contributions to **Mystery Lab**! Please follow these guidelines to ensure a smooth, cooperative development workflow.

---

## 🛠️ Local Development Setup
1. Fork and clone the repository.
2. Follow the detailed steps in [DEVELOPMENT.md](file:///Users/legend27648/agy-cli-projects/Mystery-Lab/DEVELOPMENT.md) to initialize your Python environment, install NPM dependencies, and configure your Supabase variables.
3. Test your changes locally to ensure there are no compilation or runtime errors.

---

## 🌿 Git Branching & Commits
* **Branching model**: Always branch off `main`. Use descriptive names:
  * `feature/add-interactive-lab`
  * `bugfix/fix-token-refresh`
  * `docs/update-api-routes`
* **Commit Messages**: Write clear, imperative commit messages:
  * Good: `Fix Supabase URL sanitizer to allow custom protocols`
  * Bad: `fixed bugs` or `updates`

---

## 🔍 Code Quality & Verification
Before opening a Pull Request (PR):
1. **Linting**: Run `npm run lint` to verify frontend rules.
2. **Format**: Follow standard PEP-8 style guidelines for Python code.
3. **Tests**: Ensure all automated test suites pass:
   ```bash
   make test
   ```
4. **Build Check**: Verify Vite builds successfully:
   ```bash
   npm run build
   ```

---

## 📬 Submitting a Pull Request
1. Push your branch to your forked repository.
2. Open a Pull Request against our `main` branch.
3. Write a clear description of what your PR accomplishes, reference any related issues, and provide screenshots for UI changes.
4. Wait for code review. We will review and provide feedback as soon as possible.
