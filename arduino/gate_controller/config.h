/*
 * =====================================================================
 * config.h — All pin assignments & credentials for the gate controller
 * =====================================================================
 *
 * Edit ONLY the SECRETS section before uploading.
 * Pin assignments below are already correct for the wiring diagram in
 * arduino/docs/WIRING.md — do not change them unless you also change
 * the wiring.
 * =====================================================================
 */

#ifndef GATE_CONTROLLER_CONFIG_H
#define GATE_CONTROLLER_CONFIG_H

// =====================================================================
// SECRETS — you fill these in
// =====================================================================

// The full URL of your deployed website (no trailing slash).
// Production live: https://guelph-gym-live-counter.vercel.app
// Local dev:       http://192.168.x.x:3000  (your laptop's IP)
#define API_BASE_URL "https://guelph-gym-live-counter.vercel.app"

// This must match the SCAN_API_SECRET env var on Vercel exactly.
// Get it from: Vercel Dashboard -> Project -> Settings -> Environment Variables
// If you haven't set it in production yet, follow docs/SETUP.md step 6.
#define SCAN_API_SECRET "dev-shared-secret-change-in-prod-b7f9e3a1c4d8"

// Identifies which gate this is (in case you build a second one).
#define GATE_ID "gate-1"

// WiFiManager captive-portal SSID + password.
// When ESP32 has no saved WiFi, it opens this network. You connect
// with your phone and pick your real WiFi.
#define WM_AP_NAME "GuelphGymGate-Setup"
#define WM_AP_PASSWORD "gatesetup"  // 8+ chars required by ESP32

// =====================================================================
// PIN ASSIGNMENTS — matched to the WIRING.md diagram
// =====================================================================

// --- I2C bus (shared by PN532 + LCD 16x2) ---
#define I2C_SDA_PIN   21
#define I2C_SCL_PIN   22

// --- PN532 RFID (in I2C mode, DIP switches: SET0=ON, SET1=OFF) ---
#define PN532_IRQ_PIN     32   // NOT USED in I2C mode but Adafruit lib wants a pin
#define PN532_RESET_PIN   33   // Optional, tied to ESP32 GPIO

// --- LCD 16x2 I2C ---
// Default HD44780 I2C backpack address (PCF8574). If your LCD is dark
// with no text, run an I2C scanner and update this (common: 0x27 or 0x3F).
#define LCD_I2C_ADDR  0x27
#define LCD_COLS      16
#define LCD_ROWS      2

// --- TFT ILI9341 2.8" (SPI, hardware SPI on ESP32) ---
//   ESP32 default HW SPI (VSPI):
//     MOSI = 23, MISO = 19, SCK = 18
//   These are hardcoded by the Adafruit_ILI9341 driver.
//   Only CS / DC / RST are user-selectable:
#define TFT_CS_PIN   5
#define TFT_DC_PIN   2
#define TFT_RST_PIN  4

// --- Servos ---
// Any GPIO that supports PWM output works. Avoid pins 34-39 (input only).
#define SERVO_TOP_PIN     25   // top servo, PWM
#define SERVO_BOTTOM_PIN  26   // bottom servo, PWM

// SG90 pulse-width range (in microseconds).
// Fine-tune these if the servo range doesn't quite hit 0-180 degrees.
#define SERVO_MIN_US  500
#define SERVO_MAX_US  2400

// Door open angle (0 = closed / rest, 90 = fully open)
#define DOOR_OPEN_ANGLE  90

// =====================================================================
// TIMING
// =====================================================================

// How long the door stays open on a successful scan (ms).
#define SUCCESS_HOLD_MS  3000

// How long the DENIED screen shows before returning to idle (ms).
#define DENIED_HOLD_MS   2000

// Ignore duplicate scans of the same card within this window (ms).
#define DEBOUNCE_MS      2500

// HTTP timeout for the /api/scan call (ms).
#define HTTP_TIMEOUT_MS  8000

#endif // GATE_CONTROLLER_CONFIG_H
