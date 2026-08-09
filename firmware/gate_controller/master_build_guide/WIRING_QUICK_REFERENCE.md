# WIRING QUICK REFERENCE — Print this and keep at your workbench

## Combined breadboard layout (2 boards joined end-to-end, 120 rows total)

```
+---------------------------------------------------------------+
|  +  -  A B C D E [gap] F G H I J  -  +   ROW  <-- pin labels  |
+---------------------------------------------------------------+
              PCA9685 SERVO DRIVER (horizontal, rows 5-8)
              GND OE SCL SDA VCC | V+ terminal (green screw)
                                             +----> to MB102 5V
                                             +----> to MB102 GND
+---------------------------------------------------------------+
              ESP32 DevKit V1 (vertical, straddling gap, rows 15-30)
              LEFT pins in col E, RIGHT pins in col F
+---------------------------------------------------------------+
              Push button (4-pin, rows 35-37, straddles gap)
              Col E-F rows 35 & 37 (all 4 pins)
+---------------------------------------------------------------+
              KY-022 IR receiver (rows 40-42, cols A-C)
              G(GND) | R(VCC) | Y(Signal)
+---------------------------------------------------------------+
              [Space for future components, rows 45-55]
+---------------------------------------------------------------+
              MB102 power supply (rows 60-70)
              +5V output ---> to top-right + rail
              GND output ---> to top-right - rail
+---------------------------------------------------------------+
              [Empty, rows 75-120]
+---------------------------------------------------------------+

Off-board components (connected via Dupont wires):
  - TFT screen (already wired)
  - PN532 module (via 4 wires: GND/VCC/SDA/SCL)
  - LCD1602A module (via 4 wires: GND/VCC/SDA/SCL)
  - 4 servos (plugged into PCA9685 channels 0-3)
```

## ESP32 pin assignments — MASTER TABLE

### LEFT column (col A, rows 15-30, ESP32 straddling gap)
```
Row 15  3V3   →  Red wire to top-left + rail (3.3V rail)
Row 16  GND   →  Black wire to top-left - rail
Row 17  D15   →  (unused, spare)
Row 18  D2    →  Green wire to TFT DC
Row 19  D4    →  Yellow wire to TFT RESET
Row 20  RX2/D16 →  Purple wire to Push Button one side
Row 21  TX2/D17 →  (unused, spare)
Row 22  D5    →  Blue wire to TFT CS
Row 23  D18   →  Blue wire to TFT SCK
Row 24  D19   →  Blue wire to TFT MISO
Row 25  D21   →  White wire to I2C SDA (branches to PN532/LCD1602/PCA9685)
Row 26  RX0   →  DO NOT USE (Serial)
Row 27  TX0   →  DO NOT USE (Serial)
Row 28  D22   →  White wire to I2C SCL (branches to PN532/LCD1602/PCA9685)
Row 29  D23   →  Blue wire to TFT MOSI
Row 30  GND   →  Extra black wire to - rail
```

### RIGHT column (col J, rows 15-30, ESP32 straddling gap)
```
Row 15  EN    →  (unused)
Row 16  VIN   →  (unused - powered via USB-C)
Row 17  GND   →  Extra ground
Row 18  D13   →  (unused, spare)
Row 19  D12   →  (unused - boot strap, avoid)
Row 20  D14   →  (unused, spare) — OR to Relay SIG if you use one
Row 21  D27   →  Orange wire to KY-022 Y (Signal)
Row 22  D26   →  (unused, spare)
Row 23  D25   →  (unused, spare)
Row 24  D33   →  (unused)
Row 25  D32   →  (unused)
Row 26  D35   →  (input-only, unused)
Row 27  D34   →  (input-only, unused)
Row 28  VN    →  (input-only, unused)
Row 29  VP    →  (input-only, unused)
Row 30  EN    →  (secondary reset, leave alone)
```

## Component wiring cheatsheet

### PN532 (I2C mode, DIP switches SEL0=ON, SEL1=OFF)
```
PN532        Wire       Destination
GND    →     Black  →   - rail
VCC    →     Red    →   + rail (3.3V, top-left)
SDA    →     Yellow →   ESP32 D21 (col B, row 25)
SCL    →     White  →   ESP32 D22 (col B, row 28)
```

