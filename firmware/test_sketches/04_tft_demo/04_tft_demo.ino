/*
 * ============================================================================
 * Test Sketch 04: TFT Demo v2 — Polished UI Preview
 * ============================================================================
 * Purpose: Prove the 2.8" ILI9341 TFT works AND showcase the target UI design
 *
 * What it does:
 *   - Initializes ILI9341 in portrait mode (240x320)
 *   - Cycles through 3 professional demo screens every 4 seconds:
 *       1. STANDBY  — "TAP CARD" prompt with Gryphon header + occupancy bar
 *       2. SUCCESS  — Green checkmark, welcome message, member ID
 *       3. DENIED   — Red X mark, "ACCESS DENIED" message
 *   - Auto-refreshes on every state change (self-heals if display resets)
 *
 * Hardware wiring (SPI display only, touch not yet wired):
 *   TFT VCC   -> 3V3 rail (breadboard + rail)
 *   TFT GND   -> GND rail (breadboard - rail)
 *   TFT LED   -> 3V3 rail (backlight)
 *   TFT CS    -> ESP32 D5  (GPIO 5)
 *   TFT RESET -> ESP32 D4  (GPIO 4)
 *   TFT DC    -> ESP32 D2  (GPIO 2)
 *   TFT MOSI  -> ESP32 D23 (GPIO 23, hardware SPI)
 *   TFT SCK   -> ESP32 D18 (GPIO 18, hardware SPI)
 *   TFT MISO  -> ESP32 D19 (GPIO 19, hardware SPI)
 *
 * Required libraries:
 *   - Adafruit GFX Library
 *   - Adafruit ILI9341
 *
 * Passing this test proves:
 *   - SPI bus is wired correctly (MOSI/SCK/CS/DC)
 *   - Backlight is powered from 3.3V (not 5V)
 *   - ILI9341 driver is responding to init commands
 *   - Ready to render live UI states from real card scans
 *
 * Author: Burak Aksoy
 * Project: Guelph Gym Live Counter — RFID Gate System
 * ============================================================================
 */

#include <SPI.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

#define TFT_CS    5
#define TFT_DC    2
#define TFT_RST   4

Adafruit_ILI9341 tft = Adafruit_ILI9341(TFT_CS, TFT_DC, TFT_RST);

// Gryphon brand colors (RGB565)
#define GRYPHON_RED   0xB000
#define GRYPHON_GOLD  0xFEA0
#define BG_DARK       0x1082
#define TEXT_LIGHT    0xEF7D
#define TEXT_MUTED    0x8410

enum Screen { STANDBY, SUCCESS, DENIED };
Screen currentScreen = STANDBY;
unsigned long lastScreenChange = 0;
const unsigned long SCREEN_INTERVAL = 4000;

int occupancy = 87;
const int CAPACITY = 350;

void setup() {
  Serial.begin(115200);
  delay(100);
  Serial.println("\n=== TFT Demo v2 ===");

  tft.begin();
  tft.setRotation(0);
  tft.fillScreen(BG_DARK);

  drawScreen();
  lastScreenChange = millis();
}

void loop() {
  if (millis() - lastScreenChange > SCREEN_INTERVAL) {
    if (currentScreen == STANDBY)      currentScreen = SUCCESS;
    else if (currentScreen == SUCCESS) currentScreen = DENIED;
    else                                currentScreen = STANDBY;

    drawScreen();
    lastScreenChange = millis();
  }
}

void drawHeader() {
  tft.fillRect(0, 0, 240, 40, GRYPHON_RED);
  drawLogoMark(12, 8, TEXT_LIGHT);
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(2);
  tft.setCursor(48, 10);
  tft.print("GRYPHON");
  tft.setTextSize(1);
  tft.setCursor(48, 27);
  tft.print("FIT & REC");
}

