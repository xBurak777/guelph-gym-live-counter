# Testing Procedure

> Never wire up the full system and hope it works. Bench-test each block in isolation, then bring it all together.

The order below moves from "smallest scope" to "biggest scope." Do them in this order — if a test fails, everything above it is already known-good, so the fault is contained.

---

## Test 0 — Blink

**Why:** Confirms the ESP32 boots, the USB cable is a data cable, and the toolchain is set up correctly.

**Wiring:** Just ESP32 + USB. Nothing else.

**Code:** In Arduino IDE, **File → Examples → 01.Basics → Blink**. Change `LED_BUILTIN` to `2` (GPIO 2 is the onboard LED on most ESP32 dev kits).

**Pass criterion:** Onboard blue LED blinks at 1 Hz.

**If it fails:**
- Wrong port selected (Tools → Port)
- Bad USB cable (try a different one — many "charging cables" don't carry data)
- Driver not installed (see docs/SETUP.md step 3)

---

## Test 1 — WiFi hello world

**Why:** Confirms the ESP32 can join WiFi and reach the internet.

**Wiring:** Same as Test 0.

**Code:** Paste this into a new sketch, replace SSID/password:

```cpp
#include <WiFi.h>
#include <HTTPClient.h>

void setup() {
  Serial.begin(115200);
  WiFi.begin("YourWiFi", "YourPassword");
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println();
  Serial.println(WiFi.localIP());

  HTTPClient http;
  http.begin("https://guelph-gym-live-counter.vercel.app/");
  int code = http.GET();
  Serial.printf("HTTP: %d\n", code);
  http.end();
}
void loop() {}
```

**Pass criterion:** Serial prints the local IP, then `HTTP: 200`.

**If it fails:**
- Wrong WiFi credentials
- WiFi is 5 GHz only — ESP32 only supports 2.4 GHz
- Vercel site is down (check in browser first)

---

## Test 2 — I2C scanner

**Why:** Confirms the I2C bus is wired correctly and detects the PN532 + LCD.

**Wiring:** ESP32 + PN532 + LCD 16x2, both on shared SDA(21)/SCL(22) as in WIRING.md.

**Code:**

```cpp
#include <Wire.h>
void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  Serial.println("Scanning I2C...");
  for (uint8_t a = 1; a < 127; a++) {
    Wire.beginTransmission(a);
    if (Wire.endTransmission() == 0) {
      Serial.printf("Found 0x%02X\n", a);
    }
  }
  Serial.println("Done");
}
void loop() {}
```

**Pass criterion:** Serial monitor shows at least two addresses:
- `0x24` or `0x48` — the PN532 (address varies by rev)
- `0x27` or `0x3F` — the LCD

**If it fails:**
- No addresses found → SDA/SCL swapped, or no pull-ups (both PN532 and LCD backpack have built-in pull-ups so this is rare)
- Only LCD found → PN532 DIP switch is in SPI or UART mode
- Only PN532 found → LCD not powered (needs 5V, not 3.3V, for backlight)

Note the LCD address that came back — if it's `0x3F`, edit `LCD_I2C_ADDR` in `config.h`.

---

## Test 3 — LCD hello world

**Why:** Confirms the LCD can display text.

**Code:**

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);  // adjust 0x27 to your scan result

void setup() {
  Wire.begin(21, 22);
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Guelph Fit&Rec");
  lcd.setCursor(0, 1);
  lcd.print("Test OK");
}
void loop() {}
```

**Pass criterion:** LCD shows both lines of text.

**If it fails:** turn the small blue potentiometer on the back of the LCD backpack — that's the contrast pot. Blocks visible but no text = contrast wrong.

---

## Test 4 — PN532 read UID

**Why:** Confirms the reader can detect NFC tags.

**Code:**

```cpp
#include <Wire.h>
#include <Adafruit_PN532.h>

Adafruit_PN532 nfc(32, 33);

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  nfc.begin();
  uint32_t ver = nfc.getFirmwareVersion();
  if (!ver) { Serial.println("PN532 not found"); while (1); }
  Serial.printf("PN532 firmware: 0x%08X\n", ver);
  nfc.SAMConfig();
  Serial.println("Tap a card...");
}

void loop() {
  uint8_t uid[7]; uint8_t len;
  if (nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &len, 1000)) {
    Serial.print("UID: ");
    for (int i = 0; i < len; i++) Serial.printf("%02X ", uid[i]);
    Serial.println();
  }
}
```

**Pass criterion:** Tapping a MIFARE fob prints its UID (e.g. `04 A2 B1 8C`). Different fobs give different UIDs. **Save one — you'll need it for Test 7.**

**If it fails:** DIP switch is the #1 cause. Check SET0=ON, SET1=OFF.

---

## Test 5 — TFT hello world

**Why:** Confirms the SPI TFT is wired and driven correctly.

**Code:**

```cpp
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

