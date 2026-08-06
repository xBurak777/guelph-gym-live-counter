# RFID Gate — Autodesk Fusion Parametric Build Guide

**Project:** Guelph Fit & Rec live-occupancy gate demo
**Designer:** Fatih
**Software:** Autodesk Fusion (2026 UI)
**Target:** Single-lane swing gate, 20 × 10 × 15 in overall, 3D-printed on Prusa MK3S
**Approach:** Fully parametric — one parameter table drives every dimension

---

## Why parametric?

Every dimension in this model references a user parameter (a named variable) rather than a hardcoded number. If you decide the pillar should be 8 inches wide instead of 6, you change one value in the parameter table and the entire 22-part assembly updates automatically. This is how real product engineers work at Apple, Tesla, Dyson, and every serious hardware startup. Doing it this way now makes your portfolio genuinely professional.

---

## Step 0 — Fusion setup

1. **Launch Fusion.** You should see the "Welcome to Fusion, Fatih" screen.
2. **Set units to millimeters:** Click your profile icon top-right → **Preferences** → **Default Units** → **Design** → set **Millimeter**. Click **OK**. Working in mm even though the target is inches — it's the industry standard and matches every datasheet for your components.
3. **New Design:** Click **+ New Design** (top left of the Start Working section). A blank workspace opens.
4. **Save immediately:** Ctrl+S → name it `RFID_Gate_Fatih_v1` → save to your default project. This creates the master file that will hold all 22 components.

---

## Step 1 — Build the parameter table

This is the foundation. Enter every parameter first, then reference them in every sketch.

1. In the top toolbar, click **Modify** → **Change Parameters** (shortcut: no default; consider mapping to a hotkey later).
2. The Parameters dialog opens. You'll see two sections: **Favorites** (empty) and **User Parameters** (empty).
3. Click the green **+** next to "User Parameters" to add each row below.

Enter these 34 parameters exactly. Name column is case-sensitive. Unit column: `mm` for lengths, `deg` for angles, blank/unitless for counts.

### Assembly-level parameters

| Name | Unit | Expression | What it controls |
|---|---|---|---|
| `assembly_total_width` | mm | `508` | Full 20-inch width of the whole gate |
| `pillar_width` | mm | `152` | Each pillar's width (6 in, face facing the lane) |
| `pillar_depth` | mm | `254` | Each pillar's depth (10 in, front-to-back) |
| `pillar_height` | mm | `381` | Each pillar's height (15 in, floor to top of dome) |
| `lane_gap` | mm | `assembly_total_width - 2 * pillar_width` | Space between pillars (auto-calculates to 204 mm) |
| `wall_thickness` | mm | `4` | All exterior wall thickness |
| `corner_radius` | mm | `35` | Pill-shape corner fillet on pillar cross-section |
| `dome_height` | mm | `40` | How tall the curved top cap is |

### Split & seam parameters (for the Prusa MK3S)

| Name | Unit | Expression | What it controls |
|---|---|---|---|
| `ring_count` | | `4` | Number of stacked ring segments per pillar |
| `ring_height` | mm | `(pillar_height - dome_height) / ring_count` | Height of each ring (auto: ~85 mm — fits MK3S Z-axis) |
| `pillar_split_line` | mm | `pillar_depth / 2` | Where the front/back halves meet (127 mm) |
| `alignment_ridge_height` | mm | `3` | Height of interlocking ridges at seams |
| `alignment_ridge_width` | mm | `2` | Width of interlocking ridges |

### Front panel window

| Name | Unit | Expression | What it controls |
|---|---|---|---|
| `panel_width` | mm | `130` | Width of the removable front panel (holds both screens) |
| `panel_height` | mm | `85` | Height of the removable front panel |
| `panel_thickness` | mm | `4` | Front panel thickness |
| `panel_recess_depth` | mm | `2` | How deep the panel sits into the shell |
| `panel_center_from_top` | mm | `90` | Distance from top of pillar to center of panel |

### TFT display (DIYmalls 2.8" ILI9341)

| Name | Unit | Expression | What it controls |
|---|---|---|---|
| `tft_pcb_width` | mm | `50` | TFT PCB width |
| `tft_pcb_height` | mm | `86` | TFT PCB height |
| `tft_active_width` | mm | `43.2` | TFT visible screen width |
| `tft_active_height` | mm | `57.6` | TFT visible screen height |
| `tft_mount_hole_dia` | mm | `2.5` | TFT PCB corner mounting holes |

