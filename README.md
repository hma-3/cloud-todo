# Cloud ToDo API + Web Client

Full-stack MVP with a Vue client, Node/Express API, PostgreSQL, and Docker for local development.

## Local run (Docker Compose + Vite)

1. Start API + DB:

```bash
docker compose up --build -d
docker compose ps
```

Optional host-port overrides (fallback if defaults are busy):

```bash
API_HOST_PORT=3002 DB_HOST_PORT=55433 docker compose up --build -d
```

2. Start web in a separate terminal:

```bash
cd web
cp .env.example .env
npm install
npm run dev
```

3. URLs:
- Web (local): `http://localhost:5173`
- API (local): `http://localhost:${API_HOST_PORT:-3001}`
- Health: `http://localhost:${API_HOST_PORT:-3001}/health`

## Environment variables

### API (`api/.env`)
- `DATABASE_URL` - PostgreSQL connection string
- `CORS_ORIGIN` - allowed frontend origin
- `PORT` - API port inside container/runtime
- `API_KEY` - required for write endpoints (`POST/PUT/PATCH/DELETE`)

### Web (`web/.env`)
- `VITE_API_BASE_URL` - API base URL
- `VITE_API_KEY` - API key used by UI for write operations

## Migrations

From `api` directory:

```bash
npm run prisma:generate
npm run prisma:migrate
```

For production deploy:

```bash
npm run prisma:deploy
```

## API contract

- Base path: `/api/tasks`
- OpenAPI: [`api/openapi.yaml`](api/openapi.yaml)
- Error format:

```json
{
  "code": "VALIDATION_ERROR",
  "message": "Invalid request.",
  "details": []
}
```

## Notes

- This repository is currently configured for local development only.
- Automatic CI/CD and deploy workflows were removed.
