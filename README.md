# Snippr 
**Link: https://snippr-ten.vercel.app/**

Snippr is a full-stack snippet sharing app built with Next.js, TypeScript, and Supabase. It lets users browse popular code snippets, search by language or description, and submit new snippets for review.

## Features

- Browse featured and popular code snippets on the home page.
- Search snippets by language, title, or description.
- Submit new snippets through a client-side form.
- Store and retrieve snippet data through Supabase-backed API routes.
- Render code with syntax highlighting for a better reading experience.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Supabase
- Shiki for syntax highlighting
- Tailwind CSS for styling

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

Create a `.env.local` file in the project root and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

The server code also accepts `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE` as fallback names.

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint

## Project Structure

- `app/` - app routes, pages, and API handlers
- `components/` - reusable UI components
- `lib/` - Supabase, snippet, and highlighting helpers
- `types/` - shared TypeScript types

## API

- `GET /api/snippets` - returns verified snippets
- `POST /api/snippets` - creates a new snippet entry

## Notes

- Snippets are rendered with syntax highlighting using Shiki.
- New submissions are marked for review before being published.
