# Production Deployment Guide

This document describes how to deploy the **Mystery Lab** application to production environments. We support containerized hosting (Docker), Infrastructure-as-Code (Render), and serverless monorepos (Vercel).

---

## ⚡ Vercel Deployment (Vite + Serverless Python)

Vercel is our primary hosting environment. It deploys both your static Vite frontend and your FastAPI backend under a single unified domain using serverless Python functions.

### How it Works:
* **Frontend**: Vercel compiles the Vite project and hosts the static content directly on its global CDN.
* **Backend**: Vercel detects [api/index.py](file:///Users/legend27648/agy-cli-projects/Mystery-Lab/api/index.py) and deploys it as a Serverless Python Function. 
* **Routing**: The [vercel.json](file:///Users/legend27648/agy-cli-projects/Mystery-Lab/vercel.json) rewrite rules map all requests starting with `/api/*` to the serverless function. Other requests default to the React SPA index page. The ASGI entrypoint automatically strips the `/api` prefix, allowing FastAPI to resolve normal paths (e.g. mapping `/api/contact/` to `/contact/`).

### Step-by-Step Vercel Setup:
1. Link your GitHub repository to Vercel.
2. Select **Vite** as the Framework Preset. Set the Root Directory to `./`, Build Command to `npm run build`, and Output Directory to `dist`.
3. Add the required environment variables in the Vercel Dashboard settings:
   * `SUPABASE_URL`
   * `SUPABASE_KEY`
   * `VITE_SUPABASE_URL`
   * `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**. Vercel will automatically trigger a new deployment whenever you push commits to the `main` branch.

---

## ☁️ Render Deployment (Infrastructure-as-Code)

We include a [render.yaml](file:///Users/legend27648/agy-cli-projects/Mystery-Lab/render.yaml) configuration to allow deploying the FastAPI backend as a persistent web service on Render.

### How it Works:
* **Service Type**: Python Web Service.
* **Build Command**: `pip install -r requirements.txt`
* **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
* **Environment Variables**: Reads credentials (`SUPABASE_URL`, `SUPABASE_KEY`) from Render's secure vault environment.

To deploy on Render, simply import your repository and click **Deploy** using the blueprint file.

---

## 🐳 Containerized Deployment (Docker)

If you prefer to host the backend on AWS ECS, GCP Cloud Run, or your own VPS, we provide a production-ready `Dockerfile`.

### Build and Run the Docker Image:
1. **Build the container**:
   ```bash
   docker build -t mystery-lab-backend .
   ```
2. **Run the container**:
   ```bash
   docker run -p 8000:8000 \
     -e SUPABASE_URL="https://your-project.supabase.co" \
     -e SUPABASE_KEY="your-key" \
     mystery-lab-backend
   ```
The container uses a clean `python:3.12-slim` base image and exposes port 8000 to serve uvicorn.
