# TradeMind AI MVP

A small Next.js + Supabase + OpenAI MVP for generating advertising copy.

## Features

- Landing page
- Supabase email/password authentication
- Dashboard
- 10 free AI credits per new user
- AI ad generation
- Saved advertisements
- Copy/download generated JSON
- Placeholder pricing page

## 1. Requirements

Install Node.js 20+ and Git.

## 2. Install

Open a terminal in this folder:

```bash
npm install
```

## 3. Create Supabase project

Create a project in Supabase.

Open the SQL Editor and run:

`supabase/schema.sql`

Then copy your project URL and anon/publishable key.

## 4. Create environment file

Copy `.env.example` to `.env.local` and fill in:

```text
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
OPENAI_API_KEY=...
```

Keep `OPENAI_API_KEY` server-side. Never put it in browser/client code.

## 5. Run locally

```bash
npm run dev
```

Open:

http://localhost:3000

Create an account, then open Create Ad.

## 6. OpenAI billing

The AI route uses the OpenAI API. API usage can cost money. Set a small usage budget/limit in your OpenAI account before testing at scale.

The model name is configured in:

`app/api/generate-ad/route.ts`

## 7. Deploy to Vercel

Push the project to GitHub.

Import the repository into Vercel.

Add these environment variables in Vercel:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- OPENAI_API_KEY

Deploy.

## 8. Production checklist

Before accepting real customers:

- Add a proper privacy policy and terms.
- Add abuse/content moderation.
- Add rate limiting.
- Add logging and error monitoring.
- Add Stripe only after validating demand.
- Add image/video generation only after validating demand.
- Add Google/Meta/YouTube publishing integrations only after the basic product works.
- Review advertising, privacy, consumer-protection, and platform/API requirements for your intended market.
- Do not promise financial returns or make unsupported medical/financial claims.

## Important

This is an MVP starter project, not production-ready financial or advertising software. It is intentionally small so you can validate the idea before spending substantial money.
