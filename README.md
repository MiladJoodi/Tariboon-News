# تریبون — Tariboon News Portal

A production-grade Persian news platform built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. Fully RTL, dark mode ready, with a complete admin panel.

---

## Overview

Tariboon (تریبون) is a fully-featured Persian news portal with 50 articles, 8 authors, 12 categories, and a real-time admin panel — all statically generated with no backend required. It demonstrates RTL layout mastery, modern Next.js App Router patterns, and polished UI/UX for the Persian web.

---

### Pictures:
![](pictures/01.png)
![](pictures/02.png)
![](pictures/03.png)
![](pictures/04.png)
![](pictures/05.png)
![](pictures/06.png)
![](pictures/07.png)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| State Management | Zustand 5 |
| Forms & Validation | React Hook Form + Zod |
| Icons | Lucide React |
| Notifications | Sonner |
| Charts | Recharts |
| Font | Vazirmatn (Google Fonts) |
| Analytics | Vercel Analytics |

---

## Features

### Public Site

- **Home** — news slider, thumbnails, editor picks, category boxes, gallery marquee
- **Live feed** — `/live` auto-updating news stream
- **Live markets** — `/markets` currency, gold, and crypto dashboard
- **Article Page** — reading progress, likes, bookmarks, font size, print, share, tags, related articles, comments
- **Command Search** — quick search with `Ctrl/Cmd + K`
- **Bookmarks** — save articles locally in the browser
- **Newsletter** — email signup persisted in localStorage
- **Trending / Authors / Privacy** — dedicated pages
- **Category Pages** — filtered articles with sort options and pagination
- **Search** — full-text search across titles, excerpts, authors, and tags
- **Archive** — full article list with multi-filter (category, sort, date)
- **Author Profiles** — bio, avatar, article history
- **Tag Pages** — grouped articles by tag
- **About & Contact** — team display, contact form with toast feedback

### Admin Panel (`/admin`)

- **Dashboard** — stats cards, recent articles, pending comments
- **Articles** — full CRUD: create, edit, delete, search, filter by status and category
- **Comments** — moderation queue with approve/reject/delete
- **Categories & Tags** — add, edit, delete
- **Authors** — view and edit author profiles
- **Settings** — site configuration fields
- **Persistence** — admin changes saved to localStorage + one-click reset to seed data

### Design & UX

- Full **RTL** layout with Persian locale (`fa-IR`)
- Soft rose + teal palette, **Lalezar** display + **Vazirmatn** body
- **Dark / Light mode** with `next-themes`
- Article imagery via picsum seeds with SafeImage fallback
- Market ticker in header, breaking news strip, sticky main nav
- Fully **responsive** — mobile, tablet, desktop

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/MiladJoodi/Tariboon-News.git
cd Tariboon-News

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
Admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Author

**Milad Joodi**
[linkedin.com/in/joodi](https://www.linkedin.com/in/joodi/) · [github.com/MiladJoodi](https://github.com/MiladJoodi)
