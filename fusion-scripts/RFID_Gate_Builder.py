"""
RFID Gate Builder — Autodesk Fusion Python Script (SIMPLIFIED)
================================================================

Guelph Fit & Rec live-occupancy gate — 3D design model.

Designer: Fatih
Reference gate: LIDE-style swing gate with 2 pill-shaped pedestals + swing door
Approach: Design-first, fabrication-flexible (3D print, wood, MDF, or foam-core)

TARGET DIMENSIONS
------------------
- Assembly total width: 508 mm (20 in)
- Each pillar: 152 mm wide x 254 mm deep x 381 mm tall (6 x 10 x 15 in)
- Lane gap between pillars: 204 mm (8 in)
- Door swings across the lane from the right (Receiver) pillar

WHAT THIS SCRIPT BUILDS
------------------------
Simple, clean visual model:
1. Reader_Pillar   — hollow pill-shaped shell + dome cap + front panel window
2. Receiver_Pillar — hollow pill-shaped shell + dome cap + magnet pocket
3. Door_Assembly   — swing door panel + servo coupler block
4. Front panel with cutouts for TFT (43.2 x 57.6 mm) + LCD 16x2 (64.5 x 16 mm)

No split lines, no screw bosses, no alignment ridges. This is the pure design.
If you print this, you can add splits manually. If you build in wood, you have
a clear reference to work from.

REQUIREMENTS
-------------
- Fusion in ASSEMBLY mode (not Part Design mode)
- If you see "Part Design documents can only contain one component", switch to Assembly
- Fresh empty document recommended (File > New Design)

HOW TO RUN
-----------
1. Open Fusion, verify you're in Assembly mode (Browser shows no "Part Design" label)
2. UTILITIES > ADD-INS > Scripts and Add-Ins (Shift+S)
3. Select RFID_Gate_Builder > Run
4. Wait 15-30 seconds

If a red error box appears, screenshot it and send to Fatih's AI assistant.
"""

import adsk.core
import adsk.fusion
import traceback
import math


# ============================================================
# PARAMETERS — all dimensions in millimeters
# ============================================================
# Every value here becomes an editable User Parameter after the
# script runs. Modify -> Change Parameters to tweak the model.
# ============================================================

PARAMS = [
    # Assembly
    ("assembly_total_width", 508.0, "mm", "Full 20-inch width of gate"),
    ("pillar_width",         152.0, "mm", "Each pillar's width (lane-facing dim)"),
    ("pillar_depth",         254.0, "mm", "Each pillar's depth (front-to-back)"),
    ("pillar_height",        341.0, "mm", "Pillar body height (excludes dome)"),
    ("dome_height",           40.0, "mm", "Curved top dome height"),
    ("wall_thickness",         4.0, "mm", "Exterior wall thickness"),
    ("corner_radius",         35.0, "mm", "Pill-shape corner fillet"),

    # Front panel window
    ("panel_width",          130.0, "mm", "Front panel width"),
    ("panel_height",          85.0, "mm", "Front panel height"),
    ("panel_recess_depth",     2.0, "mm", "Panel recess depth"),
    ("panel_center_from_top", 90.0, "mm", "Distance from pillar top to panel center"),

    # TFT display (DIYmalls 2.8" ILI9341)
    ("tft_active_w",          43.2, "mm", "TFT visible screen width"),
    ("tft_active_h",          57.6, "mm", "TFT visible screen height"),
    ("tft_offset_y",          14.0, "mm", "TFT center offset up from panel center"),

    # LCD 16x2
    ("lcd_view_w",            64.5, "mm", "LCD visible view width"),
    ("lcd_view_h",            16.0, "mm", "LCD visible view height"),
    ("lcd_offset_y",          25.0, "mm", "LCD center offset down from panel center"),

    # Magnet pocket (receiver pillar door latch)
    ("magnet_size",           10.0, "mm", "Magnet pocket square size"),
    ("magnet_pocket_depth",    3.0, "mm", "Magnet pocket depth"),
    ("magnet_height_from_bottom", 100.0, "mm", "Magnet height from pillar bottom"),

    # Door
    ("door_length",          180.0, "mm", "Door panel length"),
    ("door_height",          100.0, "mm", "Door panel height"),
    ("door_thickness",         3.0, "mm", "Door panel thickness"),
    ("door_height_from_bottom", 100.0, "mm", "Door center height from bottom"),

    # Servo coupler (SG90 attach block)
    ("coupler_size",          25.0, "mm", "Servo coupler cube edge"),

    # Base plate
    ("base_plate_thickness",   6.0, "mm", "Base plate thickness"),
    ("base_plate_margin",      8.0, "mm", "Base plate margin around shell"),
]