Adafruit_ILI9341 tft(5, 2, 4);  // CS=5, DC=2, RST=4

void setup() {
  tft.begin();
  tft.setRotation(0);
  tft.fillScreen(ILI9341_BLACK);
  tft.setTextColor(ILI9341_GREEN);
  tft.setTextSize(3);
  tft.setCursor(30, 100);
  tft.println("TFT OK");
}
void loop() {}
```

**Pass criterion:** Big green "TFT OK" on a black screen.

**If it fails:**
- White screen: no data. Check MOSI (GPIO 23) and SCK (GPIO 18).
- Black screen: backlight off. Check LED pin.
- Garbled colors: wrong SPI mode / speed — try `tft.begin(20000000)` to slow it down.

---

## Test 6 — Servo sweep

**Why:** Confirms both servos work and are powered correctly.

**Wiring:** External 5V supply for servos! Do not use ESP32 pins for servo power.

**Code:**

```cpp
#include <ESP32Servo.h>
Servo s1, s2;
void setup() {
  s1.attach(25, 500, 2400);
  s2.attach(26, 500, 2400);
}
void loop() {
  s1.write(0);   s2.write(0);   delay(1000);
  s1.write(90);  s2.write(90);  delay(1000);
  s1.write(180); s2.write(180); delay(1000);
}
```

**Pass criterion:** Both servos sweep from 0 → 90 → 180 degrees in sync, once per 3 seconds.

**If it fails:**
- Only one servo moves: swap wires between the two — is it the servo or the wire?
- Both twitch but don't rotate: not enough current. Add a bigger power supply, or the 220uF cap.
- ESP32 keeps resetting: brownout from servo current spike. External 5V is the only real fix.

---

## Test 7 — API round trip (no hardware)

**Why:** Confirms the ESP32 can POST to `/api/scan` and get a valid response, before you tie in the RFID reader.

**Code:**

```cpp
#include <WiFi.h>
#include <HTTPClient.h>

const char* SSID = "YourWiFi";
const char* PASS = "YourPassword";
const char* URL = "https://guelph-gym-live-counter.vercel.app/api/scan";
const char* SECRET = "dev-shared-secret-change-in-prod-b7f9e3a1c4d8";  // must match Vercel
const char* CARD = "04:A2:B1:8C";                                       // your registered card

void setup() {
  Serial.begin(115200);
  WiFi.begin(SSID, PASS);
  while (WiFi.status() != WL_CONNECTED) { delay(500); Serial.print("."); }
  Serial.println();

  HTTPClient http;
  http.begin(URL);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", String("Bearer ") + SECRET);
  String body = String("{\"cardUid\":\"") + CARD + "\",\"gateId\":\"gate-1\"}";
  int code = http.POST(body);
  Serial.printf("Status: %d\n", code);
  Serial.println(http.getString());
  http.end();
}
void loop() {}
```

**Pass criterion:** Status `200` and a JSON response with `"ok":true` (assuming the card is registered) or `"result":"DENIED_UNKNOWN_CARD"` (if it isn't).

**If it fails:**
- `401 unauthorized` → wrong SCAN_API_SECRET
- `400 bad_request` → JSON malformed
- `-1` or timeout → network / DNS issue
- `500` → check Vercel deployment logs at [vercel.com/dashboard](https://vercel.com/dashboard)

---

## Test 8 — Full integration

Load the real `gate_controller.ino` with all peripherals wired per WIRING.md.

**Pass criterion:**
1. Boot: LCD says "Booting..." then "Tap your card"
2. TFT shows yellow "Tap Your Card" screen
3. Tap registered card:
   - LCD: "Verifying..."
   - TFT: cyan "Scanning"
   - Then TFT: green with check mark, "GRANTED - IN", name, occupancy
   - Servos: door opens (both rotate 0→90°)
   - Wait 3 seconds
   - Door closes automatically
   - Back to idle
4. Tap unregistered card:
   - TFT: red with X, "DENIED"
   - LCD: "Access denied / Card not registered"
   - Wait 2 seconds
   - Back to idle
5. Live occupancy on the Vercel site increments/decrements as you tap.

**If any step fails:** the isolated tests told you which block is faulty. Fix the block, rerun Test 8.

---

## Test 9 — Load test (optional)

Rapid-fire scan the same card 20 times. The debounce logic (2.5-second window) should ignore repeated taps within that window. Beyond it, IN/OUT toggles correctly.

Check the live occupancy on the site matches what the ESP32 shows — should be identical.
