---
title: "Homelab security: patches, Trivy, and dashboards that stay honest"
description: "After the GPU dashboards: host patch status, container HIGH/CRITICAL scans with Trivy, and boot checks — on the server and the Jetson, without putting the lab on the public internet."
pubDate: 2026-08-09
category: edge-ai
location: Homelab · server to edge
year: 2026
featured: true
coverImage: /images/security-dash/security-cover.webp
coverGradient: "linear-gradient(145deg, #111217 0%, #1e3d32 45%, #3d6b8a 100%)"
tags:
  - security
  - trivy
  - grafana
  - jetson
  - observability
  - patching
---

The [monitoring post](/posts/monitoring-homelab-server-to-edge) covered GPUs, infra health, and the vision app. This one is the security layer on top of that stack: can I see patch debt, container risk, and “did this box come back clean after reboot?” for both the homelab server and the Jetson — without guessing, and without opening the lab to the public internet.

## What I wanted to see

Three questions, answered the same way on both machines:

1. Are **OS security updates** sitting unapplied?
2. Are **running containers** carrying HIGH/CRITICAL findings?
3. After a reboot, did the **important bits** actually come back?

Everything still lives on the Tailscale mesh. Grafana and Prometheus stay private. The public site only exits through the Cloudflare tunnel.

## Patch status

An hourly host script (not a container) asks apt what’s pending, whether unattended-upgrades is on, whether a reboot is required, and how fresh the last check was. On the Jetson it also records the current JetPack/L4T version so I’m not hunting through `dpkg` when something feels off.

Those numbers land in node-exporter’s textfile collector and show up on a **Patch Status** dashboard filtered by device.

![Security updates pending — server and Jetson](/images/security-dash/security-updates.webp)

*Security-update counts for both hosts. The goal is zero sitting around, with alerts if that slips.*

## Container security (Trivy)

Same pattern for images: a daily Trivy job scans whatever is actually running in `docker ps` — not a static allow-list that drifts the first time I deploy something new. It only records **HIGH** and **CRITICAL** so the dashboard stays about things I’d act on.

Scan age matters as much as the counts. A green number from three weeks ago is just nostalgia. Freshness panels make that obvious.

![Trivy scan freshness by device](/images/security-dash/trivy-freshness.webp)

*When each host last finished a Trivy pass — stale scans are a signal too.*

Base images and third-party containers will always light up something. The point of the panel isn’t a vanity zero; it’s knowing which running images moved, and whether CI already caught the app before it hit the Jetson.

## Boot validation

Weekly staggered reboots (Jetson first, server later) plus a post-boot check: containers up, Tailscale connected, firewall policy where it should be, GPU tools healthy on the server, monitoring targets back, public site reachable through the tunnel. Pass/fail becomes a metric. If a reboot “worked” but left something half-dead, the dashboard says so.

## Alerts that match the dashboards

Grafana unified alerting is provisioned from Git with the rest of the stack. The security-shaped rules are the boring ones that matter: security updates pending too long, reboot required too long, targets down, disk full, Jetson running hot, boot validation failed. Website reachability stays with Uptime Kuma — one job per tool.

## CI and the public site (related hardening)

On the app and infra repos: Dependabot, pinned actions/images where it counts, Bandit on the Python, Trivy in CI for the vision image. On this website: security headers (CSP, frame denial, nosniff, referrer policy), cloudflared pinned, and EXIF/XMP stripped from trip photos so the journal doesn’t ship GPS breadcrumbs.

None of that replaces the host dashboards. It just means fewer surprises before something lands on the edge node.

## What’s next

- Keep cutting HIGH/CRITICAL on images I actually own (the vision app and anything I pin)
- Tighten how long a “reboot required” state can sit before it pages
- Same security panels if another edge box joins the mesh

Observability without patch and vuln views was half a picture. This is the other half — still private, still as-code, still aimed at the Jetson as much as the server.
