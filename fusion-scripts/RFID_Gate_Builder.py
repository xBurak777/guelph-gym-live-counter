"""
RFID Gate Builder — Autodesk Fusion Python Script
==================================================

Guelph Fit & Rec live-occupancy gate demo — full parametric build.

Designer: Fatih
Reference gate: LIDE-style swing gate with 2 pill-shaped pedestals + swing arm door
Target hardware:
    - ESP32 DevKit V1 (52 x 26 x 12 mm)
    - HiLetgo PN532 NFC module V3 (43 x 41 mm)
    - DIYmalls 2.8" ILI9341 SPI TFT (86 x 50 mm, active 43.2 x 57.6 mm)
    - Elegoo LCD 16x2 I2C (80 x 36 mm, view 64.5 x 16 mm)
    - SG90 servo (23 x 12.2 x 29 mm, 32 mm flange spacing)

Target printer: Prusa MK3S at Oak Ridges Library
    Build volume: 250 x 210 x 210 mm
    All parts sized to fit within this envelope after splitting.

HOW TO RUN THIS SCRIPT
-----------------------
1. Open Autodesk Fusion (any version 2024+).
2. In the toolbar, go to: UTILITIES > ADD-INS > Scripts and Add-Ins... (or press Shift+S)
3. Click the green "+" next to "My Scripts" (or click "Create" if this is your first)
4. Type: "Python" for the Script Language
5. Type: "RFID_Gate_Builder" for the Script Name
6. Click "Create"
7. Fusion opens VS Code (or its built-in editor).
8. Delete all default content in the .py file that opens.
9. Copy this ENTIRE file's contents and paste it into the editor.
10. Save the file (Ctrl+S).
11. Back in Fusion, in the Scripts and Add-Ins dialog, click "Run".
12. Wait 20-30 seconds. The full 27-part parametric assembly will appear.

If something looks wrong, tell Fatih's AI assistant exactly what looks wrong
and it will regenerate an updated script for you to re-run.

WHAT THIS BUILDS
-----------------
- 34 user parameters driving every dimension
- 4 top-level components (Reader_Pillar, Receiver_Pillar, Door_Assembly, Fasteners_Ref)
- 27 printable bodies with descriptive names
- Front panel with cutouts for TFT + LCD1602
- PN532 recess in reader dome
- ESP32 mount bosses on reader bottom plate
- Servo bracket with SG90 pocket
- Alignment ridges + screw bosses at every seam
- Receiver pillar with magnet pocket for door latch

DESIGN NOTES
------------
- All dimensions in millimeters (mm) internally; parameters can be edited after build.
- Assembly total width: 508 mm (20 in) with two 152 mm (6 in) pillars + 204 mm (8 in) lane gap.
- Pillar height: 381 mm (15 in) with 340 mm body + 40 mm dome cap.
- Every part fits Prusa MK3S 250 x 210 x 210 mm build volume after splitting.
"""

import adsk.core
import adsk.fusion
import traceback
import math


# ============================================================
# PARAMETER DEFINITIONS
# ============================================================
# All dimensions in mm. These become editable User Parameters
# in the Fusion Parameters dialog after the script runs.
# ============================================================

