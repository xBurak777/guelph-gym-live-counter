# Final Wiring Guide

This document matches the completed `gate_controller.ino`. Treat the firmware pin definitions and this table as the final wiring authority.

## Safety and Power Rules

1. Disconnect USB and the external servo adapter before changing wires.
2. Power the ESP32 and logic peripherals from the established ESP32/USB logic supply.
3. Power both MG996-class servos from the dedicated adjustable adapter set to approximately 6 V.
4. Connect the servo adapter ground to ESP32 ground.
5. Never connect the servo adapter positive output to ESP32 `3V3`, `VIN`, USB 5 V, or the logic positive rail.
6. Install the 1000 uF, 10 V capacitor across the servo supply near the servo connections. Capacitor positive goes to servo +6 V and capacitor negative goes to servo ground.
7. Verify adapter voltage and polarity with a multimeter before connecting either servo.

## Complete Signal Map

| ESP32 pin | Destination | Suggested wire color | Function |
|---|---|---|---|
| GPIO34 | KY-022 signal/S | White | IR input |
| GPIO21 | PN532 SDA | Green | I2C data |
| GPIO22 | PN532 SCL | Yellow | I2C clock |
| GPIO35 | PN532 IRQ | Purple | PN532 interrupt |
| GPIO13 | PN532 RESET/RSTPD_N | Blue | PN532 reset |
| GPIO16 | LCD pin 4, RS | White | LCD register select |
| GPIO19 | LCD pin 6, E/EN | Gray | LCD enable |
| GPIO4 | LCD pin 11, D4 | Green | LCD data |
| GPIO5 | LCD pin 12, D5 | Yellow | LCD data |
| GPIO2 | LCD pin 13, D6 | Blue | LCD data |
| GPIO15 | LCD pin 14, D7 | Purple | LCD data |
| GPIO32 | TFT CS | White | TFT chip select |
| GPIO33 | TFT RST/RESET | Blue | TFT reset |
| GPIO27 | TFT DC/RS | Purple | TFT data/command |
| GPIO23 | TFT MOSI/SDI | Green | SPI data |
| GPIO18 | TFT SCK/CLK | Yellow | SPI clock |
| GPIO17 | Door A servo signal | Orange/white | PWM |
| GPIO26 | Door B servo signal | Orange/white | PWM |

All logic grounds and the external servo ground must join at a common ground.

## PN532 in I2C Mode

Set the module selector switches to the module's I2C position before power-up. Switch markings vary by board revision, so use the I2C table printed on the module rather than assuming a universal switch direction.

| PN532 pin | Connect to |
|---|---|
| VCC | Logic supply specified by the module board |
| GND | Common ground |
| SDA | ESP32 GPIO21 |
| SCL | ESP32 GPIO22 |
| IRQ | ESP32 GPIO35 |
| RSTPD_N/RESET | ESP32 GPIO13 |

Keep the PN532 antenna away from metal, servo power wiring, and the TFT ribbon or wiring bundle. Mount it behind wood or plastic, not behind a metal plate.

## LCD1602 in 4-Bit Parallel Mode

This build does not use an I2C backpack or level shifter. Use the 16-pin LCD header.

| LCD pin | LCD label | Connect to |
|---:|---|---|
| 1 | VSS | Common ground |
| 2 | VDD | LCD supply used by the verified build |
| 3 | VO | Contrast potentiometer wiper |
| 4 | RS | ESP32 GPIO16 |
| 5 | RW | Common ground |
| 6 | E/EN | ESP32 GPIO19 |
| 7 | D0 | Not connected |
| 8 | D1 | Not connected |
| 9 | D2 | Not connected |
| 10 | D3 | Not connected |
| 11 | D4 | ESP32 GPIO4 |
| 12 | D5 | ESP32 GPIO5 |
| 13 | D6 | ESP32 GPIO2 |
| 14 | D7 | ESP32 GPIO15 |
| 15 | A/LED+ | Backlight positive through the module's required current limiting |
| 16 | K/LED- | Common ground |

For a standard 10 kOhm contrast potentiometer, connect one outer leg to LCD supply, the other outer leg to ground, and the center wiper to LCD pin 3.

## ILI9341 TFT

| TFT pin label | Connect to |
|---|---|
| VCC | Supply used by the verified TFT module |
| GND | Common ground |
| CS | ESP32 GPIO32 |
| RESET/RST | ESP32 GPIO33 |
| DC/RS | ESP32 GPIO27 |
| MOSI/SDI | ESP32 GPIO23 |
| SCK/CLK | ESP32 GPIO18 |
| MISO/SDO | Not used by the final firmware |
| LED | Backlight supply appropriate for the specific TFT module |

Touch-controller pins, if present, are not used. The firmware initializes VSPI at 1 MHz for reliable rendering with the final module.

## KY-022 IR Receiver

Confirm the pin order printed on the receiver module. Do not identify power pins by physical left/right position because module layouts differ.

| KY-022 label | Connect to |
|---|---|
| S/OUT | ESP32 GPIO34 |
| +/VCC | Module logic supply |
| -/GND | Common ground |

The final remote command is NEC `0x45`, normally the red POWER button on the Elegoo remote.

## Two MG996-Class Servos

| Connection | Door A | Door B |
|---|---|---|
| Signal | ESP32 GPIO17 | ESP32 GPIO26 |
| Positive | External servo +6 V | External servo +6 V |
| Ground | External servo ground/common ground | External servo ground/common ground |

Typical servo colors are red for positive, brown or black for ground, and orange, yellow, or white for signal. Confirm the colors supplied with the actual servo.

The final positions are:

```text
Closed: Door A 90 degrees, Door B 90 degrees
Open:   Door A 0 degrees,  Door B 180 degrees
```

Mount each servo horn at the closed 90-degree command before mechanically attaching the door linkage. This prevents the linkage from forcing the servo beyond its safe travel.

## Pre-Power Inspection

- [ ] Servo adapter is disconnected while inspecting.
- [ ] No positive rail is shorted to ground.
- [ ] Servo positive is isolated from the ESP32 logic positive rail.
- [ ] Servo adapter output measures approximately 6 V with correct polarity.
- [ ] Capacitor stripe/negative lead goes to servo ground.
- [ ] Every device ground and servo supply ground is common.
- [ ] PN532 is configured for I2C.
- [ ] LCD RW is grounded and D0 through D3 are unconnected.
- [ ] TFT MISO and touch pins are unconnected unless separately required.
- [ ] Servo horns and doors move freely without binding.

After the inspection, power the ESP32 first, then enable the servo supply. At boot, both servo commands initialize to 90 degrees and the system remains STOPPED until the IR POWER command is received.
