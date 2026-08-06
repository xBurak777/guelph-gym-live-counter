/*
 * ============================================================================
 * Test Sketch 03: PN532 Card Reader
 * ============================================================================
 * Purpose: Read Mifare Classic (S50) card UIDs and print them
 *
 * What it does:
 *   - Initializes the PN532 in I2C mode
 *   - Prints firmware version at startup
 *   - Continuously polls for cards near the antenna coil
 *   - Prints the 4-byte UID when a card is detected
 *
 * Hardware:
 *   Same wiring as test 02 (I2C: PN532 GND/VCC/SDA/SCL to ESP32 GND/3V3/D21/D22)
 *   PN532 IRQ  -> ESP32 D32 (GPIO 32)  (optional — set to any input-capable pin)
 *   PN532 RSTO -> ESP32 D33 (GPIO 33)  (optional — reset line)
 *
 * Required library:
 *   Adafruit PN532 (install via Library Manager)
 *
 * Expected output at startup:
 *   === PN532 Card Reader Test ===
 *   Found chip PN532
 *   Firmware ver. 1.6
 *   Ready! Hold a card near the PN532 antenna (the round coil)...
 *
 * When you hold a Mifare S50 card near the antenna:
 *   >>> CARD DETECTED! <<<
 *   UID Length: 4 bytes
 *   UID Value: 47:07:12:5E
 *   Remove card and try another...
 *
 * Each Mifare S50 card has a unique 4-byte UID. Record these UIDs — they
 * become the primary keys for card records in the Neon database.
 *
 * Test cards recorded for this build:
 *   Card 1: 47:07:12:5E
 *   Card 2: 26:8C:75:E7
 *
 * Passing this test proves:
 *   - PN532 firmware is responsive
 *   - Antenna reads Mifare Classic 1K cards
 *   - System is ready for real gate_controller.ino firmware
 *
 * Author: Burak Aksoy
 * Project: Guelph Gym Live Counter — RFID Gate System
 * ============================================================================
 */

#include <Wire.h>
#include <Adafruit_PN532.h>

#define PN532_IRQ   (32)
#define PN532_RESET (33)

Adafruit_PN532 nfc(PN532_IRQ, PN532_RESET);

void setup() {
  Serial.begin(115200);
  while (!Serial);
  Serial.println("\n=== PN532 Card Reader Test ===");

  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    Serial.println("ERROR: Didn't find PN53x board");
    while (1);  // halt — check wiring
  }

  Serial.print("Found chip PN5");
  Serial.println((versiondata >> 24) & 0xFF, HEX);
  Serial.print("Firmware ver. ");
  Serial.print((versiondata >> 16) & 0xFF, DEC);
  Serial.print('.');
  Serial.println((versiondata >> 8) & 0xFF, DEC);

  nfc.SAMConfig();

  Serial.println("\nReady! Hold a card near the PN532 antenna (the round coil)...");
}

void loop() {
  uint8_t uid[]   = { 0, 0, 0, 0, 0, 0, 0 };
  uint8_t uidLength;

  boolean success = nfc.readPassiveTargetID(
      PN532_MIFARE_ISO14443A, uid, &uidLength, 1000);

  if (success) {
    Serial.println("\n>>> CARD DETECTED! <<<");
    Serial.print("UID Length: ");
    Serial.print(uidLength, DEC);
    Serial.println(" bytes");

    Serial.print("UID Value: ");
    for (uint8_t i = 0; i < uidLength; i++) {
      if (uid[i] < 0x10) Serial.print("0");
      Serial.print(uid[i], HEX);
      if (i < uidLength - 1) Serial.print(":");
    }
    Serial.println();
    Serial.println("Remove card and try another...");

    delay(1500);  // debounce
  }
}