### LCD 16×2 (Elegoo kit)

| Name | Unit | Expression | What it controls |
|---|---|---|---|
| `lcd_pcb_width` | mm | `80` | LCD PCB width |
| `lcd_pcb_height` | mm | `36` | LCD PCB height |
| `lcd_view_width` | mm | `64.5` | LCD visible display width |
| `lcd_view_height` | mm | `16` | LCD visible display height |

### PN532 NFC reader

| Name | Unit | Expression | What it controls |
|---|---|---|---|
| `pn532_pcb_width` | mm | `43` | PN532 PCB width |
| `pn532_pcb_height` | mm | `41` | PN532 PCB height |
| `pn532_pcb_thickness` | mm | `4` | PN532 PCB stack thickness (including headers) |
| `pn532_read_thickness` | mm | `2` | Plastic thickness above PN532 antenna (NFC must penetrate) |

### ESP32 & servo

| Name | Unit | Expression | What it controls |
|---|---|---|---|
| `esp32_width` | mm | `26` | ESP32 DevKit width |
| `esp32_length` | mm | `52` | ESP32 DevKit length (including USB-C) |
| `servo_body_length` | mm | `23` | SG90 servo body length |
| `servo_body_width` | mm | `12.2` | SG90 servo body width |
| `servo_body_height` | mm | `29` | SG90 servo body height with output shaft |
| `servo_mount_spacing` | mm | `32` | SG90 mounting flange hole spacing |

Click **OK** to save the parameter table.

**Verification:** Reopen the Parameters dialog. `lane_gap` should show 204 mm and `ring_height` should show ~85.25 mm. If either is wrong, an earlier parameter has a typo.

---

## Step 2 — Set up the component structure

Fusion organizes designs as a tree of **components** (like folders with parts inside). We'll create empty components first, then fill them in.

1. In the **Browser** on the left, right-click the top node (`RFID_Gate_Fatih_v1`) → **New Component**.
2. In the Create Component dialog, name it `Reader_Pillar`, leave "Activate" checked. OK.
3. Right-click the top node again → **New Component** → `Receiver_Pillar`.
4. Same again → `Door_Assembly`.
5. Same again → `Reference_Electronics`. (This holds mock-ups of the PCBs so we can verify fit without going to GrabCAD.)

Your Browser now shows 4 sibling components. This is how professional assemblies are organized.

**Activate the Reader_Pillar component** by double-clicking its name. A small radio dot appears next to it. All new bodies you create now belong to that component.

---

## Step 3 — Reader pillar shell (the main body)

### 3.1 Create the pill-profile base sketch

1. Click **Create Sketch** (top toolbar) → click the **XY plane** (bottom face in the origin).
2. Set the sketch view to look straight down (press **7** on the numpad or use the ViewCube).
3. Click **Sketch → Create → Center Rectangle**.
4. Click the origin point (the small yellow dot at 0,0,0). Move the mouse away and click anywhere to place the rectangle.
5. In the dimension boxes, type the width first, press **Tab**, type the height. But here's the parametric trick: instead of numbers, type `pillar_width` for width and `pillar_depth` for height. Press **Enter**.

The rectangle now says 152 × 254 mm and is driven by the parameters.

### 3.2 Fillet the corners (pill shape)

1. Sketch → **Modify → Sketch Fillet**.
2. Click one corner of the rectangle. In the dimension box, type `corner_radius`. Press Enter.
3. Repeat for the other 3 corners. All four should show R35.
4. Click **Finish Sketch** (top right, green checkmark).

### 3.3 Extrude the full-height pillar

1. Click **Create → Extrude** (shortcut: **E**).
2. Select the sketch profile (the closed pill shape). It should highlight blue.
3. In the Extrude dialog:
   - **Direction:** One Side
   - **Extent Type:** Distance
   - **Distance:** type `pillar_height - dome_height` (auto-calculates to 341 mm — the body only, dome added later)
   - **Operation:** New Body
4. Click OK.

You now have a solid pill-shaped column 152 × 254 × 341 mm.

### 3.4 Shell it hollow

