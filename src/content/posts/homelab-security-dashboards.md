---
title: "Container Security dashboard"
description: "Trivy HIGH/CRITICAL scans across every running container on the homelab server and the Jetson — the last piece of the security phase before getting back to the edge AI pipeline."
pubDate: 2026-08-09
category: edge-ai
location: Homelab · server to edge
year: 2026
featured: true
coverImage: /images/security-dash/container-security.webp
coverGradient: "linear-gradient(145deg, #111217 0%, #1e3d32 45%, #3d6b8a 100%)"
tags:
  - security
  - trivy
  - grafana
  - jetson
  - observability
  - containers
---

Last piece of the homelab security work: a dashboard showing actual CVE exposure across every running container, on both the server and the Jetson.

## Setup

Trivy already runs daily on both hosts via a systemd timer, scanning every currently-running image for HIGH and CRITICAL vulnerabilities. It writes results to node-exporter’s textfile collector — the same mechanism the Patch Status dashboard uses for its metrics. Two metrics come out of it:

```
trivy_vulnerabilities_total{image="...", severity="HIGH"|"CRITICAL"}
trivy_last_scan_timestamp
```

The image list is re-derived from `docker ps` on every scan and the output file is fully overwritten each run, so a query only ever shows what’s currently running — nothing stale lingers. One caveat: since the scan is daily, the data can lag reality by up to 24 hours if something changed recently.

## The dashboard

Four panels:

- **Total CRITICAL + HIGH** across every image, both hosts
- **Per-image breakdown** — CRITICAL and HIGH count per image, color-coded
- **Currently scanned images** — what’s actually running
- **Scan freshness** — is the daily job still alive, same pattern as the Patch Status freshness panels

![Container Security dashboard — Trivy HIGH/CRITICAL across server and Jetson](/images/security-dash/container-security.webp)

*Container Security: totals, scan freshness, what’s running, and per-image CRITICAL/HIGH.*

![Patch Status dashboard — OS updates, reboot state, scan freshness](/images/security-dash/patch-status.webp)

*Patch Status sits beside it: security updates, pending packages, reboot required, auto-patching, freshness.*

## What it found

The biggest number on the board is my own image. `ghcr.io/mxslms/edge-ai-vision:jetson` lands at **21 CRITICAL** and **357 HIGH**. That’s the standout — a JetPack/CUDA base with a lot of surface area, not a forgotten side container. Owning that number is the point of the dashboard; hiding it next to a screenshot that shows it would be silly.

`gcr.io/cadvisor/cadvisor:v0.49.1` shows **5 CRITICAL** and **52 HIGH** on both the server and the Jetson. Fifty-two HIGH is a lot. I haven’t checked yet whether a newer tag clears any of that — so I’m not calling it unfixable upstream noise until I’ve looked.

Other images in the same scrape look healthier. `cloudflare/cloudflared:latest` is at **0 CRITICAL / 2 HIGH**. Grafana’s table splits CRITICAL and HIGH onto separate rows (empty cell ≠ a second count), which is easy to misread until you notice the severity columns.

The realistic bar still isn’t zero. Some findings will sit until upstream ships a fix. What matters is visibility — you can see when *your* image is the problem, when a pin is stale, and when you’re just carrying noise, instead of guessing.

## Where this leaves the security work

Combined with the Patch Status dashboard, the homelab now has:

- OS and dependency patching, auto-applied for security updates, tracked per host
- Container image vulnerability scanning, per image, per severity
- Alerting wired to all of it — already caught one real incident
- Scheduled reboots with post-boot validation

That closes out the security phase of this project. Next: back to the actual point — the edge AI pipeline.
