/*
 * ================================================================================
 * MASTER GATE CONTROLLER — Guelph Fit & Rec RFID Gate System
 * ================================================================================
 * 
 * Complete integration of:
 *   - ESP32 DevKit V1 (main brain)
 *   - PN532 RFID/NFC reader (I2C)
 *   - 2.4" TFT ILI9341 display (SPI) — member info
 *   - LCD1602A I2C — status text
 *   - PCA9685 16-channel PWM driver (I2C) — 4 servos, 2 per door
 *   - KY-022 IR receiver — ELEGOO remote
 *   - Tactile push button — physical backup control
 *   - WiFi (WiFiManager captive portal)
 *   - HTTPS API calls to Vercel backend
 * 
 * Author: Burak Aksoy
* Live site: https://guelph-gym-live-counter.vercel.app
 * ================================================================================
 */

// ============ INCLUDES ============
#include <WiFi.h>
#include <WiFiManager.h>            // tzapu WiFiManager (captive portal)
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

#include <Wire.h>
#include <SPI.h>

#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>       // TFT
#include <Adafruit_PN532.h>         // RFID
#include <Adafruit_PWMServoDriver.h>// PCA9685
#include <LiquidCrystal_I2C.h>      // LCD1602

#include <IRremote.hpp>             // IR remote

// ============ PIN DEFINITIONS ============
// TFT (SPI)
#define TFT_CS    5
#define TFT_DC    2
#define TFT_RST   4
#define TFT_MOSI  23
#define TFT_MISO  19
#define TFT_SCK   18

// I2C shared bus (PN532 + LCD1602 + PCA9685)
#define I2C_SDA   21
#define I2C_SCL   22

// IR receiver
#define IR_RECEIVE_PIN  27

// Push button (backup control)
#define BUTTON_PIN  16   // RX2 / GPIO16

// Optional relay (leave undefined if not using)
// #define RELAY_PIN 14

// ============ I2C ADDRESSES ============
#define PN532_ADDR    0x24   // PN532 I2C address (fixed)
#define LCD_ADDR      0x27   // LCD1602 (try 0x3F if this fails)
#define PCA9685_ADDR  0x40   // PCA9685 servo driver

// ============ IR CODES ============
// !!! IMPORTANT !!!
// These are ELEGOO factory defaults. VERIFY with 01_ir_discover.ino
// and REPLACE these values with the actual Command hex you observed.
#define IR_POWER    0x45   // Red power button (top-left)
#define IR_EQ       0x09   // EQ button — force STANDBY
#define IR_PLAY     0x43   // Play/pause — open BOTH doors manually
#define IR_1        0x16   // "1" — open door 1
#define IR_2        0x19   // "2" — open door 2
#define IR_0        0x52   // "0" — close both doors

// ============ SERVO CHANNELS (on PCA9685) ============
#define SERVO_D1_LEFT   0  // Door 1 left servo
#define SERVO_D1_RIGHT  1  // Door 1 right servo
#define SERVO_D2_LEFT   2  // Door 2 left servo
#define SERVO_D2_RIGHT  3  // Door 2 right servo

// Servo pulse ranges (in PCA9685 ticks, 12-bit @ 50Hz)
// For MG90S: ~500us to ~2500us
#define SERVO_MIN_PULSE  102   // 500us  (0 degrees)
#define SERVO_MAX_PULSE  512   // 2500us (180 degrees)

// Door positions (degrees)
#define DOOR_CLOSED  0
#define DOOR_OPEN    90

// ============ API CONFIG ============
const char* API_HOST   = "guelph-gym-live-counter.vercel.app";
const char* API_SCAN   = "/api/scan";
const char* API_OCC    = "/api/occupancy";
const char* API_SECRET = "dev-shared-secret-change-in-prod-b7f9e3a1c4d8";

