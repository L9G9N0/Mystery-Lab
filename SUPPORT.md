# Support Guide

We want to ensure you have a smooth experience using the **Mystery Lab** platform. This guide outlines the channels you can use to get help, ask questions, or report bugs.

---

## 🔍 Frequently Asked Questions (FAQ)
Before opening an issue or asking for support, check the FAQ section built directly into the Mystery Lab homepage. It contains answers to common queries regarding:
* Science kit delivery and subscription terms.
* What materials are included in the packages.
* Refund policies and administrative bookings.

---

## 🐛 Reporting a Bug
If you discover a bug or technical issue:
1. Search our [GitHub Issues](https://github.com/L9G9N0/Mystery-Lab/issues) to see if it has already been reported.
2. If it hasn't, open a new issue with:
   * A clear, descriptive title.
   * Steps to reproduce the bug.
   * Expected vs. actual behavior.
   * Relevant console error outputs or screenshots.
   * Your browser and OS details.

---

## ⚙️ Backend & Database Support
If you are running into issues with the FastAPI engine or Supabase database integration:
1. Ensure your `.env` or Vercel environment variables are set correctly (specifically `SUPABASE_URL` and `SUPABASE_KEY`).
2. Verify that you have executed the database schema migrations in [supabase_schema.sql](file:///Users/legend27648/agy-cli-projects/Mystery-Lab/migrations/supabase_schema.sql) using the Supabase SQL editor.
3. Run the local backend verification test suite using the `Makefile`:
   ```bash
   make test
   ```

---

## 🤝 Connect & Social Support
If you need direct assistance or have custom partnership inquiries:
* **GitHub Issues:** [L9G9N0/Mystery-Lab/issues](https://github.com/L9G9N0/Mystery-Lab/issues)
* **LinkedIn:** [Hariom Kumar Bharti](https://www.linkedin.com/in/hariomkumarbharti/)
