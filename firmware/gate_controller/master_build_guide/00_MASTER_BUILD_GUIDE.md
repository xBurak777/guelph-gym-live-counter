# RFID GATE — MASTER BUILD GUIDE (Complete, Self-Contained)

**Project:** Guelph Fit & Rec RFID Gate System
**Author:** Burak Aksoy
**Repo:** https://github.com/xBurak777/guelph-gym-live-counter
**Live site:** https://guelph-gym-live-counter.vercel.app

---

## What this guide covers (start to end, no missing pieces)

1. Complete parts list — what you have and what you need
2. Assembling the two breadboards into one long strip
3. Correctly orienting the ESP32 (straddling the center gap)
4. Wiring EVERY component with exact row/column coordinates
5. Wiring the 4 servos (2 per door) using a PCA9685 I²C servo driver
6. Wiring the KY-022 IR receiver
7. Wiring the tactile push button (backup power kill)
8. Powering everything correctly (3.3V rail, 5V rail, common ground)
9. Arduino IDE setup (libraries, board settings)
10. **Sketch 1**: IR code discovery — captures the exact hex code from your ELEGOO remote
11. **Sketch 2**: Master `gate_controller.ino` — full system integration
12. WiFi setup on first boot
13. Bench test procedure
14. Wood housing recommendations
15. Troubleshooting reference

---

# ⚙️ PART 1 — HARDWARE

## 1.1 Parts checklist

### What you already have (verified)
| Item | Qty | Verified from |
|---|---|---|
| ESP32 DevKit V1 (30-pin) | 1 | Photos throughout session |
| 2.4" TFT ILI9341 SPI display | 1 | Working with `04_tft_demo` |
| PN532 NFC/RFID reader (I²C mode) | 1 | Working with `03_pn532_reader` |
| LCD1602A with I²C backpack | 1 | User confirmed |
| Miuzei MG90S metal-gear servos | 10 | Arriving before build |
| KY-022 IR receiver module | 1 | Photo verified — G/R/Y pins |
| ELEGOO IR remote (red power button) | 1 | Photo verified |
| SRD-05VDC-SL-C 5V relay module | 1 | Photo verified |
| MB102 power supply module | 1 | Working with 9V battery |
| 9V battery + connector | 1 | Working |
| Breadboards (830-point) | 2 | Existing + 1 new arriving |
| Tactile push button (4-pin) | 1+ | User has these |
| Jumper wires (M-M, M-F, F-F) | Many | User has these |
| ESP32 USB-C cable | 1 | Working |

### What you MUST buy before the full build (only 1 item)
| Item | Why | Cost | Where |
|---|---|---|---|
| **PCA9685 16-channel PWM servo driver (I²C)** | Runs all 4 servos from just 2 ESP32 pins (SDA/SCL, which are already used for I²C — this is FREE bus expansion). Without this, running 4 servos steals 4 ESP32 GPIO pins and causes jitter from CPU-based PWM. | ~$6 CAD Amazon | Search: "PCA9685 16 channel PWM I2C" |

**If you can't get the PCA9685 in time, this guide includes a fallback using 4 direct GPIO pins in Section 3B.** But the PCA9685 is the proper engineering solution and I strongly recommend it.

### Optional but nice
| Item | Why |
|---|---|
| Breadboard jumper kit (pre-cut solid-core wires) | Cleaner wiring under the wood housing |
| Female-to-female Dupont wires (10-pack) | For connecting off-board components (LCD, PN532) |

---

## 1.2 Physical layout — assembling the two long breadboards

Standard 830-point breadboards have **interlocking tabs on the sides**. To combine 2 breadboards end-to-end into one long strip:

### Step 1.2.1 — Peel the backing paper
Turn each breadboard upside down. There's a paper backing covering an adhesive layer. **Leave this on for now** — don't stick them to your desk yet.

### Step 1.2.2 — Remove the side rails (only if they interlock horizontally)
Some breadboards have side +/- rails that snap off to allow end-to-end connection. **On BB400 and standard 830 boards, the tabs are already on the short (top/bottom) ends** — no removal needed. Just slide them together.

### Step 1.2.3 — Interlock them
Slide breadboard #1's TOP end into breadboard #2's BOTTOM end. The plastic tabs mate. You'll now have one long breadboard **~26cm long** with:
- Rows numbered 1–60 (top board) and 61–120 (bottom board) — but numbering may restart at 1
- The center trough runs the full length
- 4 continuous rails on top (+/-) and 4 continuous rails on bottom (+/-)

