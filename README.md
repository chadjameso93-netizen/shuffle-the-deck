# DEFRAG

## Status

This repository is production-ready pending environment configuration in Render or Vercel.

---

Phase 0 — Host App Foundation bootstrapped.

This repository is built with:

- Next.js (App Router)
- TypeScript
- Prisma (PostgreSQL)
- Zod
- Vitest

## Next Steps

Run `npm install` and `npm run dev`.

---

## Render Deploy Checklist

This repository includes a root `render.yaml` blueprint for deploying the app as a Render Node web service.

Before deploying to Render, complete the following:

1. **Create or connect a PostgreSQL database**
   - Set `DATABASE_URL` in Render environment variables.
   - Use a valid PostgreSQL connection string.

2. **Set `NEXT_PUBLIC_APP_URL`**
   - Example: `https://shuffle-the-deck.onrender.com`

3. **Set `ADMIN_PASSPHRASE`**
   - Do not commit this value.

4. **Ensure `ENABLE_STRIPE_MOCK_WEBHOOK` is `false`**
   - The Render blueprint sets this to `false`.

5. **Build and start commands**
   - Build: `npm run render:build`
   - Start: `npm run render:start`

6. **Apply Prisma schema when needed**
   - First deployment or schema changes may require:

```bash
npm run prisma:push
```

See `docs/render.md` for the full Render setup notes.

---

## Vercel Production Deploy Checklist

Before deploying to Vercel Production, complete the following:

1. **Set `DATABASE_URL`** in Vercel Production environment variables
   - Must be a valid PostgreSQL connection string
   - Example: `postgresql://user:password@host:5432/dbname`

2. **Set `NEXT_PUBLIC_APP_URL`** in Vercel Production environment variables
   - Example: `https://your-project.vercel.app`

3. **Ensure `ENABLE_STRIPE_MOCK_WEBHOOK`** is absent or set to `false` in Production

4. **Run the following commands** (locally or via Vercel build hooks):

```bash
npx prisma generate
npx prisma db push --accept-data-loss
vercel --prod
```

> **Note:** `prisma generate` runs automatically during `npm run build` via the build script.
> You only need to run `prisma db push` manually the first time or after schema changes.

### Required Production Environment Variables

- DATABASE_URL (PostgreSQL)
- NEXT_PUBLIC_APP_URL
- ADMIN_PASSPHRASE
- ENABLE_STRIPE_MOCK_WEBHOOK=false

If runtime AI provider features are enabled in the future, add provider keys as deployment-platform secrets. Do not commit them to the repository.

---

## Production Safety Notes

- Stripe mock routes are disabled in production via environment flags.
- All analysis routes are server-validated via Zod schemas.
- No client-side mutation of canonical state is trusted.
- Deployment changes should preserve the SHUFFLE product constraints: card-model-first surfaces, canonical objects as source of truth, deterministic runtime behavior where required, and grounded non-mystical product language.