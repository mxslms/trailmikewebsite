---
title: "Starting the edge AI journal"
description: "Why I’m building real-time vision on a Jetson, and what this journal will track."
pubDate: 2026-07-20
category: edge-ai
location: Home lab → Jetson
year: 2026
coverImage: /images/jetson/jetson-2026-06-19.webp
coverGradient: "linear-gradient(145deg, #142019 0%, #1e3d32 40%, #3d6b8a 75%, #7eb8b0 100%)"
tags:
  - jetson
  - yolov8
  - edge-ai
  - observability
---

The backpacking side of Trailmike is about places I have already walked. The edge AI side is about systems I am still building.

The near-term project is real-time object detection on an **NVIDIA Jetson Orin Nano** — YOLOv8 on a webcam feed, with metrics I can see from the homelab. Longer term I want that same kind of pipeline aimed at wildlife, not only lab demos.

I started development on a home GPU box, then moved the deploy target to the Jetson once the board was ready. The notes here follow that path.

## What this journal will cover

- Getting inference reliable on Jetson (JetPack, containers, thermal reality)
- Detection quality vs. latency tradeoffs
- Observability: Prometheus metrics, Grafana, knowing when the pipeline is lying
- Lessons that transfer from a desk webcam toward outdoor use

The first adventure post — [Iceland 2025](/posts/iceland-2025) — is live. The first real Jetson write-up is here: [Jetson Orin Nano — flashing, shipping containers to the edge](/posts/jetson-orin-nano-edge-ai).
