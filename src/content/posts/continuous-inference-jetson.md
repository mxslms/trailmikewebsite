---
title: "Continuous inference on the Jetson"
description: "Background capture + motion-gated YOLO, training-data dumps with retention, and metrics — so the camera works even when nobody is watching the stream."
pubDate: 2026-08-11
category: edge-ai
location: Homelab · Jetson Orin Nano
year: 2026
featured: true
coverGradient: "linear-gradient(145deg, #142019 0%, #1e3d32 40%, #3d6b8a 75%, #7eb8b0 100%)"
tags:
  - jetson
  - yolov8
  - edge-ai
  - observability
  - motion
---

Until tonight, inference only ran inside the `/video_feed` request handler. No browser connected → camera idle, model cold, nothing to learn from.

## Background loop

A dedicated thread now owns the camera and runs continuously, independent of HTTP traffic. The MJPEG stream still serves annotated frames when someone looks; it no longer *is* the pipeline.

## Motion gating

Running YOLO on every quiet frame wastes power. Motion gating uses frame differencing (not a PIR sensor — that’s still on the roadmap) so inference only runs during real activity, plus a short trailing window after motion stops. The live stream can still show a motion overlay so you can see the gate working.

## Capture for training

When something interesting enough shows up, the box writes training material to a dedicated captures directory on the Jetson host:

- full frames
- YOLO-format labels
- JSON metadata
- cropped detection regions

Captures are rate-limited and use a lower confidence floor than the live stream, so you keep borderline examples for later labeling without spamming the annotated feed. Retention runs in the same pass — day-count and byte-size caps — because an unbounded capture pipeline will fill a Jetson disk while you’re not looking.

## Metrics

New Prometheus series so this isn’t guesswork:

- `edge_frames_saved_total`
- `edge_capture_dir_bytes`
- `edge_motion_detected_total`
- a background-loop heartbeat

Walked past the camera after redeploy: motion fired, capture files landed, heartbeat advanced, overlay visible on the stream. Pipeline’s real. Grafana panels for these come next.

## Side quest: CI almost lied

Shipping this hit two CI footguns worth remembering. Trivy’s internal 5-minute timeout failed the job the same way an earlier systemd script had — the outer workflow looked fine until the scanner itself gave up. Separately, a GitHub Actions path filter skipped the Jetson build on the first push because the change set didn’t match what the filter expected. Fixed with a small legitimate app change and `workflow_dispatch` for next time. Lesson: green checks aren’t enough if the job you care about never ran.

## What’s next

Tighten the capture gates, start using the saved set for wildlife-oriented training, and keep an eye on disk via the capture-size metric. Continuous inference was the missing piece between “demo when I’m watching” and “edge box that works overnight.”
