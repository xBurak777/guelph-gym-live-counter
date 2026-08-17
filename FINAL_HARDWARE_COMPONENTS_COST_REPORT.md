# Guelph Gym Live Counter
## Final Hardware, Components, Procurement, Cost, Wiring, and Verification Report

**Project status:** COMPLETE — final system physically tested and verified  
**Report date:** August 17, 2026  
**Currency:** CAD  
**Live website:** `https://guelph-gym-live-counter.vercel.app`  
**GitHub repository:** `xBurak777/guelph-gym-live-counter`

---

# 1. Purpose of This Report

This document is the final hardware and procurement record for the ESP32-based University of Guelph gym entrance gate and live occupancy counter project.

It records:

- every major electronic component used in the finished prototype;
- quantities used;
- components purchased during earlier development but later replaced or removed;
- the returned 5 V Facmogu servo power adapter;
- the replacement adjustable-voltage adapter used at 6 V;
- final wiring and pin assignments;
- final servo angles and timing;
- RFID test-card inventory;
- software and embedded libraries;
- current Canadian replacement/reference prices;
- estimated project hardware cost;
- final end-to-end verification results.

## Important Pricing Note

The prices in this report are **current Canadian reference/replacement prices researched on August 17, 2026**, before tax and shipping.

They are not presented as exact historical purchase receipts unless specifically stated. Some exact paid prices were not preserved in the project history. For those parts, the report uses a current Canadian retailer price for the same product or a technically comparable product.

---

# 2. Final Active Hardware Bill of Materials

| Qty Used | Component | Final Specification / Model | Final Role | Reference Unit Price (CAD) | Reference Extended Cost |
|---:|---|---|---|---:|---:|
| 1 | ESP32 development board | ESP-WROOM-32 DevKit-style | Main controller, Wi-Fi, RFID/display/servo coordination | $12.99 | $12.99 |
| 1 | NFC/RFID reader | PN532 NFC MODULE V3 | Reads member RFID/NFC cards | $10.29 | $10.29 |
| 1 | TFT display | Replacement 2.8" ILI9341 SPI, 240×320 | Main graphical status/user interface | $16.43 | $16.43 |
| 1 | Character LCD | 1602A V2.0, 16×2 | Permanent greeting/status display | $5.95 | $5.95 |
| 1 | IR receiver | KY-022 | Receives POWER command | $3.00 equivalent | $3.00 |
| 1 | IR remote | Elegoo/CANADUINO-style NEC remote | ACTIVE/STOPPED user control | $7.50 | $7.50 |
| 2 | High-torque gate servos | MG996-class, 180° | Door A and Door B actuators | $11.50 equivalent | $22.99 |
| 1 | Adjustable-voltage servo power adapter | Adjustable DC supply, set to **6 V**; exact final brand/model not preserved | Dedicated high-current servo power | $26.81 comparable | $26.81 |
| 1 | DC barrel breakout | 5.5 × 2.1 mm female screw-terminal connector | Adapter-to-power-rail connection | $1.60 | $1.60 |
| 1 | Electrolytic capacitor | 1000 µF, 10 V | Servo supply transient stabilization | $1.24 | $1.24 |
| 2 | Solderless breadboards | Full-size / approximately 830 tie points | Main circuit prototyping platform | $4.99 | $9.98 |
| 1 set | Jumper wires | Male-male / male-female Dupont assortment | Signal and power interconnection | $12.99 | $12.99 |
| 1 | USB data/power cable | USB-A to Micro-USB or matching ESP32 cable | Programming, serial monitor, ESP32 power | $2.99 | $2.99 |
| 14 unique test UIDs | RFID/NFC cards/tags | 13.56 MHz ISO14443A / MIFARE-compatible | Approved, warning, denied, and unknown test cases | $0.99 each reference | $13.86 |

## Estimated Current Replacement Value of Final Active Electronics

**CAD $148.62**

This electronics subtotal excludes taxes, shipping, adhesives, fasteners, and tools already owned. Section 13 separately records the supplied wood, plastic, paint, and hinge costs.

---

# 3. Final Servo Power Supply Update

## Returned Adapter

The previously purchased:

**Facmogu 5 V / 4 A / 20 W adapter**

was **returned** and is **not part of the final working build**.

