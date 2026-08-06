"""
RFID Gate Builder v3 — LIDE-Style Reference Match
====================================================

Guelph Fit & Rec gate — matches LIDE swing gate visual language.

Designer: Fatih
Physical build plan:
    - Pillar bodies: thin plywood/MDF, painted silver
    - LCD/reader housings: 3D printed inserts
    - Door: clear hard plastic (acrylic/polycarbonate)
    - One door hinged on LEFT pillar, opens by rotating into the pillar
    - Two SG90 servos (top + bottom) attached to door for stable pivot

DIMENSIONS (matching LIDE reference)
--------------------------------------
Each pillar:    150 W × 100 D × 1000 H mm (like a tall mailbox)
Lane gap:       600 mm between inner faces (person walkthrough)
Total width:    900 mm (150 + 600 + 150)
Door panel:     600 × 800 × 5 mm clear plastic
Door hinges:    LEFT pillar, at inner-front edge

COMPONENT LAYOUT
-----------------
LEFT pillar (Reader):
    - PN532 RFID reader: pocket in TOP face
    - TFT display housing: sits on TOP of pillar, angled toward user
    - LCD 16x2: rectangular slot on lane-facing side, upper third
    - Two SG90 servo pockets: lane-facing side, top (~800mm) and bottom (~200mm)
    - Cable channel: vertical channel inside back wall (for hidden wiring)
    - ESP32 mount bosses: interior wall

RIGHT pillar (Receiver):
    - LCD 16x2: matching LCD slot on lane-facing side, same height as left
    - Magnet catch pocket: lane-facing side at door top height
    - Otherwise structural only

Green LED accent ring: visible groove ~40mm from top of each pillar
Base plates: one under each pillar for stability

HOW TO RUN
-----------
1. Open Fusion in ASSEMBLY mode
2. File > New Design (fresh document)
3. UTILITIES > ADD-INS > Scripts and Add-Ins (Shift+S)
4. Select RFID_Gate_Builder > Run
5. Wait 15-30 seconds
"""

import adsk.core
import adsk.fusion
import traceback
import math


# ============================================================
# PARAMETERS — all mm
# ============================================================

PARAMS = [
    # Pillar dimensions (matches LIDE reference proportions)
    ("pillar_width",              150.0, "mm", "Pillar X width (lane-parallel)"),
    ("pillar_depth",              100.0, "mm", "Pillar Y depth (lane-perpendicular)"),
    ("pillar_height",            1000.0, "mm", "Pillar total height"),
    ("pillar_wall",                 5.0, "mm", "Wall thickness (plywood build)"),

    # Assembly spacing
    ("lane_gap",                  600.0, "mm", "Gap between pillar inner faces"),

    # Top display housing (angled black box on reader pillar top)
    ("display_housing_w",         140.0, "mm", "Top display housing width"),
    ("display_housing_d",          95.0, "mm", "Top display housing depth"),
    ("display_housing_h",         120.0, "mm", "Top display housing height"),
    ("display_angle",              15.0, "deg", "Display tilt toward user (unused, cosmetic)"),

    # LCD 16x2 slot (lane-facing side)
    ("lcd_view_w",                 64.5, "mm", "LCD visible width"),
    ("lcd_view_h",                 16.0, "mm", "LCD visible height"),
    ("lcd_height_from_bottom",    800.0, "mm", "LCD center height from pillar base"),

    # PN532 reader pocket (top face of reader pillar)
    ("pn532_pocket_w",             45.0, "mm", "PN532 pocket width"),
    ("pn532_pocket_d",             45.0, "mm", "PN532 pocket depth"),
    ("pn532_pocket_h",              8.0, "mm", "PN532 pocket depth into pillar top"),

    # Servo pockets (lane-facing side of reader pillar)
    ("servo_pocket_w",             25.0, "mm", "Servo pocket X"),
    ("servo_pocket_h",             30.0, "mm", "Servo pocket Z"),
    ("servo_pocket_depth",         15.0, "mm", "Servo pocket depth into pillar"),
    ("servo_top_z",               800.0, "mm", "Top servo center Z from pillar bottom"),
    ("servo_bot_z",               200.0, "mm", "Bottom servo center Z from pillar bottom"),

    # Cable channel (interior back wall of reader pillar)
    ("cable_channel_w",            20.0, "mm", "Cable channel width"),
    ("cable_channel_depth",         8.0, "mm", "Cable channel depth into wall"),

    # Magnet catch (receiver pillar, lane-facing side)
    ("magnet_pocket_size",         12.0, "mm", "Magnet pocket square size"),
    ("magnet_pocket_depth",         3.0, "mm", "Magnet pocket depth"),
    ("magnet_pocket_z",           750.0, "mm", "Magnet pocket center height"),

    # Green LED accent ring (visible groove near top)
    ("led_groove_w",                6.0, "mm", "LED groove width"),
    ("led_groove_d",                3.0, "mm", "LED groove depth"),
    ("led_z_from_top",             40.0, "mm", "LED groove distance from pillar top"),

    # Door panel (clear plastic)
    ("door_width",                600.0, "mm", "Door panel width (spans lane gap)"),
    ("door_height",               800.0, "mm", "Door panel height"),
    ("door_thickness",              5.0, "mm", "Door panel thickness (clear plastic)"),
    ("door_z_from_bottom",        100.0, "mm", "Door bottom edge height from ground"),

    # Servo coupler blocks (attached to door)
    ("coupler_size",               30.0, "mm", "Servo coupler cube edge"),

    # Base plate
    ("base_plate_thickness",        8.0, "mm", "Base plate thickness"),
    ("base_plate_margin",          20.0, "mm", "Base plate margin around pillar"),
]