1. Click **Modify → Shell** (shortcut: no default).
2. In the dialog, click the **top face** of the pillar (the one at Z = 341). It highlights.
3. Also click the **bottom face** (at Z = 0). Both should now show as "Faces to Remove."
4. **Inside Thickness:** type `wall_thickness`.
5. **Direction:** Inside.
6. Click OK.

The pillar is now hollow, 4mm walls, open top and bottom.

### 3.5 Cut the front panel window

The "front" face is the wide face pointing along the +Y axis (toward the lane). We'll cut a rectangular window here.

1. **Create Sketch** → click the front face (the 152 × 341 mm face facing +Y).
2. **Sketch → Create → Center Rectangle**.
3. Click somewhere on the face to start. Type `panel_width` (Tab) `panel_height` (Enter).
4. Now dimension its position. **Sketch → Create → Sketch Dimension**.
   - Click the top edge of the sketch face → click the top edge of the rectangle → type `panel_center_from_top - panel_height/2`. This locks the top of the panel to be 47.5 mm below the top of the pillar (since 90 - 85/2 = 47.5).
   - Click the left edge of the face → click the vertical centerline of the rectangle → type `pillar_width / 2`. This centers it horizontally.
5. **Finish Sketch**.
6. **Create → Extrude**.
7. Select the rectangle profile.
8. Extrude settings:
   - **Direction:** One Side
   - **Extent Type:** All (Fusion calls this "To Object" → then click "All"; or just set Distance to a big number like 300 mm)
   - **Operation:** Cut
9. OK.

The front face now has a rectangular hole.

### 3.6 Add the panel recess (so the front panel insert sits flush)

1. **Create Sketch** on the same front face.
2. **Center Rectangle**, same position as before but slightly larger:
   - Width: `panel_width + 4 mm`
   - Height: `panel_height + 4 mm`
3. Same position dimensions as before.
4. Finish Sketch.
5. **Extrude → Cut** with distance = `panel_recess_depth` (2 mm).

Now there's a 2mm-deep recessed rim around the window where the panel will seat flush with the exterior.

### 3.7 Cut the USB-C exit slot

The USB-C cable for the ESP32 needs to exit the back of the pillar near the bottom.

1. **Create Sketch** on the back face (the 152 × 341 mm face pointing -Y).
2. Draw a **Center Rectangle** 12 mm wide × 7 mm tall.
3. Position it: 15 mm from the bottom edge (Sketch Dimension), centered horizontally.
4. Finish Sketch, **Extrude → Cut**, All.

### 3.8 Save

Ctrl+S. Fusion saves to the cloud (or your local Fusion Team). Give it a version comment like "Reader pillar shell body complete."

---

## Step 4 — Split the pillar shell into printable segments

The Prusa MK3S has a 210mm Z limit. Our pillar body is 341 mm tall — needs to split into 4 rings of ~85 mm each. And 254 mm depth exceeds the 210 mm Y-axis — needs to split into front + back halves.

**Result: 8 shell pieces per pillar (4 rings × 2 halves).**

We'll use Fusion's **Split Body** tool. First we need construction planes at every split location.

### 4.1 Create horizontal split planes (for the 4 rings)

1. **Construct → Offset Plane**.
2. Reference: click the **bottom face** of the pillar (Z = 0).
3. Distance: type `ring_height` (auto: ~85.25 mm).
4. OK. Rename this plane in the Browser: right-click the new "Plane1" → Rename → `Ring_Split_1`.
5. Repeat for `Ring_Split_2` at `ring_height * 2` and `Ring_Split_3` at `ring_height * 3`.

You now have 3 horizontal planes cutting the body into 4 rings.

### 4.2 Create the vertical split plane (for front/back halves)

1. **Construct → Offset Plane**.
2. Reference: click the **XZ plane** in the origin browser (this is the vertical plane through the middle of the pillar).
3. Distance: `0 mm` (we want the plane exactly at the center).
4. OK. Rename: `Front_Back_Split`.

Actually — since the XZ plane already exists at Y=0 and passes through the pillar center, you can skip creating an offset. Just use XZ directly. But making a named clone makes the timeline more readable, so keep it.

### 4.3 Split the body

1. **Modify → Split Body**.
2. **Body to Split:** click the pillar shell.
3. **Splitting Tool(s):** click all 4 planes we just made (3 horizontal + 1 vertical).
4. OK.

The single body is now 8 separate bodies (4 rings × 2 halves each). Look at the Bodies folder in the Browser — you should see 8 items named `Body1` through `Body8`.