### LCD1602A (I2C backpack)
```
LCD          Wire       Destination
GND    →     Black  →   - rail
VCC    →     Red    →   + rail (5V, top-right)
SDA    →     Yellow →   ESP32 D21 (col C, row 25)
SCL    →     White  →   ESP32 D22 (col C, row 28)
```

### PCA9685 servo driver
```
PCA9685      Wire       Destination
GND (left)   Black  →   - rail
OE           -      →   leave unconnected
SCL          White  →   ESP32 D22 (col D, row 28)
SDA          Yellow →   ESP32 D21 (col D, row 25)
VCC          Red    →   + rail (3.3V, top-left)

Green screw terminal:
V+           Thick Red →  MB102 +5V (via + rail top-right)
GND          Thick Black → MB102 GND (via - rail)

Servo outputs (16 channels, 3-pin headers):
Channel 0    →   Door 1 servo A (left side)
Channel 1    →   Door 1 servo B (right side)
Channel 2    →   Door 2 servo A (left side)
Channel 3    →   Door 2 servo B (right side)
Channels 4-15 = unused (available for expansion)

Each servo plug orientation:
  GND (brown/black) → bottom pin of channel
  V+ (red)          → middle pin
  Signal (orange)   → top pin
```

### KY-022 IR receiver
```
KY-022       Wire       Destination
G (GND)  →   Black  →   - rail
R (VCC)  →   Red    →   + rail (3.3V, top-left)
Y (Sig)  →   Orange →   ESP32 D27 (col J, row 21)
```

### Push button (4-pin tactile, straddles center gap at rows 35-37)
```
One side of button (col E row 35)  →   Purple  →   ESP32 D16 (col A, row 20)
Other side of button (col J row 35) →  Black   →   - rail
```

### TFT ILI9341 (already wired, keep as-is)
```
TFT pin    ESP32 pin        Wire color
VCC   →    3.3V rail        Red
GND   →    GND rail         Black
CS    →    D5 (row 22)      Blue
RESET →    D4 (row 19)      Yellow
DC    →    D2 (row 18)      Green
SDI   →    D23 (row 29)     Blue (MOSI)
SCK   →    D18 (row 23)     Blue (SCK)
LED   →    3.3V rail        Red (with 220Ω resistor optional)
SDO   →    D19 (row 24)     Blue (MISO)
```

### MB102 power supply
```
MB102 output               Destination
+5V (jumper set to 5V)  →  top-right + rail (via short thick red wire)
GND                     →  top-right - rail (via short thick black wire)
+3.3V output            →  not used (ESP32 provides its own 3.3V)

Input:  9V battery via barrel jack
```

## Power rail summary

```
top-left + rail   = 3.3V (from ESP32) → PN532, TFT, PCA9685 logic, IR receiver
top-left - rail   = GND
top-right + rail  = 5V (from MB102)   → LCD1602, PCA9685 V+ (servos), backup 5V
top-right - rail  = GND (bridged to top-left GND)

Bridges required (4 short jumper wires):
- top-left + to bottom-left + (bridge 3.3V rail across both breadboards)
- top-left - to bottom-left - (bridge GND rail top-to-bottom left side)
- top-right + to bottom-right + (bridge 5V rail top-to-bottom right side)
- top-right - to bottom-right - (bridge GND rail top-to-bottom right side)
- top-left - to top-right - (bridge GND common between left and right sides)
```

## Testing order

1. Power on ESP32 via USB-C only (no MB102 yet)
2. Upload `01_ir_discover.ino` — verify IR remote codes
3. Update `gate_controller.ino` with real IR codes
4. Plug in MB102 (9V battery)
5. Upload `gate_controller.ino`
6. Follow serial monitor at 115200 baud
7. Watch TFT — should show boot sequence
8. Complete WiFi setup on phone
9. TFT enters STANDBY
10. Press red POWER button on ELEGOO remote
11. TFT enters ACTIVE_IDLE, shows "TAP CARD"
12. Scan card 47:07:12:5E (Burak) → doors open, TFT shows "WELCOME BURAK"
13. Website counter increments to 1
14. Wait 4 seconds → doors close, back to IDLE
15. Scan same card again → OUT direction, counter back to 0

## Emergency reset

- Short press push button = toggle STANDBY/ACTIVE
- 10-second press push button = reset WiFi credentials (portal restarts)
- Unplug USB-C = full power off
- Physical reset button on ESP32 = software reboot
