---
title: "Monitoring my homelab: server to edge"
description: "Observability across the homelab server and Jetson — Tailscale access, Git-deployed monitoring, and Grafana dashboards for GPU and the vision app."
pubDate: 2026-08-04
category: edge-ai
location: Homelab · server to edge
year: 2026
featured: true
coverImage: /images/homelab-monitoring/image1.webp
coverGradient: "linear-gradient(145deg, #142019 0%, #1e3d32 40%, #3d6b8a 75%, #7eb8b0 100%)"
tags:
  - grafana
  - jetson
  - observability
  - tailscale
  - portainer
  - prometheus
---

I run a homelab server (hosting + monitoring) and an NVIDIA Jetson for edge AI. I wanted solid observability on both — private access, an as-code deploy path, and dashboards that match how each machine actually reports GPU data. The laptop stays on the Tailscale mesh; the dashboards below are the server and Jetson.

## Security first

Both nodes sit on a Tailscale mesh, so nothing is exposed to the public internet. Per-device ACLs keep the edge node contained: if the Jetson is ever compromised, it can’t reach the rest of the lab.

## The Jetson’s kernel made me work for it

The Tegra kernel ships without several standard netfilter modules, which broke Tailscale’s kernel mode, UFW, and stateful firewalling in turn. I ran Tailscale in userspace-netfilter-off mode and hand-wrote a stateless nftables ruleset to route around what the kernel didn’t support.

## Deploy pipeline

Everything deploys through Portainer from Git. I split infrastructure and application code into separate repos, so config changes stop triggering long image builds. Even the edge device’s bootstrap is defined as code.

## Dashboards

Custom Grafana dashboards, provisioned from Git, filtered by device. The server’s discrete GPU and the Jetson’s integrated GPU report through different exporters (**DCGM** on the server, **jtop** on the Jetson), so each got its own dashboard. Adding another machine later means it just shows up in the dropdown.

![Jetson GPU dashboard: utilization, clock, temps, power, and AI-engine activity. Threshold lines flag thermal limits at a glance.](/images/homelab-monitoring/image1.webp)

*Jetson GPU dashboard: utilization, clock, temps, power, and AI-engine activity. Threshold lines flag thermal limits at a glance.*

![Infra Health, filtered by device — server and Jetson overlaid on one view.](/images/homelab-monitoring/image2.webp)

*Infra Health, filtered by device — server and Jetson overlaid on one view.*

![Server GPU (RTX 3070) via DCGM: utilization, clock, temperature, power, and VRAM.](/images/homelab-monitoring/image3.webp)

*Server GPU (RTX 3070) via DCGM: utilization, clock, temperature, power, and VRAM.*

![Vision app metrics: inference latency, throughput, detected classes, and model confidence.](/images/homelab-monitoring/image4.webp)

*Vision app metrics: inference latency, throughput, detected classes, and model confidence.*

## What the dashboards showed immediately

Within an hour of going live, they showed the vision pipeline decoding frames on the CPU instead of the Jetson’s hardware decoder, and running inference on the GPU with the deep-learning accelerator sitting idle. That gave real before-and-after numbers for the next optimization pass instead of guessing.