### 4.4 Rename the segments

Rename each body descriptively so we can find them later:
- Ring 1 (bottom) Front → `R_Shell_Bottom_Front`
- Ring 1 (bottom) Back → `R_Shell_Bottom_Back`
- Ring 2 Front → `R_Shell_Mid1_Front`
- Ring 2 Back → `R_Shell_Mid1_Back`
- Ring 3 Front → `R_Shell_Mid2_Front`
- Ring 3 Back → `R_Shell_Mid2_Back`
- Ring 4 (top) Front → `R_Shell_Top_Front`
- Ring 4 (top) Back → `R_Shell_Top_Back`

Right-click each body → Rename.

---

## Step 5 — Add alignment ridges at every seam

Without alignment features, stacked segments will slip and glued joints will drift. We'll add small interlocking ridges: a raised lip on the top face of each ring that mates into a matching pocket on the bottom of the ring above.

### 5.1 Add the ridge to a ring's top face

Do this on `R_Shell_Bottom_Front`:

1. **Create Sketch** on the top face of that segment (the horizontal face at Z = ring_height, on the front half).
2. Draw a rectangle that outlines the wall's centerline: use **Sketch → Offset** and offset the outer edge inward by `wall_thickness / 2` (= 2 mm). This puts the ridge in the middle of the wall thickness.
3. **Finish Sketch**.
4. **Extrude** the resulting thin closed profile:
   - Distance: `alignment_ridge_height` (3 mm)
   - Operation: **Join** (adds to the body)

Now the top of Ring 1 Front has a 3mm-tall ridge running along the wall centerline.

### 5.2 Add the matching pocket to the ring above

On `R_Shell_Mid1_Front` (the ring that sits on top of Ring 1 Front):

1. **Create Sketch** on the bottom face.
2. Same offset technique: offset the outer edge inward by `wall_thickness / 2`.
3. Finish Sketch.
4. **Extrude → Cut**, Distance: `alignment_ridge_height + 0.3` (3.3 mm — the 0.3 mm is print clearance so the ridge doesn't jam).

Repeat for all seams (Ring 1→2, Ring 2→3, Ring 3→4). That's 3 ridge/pocket pairs per pillar half × 2 halves = 6 ridge+pocket features per pillar. Same for the front/back seam (add a ridge on the front half's rear-facing edge, matching pocket on the back half).

### 5.3 Automate with a pattern (optional but pro move)

If you're comfortable with Fusion's **Rectangular Pattern** feature, you can create one ridge/pocket pair as a component-scoped feature and pattern it up. For a first-pass model, doing them manually is fine.

---

## Step 6 — Screw bosses at each seam

Ridges align but don't hold. Each seam gets 4 screws.

1. **Create Sketch** on the top face of `R_Shell_Bottom_Front`.
2. Place 2 sketch points 20 mm from each end of the wall centerline, on the interior side of the ridge.
3. Finish Sketch.
4. **Create → Cylinder** OR use the sketch points with **Hole** command.

Easier method — use **Hole** command:
1. Select the top face of the segment.
2. **Create → Hole**.
3. Position: click where you want each hole (2 per segment half).
4. Type: **Simple** (through) or **Threaded** if you want to model heat-set inserts.
5. Diameter: `3.2 mm` for M3 clearance, or `4.5 mm` for M3 heat-set insert.
6. Depth: `12 mm` into the ring below (creates a boss extending down).
7. OK.

On the matching upper ring, place clearance holes (3.2 mm through) in the same positions. An M3 × 20 mm socket-head screw passes through the upper ring and threads into the heat-set insert in the lower ring.

---

## Step 7 — Reader top cap (curved dome)

This is a separate component — new file within the same assembly.

1. In the Browser, right-click the top node → **New Component** → `Reader_Top_Cap` → OK, Activate.
2. **Create Sketch** on the XY plane.
3. Draw the same pill profile as the pillar: Center Rectangle, `pillar_width` × `pillar_depth`, all 4 corners filleted at `corner_radius`.
4. Finish Sketch.

### 7.1 Extrude the cap seat

1. **Extrude** the profile, Distance = `wall_thickness + 2 mm` (6 mm). This is a solid disk that sits on top of the shell.

### 7.2 Loft the dome

