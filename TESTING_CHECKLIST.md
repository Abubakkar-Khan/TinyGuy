# Testing Checklist - The Hollow Man

Use this checklist before releasing a new version or after making changes.

## Pre-Installation Testing

### File Integrity
- [ ] All required files present (manifest.json, background.js, content.js, assets/, icons/, popup/)
- [ ] No syntax errors in JavaScript files
- [ ] No syntax errors in JSON files
- [ ] All image files load correctly
- [ ] File sizes are reasonable (<100KB total)

### Code Quality
- [ ] No console errors in any file
- [ ] All functions have proper error handling
- [ ] Code follows ES5 syntax (no ES6+ features)
- [ ] Comments are clear and helpful
- [ ] No TODO or FIXME comments left unresolved

## Installation Testing

### Chrome Extension Loading
- [ ] Extension loads without errors in `chrome://extensions`
- [ ] Extension icon appears in toolbar
- [ ] No error messages in extension card
- [ ] Service worker status shows "active"
- [ ] All permissions granted correctly

### Initial State
- [ ] Character appears on first page load
- [ ] Character starts at viewport center
- [ ] Character is correct size (25% default)
- [ ] No console errors in DevTools (F12)
- [ ] Settings storage initialized correctly

## Functional Testing

### Core Animation
- [ ] Character appears on page load
- [ ] Character follows cursor smoothly
- [ ] Character moves at correct speed (2 px/frame default)
- [ ] Character plays walk animation when moving
- [ ] Character stops at cursor position
- [ ] Character faces correct direction (up/down/left/right)
- [ ] Sprite frames don't bleed into adjacent rows
- [ ] Animation is smooth (60fps)

### Idle Behavior
- [ ] Character plays idle animation when stationary
- [ ] Idle animation is subtle (frame 0 ↔ 1)
- [ ] Idle animation timing is correct (~60 ticks)
- [ ] Character faces down when idle

### Visual Effects
- [ ] Particle trail appears when moving
- [ ] Particles fade out smoothly
- [ ] Particles are golden/tan color
- [ ] Drop shadow appears (if enabled)
- [ ] Shadow is positioned correctly
- [ ] Character fades in on page load
- [ ] Character fades out when cursor leaves (if enabled)
- [ ] Fade transitions are smooth

### Performance
- [ ] Animation runs at 60fps when tab visible
- [ ] Animation reduces to 10fps when tab hidden
- [ ] No memory leaks after extended use
- [ ] CPU usage is minimal (<1%)
- [ ] No lag or stuttering
- [ ] Works smoothly on heavy websites

## Popup Testing

### UI Elements
- [ ] Popup opens when clicking extension icon
- [ ] Popup is 260px wide
- [ ] Dark theme displays correctly
- [ ] All controls are visible and aligned
- [ ] Version number displays correctly
- [ ] Keyboard shortcut reminder displays

### Enable/Disable Toggle
- [ ] Toggle switch in header works
- [ ] Character disappears when disabled
- [ ] Character reappears when enabled
- [ ] Settings section grays out when disabled
- [ ] State persists across page reloads

### Size Slider
- [ ] Slider moves smoothly
- [ ] Value display updates in real-time
- [ ] Character size changes immediately
- [ ] Range: 10% - 200%
- [ ] Default: 25%
- [ ] Value persists across tabs

### Speed Slider
- [ ] Slider moves smoothly
- [ ] Value display updates in real-time
- [ ] Character speed changes immediately
- [ ] Range: 1 - 10
- [ ] Default: 2
- [ ] Value persists across tabs

### Animation Slider
- [ ] Slider moves smoothly
- [ ] Value display updates in real-time
- [ ] Animation speed changes immediately
- [ ] Range: 1 - 15
- [ ] Default: 7
- [ ] Value persists across tabs

### Shadow Toggle
- [ ] Toggle switch works
- [ ] Shadow appears/disappears immediately
- [ ] Default: ON
- [ ] State persists across tabs

### Fade on Leave Toggle
- [ ] Toggle switch works
- [ ] Fade behavior changes immediately
- [ ] Default: ON
- [ ] State persists across tabs

## Settings Sync Testing

### Cross-Tab Sync
- [ ] Open multiple tabs with different websites
- [ ] Change setting in popup on Tab 1
- [ ] Verify change applies to Tab 2 immediately
- [ ] Verify change applies to Tab 3 immediately
- [ ] No page reload required
- [ ] All settings sync correctly

### Storage Persistence
- [ ] Close all tabs
- [ ] Reopen browser
- [ ] Settings are preserved
- [ ] Character appears with saved settings

### Cross-Device Sync (if signed into Chrome)
- [ ] Change settings on Device 1
- [ ] Open Chrome on Device 2
- [ ] Verify settings synced to Device 2
- [ ] May take a few seconds to sync

## Keyboard Shortcut Testing

### Windows/Linux
- [ ] Press Ctrl+Shift+H
- [ ] Character toggles off
- [ ] Press Ctrl+Shift+H again
- [ ] Character toggles on
- [ ] Works from any tab
- [ ] Works without opening popup

### Mac
- [ ] Press Cmd+Shift+H
- [ ] Character toggles off
- [ ] Press Cmd+Shift+H again
- [ ] Character toggles on
- [ ] Works from any tab
- [ ] Works without opening popup

### Shortcut Conflicts
- [ ] Check `chrome://extensions/shortcuts`
- [ ] Verify no conflicts with other extensions
- [ ] Shortcut can be customized if needed

