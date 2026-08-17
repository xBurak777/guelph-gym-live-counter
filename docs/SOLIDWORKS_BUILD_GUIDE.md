# RFID Gate — SolidWorks Build Guide

> Historical mechanical reference: this guide was created for the earlier SG90 concept. The completed electronics use two MG996-class servos. Recalculate actuator pockets, brackets, horn interfaces, and clearances from the actual MG996-class hardware before fabrication.

**Project:** Guelph Fit & Rec live-occupancy gate demo
**Designer:** Burak Aksoy
**Date:** August 2026
**Target:** 3D-printable single-lane swing gate for portfolio / co-op demonstration

---

## 1. Design brief

A single-lane swing-gate turnstile, ~1:2 tabletop scale of a real commercial unit (like the reference image). Two pill-shaped pedestals frame one acrylic swing door. One pedestal ("reader pillar", left side) houses all the electronics: PN532 NFC reader on the top face, 2.8" TFT touch display and 16×2 LCD side-by-side on the front face directly beside the scan zone, and hidden inside the base — the ESP32, servo, wiring, and USB-C power entry. The other pedestal ("receiver pillar", right side) is passive; the door swings across the lane and latches (or magnetically kisses) against it.

**Design intent (verbatim from user):**
- Copy the reference gate look, but with 2 pedestals and 1 door (not 3 pedestals + 2 doors).
- Door opens from one side only.
- Both LCDs sit side-by-side beside the scan section so a member sees name + expiry immediately after tapping.
- Color-coded status: green (OK), orange (expiring soon / payment issue), red (expired / unknown).
- All wiring, Arduino/ESP32, servo — hidden inside the base.

---

## 2. Overall dimensions

| Element | Dimension |
|---|---|
| Total footprint (both pillars + gap) | 300 mm (L) × 90 mm (D) |
| Pedestal outer size (each) | 90 mm (L) × 90 mm (D) × 200 mm (H) |
| Lane gap between pedestals | 120 mm |
| Pedestal cross-section | 90 × 90 mm rounded rectangle, R=25 mm corners on the long sides (pill profile matching reference) |
| Top curved cap | Radius 45 mm quarter-dome, rises 20 mm above the 200 mm body |
| Door (acrylic or PLA) | 120 mm (L) × 60 mm (H) × 3 mm (thick) |
| Wall thickness | 3 mm (all exterior walls) |
| Interior clear volume per pedestal | ~84 × 84 × 190 mm |

**Why these numbers:** Every library FDM printer (Prusa MK3/MK4, Bambu P1/A1, Ender 3, Voron 0.1) has a bed of at least 220 × 220 mm. Every part in this design fits on a 200 × 200 mm bed with room to spare, and each pedestal prints as 2 halves so nothing exceeds 200 mm in any axis.

---

## 3. Print strategy — parts breakdown

Print as **8 separate parts**, then assemble with M3 screws + heat-set inserts:

1. **Reader pillar — body shell** (front, back, sides as one part, 88mm tall)
2. **Reader pillar — top cap** (curved dome with PN532 antenna recess)
3. **Reader pillar — front panel insert** (removable, holds both screens; snaps into shell for easy service)
4. **Reader pillar — bottom access plate** (screwed on with 4× M3)
5. **Receiver pillar — body shell** (mirror of reader, but sealed / no cutouts)
6. **Receiver pillar — top cap**
7. **Receiver pillar — bottom plate**
8. **Door + servo horn coupler** (small part that connects the door to the servo shaft)

Print bed usage: all 8 parts fit on 3 print runs on a 220 × 220 bed.

Estimated print time on a Bambu A1: ~14 hours total. PLA (any color, but light grey or brushed-silver PLA will best match the reference stainless look).

---

## 4. SolidWorks build — reader pillar body shell

This is the biggest part. Follow these steps exactly. All units are millimeters. Set your SolidWorks default units to MMGS (Millimeters, Grams, Seconds) before starting: **Options → Document Properties → Units → MMGS**.

### 4.1 Create the base sketch (pill profile)

1. **File → New → Part.** Save as `01_reader_pillar_shell.SLDPRT`.
2. Select the **Top plane**. Click **Sketch**.
3. Draw a rectangle centered on the origin: use **Center Rectangle** tool → click origin → drag → in the property panel type width = **90**, height = **90**. Press Enter.
4. Add **Sketch Fillets** to the two long-side edges (front and back edges of the 90×90) with R = **25 mm**. Do NOT fillet the left and right edges — those stay square so the pill has a "flat" facing side toward the lane and toward the outside. Actually — matching the reference, all 4 corners are rounded. So fillet **all 4 corners at R = 25 mm**.
5. Exit sketch.