1. **Create Sketch** on the **top face** of the disk you just made.
2. Draw the same pill profile (Fusion has a Project tool: **Sketch → Project → Project** → click the outer edge of the disk to trace it).
3. Finish Sketch. Call it `Dome_Base`.
4. **Construct → Offset Plane** from the top face, distance `dome_height` (40 mm). Rename `Dome_Top_Plane`.
5. **Create Sketch** on `Dome_Top_Plane`.
6. Draw a smaller pill: `pillar_width * 0.5` wide × `pillar_depth * 0.5` deep, corner radius `corner_radius * 0.5`.
7. Finish Sketch. Call it `Dome_Top`.
8. **Create → Loft**.
9. Profile 1: click `Dome_Base` outline.
10. Profile 2: click `Dome_Top` outline.
11. Operation: Join. OK.

You now have a tapered pill-shaped dome, 40 mm tall, sitting on the disk.

### 7.3 Round the crown

1. **Modify → Fillet**.
2. Select the top edge of the dome.
3. Radius: `10 mm`. OK.

### 7.4 PN532 recess and mounting

1. **Create Sketch** on the **bottom face** of the cap (the disk underside).
2. Draw a Center Rectangle: `pn532_pcb_width + 2 mm` × `pn532_pcb_height + 2 mm` (45 × 43 mm), centered on origin.
3. Finish Sketch.
4. **Extrude → Cut**, Distance: `pn532_pcb_thickness + 1 mm` (5 mm). This recesses a pocket for the PN532.

Check the remaining plastic above the PN532 antenna: `wall_thickness + 2 - 5 = 1 mm`. That's below `pn532_read_thickness` (2 mm target).

Fix: **change the cap seat thickness**. Go back to the Timeline, double-click the first Extrude (the disk), change Distance from `wall_thickness + 2 mm` to `pn532_pcb_thickness + pn532_read_thickness + 1 mm` (7 mm total). The timeline recalculates.

Now: 7 mm total disk - 5 mm recess = 2 mm plastic above antenna. Matches target.

### 7.5 PN532 mounting bosses

Inside the PN532 recess, add 4 bosses at the corner mounting hole pattern (typically 36.6 × 34.6 mm on the HiLetgo V3).

1. **Create Sketch** on the recess floor (the face at the bottom of the pocket).
2. Place 4 sketch points at corners of a 36.6 × 34.6 mm rectangle centered on origin.
3. Finish Sketch.
4. **Create → Extrude** each point as a cylinder — OR use **Hole** command with each point as a location.
5. For each boss: 5 mm diameter, 4 mm tall, with a 2.7 mm through-hole for M3 self-tapping.

Alternative: create one boss + hole pair, then pattern using **Create → Rectangular Pattern**.

### 7.6 Split the top cap for printing

The cap is 152 × 254 mm — exceeds the MK3S 210 mm Y-axis. Same as the pillar shells: split into front and back halves using the XZ construction plane.

1. **Modify → Split Body**, using the XZ plane. Result: 2 halves.
2. Rename: `Reader_Cap_Front` and `Reader_Cap_Back`.

Add alignment ridges + screw bosses at this seam using the same technique as Step 5-6.

---

## Step 8 — Reader front panel insert (both screens)

This is the removable panel that carries both LCDs. New component.

1. New Component → `Reader_Front_Panel` → OK, Activate.
2. **Create Sketch** on XY plane.
3. Center Rectangle: `panel_width` × `panel_height` (130 × 85 mm).
4. Finish Sketch.
5. **Extrude**: Distance = `panel_thickness` (4 mm). New Body.

Result: a 130 × 85 × 4 mm plate.

### 8.1 TFT window (left half of the panel)

1. **Create Sketch** on the front face (the +Z face of the panel).
2. Center Rectangle: `tft_active_width` × `tft_active_height` (43.2 × 57.6 mm).
3. Position it with sketch dimensions:
   - Center vertically on the panel.
   - Left edge is `panel_width * 0.25` from the panel's left edge (roughly centered on the left half).
4. Finish Sketch.
5. **Extrude → Cut**, All.

### 8.2 TFT mounting bosses

The TFT PCB is 50 × 86 mm — that's TALLER than our panel (85 mm). It'll extend 0.5 mm above and below. That's fine; the PCB sits behind the panel and the panel just needs to expose the active area.

