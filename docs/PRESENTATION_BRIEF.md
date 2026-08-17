# Professional Presentation Brief

## Project Statement

The Guelph Gym Live Counter is a working cyber-physical prototype that connects member access at a miniature RFID gate to a cloud-hosted occupancy service. It demonstrates embedded control, secure API integration, persistent event modeling, responsive web development, and physical fabrication in one end-to-end system.

## Problem

Gym users cannot reliably determine how busy a facility is before arriving. Estimated popularity data is not the same as a live count, and a manual counter is difficult to keep synchronized with real entries and exits.

## Solution

Each approved member scan creates a server-authorized IN or OUT event. The database becomes the source of truth for current occupancy, the website displays that value within a five-second refresh interval, and the physical gate opens only after a successful authorization response.

## Engineering Contributions

- Integrated an ESP32, PN532 reader, TFT, parallel LCD, IR receiver, and two high-torque servos.
- Implemented a non-blocking opposing-servo gate state machine.
- Built fail-closed HTTPS authorization between the embedded controller and a Next.js API.
- Modeled members, scan events, and completed gym sessions in PostgreSQL with Prisma.
- Developed a responsive multi-page website with a live occupancy component.
- Separated high-current servo power from logic power while maintaining common ground.
- Created final wiring, setup, testing, architecture, and procurement documentation.

## Demonstration Sequence

1. Show the website counter and the physical gate in the closed, STOPPED state.
2. Press the remote POWER button and show ACTIVE mode.
3. Scan an approved card and show the IN result.
4. Show both gate doors open, hold, and close.
5. Show the website counter increase after its refresh.
6. Scan the same card again and show OUT with a counter decrease.
7. Scan an unknown, inactive, or expired card and show that the gate stays closed and occupancy is unchanged.
8. Stop the system with the remote.

## Final Metrics

| Metric | Result |
|---|---|
| Gate actuators | 2 synchronized MG996-class servos |
| Door travel | A: 90 to 0 degrees, B: 90 to 180 degrees |
| Open hold | 8 seconds |
| Website refresh | 5 seconds |
| Firmware flash use | 971,097 bytes, 74% in the verified build environment |
| Firmware dynamic memory | 48,340 bytes, 14% |
| Website production routes | 61 generated or server-rendered routes |
| Final active electronics | $148.62 CAD |
| Documented mechanical materials | $132.48 CAD |
| Documented active build | $281.10 CAD before tax and shipping |

## Production Considerations

This prototype proves the complete workflow. A production facility deployment would additionally require certified electrical/mechanical enclosures, emergency egress and accessibility review, privacy and retention controls, administrative enrollment tools, certificate validation, request idempotency, monitoring, redundancy, and integration with the institution's approved identity and access systems.