// ============ COLORS (16-bit RGB565) ============
#define GRYPHON_RED    0xD124   // Deep red
#define BG_DARK        0x1082   // Dark blue-gray
#define BG_LIGHT       0xEF7D   // Off-white
#define TEXT_LIGHT     0xFFFF   // White
#define TEXT_DIM       0x8410   // Gray
#define SUCCESS_GREEN  0x2645
#define WARN_AMBER     0xFDA0
#define ERROR_RED      0xF800

// ============ TIMING ============
#define STANDBY_DIM_DELAY_MS  30000UL   // Dim screens after 30s idle
#define APPROVED_DISPLAY_MS   4000UL    // Show approved screen for 4s
#define DENIED_DISPLAY_MS     4000UL    // Show denied screen for 4s
#define SERVO_MOVE_STEP_MS    15        // ms per degree of servo move
#define OCCUPANCY_POLL_MS     10000UL   // Poll /api/occupancy every 10s
#define WIFI_TIMEOUT_MS       180000UL  // 3 min for WiFi setup

// ============ STATE MACHINE ============
enum SystemState {
  STATE_BOOT,
  STATE_WIFI_SETUP,
  STATE_STANDBY,
  STATE_ACTIVE_IDLE,
  STATE_SCANNING,
  STATE_APPROVED,
  STATE_DENIED
};

SystemState currentState = STATE_BOOT;
SystemState prevState    = STATE_BOOT;
unsigned long stateEnteredAt = 0;

// ============ GLOBAL OBJECTS ============
Adafruit_ILI9341        tft(TFT_CS, TFT_DC, TFT_RST);
Adafruit_PN532          nfc(255, 255);  // Uses I2C, dummy IRQ/RESET
LiquidCrystal_I2C       lcd(LCD_ADDR, 16, 2);
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(PCA9685_ADDR);

// ============ RUNTIME VARIABLES ============
String lastMemberName    = "";
String lastMemberTier    = "";
String lastScanDirection = ""; // "IN" or "OUT"
String lastDenyReason    = "";
int currentOccupancy     = 0;

unsigned long lastOccupancyPoll  = 0;
unsigned long lastActivityTime   = 0;
unsigned long buttonPressStart   = 0;
bool buttonPreviousState         = HIGH;
bool wifiConfigured              = false;

// Servo current positions (for smooth movement)
int servoPositions[4] = {DOOR_CLOSED, DOOR_CLOSED, DOOR_CLOSED, DOOR_CLOSED};

// ================================================================================
// SETUP
// ================================================================================
void setup() {
  Serial.begin(115200);
  delay(500);
  
  Serial.println();
  Serial.println("============================================");
  Serial.println("  GUELPH GYM RFID GATE — Starting up");
  Serial.println("============================================");
  
  // Pin setup
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  
  #ifdef RELAY_PIN
    pinMode(RELAY_PIN, OUTPUT);
    digitalWrite(RELAY_PIN, LOW);  // Servos off in STANDBY
  #endif
  
  // Init I2C bus
  Wire.begin(I2C_SDA, I2C_SCL);
  Wire.setClock(400000);  // Fast mode for smoother multi-device operation
  
  // Init TFT first (for boot messages)
  initTFT();
  drawBootScreen("Booting system...", 10);
  
  // Init LCD1602
  drawBootScreen("Init LCD1602...", 25);
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Booting system..");
  lcd.setCursor(0, 1);
  lcd.print("Please wait");
  
  // Init PN532
  drawBootScreen("Init PN532 reader...", 40);
  Serial.println("Initializing PN532...");
  nfc.begin();
  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    Serial.println("PN532 not found!");
    drawFatalError("PN532 not detected", "Check I2C wiring");
    while (1) delay(1000);
  }
  Serial.print("Found PN5"); Serial.println((versiondata >> 24) & 0xFF, HEX);
  nfc.SAMConfig();
  
  // Init PCA9685
  drawBootScreen("Init PCA9685...", 55);
  Serial.println("Initializing PCA9685...");
  pwm.begin();
  pwm.setPWMFreq(50);  // 50Hz for standard servos
  delay(10);
  
  // Move all servos to closed position
  for (int i = 0; i < 4; i++) {
    setServoAngle(i, DOOR_CLOSED);
  }
  delay(500);
  
  // Init IR receiver
  drawBootScreen("Init IR receiver...", 70);
  Serial.println("Initializing IR receiver...");
  IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);
  
  // WiFi setup (captive portal on first boot)
  drawBootScreen("WiFi setup...", 85);
  setupWiFi();
  
  // Enter STANDBY by default (safe)
  drawBootScreen("Ready!", 100);
  delay(1000);
  
  enterState(STATE_STANDBY);
  
  Serial.println("Setup complete. Awaiting IR remote or push button.");
}