# ============================================================
# HELPERS
# ============================================================

def mm(x):
    """Convert mm to Fusion internal cm."""
    return x / 10.0


def create_user_params(design):
    """Create editable user parameters."""
    user_params = design.userParameters
    for name, value, unit, comment in PARAMS:
        if user_params.itemByName(name):
            continue
        try:
            if unit == "deg":
                vi = adsk.core.ValueInput.createByReal(math.radians(value))
                user_params.add(name, vi, "deg", comment)
            elif unit == "mm":
                vi = adsk.core.ValueInput.createByReal(value / 10.0)
                user_params.add(name, vi, "mm", comment)
            else:
                vi = adsk.core.ValueInput.createByReal(value)
                user_params.add(name, vi, "", comment)
        except Exception:
            pass


def draw_rect_at_origin(sketch, w, h):
    """Draw rectangle centered on sketch origin. Returns nothing."""
    lines = sketch.sketchCurves.sketchLines
    p1 = adsk.core.Point3D.create(-w/2, -h/2, 0)
    p2 = adsk.core.Point3D.create( w/2, -h/2, 0)
    p3 = adsk.core.Point3D.create( w/2,  h/2, 0)
    p4 = adsk.core.Point3D.create(-w/2,  h/2, 0)
    lines.addByTwoPoints(p1, p2)
    lines.addByTwoPoints(p2, p3)
    lines.addByTwoPoints(p3, p4)
    lines.addByTwoPoints(p4, p1)


def draw_rect(sketch, cx, cy, w, h):
    """Draw rectangle centered on (cx, cy) on the sketch."""
    lines = sketch.sketchCurves.sketchLines
    p1 = adsk.core.Point3D.create(cx - w/2, cy - h/2, 0)
    p2 = adsk.core.Point3D.create(cx + w/2, cy - h/2, 0)
    p3 = adsk.core.Point3D.create(cx + w/2, cy + h/2, 0)
    p4 = adsk.core.Point3D.create(cx - w/2, cy + h/2, 0)
    lines.addByTwoPoints(p1, p2)
    lines.addByTwoPoints(p2, p3)
    lines.addByTwoPoints(p3, p4)
    lines.addByTwoPoints(p4, p1)


