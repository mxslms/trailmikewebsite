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
# Put the Cloudflare tunnel token in .env as CLOUDFLARE_TUNNEL_TOKEN=...

docker network create web-network 2>/dev/null || true
docker compose up -d --build
docker compose ps
docker logs cloudflare-tunnel --tail 50
```

Serves on host port **8085**. The Cloudflare tunnel companion publishes trailmike.com.

### Cloudflare Tunnel (Error 1033)

**1033 = `cloudflared` is not connected.** Almost always a missing/empty token after deploy.

1. On the host, ensure `.env` exists next to `docker-compose.yml` with a real token:
   ```bash
   # recover token from older commit if needed:
   git show f7a493e:docker-compose.yml | grep -oE 'eyJ[A-Za-z0-9._-]+'
   nano .env   # CLOUDFLARE_TUNNEL_TOKEN=eyJ...
   ```
2. Recreate the stack:
   ```bash
   docker compose up -d --build --force-recreate
   docker logs -f cloudflare-tunnel
   ```
   Healthy logs mention connection registered / served via edge.
3. In Cloudflare Zero Trust → Networks → Tunnels, status should be **Healthy**.
4. Public hostname service should be `http://trailmike-web:80` (or `http://hello-world-web:80` — both resolve on the Docker network).

## Content philosophy

- Brand-first home page; adventures and edge AI as equal tracks
- Personal details stay light on purpose
- Photos and day-by-day route notes get added as you digitize them