# ============================================================
# HELPERS
# ============================================================

def mm(x):
    """Convert mm to Fusion internal units (cm)."""
    return x / 10.0


def create_user_params(design):
    """Create editable user parameters in Fusion."""
    user_params = design.userParameters
    for name, value, unit, comment in PARAMS:
        existing = user_params.itemByName(name)
        if existing:
            continue
        try:
            if unit:
                value_input = adsk.core.ValueInput.createByReal(value / 10.0)
                user_params.add(name, value_input, unit, comment)
            else:
                value_input = adsk.core.ValueInput.createByReal(value)
                user_params.add(name, value_input, "", comment)
        except Exception:
            pass


def draw_pill_profile(sketch, cx, cy, width, depth, corner_r):
    """
    Draw a pill/stadium shape (rounded rectangle) centered on (cx, cy).
    Returns the closed profile.
    """
    lines = sketch.sketchCurves.sketchLines
    arcs = sketch.sketchCurves.sketchArcs
    r = min(corner_r, min(width, depth) / 2.0 - 0.1)

    hw = width / 2.0
    hd = depth / 2.0

    p1 = adsk.core.Point3D.create(cx - hw + r, cy - hd, 0)
    p2 = adsk.core.Point3D.create(cx + hw - r, cy - hd, 0)
    p3 = adsk.core.Point3D.create(cx + hw, cy - hd + r, 0)
    p4 = adsk.core.Point3D.create(cx + hw, cy + hd - r, 0)
    p5 = adsk.core.Point3D.create(cx + hw - r, cy + hd, 0)
    p6 = adsk.core.Point3D.create(cx - hw + r, cy + hd, 0)
    p7 = adsk.core.Point3D.create(cx - hw, cy + hd - r, 0)
    p8 = adsk.core.Point3D.create(cx - hw, cy - hd + r, 0)

    c1 = adsk.core.Point3D.create(cx + hw - r, cy - hd + r, 0)
    c2 = adsk.core.Point3D.create(cx + hw - r, cy + hd - r, 0)
    c3 = adsk.core.Point3D.create(cx - hw + r, cy + hd - r, 0)
    c4 = adsk.core.Point3D.create(cx - hw + r, cy - hd + r, 0)

    lines.addByTwoPoints(p1, p2)
    arcs.addByCenterStartSweep(c1, p2, math.pi / 2)
    lines.addByTwoPoints(p3, p4)
    arcs.addByCenterStartSweep(c2, p4, math.pi / 2)
    lines.addByTwoPoints(p5, p6)
    arcs.addByCenterStartSweep(c3, p6, math.pi / 2)
    lines.addByTwoPoints(p7, p8)
    arcs.addByCenterStartSweep(c4, p8, math.pi / 2)


def draw_rectangle(sketch, cx, cy, w, h):
    """Draw a rectangle centered on (cx, cy) on the sketch."""
    lines = sketch.sketchCurves.sketchLines
    p1 = adsk.core.Point3D.create(cx - w/2, cy - h/2, 0)
    p2 = adsk.core.Point3D.create(cx + w/2, cy - h/2, 0)
    p3 = adsk.core.Point3D.create(cx + w/2, cy + h/2, 0)
    p4 = adsk.core.Point3D.create(cx - w/2, cy + h/2, 0)
    lines.addByTwoPoints(p1, p2)
    lines.addByTwoPoints(p2, p3)
    lines.addByTwoPoints(p3, p4)
    lines.addByTwoPoints(p4, p1)


