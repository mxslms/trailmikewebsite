# Trailmike

Personal journal site for **trailmike.com** — backpacking adventures and an edge AI build log.

No social feeds. Trip notes and working systems.

## Stack

| Choice | Why |
| --- | --- |
| **[Astro](https://astro.build)** | Static HTML, excellent Markdown blog DX, fast by default |
| **Content collections** | Typed frontmatter for adventures + edge-AI posts |
| **Custom “glacier trail” theme** | Spruce / ice / trail-marker palette — not a stock template |
| **Docker + nginx + Cloudflare tunnel** | Matches the existing homelab GitOps path |

## Site map

- `/` — brand hero, latest journal, two tracks
- `/adventures` — trip catalog (Iceland live; others stubbed)
- `/edge-ai` — Jetson / vision build journal
- `/posts` — full feed
- `/about` — short, privacy-light bio

### Planned trip write-ups

| Year | Trip | Status |
| --- | --- | --- |
| 2025 | Iceland | Published |
| 2024 | Glacier NP (MT) | Coming soon |
| 2018 | Glacier NP | Coming soon |
| 2017 | Olympic NP | Coming soon |
| 2016 | Tetons & Yellowstone | Coming soon |
| 2014 | Bryce / Grand Canyon / Zion | Coming soon |
| 2013 | Glacier NP | Coming soon |

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

New posts live in `src/content/posts/`. Drop photos in `public/images/` (see README there).

### Frontmatter

```yaml
---
title: "Trip title"
description: "One-line summary"
pubDate: 2025-08-12
category: adventure   # or edge-ai
location: Iceland
year: 2025
featured: true
coverGradient: "linear-gradient(...)"
tags: [iceland, backpacking]
draft: false
---
```

## Deploy

```bash
cp .env.example .env
# set CLOUDFLARE_TUNNEL_TOKEN in .env

docker compose build
docker compose up -d
```

Serves on host port **8085**. The Cloudflare tunnel companion publishes trailmike.com.

> **Note:** The tunnel token used to live in `docker-compose.yml`. It now reads from `.env` (`CLOUDFLARE_TUNNEL_TOKEN`). Put the existing token there on the host before redeploying.

## Content philosophy

- Brand-first home page; adventures and edge AI as equal tracks
- Personal details stay light on purpose
- Photos and day-by-day route notes get added as you digitize them