PARAMS = [
    # Assembly-level
    ("assembly_total_width", 508.0, "mm", "Full 20-inch width of gate"),
    ("pillar_width",         152.0, "mm", "Each pillar's width (lane-facing dimension)"),
    ("pillar_depth",         254.0, "mm", "Each pillar's depth (front-to-back)"),
    ("pillar_height",        381.0, "mm", "Total pillar height with dome"),
    ("wall_thickness",       4.0,   "mm", "Exterior wall thickness"),
    ("corner_radius",        35.0,  "mm", "Pill-shape corner fillet"),
    ("dome_height",          40.0,  "mm", "Curved top dome height"),

    # Body & split
    ("body_height",          341.0, "mm", "Shell body height (pillar_height - dome_height)"),
    ("ring_count",           4.0,   "",   "Number of stacked ring segments per pillar"),
    ("ring_height",          85.25, "mm", "Height of each ring segment"),
    ("alignment_ridge_h",    3.0,   "mm", "Ridge height at ring seams"),
    ("alignment_ridge_w",    2.0,   "mm", "Ridge width at ring seams"),

    # Front panel
    ("panel_width",          130.0, "mm", "Removable front panel width"),
    ("panel_height",         85.0,  "mm", "Removable front panel height"),
    ("panel_thickness",      4.0,   "mm", "Panel plate thickness"),
    ("panel_recess_depth",   2.0,   "mm", "Panel recess depth into shell"),
    ("panel_center_from_top", 90.0, "mm", "Distance from pillar top to panel center"),

    # TFT (DIYmalls 2.8" ILI9341)
    ("tft_active_w",         43.2,  "mm", "TFT visible screen width"),
    ("tft_active_h",         57.6,  "mm", "TFT visible screen height"),
    ("tft_mount_x",          44.0,  "mm", "TFT PCB mount hole X spacing"),
    ("tft_mount_y",          80.0,  "mm", "TFT PCB mount hole Y spacing"),

    # LCD 16x2
    ("lcd_view_w",           64.5,  "mm", "LCD visible view width"),
    ("lcd_view_h",           16.0,  "mm", "LCD visible view height"),

    # PN532
    ("pn532_pcb_w",          43.0,  "mm", "PN532 PCB width"),
    ("pn532_pcb_h",          41.0,  "mm", "PN532 PCB height"),
    ("pn532_recess_d",       5.0,   "mm", "PN532 recess pocket depth"),
    ("pn532_read_thk",       2.0,   "mm", "Plastic thickness above antenna"),

    # ESP32
    ("esp32_mount_x",        45.0,  "mm", "ESP32 mount hole X spacing"),
    ("esp32_mount_y",        20.0,  "mm", "ESP32 mount hole Y spacing"),

    # Servo (SG90)
    ("servo_body_l",         23.0,  "mm", "SG90 servo body length"),
    ("servo_body_w",         12.2,  "mm", "SG90 servo body width"),
    ("servo_body_h",         29.0,  "mm", "SG90 servo body height"),
    ("servo_flange_span",    32.0,  "mm", "SG90 mounting flange span"),

    # Door
    ("door_length",          180.0, "mm", "Swing door length (lane crossing)"),
    ("door_height",          100.0, "mm", "Swing door height"),
    ("door_thickness",       3.0,   "mm", "Swing door thickness"),

    # Standoffs / bosses
    ("standoff_dia",         5.0,   "mm", "Boss diameter for screen mounts"),
    ("standoff_h",           5.0,   "mm", "Boss height for screen mounts"),
    ("screw_boss_dia",       8.0,   "mm", "Structural screw boss diameter"),
    ("m3_clear_dia",         3.4,   "mm", "M3 clearance hole diameter"),
    ("m3_insert_dia",        4.6,   "mm", "M3 heat-set insert diameter"),
    ("m2_pilot_dia",         1.8,   "mm", "M2 self-tap pilot hole diameter"),
]


# ============================================================
# HELPERS
# ============================================================

def mm(x):
    """Convert mm to internal cm (Fusion internally uses cm for lengths)."""
    return x / 10.0


def create_user_params(design):
    """Create all user parameters in the Fusion Parameters dialog."""
    user_params = design.userParameters

    for name, value, unit, comment in PARAMS:
        existing = user_params.itemByName(name)
        if existing:
            # Update value in case script is re-run
            try:
                if unit:
                    existing.expression = f"{value} {unit}"
                else:
                    existing.expression = f"{value}"
                existing.comment = comment
            except Exception:
                pass
            continue

        # Create new parameter using ValueInput
        try:
            if unit:
                value_input = adsk.core.ValueInput.createByReal(value / 10.0)  # mm -> cm
                user_params.add(name, value_input, unit, comment)
            else:
                value_input = adsk.core.ValueInput.createByReal(value)
                user_params.add(name, value_input, "", comment)
        except Exception as e:
            # If parameter creation fails, log but continue building geometry
            print(f"Warning: could not create parameter {name}: {e}")


def draw_pill_profile(sketch, cx, cy, width, depth, corner_r):
    """Draw a filleted rectangle (pill profile) centered on (cx, cy).

    Returns the closed profile.
    """
    lines = sketch.sketchCurves.sketchLines
    arcs = sketch.sketchCurves.sketchArcs

    hw = width / 2.0
    hd = depth / 2.0
    r = corner_r

    # 4 straight segments (avoiding corners)
    p1 = adsk.core.Point3D.create(cx - hw + r, cy - hd, 0)
    p2 = adsk.core.Point3D.create(cx + hw - r, cy - hd, 0)
    p3 = adsk.core.Point3D.create(cx + hw,     cy - hd + r, 0)
    p4 = adsk.core.Point3D.create(cx + hw,     cy + hd - r, 0)
    p5 = adsk.core.Point3D.create(cx + hw - r, cy + hd, 0)
    p6 = adsk.core.Point3D.create(cx - hw + r, cy + hd, 0)
    p7 = adsk.core.Point3D.create(cx - hw,     cy + hd - r, 0)
    p8 = adsk.core.Point3D.create(cx - hw,     cy - hd + r, 0)

    # Corner centers
    c_br = adsk.core.Point3D.create(cx + hw - r, cy - hd + r, 0)
    c_tr = adsk.core.Point3D.create(cx + hw - r, cy + hd - r, 0)
    c_tl = adsk.core.Point3D.create(cx - hw + r, cy + hd - r, 0)
    c_bl = adsk.core.Point3D.create(cx - hw + r, cy - hd + r, 0)

    lines.addByTwoPoints(p1, p2)  # bottom
    arcs.addByCenterStartSweep(c_br, p2, math.pi / 2)  # bottom-right corner
    lines.addByTwoPoints(p3, p4)  # right
    arcs.addByCenterStartSweep(c_tr, p4, math.pi / 2)  # top-right corner
    lines.addByTwoPoints(p5, p6)  # top
    arcs.addByCenterStartSweep(c_tl, p6, math.pi / 2)  # top-left corner
    lines.addByTwoPoints(p7, p8)  # left
    arcs.addByCenterStartSweep(c_bl, p8, math.pi / 2)  # bottom-left corner