Add 4 standoffs on the back of the panel where the TFT PCB mounts:

1. **Create Sketch** on the back face (-Z).
2. Place 4 sketch points at corners of a 44 × 80 mm rectangle (approximate DIYmalls 2.8" TFT hole pattern — verify with calipers when you have the module in hand and update the parameter `tft_mount_hole_pattern_x` = 44, `tft_mount_hole_pattern_y` = 80 in the parameter table).

Actually, let me add those parameters now — go back to **Modify → Change Parameters** and add:

| Name | Unit | Expression |
|---|---|---|
| `tft_mount_x` | mm | `44` |
| `tft_mount_y` | mm | `80` |
| `lcd_mount_x` | mm | `75` |
| `lcd_mount_y` | mm | `31` |
| `standoff_height` | mm | `5` |
| `standoff_dia` | mm | `5` |

Back to the sketch. Use the parameters for hole positioning.

3. Finish Sketch.
4. For each of the 4 points, create a cylindrical boss: **Extrude** (technically you'd use Hole command with a boss offset, or create a circle sketch centered on each point and extrude). Distance = `standoff_height`, Diameter = `standoff_dia`.
5. Inside each boss, add a 2.3 mm through-hole for the mounting screw.

### 8.3 LCD 16×2 window (right half)

1. **Create Sketch** on the front face.
2. Center Rectangle: `lcd_view_width` × `lcd_view_height` (64.5 × 16 mm).
3. Position:
   - Center vertically on the panel.
   - Right edge is `panel_width * 0.25` from the panel's right edge (roughly centered on the right half).
4. Finish, **Extrude → Cut**, All.

### 8.4 LCD mounting bosses

Same pattern as TFT but at `lcd_mount_x` × `lcd_mount_y` (75 × 31 mm).

---

## Step 9 — Reader bottom access plate

New component: `Reader_Bottom_Plate` → Activate.

1. **Create Sketch** on XY plane.
2. Center Rectangle with pill profile: `pillar_width` × `pillar_depth`, filleted `corner_radius`.
3. Finish Sketch.
4. **Extrude** Distance = `wall_thickness` (4 mm).

### 9.1 ESP32 mounting bosses

On the top face (inside face when installed):

1. **Create Sketch**.
2. Place 4 sketch points at ESP32 mounting hole positions (verify with calipers — typical 38-pin ESP32 DevKit V1 has holes at ~45 × 25 mm centers).
3. Add parameters: `esp32_mount_x` = `45 mm`, `esp32_mount_y` = `20 mm`.
4. Create 4 bosses (2 mm through-hole for M2 self-tapping), height 4 mm.

### 9.2 Servo mount

The SG90 mounts to a bracket that attaches to the bottom plate. The servo shaft points horizontally toward the lane. We'll design the bracket as part of the bottom plate.

1. **Create Sketch** on the top face of the bottom plate.
2. Draw a rectangle for the bracket base at the position where the servo will sit — near the lane-facing edge, close to the front.
3. Extrude 25 mm tall (matches servo body height + some clearance).
4. Add a rectangular pocket in the bracket: `servo_body_length` × `servo_body_width` (23 × 12.2 mm), depth 20 mm.
5. Add two 2 mm M2 through-holes at `servo_mount_spacing` (32 mm apart) for the servo flanges.

### 9.3 Screw holes to attach the plate to the shell

1. Add 6 through-holes around the perimeter of the plate (3 per pillar half, matching the screw bosses inside the shell walls).
2. 3.2 mm diameter through-holes.

### 9.4 Split the bottom plate

Same as the top cap — split into front/back halves at XZ plane. Add alignment ridges + screws at that seam.

---

## Step 10 — Servo horn coupler and door

New component: `Door_Assembly` → Activate.

### 10.1 Servo horn adapter

The SG90 comes with a plastic horn that has a splined center. We'll design a printed coupler that snaps onto the horn.

1. **Create Sketch** on XY plane.
2. Draw a 25 × 20 mm rectangle.
3. Extrude 8 mm tall. New Body → rename `Servo_Coupler`.
4. On the bottom face, sketch a 6 mm diameter circle centered → Extrude Cut, Distance = 6 mm (creates a pocket for the servo horn to press-fit into).
5. On the top face, add 2 M3 through-holes (3.2 mm) that will screw into the door.

### 10.2 The door itself

Two options:

**Option A — printed PLA door:**
1. Create Sketch on XZ plane.
2. Center Rectangle: 180 × 100 mm.
3. Extrude 3 mm. New Body → rename `Door_Panel`.
4. On one short edge, add 2 M3 threaded holes that will accept the screws from the servo coupler.
5. Optional: sketch and extrude-cut a "GRYPHON FIT & REC" logo (import SVG via **Insert → SVG**) as a shallow 1 mm engraving on the front face.

**Option B — laser-cut clear acrylic (better looking):**
- Skip the door in Fusion for now. Model just the coupler.
- Buy a 3 mm clear acrylic sheet at Michaels or Home Depot (~$8 for a 12 × 12 in sheet).
- Score and snap to 180 × 100 mm, or laser-cut at a makerspace if you have access.
- Drill 2 holes at one edge to match the coupler screw pattern.

For portfolio purposes, I recommend **Option B**. Clear acrylic screams "premium" in photos. Model the acrylic in Fusion as a reference body but don't print it.

---

## Step 11 — Receiver pillar

The right-hand pillar is passive — no cutouts, no electronics. Copy the reader pillar and simplify.

1. In Browser, right-click `Reader_Pillar` → **Copy**.
2. Right-click the top node → **Paste New** (or Paste; Paste New keeps them independent, plain Paste creates a linked instance).
3. Rename the copy: `Receiver_Pillar`.

Now suppress the features that don't apply:

4. In the Timeline (bottom of screen), find these features from the Reader_Pillar section:
   - Panel window extrude cut
   - Panel recess extrude cut
   - USB-C exit cut
5. Right-click each → **Suppress Features**.

The receiver pillar is now just a plain hollow pill shape with alignment ridges + screw bosses.

### 11.1 Add a magnet pocket

On the lane-facing side of the receiver pillar (the face pointing toward -X, since the receiver is on the right at +X and the lane is to its left), add a small pocket to hold a neodymium magnet for the door to latch against:

1. Create Sketch on the lane-facing face.
2. Draw a 10 × 10 mm rectangle at the same height as the door center (roughly `panel_center_from_top + 40 mm` from the top, so the magnet sits at door-swing height).
3. Extrude Cut, depth 3 mm.

You'll superglue a 10×10×3 mm neodymium magnet into this pocket. The steel screw at the door edge (or a small magnet on the door edge) is what latches to it.

---

## Step 12 — Assemble everything

Fusion assembles automatically because all components share the same origin. Position the receiver pillar 508 mm to the right of the reader pillar:

1. Activate `Receiver_Pillar` component.
2. **Modify → Move/Copy**.
3. Select all bodies in Receiver_Pillar.
4. **Move Type:** Translate.
5. X distance: `assembly_total_width - pillar_width` (auto: 356 mm).
6. OK.

The two pillars are now positioned correctly with the 204 mm lane gap.

Position the door:
7. Activate `Door_Assembly`.
8. Move the door to align with the reader pillar's servo shaft — servo is embedded at the top center of Ring 2 (from bottom), lane-facing side, ~90 mm above the base. The door coupler mates to the servo shaft.
9. Rotate the door around the servo shaft axis so it starts in the "closed" position (perpendicular to the lane).

---

## Step 13 — Verify interference

1. **Inspect → Interference**.
2. Select all bodies (Ctrl+A in the Browser).
3. Click **Compute**.

Any red-highlighted collisions need fixing. Common issues:
- Alignment ridges too tall → sinking into the ring above. Fix: reduce `alignment_ridge_height` or increase pocket depth clearance.
- Servo shaft passes through the shell wall unintentionally. Fix: add a clearance hole in the shell where the shaft exits.
- PN532 recess too deep, breaking through the dome top. Fix: increase disk thickness parameter.

---

## Step 14 — Render for portfolio

1. Top-right workspace switcher → **Render**.
2. Set materials: click each body → assign material. Suggestions:
   - Pillar shells + caps + panels: **Plastic → ABS → White** (matches your library-provided PLA, which you'll spray silver later — but rendering in white shows the print + then a second render in "brushed aluminum" shows the painted finish).
   - Door (if acrylic): **Glass → Clear Glass**.
   - Screens: **Plastic → Solid Black** with an image texture of your UI overlaid.
3. Set environment: **Environment → Studios → Photo Booth** for a clean look.
4. **Render → In-Canvas Render** for quick previews, or **Render → Cloud Render** for high-quality final images (takes 5-10 min per render, uses cloud credits — Fusion Personal gives you 25/month free).
5. Take these hero shots for your portfolio:
   - **Front view**: gate closed, TFT showing green checkmark
   - **3/4 view**: gate open, door mid-swing at 45°
   - **Top-down**: shows the pill-shape pedestal proportions
   - **Exploded view**: use **Assemble → Explode** to show all 22 parts spread apart (co-op reviewers LOVE this shot)
   - **Section view**: use **Inspect → Section Analysis** to cut the reader pillar in half, showing the electronics inside

---

## Step 15 — Export for printing

1. Switch to **Design** workspace.
2. Right-click each body → **Save As Mesh** → STL, high quality, mm units.
3. Save all 22 STLs to a folder: `RFID_Gate_STL_v1/`.
4. Open PrusaSlicer on your laptop.
5. Import STLs one at a time. Check that each fits within 250 × 210 × 210 mm on the print bed (should be verified by construction, but sanity check).
6. Slice → estimate print time and filament weight for each part. Total should be ~50 hours, ~900 g PLA.

---

## Parts inventory (final)

| # | Component name | Body count | Where it goes |
|---|---|---|---|
| 1-8 | R_Shell_*_(Front/Back) | 8 | Reader pillar shell segments |
| 9-10 | Reader_Cap_(Front/Back) | 2 | Reader pillar dome |
| 11-12 | Reader_Bottom_Plate_(Front/Back) | 2 | Reader pillar bottom |
| 13 | Reader_Front_Panel | 1 | Removable panel with both LCDs |
| 14-21 | Receiver_Shell_*_(Front/Back) | 8 | Receiver pillar shell segments |
| 22-23 | Receiver_Cap_(Front/Back) | 2 | Receiver pillar dome |
| 24-25 | Receiver_Bottom_Plate_(Front/Back) | 2 | Receiver pillar bottom |
| 26 | Servo_Coupler | 1 | Door-to-servo adapter |
| 27 | Door_Panel (optional, if not acrylic) | 1 | The swinging door |

**Total: 27 printed parts** (or 26 if you use acrylic for the door).

Plus non-printed items:
- 1× ESP32 DevKit V1
- 1× PN532 NFC module
- 1× DIYmalls 2.8" TFT
- 1× Elegoo 16×2 LCD I²C
- 1× SG90 servo
- 1× 3 mm clear acrylic 180×100 mm (for door)
- 24× M3 × 20 mm socket-head screws
- 24× M3 heat-set inserts (5 mm OD × 4 mm tall)
- 8× M2 × 5 mm self-tapping screws
- 8× M2.5 × 8 mm self-tapping screws
- 2× 10×10×3 mm neodymium magnets
- 8× rubber feet (self-adhesive)

---

## Timeline estimate for modeling in Fusion

| Phase | Est. time |
|---|---|
| Parameter table setup | 30 min |
| Reader pillar shell (Steps 3-6) | 4 hrs |
| Reader top cap (Step 7) | 2 hrs |
| Reader front panel (Step 8) | 2 hrs |
| Reader bottom plate (Step 9) | 1.5 hrs |
| Door + coupler (Step 10) | 1 hr |
| Receiver pillar (Step 11 — mostly copy/suppress) | 30 min |
| Assembly + interference check (Steps 12-13) | 1.5 hrs |
| Rendering (Step 14) | 2 hrs (5 renders × ~20 min each including tweaks) |
| STL export (Step 15) | 30 min |
| **Total** | **~15 hours** |

Spread over a week at 2-3 hours per evening, done in ~5-6 days.

---

## Portfolio deliverables checklist

- [ ] Fusion source file `.f3d`
- [ ] STEP export (universal CAD, viewable by any employer)
- [ ] STL files ready for print
- [ ] 5 hero renders (front, 3/4, top-down, exploded, section)
- [ ] Bill of Materials as a table (all 27 printed parts + electronics + fasteners)
- [ ] 30-second video: Fusion's Timeline replay showing the model build itself from parameters up (this feature alone impresses co-op reviewers — right-click any feature in Timeline → Play History)

---

**End of guide. Total ~15 hours of Fusion work, results in a fully-parametric, portfolio-quality 3D model ready to print.**
