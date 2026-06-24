# Local Development & Setup Guide

This document describes how to set up, build, test, and run the **Mystery Lab** application locally on your machine.

---

## 🛠️ Prerequisites
Ensure you have the following installed:
* **Node.js** (v18 or higher)
* **Python** (v3.12 or higher)
* **NPM** (v9 or higher)

---

## ⚙️ Backend Setup & Configuration

### 1. Setup Virtual Environment
Navigate to the root directory and create a Python virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Local Environment File
Create a `.env` file in the root directory (based on `.env.example` or with your custom database credentials):
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-supabase-service-key-or-anon-key
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_URL=http://localhost:8000
```

### 4. Database Schema Setup
Ensure your Supabase project contains the correct tables by executing the SQL migrations script located at [supabase_schema.sql](file:///Users/legend27648/agy-cli-projects/Mystery-Lab/migrations/supabase_schema.sql) in the Supabase **SQL Editor**.

### 5. Running the Backend Server
Start the local FastAPI development server:
```bash
uvicorn app.main:app --reload --port 8000
```
The API docs will be available at `http://localhost:8000/docs`.

---

## 💻 Frontend Setup & Configuration

### 1. Install Node Dependencies
Open a new terminal window in the root directory and run:
```bash
npm install
```

### 2. Running the Vite Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. The frontend will automatically detect that you are running on localhost and proxy all API calls to `http://localhost:8000/`.

---

## 🧪 Running Automated Tests

We use Python's built-in `unittest` library alongside FastAPI's `TestClient` to verify backend routes and authentication policies.

### Run Unit and Integration Tests:
```bash
python -m unittest discover tests
```

---

## ⚙️ Makefile Commands
For convenient automation, you can use the configured `Makefile`:

* **`make run`**: Activates local environment and runs both servers.
* **`make test`**: Runs the entire Python automated test suite.
* **`make clean`**: Deletes python cache directories (`__pycache__`) and test build footprints.