### Step 1.2.4 — BRIDGE THE POWER RAILS
Even though the breadboards are physically connected, **the +/- rails on each individual board are electrically separate**. You MUST bridge them:

For each of the 4 rails (top +, top –, bottom +, bottom –):
- Take a jumper wire
- Plug one end into the LAST hole of the rail on breadboard #1
- Plug the other end into the FIRST hole of the same rail on breadboard #2
- **Result: all 4 rails run continuously from row 1 to row 120**

**⚠️ This is critical.** Without these 4 bridge wires, half your board has no power.

Use color coding:
- Red wire → + rail bridge (both top + and bottom + rails)
- Black wire → – rail bridge (both top – and bottom – rails)

---

## 1.3 The MASTER breadboard layout

Here is the definitive layout — every component's exact position. **Follow this exactly.**

```
                 COMBINED BREADBOARD (rows 1-120, running top to bottom)

  ROW  |  +  -  A B C D E [gap] F G H I J  -  +
  ─────┼───────────────────────────────────────────────────────────────
   1   |  ●  ●  . . . . . . . . . . . . .  ●  ●
   ...
                                     PCA9685 SERVO DRIVER (rows 5-11)
                                       - horizontal, straddles gap
   5   |  ●  ●  . . . . . [PCA] . . . . .  ●  ●
   6   |         GND VCC V+ SDA SCL OE ...
   ...

                                     ESP32 DEVKIT V1 (rows 15-30)
                                       - VERTICAL, STRADDLING THE GAP
                                       - 15 pins on left half (A-E)
                                       - 15 pins on right half (F-J)
  15   |  ●  ●  [3V3]     [gap]     [GND]  ●  ●    ← ESP32 row 1
  16   |  ●  ●  [GND]               [D23]  ●  ●
  17   |  ●  ●  [D15]               [D22]  ●  ●
   ...continues down...
  30   |  ●  ●  [D23]               [3V3]  ●  ●    ← ESP32 last row

  35   |  Push button (rows 35-37, straddles gap)
  40   |  KY-022 IR receiver (rows 40-42, on left half)
  45   |  PN532 module (rows 45-50, on left half, off-board via wires OR)
  50   |  LCD1602A (via off-board wires, no need to place on breadboard)
  55   |  Relay module (rows 55-58, on left half)
  ...
  60   |  MB102 power supply module (rows 60-70)
  ...
```

The exact pin-by-pin wiring follows in Part 2. First, understand the top-level layout:

**Top half of board (rows 1-60):**
- PCA9685 servo driver (rows 5-11)
- ESP32 (rows 15-30, straddling center gap)
- KY-022 IR receiver (rows 40-42)
- Push button (rows 35-37)
- MB102 power supply (rows 60-70)

**Bottom half of board (rows 60-120):**
- Relay module (rows 55-58) — optional if you skip it
- Free space for future additions
- Servos plug into PCA9685 driver (not directly on breadboard)

**Off-board components (connected via jumper wires):**
- TFT display (already wired, keep as-is)
- LCD1602A (I²C, only 4 wires needed)
- PN532 module (I²C, only 4 wires needed)

---

## 1.4 CRITICAL: Re-seat the ESP32 straddling the center gap

**This is the fix for the "not enough pins" problem.**