Current Canadian reference price for that exact Facmogu 5 V / 4 A / 20 W product:

**CAD $15.99**

Because it was returned, it is excluded from the active BOM and active project cost.

## Final Adapter

The working gate now uses an:

**adjustable-voltage DC power adapter set to 6 V**

for the MG996-class gate servos.

The exact brand/model of the replacement adapter was not preserved in the available project records, so this report does not invent one.

For budgeting, a comparable Canadian product was found:

- adjustable DC power supply;
- approximately 3–12 V adjustment range;
- up to approximately 5 A;
- approximately 60 W class;
- current reference price: **CAD $26.81**.

The final physical system was successfully tested with the replacement adapter set to **6 V**.

## Critical Power Rule

The high-current servos are powered from the external adjustable supply, not directly from the ESP32.

The grounds must be common:

```text
Adjustable Servo PSU GND
          |
          +---------------- ESP32 GND
```

The final servo voltage is:

```text
6 V
```

---

# 4. Components Purchased/Tested During Development but Not in the Final Active Build

| Qty | Component | Development Use | Final Status | Current Reference Value |
|---:|---|---|---|---:|
| 4 | Miuzei MG90S 9G micro servos | Original plan used two small servos per gate door | Superseded by two MG996-class high-torque servos | ~$21.59 equivalent for 4 based on current Miuzei multi-pack pricing |
| 1 | Original 2.8" ILI9341 TFT | Initial display testing | Replaced after persistent white-screen problem | ~$16.43 |
| 1 | MB102 breadboard power module | Early breadboard/prototyping power | Not used as final servo power source | ~$3.99 |
| 1 | Facmogu 5 V / 4 A / 20 W adapter | First dedicated servo supply | **Returned** | $15.99 |
| 1 | SONGLE SRD-05VDC-SL-C relay/module | Available/discussed during development | Not required in final verified gate-control path | ~$10.26 |

## Estimated Reference Value of Superseded/Unused Parts Kept

Excluding the returned Facmogu adapter:

**CAD $52.27**

## Approximate Replacement Value of All Active + Superseded/Unused Hardware Kept

```text
Active final electronics:        $148.62
Superseded/unused parts kept:    +52.27
----------------------------------------
Approximate total retained:      $200.89 CAD
```

If the returned Facmogu adapter were included as a pre-refund purchase, the reference total would be approximately:

**CAD $216.88**

Again, these figures are replacement/reference values, not an audited receipt total.

---

# 5. Pricing Sources and Reference Products

Prices were researched on August 17, 2026 using Canadian retailer/product listings.

| Item | Reference Retailer / Listing | Price Used |
|---|---|---:|
| ESP32 ESP-WROOM-32 development board | Canada Robotix | $12.99 |
| PN532 NFC Module V3 | Amazon Canada | $10.29 |
| 2.8" ILI9341 240×320 TFT | Amazon Canada | $16.43 |
| 1602 16×2 LCD | PiShop.ca | $5.95 |
| KY-022 IR receiver | Amazon Canada 3-pack, prorated | $3.00 each |
| IR remote | Amazon Canada / CANADUINO-style listing | $7.50 |
| MG996-class servos | Amazon Canada Miuzei MG996R 2-pack reference | $22.99 / 2 |
| Adjustable 6 V-capable servo supply | Best Buy Canada Marketplace comparable 3–12 V / 5 A unit | $26.81 |
| 5.5 × 2.1 mm female screw terminal | Infinite Cables | $1.60 |
| 1000 µF 10 V capacitor | DigiKey Canada | $1.24 |
| Full-size breadboard | Canada Robotix | $4.99 each |
| Dupont jumper-wire kit | Amazon Canada | $12.99 |
| USB-A to Micro-USB cable | Canada Robotix | $2.99 |
| MIFARE-compatible 13.56 MHz RFID/NFC card | Canada Robotix | $0.99 each |
| Miuzei MG90S micro servo | Amazon Canada current multi-pack reference | estimated $21.59 for 4 |
| MB102 breadboard power supply | Addison Électronique | $3.99 |
| Facmogu 5 V / 4 A / 20 W adapter | Amazon Canada | $15.99 |
| SRD-05VDC-SL-C relay module | Amazon Canada | $10.26 |

Prices can change and may vary by seller, stock, tax, shipping, and pack size.

---

