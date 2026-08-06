/*
 * =====================================================================
 * Guelph Fit & Rec — RFID Gate Controller
 * =====================================================================
 *
 * Target: ESP32 DevKit V1 (ELEGOO 38-pin variant, USB-C)
 *
 * Peripherals:
 *   - HiLetgo PN532 NFC RFID module V3 (I2C mode)
 *   - DIYmalls 2.8" ILI9341 SPI TFT (no touch used here)
 *   - Elegoo 16x2 I2C LCD (address 0x27, HD44780 with PCF8574)
 *   - 2x SG90 servos (top + bottom door pivots)
 *   - Power LED + green/red status LEDs (optional)
 *
 * Flow:
 *   1. Boot -> connect to WiFi (WiFiManager captive portal if no saved creds)
 *   2. LCD shows "Tap your card"
 *   3. On PN532 read -> POST to /api/scan on the Vercel site
 *   4. Parse JSON response:
 *        ok=true  -> GREEN state: TFT green check, LCD "Welcome <name>",
 *                    servos rotate 90 (door opens), wait 3s, servos return
 *        ok=false -> RED state: TFT red X, LCD shows denial message,
 *                    hold 2s, then back to idle
 *   5. Return to idle
 *
 * Wire pins are defined in `config.h`. Nothing hardcoded here.
 * =====================================================================
 */

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiManager.h>          // tzapu/WiFiManager
#include <HTTPClient.h>
#include <ArduinoJson.h>          // bblanchon/ArduinoJson
#include <Wire.h>

// PN532 RFID
#include <Adafruit_PN532.h>       // Adafruit PN532

// LCD 16x2 I2C
#include <LiquidCrystal_I2C.h>    // marcoschwartz/LiquidCrystal_I2C

// TFT ILI9341
#include <Adafruit_GFX.h>         // Adafruit GFX Library
#include <Adafruit_ILI9341.h>     // Adafruit ILI9341

// Servos
#include <ESP32Servo.h>           // madhephaestus/ESP32Servo

#include "config.h"

// =====================================================================
// GLOBAL OBJECTS
// =====================================================================

Adafruit_PN532 nfc(PN532_IRQ_PIN, PN532_RESET_PIN);          // I2C: (irq, reset); Wire object used
LiquidCrystal_I2C lcd(LCD_I2C_ADDR, LCD_COLS, LCD_ROWS);
Adafruit_ILI9341 tft(TFT_CS_PIN, TFT_DC_PIN, TFT_RST_PIN);
Servo servoTop;
Servo servoBottom;
WiFiManager wifiManager;

// Debounce / state
enum State { STATE_IDLE, STATE_SCANNING, STATE_SUCCESS, STATE_DENIED, STATE_ERROR };
State state = STATE_IDLE;
unsigned long stateEnteredMs = 0;
String lastCardUid = "";
unsigned long lastScanMs = 0;

// =====================================================================
// SETUP
// =====================================================================

void setup() {
  Serial.begin(115200);
  delay(200);
  Serial.println();
  Serial.println("=====================================");
  Serial.println("Guelph Fit & Rec Gate Controller v1.0");
  Serial.println("=====================================");

  // I2C bus for PN532 + LCD
  Wire.begin(I2C_SDA_PIN, I2C_SCL_PIN);
  Wire.setClock(100000);  // PN532 prefers 100kHz standard

  // --- Init LCD 16x2 ---
  lcd.init();
  lcd.backlight();
  lcdShow("Booting...", "Please wait");

  // --- Init TFT ---
  tft.begin();
  tft.setRotation(0);   // portrait, USB down; change to 2 if flipped
  tft.fillScreen(ILI9341_BLACK);
  tftMessage("Booting", "Initializing...", ILI9341_WHITE);

  // --- Init PN532 ---
  nfc.begin();
  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    Serial.println("PN532 not found! Check wiring.");
    lcdShow("PN532 error", "Check wiring");
    tftMessage("HW ERROR", "PN532 not found", ILI9341_RED);
    state = STATE_ERROR;
    // Continue — WiFi still works; user sees error on displays.
  } else {
    Serial.print("Found PN532, firmware version: 0x");
    Serial.println(versiondata, HEX);
    nfc.SAMConfig();   // configure to read RFID tags
  }

  // --- Init servos ---
  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  servoTop.setPeriodHertz(50);
  servoBottom.setPeriodHertz(50);
  servoTop.attach(SERVO_TOP_PIN, SERVO_MIN_US, SERVO_MAX_US);
  servoBottom.attach(SERVO_BOTTOM_PIN, SERVO_MIN_US, SERVO_MAX_US);
  doorClose();  // ensure door starts closed

  // --- WiFi via WiFiManager ---
  lcdShow("Connecting WiFi", "Portal if needed");
  tftMessage("WiFi", "Configure via\nGuelphGymGate AP", ILI9341_YELLOW);

  wifiManager.setConfigPortalTimeout(180); // 3 min timeout on portal
  wifiManager.setConnectTimeout(30);

  bool ok = wifiManager.autoConnect(WM_AP_NAME, WM_AP_PASSWORD);
  if (!ok) {
    Serial.println("WiFi failed. Rebooting in 5s...");
    lcdShow("WiFi failed", "Rebooting...");
    tftMessage("WiFi FAIL", "Rebooting...", ILI9341_RED);
    delay(5000);
    ESP.restart();
  }
  Serial.print("WiFi connected. IP: ");
  Serial.println(WiFi.localIP());

  // --- Ready ---
  enterIdle();
}