### Step 1.4.1 — Remove ALL wires currently on the ESP32
Take a photo first. Then carefully unplug every wire from around the ESP32 (leave them plugged into their component ends — we'll rewire them below).

### Step 1.4.2 — Remove the ESP32 from the breadboard
Grip it by the metal shield (the silver box) and lift straight up. Do NOT rock side to side or you'll bend pins.

### Step 1.4.3 — Insert the ESP32 straddling the center gap
Position the ESP32 with:
- **USB-C port pointing UP** (toward row 1)
- **Left column of pins in rows 15-30, columns E** (touches the center trough)
- **Right column of pins in rows 15-30, columns F** (touches the center trough)
- The chip body itself covers columns E and F, but **columns A-D on the left and G-J on the right are FULLY ACCESSIBLE**

Push down firmly and evenly. All 30 pins should insert simultaneously.

### Step 1.4.4 — Verify by touching each pin with a jumper wire
Column-A row-15 → touch a wire in → should reach the ESP32's `3V3` pin
Column-J row-15 → touch a wire in → should reach the ESP32's `GND` pin (right side, top)

**Now you can access all 30 GPIO pins.**

---

## 1.5 The complete ESP32 pin map (both sides)

With the ESP32 straddling the gap in rows 15-30:

### LEFT column pins (columns A-D, rows 15-30)

| Row | Pin | GPIO | Assignment | Wire color suggestion |
|---|---|---|---|---|
| 15 | 3V3 | — | 3.3V rail supply | Red |
| 16 | GND | — | Ground rail supply | Black |
| 17 | D15 | 15 | (unused — PCA9685 handles servos) | — |
| 18 | D2 | 2 | TFT DC | Green |
| 19 | D4 | 4 | TFT RESET | Yellow |
| 20 | RX2 | 16 | Push button input (with pull-up) | Purple |
| 21 | TX2 | 17 | (unused) | — |
| 22 | D5 | 5 | TFT CS | Blue |
| 23 | D18 | 18 | TFT SCK | Blue |
| 24 | D19 | 19 | TFT MISO | Blue |
| 25 | D21 | 21 | **I²C SDA** (PCA9685 + PN532 + LCD1602) | White |
| 26 | RX0 | 3 | ❌ DO NOT USE — Serial upload | — |
| 27 | TX0 | 1 | ❌ DO NOT USE — Serial upload | — |
| 28 | D22 | 22 | **I²C SCL** (PCA9685 + PN532 + LCD1602) | White |
| 29 | D23 | 23 | TFT MOSI | Blue |
| 30 | (GND) | — | Ground rail supply | Black |

### RIGHT column pins (columns G-J, rows 15-30)

| Row | Pin | GPIO | Assignment | Wire color |
|---|---|---|---|---|
| 15 | EN | — | (unused — reset button) | — |
| 16 | VIN | — | (unused — powered via USB-C) | — |
| 17 | GND | — | Ground rail supply | Black |
| 18 | D13 | 13 | (unused, reserved) | — |
| 19 | D12 | 12 | (unused — boot strap avoid) | — |
| 20 | D14 | 14 | Relay signal (OPTIONAL, skip if no relay) | Orange |
| 21 | D27 | 27 | **KY-022 IR receiver signal** | Orange |
| 22 | D26 | 26 | (spare, reserved for expansion) | — |
| 23 | D25 | 25 | (spare, reserved) | — |
| 24 | D33 | 33 | (unused) | — |
| 25 | D32 | 32 | (unused) | — |
| 26 | D35 | 35 | (input-only, unused) | — |
| 27 | D34 | 34 | (input-only, unused) | — |
| 28 | VN | 39 | (input-only, unused) | — |
| 29 | VP | 36 | (input-only, unused) | — |
| 30 | EN | — | (secondary reset — leave alone) | — |

---

# 🔌 PART 2 — WIRING (component by component)

## 2.1 Power distribution

### Step 2.1.1 — Power rails setup

Take 4 jumper wires:
1. **Red wire**: ESP32 `3V3` (col A, row 15) → **top + rail** on left side of board
2. **Black wire**: ESP32 `GND` (col A, row 16) → **top – rail** on left side of board
3. **Red wire**: MB102 `+5V output` → **top + rail on RIGHT side** (this becomes your 5V rail)
4. **Black wire**: MB102 `GND output` → **top – rail on RIGHT side** (this bridges to the same GND as ESP32)

**⚠️ Two separate + rails now exist:**
- Top-left + rail = **3.3V** (from ESP32) — for logic-level components (TFT, PN532, LCD, IR, PCA9685 logic)
- Top-right + rail = **5V** (from MB102) — for servos only (via PCA9685's V+ terminal)

**Both – rails MUST be bridged together** for common ground:
5. **Black wire**: top-left – rail → top-right – rail (jumper anywhere convenient)
6. **Black wire**: top – rail → bottom – rail on same side (bridges to bottom of board)

Repeat for the bottom half of the board (also bridge – rail from top to bottom).

**Test:** Use a multimeter (if you have one) to verify:
- Top-left + rail measures 3.3V vs any GND ✅
- Top-right + rail measures 5V vs any GND ✅
- All GND rails read 0V vs each other ✅

If no multimeter, plug an LED with a 220Ω resistor between + rail and – rail — LED lights up = power good.

---

## 2.2 TFT Display (already wired — keep exactly as-is)

You already have this working from Phase B.2. **Don't touch these wires.**

For reference, the TFT connections should be:
| TFT pin | ESP32 pin | ESP32 breadboard location |
|---|---|---|
| VCC | 3.3V rail | + rail |
| GND | GND rail | – rail |
| CS | D5 | Col A, Row 22 |
| RESET | D4 | Col A, Row 19 |
| DC/RS | D2 | Col A, Row 18 |
| SDI (MOSI) | D23 | Col A, Row 29 |
| SCK | D18 | Col A, Row 23 |
| LED | 3.3V rail (with a 220Ω resistor if it gets hot) | + rail |
| SDO (MISO) | D19 | Col A, Row 24 |

---

## 2.3 PN532 NFC Reader (I²C mode)

**⚠️ Check the PN532's DIP switches first.** On the back of your PN532 module there are 2 tiny switches labeled SEL0/SEL1 (or similar). For I²C mode:
- SEL0 = ON (or 1)
- SEL1 = OFF (or 0)

You already have this configured because your `03_pn532_reader` sketch works.

### Connect the PN532 with 4 jumper wires (male-to-female):

| PN532 pin | Connect to | Breadboard row/col |
|---|---|---|
| GND | – rail | – rail |
| VCC | + rail (3.3V) | + rail |
| SDA | ESP32 `D21` | Col A, Row 25 (already used — plug wire into col B or C at row 25 to share the pin) |
| SCL | ESP32 `D22` | Col A, Row 28 (share via col B or C at row 28) |

**How to share a pin:** ESP32's D21 pin is in column A row 25. That row's holes in columns A, B, C, D are all electrically the same node (breadboard rule). Plug the PN532's SDA wire into column B row 25 (or C or D) — same electrical connection.

---

## 2.4 LCD1602A with I²C backpack

Your LCD1602A has an I²C backpack soldered to the back (16-pin to 4-pin adapter). Only 4 wires needed.

### Connect the LCD1602A:
| LCD pin | Connect to | Breadboard row/col |
|---|---|---|
| GND | – rail | – rail |
| VCC | + rail (⚠️ 5V, NOT 3.3V — LCD needs 5V for backlight) | **top-right + rail (5V)** |
| SDA | ESP32 `D21` (shared with PN532) | Col C row 25 |
| SCL | ESP32 `D22` (shared with PN532) | Col C row 28 |

**⚠️ Important:** The LCD1602's I²C backpack has a 3.3V-tolerant logic input, but backlight needs 5V. Use the 5V rail for VCC.

**I²C addresses on the bus (all coexist):**
- PN532: 0x24
- PCA9685: 0x40
- LCD1602A: 0x27 (or 0x3F — code auto-detects)

---

## 2.5 PCA9685 Servo Driver

The PCA9685 is a small blue board with 16 pairs of servo pin headers on top and a green screw terminal on one end for V+ (servo power).

### Physical placement:
Place the PCA9685 horizontally on the breadboard at **rows 5-8**, straddling the gap. It has 6 pins on one side that plug into the breadboard.

### Connect the PCA9685:

| PCA9685 pin | Connect to | Notes |
|---|---|---|
| GND (leftmost) | – rail | Black wire |
| OE | (leave unconnected) | Default is enabled |
| SCL | ESP32 `D22` | Shares I²C bus, col D row 28 |
| SDA | ESP32 `D21` | Shares I²C bus, col D row 25 |
| VCC | + rail (3.3V) | Logic power — red wire |
| **V+ (green screw terminal)** | **MB102 5V output OR top-right + rail (5V)** | This powers the SERVOS — thick red wire |
| **GND (green screw terminal, next to V+)** | **MB102 GND / – rail** | Servo ground — thick black wire |

**⚠️ Critical:** The green screw terminal V+ is the **servo power** — this is what feeds the 4 servos. It MUST come from the MB102 (5V, up to 3A) NOT from the ESP32 (only 500mA max on USB).

Once wired:
- The PCA9685 logic is powered by ESP32 3.3V (VCC pin)
- The servos are powered by MB102 5V (green terminal V+)
- I²C bus is shared with all other I²C devices

### Servo channels on PCA9685:
The PCA9685 has 16 output channels labeled 0-15. Each channel has 3 pins: **GND | V+ | Signal**.

For your 4 servos (2 per door):
- **Channel 0**: Door 1 servo A (left)
- **Channel 1**: Door 1 servo B (right)
- **Channel 2**: Door 2 servo A (left)
- **Channel 3**: Door 2 servo B (right)

### How to plug in a servo:
Servos have 3 wires with a female Dupont connector:
- Brown or Black = GND
- Red = V+ (5V)
- Orange or Yellow or White = Signal

Plug the Dupont directly onto channel 0's 3 pins (or 1, 2, 3). **Orientation matters** — the GND wire (brown/black) must line up with the "GND" side of the channel. On the PCA9685, GND is usually the bottom pin (marked black on silkscreen) and Signal is the top (marked yellow).

**Repeat for servos 1, 2, 3 on channels 1, 2, 3.**

---

## 2.6 KY-022 IR Receiver

### Physical placement:
Place the KY-022 module on the breadboard at rows 40-42, columns A-C. The 3 pins line up in one row.

### Connect the KY-022:
| KY-022 pin (silkscreen) | Connect to | Wire |
|---|---|---|
| **G** (GND, leftmost) | – rail | Black |
| **R** (VCC, middle) | + rail (3.3V) | Red |
| **Y** (Signal, rightmost) | ESP32 `D27` (Col J, Row 21) | Orange |

Point the black dome of the KY-022 toward where you'll be pointing the remote (aim it at where you'll sit during demos).

---

## 2.7 Tactile push button (physical backup power kill)

Even though the IR remote is primary, having a physical button is smart engineering — remote batteries die.

### Physical placement:
Standard 4-pin tactile button straddles the center gap at rows 35-36. It has 4 pins:
- Pin 1 (top-left) and Pin 2 (top-right) are internally connected
- Pin 3 (bottom-left) and Pin 4 (bottom-right) are internally connected
- When pressed, all 4 pins are connected

### Connect the push button:
Place the button with pins in **rows 35 (top) and 37 (bottom), straddling the center gap** so:
- Pin at col E row 35 (top-left) → 1 side
- Pin at col F row 35 (top-right) → other side
- Pin at col E row 37 → same node as col E row 35
- Pin at col F row 37 → same node as col F row 35

Wire:
- **Col A row 35** → jumper to → ESP32 `D16` / RX2 (col A row 20). This gives us the button's "signal" side.
- **Col J row 35** → jumper to → – rail (GND). This is the button's "grounded" side.

When pressed, D16 gets pulled to GND. When released, internal pull-up keeps it HIGH.

**In software:** press = LOW, release = HIGH. Long press (>2 seconds) = force STANDBY state.

---

## 2.8 (Optional) 5V Relay module

**Since we're using the PCA9685, the servos are already power-isolated via the PCA9685's V+ terminal.** To fully cut servo power in STANDBY mode:

Option A — **Software only (recommended for simplicity):**
The PCA9685 has a "sleep" mode that turns off all servo outputs. In STANDBY, we call `pwm.sleep()` and servos go limp. No relay needed. **This is what my code does.**

Option B — **Hardware relay (only if you insist):**
Place relay module at rows 55-58, left side.
- VCC → 5V rail
- GND → – rail
- SIG → ESP32 D14 (col J row 20)
- COM (screw) → MB102 5V output
- NO (screw) → PCA9685 V+ (green terminal)

Then in code, `digitalWrite(RELAY_PIN, HIGH)` = servos powered, `LOW` = servos dead.

**My recommendation: skip the relay.** `pwm.sleep()` on the PCA9685 achieves the same effect in software, cleaner, no extra failure point. The code below includes both approaches with a `#define USE_RELAY 0` flag.

---

## 2.9 (Fallback) If you can't get a PCA9685: Direct GPIO servos

If the PCA9685 doesn't arrive in time, you can drive 4 servos directly from ESP32 GPIOs. This uses more pins and produces slightly worse motion smoothness but works.

Direct connections:
- Servo 1 signal → ESP32 D15 (Col A Row 17)
- Servo 2 signal → ESP32 D17 / TX2 (Col A Row 21)
- Servo 3 signal → ESP32 D25 (Col J Row 23)
- Servo 4 signal → ESP32 D26 (Col J Row 22)

All 4 servos' V+ → MB102 5V rail. All 4 GND → common GND.

Code fallback is included in the sketch below (toggle `#define USE_PCA9685 1` to `0`).

---

# 💻 PART 3 — SOFTWARE

## 3.1 Arduino IDE setup

### Step 3.1.1 — Install ESP32 board package
1. Open Arduino IDE
2. `File → Preferences`
3. In "Additional Board Manager URLs" paste:
   `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
4. Click OK
5. `Tools → Board → Boards Manager`
6. Search "esp32" → install "esp32 by Espressif Systems" (latest version)

### Step 3.1.2 — Select the right board
`Tools → Board → esp32 → ESP32 Dev Module`

Set:
- **Upload Speed**: 921600
- **CPU Frequency**: 240MHz
- **Flash Frequency**: 80MHz
- **Flash Mode**: QIO
- **Flash Size**: 4MB
- **Partition Scheme**: Default 4MB with spiffs
- **Core Debug Level**: None
- **PSRAM**: Disabled

### Step 3.1.3 — Install all required libraries

`Tools → Manage Libraries` — search and install each:

| Library | Author | Purpose |
|---|---|---|
| **Adafruit PN532** | Adafruit | RFID/NFC reader |
| **Adafruit BusIO** | Adafruit | I²C helper (dependency) |
| **Adafruit GFX Library** | Adafruit | Graphics primitives |
| **Adafruit ILI9341** | Adafruit | TFT display |
| **Adafruit PWM Servo Driver** | Adafruit | PCA9685 servo driver |
| **LiquidCrystal I2C** | Frank de Brabander | LCD1602 with I²C backpack |
| **IRremote** | shirriff, z3t0, ArminJo | IR remote decoding (v4+) |
| **WiFiManager** | tzapu | WiFi captive portal |
| **ArduinoJson** | Benoit Blanchon | JSON parsing for API responses |
| **ESP32Servo** (fallback only) | Kevin Harrington | Direct GPIO servos if no PCA9685 |

---

## 3.2 Sketch 1 — IR code discovery

**Purpose:** Capture the exact hex code your ELEGOO red POWER button sends. **Do this ONCE, before the main sketch.**

### 3.2.1 — Upload this sketch

Save as `01_ir_discover/01_ir_discover.ino`:

```cpp
/*
 * IR Code Discovery Sketch
 * Purpose: Read hex codes from your ELEGOO IR remote
 * 
 * Wiring:
 *   KY-022 G  -> GND
 *   KY-022 R  -> 3.3V
 *   KY-022 Y  -> ESP32 GPIO 27
 * 
 * Instructions:
 *   1. Upload this sketch
 *   2. Open Serial Monitor at 115200 baud
 *   3. Point your ELEGOO remote at the receiver
 *   4. Press the RED POWER button (top-left of remote)
 *   5. Copy the hex code that appears (e.g., 0xFFA25D)
 *   6. Also press all other buttons you plan to use and write down their codes
 *   7. Paste the codes into gate_controller.ino at the marked spot
 */

#include <IRremote.hpp>

#define IR_RECEIVE_PIN 27

void setup() {
  Serial.begin(115200);
  delay(500);
  Serial.println();
  Serial.println("=====================================");
  Serial.println("  IR CODE DISCOVERY SKETCH");
  Serial.println("=====================================");
  Serial.println();
  Serial.println("Point your ELEGOO remote at the KY-022");
  Serial.println("Press buttons - codes will appear below.");
  Serial.println();
  Serial.print("Ready! (Receiver on GPIO ");
  Serial.print(IR_RECEIVE_PIN);
  Serial.println(")");
  Serial.println();
  
  IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);
}