# 6. Final ESP32 Pin Assignment

The final verified firmware is the wiring authority.

## 6.1 IR Receiver

| Function | ESP32 Pin |
|---|---:|
| KY-022 signal | GPIO34 |

Red POWER button NEC command:

```text
0x45
```

---

## 6.2 PN532 RFID/NFC Reader

| PN532 Function | ESP32 Pin |
|---|---:|
| SDA | GPIO21 |
| SCL | GPIO22 |
| IRQ | GPIO35 |
| RESET | GPIO13 |

Operating mode:

```text
I2C
```

Verified PN532 firmware:

```text
1.6
```

The PN532 should remain physically separated from the TFT and associated wiring as much as practical for reliable RFID operation.

---

## 6.3 16×2 LCD

The final firmware drives the 1602 LCD in 4-bit parallel mode.

| LCD Function | ESP32 Pin |
|---|---:|
| RS | GPIO16 |
| EN | GPIO19 |
| D4 | GPIO4 |
| D5 | GPIO5 |
| D6 | GPIO2 |
| D7 | GPIO15 |

The LCD provides:

- permanent Gryphon Fit & Rec greeting;
- card status text;
- system STOPPED/ACTIVE status;
- custom smiley character.

---

## 6.4 ILI9341 TFT

| TFT Function | ESP32 Pin |
|---|---:|
| CS | GPIO32 |
| RST | GPIO33 |
| DC | GPIO27 |
| MOSI | GPIO23 |
| SCK | GPIO18 |

The final TFT interface provides:

- real University of Guelph / Gryphon logo;
- fast-render static frame;
- approved screen;
- warning screen;
- denied/expired/unknown screens;
- system ACTIVE/STOPPED UI;
- IN/OUT direction from the live backend.

---

## 6.5 Final Gate Servo Pins

| Gate Door | ESP32 Signal Pin |
|---|---:|
| Door A | GPIO17 / TX2 |
| Door B | GPIO26 |

Final verified positions:

```cpp
const int DOOR_CLOSED_ANGLE = 90;
const int DOOR_A_OPEN_ANGLE = 0;
const int DOOR_B_OPEN_ANGLE = 180;
```

Final verified timing:

```cpp
const unsigned long SERVO_STEP_INTERVAL = 8;
const unsigned long GATE_OPEN_HOLD_TIME = 8000;
```

Actual movement:

```text
Door A: 90° -> 0°
Door B: 90° -> 180°

Hold both open for 8 seconds

Door A -> 90°
Door B -> 90°
```

The two servos move synchronously in opposite directions.

---

# 7. Breadboard and Power Arrangement

The prototype uses two joined solderless breadboards.

The project used three conceptual power-rail areas during development:

- LEFT outer power rails;
- MIDDLE rails between the joined boards;
- RIGHT outer power rails.

The final external servo supply is separated from logic power while sharing ground with the ESP32.

The 1000 µF / 10 V capacitor is used on the external servo supply to help reduce transient voltage drops when the servos start or change direction.

---

# 8. RFID/NFC Test Inventory

The backend test database contains 11 registered members and 3 intentionally unknown test cards.

## Approved Members

| UID | Member |
|---|---|
| `47:07:12:5E` | Burak Aksoy |
| `60:11:9D:5C` | Fatih Aksoy |
| `6C:BD:1C:42` | Aylin Demir |
| `4C:AA:21:42` | Selin Arslan |
| `1C:DB:26:42` | Mert Aydin |
| `CC:3D:2D:42` | Kerem Celik |

## Warning but Authorized

| UID | Member |
|---|---|
| `26:8C:75:E7` | Eylul Hepoglu |
| `3C:A2:42:42` | Can Yildirim |

## Expired

| UID | Member |
|---|---|
| `0C:28:13:42` | Elif Sahin |

## Inactive

| UID | Member |
|---|---|
| `BC:7C:1E:42` | Emre Yilmaz |
| `8C:2B:20:42` | Onur Kaplan |

## Intentionally Unknown Cards

```text
A4:B1:76:E7
3C:23:48:42
DC:65:0C:42
```

For BOM costing, 14 unique test identifiers were treated as 14 card/tag equivalents. If some identifiers came from reusable tags rather than separately purchased cards, the actual card cost would be lower.

---

