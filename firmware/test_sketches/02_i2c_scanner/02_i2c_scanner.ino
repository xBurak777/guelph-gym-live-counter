/*
 * ============================================================================
 * Test Sketch 02: I2C Scanner
 * ============================================================================
 * Purpose: Detect all I2C devices connected to the ESP32
 *
 * What it does:
 *   - Probes every possible I2C address (0x01 through 0x7E)
 *   - Reports any addresses that respond
 *   - Runs continuously every 2 seconds
 *
 * Hardware:
 *   PN532 NFC module wired to ESP32 in I2C mode:
 *     PN532 GND -> ESP32 GND
 *     PN532 VCC -> ESP32 3V3
 *     PN532 SDA -> ESP32 D21 (GPIO 21)
 *     PN532 SCL -> ESP32 D22 (GPIO 22)
 *
 *   PN532 DIP switch MUST be in I2C mode:
 *     Switch 1 (SET0) UP toward "ON"
 *     Switch 2 (SET1) DOWN toward "KE"
 *
 * Expected output:
 *   Scanning...
 *   I2C device found at address 0x24  !     <-- PN532 (usually 0x24 or 0x48)
 *   Total: 1 device(s) found
 *
 * If you also wire an LCD backpack, you should see a second address (0x27 or 0x3F).
 *
 * Passing this test proves:
 *   - All 4 wires are seated correctly
 *   - PN532 is powered (3.3V)
 *   - PN532 DIP switch is in I2C mode
 *   - ESP32 I2C bus is working
 *
 * Author: Burak Aksoy
 * Project: Guelph Gym Live Counter — RFID Gate System
 * ============================================================================
 */

#include <Wire.h>

void setup() {
  Wire.begin();          // uses default ESP32 I2C pins: SDA=GPIO21, SCL=GPIO22
  Serial.begin(115200);
  while (!Serial);
  Serial.println("\n=== I2C Scanner ===");
}

void loop() {
  byte error, address;
  int nDevices = 0;

  Serial.println("Scanning...");

  for (address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();

    if (error == 0) {
      Serial.print("I2C device found at address 0x");
      if (address < 16) Serial.print("0");
      Serial.print(address, HEX);
      Serial.println("  !");
      nDevices++;
    }
  }

  if (nDevices == 0) {
    Serial.println("No I2C devices found\n");
  } else {
    Serial.print("Total: ");
    Serial.print(nDevices);
    Serial.println(" device(s) found\n");
  }

  delay(2000);
}