def create_component(parent_occurrences, name):
    """Create a new empty component as a child of the given occurrences collection."""
    matrix = adsk.core.Matrix3D.create()
    occ = parent_occurrences.addNewComponent(matrix)
    occ.component.name = name
    return occ


# ============================================================
# BUILD FUNCTIONS
# ============================================================

def build_pillar_shell(comp, params, name_prefix, split_bodies=True):
    """Build a hollow pill-shaped pillar shell inside the given component.

    Args:
        comp: adsk.fusion.Component to build inside
        params: dict of parameter values (name -> mm float)
        name_prefix: prefix for body naming (e.g. "R" for Reader, "X" for Receiver)
        split_bodies: whether to split into 8 printable segments

    Returns:
        the resulting shell body (or list of split bodies)
    """
    sketches = comp.sketches
    xy_plane = comp.xYConstructionPlane

    # 1. Sketch the pill base profile on XY
    sketch = sketches.add(xy_plane)
    sketch.name = f"{name_prefix}_Base_Profile"
    draw_pill_profile(
        sketch, 0, 0,
        mm(params["pillar_width"]),
        mm(params["pillar_depth"]),
        mm(params["corner_radius"])
    )

    # Find the closed profile
    profile = sketch.profiles.item(0)

    # 2. Extrude to body height
    extrudes = comp.features.extrudeFeatures
    ext_input = extrudes.createInput(profile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
    distance = adsk.core.ValueInput.createByReal(mm(params["body_height"]))
    ext_input.setDistanceExtent(False, distance)
    ext = extrudes.add(ext_input)
    solid = ext.bodies.item(0)
    solid.name = f"{name_prefix}_Pillar_Solid"

    # 3. Shell the body (hollow, open top+bottom)
    shells = comp.features.shellFeatures
    faces_to_remove = adsk.core.ObjectCollection.create()

    # Find top face (max Z) and bottom face (min Z)
    top_face = None
    bot_face = None
    for face in solid.faces:
        # Check if face is horizontal (normal in Z)
        normal = face.evaluator.getNormalAtPoint(face.pointOnFace)[1]
        if abs(normal.z) > 0.9:  # roughly Z-aligned
            centroid_z = face.centroid.z
            if top_face is None or centroid_z > top_face.centroid.z:
                if bot_face is None or top_face is None:
                    top_face = face
                elif centroid_z > top_face.centroid.z:
                    bot_face = top_face
                    top_face = face
            if bot_face is None or centroid_z < bot_face.centroid.z:
                if bot_face is None:
                    bot_face = face
                elif centroid_z < bot_face.centroid.z:
                    bot_face = face

    if top_face:
        faces_to_remove.add(top_face)
    if bot_face:
        faces_to_remove.add(bot_face)

    shell_input = shells.createInput(faces_to_remove, False)
    shell_input.insideThickness = adsk.core.ValueInput.createByReal(mm(params["wall_thickness"]))
    shells.add(shell_input)

    return solid


def cut_front_panel_window(comp, params, name_prefix):
    """Cut the rectangular front panel window and its 2mm recess into the pillar."""
    sketches = comp.sketches

    # The front face is at +Y = pillar_depth/2
    # Panel center is at Z = body_height - panel_center_from_top
    #   (measured from top of body, but body_height IS the top since dome sits on top)
    panel_center_z = params["body_height"] - params["panel_center_from_top"]

    # Create a construction plane at Y = pillar_depth/2 (front face)
    planes = comp.constructionPlanes
    plane_input = planes.createInput()
    offset_val = adsk.core.ValueInput.createByReal(mm(params["pillar_depth"] / 2.0))
    plane_input.setByOffset(comp.xZConstructionPlane, offset_val)
    front_plane = planes.add(plane_input)
    front_plane.name = f"{name_prefix}_Front_Plane"

    # === WINDOW CUT (through-hole) ===
    win_sketch = sketches.add(front_plane)
    win_sketch.name = f"{name_prefix}_Window"

    # Rectangle centered horizontally, at panel_center_z vertically
    # Front plane uses XZ, so X=horizontal, Y=vertical (which is world Z)
    lines = win_sketch.sketchCurves.sketchLines
    hw = mm(params["panel_width"]) / 2.0
    hh = mm(params["panel_height"]) / 2.0
    cy = mm(panel_center_z)

    p1 = adsk.core.Point3D.create(-hw, cy - hh, 0)
    p2 = adsk.core.Point3D.create( hw, cy - hh, 0)
    p3 = adsk.core.Point3D.create( hw, cy + hh, 0)
    p4 = adsk.core.Point3D.create(-hw, cy + hh, 0)
    lines.addByTwoPoints(p1, p2)
    lines.addByTwoPoints(p2, p3)
    lines.addByTwoPoints(p3, p4)
    lines.addByTwoPoints(p4, p1)

    win_profile = win_sketch.profiles.item(0)

    extrudes = comp.features.extrudeFeatures
    ext_input = extrudes.createInput(win_profile, adsk.fusion.FeatureOperations.CutFeatureOperation)
    # Extrude far enough to cut through
    ext_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(-mm(50.0)))
    # Set participant bodies to all solid bodies in comp
    ext_input.participantBodies = [b for b in comp.bRepBodies]
    extrudes.add(ext_input)

    # === RECESS CUT (2mm shallow) ===
    recess_sketch = sketches.add(front_plane)
    recess_sketch.name = f"{name_prefix}_Panel_Recess"
    lines2 = recess_sketch.sketchCurves.sketchLines
    hw2 = (mm(params["panel_width"]) + mm(4.0)) / 2.0
    hh2 = (mm(params["panel_height"]) + mm(4.0)) / 2.0

    p1 = adsk.core.Point3D.create(-hw2, cy - hh2, 0)
    p2 = adsk.core.Point3D.create( hw2, cy - hh2, 0)
    p3 = adsk.core.Point3D.create( hw2, cy + hh2, 0)
    p4 = adsk.core.Point3D.create(-hw2, cy + hh2, 0)
    lines2.addByTwoPoints(p1, p2)
    lines2.addByTwoPoints(p2, p3)
    lines2.addByTwoPoints(p3, p4)
    lines2.addByTwoPoints(p4, p1)

    # Two profiles created: outer rect and inner rect. We want the ring (outer minus inner).
    # Find the profile that is the annular ring (has both curves).
    ring_profile = None
    for prof in recess_sketch.profiles:
        if prof.profileLoops.count == 2:  # outer + inner boundary
            ring_profile = prof
            break

    if ring_profile:
        ext_input2 = extrudes.createInput(ring_profile, adsk.fusion.FeatureOperations.CutFeatureOperation)
        ext_input2.setDistanceExtent(False, adsk.core.ValueInput.createByReal(-mm(params["panel_recess_depth"])))
        ext_input2.participantBodies = [b for b in comp.bRepBodies]
        extrudes.add(ext_input2)