# 9. Embedded Software and Arduino Libraries

The final ESP32 firmware uses:

```text
Wire.h
SPI.h
Adafruit_PN532.h
LiquidCrystal.h
Adafruit_GFX.h
Adafruit_ILI9341.h
ESP32Servo.h
WiFi.h
HTTPClient.h
WiFiClientSecure.h
ArduinoJson.h
TinyIRReceiver.hpp
```

Known versions from the verified development environment:

| Library | Version |
|---|---:|
| Adafruit BusIO | 1.17.4 |
| Adafruit GFX | 1.12.6 |
| Adafruit ILI9341 | 1.5.12 |
| Adafruit PN532 | 1.3.4 |
| IRremote | 4.7.1 |
| ESP32Servo | 0.13.0 |
| ArduinoJson | 6.21.6 |

The final code was successfully compiled and uploaded to an ESP32 Dev Module.

---

# 10. Website, Backend, and Cloud Stack

| Layer | Technology |
|---|---|
| Frontend and API | Next.js 14 |
| UI | React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| ORM | Prisma 6.19.3 |
| Database | Neon PostgreSQL |
| Hosting | Vercel |
| Source control | GitHub |
| ESP32-to-server protocol | HTTPS + JSON |

Production site:

```text
https://guelph-gym-live-counter.vercel.app
```

The backend maintains authoritative persistent member presence using:

```text
isInside
currentVisitStartedAt
```

Approved scans toggle these fields inside a serializable database transaction. Denied scans never modify presence. A successful `OUT` event closes the visit by creating a `GymSession`.

---

# 11. Final Occupancy Logic

## Approved Member Currently Outside

```text
RFID scan
-> ESP32 sends UID to Vercel /api/scan
-> backend finds valid member
-> isInside = false
-> direction = IN
-> isInside becomes true
-> currentVisitStartedAt is recorded
-> successful IN ScanEvent is stored
-> occupancy +1
-> APPROVED returned to ESP32
-> gate opens
```

## Same Approved Member Currently Inside

```text
RFID scan
-> backend sees isInside = true
-> direction = OUT
-> isInside becomes false
-> currentVisitStartedAt is cleared
-> successful OUT ScanEvent is stored
-> completed GymSession is created
-> occupancy -1
-> APPROVED returned to ESP32
-> gate opens
```

## Warning Member

Warning members remain authorized and use the same IN/OUT state logic.

## Expired Member

```text
DENIED_EXPIRED
-> occupancy unchanged
-> gate remains closed
```

## Inactive Member

```text
DENIED_INACTIVE
-> occupancy unchanged
-> gate remains closed
```

## Unknown Card

```text
DENIED_UNKNOWN_CARD
-> occupancy unchanged
-> gate remains closed
```

## Network/API Failure

```text
No valid server authorization
-> occupancy unchanged
-> gate remains closed
```

The website/database is the authoritative source of truth.

---

# 12. Final End-to-End Verification

The finished physical system was tested in production and passed all major functional tests.

## Hardware Verification

- ESP32 boots normally.
- Gate servos initialize at 90°.
- PN532 initializes and reports firmware 1.6.
- TFT initializes and renders correctly.
- LCD greeting/status works.
- IR POWER control works.
- System toggles ACTIVE/STOPPED correctly.
- ESP32 connects to 2.4 GHz Wi-Fi.
- Adjustable servo supply successfully powers the servos at 6 V.

## Live Backend Verification

- Vercel deployment is live.
- Neon database is connected.
- Production `/api/occupancy` works.
- Production `/api/scan` works.
- ESP32 communicates with Vercel through HTTPS.

## Physical RFID Tests

### Approved member

First scan:

```text
0 -> 1
direction = IN
gate opens
```

Same card scanned again:

```text
1 -> 0
direction = OUT
gate opens
```

### Unknown / expired / inactive members

Verified behavior:

```text
DENIED
counter does not change
servos do not move
```

All required core functionality is therefore complete and verified.

---

# 13. Mechanical/Fabrication Materials

The following exact material costs were supplied for the completed wooden RFID gate assembly:

| Material | Quantity / Detail | Cost (CAD) |
|---|---|---:|
| Wood | Main gate and frame material | $49.99 |
| Plastic sheet | Gate-door panels | $18.99 |
| Spray paint | 3 cans at $14.50 each: 2 black, 1 red | $43.50 |
| Hinges | 4 gate-door hinges | $20.00 |
| **Mechanical materials subtotal** |  | **$132.48** |