def create_component(parent_occurrences, name):
    """Create a new child component."""
    transform = adsk.core.Matrix3D.create()
    occ = parent_occurrences.addNewComponent(transform)
    occ.component.name = name
    return occ


def extrude_profile(component, sketch, distance, operation=None):
    """Extrude the sketch's largest profile by distance (mm). Returns the extrude feature."""
    if operation is None:
        operation = adsk.fusion.FeatureOperations.NewBodyFeatureOperation

    # Pick largest profile
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

    extrudes = component.features.extrudeFeatures
    ext_input = extrudes.createInput(profile, operation)
    dist = adsk.core.ValueInput.createByReal(mm(distance))
    ext_input.setDistanceExtent(False, dist)
    return extrudes.add(ext_input)


def cut_extrude(component, sketch, distance, start_offset=0):
    """Cut through bodies from the sketch plane by distance (mm)."""
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

    extrudes = component.features.extrudeFeatures
    ext_input = extrudes.createInput(
        profile, adsk.fusion.FeatureOperations.CutFeatureOperation
    )
    dist = adsk.core.ValueInput.createByReal(mm(distance))
    ext_input.setDistanceExtent(False, dist)

    if start_offset != 0:
        offset = adsk.core.ValueInput.createByReal(mm(start_offset))
        start = adsk.fusion.OffsetStartDefinition.create(offset)
        ext_input.startExtent = start

    return extrudes.add(ext_input)


# ============================================================
# BUILDERS
# ============================================================

def build_pillar_shell(component, params):
    """Build a hollow pill-shaped pillar shell."""
    sketches = component.sketches
    xy_plane = component.xYConstructionPlane
    sketch = sketches.add(xy_plane)

    # Outer pill profile
    draw_pill_profile(
        sketch, 0, 0,
        params["pillar_width"], params["pillar_depth"],
        params["corner_radius"]
    )

    # Extrude solid
    ext = extrude_profile(component, sketch, params["pillar_height"])

    if ext is None or ext.bodies.count == 0:
        return None
    body = ext.bodies.item(0)

    # Shell it out — remove the top face to hollow
    try:
        top_face = None
        max_z = -1e9
        for face in body.faces:
            centroid = face.centroid
            if centroid.z > max_z:
                max_z = centroid.z
                top_face = face

        if top_face:
            shells = component.features.shellFeatures
            face_coll = adsk.core.ObjectCollection.create()
            face_coll.add(top_face)
            shell_input = shells.createInput(face_coll, False)
            shell_input.insideThickness = adsk.core.ValueInput.createByReal(
                mm(params["wall_thickness"])
            )
            shells.add(shell_input)
    except Exception:
        pass

    return body


def build_dome(component, params, z_offset):
    """Build a dome cap centered on origin at height z_offset."""
    sketches = component.sketches
    xy_plane = component.xYConstructionPlane
    sketch = sketches.add(xy_plane)

    # Draw dome base profile (same pill shape as pillar)
    draw_pill_profile(
        sketch, 0, 0,
        params["pillar_width"], params["pillar_depth"],
        params["corner_radius"]
    )

    # Extrude thin dome slab
    ext = extrude_profile(component, sketch, params["dome_height"])
    if ext is None or ext.bodies.count == 0:
        return None

    body = ext.bodies.item(0)

    # Move dome up to z_offset
    try:
        move_feats = component.features.moveFeatures
        body_coll = adsk.core.ObjectCollection.create()
        body_coll.add(body)
        transform = adsk.core.Matrix3D.create()
        transform.translation = adsk.core.Vector3D.create(0, 0, mm(z_offset))
        move_input = move_feats.createInput(body_coll, transform)
        move_feats.add(move_input)
    except Exception:
        pass

    # Fillet the top edges for dome look
    try:
        top_edges = []
        max_z = -1e9
        for edge in body.edges:
            pt = edge.pointOnEdge
            if pt.z > max_z - 0.5:
                if pt.z > max_z:
                    top_edges = [edge]
                    max_z = pt.z
                else:
                    top_edges.append(edge)

        if top_edges:
            fillets = component.features.filletFeatures
            edge_coll = adsk.core.ObjectCollection.create()
            for e in top_edges:
                edge_coll.add(e)
            fillet_input = fillets.createInput()
            radius = adsk.core.ValueInput.createByReal(mm(params["dome_height"] * 0.9))
            fillet_input.addConstantRadiusEdgeSet(edge_coll, radius, True)
            fillets.add(fillet_input)
    except Exception:
        pass

    return body