## Browser Compatibility Testing

### Chrome
- [ ] Works on Chrome 88+
- [ ] All features functional
- [ ] No console errors

### Edge (Chromium)
- [ ] Works on Edge 88+
- [ ] All features functional
- [ ] No console errors

### Brave
- [ ] Extension loads correctly
- [ ] All features functional
- [ ] No console errors

### Opera
- [ ] Extension loads correctly
- [ ] All features functional
- [ ] No console errors

## Website Compatibility Testing

### Static Websites
- [ ] Works on simple HTML pages
- [ ] Character appears correctly
- [ ] No layout interference

### Single Page Applications
- [ ] Works on React apps
- [ ] Works on Vue apps
- [ ] Works on Angular apps
- [ ] Character persists during route changes

### Heavy JavaScript Sites
- [ ] Works on Gmail
- [ ] Works on YouTube
- [ ] Works on Twitter/X
- [ ] Works on Facebook
- [ ] No performance issues

### Special Cases
- [ ] Works on scrolling pages
- [ ] Works with fixed position elements
- [ ] Works with modal overlays
- [ ] Works with full-screen elements
- [ ] Character stays on top (z-index)

## Error Handling Testing

### Sprite Loading Failure
- [ ] Rename char.png temporarily
- [ ] Reload extension
- [ ] Check console for error message
- [ ] Extension doesn't crash
- [ ] Restore char.png

### Storage Errors
- [ ] Disable sync in Chrome settings
- [ ] Try changing settings
- [ ] Check console for error message
- [ ] Extension handles gracefully

### Runtime Errors
- [ ] Inject error into content.js
- [ ] Verify error boundary catches it
- [ ] Check console for error log
- [ ] Extension doesn't crash

## Edge Cases Testing

### Window Resize
- [ ] Resize browser window
- [ ] Character canvas resizes correctly
- [ ] Character position adjusts
- [ ] No visual glitches

### Cursor Leave/Enter
- [ ] Move cursor out of window
- [ ] Character fades out (if enabled)
- [ ] Move cursor back in
- [ ] Character fades in

### Tab Visibility
- [ ] Switch to another tab
- [ ] Verify frame rate reduces (check DevTools Performance)
- [ ] Switch back
- [ ] Verify frame rate returns to 60fps

### Multiple Windows
- [ ] Open multiple browser windows
- [ ] Character appears in all windows
- [ ] Settings sync across windows

### Extension Update
- [ ] Modify version in manifest.json
- [ ] Reload extension
- [ ] Verify settings migrate correctly
- [ ] Verify character still works

## Performance Testing

### CPU Usage
- [ ] Open DevTools Performance tab
- [ ] Record for 10 seconds
- [ ] CPU usage < 1% on modern hardware
- [ ] No excessive function calls

### Memory Usage
- [ ] Open DevTools Memory tab
- [ ] Take heap snapshot
- [ ] Memory usage < 10MB per tab
- [ ] No memory leaks after 5 minutes

### Frame Rate
- [ ] Open DevTools Performance tab
- [ ] Record animation
- [ ] Verify 60fps when tab visible
- [ ] Verify 10fps when tab hidden

### Battery Impact
- [ ] Run on laptop with battery
- [ ] Monitor battery drain
- [ ] Should be minimal impact
- [ ] Hidden tabs use less power

## Documentation Testing

### README.md
- [ ] All links work
- [ ] All diagrams display correctly
- [ ] Installation instructions are clear
- [ ] All sections are complete

### CHANGELOG.md
- [ ] All versions documented
- [ ] Changes are categorized correctly
- [ ] Dates are accurate

### CONTRIBUTING.md
- [ ] Guidelines are clear
- [ ] Code style is documented
- [ ] Testing checklist is referenced

### Other Docs
- [ ] BUILD.md instructions work
- [ ] QUICK_REFERENCE.md is accurate
- [ ] PROJECT_SUMMARY.md is up to date

## Pre-Release Checklist

### Version Bump
- [ ] Update version in manifest.json
- [ ] Update version in CHANGELOG.md
- [ ] Update version in README.md badges
- [ ] Update version in PROJECT_SUMMARY.md

### Final Verification
- [ ] All tests pass
- [ ] No console errors
- [ ] No TODOs in code
- [ ] Documentation is complete
- [ ] CHANGELOG is updated

### Build Package
- [ ] Create ZIP file (see BUILD.md)
- [ ] Test ZIP installation
- [ ] Verify all files included
- [ ] File size < 100KB

### Distribution
- [ ] Upload to Chrome Web Store (if applicable)
- [ ] Create GitHub release (if applicable)
- [ ] Update download links
- [ ] Announce release

## Post-Release Monitoring

### User Feedback
- [ ] Monitor for bug reports
- [ ] Check for feature requests
- [ ] Respond to questions
- [ ] Update FAQ if needed

### Performance Monitoring
- [ ] Check for crash reports
- [ ] Monitor CPU/memory usage reports
- [ ] Check compatibility issues
- [ ] Update compatibility list

---

## Test Results

**Date**: _______________  
**Version**: _______________  
**Tester**: _______________  
**Browser**: _______________  
**OS**: _______________  

**Overall Status**: ⬜ PASS | ⬜ FAIL | ⬜ NEEDS WORK

**Notes**:
_______________________________________
_______________________________________
_______________________________________

**Issues Found**:
_______________________________________
_______________________________________
_______________________________________

**Action Items**:
_______________________________________
_______________________________________
_______________________________________