// =====================================================================
// MAIN LOOP
// =====================================================================

void loop() {
  unsigned long now = millis();

  switch (state) {
    case STATE_IDLE:
      pollForCard();
      break;

    case STATE_SUCCESS:
      // After 3s of "open" state, close door and return to idle
      if (now - stateEnteredMs > SUCCESS_HOLD_MS) {
        doorClose();
        enterIdle();
      }
      break;

    case STATE_DENIED:
      // After 2s, return to idle
      if (now - stateEnteredMs > DENIED_HOLD_MS) {
        enterIdle();
      }
      break;

    case STATE_ERROR:
      // Try to recover — if PN532 gone, this is a hardware issue.
      // Poll every 3 seconds
      if (now - stateEnteredMs > 3000) {
        stateEnteredMs = now;
        uint32_t v = nfc.getFirmwareVersion();
        if (v) {
          Serial.println("PN532 recovered.");
          nfc.SAMConfig();
          enterIdle();
        }
      }
      break;

    default:
      break;
  }
}

// =====================================================================
// STATE HELPERS
// =====================================================================

void enterIdle() {
  state = STATE_IDLE;
  stateEnteredMs = millis();
  lastCardUid = "";
  lcdShow("Tap your card", "Guelph Fit&Rec");
  tftIdleScreen();
}

void enterSuccess(const String& name, const String& direction, int occupancy, int capacity) {
  state = STATE_SUCCESS;
  stateEnteredMs = millis();
  String top = (direction == "IN") ? "Welcome!" : "See you soon!";
  String bot = String(name).substring(0, 16);
  lcdShow(top.c_str(), bot.c_str());
  tftSuccess(name, direction, occupancy, capacity);
  doorOpen();
}

void enterDenied(const String& reason) {
  state = STATE_DENIED;
  stateEnteredMs = millis();
  lcdShow("Access denied", reason.substring(0, 16).c_str());
  tftDenied(reason);
}

// =====================================================================
// RFID
// =====================================================================

void pollForCard() {
  uint8_t uid[7] = {0};
  uint8_t uidLen = 0;
  bool found = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLen, 50);
  if (!found) return;

  String uidStr = "";
  for (uint8_t i = 0; i < uidLen; i++) {
    if (uid[i] < 0x10) uidStr += "0";
    uidStr += String(uid[i], HEX);
    if (i < uidLen - 1) uidStr += ":";
  }
  uidStr.toUpperCase();

  // Debounce: ignore same card scanned again within DEBOUNCE_MS
  unsigned long now = millis();
  if (uidStr == lastCardUid && (now - lastScanMs) < DEBOUNCE_MS) {
    return;
  }
  lastCardUid = uidStr;
  lastScanMs = now;

  Serial.print("Card scanned: ");
  Serial.println(uidStr);

  state = STATE_SCANNING;
  lcdShow("Verifying...", uidStr.substring(0, 16).c_str());
  tftMessage("Scanning", "Verifying card...", ILI9341_CYAN);

  postScan(uidStr);
}

// =====================================================================
// API CALL
// =====================================================================

void postScan(const String& cardUid) {
  if (WiFi.status() != WL_CONNECTED) {
    enterDenied("Network offline");
    return;
  }

  HTTPClient http;
  http.setTimeout(HTTP_TIMEOUT_MS);
  http.begin(String(API_BASE_URL) + "/api/scan");
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", String("Bearer ") + SCAN_API_SECRET);

  StaticJsonDocument<256> reqDoc;
  reqDoc["cardUid"] = cardUid;
  reqDoc["gateId"] = GATE_ID;
  String reqBody;
  serializeJson(reqDoc, reqBody);

  Serial.print("POST /api/scan body: ");
  Serial.println(reqBody);

  int code = http.POST(reqBody);
  Serial.printf("HTTP status: %d\n", code);

  if (code <= 0) {
    Serial.printf("HTTP error: %s\n", http.errorToString(code).c_str());
    enterDenied("Network error");
    http.end();
    return;
  }

  String payload = http.getString();
  http.end();
  Serial.println("Response:");
  Serial.println(payload);

  StaticJsonDocument<1024> resDoc;
  DeserializationError err = deserializeJson(resDoc, payload);
  if (err) {
    Serial.print("JSON parse failed: ");
    Serial.println(err.c_str());
    enterDenied("Bad response");
    return;
  }

  bool ok = resDoc["ok"] | false;

  if (ok) {
    String firstName = resDoc["member"]["firstName"] | "Member";
    String direction = resDoc["direction"] | "IN";
    int occupancy = resDoc["occupancy"] | 0;
    int capacity = resDoc["capacity"] | 350;
    enterSuccess(firstName, direction, occupancy, capacity);
  } else {
    String result = resDoc["result"] | "DENIED";
    String message = resDoc["message"] | "Access denied";
    Serial.print("Denied: ");
    Serial.println(result);
    enterDenied(message);
  }
}