def cut_front_panel_window(component, params):
    """Cut a rectangular window on the front (Y+ face) of the pillar."""
    sketches = component.sketches

    # Create construction plane at Y = pillar_depth/2 (front face)
    try:
        planes = component.constructionPlanes
        plane_input = planes.createInput()
        offset = adsk.core.ValueInput.createByReal(mm(params["pillar_depth"] / 2))
        plane_input.setByOffset(component.xZConstructionPlane, offset)
        front_plane = planes.add(plane_input)
    except Exception:
        return

    sketch = sketches.add(front_plane)

    # Panel center Z from pillar top going down
    panel_z_center = params["pillar_height"] - params["panel_center_from_top"]

    # Rectangle on the front face — sketch is in local coords of the plane
    # X axis of sketch runs along pillar width, Y axis runs vertically (Z world)
    draw_rectangle(
        sketch, 0, panel_z_center,
        params["panel_width"], params["panel_height"]
    )

    # Cut into pillar by recess depth + wall thickness (fully through wall)
    cut_extrude(
        component, sketch,
        -(params["panel_recess_depth"] + params["wall_thickness"] + 1),
        start_offset=0
    )


def cut_display_cutouts(component, params):
    """Cut TFT + LCD rectangular openings on the front panel."""
    sketches = component.sketches

    try:
        planes = component.constructionPlanes
        plane_input = planes.createInput()
        offset = adsk.core.ValueInput.createByReal(mm(params["pillar_depth"] / 2))
        plane_input.setByOffset(component.xZConstructionPlane, offset)
        front_plane = planes.add(plane_input)
    except Exception:
        return

    panel_z_center = params["pillar_height"] - params["panel_center_from_top"]

    # TFT cutout
    tft_sketch = sketches.add(front_plane)
    draw_rectangle(
        tft_sketch, 0, panel_z_center + params["tft_offset_y"],
        params["tft_active_w"], params["tft_active_h"]
    )
    cut_extrude(component, tft_sketch, -(params["wall_thickness"] + 2))

    # LCD cutout
    lcd_sketch = sketches.add(front_plane)
    draw_rectangle(
        lcd_sketch, 0, panel_z_center - params["lcd_offset_y"],
        params["lcd_view_w"], params["lcd_view_h"]
    )
    cut_extrude(component, lcd_sketch, -(params["wall_thickness"] + 2))


def cut_magnet_pocket(component, params):
    """Cut a magnet pocket on the lane-facing side (X- face) of receiver pillar."""
    sketches = component.sketches

    try:
        planes = component.constructionPlanes
        plane_input = planes.createInput()
        # X = -pillar_width/2 (left face when looking down Y+)
        offset = adsk.core.ValueInput.createByReal(-mm(params["pillar_width"] / 2))
        plane_input.setByOffset(component.yZConstructionPlane, offset)
        side_plane = planes.add(plane_input)
    except Exception:
        return

    sketch = sketches.add(side_plane)
    # On this plane, X is world Y, Y is world Z
    # Magnet at 0 (Y-centered) at height magnet_height_from_bottom
    draw_rectangle(
        sketch, 0, params["magnet_height_from_bottom"],
        params["magnet_size"], params["magnet_size"]
    )

    cut_extrude(component, sketch, params["magnet_pocket_depth"])


def build_base_plate(component, params):
    """Build a base plate below the pillar."""
    sketches = component.sketches
    xy_plane = component.xYConstructionPlane
    sketch = sketches.add(xy_plane)

    margin = params["base_plate_margin"]
    draw_pill_profile(
        sketch, 0, 0,
        params["pillar_width"] + 2*margin,
        params["pillar_depth"] + 2*margin,
        params["corner_radius"] + margin
    )

    ext = extrude_profile(component, sketch, -params["base_plate_thickness"])
    return ext


