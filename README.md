# Guelph Gym Live Counter

**A real-time occupancy system for the University of Guelph Fit & Rec gym, built as a portfolio project.**

Students at Guelph often walk into a crowded gym, wait for machines, and leave without finishing their workout. Google Maps' "popular times" is stale and inaccurate. This project solves that with a live, real-time counter fed by RFID scans at the gym entrance — and a redesigned Fit & Rec website that surfaces it on the homepage.

> **Status:** Active development. Not affiliated with the University of Guelph. Portfolio project only.

---

## What it does

- **Live occupancy counter** on the homepage — updates in real time as members scan in/out
- **Capacity indicator** — green / orange / red status face tells you at a glance if it's a good time to go
- **Daily average visit time** — plan around when the crowd will thin out
- **Front-desk view** — real-time scan feed with member photo + profile popup
- **Modern redesigned Fit & Rec website** — same real content, cleaner IA, faster, mobile-first

## Architecture

```
┌──────────────────┐    Wi-Fi     ┌────────────────────┐    Postgres    ┌──────────────┐
│  ESP32 + PN532   │  HTTPS POST  │  Next.js API       │  Prisma ORM    │  Neon Cloud  │
│  (turnstile)     │ ───────────► │  /api/scan         │ ─────────────► │  PostgreSQL  │
│  + TFT + Servo   │              │                    │                │              │
└──────────────────┘              │  /api/occupancy    │                └──────────────┘
                                  │  (SSE stream)      │
                                  └────────┬───────────┘
                                           │
                                           ▼
                                  ┌────────────────────┐
                                  │  Homepage widget   │
                                  │  (React, live)     │
                                  └────────────────────┘
```

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js Route Handlers, Server-Sent Events |
| Database | PostgreSQL (Neon Cloud) via Prisma ORM |
| Firmware | ESP32 (Arduino framework), PN532 (I²C), ILI9341 TFT (SPI), SG90 servo |
| Deploy | Vercel-ready (`vercel.json`) |

## Repo layout

```
guelph-gym-live-counter/
├── web/          Next.js app (frontend + API)
├── firmware/     ESP32 code (PN532 + TFT + servo + Wi-Fi POST)
├── hardware/     Wiring diagrams, BOM, photos
├── docs/         Architecture, pitch deck, screenshots
└── scripts/      Utility scripts (seed data, mock scans, etc.)
```

## Running locally

```bash
# 1. Clone
git clone https://github.com/xburak777/guelph-gym-live-counter.git
cd guelph-gym-live-counter/web

# 2. Install
npm install

# 3. Set up env
cp .env.example .env
# Fill in DATABASE_URL from your Neon project

# 4. Migrate
npx prisma migrate dev

# 5. Run
npm run dev
```

Then open http://localhost:3000

## Hardware bill of materials

| Item | Purpose | Approx. cost (CAD) |
|---|---|---|
| ELEGOO UNO R3 Super Starter Kit | Breadboard, LEDs, servo, buzzer, resistors, LCD | $57.99 |
| ELEGOO ESP32 Dev Board (2-pack) | Wi-Fi microcontroller | $19.99 |
| HiLetgo PN532 NFC RFID Module V3 | 13.56 MHz card reader | $15.99 |
| 10-pack MIFARE Classic 1K fobs | Simulated student cards | $9.39 |
| DIYmalls 2.8" ILI9341 SPI TFT (touch) | Member-feedback display | $19.98 |
| **Total** | | **$123.34** |

Full wiring guide: [`hardware/README.md`](./hardware/README.md)

## About this project

Built by [Burak Aksoy](https://www.linkedin.com/) — engineering student at the University of Guelph — as a personal portfolio project. **Not affiliated with, endorsed by, or officially associated with the University of Guelph.** All Guelph branding, logos, and content are used only for the purposes of a design exercise and portfolio demo.

## License

MIT — see [LICENSE](./LICENSE)