def pick_biggest_profile(sketch):
    """Pick the profile with the largest area from a sketch."""
    profiles = sketch.profiles
    if profiles.count == 0:
        return None
    profile = profiles.item(0)
    if profiles.count > 1:
        max_area = 0
        for i in range(profiles.count):
            p = profiles.item(i)
            a = p.areaProperties().area
            if a > max_area:
                max_area = a
                profile = p
    return profile


def extrude_new_body(component, sketch, distance_mm):
    """Extrude sketch profile as new body by distance_mm (positive or negative)."""
    profile = pick_biggest_profile(sketch)
    if not profile:
        return None
    ext_input = component.features.extrudeFeatures.createInput(
        profile, adsk.fusion.FeatureOperations.NewBodyFeatureOperation
    )
    dist = adsk.core.ValueInput.createByReal(mm(distance_mm))
    ext_input.setDistanceExtent(False, dist)
    try:
        return component.features.extrudeFeatures.add(ext_input)
    except Exception:
        return None


def extrude_cut(component, sketch, distance_mm, target_body):
    """Cut into target_body from sketch plane by distance_mm."""
    profile = pick_biggest_profile(sketch)
    if not profile:
        return None
    ext_input = component.features.extrudeFeatures.createInput(
        profile, adsk.fusion.FeatureOperations.CutFeatureOperation
    )
    dist = adsk.core.ValueInput.createByReal(mm(distance_mm))
    ext_input.setDistanceExtent(False, dist)
    if target_body:
        try:
            ext_input.participantBodies = [target_body]
        except Exception:
            pass
    try:
        return component.features.extrudeFeatures.add(ext_input)
    except Exception:
        return None


def offset_plane(component, base_plane, offset_mm):
    """Create a construction plane offset from base_plane by offset_mm."""
    planes = component.constructionPlanes
    plane_input = planes.createInput()
    offset = adsk.core.ValueInput.createByReal(mm(offset_mm))
    plane_input.setByOffset(base_plane, offset)
    return planes.add(plane_input)


def move_body(component, body, dx, dy, dz):
    """Move a body by (dx, dy, dz) mm."""
    try:
        move_feats = component.features.moveFeatures
        coll = adsk.core.ObjectCollection.create()
        coll.add(body)
        transform = adsk.core.Matrix3D.create()
        transform.translation = adsk.core.Vector3D.create(mm(dx), mm(dy), mm(dz))
        move_input = move_feats.createInput(coll, transform)
        move_feats.add(move_input)
    except Exception:
        pass


def rename_body(body, name):
    """Rename a body for easy identification in browser."""
    try:
        body.name = name
    except Exception:
        pass


# ============================================================
# GEOMETRY BUILDERS
# ============================================================

def build_hollow_pillar(root, params, name_prefix, x_offset):
    """
    Build a hollow rectangular pillar by extruding outer solid then
    cutting inner cavity. Returns the outer body.
    """
    # Outer solid
    sketch = root.sketches.add(root.xYConstructionPlane)
    draw_rect(
        sketch, x_offset, 0,
        params["pillar_width"], params["pillar_depth"]
    )
    outer_ext = extrude_new_body(root, sketch, params["pillar_height"])
    if not outer_ext or outer_ext.bodies.count == 0:
        return None
    outer_body = outer_ext.bodies.item(0)
    rename_body(outer_body, name_prefix + "_Shell")

    # Inner cavity (cut)
    inner_w = params["pillar_width"] - 2 * params["pillar_wall"]
    inner_d = params["pillar_depth"] - 2 * params["pillar_wall"]

    if inner_w > 10 and inner_d > 10:
        # Cut from bottom face of pillar going up
        # But we want to leave top wall solid for PN532 mounting on reader
        cut_sketch = root.sketches.add(root.xYConstructionPlane)
        draw_rect(cut_sketch, x_offset, 0, inner_w, inner_d)
        # Cut up from Z=0 by (pillar_height - top_wall)
        top_wall = params["pillar_wall"]
        cut_height = params["pillar_height"] - top_wall
        extrude_cut(root, cut_sketch, cut_height, outer_body)

    return outer_body