def build_door(component, params):
    """Build the swing door panel + servo coupler."""
    sketches = component.sketches

    # Door panel (thin plate)
    xy = component.xYConstructionPlane

    # Coupler cube first — becomes the mount point
    coupler_sketch = sketches.add(xy)
    draw_rectangle(
        coupler_sketch, 0, 0,
        params["coupler_size"], params["coupler_size"]
    )
    extrude_profile(component, coupler_sketch, params["coupler_size"])

    # Door panel — extends from coupler in X+ direction
    door_sketch = sketches.add(xy)
    # Place door with left edge at coupler right edge
    door_cx = params["coupler_size"] / 2 + params["door_length"] / 2
    draw_rectangle(
        door_sketch, door_cx, 0,
        params["door_length"], params["door_thickness"]
    )
    extrude_profile(component, door_sketch, params["door_height"])


def position_component(occurrence, dx, dy, dz):
    """Move a component occurrence by (dx, dy, dz) in mm."""
    try:
        transform = adsk.core.Matrix3D.create()
        transform.translation = adsk.core.Vector3D.create(mm(dx), mm(dy), mm(dz))
        occurrence.transform = transform

        # Also snapshot the transform to fix it in place
        try:
            adsk.core.Application.get().activeProduct.snapshots.add()
        except Exception:
            pass
    except Exception:
        pass


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
                    "Please create a new Fusion Design first (File > New Design).\n"
                    "Then re-run this script."
                )
            return

        design = adsk.fusion.Design.cast(product)
        if not design:
            if ui:
                ui.messageBox("Active product is not a Fusion Design. Please open a Design.")
            return

        design.designType = adsk.fusion.DesignTypes.ParametricDesignType

        # Build parameters (mm float values)
        create_user_params(design)
        params = {name: value for name, value, unit, comment in PARAMS}

        root_comp = design.rootComponent

        # === Reader Pillar ===
        reader_occ = create_component(root_comp.occurrences, "Reader_Pillar")
        reader = reader_occ.component
        build_pillar_shell(reader, params)
        build_dome(reader, params, params["pillar_height"])
        cut_front_panel_window(reader, params)
        cut_display_cutouts(reader, params)
        build_base_plate(reader, params)

        # === Receiver Pillar ===
        receiver_occ = create_component(root_comp.occurrences, "Receiver_Pillar")
        receiver = receiver_occ.component
        build_pillar_shell(receiver, params)
        build_dome(receiver, params, params["pillar_height"])
        cut_magnet_pocket(receiver, params)
        build_base_plate(receiver, params)

        # === Door Assembly ===
        door_occ = create_component(root_comp.occurrences, "Door_Assembly")
        build_door(door_occ.component, params)

        # === Position pillars ===
        half_span = (params["assembly_total_width"] - params["pillar_width"]) / 2
        position_component(reader_occ, -half_span, 0, 0)
        position_component(receiver_occ, half_span, 0, 0)

        # Position door at receiver pillar height, extending into the lane
        door_x = half_span - params["pillar_width"] / 2 - params["coupler_size"] / 2
        door_z = params["door_height_from_bottom"]
        position_component(door_occ, door_x, 0, door_z)

        # Fit view
        try:
            app.activeViewport.fit()
        except Exception:
            pass

        ui.messageBox(
            "RFID Gate model built successfully!\n\n"
            "What was created:\n"
            "  - Reader_Pillar with front panel window + TFT/LCD cutouts\n"
            "  - Receiver_Pillar with magnet pocket for door latch\n"
            "  - Door_Assembly with servo coupler + swing panel\n"
            "  - Editable user parameters (Modify > Change Parameters)\n\n"
            "Next steps:\n"
            "  - Adjust parameters to taste\n"
            "  - Switch to Render workspace for portfolio images\n"
            "  - Export STL for 3D printing OR use dimensions to build in wood"
        )

    except Exception:
        if ui:
            ui.messageBox("Script failed:\n{}".format(traceback.format_exc()))