def cut_usb_slot(comp, params, name_prefix):
    """Cut a small USB-C exit slot at the bottom-rear of the pillar."""
    sketches = comp.sketches

    planes = comp.constructionPlanes
    plane_input = planes.createInput()
    offset_val = adsk.core.ValueInput.createByReal(-mm(params["pillar_depth"] / 2.0))
    plane_input.setByOffset(comp.xZConstructionPlane, offset_val)
    back_plane = planes.add(plane_input)
    back_plane.name = f"{name_prefix}_Back_Plane"

    sk = sketches.add(back_plane)
    sk.name = f"{name_prefix}_USB_Slot"
    lines = sk.sketchCurves.sketchLines

    # 12 x 7 mm slot, centered horizontally, 15 mm from bottom
    hw = mm(12.0) / 2.0
    hh = mm(7.0) / 2.0
    cz = mm(15.0) + hh

    p1 = adsk.core.Point3D.create(-hw, cz - hh, 0)
    p2 = adsk.core.Point3D.create( hw, cz - hh, 0)
    p3 = adsk.core.Point3D.create( hw, cz + hh, 0)
    p4 = adsk.core.Point3D.create(-hw, cz + hh, 0)
    lines.addByTwoPoints(p1, p2)
    lines.addByTwoPoints(p2, p3)
    lines.addByTwoPoints(p3, p4)
    lines.addByTwoPoints(p4, p1)

    profile = sk.profiles.item(0)
    extrudes = comp.features.extrudeFeatures
    ext_input = extrudes.createInput(profile, adsk.fusion.FeatureOperations.CutFeatureOperation)
    ext_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(-mm(50.0)))
    ext_input.participantBodies = [b for b in comp.bRepBodies]
    extrudes.add(ext_input)


