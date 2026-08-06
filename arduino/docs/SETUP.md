# ESP32 Setup Guide

> Get your PC talking to the ESP32 and upload the gate controller firmware.
> Estimated time: 20-30 minutes the first time.

---

## Step 1 — Install Arduino IDE 2.x

Download and install the latest Arduino IDE 2.x from [arduino.cc/en/software](https://www.arduino.cc/en/software).

Open it once so it creates the `Documents/Arduino/libraries` folder.

---

## Step 2 — Add ESP32 board support

1. Arduino IDE → **File → Preferences**
2. In "Additional Boards Manager URLs", paste:
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
3. Click OK.
4. Go to **Tools → Board → Boards Manager**, search for `esp32`, install **"esp32 by Espressif Systems"** (version 3.x or newer).
5. Once installed, go to **Tools → Board → esp32** and select **"ESP32 Dev Module"**.

---

## Step 3 — Install USB-to-serial drivers

The ELEGOO ESP32 uses the **CP2102** USB-to-serial chip (some boards use CH340).

- Windows: [SiLabs CP210x driver](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers) — install and reboot.
- Mac: usually works out of the box on macOS 11+. If not, install the same CP210x driver.
- Linux: works out of the box (device shows up as `/dev/ttyUSB0`).

Plug in the ESP32 via USB-C. In Arduino IDE, go to **Tools → Port** and select the new COM port (Windows) or `/dev/tty.SLAB_USBtoUART` (Mac) or `/dev/ttyUSB0` (Linux).

---

## Step 4 — Install required libraries

Arduino IDE → **Sketch → Include Library → Manage Libraries...**

Search and install each of these (exact names in bold):

| Library                       | Author              | Purpose                            |
|-------------------------------|---------------------|------------------------------------|
| **WiFiManager**               | tzapu               | Captive-portal WiFi config         |
| **ArduinoJson**               | Benoit Blanchon     | Parse the /api/scan response       |
| **Adafruit PN532**            | Adafruit            | NFC/RFID driver                    |
| **LiquidCrystal I2C**         | Frank de Brabander  | 16x2 LCD driver (I2C variant)      |
| **Adafruit GFX Library**      | Adafruit            | Graphics primitives                |
| **Adafruit ILI9341**          | Adafruit            | TFT driver                         |
| **ESP32Servo**                | Kevin Harrington    | Servo control on ESP32             |
| **Adafruit BusIO**            | Adafruit            | (dependency of PN532/ILI9341)      |

When Arduino IDE asks "install dependencies?" click **Install all**.

---

## Step 5 — Open the gate controller sketch

1. Clone or download the repo:
   ```
   git clone https://github.com/xBurak777/guelph-gym-live-counter.git
   ```
2. In Arduino IDE: **File → Open** → navigate to `arduino/gate_controller/gate_controller.ino`.
3. Arduino IDE will open both `gate_controller.ino` and `config.h` in tabs.

---

## Step 6 — Edit `config.h` with YOUR settings

Only three lines need editing on first setup:

```c
#define API_BASE_URL "https://guelph-gym-live-counter.vercel.app"
#define SCAN_API_SECRET "dev-shared-secret-change-in-prod-b7f9e3a1c4d8"
#define GATE_ID "gate-1"
```

**About `SCAN_API_SECRET`:**
This must match the `SCAN_API_SECRET` environment variable set on Vercel. To check or set it:

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Open the `guelph-gym-live-counter` project
3. **Settings → Environment Variables**
4. Look for `SCAN_API_SECRET`. If it doesn't exist:
   - Click "Add New"
   - Name: `SCAN_API_SECRET`
   - Value: paste any long random string (e.g. use `openssl rand -hex 32`)
   - Environments: check all three (Production, Preview, Development)
   - Click Save
   - Trigger a redeploy of the project (Deployments → three dots → Redeploy)
5. Copy the exact value into `SCAN_API_SECRET` in `config.h`.

---

## Step 7 — Configure board settings

In Arduino IDE, go to **Tools** and set:

| Setting                     | Value                                    |
|-----------------------------|------------------------------------------|
| Board                       | ESP32 Dev Module                         |
| Upload Speed                | 921600                                   |
| CPU Frequency               | 240MHz (WiFi/BT)                         |
| Flash Frequency             | 80MHz                                    |
| Flash Mode                  | QIO                                      |
| Flash Size                  | 4MB (32Mb)                               |
| Partition Scheme            | Default 4MB with spiffs                  |
| Core Debug Level            | None                                     |
| Erase All Flash Before Upload | Disabled                               |
| Port                        | (whatever showed up when you plugged in) |

---

## Step 8 — Compile

Click the **checkmark** (Verify) button in the top-left of Arduino IDE.

First compile will take 1-2 minutes because it's compiling all the ESP32 libraries. Subsequent compiles are much faster.

**Expected result:** No errors, ends with something like:
```
Sketch uses 950,236 bytes (72%) of program storage space.
Global variables use 42,548 bytes (12%) of dynamic memory.
```

If you get a red error about a missing library — install it from Library Manager (step 4).

---

## Step 9 — Upload

Click the **arrow** (Upload) button next to the Verify button.

Watch the black area at the bottom. You should see:
```
Connecting.....____....
Chip is ESP32-D0WD-V3 (revision v3.1)
...
Writing at 0x00010000... (100 %)
Wrote 950240 bytes (610224 compressed) at 0x00010000 in 8.4 seconds
Hash of data verified.
Leaving...
Hard resetting via RTS pin...
```

**If it fails with "Failed to connect: Timed out waiting for packet header":**
- Hold down the **BOOT** button on the ESP32 while it says "Connecting..."
- Release the BOOT button once "Writing at..." appears.
- Some ESP32 boards need this manual bootloader entry; ELEGOO's usually don't but sometimes do.

---

## Step 10 — Open Serial Monitor

Click the **magnifying glass** icon in the top-right of Arduino IDE.

Set baud rate to **115200** in the dropdown at the bottom-right.

Reset the ESP32 (press the EN/RST button). You should see:

```
=====================================
Guelph Fit & Rec Gate Controller v1.0
=====================================
Found PN532, firmware version: 0x1B4B0700
Connecting WiFi...
```

If it can't find saved WiFi:
```
*wm:AutoConnect
*wm:Connect failed. Starting portal
*wm:StartAP with SSID: GuelphGymGate-Setup
```

Now open your phone's WiFi settings, connect to **"GuelphGymGate-Setup"** (password: `gatesetup`), and a captive portal will pop up automatically. Choose your real home WiFi from the list and enter its password. The ESP32 will save it and reboot connected.

**Once connected:**
```
WiFi connected. IP: 192.168.1.42
```

The LCD will now show `Tap your card / Guelph Fit&Rec` and the TFT will show a big yellow "Tap Your Card" screen.

---

## Step 11 — Register your first test card

The `/api/scan` endpoint on the website only accepts cards that exist in the `Member` table with a matching `cardUid`. There's no UI to register cards yet, so you have two options:

### Option A — Add a card via Neon SQL

1. Go to [console.neon.tech](https://console.neon.tech) → your project → SQL Editor.
2. Tap your MIFARE fob on the PN532. Serial Monitor will print:
   ```
   Card scanned: 04:A2:B1:8C
   ```
3. In Neon SQL Editor, run:
   ```sql
   INSERT INTO "Member" (id, "firstName", "lastName", "cardUid", "membershipTier", "membershipStart", "membershipEnd", "isActive")
   VALUES ('test-1', 'Burak', 'Aksoy', '04:A2:B1:8C', 'STANDARD', NOW(), NOW() + INTERVAL '1 year', true);
   ```
   Replace `04:A2:B1:8C` with your actual UID from the serial monitor.
4. Tap the fob again. This time you should see the door swing open and the TFT go green.

### Option B — Small admin script (better long term)

I can build you a `/admin/cards` page later where you scan a card, and it POSTs to `/api/register-card` to register it under a member. Ask when you want it.

---

## Troubleshooting

| Symptom                                        | Likely cause                                 | Fix                                      |
|------------------------------------------------|----------------------------------------------|------------------------------------------|
| "PN532 not found" on boot                      | DIP switch not in I2C mode                   | Set SET0 = ON, SET1 = OFF                |
| LCD backlight on, no text                      | Wrong I2C address                            | Run I2C scanner, update `LCD_I2C_ADDR`   |
| TFT screen is white / black                    | Missing LED pin connection                   | Connect TFT LED to 3.3V or 5V            |
| Servos twitch but don't move                   | Powered from ESP32 instead of external 5V    | Use external 5V, share GND               |
| ESP32 keeps resetting when servos move         | Voltage sag — servos pulling too much current | Add 220uF cap, use 5V/2A supply         |
| HTTP -1 error in serial monitor                | WiFi disconnected or wrong URL               | Check `API_BASE_URL`, ping the site      |
| HTTP 401 error                                 | Wrong `SCAN_API_SECRET`                      | Match it exactly with Vercel env var     |
| HTTP 200 but card denied                       | Card UID not in Member table                 | Register it (Step 11)                    |
| Everything works but door doesn't open         | Servo signals swapped, or `DOOR_OPEN_ANGLE` wrong | Try 0, 45, 90 in `config.h`         |
