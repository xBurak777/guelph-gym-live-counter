# Guelph Fit & Rec RFID Gate — Wiring Guide

> ESP32 DevKit V1 (38-pin) + PN532 + 2x SG90 + ILI9341 2.8" TFT + 16x2 I2C LCD
>
> Read this side-by-side with your ESP32. Every pin below matches `arduino/gate_controller/config.h`.

---

## Bill of Materials

| # | Part                                     | Qty | Notes                                              |
|---|------------------------------------------|-----|----------------------------------------------------|
| 1 | ELEGOO ESP32 DevKit V1 (38-pin, USB-C)   | 1   | Brain. Any ESP32 with 38 pins works.               |
| 2 | HiLetgo PN532 NFC RFID V3                | 1   | **Set DIP switches to I2C mode** (see below).      |
| 3 | MIFARE Classic 1K fob                    | 3-4 | Any 13.56 MHz NFC tag works too.                   |
| 4 | SG90 9g micro servo                      | 2   | One top, one bottom. Any 5V hobby servo works.     |
| 5 | 2.8" ILI9341 SPI TFT (DIYmalls)          | 1   | Big member-facing display.                         |
| 6 | 16x2 LCD with I2C backpack               | 1   | Small "welcome" line under the reader.             |
| 7 | External 5V 2A power supply              | 1   | For servos + displays. **See "Power" below.**      |
| 8 | Jumper wires (male-male, male-female)    | ~40 | Grab a rainbow pack.                               |
| 9 | Breadboard (400+ tie points)             | 1   | Or solder to protoboard for the final build.       |
|10 | 220 uF electrolytic capacitor            | 1-2 | Across servo power rails to smooth spikes.         |

---

## PN532 DIP switch setting (CRITICAL)

The HiLetgo PN532 has a two-position DIP switch on the board. Set it to **I2C mode**:

```
+-----------+
| [ON ]     |   SET0 = ON     <-- top switch UP
| [OFF]     |   SET1 = OFF    <-- bottom switch DOWN
+-----------+
```

- SPI mode = both OFF (do NOT use this)
- I2C mode = SET0 ON, SET1 OFF **(use this)**
- HSU/UART = SET0 OFF, SET1 ON (do NOT use)

If you get "PN532 not found" on the serial monitor, the switch is the first thing to check.

---

## Power — READ BEFORE PLUGGING IN

**Do NOT power servos from the ESP32's 3.3V or 5V pin.** Two SG90s stalling can pull 1-2 A and will brown out the ESP32, causing random resets.

Use one of these two power schemes:

### Option A — Single 5V/2A supply (recommended)
- Connect the 5V/2A supply to a **breadboard power rail**.
- ESP32 gets 5V from the same rail into its `VIN` pin.
- Servos get 5V from the same rail directly.
- **Common ground everywhere**: ESP32 GND, servo GND, LCD GND, TFT GND, PN532 GND, and power-supply GND all share the same rail.

### Option B — USB + separate 5V for servos
- ESP32 powered by USB from your PC (during development).
- Servos powered by a separate 5V/2A wall-wart or 4x AA batteries.
- **Tie the GND of the servo supply to the ESP32 GND.** Without this the PWM signal is meaningless to the servos.

Either way: put a **220 uF capacitor** across the servo power rails (+5V to GND) to soak the spikes when the servos start moving.

---

## Pin Table (single source of truth)

| ESP32 pin | Goes to                          | Wire color suggestion | Notes                                    |
|-----------|----------------------------------|-----------------------|------------------------------------------|
| **VIN**   | +5V rail                         | Red                   | Power in                                 |
| **3V3**   | PN532 VCC, LCD VCC (if 3.3V)     | Orange                | 3.3V rail (100 mA max from onboard reg)  |
| **GND**   | Common ground rail               | Black                 | Multiple GNDs — use all of them          |
| **GPIO 21** | PN532 SDA, LCD SDA             | Green                 | I2C data (SDA)                           |
| **GPIO 22** | PN532 SCL, LCD SCL             | Yellow                | I2C clock (SCL)                          |
| **GPIO 32** | PN532 IRQ                      | Purple                | Not really used but wired for lib compat |
| **GPIO 33** | PN532 RSTPD_N (reset)          | Purple                | Optional but nice to have                |
| **GPIO 5**  | TFT CS                         | White                 | SPI chip-select                          |
| **GPIO 2**  | TFT DC                         | White                 | SPI data/command                         |
| **GPIO 4**  | TFT RESET                      | White                 | SPI reset                                |
| **GPIO 18** | TFT SCK                        | Yellow                | ESP32 hardware SPI SCK (default)         |
| **GPIO 23** | TFT MOSI                       | Green                 | ESP32 hardware SPI MOSI (default)        |
| **GPIO 19** | TFT MISO (optional)            | Blue                  | Not needed for read-only display         |
| **GPIO 25** | Servo TOP signal               | White                 | PWM                                      |
| **GPIO 26** | Servo BOTTOM signal            | White                 | PWM                                      |
| **VIN/5V**  | TFT VCC (backlight), servos VCC| Red                   | 5V rail                                  |

**Rule of thumb:**
Every I2C device (PN532 + LCD) shares GPIO 21/22. Every SPI device (TFT) uses GPIO 18/23 + individual CS. Servos use PWM on GPIO 25/26.

