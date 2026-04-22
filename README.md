# DEFRAG

## Status

This repository is production-ready pending environment configuration in Vercel.

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

## Production Deploy Checklist

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

### Required Vercel Environment Variables

- DATABASE_URL (PostgreSQL)
- NEXT_PUBLIC_APP_URL
- OPENAI_API_KEY
- ADMIN_PASSPHRASE
- ENABLE_STRIPE_MOCK_WEBHOOK=false

---

## Production Safety Notes

- Stripe mock routes are disabled in production via environment flags.
- All analysis routes are server-validated via Zod schemas.
- No client-side mutation of canonical state is trusted.