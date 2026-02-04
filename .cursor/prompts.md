FSD Generator Pattern: When I ask to create a new "slice", follow this structure:
1. Path: src/<layer>/<name>/
2. Folders: ui/ (components), model/ (interfaces/signals), api/ (services), lib/ (helpers).
3. Public API: Create index.ts in the slice root and export only what's necessary.