void loop() {
  if (IrReceiver.decode()) {
    // Print raw command
    Serial.print("Protocol: ");
    Serial.print(getProtocolString(IrReceiver.decodedIRData.protocol));
    Serial.print(" | Address: 0x");
    Serial.print(IrReceiver.decodedIRData.address, HEX);
    Serial.print(" | Command: 0x");
    Serial.print(IrReceiver.decodedIRData.command, HEX);
    Serial.print(" | Raw: 0x");
    Serial.println(IrReceiver.decodedIRData.decodedRawData, HEX);
    
    // Filter out repeat codes
    if (IrReceiver.decodedIRData.flags & IRDATA_FLAGS_IS_REPEAT) {
      Serial.println("  (repeat - ignoring)");
    } else {
      Serial.println("  ^^ USE THIS CODE ^^");
      Serial.println();
    }
    
    IrReceiver.resume();
  }
}
```

### 3.2.2 — Run the sketch

1. Upload the sketch (Ctrl+U)
2. Open Serial Monitor (Ctrl+Shift+M)
3. Set baud rate to **115200**
4. Point the ELEGOO remote at the KY-022
5. Press the **red POWER button** → note the hex code
6. Press each other button you plan to use and note them all:

| Button | What it will do | Note the hex code here |
|---|---|---|
| ⏻ POWER (red, top-left) | Toggle STANDBY / ACTIVE | 0x________ |
| VOL+ | (unused, save anyway) | 0x________ |
| VOL– | (unused, save anyway) | 0x________ |
| EQ | Force reset to STANDBY | 0x________ |
| Play/Pause | Manual door open (both doors) | 0x________ |
| 1 | Manual door 1 open | 0x________ |
| 2 | Manual door 2 open | 0x________ |
| 0 | Close all doors | 0x________ |

### 3.2.3 — Write the codes into the main sketch

In `gate_controller.ino` (Sketch 2 below), find this block near the top:

```cpp
// ============ IR CODES (from ELEGOO remote) ============
// FILL THESE IN AFTER RUNNING 01_ir_discover.ino
#define IR_POWER    0x45   // Red power button — PLACEHOLDER, replace with real code
#define IR_EQ       0x09   // EQ button — force reset
#define IR_PLAY     0x43   // Play/pause — open both doors
#define IR_1        0x16   // "1" — open door 1
#define IR_2        0x19   // "2" — open door 2
#define IR_0        0x52   // "0" — close all doors
```

**Replace each placeholder with the actual `Command:` value you got from Serial Monitor.** The code comparison is against `IrReceiver.decodedIRData.command`, which is an 8-bit value (like `0x45`), not the full 32-bit raw.

**Placeholder values are ELEGOO's factory-default codes** — they should work as-is on your specific ELEGOO remote, but VERIFY with the discovery sketch first because they can vary between remote batches.

---

## 3.3 Sketch 2 — MASTER `gate_controller.ino`

This is the full integrated sketch. Save as `gate_controller/gate_controller.ino`.

**See the complete code in `gate_controller.ino` in this folder.** It's ~800 lines and includes:

1. WiFi captive portal (first-boot setup)
2. State machine: BOOT → STANDBY ↔ ACTIVE ↔ SCANNING → APPROVED/DENIED
3. PN532 card scanning
4. TFT UI (STANDBY screen, IDLE, APPROVED, DENIED)
5. LCD1602 secondary display
6. PCA9685 4-servo control (2 per door, synchronized)
7. IR remote handling
8. Push button handling
9. HTTP POST to `/api/scan`
10. HTTP GET `/api/occupancy` for occupancy count
11. Debouncing, error recovery, watchdog

---

## 3.4 First boot — WiFi setup

1. Power on the ESP32 with the master sketch loaded
2. TFT will show: **"WiFi Setup — Connect to 'GuelphGymGate' on your phone"**
3. On your phone, open WiFi settings → connect to `GuelphGymGate` (password: `gatesetup`)
4. A captive portal opens automatically. If not, browse to `192.168.4.1`
5. Tap "Configure WiFi"
6. Select your home WiFi network
7. Enter password
8. Tap "Save"
9. ESP32 reboots and connects
10. TFT shows: **"Connected! IP: 192.168.x.x"**
11. State machine enters **STANDBY** (safe default)
12. Press red button on ELEGOO remote → enters **ACTIVE**
13. Scan a card → doors open → website counter updates

**Credentials are stored in ESP32 flash. This setup only happens once.** If you want to change WiFi, hold the push button for 10 seconds while powering on → WiFi settings clear → captive portal appears again.

---

# 🧪 PART 4 — BENCH TEST PROCEDURE

Before installing under wood, verify everything on the desk:

## Test 1 — Power
- Plug in USB-C → ESP32 LED (blue) lights up
- Plug in 9V battery → MB102 red LED lights up
- Multimeter check (or LED test): 3.3V rail, 5V rail, all GND rails common

## Test 2 — I²C bus scan
Upload `test_sketches/02_i2c_scanner` — Serial Monitor should show:
```
Found device at 0x24 (PN532)
Found device at 0x27 (LCD1602)
Found device at 0x40 (PCA9685)
```
**All 3 addresses must appear.** If any missing → check SDA/SCL wiring for that device.

## Test 3 — Individual sketches (already done)
- `03_pn532_reader` — scan card, UID appears
- `04_tft_demo` — 3 screens cycle
- Servo sweep test on PCA9685 (new — see `test_sketches/07_pca9685_sweep`)

## Test 4 — IR reception
- Upload `01_ir_discover` — press ELEGOO buttons — codes appear in Serial

## Test 5 — Master sketch
- Upload `gate_controller.ino`
- Follow first-boot WiFi setup
- Enter ACTIVE via red button
- Scan card `47:07:12:5E` (Burak) → doors open, "Welcome, Burak" on TFT, occupancy updates
- Scan card `26:8C:75:E7` (Ata) → same for Ata
- Scan unknown card → red X on TFT, "Card not registered"
- Press red button again → STANDBY, screens dim, servos limp

---

# 🪵 PART 5 — WOOD HOUSING INSTALLATION

## 5.1 Cutouts you'll need
- **TFT window**: rectangular cutout ~55mm × 75mm on the front, TFT face-mounted from behind
- **PN532 reader area**: no cutout needed — the reader works through wood up to ~5mm thick. Just place it against the inside of the wood where you want people to tap.
- **LCD1602 window**: rectangular cutout ~72mm × 25mm on the front
- **IR receiver dome**: small 5mm hole for the black dome to poke through so remote line-of-sight works
- **USB-C port**: cable exit near the back or side — route the USB cable to an accessible edge of the housing
- **Servo shafts**: 2 holes per door on the door frame side, aligned with your gate mechanism

## 5.2 Mounting tips
- Use hot glue for the KY-022, LCD1602, TFT
- Use screws for the servos (they have mounting flanges)
- The breadboards can be attached with double-sided foam tape to the inside of the housing
- MB102 mounts with screws or foam tape

## 5.3 Cable routing
- Keep power wires (5V, GND) away from I²C wires when possible — reduces noise
- Route the USB-C cable to exit at a hidden spot for occasional maintenance
- If IR range is poor through the small hole, drill it slightly larger or use a longer IR receiver cable

---

# 🔧 PART 6 — TROUBLESHOOTING QUICK REFERENCE

| Problem | Cause | Fix |
|---|---|---|
| TFT is white / blank | Power or reset issue | Check 3.3V, verify TFT_RESET pin connection |
| PN532 doesn't detect cards | Power, I²C address, or DIP switches | Run I²C scanner — must see 0x24. Check DIP switches on back of PN532 (SEL0=ON, SEL1=OFF for I²C) |
| LCD1602 backlight off but shows nothing | I²C address wrong | Change `LCD_ADDR` from `0x27` to `0x3F` in code |
| Servos jitter or don't move | Underpowered — USB can't supply | Confirm MB102 is powering PCA9685 V+ (not the ESP32) |
| Only 1 servo works | Bad channel or bad servo | Swap servo to another channel to isolate |
| IR remote doesn't respond | Wrong hex code or line-of-sight | Re-run `01_ir_discover`, verify code, aim carefully at dome |
| WiFi captive portal not appearing | Phone auto-detection issue | Manually browse to `192.168.4.1` after connecting |
| ESP32 upload fails "Failed to connect" | ESP32 in wrong mode | Hold BOOT button, tap EN button, release BOOT — try upload immediately |
| Website counter doesn't update | Wrong API secret or WiFi drop | Serial Monitor will show HTTP response codes — check for 401 (wrong secret) or timeout |
| ESP32 reboots randomly | Voltage sag or watchdog | Ensure MB102 is well-connected, check 9V battery voltage |

---

# 📋 PART 7 — FINAL DELIVERY CHECKLIST

Before you say "the project is done":

- [ ] All 2 breadboards physically joined and power rails bridged
- [ ] ESP32 straddling center gap, all pins accessible
- [ ] TFT working (showing STANDBY screen after boot)
- [ ] LCD1602 working (showing "STANDBY" text)
- [ ] PN532 detected on I²C scan (0x24)
- [ ] PCA9685 detected on I²C scan (0x40)
- [ ] LCD1602 detected on I²C scan (0x27)
- [ ] All 4 servos move when the master sketch commands them
- [ ] KY-022 IR receiver captures ELEGOO remote codes
- [ ] Red POWER button toggles STANDBY ↔ ACTIVE correctly
- [ ] Push button also toggles state (physical backup)
- [ ] Registered cards (47:07:12:5E, 26:8C:75:E7) open the doors
- [ ] Unknown cards trigger DENIED state with red X
- [ ] Website `guelph-gym-live-counter.vercel.app` updates counter on each scan
- [ ] WiFi survives ESP32 reboot (credentials in flash)
- [ ] All wiring hidden inside wood housing
- [ ] USB-C cable routed to accessible spot for emergency reboot
- [ ] IR remote works from at least 2 meters away through the dome hole
- [ ] Full run-through: press remote → scan Burak's card → both doors open → website shows +1 occupancy → wait 3s → scan Burak's card again → doors close → website shows -1 → press remote → everything dims to STANDBY

---

**End of master build guide.**
The actual code file `gate_controller.ino` is in the same folder.