// =====================================================================
// SERVO / DOOR
// =====================================================================

void doorOpen() {
  Serial.println("Opening door...");
  // Rotate both servos slowly and in sync
  for (int a = 0; a <= DOOR_OPEN_ANGLE; a += 3) {
    servoTop.write(a);
    servoBottom.write(a);
    delay(15);
  }
}

void doorClose() {
  Serial.println("Closing door...");
  for (int a = DOOR_OPEN_ANGLE; a >= 0; a -= 3) {
    servoTop.write(a);
    servoBottom.write(a);
    delay(15);
  }
  servoTop.write(0);
  servoBottom.write(0);
}

// =====================================================================
// LCD 16x2
// =====================================================================

void lcdShow(const char* line1, const char* line2) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(line1);
  lcd.setCursor(0, 1);
  lcd.print(line2);
}

// =====================================================================
// TFT DISPLAY
// =====================================================================

void tftMessage(const char* title, const char* body, uint16_t color) {
  tft.fillScreen(ILI9341_BLACK);
  tft.setTextColor(color);
  tft.setTextSize(3);
  tft.setCursor(10, 40);
  tft.println(title);
  tft.setTextSize(2);
  tft.setTextColor(ILI9341_WHITE);
  tft.setCursor(10, 100);
  tft.println(body);
}

void tftIdleScreen() {
  tft.fillScreen(ILI9341_BLACK);

  // Header — silver bar
  tft.fillRect(0, 0, tft.width(), 40, tft.color565(180, 180, 180));
  tft.setTextColor(ILI9341_BLACK);
  tft.setTextSize(2);
  tft.setCursor(10, 12);
  tft.print("Guelph Fit&Rec");

  // Prompt
  tft.setTextColor(ILI9341_WHITE);
  tft.setTextSize(3);
  tft.setCursor(30, 100);
  tft.println("Tap");
  tft.setCursor(30, 140);
  tft.println("Your");
  tft.setCursor(30, 180);
  tft.println("Card");

  // Icon area
  tft.drawRoundRect(140, 100, 80, 100, 8, ILI9341_YELLOW);
}

void tftSuccess(const String& name, const String& direction, int occupancy, int capacity) {
  tft.fillScreen(tft.color565(0, 80, 0));  // dark green background

  // Big green check
  tft.fillRect(0, 0, tft.width(), 40, ILI9341_DARKGREEN);
  tft.setTextColor(ILI9341_WHITE);
  tft.setTextSize(2);
  tft.setCursor(10, 12);
  tft.print(direction == "IN" ? "GRANTED - IN" : "GRANTED - OUT");

  // Draw a large check mark
  drawCheckmark(120, 90, 60, ILI9341_GREEN);

  // Name
  tft.setTextColor(ILI9341_WHITE);
  tft.setTextSize(2);
  tft.setCursor(10, 180);
  tft.print(name);

  // Occupancy footer
  tft.setTextSize(1);
  tft.setCursor(10, 220);
  tft.printf("Occupancy: %d / %d", occupancy, capacity);

  tft.setCursor(10, 240);
  tft.print("Enjoy your workout!");
}

void tftDenied(const String& reason) {
  tft.fillScreen(tft.color565(80, 0, 0));  // dark red background

  tft.fillRect(0, 0, tft.width(), 40, ILI9341_RED);
  tft.setTextColor(ILI9341_WHITE);
  tft.setTextSize(2);
  tft.setCursor(10, 12);
  tft.print("DENIED");

  drawXmark(120, 90, 50, ILI9341_WHITE);

  tft.setTextColor(ILI9341_WHITE);
  tft.setTextSize(2);
  tft.setCursor(10, 180);
  tft.print(reason);
}

void drawCheckmark(int cx, int cy, int size, uint16_t color) {
  // Simple thick check mark
  for (int i = -3; i <= 3; i++) {
    tft.drawLine(cx - size/2 + i, cy,           cx + i, cy + size/2, color);
    tft.drawLine(cx + i, cy + size/2,           cx + size/2 + i, cy - size/2, color);
  }
}

void drawXmark(int cx, int cy, int size, uint16_t color) {
  for (int i = -3; i <= 3; i++) {
    tft.drawLine(cx - size/2 + i, cy - size/2, cx + size/2 + i, cy + size/2, color);
    tft.drawLine(cx + size/2 + i, cy - size/2, cx - size/2 + i, cy + size/2, color);
  }
}
