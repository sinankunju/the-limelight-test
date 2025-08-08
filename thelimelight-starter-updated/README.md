# The Limelight — Starter (Next.js + Prisma)

This repository is a **starter scaffold** for *The Limelight* magazine website (desktop-optimized), built with **Next.js**, **Prisma/Postgres**, and ready for integration with ProseMirror-based editor, Supabase/S3 storage and Gmail email sending.

> ⚠️ This is a scaffold. It includes data models, API templates, and admin UI placeholders. You will need to `npm install` and complete environment variables and provider setups (Gmail OAuth, Supabase or S3, Vercel) — instructions below.

---

## What's included
- Next.js app skeleton (pages + API routes)
- Prisma schema (Postgres models for articles, litgarden_submissions, comments, media, users)
- Admin UI placeholders (single-admin flows)
- API templates for articles & litgarden submissions
- README with setup & deployment checklist

---

## Quick start (local)

1. Copy `.env.example` to `.env` and fill in values (Postgres connection, NEXTAUTH_SECRET, GMAIL_* etc).
2. Install dependencies:
```bash
npm install
```
3. Generate Prisma client:
```bash
npx prisma generate
```
4. Run migrations (this will create DB tables):
```bash
npx prisma migrate dev --name init
```
5. Start dev server:
```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Key env variables (in `.env`)
- `DATABASE_URL` — Postgres connection string (required)
- `NEXTAUTH_SECRET` — random secret for NextAuth sessions
- `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `GMAIL_FROM` — for Nodemailer + Gmail OAuth
- `GA4_ID` — Google Analytics 4 measurement ID
- `STORAGE_PROVIDER` — "supabase" or "s3" (not fully wired in scaffold)

See `.env.example`.

---

## Deployment (Vercel)
1. Push repo to GitHub.
2. Create a Vercel project from the repo.
3. Add environment variables in Vercel dashboard (same names as `.env`).
4. Configure Postgres (Supabase/AWS RDS) and set `DATABASE_URL`.
5. Deploy — Vercel will build the Next app. Run `npx prisma migrate deploy` in your deployment pipeline or use GitHub Actions.

---

## Next steps (recommended)
- Integrate a ProseMirror-based editor (we recommend Remirror with ProseMirror core).
- Implement media uploads (Supabase Storage or AWS S3).
- Configure Gmail OAuth credentials and enable Gmail API in Google Cloud for reliable email sending.
- Add Google Analytics (GA4) in `_app.js` or `_document`.
- Implement authentication (NextAuth) with credentials or admin-only provider.
- Add client-side image validation (square thumbnails, ≤5MB) and optional crop UI.
- Add reCAPTCHA to submissions form and rate-limiting middleware.

---

If you want, I can now:
- generate the full **Prisma schema** (already included),
- create fully fleshed API route implementations (commented),
- integrate a working ProseMirror/Remirror editor component,
- or prepare GitHub Actions + Vercel deploy config.

Tell me which deeper deliverable to produce next (I'll generate it immediately).


## What's added by update
- Remirror editor integration (placeholder)
- NextAuth credential provider for single admin; set ADMIN_EMAIL and ADMIN_PASSWORD in env
- Supabase storage upload API and supabase client (set SUPABASE_URL and SUPABASE_KEY)
- Image cropper component for square thumbs
- Comments API and admin moderation UI
- GitHub Actions CI workflow for migrations and basic checks
