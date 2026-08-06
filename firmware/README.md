# Firmware — RFID Gate Controller

ESP32 firmware for the Guelph Gym Live Counter RFID gate demo.

## Structure

```
firmware/
├── gate_controller/          Full production firmware (state machine + WiFi + API)
├── test_sketches/            Incremental bench tests (run in order)
│   ├── 01_blink/
│   ├── 02_i2c_scanner/
│   └── 03_pn532_reader/
└── docs/                     Wiring diagrams, setup notes, test procedures
```

## Build sequence

Each phase must pass before moving to the next. Test sketches live in `test_sketches/` and are numbered by order.

| Phase | What                                | Test sketch          | Status  |
| ----- | ----------------------------------- | -------------------- | ------- |
| A     | Arduino IDE + ESP32 upload path     | `01_blink`           | ✅ done |
| B.1   | PN532 I2C wiring                    | `02_i2c_scanner`     | ✅ done |
| B.1.5 | PN532 reads real cards              | `03_pn532_reader`    | ✅ done |
| B.2   | TFT ILI9341 graphics + UI preview   | `04_tft_demo`        | ✅ done |
| B.3   | SG90 servo motion                   | `05_servo_sweep`     | pending |
| C     | WiFi captive portal (WiFiManager)   | `06_wifi_portal`     | pending |
| D     | Full firmware, card registration    | `gate_controller`    | pending |
| E     | Two-servo dual-lane build           | `gate_controller`    | pending |

## Hardware

| Part           | Model                          | Notes                                        |
| -------------- | ------------------------------ | -------------------------------------------- |
| MCU            | ESP32 Dev Module (30-pin)      | Built-in WiFi + Bluetooth                    |
| NFC reader     | HiLetgo PN532 V3               | I2C mode; antenna coil on front              |
| Test cards     | Mifare Classic S50 (1K)        | 4-byte UIDs; 2 cards on hand                 |
| Display        | DIYmalls 2.8" SPI TFT (ILI9341)| SPI + optional touch                         |
| Actuator       | SG90 micro servo (x2)          | 5V from separate rail (not ESP32 VIN)        |
| Power          | Type-C USB (dev), 5V 2A (prod) | Servos draw stall current — use external 5V  |

## Pin plan (from `gate_controller/config.h`)

| Signal        | GPIO   |
| ------------- | ------ |
| I2C SDA       | 21     |
| I2C SCL       | 22     |
| PN532 IRQ     | 32     |
| PN532 RESET   | 33     |
| TFT CS        | 5      |
| TFT DC        | 2      |
| TFT RESET     | 4      |
| TFT SCK       | 18 (HW SPI) |
| TFT MOSI      | 23 (HW SPI) |
| Servo TOP     | 25     |
| Servo BOTTOM  | 26     |

## API integration

The full `gate_controller` firmware POSTs scan events to the live Vercel deployment:

- `POST https://guelph-gym-live-counter.vercel.app/api/scan`
  - Body: `{ "uid": "47:07:12:5E", "device_id": "gate-01" }`
  - Auth: shared secret header (see `config.h`)
  - Response: `{ "allow": true, "name": "Burak Aksoy" }` or `{ "allow": false, "reason": "unknown_card" }`

## Author

Burak Aksoy — full-stack developer / project lead.