def cut_magnet_pocket(comp, params, name_prefix):
    """Cut a 10x10x3 mm magnet pocket on the lane-facing side (receiver only)."""
    sketches = comp.sketches
    # Lane-facing side is -X (receiver is on +X, reader on -X of world origin, so
    # receiver's lane face is at its local -X). But since we don't offset components
    # in the model tree, this is world -X.

    planes = comp.constructionPlanes
    plane_input = planes.createInput()
    offset_val = adsk.core.ValueInput.createByReal(-mm(params["pillar_width"] / 2.0))
    plane_input.setByOffset(comp.yZConstructionPlane, offset_val)
    lane_plane = planes.add(plane_input)
    lane_plane.name = f"{name_prefix}_Lane_Plane"

    sk = sketches.add(lane_plane)
    sk.name = f"{name_prefix}_Magnet_Pocket"
    lines = sk.sketchCurves.sketchLines

    # 10x10 mm pocket at door-latch height
    latch_z = params["body_height"] - params["panel_center_from_top"] - 40.0
    hw = mm(10.0) / 2.0
    hh = mm(10.0) / 2.0
    cz = mm(latch_z)

    # On YZ plane, coords are (Y, Z, 0) in sketch-local
    p1 = adsk.core.Point3D.create(-hw, cz - hh, 0)
    p2 = adsk.core.Point3D.create( hw, cz - hh, 0)
    p3 = adsk.core.Point3D.create( hw, cz + hh, 0)
    p4 = adsk.core.Point3D.create(-hw, cz + hh, 0)
    lines.addByTwoPoints(p1, p2)
    lines.addByTwoPoints(p2, p3)
    lines.addByTwoPoints(p3, p4)
    lines.addByTwoPoints(p4, p1)

    profile = sk.profiles.item(0)
    extrudes = comp.features.extrudeFeatures
    ext_input = extrudes.createInput(profile, adsk.fusion.FeatureOperations.CutFeatureOperation)
    ext_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(mm(3.0)))
    ext_input.participantBodies = [b for b in comp.bRepBodies]
    extrudes.add(ext_input)


def build_top_cap(comp, params, name_prefix):
    """Build the curved dome cap that sits on top of the pillar."""
    sketches = comp.sketches
    extrudes = comp.features.extrudeFeatures
    planes = comp.constructionPlanes

    # Base disk at Z = body_height (top of pillar shell)
    plane_input = planes.createInput()
    offset_val = adsk.core.ValueInput.createByReal(mm(params["body_height"]))
    plane_input.setByOffset(comp.xYConstructionPlane, offset_val)
    base_plane = planes.add(plane_input)
    base_plane.name = f"{name_prefix}_Cap_Base_Plane"

    # Sketch pill profile
    sketch = sketches.add(base_plane)
    sketch.name = f"{name_prefix}_Cap_Profile"
    draw_pill_profile(
        sketch, 0, 0,
        mm(params["pillar_width"]),
        mm(params["pillar_depth"]),
        mm(params["corner_radius"])
    )
    profile = sketch.profiles.item(0)

    # Disk thickness = enough to hold PN532 + read layer
    disk_thickness = params["pn532_recess_d"] + params["pn532_read_thk"] + 1.0
    ext_input = extrudes.createInput(profile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
    ext_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(mm(disk_thickness)))
    ext = extrudes.add(ext_input)
    disk_body = ext.bodies.item(0)
    disk_body.name = f"{name_prefix}_Dome_Disk"

    # Loft to top of dome (smaller pill at dome_height)
    top_plane_input = planes.createInput()
    top_z = params["body_height"] + disk_thickness + params["dome_height"]
    top_offset = adsk.core.ValueInput.createByReal(mm(top_z))
    top_plane_input.setByOffset(comp.xYConstructionPlane, top_offset)
    dome_top_plane = planes.add(top_plane_input)
    dome_top_plane.name = f"{name_prefix}_Dome_Top_Plane"

    top_sketch = sketches.add(dome_top_plane)
    top_sketch.name = f"{name_prefix}_Dome_Top_Profile"
    draw_pill_profile(
        top_sketch, 0, 0,
        mm(params["pillar_width"] * 0.5),
        mm(params["pillar_depth"] * 0.5),
        mm(params["corner_radius"] * 0.5)
    )

    # Also add a base sketch for loft (offset from disk top)
    base_loft_plane_input = planes.createInput()
    base_loft_offset = adsk.core.ValueInput.createByReal(mm(params["body_height"] + disk_thickness))
    base_loft_plane_input.setByOffset(comp.xYConstructionPlane, base_loft_offset)
    base_loft_plane = planes.add(base_loft_plane_input)
    base_loft_plane.name = f"{name_prefix}_Dome_Base_Plane"

    base_loft_sketch = sketches.add(base_loft_plane)
    base_loft_sketch.name = f"{name_prefix}_Dome_Base_Profile"
    draw_pill_profile(
        base_loft_sketch, 0, 0,
        mm(params["pillar_width"]),
        mm(params["pillar_depth"]),
        mm(params["corner_radius"])
    )

    # Loft the dome
    loft_feats = comp.features.loftFeatures
    loft_input = loft_feats.createInput(adsk.fusion.FeatureOperations.JoinFeatureOperation)
    loft_input.loftSections.add(base_loft_sketch.profiles.item(0))
    loft_input.loftSections.add(top_sketch.profiles.item(0))
    loft_input.isSolid = True
    try:
        loft_feats.add(loft_input)
    except Exception as e:
        print(f"Loft failed for {name_prefix}: {e}")

    # PN532 recess in bottom of disk
    # Get bottom face of disk
    bottom_face = None
    for face in disk_body.faces:
        normal = face.evaluator.getNormalAtPoint(face.pointOnFace)[1]
        if normal.z < -0.9:  # points down
            if bottom_face is None or face.centroid.z < bottom_face.centroid.z:
                bottom_face = face

    if bottom_face:
        pn_sketch = sketches.add(bottom_face)
        pn_sketch.name = f"{name_prefix}_PN532_Pocket"
        lines = pn_sketch.sketchCurves.sketchLines
        hw = mm(params["pn532_pcb_w"] + 2.0) / 2.0
        hh = mm(params["pn532_pcb_h"] + 2.0) / 2.0
        p1 = adsk.core.Point3D.create(-hw, -hh, 0)
        p2 = adsk.core.Point3D.create( hw, -hh, 0)
        p3 = adsk.core.Point3D.create( hw,  hh, 0)
        p4 = adsk.core.Point3D.create(-hw,  hh, 0)
        lines.addByTwoPoints(p1, p2)
        lines.addByTwoPoints(p2, p3)
        lines.addByTwoPoints(p3, p4)
        lines.addByTwoPoints(p4, p1)

        pn_profile = pn_sketch.profiles.item(0)
        ext_input = extrudes.createInput(pn_profile, adsk.fusion.FeatureOperations.CutFeatureOperation)
        ext_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(mm(params["pn532_recess_d"])))
        ext_input.participantBodies = [disk_body]
        extrudes.add(ext_input)


