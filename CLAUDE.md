## ⚠️ This repository is PUBLIC

Everything committed here is world-readable and effectively permanent.
Undoing a mistake needs a history rewrite plus a force-push, and GitHub can
still serve orphaned commits by SHA afterward until it garbage-collects.
Treat "don't commit it" as the only reliable control.

### Never commit

- **WiFi identifiers — SSIDs and BSSIDs / access-point MAC addresses.**
  AP MACs are indexed by WiGLE, Google and Apple location services, so
  publishing one alongside an SSID geolocates the building. This actually
  happened on 2026-08-16 (WiFi debugging notes pasted into a runbook) and
  needed a full history rewrite.
- Any other MAC address, device serial, or hardware identifier.
- Credentials of any kind: GitHub PATs, GHCR tokens, Cloudflare tunnel
  tokens, API keys, passwords, private keys. Use a gitignored `.env` plus a
  committed `.env.example` with empty values.
- Public IP addresses.
- Images containing GPS/EXIF metadata.
- Personal identifiers: home address, full legal names, phone numbers.

### Safe to commit

- Tailnet IPs (`100.64.0.0/10`) — not routable off the tailnet and gated by
  Tailscale auth.
- RFC1918 LAN IPs (`192.168.x`, `10.x`), hostnames, usernames.
- `${VAR}` placeholders and `secrets.*` references.

### Writing up real incidents

Debug output is the main source of leaks here: values that are unremarkable
in a terminal are not safe in a public repo. When documenting a real
failure, replace identifiers with roles — `<AP1-5GHZ>`, `<SSID>` — instead
of pasting raw log lines. Scripts must never hardcode a network name;
detect it at runtime.

**Before every commit, scan the diff for the items above. When unsure
whether something is sensitive, ask instead of committing.**

## Repo specifics

Astro photo/blog site, served through a Cloudflare tunnel.

- **Strip EXIF from every image before committing.** Trip photos carry GPS
  coordinates by default; that is home/travel location data in a public
  repo, and history rewrites are the only way to remove it afterward.
- The Cloudflare tunnel token belongs in a gitignored `.env`
  (`CLOUDFLARE_TUNNEL_TOKEN`), never in `docker-compose.yml`. It was
  committed once and required a history scrub.