---

## Wiring diagrams (device by device)

### 1. PN532 RFID module (I2C mode)

```
    ESP32                          PN532
    -----                          -----
     3V3  ------ Red ------------> VCC
     GND  ------ Black ----------> GND
     GPIO 21 --- Green ----------> SDA
     GPIO 22 --- Yellow ---------> SCL
     GPIO 32 --- Purple ---------> IRQ    (needed by Adafruit_PN532 constructor)
     GPIO 33 --- Purple ---------> RSTPD_N (reset)
```
Set DIP: **SET0 = ON, SET1 = OFF** (see above).

---

### 2. LCD 16x2 with I2C backpack

```
    ESP32                          LCD I2C backpack (PCF8574)
    -----                          --------------------------
     VIN (5V) -- Red ------------> VCC   (5V — LCDs need 5V for backlight)
     GND      -- Black ----------> GND
     GPIO 21  -- Green ----------> SDA
     GPIO 22  -- Yellow ---------> SCL
```
Default I2C address is `0x27`. If the screen stays blank, run the I2C scanner sketch (see docs/SETUP.md) and update `LCD_I2C_ADDR` in `config.h`.

**Both PN532 and LCD share SDA/SCL** — connect them to the SAME GPIO 21 and GPIO 22 (branch on the breadboard).

---

### 3. ILI9341 2.8" TFT

The DIYmalls board has 9 pins. Match them like this:

```
    ESP32                          TFT (ILI9341)
    -----                          -------------
     VIN (5V) -- Red ------------> VCC
     GND      -- Black ----------> GND
     GPIO 5   -- White ----------> CS
     GPIO 4   -- White ----------> RESET  (labeled RST or RESET)
     GPIO 2   -- White ----------> DC     (labeled DC or D/C or RS)
     GPIO 23  -- Green ----------> MOSI   (labeled SDI or MOSI)
     GPIO 18  -- Yellow ---------> SCK    (labeled SCK or CLK)
     GPIO 19  -- Blue -----------> MISO   (SDO — optional, only if you read from TFT)
     3V3      -- Orange ---------> LED    (backlight; some boards put backlight on 5V — check silkscreen)
```

If the backlight pin is labeled `LED`, connect it to 3.3V through a **100 ohm resistor** if the board doesn't have a current-limiting resistor built in. Most DIYmalls boards do — but check with a multimeter first.

**If touchscreen is on the same board (T_CS, T_IRQ, T_DO, T_DIN, T_CLK)** — leave those pins disconnected. We're not using the touchscreen.

---

### 4. Servos (2x SG90)

```
    Servo TOP
      Red    (5V)   -->  +5V power rail (external supply, not ESP32)
      Brown  (GND)  -->  Common GND rail (also connected to ESP32 GND)
      Orange (SIG)  -->  ESP32 GPIO 25

    Servo BOTTOM
      Red    (5V)   -->  +5V power rail (external supply, not ESP32)
      Brown  (GND)  -->  Common GND rail (also connected to ESP32 GND)
      Orange (SIG)  -->  ESP32 GPIO 26
```

Add a **220 uF capacitor** between +5V rail and GND (long leg = +) close to where the servos plug in.

---

## Physical arrangement

Since you're building the pillars from thin wood/plywood and 3D-printing the housings:

- **PN532 antenna** — mount flush behind the "tap here" area on the top of the LEFT pillar. Antenna coil should be within 5-10 mm of the outer surface. Wood/plastic doesn't block RFID; metal does. Never mount it behind a metal plate.
- **ILI9341 TFT** — front face of the LEFT pillar at roughly eye-level (screen visible to the person tapping). Use a 3D-printed bezel to hold it flush.
- **LCD 16x2** — smaller display, mounted below the TFT or on the pillar side. Best used to show short "Welcome, Sarah" text.
- **Servos** — inside the LEFT pillar, one at ~200 mm from base, one at ~800 mm. Both shafts point toward the door hinge line. Attach servo horns to the clear-plastic door edge.
- **ESP32 + breadboard + power supply** — inside the base of the LEFT pillar. Cable routing goes UP through the hollow pillar to the reader, LCDs, and servos. This is why you're building the pillar hollow.

For the RIGHT pillar you don't strictly need any electronics — but the LIDE reference has a display on both sides. If you want symmetry, you can wire a **second 16x2 LCD** to the same I2C bus (different address, usually 0x3F) and modify the code. Optional; not covered in v1.

---

## Sanity check before power-on

Before you plug in USB, run through this list:

- [ ] All grounds tied together (multimeter continuity between ESP32 GND, servo GND, PSU GND, TFT GND, LCD GND, PN532 GND).
- [ ] No shorts between +5V and GND (multimeter reads > 1 kΩ resistance).
- [ ] PN532 DIP switches set to I2C mode (SET0 ON, SET1 OFF).
- [ ] Servos NOT plugged into ESP32 3V3 pin.
- [ ] Capacitor across servo power (long leg to +5V).
- [ ] TFT LED pin connected (screen will be black otherwise).
- [ ] USB-C cable is a DATA cable (some "charge only" cables won't program the ESP32).

Once all green, plug in USB and open the serial monitor at **115200 baud**. Boot messages should scroll immediately.
