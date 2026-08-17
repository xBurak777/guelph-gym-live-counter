# Final ESP32 Gate Firmware

This directory contains the final verified firmware for the Guelph Gym Live Counter RFID gate prototype.

## Production Files

```text
gate_controller/
├── gate_controller.ino
└── config.h
```

- `gate_controller.ino` contains the PN532 reader, TFT and LCD interfaces, IR control, synchronized servo state machine, Wi-Fi client, and `/api/scan` integration.
- `config.h` contains safe public placeholders for local Wi-Fi and the shared API secret.

## Final Hardware Interfaces

| Device | Interface | ESP32 pins |
|---|---|---|
| PN532 | I2C | SDA 21, SCL 22, IRQ 35, RESET 13 |
| LCD1602 | 4-bit parallel | RS 16, EN 19, D4 4, D5 5, D6 2, D7 15 |
| ILI9341 TFT | VSPI | CS 32, RST 33, DC 27, MOSI 23, SCK 18 |
| Door A servo | PWM | 17 |
| Door B servo | PWM | 26 |
| KY-022 IR receiver | NEC IR | 34 |

## Documentation

- [WIRING.md](./docs/WIRING.md): exact final connections and power separation
- [SETUP.md](./docs/SETUP.md): Arduino IDE, libraries, configuration, compile, and upload
- [TESTING.md](./docs/TESTING.md): final acceptance and troubleshooting procedure

The servos require a dedicated supply set to approximately 6 V. Servo supply ground and ESP32 ground must be common, but servo positive must not be connected to an ESP32 power pin.