def cut_led_groove_around_top(root, params, name_prefix, x_offset, target_body):
    """
    Cut a groove around all 4 sides of the pillar near the top,
    to represent the green LED accent ring.
    """
    z_groove = params["pillar_height"] - params["led_z_from_top"]
    groove_w = params["led_groove_w"]

    # Front face groove (Y+)
    front_plane = offset_plane(root, root.xZConstructionPlane, params["pillar_depth"] / 2)
    front_sketch = root.sketches.add(front_plane)
    # On this plane, sketch X = world X, sketch Y = world Z
    draw_rect(front_sketch, x_offset, z_groove, params["pillar_width"] + 5, groove_w)
    extrude_cut(root, front_sketch, -params["led_groove_d"], target_body)

    # Back face groove (Y-)
    back_plane = offset_plane(root, root.xZConstructionPlane, -params["pillar_depth"] / 2)
    back_sketch = root.sketches.add(back_plane)
    draw_rect(back_sketch, x_offset, z_groove, params["pillar_width"] + 5, groove_w)
    extrude_cut(root, back_sketch, params["led_groove_d"], target_body)

    # Left face groove (X-)
    left_plane = offset_plane(root, root.yZConstructionPlane, x_offset - params["pillar_width"] / 2)
    left_sketch = root.sketches.add(left_plane)
    # On this plane, sketch X = world Y, sketch Y = world Z
    draw_rect(left_sketch, 0, z_groove, params["pillar_depth"] + 5, groove_w)
    extrude_cut(root, left_sketch, params["led_groove_d"], target_body)

    # Right face groove (X+)
    right_plane = offset_plane(root, root.yZConstructionPlane, x_offset + params["pillar_width"] / 2)
    right_sketch = root.sketches.add(right_plane)
    draw_rect(right_sketch, 0, z_groove, params["pillar_depth"] + 5, groove_w)
    extrude_cut(root, right_sketch, -params["led_groove_d"], target_body)


def cut_pn532_pocket(root, params, x_offset, target_body):
    """Cut PN532 reader pocket into top face of pillar."""
    top_plane = offset_plane(root, root.xYConstructionPlane, params["pillar_height"])
    sketch = root.sketches.add(top_plane)
    draw_rect(sketch, x_offset, 0, params["pn532_pocket_w"], params["pn532_pocket_d"])
    extrude_cut(root, sketch, -params["pn532_pocket_h"], target_body)


def cut_lcd_slot(root, params, x_offset, target_body):
    """Cut LCD rectangular slot on lane-facing side of pillar."""
    # For left pillar (x_offset < 0), lane-facing side is X+ (right side)
    # For right pillar (x_offset > 0), lane-facing side is X- (left side)
    if x_offset < 0:
        # LEFT pillar — LCD faces RIGHT (X+)
        plane = offset_plane(root, root.yZConstructionPlane, x_offset + params["pillar_width"] / 2)
        cut_dist = -params["pillar_wall"] * 2  # into pillar (X-)
    else:
        # RIGHT pillar — LCD faces LEFT (X-)
        plane = offset_plane(root, root.yZConstructionPlane, x_offset - params["pillar_width"] / 2)
        cut_dist = params["pillar_wall"] * 2  # into pillar (X+)

    sketch = root.sketches.add(plane)
    # On this plane, sketch X = world Y, sketch Y = world Z
    draw_rect(sketch, 0, params["lcd_height_from_bottom"], params["lcd_view_w"], params["lcd_view_h"])
    extrude_cut(root, sketch, cut_dist, target_body)