### 4.2 Extrude the body

1. Select the sketch you just made in the FeatureManager tree.
2. **Features → Extruded Boss/Base.**
3. Direction 1: **Blind**, depth = **190 mm**. (10 mm reserved on top for the cap seat.)
4. Do NOT check "Thin Feature" here — we shell later.
5. OK.

### 4.3 Shell to hollow the body

1. **Features → Shell.**
2. Thickness: **3.0 mm**.
3. Faces to remove: click the **top face** (open, will be capped later) and the **bottom face** (open, will be closed by the access plate).
4. OK. You now have a 3mm-walled hollow pillar, open top and bottom.

### 4.4 Front panel cutout (for the removable screen panel)

The front face is the one facing the lane — the face members walk toward. We'll cut a rectangular window here, and design a removable snap-in insert (Part 3) that carries both LCDs.

1. Select the front face (90 mm wide, 190 mm tall).
2. **Sketch** on that face.
3. Draw a **Center Rectangle** centered horizontally on the face, **vertically positioned so its top edge is 40 mm below the top of the pillar**. Width = **80 mm**, height = **50 mm**.
4. Add construction geometry to lock: horizontal centerline through origin projection, dimension from top edge of face to top edge of rectangle = 40, width = 80, height = 50.
5. Exit sketch.
6. **Features → Extruded Cut.** Direction: **Through All**. OK.

Now there's an 80 × 50 mm window on the front face, 40 mm down from the top.

### 4.5 Front panel insert lip (recessed seat for the panel to snap into)

1. Select the front face again.
2. **Sketch.** Draw a rectangle 2 mm larger than the cutout on all sides — so 84 × 54 mm, centered on the same position as the cutout (top edge 38 mm from top of pillar).
3. **Features → Extruded Cut.** Direction: **Blind**, depth = **1.5 mm**. This creates a 1.5mm-deep recessed lip around the window so the front panel insert sits flush with the exterior.

### 4.6 Top face — PN532 scan zone

The PN532 reader mounts on the underside of the top cap. The top cap is a separate part (Section 5), but we need to prepare the top of this shell to accept it.

1. Select the top face (the opening left after shelling).
2. **Sketch** on the top face.
3. Draw a rectangle 84 × 84 mm centered on the origin (i.e., 3 mm smaller than the outer profile on all sides — this creates a 3mm ledge that the top cap sits on).

Actually, the shell already gives you this ledge because the wall is 3mm. So no additional feature needed here yet — the top cap (Part 2) will simply drop onto the 3mm rim of the shell walls.

### 4.7 Internal mounting bosses for the ESP32

The ESP32 will sit inside the base of the pillar, mounted on 4 bosses.

