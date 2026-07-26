---
title: "Starting the edge AI journal"
description: "Before the Jetson lives in the field: why I’m building real-time vision at the edge, and what this journal will track."
pubDate: 2025-08-20
category: edge-ai
location: Home lab → Jetson
year: 2025
coverGradient: "linear-gradient(145deg, #142019 0%, #1e3d32 40%, #3d6b8a 75%, #7eb8b0 100%)"
tags:
  - jetson
  - yolov8
  - edge-ai
  - observability
---

The backpacking side of Trailmike is about places I have already walked. The edge AI side is about systems I am still building.

I want models that run **where the trail is** — not only in a cloud notebook. The near-term project is real-time object detection on an **NVIDIA Jetson Orin Nano**, with a path toward wildlife and fish detection. Same app on a home GPU box and on the Jetson; different containers, shared code.

## What this journal will cover

- Getting inference reliable on Jetson (JetPack, containers, thermal reality)
- Detection quality vs. latency tradeoffs in the field
- Observability: Prometheus metrics, Grafana, knowing when the pipeline is lying
- Lessons that transfer from lab webcam to outdoor deployment

## What it will not be

A hype feed. No “AI will change everything” posts. Just build notes: what worked, what broke, what I would do differently.

The first adventure post — [Iceland 2025](/posts/iceland-2025) — is live. The first real Jetson write-up is here: [Jetson Orin Nano — flashing, shipping containers to the edge](/posts/jetson-orin-nano-edge-ai).
