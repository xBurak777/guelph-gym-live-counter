# Arduino IDE Setup and Upload

## Install the Toolchain

1. Install Arduino IDE 2.x from [Arduino Software](https://www.arduino.cc/en/software).
2. Open **File > Preferences**.
3. Add this Boards Manager URL:

   ```text
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```

4. Open **Tools > Board > Boards Manager**.
5. Search for `esp32` and install **esp32 by Espressif Systems**.
6. Select **Tools > Board > esp32 > ESP32 Dev Module**.
7. Select the serial port that appears when the ESP32 is connected.

If the port does not appear, verify the USB cable supports data and install the USB-to-serial driver used by the specific ESP32 board.

## Install Required Libraries

Open **Sketch > Include Library > Manage Libraries** and install:

| Library | Purpose |
|---|---|
| Adafruit PN532 | PN532 RFID/NFC reader |
| Adafruit BusIO | Adafruit transport dependency |
| Adafruit GFX Library | TFT graphics |
| Adafruit ILI9341 | TFT controller |
| ESP32Servo | Servo PWM |
| ArduinoJson | API JSON request/response |
| IRremote | `TinyIRReceiver.hpp` for remote input |
| LiquidCrystal | Parallel LCD1602 driver, normally bundled with Arduino IDE |

The verified project record used Adafruit PN532 1.3.4, Adafruit GFX 1.12.6, IRremote 4.7.1, ESP32Servo 0.13.0, and ArduinoJson 6.21.6. Compatible later versions may compile but should be regression-tested before a presentation.

## Open the Final Sketch

1. Clone or download the repository.
2. In Arduino IDE, open:

   ```text
   arduino/gate_controller/gate_controller.ino
   ```

3. Confirm `config.h` appears as a second tab in the same sketch folder.

## Configure Private Values

Edit only your local copy of `config.h`:

```cpp
#define WIFI_SSID "YOUR_2_4_GHZ_WIFI_NAME"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"
#define API_BASE_URL "https://guelph-gym-live-counter.vercel.app"
#define SCAN_API_SECRET "YOUR_MATCHING_VERCEL_SECRET"
#define GATE_ID "gate-1"
```

Rules:

- ESP32 requires a compatible 2.4 GHz Wi-Fi network.
- `SCAN_API_SECRET` must exactly match the Vercel environment variable.
- Do not add a trailing slash to `API_BASE_URL`.
- Never commit the real values.

## Recommended Board Settings

| Arduino IDE setting | Value |
|---|---|
| Board | ESP32 Dev Module |
| Upload speed | 921600, or 115200 if upload is unreliable |
| CPU frequency | 240 MHz |
| Flash frequency | 80 MHz |
| Flash mode | QIO |
| Flash size | 4 MB |
| Partition scheme | Default 4 MB with SPIFFS |
| Core debug level | None |

## Compile and Upload

1. Disconnect mechanical loads if the gate could move unexpectedly.
2. Click **Verify**.
3. Resolve every missing-library error before continuing.
4. Click **Upload**.
5. If the IDE remains at `Connecting`, hold the ESP32 BOOT button until writing begins.
6. Open Serial Monitor at **115200 baud**.
7. Press the ESP32 EN/reset button once.

Expected boot milestones include:

```text
GRYPHON ACCESS UI REAL LOGO + LIVE WEBSITE
GATE SERVOS READY: A=90, B=90
Starting PN532...
PN532 finite scan mode configured.
SYSTEM READY
```

The system intentionally starts in STOPPED mode. Press the Elegoo remote's red POWER button to enter ACTIVE mode.

## Website Environment

The web application requires these Vercel or local environment values:

```text
DATABASE_URL
SCAN_API_SECRET
GYM_MAX_CAPACITY
GYM_NAME
GYM_ADDRESS
```

`SCAN_API_SECRET` must be identical on the server and ESP32. After changing a Vercel environment variable, redeploy the website so the production function receives the new value.

## Credential Hygiene Before Git

Before committing:

```bash
git diff -- arduino/gate_controller/config.h
```

Confirm the file still contains only placeholder credentials. If real values appear, restore the public placeholders before pushing.