// ================================================================================
// LOOP
// ================================================================================
void loop() {
  // Always process IR & button (works in every state)
  handleIRRemote();
  handleButton();
  
  // State-specific logic
  switch (currentState) {
    case STATE_STANDBY:
      // Do nothing. Wait for IR remote or button.
      // Occasional heartbeat: refresh LCD every 5s
      static unsigned long lastStandbyRefresh = 0;
      if (millis() - lastStandbyRefresh > 5000) {
        lastStandbyRefresh = millis();
        // Screens already dim — no updates
      }
      break;
      
    case STATE_ACTIVE_IDLE:
      // Poll for cards
      scanForCard();
      // Poll occupancy periodically
      if (millis() - lastOccupancyPoll > OCCUPANCY_POLL_MS) {
        lastOccupancyPoll = millis();
        pollOccupancy();
      }
      break;
      
    case STATE_APPROVED:
      if (millis() - stateEnteredAt > APPROVED_DISPLAY_MS) {
        // Auto-close doors
        closeAllDoors();
        enterState(STATE_ACTIVE_IDLE);
      }
      break;
      
    case STATE_DENIED:
      if (millis() - stateEnteredAt > DENIED_DISPLAY_MS) {
        enterState(STATE_ACTIVE_IDLE);
      }
      break;
      
    default:
      break;
  }
  
  delay(10);  // Small delay to keep CPU cool
}

// ================================================================================
// STATE MACHINE
// ================================================================================
void enterState(SystemState newState) {
  prevState = currentState;
  currentState = newState;
  stateEnteredAt = millis();
  lastActivityTime = millis();
  
  Serial.print("State: ");
  Serial.println(stateName(newState));
  
  switch (newState) {
    case STATE_STANDBY:
      // Turn off servos (sleep PCA9685)
      pwm.sleep();
      #ifdef RELAY_PIN
        digitalWrite(RELAY_PIN, LOW);
      #endif
      // Dim TFT
      drawStandbyScreen();
      // LCD standby
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("System: STANDBY ");
      lcd.setCursor(0, 1);
      lcd.print("Press RED btn   ");
      break;
      
    case STATE_ACTIVE_IDLE:
      // Wake servos
      pwm.wakeup();
      #ifdef RELAY_PIN
        digitalWrite(RELAY_PIN, HIGH);
      #endif
      delay(50);
      // Ensure doors closed
      closeAllDoors();
      // Show idle screen
      drawIdleScreen();
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Welcome to      ");
      lcd.setCursor(0, 1);
      lcd.print("Gryphon Fit&Rec ");
      break;
      
    case STATE_SCANNING:
      drawScanningScreen();
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Reading card... ");
      lcd.setCursor(0, 1);
      lcd.print("Please hold     ");
      break;
      
    case STATE_APPROVED:
      // Open doors
      openAllDoors();
      drawApprovedScreen();
      lcd.clear();
      lcd.setCursor(0, 0);
      String line1 = (lastScanDirection == "IN" ? "Welcome, " : "Goodbye, ");
      line1 += lastMemberName;
      line1 = truncate(line1, 16);
      lcd.print(line1);
      lcd.setCursor(0, 1);
      String line2 = "Inside: " + String(currentOccupancy) + "/450";
      lcd.print(truncate(line2, 16));
      break;
      
    case STATE_DENIED:
      drawDeniedScreen();
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Access DENIED   ");
      lcd.setCursor(0, 1);
      lcd.print(truncate(lastDenyReason, 16));
      break;
      
    default:
      break;
  }
}