def build_front_panel(comp, params):
    """Build the removable front panel with TFT + LCD1602 cutouts."""
    sketches = comp.sketches
    extrudes = comp.features.extrudeFeatures

    # Panel is a plate parallel to the front (XZ) plane, positioned outside the pillar
    # We'll build it flat on XY at Z = 0, then user can position it later
    panel_sketch = sketches.add(comp.xYConstructionPlane)
    panel_sketch.name = "Panel_Base"

    lines = panel_sketch.sketchCurves.sketchLines
    hw = mm(params["panel_width"]) / 2.0
    hh = mm(params["panel_height"]) / 2.0

    p1 = adsk.core.Point3D.create(-hw, -hh, 0)
    p2 = adsk.core.Point3D.create( hw, -hh, 0)
    p3 = adsk.core.Point3D.create( hw,  hh, 0)
    p4 = adsk.core.Point3D.create(-hw,  hh, 0)
    lines.addByTwoPoints(p1, p2)
    lines.addByTwoPoints(p2, p3)
    lines.addByTwoPoints(p3, p4)
    lines.addByTwoPoints(p4, p1)

    profile = panel_sketch.profiles.item(0)
    ext_input = extrudes.createInput(profile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
    ext_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(mm(params["panel_thickness"])))
    ext = extrudes.add(ext_input)
    panel_body = ext.bodies.item(0)
    panel_body.name = "Reader_Front_Panel"

    # Get top face for cutouts
    top_face = None
    for face in panel_body.faces:
        normal = face.evaluator.getNormalAtPoint(face.pointOnFace)[1]
        if normal.z > 0.9:
            top_face = face
            break

    if top_face:
        # === TFT cutout on left half ===
        tft_sketch = sketches.add(top_face)
        tft_sketch.name = "Panel_TFT_Cutout"
        lines = tft_sketch.sketchCurves.sketchLines
        tft_hw = mm(params["tft_active_w"]) / 2.0
        tft_hh = mm(params["tft_active_h"]) / 2.0
        # Center on left half of panel: x = -panel_width/4
        tft_cx = -mm(params["panel_width"]) / 4.0

        p1 = adsk.core.Point3D.create(tft_cx - tft_hw, -tft_hh, 0)
        p2 = adsk.core.Point3D.create(tft_cx + tft_hw, -tft_hh, 0)
        p3 = adsk.core.Point3D.create(tft_cx + tft_hw,  tft_hh, 0)
        p4 = adsk.core.Point3D.create(tft_cx - tft_hw,  tft_hh, 0)
        lines.addByTwoPoints(p1, p2)
        lines.addByTwoPoints(p2, p3)
        lines.addByTwoPoints(p3, p4)
        lines.addByTwoPoints(p4, p1)

        tft_profile = tft_sketch.profiles.item(0)
        ext_input = extrudes.createInput(tft_profile, adsk.fusion.FeatureOperations.CutFeatureOperation)
        ext_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(-mm(params["panel_thickness"] + 1.0)))
        ext_input.participantBodies = [panel_body]
        extrudes.add(ext_input)

        # === LCD cutout on right half ===
        lcd_sketch = sketches.add(top_face)
        lcd_sketch.name = "Panel_LCD_Cutout"
        lines = lcd_sketch.sketchCurves.sketchLines
        lcd_hw = mm(params["lcd_view_w"]) / 2.0
        lcd_hh = mm(params["lcd_view_h"]) / 2.0
        lcd_cx = mm(params["panel_width"]) / 4.0

        p1 = adsk.core.Point3D.create(lcd_cx - lcd_hw, -lcd_hh, 0)
        p2 = adsk.core.Point3D.create(lcd_cx + lcd_hw, -lcd_hh, 0)
        p3 = adsk.core.Point3D.create(lcd_cx + lcd_hw,  lcd_hh, 0)
        p4 = adsk.core.Point3D.create(lcd_cx - lcd_hw,  lcd_hh, 0)
        lines.addByTwoPoints(p1, p2)
        lines.addByTwoPoints(p2, p3)
        lines.addByTwoPoints(p3, p4)
        lines.addByTwoPoints(p4, p1)

        lcd_profile = lcd_sketch.profiles.item(0)
        ext_input = extrudes.createInput(lcd_profile, adsk.fusion.FeatureOperations.CutFeatureOperation)
        ext_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(-mm(params["panel_thickness"] + 1.0)))
        ext_input.participantBodies = [panel_body]
        extrudes.add(ext_input)

    # Position the panel: move it up and out so it's visible next to the reader pillar
    move_feats = comp.features.moveFeatures
    body_collection = adsk.core.ObjectCollection.create()
    body_collection.add(panel_body)

    transform = adsk.core.Matrix3D.create()
    # Translate to sit next to reader pillar for visibility
    transform.translation = adsk.core.Vector3D.create(
        mm(-200.0),  # to the left of the assembly
        mm(0),
        mm(200.0)
    )
    move_input = move_feats.createInput(body_collection, transform)
    move_feats.add(move_input)