This mechanical subtotal excludes any unpriced glue, screws, fasteners, servo horns, mounting brackets, cable supports, and tools already owned.

Combined with the final active electronics:

```text
Final active electronics:        $148.62
Documented mechanical materials: +132.48
----------------------------------------
Documented active build total:    $281.10 CAD
```

The $281.10 total is before sales tax and shipping.

---

# 14. Procurement History Summary

## Final Active

- 1 × ESP32 ESP-WROOM-32 DevKit-style board
- 1 × PN532 NFC MODULE V3
- 1 × replacement 2.8" ILI9341 TFT
- 1 × 1602A 16×2 LCD
- 1 × KY-022 IR receiver
- 1 × IR remote
- 2 × MG996-class high-torque servos
- 1 × adjustable-voltage DC servo adapter, set to 6 V
- 1 × 5.5 × 2.1 mm female screw-terminal connector
- 1 × 1000 µF / 10 V capacitor
- 2 × solderless breadboards
- 1 × jumper-wire assortment
- 1 × ESP32 USB cable
- multiple RFID/NFC test cards/tags, representing 14 unique UIDs

## Bought/Tested but Replaced or Removed

- 4 × Miuzei MG90S 9G servos
- 1 × original problematic ILI9341 TFT
- 1 × MB102 breadboard power module
- 1 × SONGLE SRD-05VDC-SL-C relay/module, not required in final system

## Returned

- 1 × Facmogu 5 V / 4 A / 20 W adapter

It was replaced by the adjustable-voltage adapter used at 6 V.

---

# 15. GitHub Security Notes

Never commit real credentials.

The public repository `config.h` should use placeholders:

```cpp
#define WIFI_SSID "YOUR_WIFI_NAME"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

#define API_BASE_URL "https://guelph-gym-live-counter.vercel.app"

#define SCAN_API_SECRET "PASTE_YOUR_SCAN_API_SECRET_HERE"
```

Keep these private:

- Wi-Fi password;
- Vercel `SCAN_API_SECRET`;
- Neon `DATABASE_URL`;
- Neon database password.

The real credentials may remain flashed to the physical ESP32 but should not be stored in the public GitHub repository.

---

# 16. Cost Summary

| Category | Reference Cost |
|---|---:|
| Final active electronics | **$148.62 CAD** |
| Documented mechanical materials | **$132.48 CAD** |
| Final active build, electronics + documented mechanical materials | **$281.10 CAD** |
| Superseded/unused hardware retained | **$52.27 CAD** |
| Returned Facmogu adapter | **$15.99 CAD** before refund |
| Active build + retained hardware | **$333.37 CAD** |
| Pre-refund total including returned adapter | **$349.36 CAD** |

## Not Included

- sales tax;
- shipping;
- glue;
- screws/fasteners;
- tools;
- computer;
- home Internet;
- exact historical price differences.

---

# 17. Final Project Status

**COMPLETE AND VERIFIED WORKING**

The completed prototype successfully combines:

```text
RFID/NFC card
   -> PN532
   -> ESP32
   -> Wi-Fi / HTTPS
   -> Vercel API
   -> Neon PostgreSQL
   -> member authorization
   -> persistent IN/OUT state
   -> live occupancy counter
   -> TFT + LCD feedback
   -> servo gate control
```

Final verified servo behavior:

```text
Closed:
Door A = 90°
Door B = 90°

Authorized opening:
Door A -> 0°
Door B -> 180°

Servo step timing:
8 ms per degree

Open hold:
8 seconds

Closing:
Both -> 90°
```

The production website, backend, database, RFID reader, displays, IR remote, and physical gate have all been tested together successfully.

---

# 18. Recommended GitHub Documentation Placement

Add this file to the repository root as:

```text
FINAL_HARDWARE_COMPONENTS_COST_REPORT.md
```

Recommended repository structure:

```text
README.md
FINAL_HARDWARE_COMPONENTS_COST_REPORT.md
arduino/
  gate_controller/
    gate_controller.ino
    config.h
web/
docs/
```

This document should be treated as the final hardware/BOM/procurement reference for the completed prototype.
