---
title: "Jetson Orin Nano — flashing, shipping containers to the edge"
description: "Bringing up an NVIDIA Jetson Orin Nano for real-time vision: the SDK Manager thumb-drive saga, Docker + systemd on ARM64, GHCR builds, and monitoring over Tailscale."
pubDate: 2026-07-26
category: edge-ai
location: Homelab · Jetson Orin Nano
year: 2026
featured: true
coverImage: /images/jetson/jetson-2026-06-15.webp
coverGradient: "linear-gradient(145deg, #142019 0%, #1e3d32 40%, #3d6b8a 75%, #7eb8b0 100%)"
tags:
  - jetson
  - orin-nano
  - edge-ai
  - docker
  - github-actions
  - observability
---

**Hardware:** NVIDIA Jetson Orin Nano (ARM64)  
**Stack:** Docker Compose, systemd, GitHub Actions, GHCR, Tailscale, Prometheus, Grafana

Goal: run real-time vision on the Jetson, not only on a desktop GPU. I prototyped on a home RTX box, then made the Orin Nano the deploy target. Wildlife detection is the longer application; right now it’s a webcam through YOLOv8 with an annotated stream and Prometheus metrics.

![Unboxing the Jetson Orin Nano Developer Kit](/images/jetson/jetson-2026-06-15.webp)

## Architecture that survives a reboot

I wanted the stack to come back after power loss and stay inspectable from the homelab — not a one-off SSH session that dies when the laptop sleeps.

- **Docker Compose** isolates the vision app and its dependencies  
- **systemd** starts the stack on boot and restarts it if it dies  
- **Pull a prebuilt image** on the device — don’t compile YOLO on the board if you can avoid it  

![Jetson Orin Nano going into its case with antennas and mounting hardware](/images/jetson/jetson-2026-06-19.webp)

## CI/CD: build in the cloud, pull on the edge

The Orin is good at inference. It is a bad place to be your build farm.

**GitHub Actions** builds the arm64 image (JetPack 6 base) on GitHub’s arm64 runners, runs a smoke check, and pushes to **GHCR** on merges to `main`. On the Jetson I pull `ghcr.io/...:jetson` and run compose — no local `docker build` tax when I’m iterating from the couch.

That split mattered early on: x86 CUDA wheels and Jetson L4T/JetPack CUDA are different worlds. One Dockerfile does not cover both. The amd64 path was useful for development; the published image for the device is the Jetson tag.

## Security basics

Edge nodes sit on real networks. The boring stuff still counts:

- Keep the OS and app dependencies patched  
- Lint and static-check the Python in CI (flake8 + Bandit) before images ship  
- Prefer pull-from-registry over “build whatever is on the SD card tonight”

## Observability

Deploying inference is half the job. Knowing whether the pipeline is healthy is the other half.

- **Prometheus + Grafana** scrape and chart app metrics (latency, detections, camera health)  
- Host-side Jetson GPU / thermal views via the homelab monitoring stack  
- **Tailscale** carries telemetry back so the edge node stays off the public internet  

I want latency, detections, and “is the camera even awake?” next to hardware metrics — not guesswork.

## The first real hurdle: flashing the Orin Nano

Before any of the above, the board had to exist as a computer.

NVIDIA’s **SDK Manager** is picky about the *host* OS. My main server was on a newer Ubuntu than the JetPack version I needed would accept. SDK Manager refused to play.

Options I didn’t want: wipe the server OS, or spend a weekend on unsupported CLI gymnastics to dodge the GUI checks. Cleanest path: a bootable USB with an **older, officially supported Ubuntu**, boot the server from that live environment, and flash from there.

When the base image finally landed on the Jetson, the vision stack finally had somewhere to live.

## What’s next

- Keep hardening inference + metrics on-device  
- Validate field-shaped camera setups (not only a desk webcam)  
- Move from general COCO classes toward wildlife-oriented detection  

If you’re staring at an SDK Manager host-OS wall: the thumb-drive detour is undignified and it works.