const char* stateName(SystemState s) {
  switch (s) {
    case STATE_BOOT: return "BOOT";
    case STATE_WIFI_SETUP: return "WIFI_SETUP";
    case STATE_STANDBY: return "STANDBY";
    case STATE_ACTIVE_IDLE: return "ACTIVE_IDLE";
    case STATE_SCANNING: return "SCANNING";
    case STATE_APPROVED: return "APPROVED";
    case STATE_DENIED: return "DENIED";
    default: return "UNKNOWN";
  }
}

// ================================================================================
// TFT UI DRAWING
// ================================================================================
void initTFT() {
  tft.begin();
  tft.setRotation(0);  // Portrait
  tft.fillScreen(BG_DARK);
}

void drawBootScreen(const char* msg, int progressPct) {
  tft.fillScreen(BG_DARK);
  
  // Header
  tft.fillRect(0, 0, 240, 40, GRYPHON_RED);
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(2);
  tft.setCursor(20, 12);
  tft.print("GRYPHON GATE");
  
  // Body
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(1);
  tft.setCursor(20, 100);
  tft.print(msg);
  
  // Progress bar
  tft.drawRect(20, 130, 200, 15, TEXT_LIGHT);
  tft.fillRect(22, 132, (196 * progressPct) / 100, 11, GRYPHON_RED);
  
  tft.setCursor(20, 155);
  tft.print(progressPct);
  tft.print("%");
}

void drawFatalError(const char* line1, const char* line2) {
  tft.fillScreen(ERROR_RED);
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(2);
  tft.setCursor(20, 100);
  tft.print("FATAL ERROR");
  tft.setTextSize(1);
  tft.setCursor(20, 140);
  tft.print(line1);
  tft.setCursor(20, 160);
  tft.print(line2);
}

void drawStandbyScreen() {
  tft.fillScreen(BG_DARK);
  tft.setTextColor(TEXT_DIM);
  tft.setTextSize(2);
  tft.setCursor(40, 130);
  tft.print("STANDBY");
  tft.setTextSize(1);
  tft.setCursor(30, 170);
  tft.print("Press red button");
  tft.setCursor(45, 185);
  tft.print("to activate");
}

void drawIdleScreen() {
  tft.fillScreen(BG_LIGHT);
  
  // Red header
  tft.fillRect(0, 0, 240, 50, GRYPHON_RED);
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(2);
  tft.setCursor(30, 8);
  tft.print("GRYPHON");
  tft.setCursor(20, 28);
  tft.print("FIT & REC");
  
  // Body
  tft.setTextColor(BG_DARK);
  tft.setTextSize(2);
  tft.setCursor(45, 100);
  tft.print("TAP CARD");
  
  // Bottom info
  tft.setTextSize(1);
  tft.setCursor(20, 260);
  tft.print("Inside: ");
  tft.setTextColor(GRYPHON_RED);
  tft.print(currentOccupancy);
  tft.setTextColor(BG_DARK);
  tft.print(" / 450");
}

void drawScanningScreen() {
  tft.fillScreen(BG_LIGHT);
  tft.fillRect(0, 0, 240, 50, GRYPHON_RED);
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(2);
  tft.setCursor(30, 15);
  tft.print("READING...");
  
  tft.setTextColor(BG_DARK);
  tft.setTextSize(1);
  tft.setCursor(50, 150);
  tft.print("Please hold card");
}

