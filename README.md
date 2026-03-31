# Cloud ToDo API + Web Client

Full-stack MVP with a Vue client, Node/Express API, PostgreSQL, Docker runtime, and AWS Terraform stack.

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
cp .env.dist .env
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

## AWS deploy outputs

Terraform in `infra/terraform` provisions:
- App Runner backend
- RDS PostgreSQL
- Secrets Manager secret for `DATABASE_URL`
- S3 bucket for frontend assets
- CloudFront distribution for frontend delivery

After apply, use outputs:
- `apprunner_service_url` (API URL)
- `frontend_cloudfront_domain` (frontend URL)
- `frontend_bucket_name`
- `frontend_cloudfront_distribution_id`

## CI/CD

- CI: lint + format check + tests + build (`.github/workflows/ci.yml`)
- Deploy (main): build image, push to ECR, trigger App Runner, upload web to S3, invalidate CloudFront (`.github/workflows/deploy.yml`)
