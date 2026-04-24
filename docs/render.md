# Render deployment

This repository can be deployed to Render as a Node web service using the root `render.yaml` blueprint.

## Blueprint

`render.yaml` defines one web service:

- Runtime: Node
- Build command: `npm install && npm run render:build`
- Start command: `npm run render:start`
- Health check path: `/`

The Render-specific npm scripts are defined in `package.json`:

```bash
npm run render:build
npm run render:start
```

## Required Render environment variables

Set these in the Render dashboard. Do not commit real values.

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma. |
| `NEXT_PUBLIC_APP_URL` | Yes | Public Render URL, for example `https://shuffle-the-deck.onrender.com`. |
| `ADMIN_PASSPHRASE` | Yes | Admin access passphrase. |
| `ENABLE_STRIPE_MOCK_WEBHOOK` | Yes | Keep set to `false` in production. |
| `NODE_VERSION` | Yes | Set by the blueprint to `20`. |

If future runtime AI features need provider credentials, add those secrets in Render's dashboard rather than committing them.

## Database setup

`npm run render:build` runs `prisma generate` before `next build`.

For the first deploy, or after Prisma schema changes, apply the schema to the Render database from a controlled shell or Render one-off job:

```bash
npm run prisma:push
```

Use destructive flags only when you intentionally accept data loss.

## Product constraints

Render deployment must preserve the SHUFFLE operating constraints:

- Keep the app card-model-first.
- Treat canonical server data as the source of truth.
- Keep deterministic runtime behavior where product meaning depends on canonical objects.
- Do not add runtime bespoke image generation to the critical loop.
- Keep public product copy grounded and non-mystical.
- Do not commit secrets, generated environment files, or provider keys.