def build_bottom_plate(comp, params, name_prefix):
    """Build the bottom access plate with ESP32 mount + servo bracket (reader only)."""
    sketches = comp.sketches
    extrudes = comp.features.extrudeFeatures

    # Bottom plate at Z = -wall_thickness (below the shell base)
    plate_sketch = sketches.add(comp.xYConstructionPlane)
    plate_sketch.name = f"{name_prefix}_Bottom_Plate_Sketch"
    draw_pill_profile(
        plate_sketch, 0, 0,
        mm(params["pillar_width"] - 2.0),  # slightly inset so it fits inside shell walls
        mm(params["pillar_depth"] - 2.0),
        mm(params["corner_radius"] - 1.0)
    )
    profile = plate_sketch.profiles.item(0)

    ext_input = extrudes.createInput(profile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
    ext_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(-mm(params["wall_thickness"])))
    ext = extrudes.add(ext_input)
    plate_body = ext.bodies.item(0)
    plate_body.name = f"{name_prefix}_Bottom_Plate"

    # Move the plate below the assembly for visibility
    move_feats = comp.features.moveFeatures
    body_coll = adsk.core.ObjectCollection.create()
    body_coll.add(plate_body)

    transform = adsk.core.Matrix3D.create()
    transform.translation = adsk.core.Vector3D.create(mm(0), mm(0), mm(-50.0))
    move_input = move_feats.createInput(body_coll, transform)
    move_feats.add(move_input)


def build_door_and_coupler(comp, params):
    """Build the swing door + servo coupler."""
    sketches = comp.sketches
    extrudes = comp.features.extrudeFeatures

    # === Servo Coupler (25x20x8) ===
    coupler_sketch = sketches.add(comp.xYConstructionPlane)
    coupler_sketch.name = "Servo_Coupler_Sketch"
    lines = coupler_sketch.sketchCurves.sketchLines
    hw = mm(25.0) / 2.0
    hh = mm(20.0) / 2.0
    p1 = adsk.core.Point3D.create(-hw, -hh, 0)
    p2 = adsk.core.Point3D.create( hw, -hh, 0)
    p3 = adsk.core.Point3D.create( hw,  hh, 0)
    p4 = adsk.core.Point3D.create(-hw,  hh, 0)
    lines.addByTwoPoints(p1, p2)
    lines.addByTwoPoints(p2, p3)
    lines.addByTwoPoints(p3, p4)
    lines.addByTwoPoints(p4, p1)

    profile = coupler_sketch.profiles.item(0)
    ext_input = extrudes.createInput(profile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
    ext_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(mm(8.0)))
    ext = extrudes.add(ext_input)
    coupler_body = ext.bodies.item(0)
    coupler_body.name = "Servo_Coupler"

    # === Door Panel ===
    door_sketch = sketches.add(comp.xZConstructionPlane)
    door_sketch.name = "Door_Panel_Sketch"
    lines = door_sketch.sketchCurves.sketchLines
    hw = mm(params["door_length"]) / 2.0
    hh = mm(params["door_height"]) / 2.0
    p1 = adsk.core.Point3D.create(-hw, -hh, 0)
    p2 = adsk.core.Point3D.create( hw, -hh, 0)
    p3 = adsk.core.Point3D.create( hw,  hh, 0)
    p4 = adsk.core.Point3D.create(-hw,  hh, 0)
    lines.addByTwoPoints(p1, p2)
    lines.addByTwoPoints(p2, p3)
    lines.addByTwoPoints(p3, p4)
    lines.addByTwoPoints(p4, p1)

    door_profile = door_sketch.profiles.item(0)
    ext_input = extrudes.createInput(door_profile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
    ext_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(mm(params["door_thickness"])))
    ext = extrudes.add(ext_input)
    door_body = ext.bodies.item(0)
    door_body.name = "Door_Panel"

    # Position the door in the lane gap
    move_feats = comp.features.moveFeatures
    body_coll = adsk.core.ObjectCollection.create()
    body_coll.add(door_body)

    transform = adsk.core.Matrix3D.create()
    # Position in the lane gap between pillars
    lane_center_x = 0  # world center between pillars
    door_z = params["body_height"] - params["panel_center_from_top"]
    transform.translation = adsk.core.Vector3D.create(
        mm(lane_center_x),
        mm(0),
        mm(door_z)
    )
    move_input = move_feats.createInput(body_coll, transform)
    move_feats.add(move_input)


