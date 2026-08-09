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

Trivy already runs daily on both hosts via a systemd timer, scanning every currently-running image for HIGH and CRITICAL vulnerabilities. It writes results to node-exporter’s textfile collector — the same mechanism the [Patch Status](/posts/monitoring-homelab-server-to-edge) side of the stack uses for its metrics. Two metrics come out of it:

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

1009 combined CRITICAL/HIGH findings across the stack on first run. Most of it is normal — actively maintained images like Grafana, Loki, Promtail, cloudflared, and Portainer all came back at 0 CRITICAL. The standout was `uptime-kuma:1.23.17` at 12 CRITICAL, which points to a stale pinned version rather than an unfixable upstream issue. `cadvisor` and `dcgm-exporter` also showed CRITICAL findings, though both are images that tend to lag on rebuilding for base-OS CVEs regardless of tag.

The realistic bar here isn’t zero. Some findings will always exist because upstream hasn’t shipped a fix yet. What matters is visibility — you can now see when an image is actually behind versus when it’s just carrying unfixable noise, and act on the difference instead of guessing.

## Where this leaves the security work

Combined with the Patch Status dashboard, the homelab now has:

- OS and dependency patching, auto-applied for security updates, tracked per host
- Container image vulnerability scanning, per image, per severity
- Alerting wired to all of it — already caught one real incident
- Scheduled reboots with post-boot validation

That closes out the security phase of this project. Next: back to the actual point — the edge AI pipeline.
