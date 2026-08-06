# Test Sketches

Incremental bench-test firmware used to validate each subsystem of the RFID gate before flashing the full `gate_controller.ino`. Each test isolates one component so failures are easy to localize.

Sketches are numbered in the order they should be run. Do not skip ahead — each test builds confidence that the prior layer is working.

## Test 01 — Blink

Verifies the toolchain works end-to-end: driver, board files, upload path, USB data cable.

**Pass criteria:** on-board blue LED (GPIO 2) toggles every 200 ms and the Serial Monitor prints `LED ON` / `LED OFF` at 115200 baud.

## Test 02 — I2C Scanner

Verifies that any device wired to the ESP32's I2C bus responds.

**Wiring:**

| Device       | ESP32 pin |
| ------------ | --------- |
| PN532 GND    | GND       |
| PN532 VCC    | 3V3       |
| PN532 SDA    | GPIO 21   |
| PN532 SCL    | GPIO 22   |

**PN532 DIP switch:** Switch 1 UP (ON), Switch 2 DOWN (KE) → I2C mode.

**Pass criteria:** Serial Monitor prints `I2C device found at address 0x24  !` every 2 seconds. Address may also appear as `0x48`.

If a 16x2 I2C LCD backpack is added later, a second address (`0x27` or `0x3F`) will appear.

## Test 03 — PN532 Card Reader

Verifies that the PN532 can actually read Mifare Classic S50 cards and extract UIDs.

**Wiring:** same as test 02.

**Library required:** `Adafruit PN532` (install via Arduino IDE Library Manager).

**Pass criteria:** Held near the PN532 antenna coil, each Mifare S50 card prints a unique 4-byte UID in the format `XX:XX:XX:XX`.

### Test cards recorded for this build

| Card | UID |
| ---- | --- |
| 1    | `47:07:12:5E` |
| 2    | `26:8C:75:E7` |

These UIDs are the primary keys used to register users in the Neon `cards` table (see Phase D of the build).

---

## Test 04 — TFT Demo v2

Verifies the 2.8" ILI9341 TFT works AND showcases the target UI design.

**Wiring:**

| TFT pin | ESP32 pin |
| ------- | --------- |
| VCC     | 3V3       |
| GND     | GND       |
| LED     | 3V3       |
| CS      | GPIO 5    |
| RESET   | GPIO 4    |
| DC      | GPIO 2    |
| MOSI    | GPIO 23   |
| SCK     | GPIO 18   |
| MISO    | GPIO 19   |

**Libraries required:** `Adafruit GFX`, `Adafruit ILI9341`.

**Pass criteria:** Screen cycles every 4 seconds through 3 states:

1. **STANDBY** — "TAP CARD" prompt with Gryphon-red header and gold occupancy bar
2. **SUCCESS** — Green checkmark with welcome message and member ID
3. **DENIED** — Red X-mark with "ACCESS DENIED" message

All three screens share a consistent Gryphon-branded header and live-occupancy footer.

---

## Next test sketches (not yet built)

- **05** — SG90 servo sweep test
- **06** — WiFi captive portal (WiFiManager)
- **07** — API POST to Vercel `/api/scan` endpoint

Once all subsystem tests pass, flash `../gate_controller/gate_controller.ino` for the full production firmware.
