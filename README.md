# Guelph Gym Live Counter and RFID Access Gate

A completed full-stack and embedded-systems prototype that connects an ESP32 RFID gate to a live gym occupancy website.

The system validates an RFID/NFC member card against a cloud database, determines whether the member is entering or leaving, updates occupancy, presents feedback on two local displays, and opens two synchronized gate doors only after server authorization.

**Project status:** Complete and physically verified

**Live demonstration:** [guelph-gym-live-counter.vercel.app](https://guelph-gym-live-counter.vercel.app)

**Project lead:** Burak Aksoy, University of Guelph Computer Engineering

> This is an independent academic and portfolio prototype. It is not an official University of Guelph system and is not endorsed by or affiliated with the University.

## Demonstrated Capabilities

- **RFID access control:** A PN532 reads ISO14443A/MIFARE-compatible cards.
- **Cloud authorization:** The ESP32 submits each UID to a protected Next.js API over HTTPS.
- **Automatic IN/OUT tracking:** A valid member's next direction is derived from persistent server-side presence state.
- **Live occupancy:** Approved entry increases the website counter; approved exit decreases it.
- **Fail-closed operation:** Unknown, expired, inactive, or network-failed scans never open the gate or change occupancy.
- **Physical gate control:** Two MG996-class servos open in opposite directions and return to a 90-degree closed position.
- **Local feedback:** An ILI9341 TFT provides graphical results while a parallel 16x2 LCD provides persistent status.
- **Remote control:** The Elegoo IR remote POWER command enables and stops the gate system.
- **Responsive website:** The live counter refreshes from the database every five seconds.

## System Architecture

```text
Member card
    |
    v
PN532 RFID reader --I2C--> ESP32 --HTTPS/JSON--> Next.js /api/scan
                           |                         |
                           |                         v
                           |                  Prisma + Neon PostgreSQL
                           |                         |
                           |                         v
                           |                  /api/occupancy
                           |                         |
                           v                         v
                TFT + 16x2 LCD + servos      React live counter
```

The website and database are the authorization and occupancy source of truth. The ESP32 opens the gate only when `/api/scan` returns `ok: true` and `result: "SUCCESS"`.

## Final Hardware

| Component | Quantity | Role |
|---|---:|---|
| ESP32 ESP-WROOM-32 DevKit-style board | 1 | Controller and Wi-Fi client |
| PN532 NFC Module V3 | 1 | RFID/NFC reader in I2C mode |
| ILI9341 2.8-inch 240x320 TFT | 1 | Main graphical interface |
| 1602A 16x2 LCD | 1 | Persistent greeting and status |
| KY-022 IR receiver and Elegoo remote | 1 set | ACTIVE/STOPPED control |
| MG996-class 180-degree servos | 2 | Opposing gate-door actuators |
| Adjustable DC supply set to 6 V | 1 | Dedicated servo power |
| 1000 uF, 10 V electrolytic capacitor | 1 | Servo transient stabilization |
| Full-size solderless breadboards | 2 | Prototype interconnection |

The final active electronics replacement value is **$148.62 CAD**. The documented wood, plastic, paint, and hinge materials add **$132.48 CAD**, producing a documented active build total of **$281.10 CAD**, before tax and shipping. See [FINAL_HARDWARE_COMPONENTS_COST_REPORT.md](./FINAL_HARDWARE_COMPONENTS_COST_REPORT.md) for the complete procurement record.

## Technology Stack

| Layer | Technology |
|---|---|
| Embedded firmware | Arduino C++, ESP32 Arduino core |
| RFID | PN532 over I2C |
| Displays | ILI9341 over SPI, LCD1602 in 4-bit parallel mode |
| Actuation | ESP32Servo, two MG996-class servos |
| Remote control | IRremote TinyIRReceiver |
| Device networking | Wi-Fi, HTTPS, JSON |
| Web application | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Validation and ORM | Zod, Prisma 6 |
| Database | Neon PostgreSQL |
| Hosting | Vercel |

## Repository Guide

```text
.
├── arduino/
│   ├── gate_controller/       Final verified ESP32 firmware
│   └── docs/                  Wiring, setup, and verification guides
├── web/                       Next.js website, API, and Prisma schema
├── docs/                      Architecture and physical-build references
├── firmware/test_sketches/    Archived development and diagnostic sketches
├── fusion-scripts/            Parametric gate-model helper
└── FINAL_HARDWARE_COMPONENTS_COST_REPORT.md
```

The production firmware is:

```text
arduino/gate_controller/gate_controller.ino
```

For a concise professional demonstration narrative and project metrics, see [docs/PRESENTATION_BRIEF.md](./docs/PRESENTATION_BRIEF.md).

## API Contract

The ESP32 sends one authenticated request per accepted physical card tap:

```http
POST /api/scan
Content-Type: application/json
Authorization: Bearer <SCAN_API_SECRET>
```

```json
{
  "cardUid": "AA:BB:CC:DD",
  "gateId": "gate-1"
}
```

A successful response includes `direction`, public member information, `occupancy`, and `capacity`. Denied responses use `DENIED_UNKNOWN_CARD`, `DENIED_EXPIRED`, or `DENIED_INACTIVE`. See [docs/SYSTEM_ARCHITECTURE.md](./docs/SYSTEM_ARCHITECTURE.md) for the full sequence.

## Getting Started

### Website

```bash
git clone https://github.com/xBurak777/guelph-gym-live-counter.git
cd guelph-gym-live-counter/web
npm install
cp .env.example .env.local
npx prisma generate
npm run dev
```

Populate `DATABASE_URL` and `SCAN_API_SECRET` in `.env.local`. Never commit real credentials.

### ESP32

1. Follow [arduino/docs/WIRING.md](./arduino/docs/WIRING.md).
2. Install the toolchain and libraries in [arduino/docs/SETUP.md](./arduino/docs/SETUP.md).
3. Copy private Wi-Fi and API values into `arduino/gate_controller/config.h`.
4. Compile and upload `arduino/gate_controller/gate_controller.ino`.
5. Run the acceptance procedure in [arduino/docs/TESTING.md](./arduino/docs/TESTING.md).

## Verified Final Behavior

1. The system boots in STOPPED mode with both doors at 90 degrees.
2. The remote POWER button activates RFID scanning.
3. A scanned UID is submitted to the production API.
4. Approved entry and exit scans update the database and website counter.
5. Approved scans open both doors synchronously, hold them open for eight seconds, then close them.
6. Denied scans and communication failures leave the counter unchanged and the doors closed.
7. The remote POWER button stops scanning and safely returns the gate to its closed state.

## Security

- Real Wi-Fi credentials, database URLs, and API secrets are excluded from Git.
- The public `config.h` contains placeholders.
- `/api/scan` requires a bearer secret stored in the ESP32 and Vercel environment.
- The firmware fails closed if a valid server authorization is unavailable.
- `WiFiClientSecure::setInsecure()` is used in this prototype. A production deployment should validate the server certificate or pinned trust chain.

## License

MIT. See [LICENSE](./LICENSE).
