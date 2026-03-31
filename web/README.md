# Web Client (Vue 3 + Vite)

Frontend for the Cloud ToDo app.

## Prerequisites

- API must be running first (recommended via root `docker compose`).
- Node.js 20+.

## Setup

From this `web` directory:

```bash
cp .env.example .env
npm install
npm run dev
```

Default local URL:
- `http://localhost:5173`

## Environment variables

`web/.env`:

- `VITE_API_BASE_URL` - backend base URL (default: `http://localhost:3001`)
- `VITE_API_KEY` - API key used for write operations (`POST/PUT/PATCH/DELETE`)

## Build

```bash
npm run build
npm run preview
```

## Common issue

If you see connection errors in browser:

- Make sure API is up (`docker compose ps` in repository root).
- Ensure `VITE_API_BASE_URL` points to `http://localhost:3001` (or your custom API host port).
- Restart Vite after any `.env` change.
