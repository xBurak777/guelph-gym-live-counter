/*
 * Test Sketch 05: Dual Servo Sweep — Turnstile Gate Simulation
 *
 * Wiring (confirmed with Burak's board 2026-08-09):
 *   Servo LEFT  signal → ESP32 D15 (column A, row 3 from top)
 *   Servo RIGHT signal → ESP32 TX2 / GPIO 17 (column A, row 7 from top)
 *   Both servos: RED (+5V)   → MB102 +5V rail on second breadboard
 *                BROWN (GND) → MB102 GND rail on second breadboard
 *                             → GND rail bridged to ESP32 GND
 *
 * NOTE: On 2026-08-09 the second servo was found DEAD. Confirmed by swapping
 *       physical servos — same body failed on both D15 and TX2. Working servo
 *       ran fine on both pins. Replacement 10-pack arriving 2026-08-10.
 */

#include <ESP32Servo.h>

#define SERVO_LEFT_PIN   15   // Column A, Row 3 (D15)
#define SERVO_RIGHT_PIN  17   // Column A, Row 7 (TX2 / GPIO 17)

#define POS_CLOSED       0
#define POS_OPEN         90
#define SWEEP_STEP_MS    4    // ~360ms per 90° sweep
#define DOOR_OPEN_TIME   3000
#define CYCLE_PAUSE      2000

Servo servoLeft;
Servo servoRight;

void setup() {
  Serial.begin(115200);
  delay(100);
  Serial.println("\n=== Dual Servo Sweep — Turnstile Gate Simulation ===");

  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);

  servoLeft.setPeriodHertz(50);
  servoRight.setPeriodHertz(50);

  servoLeft.attach(SERVO_LEFT_PIN, 500, 2400);
  servoRight.attach(SERVO_RIGHT_PIN, 500, 2400);

  Serial.println("Initializing: both doors CLOSED");
  servoLeft.write(POS_CLOSED);
  servoRight.write(POS_CLOSED);
  delay(1000);
}

void sweepBoth(int fromAngle, int toAngle) {
  if (fromAngle < toAngle) {
    for (int angle = fromAngle; angle <= toAngle; angle++) {
      servoLeft.write(angle);
      servoRight.write(angle);
      delay(SWEEP_STEP_MS);
    }
  } else {
    for (int angle = fromAngle; angle >= toAngle; angle--) {
      servoLeft.write(angle);
      servoRight.write(angle);
      delay(SWEEP_STEP_MS);
    }
  }
}

void loop() {
  Serial.println("Opening doors...");
  sweepBoth(POS_CLOSED, POS_OPEN);

  Serial.print("Doors OPEN — holding for ");
  Serial.print(DOOR_OPEN_TIME / 1000);
  Serial.println(" seconds");
  delay(DOOR_OPEN_TIME);

  Serial.println("Closing doors...");
  sweepBoth(POS_OPEN, POS_CLOSED);

  Serial.print("Doors CLOSED — pausing ");
  Serial.print(CYCLE_PAUSE / 1000);
  Serial.println(" seconds before next cycle");
  delay(CYCLE_PAUSE);
}
