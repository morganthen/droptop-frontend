# Droptop - Frontend

The React frontend for Droptop, a bookmark manager. This is a learning project focused on connecting a React app to a custom Express backend - an area I had not worked in before, having only used Next.js with Supabase server actions previously.

> Inspired by [Raindrop.io](https://raindrop.io). Built from scratch.

---

## What I learned building this

Coming from Next.js, the frontend/backend split was new territory. Next.js abstracts a lot of this away. Building it manually taught me what was actually happening.

Key concepts I worked through:

- Connecting a React app to a separate Express API
- Why CORS exists and how to handle it
- Storing and sending JWT tokens from the client
- Building protected and public routes with React Router
- Managing state across parent and child components with callbacks
- Fetching data on load with `useEffect` and optional query params
- Inline editing patterns in React
- Abstracting API calls into a dedicated `api/` layer

---

## Tech Stack

- **Framework:** React + Vite
- **Language:** TypeScript
- **Routing:** React Router
- **Styling:** Tailwind CSS + shadcn/ui
- **HTTP:** Native fetch API

---

## Features

- Register and login with JWT auth
- Save bookmarks with title, description, URL, image URL, and tags
- Filter bookmarks by tag
- Edit bookmarks inline
- Delete bookmarks
- Protected routes - unauthenticated users are redirected to login
- Public routes - logged in users are redirected away from login/register

---

## Running Locally

This app requires the [droptop-backend](https://github.com/yourusername/droptop-backend) to be running first.

```bash
git clone https://github.com/yourusername/droptop-frontend
cd droptop-frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`

---

## Project Status

Work in progress. Core functionality is complete. Planned improvements:

- [ ] Better error handling and loading states
- [ ] Drag to reorder bookmarks
- [ ] Collections/folders
- [ ] Full parity with Raindrop.io features