void drawFooter() {
  tft.fillRect(0, 280, 240, 40, BG_DARK);
  tft.drawFastHLine(0, 280, 240, GRYPHON_GOLD);
  tft.setTextColor(TEXT_MUTED);
  tft.setTextSize(1);
  tft.setCursor(10, 290);
  tft.print("LIVE OCCUPANCY");
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(2);
  tft.setCursor(10, 302);
  tft.print(occupancy);
  tft.setTextColor(TEXT_MUTED);
  tft.setTextSize(1);
  tft.setCursor(50, 308);
  tft.print("/ ");
  tft.print(CAPACITY);
  int barWidth = (occupancy * 100) / CAPACITY;
  tft.drawRect(120, 302, 108, 12, TEXT_MUTED);
  tft.fillRect(122, 304, barWidth, 8, GRYPHON_GOLD);
}

void drawLogoMark(int x, int y, uint16_t color) {
  tft.drawCircle(x + 12, y + 12, 11, color);
  tft.drawCircle(x + 12, y + 12, 10, color);
  tft.fillRect(x + 12, y + 10, 12, 4, color);
  tft.fillRect(x + 18, y + 6, 4, 8, color);
}

void drawScreen() {
  tft.fillScreen(BG_DARK);
  drawHeader();
  drawFooter();
  switch (currentScreen) {
    case STANDBY: drawStandby(); break;
    case SUCCESS: drawSuccess(); break;
    case DENIED:  drawDenied();  break;
  }
}

void drawStandby() {
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(3);
  tft.setCursor(50, 110);
  tft.print("TAP");
  tft.setCursor(30, 145);
  tft.print("CARD");
  tft.setTextColor(GRYPHON_GOLD);
  tft.setTextSize(1);
  tft.setCursor(50, 200);
  tft.print("Ready to scan");
  tft.fillCircle(90, 230, 4, GRYPHON_GOLD);
  tft.fillCircle(110, 230, 4, GRYPHON_GOLD);
  tft.fillCircle(130, 230, 4, GRYPHON_GOLD);
  tft.fillCircle(150, 230, 4, GRYPHON_GOLD);
}

void drawSuccess() {
  tft.fillRect(0, 60, 240, 4, 0x0680);
  drawCheckmark(90, 100, 60, 0x0680);
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(2);
  tft.setCursor(40, 190);
  tft.print("WELCOME");
  tft.setCursor(50, 218);
  tft.setTextColor(GRYPHON_GOLD);
  tft.print("BURAK A.");
  tft.setTextColor(TEXT_MUTED);
  tft.setTextSize(1);
  tft.setCursor(60, 250);
  tft.print("Member #24601");
  tft.setCursor(60, 262);
  tft.print("Access granted");
}

void drawDenied() {
  tft.fillRect(0, 60, 240, 4, GRYPHON_RED);
  drawXMark(90, 100, 60, GRYPHON_RED);
  tft.setTextColor(GRYPHON_RED);
  tft.setTextSize(2);
  tft.setCursor(20, 190);
  tft.print("ACCESS DENIED");
  tft.setTextColor(TEXT_LIGHT);
  tft.setTextSize(1);
  tft.setCursor(30, 220);
  tft.print("Card not registered");
  tft.setCursor(30, 235);
  tft.print("or membership expired");
  tft.setTextColor(TEXT_MUTED);
  tft.setCursor(30, 255);
  tft.print("Please see front desk");
}

void drawCheckmark(int cx, int cy, int size, uint16_t color) {
  int s = size / 2;
  for (int i = 0; i < 4; i++) {
    tft.drawLine(cx - s/2, cy, cx, cy + s/2 - i, color);
    tft.drawLine(cx, cy + s/2 - i, cx + s, cy - s/2, color);
    tft.drawLine(cx - s/2, cy + i, cx, cy + s/2, color);
    tft.drawLine(cx, cy + s/2, cx + s, cy - s/2 + i, color);
  }
}

void drawXMark(int cx, int cy, int size, uint16_t color) {
  int s = size / 2;
  for (int i = -2; i <= 2; i++) {
    tft.drawLine(cx - s, cy - s + i, cx + s, cy + s + i, color);
    tft.drawLine(cx - s, cy + s - i, cx + s, cy - s - i, color);
  }
}