void drawApprovedScreen() {
  tft.fillScreen(BG_LIGHT);
  
  uint16_t headerColor = (lastScanDirection == "IN") ? SUCCESS_GREEN : 0x2B7E;  // green or blue
  tft.fillRect(0, 0, 240, 50, headerColor);
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(2);
  tft.setCursor(15, 8);
  tft.print(lastScanDirection == "IN" ? "WELCOME!" : "GOODBYE!");
  tft.setTextSize(1);
  tft.setCursor(15, 30);
  tft.print(lastScanDirection == "IN" ? "Access granted" : "Have a good day");
  
  // Big checkmark
  tft.setTextColor(headerColor);
  tft.setTextSize(8);
  tft.setCursor(85, 80);
  tft.print(lastScanDirection == "IN" ? "OK" : "->");
  
  // Member info
  tft.setTextColor(BG_DARK);
  tft.setTextSize(2);
  tft.setCursor(20, 200);
  tft.print(lastMemberName);
  
  tft.setTextSize(1);
  tft.setTextColor(TEXT_DIM);
  tft.setCursor(20, 225);
  tft.print(lastMemberTier);
  
  // Occupancy
  tft.setTextColor(BG_DARK);
  tft.setCursor(20, 260);
  tft.print("Inside: ");
  tft.setTextColor(GRYPHON_RED);
  tft.print(currentOccupancy);
  tft.setTextColor(BG_DARK);
  tft.print(" / 450");
}

void drawDeniedScreen() {
  tft.fillScreen(BG_LIGHT);
  tft.fillRect(0, 0, 240, 50, ERROR_RED);
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(2);
  tft.setCursor(30, 15);
  tft.print("DENIED");
  
  tft.setTextColor(ERROR_RED);
  tft.setTextSize(8);
  tft.setCursor(95, 80);
  tft.print("X");
  
  tft.setTextColor(BG_DARK);
  tft.setTextSize(1);
  tft.setCursor(20, 200);
  tft.print("Reason:");
  tft.setCursor(20, 220);
  tft.print(lastDenyReason);
  
  tft.setCursor(20, 260);
  tft.setTextColor(TEXT_DIM);
  tft.print("Please see staff");
}

// ================================================================================
// PN532 CARD SCANNING
// ================================================================================
void scanForCard() {
  uint8_t uid[7];
  uint8_t uidLength;
  
  // Try to read a card (non-blocking-ish, 50ms timeout)
  bool found = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength, 50);
  
  if (found) {
    // Format UID as colon-separated hex
    String cardUid = "";
    for (int i = 0; i < uidLength; i++) {
      if (uid[i] < 0x10) cardUid += "0";
      cardUid += String(uid[i], HEX);
      if (i < uidLength - 1) cardUid += ":";
    }
    cardUid.toUpperCase();
    
    Serial.print("Card detected: ");
    Serial.println(cardUid);
    
    enterState(STATE_SCANNING);
    delay(300);  // Brief scanning UI
    
    // Call API
    processScan(cardUid);
  }
}

