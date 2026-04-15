# Bom Mentiroso — Frontend

React + TypeScript + Tailwind CSS front end for the Bom Mentiroso gameshow app.

## Local development

```bash
npm install
npm start          # runs on http://localhost:3000
```

The app connects to the backend via `REACT_APP_BACKEND_URL` (defaults to `http://localhost:2999` in development).

## Deploy to Vercel

### Prerequisites

- A running backend deployment (the backend uses WebSockets via Socket.IO — it **cannot** run on Vercel serverless functions; deploy it to Railway, Render, or Fly.io first).
- A Vercel account.

### Steps

#### Option A — Vercel CLI

```bash
npm install -g vercel

# From this directory (frontend/bom-mentiroso-app):
vercel
```

When prompted:

| Prompt | Answer |
|---|---|
| Set up and deploy? | `Y` |
| Which scope? | your account |
| Link to existing project? | `N` (first time) |
| Project name | `bom-mentiroso-app` (or any name) |
| In which directory is your code? | `.` (current directory) |
| Want to override the settings? | `N` |

Vercel auto-detects Create React App and sets:

- **Build command**: `npm run build`  
- **Output directory**: `build`  
- **Install command**: `npm install`

#### Option B — Vercel Dashboard (no CLI)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project**.
3. Import the GitHub repo.
4. Set the **Root Directory** to `frontend/bom-mentiroso-app` (since this is a monorepo).
5. Framework preset will auto-detect **Create React App**.
6. Click **Deploy**.

### Environment variable

After the initial deploy, set the backend URL in Vercel:

1. **Vercel Dashboard** → your project → **Settings** → **Environment Variables**.
2. Add:

   | Name | Value |
   |---|---|
   | `REACT_APP_BACKEND_URL` | `https://your-backend-url.com` |

3. **Redeploy** the project for the variable to take effect (Vercel Dashboard → **Deployments** → **Redeploy**, or run `vercel --prod` again).

> **Note**: `REACT_APP_*` variables are baked into the static bundle at build time by Create React App. They are **not** secret — do not put sensitive values in them.

### Production deploy (after setup)

```bash
vercel --prod
```

This builds and promotes the deployment to your production URL.

---

## Project structure

```
src/
  App.tsx                  # role selection (participant / presenter / spectator)
  AppContent.tsx           # game state router
  contexts/
    GameContext.tsx         # Socket.IO connection + all game state
  pages/                   # one file per screen
  components/
    shared/                # Button, Card, Timer, Avatar, HotSeatProgressBar
    RulesModal.tsx          # 7-step rules tutorial modal
  styles/
    index.css              # Tailwind base + dark theme base styles
tailwind.config.js         # custom design tokens (surface, bg, border, accent)
.env.development           # REACT_APP_BACKEND_URL=http://localhost:2999
.env.production            # REACT_APP_BACKEND_URL=https://your-production-backend-url.com
```

## Environment variables

| Variable | Description | Default |
|---|---|---|
| `REACT_APP_BACKEND_URL` | Full URL of the backend Socket.IO server | `http://localhost:2999` |