1. Select the **inside bottom** face (the interior floor — because we shelled and removed the bottom face, there is no floor. Instead, the bottom plate (Part 4) will provide the floor. So we mount the ESP32 bosses to the **rear interior wall** of the pillar, standing horizontally.

**Better approach:** mount the ESP32 to the bottom access plate (Part 4). That way, to service the ESP32, you unscrew the bottom plate and the whole ESP32 comes with it. Move the ESP32 mount to Part 4.

### 4.8 Servo mount pocket (top-inside, near the front)

The servo has to reach up through the top of the pillar to swing the door arm. Position it near the front-left corner of the interior, so its output shaft rises through the top cap and connects to the door hinge.

Actually — re-read the reference image. The door swings on a horizontal pivot at the base, not a vertical one on top. So the servo needs to be **at the base**, near the outer edge of the pillar closest to the lane, with its shaft pointing **horizontally into the lane**, so the door swings open like a saloon door.

Let me revise: **servo mounts horizontally at the base**, shaft protruding through the side wall of the pillar into the lane. Door pivots on this shaft.

1. On the side face of the pillar that faces the lane (right side of the left pillar), select the face.
2. **Sketch.**
3. Draw the servo body pocket: a rectangle 23 × 12.2 mm (SG90 body), positioned 20 mm above the bottom of the pillar, centered horizontally on the face. (Center of servo shaft is 15 mm from the top edge of the servo body — this means the shaft will be at (20 + 12.2 - (12.2/2 - 7.5)) = ~23 mm from the bottom of the pillar, which is right where we want the door pivot.)

Actually the SG90 mounting is standard: cut a 23 × 12.2 mm rectangular pocket **inside** the pillar wall, with two 2 mm holes on the outside for the mounting screws to reach the flanges.

Since this gets fiddly, use a standard SG90 mounting cutout from GrabCAD. Search "SG90 servo mount" on grabcad.com, download the STEP file, and use **Insert → Part** to bring it in as a reference for the pocket geometry. Then use **Combine → Subtract** to cut the pocket.

Rough dimensions if you're modeling from scratch:
- Rectangular pocket: 23 × 12.2 × 22.5 mm deep
- Two flange notches on the top of the pocket: 5 × 2.5 mm each, at ±16 mm from pocket center
- Two mounting screw holes: 2.0 mm dia, 32 mm apart, centered on pocket center

**Save.** You've completed the reader pillar body shell.

---

## 5. Reader pillar — top cap

This is the curved dome that sits on top of the shell.

1. **New Part** → save as `02_reader_top_cap.SLDPRT`.
2. **Top plane** → **Sketch.** Draw the same 90 × 90 pill profile with R25 corners as in 4.1.
3. Exit sketch. **Extruded Boss/Base**, blind, 5 mm. This is the cap seat.
4. **Right plane** → **Sketch.** Draw a **3-point arc**: bottom-left point at (-45, 5), bottom-right point at (45, 5), top point at (0, 25). This is the domed profile.
5. Close the arc with a straight line from (-45, 5) to (45, 5). Exit sketch.
6. **Features → Revolved Boss/Base.** Axis: the vertical centerline. Angle: 360°. OK.

Wait — a revolved dome creates a full sphere top, but the pill profile isn't circular. Better approach: use **Loft**.

**Revised step for the dome:**

4. On the top face of the 5 mm cap seat, sketch the pill profile (90 × 90 with R25 corners).
5. Create a plane 20 mm above the top face (**Reference Geometry → Plane** → offset from top face, 20 mm).
6. On that offset plane, sketch a smaller pill: 40 × 40 with R15 corners, centered on the origin.
7. **Features → Loft.** Profiles: bottom pill, top pill. OK. This creates a tapered dome that matches the reference image's curved top.
8. Optional: apply **Fillet** to the top edge of the dome, R = 10 mm, for a rounded crown.

### 5.1 PN532 antenna recess on the underside

The PN532 antenna needs to sit as close to the top surface as possible so cards read reliably.

1. Select the underside of the cap (the flat 90×90 face at the bottom).
2. **Sketch.** Draw a 45 × 43 mm rectangle centered — this is the PN532 PCB footprint plus 1mm clearance on each side.
3. **Extruded Cut**, blind, 4.5 mm deep. This recesses the PN532 into the underside of the cap so its antenna sits ~2mm below the outer top surface (5mm cap seat - 4.5mm recess + 1.5mm PCB thickness = 2mm remaining plastic above the antenna).

**Verify NFC through PLA:** 13.56 MHz NFC easily reads through 2-3 mm of PLA. Confirmed by multiple maker projects. If reads become weak, we can thin this to 1 mm later.

### 5.2 PN532 mounting bosses

1. On the same underside face, add 4 cylindrical bosses inside the recess corners:
   - Diameter: 5 mm
   - Height: 4 mm (protruding down into the cap seat, not into the recess)
   - Centered on 4 points forming a rectangle 36.6 × 34.6 mm (PN532 mounting hole pattern)
2. Each boss has a 2.7 mm dia through hole for an M3 self-tapping screw (or heat-set insert if you want threaded).

### 5.3 RFID logo cutout on the top face (cosmetic — matches reference)

The reference gate has an RFID wave symbol on the top. You can either:
- **Cut it into the plastic** (looks premium): make a shallow 1mm-deep cut in the shape of the RFID icon. Import the RFID SVG via **Insert → DXF/DWG**, place on top face, extrude cut 1mm.
- **Skip it** and rely on a printed sticker instead (easier, still looks clean).

**Save.**

---

## 6. Front panel insert (both screens, side-by-side)

This is the most important cosmetic part — it's what the user sees when they scan. Two screens side-by-side: the 2.8" TFT on the left (for name, expiry, big colored check/warning/X icon), and the 16×2 LCD on the right (for short status text like "WELCOME BURAK" / "MEMBER OK" / "EXPIRED").

### 6.1 Panel outer geometry

1. **New Part** → save as `03_front_panel_insert.SLDPRT`.
2. **Front plane** → **Sketch.** Draw a rectangle: **80 mm wide × 50 mm tall**, centered on origin.
3. **Extruded Boss/Base**, blind, **3 mm**. This is the panel.
4. Add a 1.5 mm-deep rim around the back of the panel (matches the recessed seat in Section 4.5): sketch an 80 × 50 rectangle on the back face, then **Extruded Cut** 0 mm — actually skip. The panel is already 3mm and the recess in the shell is 1.5mm, so 1.5mm of the panel sits inside the shell and 1.5mm sits proud. If you want it flush, make the panel 1.5mm thick everywhere except add a 1.5mm lip around the perimeter that sits in the recess.

Simpler: **make the panel 3 mm thick uniformly**. It'll stick out 1.5mm from the pillar surface, which actually looks intentional and matches many real turnstile designs.

### 6.2 TFT screen cutout (left half of the panel)

The 2.8" TFT PCB is 86 × 50 mm. That's larger than our 80 × 50 mm panel! We need to redesign the front cutout.

**Revision:** Enlarge the front cutout in the pillar shell (Section 4.4) from 80×50 to **150 × 55 mm**. Update Part 3 accordingly:

- Delete steps 6.1 above and redo with a **150 × 55 mm** panel.
- Also go back to Part 1 (Section 4.4) and change the front cutout to **150 × 55 mm** with the same 1.5 mm recessed seat around it (recessed seat = 154 × 59 mm).

Now on Part 3, with a 150 × 55 mm panel:

1. On the front face of the panel, sketch a rectangle for the TFT active-area window: **43.2 × 57.6 mm**. Position it on the **left half** of the panel, centered vertically. Actually the panel is only 55 mm tall and the TFT active area is 57.6 mm — that's 2.6 mm too tall.

**Second revision:** Make the panel **65 mm tall** (not 55). Update the front cutout in Part 1 to **150 × 65 mm** (recessed seat 154 × 69 mm).

Now with a 150 × 65 mm panel:

1. **Front face**, **Sketch**. Rectangle: **43.2 × 57.6 mm** (TFT active area), centered vertically, positioned so its left edge is **10 mm from the left edge** of the panel.
2. **Extruded Cut**, through all. That's the TFT viewing window.

### 6.3 TFT PCB mounting bosses (on the back of the panel)

The TFT PCB is 50 × 86 mm with 4 corner mounting holes (2.5 mm dia). Since the PCB is taller than our panel (86 > 65), it will extend beyond the top and bottom edges of the panel into the pillar interior. That's fine.

1. On the **back face** of the panel, add 4 cylindrical standoffs for the TFT PCB:
   - Position: forming a rectangle of **44 × 80 mm** (approximate corner-hole pattern on a DIYmalls 2.8" TFT — verify with calipers when you have it in hand, then edit dimensions)
   - Position of PCB centered on the TFT window in step 6.2
   - Standoff diameter: 5 mm
   - Standoff height: 5 mm (creates a 5mm gap between PCB back and panel, giving room for touch flex cable + solder joints)
   - Center hole in each standoff: 2.3 mm dia (for M2.5 self-tapping) OR 3.5 mm dia (for M2.5 heat-set insert)

### 6.4 LCD 16×2 cutout (right half of the panel)

The LCD1602 has a **viewing area of 64.5 × 16 mm** and a **module size of 80 × 36 mm** (with the I²C backpack, add ~15mm depth on the back but the front face stays 80 × 36).

1. **Front face** of panel, **Sketch**. Rectangle: **64.5 × 16 mm** (LCD active display).
2. Position it on the **right half** of the panel, centered vertically, with its **right edge 10 mm from the right edge** of the panel.
3. **Extruded Cut**, through all.

### 6.5 LCD 16×2 mounting bosses

The LCD PCB is 80 × 36 mm with 4 corner mounting holes (~2.5 mm dia, ~75 × 31 mm pattern).

1. On the **back face** of the panel, add 4 standoffs:
   - Position: 75 × 31 mm rectangle, centered on the LCD window
   - Diameter: 5 mm
   - Height: 5 mm (matches TFT)
   - Center hole: 2.3 mm or 3.5 mm (same choice as TFT)

### 6.6 Panel snap features (optional but nice)

Add 4 small snap tabs on the top and bottom edges of the panel that engage with matching notches in the shell recess. This lets the panel snap in without screws. Or use 2× M3 screws through the sides — simpler and more reliable.

**Save.**

---

## 7. Bottom access plate (Part 4)

1. **New part** → `04_reader_bottom_plate.SLDPRT`.
2. **Top plane**, sketch the same pill profile as the pillar (90×90 R25).
3. **Extruded Boss/Base**, 3 mm thick.
4. On the top face (inside of the pillar when installed), add ESP32 mounting bosses:
   - 4 cylindrical bosses, 5 mm dia, 4 mm tall
   - Positioned on a **43.5 × 20 mm** rectangle (ESP32 DevKit V1 mounting hole pattern — measure yours with calipers as small variation exists; typical is 45 × 25 hole spacing)
   - Center hole: 2.3 mm dia for M2 self-tapping
5. Add a **USB-C cutout on the side** — actually the USB-C connector needs to exit through the pillar wall, not the bottom. So on the pillar shell (Part 1), add a small rectangular cutout at the base of the back wall: **10 × 6 mm**, positioned 5 mm above the bottom, for the USB-C cable to exit.
6. On the bottom plate, add 4 through-holes for M3 screws that attach it to the pillar shell: **3.2 mm dia**, positioned in the 4 corners of the pill profile, ~10mm in from each corner.
7. On the pillar shell (Part 1), add matching **M3 threaded standoffs** on the inside of the bottom rim, or design for heat-set inserts.

Also on the bottom plate, add:
- **Servo cable routing channel** (a shallow 3mm-wide, 1mm-deep groove leading from the servo location up to the ESP32) — optional, keeps wiring tidy.
- **4 rubber foot recesses** (3mm dia, 1mm deep) on the **outside** bottom face, so you can stick on 4 self-adhesive rubber feet.

**Save.**

---

## 8. Receiver pillar (Parts 5–7)

The right-hand pillar is passive. It's just a mirror of the reader pillar with **no cutouts on the front face** (or with a small decorative "GRYPHON FIT & REC" logo if you want).

1. Open `01_reader_pillar_shell.SLDPRT`. **Save As** → `05_receiver_pillar_shell.SLDPRT`.
2. **Suppress** the following features in the FeatureManager:
   - Front panel cutout (Section 4.4)
   - Front panel recessed seat (Section 4.5)
   - Servo pocket (Section 4.8)
3. Optionally add a **magnetic latch pocket** on the side facing the lane — a small 10 × 10 × 5 mm pocket to hold a neodymium magnet that the door edge latches against.

**Save.** Similarly create `06_receiver_top_cap.SLDPRT` (same as reader cap but without the PN532 recess) and `07_receiver_bottom_plate.SLDPRT` (same as reader bottom plate but without the ESP32 bosses).

---

## 9. Door + servo horn coupler (Part 8)

### 9.1 Door

Two options:
- **Acrylic door (best-looking):** buy a 3 mm clear acrylic sheet from a hardware store, cut to 120 × 60 mm with a fine-tooth saw or laser cutter. This matches the reference image's glass panels.
- **PLA door:** print a 120 × 60 × 3 mm rectangle. Use clear PETG for a translucent effect if you have it.

If you go acrylic: model the door in SolidWorks as a 120 × 60 × 3 mm rectangle just for assembly visualization, but you'll cut real acrylic for the actual build.

Along the **short (left) edge** of the door, add a small cylindrical hub that will slip onto the servo horn:
- Cylinder: 8 mm dia × 10 mm tall, protruding perpendicular to the door face
- Centered on the left edge, 15 mm from the bottom of the door
- Inside the cylinder: a cross-shaped slot matching the SG90 servo horn (or use a standard 4mm servo horn adapter you can buy)

### 9.2 Servo horn coupler (simpler if door is acrylic)

Instead of modeling the door with an integrated hub, print a small **coupler part**:

1. **New part** → `08_door_servo_coupler.SLDPRT`.
2. Body: 20 × 15 × 8 mm block.
3. On one face: a hole matching the servo horn (typically a 6 mm dia hole with a 4-arm cross pattern — grab a standard servo horn STEP file from GrabCAD and use it as a subtractive reference).
4. On the opposite face: 2 mounting holes (M3, 3.2 mm dia) that will screw into pre-drilled holes on the acrylic door.

**Save.**

---

## 10. Assembly

1. **New Assembly.** Insert all 8 parts.
2. Mate:
   - Bottom plate onto pillar shell (mate bottom face to bottom rim of shell, 4× M3 screw mates for alignment).
   - Top cap onto pillar shell (mate cap seat bottom to shell top rim).
   - Front panel insert into shell recess (mate flush to recess bottom).
   - PN532 bosses to PN532 PCB (import PN532 STEP file from GrabCAD).
   - TFT and LCD PCBs to their respective panel bosses.
   - ESP32 to bottom plate bosses.
   - Servo into pocket in shell (mate servo body to pocket faces, servo shaft protrudes into lane).
   - Door coupler onto servo shaft.
   - Door onto coupler.
   - Receiver pillar mirrored/positioned 210 mm from reader pillar center-to-center (leaving the 120 mm lane gap).
3. **Verify no interferences:** Evaluate → **Interference Detection** → Select all → Calculate. Fix any red-flagged clashes.
4. **Take renders** for your portfolio: use **PhotoView 360** with a studio lighting preset and stainless-steel appearance on the pillars for a photorealistic result. Save 3-4 hero renders (front view, 3/4 view, top-down, exploded assembly).

---

## 11. Print settings recommendation

| Setting | Value |
|---|---|
| Material | PLA (light grey or silver-grey PLA silk for stainless look) |
| Layer height | 0.2 mm |
| Wall count | 4 (for strength, since walls are only 3mm thick) |
| Infill | 20% gyroid |
| Supports | Yes, for the dome caps and any overhangs > 45°. Tree supports work well. |
| Print orientation | Pillar shells: standing upright (open end down on the bed). Caps: dome-up. Panel insert: flat. Bottom plates: flat. |
| Nozzle temp | 210°C for PLA silk, 205°C for regular PLA |
| Bed temp | 60°C |
| Print speed | 60 mm/s outer walls, 100 mm/s infill (default profile for A1/Prusa) |

Estimated filament usage: ~180 g total for all parts.

---

## 12. Bill of hardware (fasteners + extras)

| Item | Qty | Where to get |
|---|---|---|
| M3 × 8 mm socket-head screws | 20 | Hardware store, ~$0.10 each |
| M3 heat-set inserts (5mm OD × 4mm tall) | 12 | Amazon, ~$8 for pack of 100 |
| M2 × 5 mm self-tapping screws (for ESP32) | 4 | Comes in Elegoo kit's spare parts bag |
| M2.5 × 8 mm self-tapping screws (for LCDs) | 8 | Amazon or hardware store |
| Neodymium magnet 10 × 10 × 3 mm | 2 | For door latch, ~$4 pair |
| Self-adhesive rubber feet 15mm | 8 | ~$3 pack |
| 3mm clear acrylic sheet ~150 × 100 mm | 1 | Home Depot or dollar store picture frame glass |

---

## 13. Deliverables checklist for portfolio / LinkedIn

- [ ] All 8 SolidWorks part files (`.SLDPRT`)
- [ ] Assembly file (`.SLDASM`)
- [ ] STEP file exports (universal CAD format, viewable by any engineer)
- [ ] STL files ready for 3D printing
- [ ] 3-4 photorealistic renders (PhotoView 360)
- [ ] Exploded-view drawing showing all parts labeled
- [ ] Engineering drawing (`.SLDDRW`) with dimensions for at least the pillar shell — shows co-op reviewers you can produce manufacturing drawings, not just models

---

## 14. Next steps once printing is done

1. Test-fit each PCB in its pocket before screwing anything down.
2. Verify NFC read-through-plastic: temporarily wire the PN532 to the ESP32 outside the enclosure, place a card on the top cap of the printed pillar, and confirm reads work through the dome.
3. Install screens in the front panel insert, connect wiring, screw panel into shell.
4. Route servo and mount to bottom plate + pillar wall.
5. Attach door to servo horn.
6. USB-C power from a phone charger enters through the back of the pillar.
7. Flash the firmware (which I'll write next, once you confirm this design).

---

**End of build guide. Total ~14 hours of SolidWorks work for a first-time modeler, ~5–6 hours for someone comfortable with the software.**
