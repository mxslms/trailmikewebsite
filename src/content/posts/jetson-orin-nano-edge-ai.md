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

The goal is simple to say and annoying to do: run real-time vision **on the edge**, not only on the home GPU box. Same app idea on x86 and Jetson — different containers, shared code — with a path toward wildlife and fish detection in the field.

![Unboxing the Jetson Orin Nano Developer Kit](/images/jetson/jetson-2026-06-15.webp)

## Architecture that can survive a reboot

I didn’t want a one-off SSH snowflake. The Jetson stack is meant to come back after power loss and stay inspectable from the homelab.

- **Docker Compose** isolates the vision app and its dependencies  
- **systemd** starts the stack on boot and restarts it if it dies  
- **Dual platform** — primary x86 server and ARM64 edge node share the same project shape so I’m not maintaining two apps  

Pull a prebuilt image on the device. Don’t compile YOLO on a fan the size of a coaster if you can avoid it.

![Jetson Orin Nano going into its case with antennas and mounting hardware](/images/jetson/jetson-2026-06-19.webp)

## CI/CD: build in the cloud, pull on the edge

The Orin is great at inference. It is a bad place to be your build farm.

**GitHub Actions** builds the arm64 image (JetPack 6 base) and pushes to **GHCR**. Merges to `main` publish; PRs smoke-test. On the Jetson I pull `ghcr.io/...:jetson` and run compose — no local `docker build` tax when I’m iterating from the couch.

That split mattered: x86 CUDA wheels and Jetson L4T/JetPack CUDA are different worlds. One Dockerfile does not rule them all.

## Security without theater

Edge nodes sit on real networks. The boring stuff still counts:

- Keep the OS and app dependencies patched  
- Scan container images in CI before they ever land on the device  
- Prefer pull-from-registry over “build whatever is on the SD card tonight”

## Observability: if you can’t see it, it didn’t happen

Deploying inference is half the job. Knowing whether the pipeline is healthy is the other half.

- **Prometheus + Grafana** scrape and chart the useful bits  
- Jetson-oriented views for **GPU / thermal** reality (this board will remind you when it’s hot)  
- **Tailscale** carries telemetry back to the homelab so the edge node stays off the public internet  

I want latency, detections, and “is the camera even awake?” visible next to hardware metrics — not vibes.

## The first real hurdle: flashing the Orin Nano

Before any of the above, the board had to exist as a computer.

NVIDIA’s **SDK Manager** is picky about the *host* OS. My main server was on a newer Ubuntu than the JetPack version I needed would accept. SDK Manager refused to play.

Options I didn’t want: wipe the server OS, or spend a weekend on unsupported CLI gymnastics to dodge the GUI checks. Cleanest path: a bootable USB with an **older, officially supported Ubuntu**, boot the server from that live environment, and flash from there.

When the base image finally landed on the Jetson, it felt like clearing trail before the real hike starts. After that, the vision stack had somewhere to live.

## What’s next

- Keep hardening inference + metrics on-device  
- Validate field-shaped camera setups (not only a desk webcam)  
- Write up the dual-platform compose/CI details as the next build note  

If you’re staring at an SDK Manager host-OS wall: the thumb-drive detour is undignified and it works.