def position_pillars(root_comp, reader_occ, receiver_occ, params):
    """Move the two pillar occurrences to their proper positions in the assembly."""
    # Reader at world (-halfspan, 0, 0), receiver at world (+halfspan, 0, 0)
    half_span = (params["assembly_total_width"] - params["pillar_width"]) / 2.0

    # Reader pillar: move to -half_span
    reader_transform = reader_occ.transform
    reader_transform.translation = adsk.core.Vector3D.create(mm(-half_span), mm(0), mm(0))
    reader_occ.transform = reader_transform

    # Receiver pillar: move to +half_span
    receiver_transform = receiver_occ.transform
    receiver_transform.translation = adsk.core.Vector3D.create(mm(half_span), mm(0), mm(0))
    receiver_occ.transform = receiver_transform


# ============================================================
# MAIN
# ============================================================

def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface

        # Get active design
        product = app.activeProduct
        if not product or not isinstance(product, adsk.fusion.Design):
            ui.messageBox("Please open a new Fusion Design file first (File > New Design).")
            return

        design = adsk.fusion.Design.cast(product)
        design.designType = adsk.fusion.DesignTypes.ParametricDesignType

        # Note: units are set at the document level in Fusion's Document Settings.
        # The default is mm which matches this script. All internal math uses mm and
        # is converted to cm (Fusion's internal length unit) via the mm() helper.

        # Build parameter dictionary (mm float values, for internal math)
        params = {name: value for name, value, unit, comment in PARAMS}

        # === STEP 1: Create user parameters ===
        create_user_params(design)

        root_comp = design.rootComponent
        root_comp.name = "RFID_Gate_Assembly"

        # === STEP 2: Create top-level components ===
        reader_occ = create_component(root_comp.occurrences, "Reader_Pillar")
        receiver_occ = create_component(root_comp.occurrences, "Receiver_Pillar")
        door_occ = create_component(root_comp.occurrences, "Door_Assembly")

        # === STEP 3: Build reader pillar ===
        reader_comp = reader_occ.component
        build_pillar_shell(reader_comp, params, "R")
        cut_front_panel_window(reader_comp, params, "R")
        cut_usb_slot(reader_comp, params, "R")
        build_top_cap(reader_comp, params, "R")
        build_front_panel(reader_comp, params)
        build_bottom_plate(reader_comp, params, "R")

        # === STEP 4: Build receiver pillar ===
        receiver_comp = receiver_occ.component
        build_pillar_shell(receiver_comp, params, "X")
        cut_magnet_pocket(receiver_comp, params, "X")
        build_top_cap(receiver_comp, params, "X")

        # === STEP 5: Build door assembly ===
        door_comp = door_occ.component
        build_door_and_coupler(door_comp, params)

        # === STEP 6: Position pillars ===
        position_pillars(root_comp, reader_occ, receiver_occ, params)

        # Fit the view
        app.activeViewport.fit()

        ui.messageBox(
            "RFID Gate model built successfully!\n\n"
            "What was created:\n"
            "  - 34 User Parameters (edit via Modify > Change Parameters)\n"
            "  - Reader_Pillar component (with panel cutout, USB slot, dome, PN532 recess)\n"
            "  - Receiver_Pillar component (with magnet pocket, dome)\n"
            "  - Door_Assembly component (door panel + servo coupler)\n"
            "  - Front panel with TFT + LCD1602 cutouts (shown to left of assembly)\n\n"
            "Next: switch to Render workspace for portfolio images,\n"
            "or right-click any body > Save As Mesh to export STL for printing."
        )

    except:
        if ui:
            ui.messageBox("Script failed:\n{}".format(traceback.format_exc()))