void processScan(const String& cardUid) {
  WiFiClientSecure client;
  client.setInsecure();  // Skip cert validation for simplicity
  
  HTTPClient https;
  String url = String("https://") + API_HOST + API_SCAN;
  
  Serial.print("POST to: "); Serial.println(url);
  
  if (!https.begin(client, url)) {
    Serial.println("HTTPS connection failed");
    lastDenyReason = "Network error";
    enterState(STATE_DENIED);
    return;
  }
  
  https.addHeader("Content-Type", "application/json");
  https.addHeader("Authorization", String("Bearer ") + API_SECRET);
  
  // Build JSON body: {"cardUid": "47:07:12:5E"}
  String body = "{\"cardUid\":\"" + cardUid + "\"}";
  
  int httpCode = https.POST(body);
  Serial.print("HTTP response code: "); Serial.println(httpCode);
  
  if (httpCode == 200 || httpCode == 201) {
    String response = https.getString();
    Serial.println(response);
    
    // Parse JSON
    DynamicJsonDocument doc(1024);
    DeserializationError err = deserializeJson(doc, response);
    if (err) {
      Serial.println("JSON parse error");
      lastDenyReason = "Bad response";
      enterState(STATE_DENIED);
      https.end();
      return;
    }
    
    // Extract result
    const char* status = doc["status"] | "UNKNOWN";
    
    if (String(status) == "APPROVED") {
      lastMemberName = String(doc["member"]["name"] | "Member");
      lastMemberTier = String(doc["member"]["tier"] | "");
      lastScanDirection = String(doc["direction"] | "IN");
      currentOccupancy = doc["occupancy"] | 0;
      enterState(STATE_APPROVED);
    } else {
      const char* reason = doc["reason"] | "Access denied";
      lastDenyReason = String(reason);
      enterState(STATE_DENIED);
    }
  } else {
    // HTTP error
    lastDenyReason = "HTTP " + String(httpCode);
    enterState(STATE_DENIED);
  }
  
  https.end();
}

void pollOccupancy() {
  WiFiClientSecure client;
  client.setInsecure();
  HTTPClient https;
  String url = String("https://") + API_HOST + API_OCC;
  
  if (!https.begin(client, url)) return;
  
  int code = https.GET();
  if (code == 200) {
    String resp = https.getString();
    DynamicJsonDocument doc(256);
    if (!deserializeJson(doc, resp)) {
      int newCount = doc["occupancy"] | currentOccupancy;
      if (newCount != currentOccupancy) {
        currentOccupancy = newCount;
        // Refresh idle screen if we're on it
        if (currentState == STATE_ACTIVE_IDLE) {
          drawIdleScreen();
        }
      }
    }
  }
  https.end();
}

// ================================================================================
// SERVO CONTROL (via PCA9685)
// ================================================================================
void setServoAngle(int channel, int angle) {
  angle = constrain(angle, 0, 180);
  int pulse = map(angle, 0, 180, SERVO_MIN_PULSE, SERVO_MAX_PULSE);
  pwm.setPWM(channel, 0, pulse);
  servoPositions[channel] = angle;
}

void moveServoSmooth(int channel, int targetAngle) {
  int current = servoPositions[channel];
  int step = (targetAngle > current) ? 1 : -1;
  
  while (current != targetAngle) {
    current += step;
    setServoAngle(channel, current);
    delay(SERVO_MOVE_STEP_MS);
  }
}

void openAllDoors() {
  Serial.println("Opening all doors...");
  // Move all 4 servos in parallel by interleaving small moves
  // For simplicity, we just move them sequentially fast
  for (int i = 0; i < 4; i++) {
    moveServoSmooth(i, DOOR_OPEN);
  }
}

void closeAllDoors() {
  Serial.println("Closing all doors...");
  for (int i = 0; i < 4; i++) {
    moveServoSmooth(i, DOOR_CLOSED);
  }
}

void openDoor1() {
  moveServoSmooth(SERVO_D1_LEFT, DOOR_OPEN);
  moveServoSmooth(SERVO_D1_RIGHT, DOOR_OPEN);
}

void openDoor2() {
  moveServoSmooth(SERVO_D2_LEFT, DOOR_OPEN);
  moveServoSmooth(SERVO_D2_RIGHT, DOOR_OPEN);
}