def cut_servo_pockets(root, params, x_offset, target_body):
    """Cut two servo pockets on lane-facing side of reader (left) pillar."""
    # Lane-facing side of left pillar is X+ (right side)
    plane = offset_plane(root, root.yZConstructionPlane, x_offset + params["pillar_width"] / 2)

    # Top servo
    top_sketch = root.sketches.add(plane)
    draw_rect(top_sketch, 0, params["servo_top_z"], params["servo_pocket_w"], params["servo_pocket_h"])
    extrude_cut(root, top_sketch, -params["servo_pocket_depth"], target_body)

    # Bottom servo
    bot_sketch = root.sketches.add(plane)
    draw_rect(bot_sketch, 0, params["servo_bot_z"], params["servo_pocket_w"], params["servo_pocket_h"])
    extrude_cut(root, bot_sketch, -params["servo_pocket_depth"], target_body)


def cut_magnet_pocket(root, params, x_offset, target_body):
    """Cut magnet catch pocket on lane-facing side of receiver (right) pillar."""
    # Lane-facing side of right pillar is X-
    plane = offset_plane(root, root.yZConstructionPlane, x_offset - params["pillar_width"] / 2)
    sketch = root.sketches.add(plane)
    draw_rect(sketch, 0, params["magnet_pocket_z"], params["magnet_pocket_size"], params["magnet_pocket_size"])
    extrude_cut(root, sketch, params["magnet_pocket_depth"], target_body)


def build_display_housing(root, params, x_offset):
    """Build the black display housing box on TOP of the reader pillar."""
    top_plane = offset_plane(root, root.xYConstructionPlane, params["pillar_height"])
    sketch = root.sketches.add(top_plane)
    draw_rect(sketch, x_offset, 0, params["display_housing_w"], params["display_housing_d"])
    ext = extrude_new_body(root, sketch, params["display_housing_h"])
    if ext and ext.bodies.count > 0:
        rename_body(ext.bodies.item(0), "Display_Housing_Top")
        return ext.bodies.item(0)
    return None


def build_base_plate(root, params, x_offset, name):
    """Build a base plate below the pillar."""
    sketch = root.sketches.add(root.xYConstructionPlane)
    m = params["base_plate_margin"]
    draw_rect(
        sketch, x_offset, 0,
        params["pillar_width"] + 2*m,
        params["pillar_depth"] + 2*m
    )
    ext = extrude_new_body(root, sketch, -params["base_plate_thickness"])
    if ext and ext.bodies.count > 0:
        rename_body(ext.bodies.item(0), name)


def build_door_panel(root, params, hinge_x, hinge_z):
    """
    Build the clear plastic door panel.
    Door hangs from hinge_x on the LEFT pillar's inner (right) face,
    extending in the +X direction across the lane.
    """
    # Door panel — extruded from XZ plane, in +Y direction (5mm thick)
    # But actually easier: sketch on XZ plane, thickness in Y direction
    xz_plane = root.xZConstructionPlane
    sketch = root.sketches.add(xz_plane)

    # Door bottom-left corner at (hinge_x, hinge_z)
    # Door extends +X by door_width, +Z by door_height
    # Center of rectangle:
    cx = hinge_x + params["door_width"] / 2
    cz = hinge_z + params["door_height"] / 2

    # On xZConstructionPlane, sketch X = world X, sketch Y = world Z
    draw_rect(sketch, cx, cz, params["door_width"], params["door_height"])

    # Extrude in -Y direction by door_thickness (so door sits at Y=0 plane centered)
    ext = extrude_new_body(root, sketch, -params["door_thickness"])
    if not ext or ext.bodies.count == 0:
        return None
    door_body = ext.bodies.item(0)
    rename_body(door_body, "Door_Panel_Clear")

    # Move door to be centered on Y=0 (half thickness up)
    move_body(root, door_body, 0, params["door_thickness"] / 2, 0)

    return door_body


def build_servo_couplers(root, params, hinge_x):
    """Build two coupler blocks attached to the door at top and bottom hinge points."""
    xy = root.xYConstructionPlane

    for z_val, name in [(params["servo_top_z"], "Top_Servo_Coupler"),
                         (params["servo_bot_z"], "Bottom_Servo_Coupler")]:
        sketch = root.sketches.add(xy)
        cs = params["coupler_size"]
        # Coupler positioned at hinge_x (inner edge of door), on the pillar side
        # Centered on Y=0
        draw_rect(sketch, hinge_x - cs / 2, 0, cs, cs)
        ext = extrude_new_body(root, sketch, cs)
        if ext and ext.bodies.count > 0:
            body = ext.bodies.item(0)
            rename_body(body, name)
            # Move up to z_val
            move_body(root, body, 0, 0, z_val - cs / 2)


