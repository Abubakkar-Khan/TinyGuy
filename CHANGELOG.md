# Changelog

All notable changes to The Hollow Man Chrome Extension.

## [1.1.0] - 2024

### Added
- **Particle trail effect**: Golden dots fade behind the character as it moves
- **Idle breathing animation**: Subtle frame 0 ↔ 1 animation when stationary (every 60 ticks)
- **Performance optimization**: Reduces to 10fps when tab is hidden to save CPU/battery
- **Smooth fade-in**: Character alpha starts at 0 and smoothly fades in on load
- **Keyboard shortcut**: Ctrl+Shift+H (Cmd+Shift+H on Mac) to toggle character on/off
- **Error boundary**: Runtime error handling with console logging
- **Sprite loading error handling**: Graceful failure with automatic cleanup
- **Dynamic version display**: Popup footer shows version from manifest.json
- **Keyboard shortcut reminder**: Footer displays the toggle shortcut
- **Storage error detection**: Logs and handles chrome.storage errors gracefully

### Changed
- **Default size**: Reduced from 150% → 80% → 50% → **25%** (final)
- **Default speed**: Changed from 3 → **2** pixels/frame
- **Default animation speed**: Changed from 6 → **7** ticks/step
- **Popup width**: Reduced from 290px → **260px** for more compact design
- **Popup design**: Simplified to minimal layout with header toggle
- **Fade easing**: Slower, smoother fade with 0.08 interpolation factor
- **Trail particle limit**: Capped at 8 particles maximum
- **Sprite frame trimming**: Offset Y by +1px, trim height by -3px to prevent row bleeding

### Fixed
- **Sprite direction mapping**: Corrected row 1=right, row 2=left (was flipped)
- **Row overlap bleeding**: Fixed sprite frames bleeding into adjacent rows
- **Frame calculation**: Changed from Math.round to Math.floor for clean boundaries
- **Enable toggle**: Fixed broken enable/disable button in popup
- **Settings migration**: Force-update old scale values (150%, 80%, 50%) to new default (25%)

### Removed
- **Status pill**: Removed "Active on all pages" indicator
- **Version badge**: Removed static version badge (replaced with dynamic footer)
- **Reset button**: Removed settings reset button for cleaner UI

## [1.0.0] - 2024

### Added
- Initial release
- Manifest V3 Chrome extension structure
- Content script with canvas overlay
- 4-directional sprite-sheet animation (down, right, left, up)
- Constant-speed cursor following
- Real-time settings sync across tabs via chrome.storage.sync
- Popup UI with controls:
  - Size slider (10-200%)
  - Speed slider (1-10 px/frame)
  - Animation speed slider (1-15 ticks/step)
  - Shadow toggle
  - Fade on leave toggle
- Dark theme with gold accent colors
- Drop shadow effect
- Fade out when cursor leaves window
- Comprehensive README with UML diagrams
- Architecture documentation
- Sprite sheet layout documentation
- Installation instructions

### Technical Details
- Pure Canvas2D rendering (no p5.js dependency)
- 60fps requestAnimationFrame loop
- Singleton pattern to prevent multiple instances
- Sprite sheet: 4×4 grid (4 columns × 4 rows)
- Frame dimensions calculated dynamically from sprite image
- Z-index: 2147483647 (always on top)
- Pointer-events: none (doesn't interfere with page interaction)
