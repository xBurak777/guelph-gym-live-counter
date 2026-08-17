# System Architecture and Integration Contract

## Purpose

The prototype demonstrates a complete physical-to-cloud access and occupancy workflow. The ESP32 coordinates local hardware, while the web backend controls authorization, IN/OUT direction, persistent events, and occupancy.

## Runtime Sequence

```text
1. Operator presses the IR POWER button.
2. ESP32 enables the PN532 reader and enters ACTIVE mode.
3. Member presents an RFID/NFC card.
4. PN532 returns the card UID to the ESP32.
5. ESP32 posts cardUid and gateId to /api/scan over HTTPS.
6. API authenticates the gate using SCAN_API_SECRET.
7. API resolves the member and validates active/expiry state.
8. A serializable transaction toggles the member's persistent `isInside` state.
9. API stores the ScanEvent and returns the transaction's new occupancy.
10. ESP32 renders the result on the TFT and LCD.
11. Only SUCCESS starts the two-servo gate sequence.
12. The website polls /api/occupancy every five seconds.
```

## Component Responsibilities

| Component | Responsibility |
|---|---|
| PN532 | Read the physical card UID |
| ESP32 | Coordinate peripherals, networking, user feedback, and gate motion |
| `/api/scan` | Authenticate requests, authorize members, atomically toggle presence, persist scan events |
| Neon PostgreSQL | Store members, scan events, completed gym sessions, and facility data |
| `/api/occupancy` | Compute the live count and crowd-status payload |
| React live counter | Refresh and display occupancy every five seconds |

## Scan Request

```json
{
  "cardUid": "AA:BB:CC:DD",
  "gateId": "gate-1"
}
```

Required header:

```text
Authorization: Bearer <SCAN_API_SECRET>
```

## Successful Response

```json
{
  "ok": true,
  "result": "SUCCESS",
  "direction": "IN",
  "message": "Welcome, Member. Have a great workout.",
  "member": {
    "firstName": "Member",
    "lastName": "Name",
    "membershipTier": "STANDARD",
    "membershipEnd": "2027-08-17T00:00:00.000Z",
    "photoUrl": null
  },
  "occupancy": 1,
  "capacity": 450
}
```

## Denial Responses

| Result | Meaning | Counter | Gate |
|---|---|---|---|
| `DENIED_UNKNOWN_CARD` | UID is not registered | Unchanged | Closed |
| `DENIED_EXPIRED` | Membership end date has passed | Unchanged | Closed |
| `DENIED_INACTIVE` | Membership is disabled | Unchanged | Closed |
| Network, timeout, malformed response | No valid server authorization | Unchanged | Closed |

## Occupancy Model

Each accepted tap runs in a serializable database transaction. The API toggles `Member.isInside`, sets or clears `currentVisitStartedAt`, stores a successful `ScanEvent`, and counts members whose `isInside` value is true. A successful exit also creates a completed `GymSession` for visit-duration reporting.

The website reads current occupancy from the database and refreshes the client display every five seconds. Denied scans are retained for auditability but are excluded from occupancy.

## Gate State Machine

```text
CLOSED -> OPENING -> OPEN -> CLOSING -> CLOSED
```

- Closed position: Door A 90 degrees, Door B 90 degrees
- Open position: Door A 0 degrees, Door B 180 degrees
- Motion rate: one degree every 8 ms
- Open hold: 8 seconds
- POWER stop during motion: initiate or complete safe return to CLOSED

## Security Boundary

The repository contains no live credentials. Production values belong in Vercel environment variables and the private local copy of `config.h`. A production hardening pass should replace the prototype's insecure TLS client mode with certificate validation and add replay/idempotency protection for scan retries.