# ============================================================
# MAIN
# ============================================================

def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        product = app.activeProduct

        if not product:
            if ui:
                ui.messageBox(
                    "Please open Fusion in ASSEMBLY mode with a new empty design.\n"
                    "File > New Design"
                )
            return

        design = adsk.fusion.Design.cast(product)
        if not design:
            if ui:
                ui.messageBox("Active product is not a Fusion Design. Open a Design in Assembly mode.")
            return

        design.designType = adsk.fusion.DesignTypes.ParametricDesignType

        create_user_params(design)
        params = {name: value for name, value, unit, comment in PARAMS}

        root = design.rootComponent

        # Compute pillar X offsets
        # Total lane width = lane_gap between inner faces
        # Left pillar right edge is at -lane_gap/2, so left pillar center X = -lane_gap/2 - pillar_width/2
        left_x = -(params["lane_gap"] / 2 + params["pillar_width"] / 2)
        right_x = params["lane_gap"] / 2 + params["pillar_width"] / 2

        # === LEFT (Reader) Pillar ===
        left_body = build_hollow_pillar(root, params, "Reader", left_x)
        if left_body:
            cut_pn532_pocket(root, params, left_x, left_body)
            cut_lcd_slot(root, params, left_x, left_body)
            cut_servo_pockets(root, params, left_x, left_body)
            cut_led_groove_around_top(root, params, "Reader", left_x, left_body)

        # === RIGHT (Receiver) Pillar ===
        right_body = build_hollow_pillar(root, params, "Receiver", right_x)
        if right_body:
            cut_lcd_slot(root, params, right_x, right_body)
            cut_magnet_pocket(root, params, right_x, right_body)
            cut_led_groove_around_top(root, params, "Receiver", right_x, right_body)

        # === Display Housing on top of Reader ===
        build_display_housing(root, params, left_x)

        # === Base Plates ===
        build_base_plate(root, params, left_x, "Reader_Base_Plate")
        build_base_plate(root, params, right_x, "Receiver_Base_Plate")

        # === Door Panel (clear plastic) ===
        # Hinge point: right side of left pillar (X = left_x + pillar_width/2)
        hinge_x = left_x + params["pillar_width"] / 2
        hinge_z = params["door_z_from_bottom"]
        build_door_panel(root, params, hinge_x, hinge_z)

        # === Servo Couplers ===
        build_servo_couplers(root, params, hinge_x)

        # Fit view
        try:
            app.activeViewport.fit()
        except Exception:
            pass

        ui.messageBox(
            "RFID Gate model built!\n\n"
            "What was created (all in root component):\n"
            "  - Reader_Shell (left pillar, hollow) with:\n"
            "      * PN532 pocket on top\n"
            "      * LCD slot on lane-facing side\n"
            "      * 2 servo pockets (top + bottom)\n"
            "      * LED groove around top\n"
            "  - Receiver_Shell (right pillar, hollow) with:\n"
            "      * LCD slot on lane-facing side\n"
            "      * Magnet pocket for door catch\n"
            "      * LED groove around top\n"
            "  - Display_Housing_Top on reader pillar\n"
            "  - Door_Panel_Clear (spans lane, hinged left)\n"
            "  - Top_Servo_Coupler + Bottom_Servo_Coupler\n"
            "  - Reader_Base_Plate + Receiver_Base_Plate\n\n"
            "Next steps:\n"
            "  - Modify > Change Parameters to tweak dimensions\n"
            "  - Right-click bodies to assign appearances (silver, black, clear)\n"
            "  - Render workspace for portfolio images"
        )

    except Exception:
        if ui:
            ui.messageBox("Script failed:\n{}".format(traceback.format_exc()))
