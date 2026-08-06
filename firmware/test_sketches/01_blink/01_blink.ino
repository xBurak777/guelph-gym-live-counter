/*
 * ============================================================================
 * Test Sketch 01: Blink
 * ============================================================================
 * Purpose: Verify ESP32 board can be flashed and run code
 *
 * What it does:
 *   - Blinks the on-board blue LED (GPIO 2) once every 200ms
 *   - Prints "LED ON" / "LED OFF" to the Serial Monitor every cycle
 *
 * How to use:
 *   1. Board: "ESP32 Dev Module" (Tools -> Board -> ESP32 -> ESP32 Dev Module)
 *   2. Port: your COM port (e.g. COM3 on Windows)
 *   3. Upload sketch (right-arrow button)
 *   4. Open Serial Monitor at 115200 baud
 *
 * Expected: On-board blue LED flashes rapidly; Serial Monitor shows
 * alternating "LED ON" / "LED OFF" every 200ms.
 *
 * Passing this test proves:
 *   - USB cable is a data cable (not power-only)
 *   - CP210x driver is installed
 *   - ESP32 board files are installed in Arduino IDE
 *   - Board can enter bootloader mode without pressing BOOT
 *
 * Author: Burak Aksoy
 * Project: Guelph Gym Live Counter — RFID Gate System
 * ============================================================================
 */

#define LED_PIN 2  // on-board blue LED on most ESP32 dev boards

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);
  while (!Serial);           // wait for USB serial to attach
  Serial.println("\n=== Blink Test ===");
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED ON");
  delay(200);

  digitalWrite(LED_PIN, LOW);
  Serial.println("LED OFF");
  delay(200);
}
