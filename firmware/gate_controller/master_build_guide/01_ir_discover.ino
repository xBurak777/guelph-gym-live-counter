/*
 * ================================================================
 * SKETCH 1: IR CODE DISCOVERY
 * ================================================================
 * 
 * Purpose: Capture the hex codes from your ELEGOO IR remote so we
 *          can hard-code them into gate_controller.ino
 * 
 * Wiring:
 *   KY-022 G (GND)      -> ESP32 GND rail
 *   KY-022 R (VCC)      -> ESP32 3.3V rail
 *   KY-022 Y (Signal)   -> ESP32 GPIO 27
 * 
 * Instructions:
 *   1. Upload this sketch (Ctrl+U in Arduino IDE)
 *   2. Open Serial Monitor (Ctrl+Shift+M), set baud to 115200
 *   3. Point ELEGOO remote at KY-022 dome
 *   4. Press each button once and write down the "Command: 0xXX" value
 *   5. Update gate_controller.ino with these values
 * 
 * Board: ESP32 Dev Module
 * Library: IRremote by shirriff, z3t0, ArminJo (v4.x)
 * ================================================================
 */

#include <IRremote.hpp>

// ==================== PIN ====================
#define IR_RECEIVE_PIN  27

// ==================== SETUP ====================
void setup() {
  Serial.begin(115200);
  delay(500);
  
  Serial.println();
  Serial.println("========================================");
  Serial.println("   IR CODE DISCOVERY SKETCH");
  Serial.println("   Guelph Gym Gate — RFID Project");
  Serial.println("========================================");
  Serial.println();
  Serial.print("IR receiver on GPIO ");
  Serial.println(IR_RECEIVE_PIN);
  Serial.println();
  Serial.println("Point ELEGOO remote at the KY-022 dome.");
  Serial.println("Press each button and note the Command hex.");
  Serial.println();
  Serial.println("BUTTONS TO CAPTURE (write these down):");
  Serial.println("  1. Red POWER (top-left)      -> IR_POWER");
  Serial.println("  2. EQ                        -> IR_EQ");
  Serial.println("  3. Play/Pause                -> IR_PLAY");
  Serial.println("  4. Number '1'                -> IR_1");
  Serial.println("  5. Number '2'                -> IR_2");
  Serial.println("  6. Number '0'                -> IR_0");
  Serial.println();
  Serial.println("Ready — press a button now:");
  Serial.println();
  
  IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);
}

// ==================== LOOP ====================
void loop() {
  if (IrReceiver.decode()) {
    // Check if it's a repeat (holding button down)
    bool isRepeat = (IrReceiver.decodedIRData.flags & IRDATA_FLAGS_IS_REPEAT);
    
    if (!isRepeat) {
      // First press — display cleanly
      Serial.println("----------------------------------------");
      Serial.print("Protocol: ");
      Serial.print(getProtocolString(IrReceiver.decodedIRData.protocol));
      
      Serial.print(" | Addr: 0x");
      if (IrReceiver.decodedIRData.address < 0x10) Serial.print("0");
      Serial.print(IrReceiver.decodedIRData.address, HEX);
      
      Serial.print(" | Command: 0x");
      if (IrReceiver.decodedIRData.command < 0x10) Serial.print("0");
      Serial.print(IrReceiver.decodedIRData.command, HEX);
      
      Serial.println();
      Serial.print("  >>> USE THIS: 0x");
      if (IrReceiver.decodedIRData.command < 0x10) Serial.print("0");
      Serial.print(IrReceiver.decodedIRData.command, HEX);
      Serial.println(" <<<");
      Serial.println();
    } else {
      // Repeat — subtle indicator
      Serial.println("  (repeat)");
    }
    
    IrReceiver.resume();
  }
}
