# Final Verification and Acceptance Procedure

Use this procedure after wiring, firmware changes, or before a presentation. Stop immediately if a power rail overheats, the ESP32 repeatedly resets, a servo stalls, or wiring smells hot.

## Pre-Power Test

- [ ] Final wiring matches `WIRING.md`.
- [ ] External servo supply is set to approximately 6 V.
- [ ] Servo positive is isolated from ESP32 power.
- [ ] Servo supply ground and ESP32 ground are common.
- [ ] The 1000 uF capacitor has correct polarity.
- [ ] Door linkages move freely by hand with power removed.

## Boot Test

1. Power the ESP32 with the servo adapter off.
2. Open Serial Monitor at 115200 baud.
3. Reset the ESP32.
4. Confirm the TFT and LCD initialize.
5. Confirm PN532 initialization succeeds.
6. Confirm both servo command positions initialize to 90 degrees.
7. Confirm the display reports STOPPED.

Pass: the controller reaches `SYSTEM READY` without resets or PN532 errors.

## Servo Power Test

1. Keep the system STOPPED.
2. Enable the external 6 V servo supply.
3. Confirm neither servo moves continuously, buzzes heavily, or heats rapidly.
4. Confirm the ESP32 does not reset.

Pass: both gates remain closed at 90 degrees and logic remains stable.

## Remote Test

1. Aim the Elegoo remote at the KY-022.
2. Press the red POWER button once.
3. Confirm Serial Monitor reports `SYSTEM ACTIVE`.
4. Confirm the TFT/LCD show the ready state.
5. Press POWER again.
6. Confirm `SYSTEM STOPPED` and both doors are or return to closed.

Pass: each distinct press toggles state once using command `0x45`.

## Approved Entry Test

1. Activate the system.
2. Note the website occupancy.
3. Present a registered active card that is currently outside.
4. Confirm the ESP32 sends the UID to `/api/scan`.
5. Confirm the response is `SUCCESS` with direction `IN`.
6. Confirm the TFT displays the approved member result.
7. Confirm both doors move synchronously:

   ```text
   Door A: 90 to 0 degrees
   Door B: 90 to 180 degrees
   ```

8. Confirm the doors hold open for eight seconds and return to 90 degrees.
9. Within the website's five-second refresh interval, confirm occupancy increases by one.

Pass: authorization, displays, motion, database event, and live counter agree.

## Approved Exit Test

1. Scan the same approved card again after the reader has rearmed.
2. Confirm the response is `SUCCESS` with direction `OUT`.
3. Confirm the gate opens and closes normally.
4. Confirm website occupancy decreases by one.
5. Confirm a completed gym session is available for visit-duration calculations.

Pass: the same member correctly toggles from IN to OUT.

## Denial Tests

Run separate tests for:

- unknown card;
- inactive member;
- expired member.

For every denial, confirm:

- response contains the appropriate `DENIED_*` result;
- TFT/LCD show denied status;
- both servos remain closed;
- occupancy does not change.

## Network Failure Test

1. Start with the gate closed.
2. Disconnect or block Wi-Fi.
3. Scan an otherwise valid card.
4. Confirm the firmware does not authorize locally.
5. Confirm the gate remains closed and occupancy is unchanged.
6. Restore Wi-Fi and verify a later scan can succeed.

Pass: the system fails closed without a valid backend response.

## Stop-During-Motion Test

1. Trigger an approved scan.
2. While the gate is opening or open, press remote POWER.
3. Confirm the state changes to STOPPED.
4. Confirm the motion state machine safely returns both doors to 90 degrees.

Pass: remote shutdown never leaves the system accepting scans or the doors commanded open.

## Presentation Acceptance Checklist

- [ ] Final firmware compiles without errors.
- [ ] No real credential is present in Git.
- [ ] Website production build passes.
- [ ] STOPPED/ACTIVE remote control passes.
- [ ] Approved IN changes occupancy by +1.
- [ ] Same approved card OUT changes occupancy by -1.
- [ ] Unknown, inactive, and expired scans change occupancy by 0.
- [ ] Gate opens only after a valid `SUCCESS`.
- [ ] Both doors close after the eight-second hold.
- [ ] TFT and LCD remain readable throughout the workflow.
- [ ] ESP32 remains stable while both servos move.

## Troubleshooting Matrix

| Symptom | Check first |
|---|---|
| PN532 powered but not detected | I2C selector mode, SDA 21, SCL 22, IRQ 35, RESET 13, common ground |
| TFT backlight but no graphics | CS 32, RST 33, DC 27, MOSI 23, SCK 18 |
| LCD backlight but no text | RS/EN/D4-D7 mapping, RW to ground, contrast potentiometer |
| IR does not toggle | KY-022 pin labels, GPIO34 signal, remote command `0x45`, direct line of sight |
| Servo moves but ESP32 resets | Servo positive incorrectly tied to logic, weak supply, missing common ground/capacitor |
| HTTP 401 | ESP32 and Vercel `SCAN_API_SECRET` do not match |
| HTTP timeout or negative code | Wi-Fi, DNS, URL, TLS, or Vercel availability |
| Valid card denied | UID formatting, member record, `isActive`, membership end date |
| Counter does not refresh immediately | Wait for the five-second website polling interval and inspect `/api/occupancy` |
| Second scan gives wrong direction | Inspect the member's `isInside` and `currentVisitStartedAt` values and the latest `ScanEvent` |