// ================================================================================
// IR REMOTE HANDLING
// ================================================================================
void handleIRRemote() {
  if (!IrReceiver.decode()) return;
  
  bool isRepeat = (IrReceiver.decodedIRData.flags & IRDATA_FLAGS_IS_REPEAT);
  uint16_t cmd = IrReceiver.decodedIRData.command;
  
  if (!isRepeat) {
    Serial.print("IR: 0x"); Serial.println(cmd, HEX);
    
    switch (cmd) {
      case IR_POWER:
        // Toggle STANDBY / ACTIVE
        if (currentState == STATE_STANDBY) {
          enterState(STATE_ACTIVE_IDLE);
        } else {
          closeAllDoors();
          enterState(STATE_STANDBY);
        }
        break;
        
      case IR_EQ:
        // Force STANDBY
        closeAllDoors();
        enterState(STATE_STANDBY);
        break;
        
      case IR_PLAY:
        // Manual: open both doors, then auto-close after 4s
        if (currentState == STATE_ACTIVE_IDLE) {
          lastMemberName = "MANUAL";
          lastMemberTier = "Remote override";
          lastScanDirection = "IN";
          enterState(STATE_APPROVED);
        }
        break;
        
      case IR_1:
        if (currentState == STATE_ACTIVE_IDLE) {
          openDoor1();
          delay(2000);
          moveServoSmooth(SERVO_D1_LEFT, DOOR_CLOSED);
          moveServoSmooth(SERVO_D1_RIGHT, DOOR_CLOSED);
        }
        break;
        
      case IR_2:
        if (currentState == STATE_ACTIVE_IDLE) {
          openDoor2();
          delay(2000);
          moveServoSmooth(SERVO_D2_LEFT, DOOR_CLOSED);
          moveServoSmooth(SERVO_D2_RIGHT, DOOR_CLOSED);
        }
        break;
        
      case IR_0:
        closeAllDoors();
        break;
    }
    
    lastActivityTime = millis();
  }
  
  IrReceiver.resume();
}

// ================================================================================
// PUSH BUTTON HANDLING
// ================================================================================
void handleButton() {
  bool state = digitalRead(BUTTON_PIN);
  
  if (state == LOW && buttonPreviousState == HIGH) {
    // Button just pressed
    buttonPressStart = millis();
  }
  
  if (state == HIGH && buttonPreviousState == LOW) {
    // Button released — check duration
    unsigned long pressDuration = millis() - buttonPressStart;
    
    if (pressDuration > 10000) {
      // Long-press (10s): reset WiFi credentials
      Serial.println("Long press: Resetting WiFi credentials");
      WiFiManager wm;
      wm.resetSettings();
      ESP.restart();
    } else if (pressDuration > 50) {
      // Short press: toggle STANDBY / ACTIVE
      if (currentState == STATE_STANDBY) {
        enterState(STATE_ACTIVE_IDLE);
      } else {
        closeAllDoors();
        enterState(STATE_STANDBY);
      }
    }
  }
  
  buttonPreviousState = state;
}

// ================================================================================
// WIFI SETUP (WiFiManager captive portal)
// ================================================================================
void setupWiFi() {
  WiFiManager wm;
  wm.setConfigPortalTimeout(180);  // 3 min timeout
  
  // Try to connect with saved credentials, or start portal
  drawBootScreen("Connect: GuelphGymGate", 90);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("WiFi setup:     ");
  lcd.setCursor(0, 1);
  lcd.print("GuelphGymGate   ");
  
  bool ok = wm.autoConnect("GuelphGymGate", "gatesetup");
  
  if (!ok) {
    Serial.println("WiFi setup failed — continuing without WiFi");
    drawBootScreen("WiFi failed (offline mode)", 95);
    delay(2000);
  } else {
    Serial.print("WiFi connected: ");
    Serial.println(WiFi.localIP());
    drawBootScreen("WiFi OK!", 100);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi connected  ");
    lcd.setCursor(0, 1);
    lcd.print(WiFi.localIP().toString());
    delay(1500);
    wifiConfigured = true;
  }
}

// ================================================================================
// UTILITIES
// ================================================================================
String truncate(const String& s, int len) {
  if (s.length() <= len) {
    String out = s;
    while (out.length() < len) out += " ";
    return out;
  }
  return s.substring(0, len);
}
