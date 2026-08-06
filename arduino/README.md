# RFID Gate Controller — Arduino / ESP32 Firmware

The hardware brain of the Guelph Fit & Rec gate. Reads NFC member cards on a PN532, calls the `/api/scan` endpoint on the live website, and opens the door with two SG90 servos on `SUCCESS`.

Companion to the website at [guelph-gym-live-counter.vercel.app](https://guelph-gym-live-counter.vercel.app).

---

## What's here

```
arduino/
├── gate_controller/
│   ├── gate_controller.ino   # main firmware (state machine, RFID, HTTP, servos)
│   └── config.h              # pin assignments + WiFi + API secret
└── docs/
    ├── SETUP.md              # install Arduino IDE, libraries, upload
    ├── WIRING.md             # pin diagram + bill of materials
    └── TESTING.md            # bench-test procedure (Test 0-9)
```

---

## Quick start

1. Read **docs/SETUP.md** to install the Arduino IDE + libraries + upload the firmware.
2. Read **docs/WIRING.md** to wire the ESP32 to PN532, TFT, LCD, and servos.
3. Read **docs/TESTING.md** to bench-test each subsystem before full integration.

---

## System diagram

```
   NFC card
      |
      | (tap)
      v
   PN532  ---I2C--->  ESP32  ---HTTPS--->  /api/scan  ---SQL--->  Neon Postgres
                        |                     |
                        |                     v
                        |               { ok, result,
                        |                 direction, member,
                        |                 occupancy }
                        |
              +---------+---------+
              |         |         |
              v         v         v
           TFT 2.8"   LCD 16x2   2x SG90 servos
           (status)   (welcome)  (door open/close)
```

---

## Design decisions

**Why ESP32 over Arduino UNO?**
The UNO has no WiFi. Doing WiFi over an ESP8266 shield is finicky. The ESP32 has WiFi built in, is drop-in-compatible with the Arduino IDE, has 34+ GPIO pins, and costs less than the UNO+shield combined.

**Why I2C for the PN532 instead of SPI?**
Two reasons. First, the LCD also uses I2C, so both share the same 2 pins. Second, at typical read distance (5-10 mm) the throughput doesn't matter and I2C is simpler to wire.

**Why WiFiManager instead of hardcoded WiFi?**
On first boot, the ESP32 broadcasts its own "GuelphGymGate-Setup" network. You connect from your phone, pick your real WiFi, enter password. This is the industry-standard "smart device" experience — much better for demos than hardcoding credentials.

**Why two servos on one door?**
A single SG90 can't reliably swing a clear plastic panel that's 800 mm tall — the door twists and jams. Two servos, one at the top and one at the bottom, both driven with the same PWM signal, keep the panel parallel through the full swing.

**Why the door auto-closes after 3 seconds?**
Standard gym gate UX. Matches how real turnstiles work. If we added an IR beam sensor across the doorway we could close on "person passed through" instead of a timer, but that's a v2 feature.

---

## API contract (recap)

The ESP32 makes ONE call per scan:

```
POST /api/scan
Content-Type: application/json
Authorization: Bearer <SCAN_API_SECRET>

{
  "cardUid": "04:A2:B1:8C",
  "gateId": "gate-1"
}
```

Response on success:
```json
{
  "ok": true,
  "result": "SUCCESS",
  "direction": "IN",
  "message": "Welcome, Sarah. Have a great workout.",
  "member": {
    "firstName": "Sarah",
    "lastName": "Chen",
    "membershipTier": "STANDARD",
    "membershipEnd": "2027-04-15T00:00:00Z",
    "photoUrl": "..."
  },
  "occupancy": 187,
  "capacity": 350
}
```

Response on denial:
```json
{
  "ok": false,
  "result": "DENIED_EXPIRED",
  "message": "Membership expired.",
  "member": { ... }
}
```

All denial reasons: `DENIED_UNKNOWN_CARD`, `DENIED_INACTIVE`, `DENIED_EXPIRED`.

---

## Next steps

Once bench-testing is complete:

1. **Physical build** — thin plywood pillars, 3D-printed housings for PN532/LCD/TFT, clear plastic door, servos mounted inside the left pillar. Cable channel through the hollow pillar.
2. **Admin card-registration page** — right now, cards are registered by hand in Neon SQL. A `/admin/cards` page on the website that lets you tap a card and register it under an existing member would be a nice v2.
3. **Failover** — if WiFi drops, currently the ESP32 denies everyone. Could add local caching of "known good" UIDs so it works offline for regulars.
4. **Demo video** — record yourself scanning cards, showing the live occupancy counter updating on the phone next to the gate. This is the LinkedIn portfolio hero shot.
