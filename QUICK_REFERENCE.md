# The Hollow Man - Quick Reference Card

## Installation
1. Open `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `The_man` folder

## Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| **Ctrl+Shift+H** (Windows/Linux) | Toggle character on/off |
| **Cmd+Shift+H** (Mac) | Toggle character on/off |

## Settings

### Size
- **Range**: 10% - 200%
- **Default**: 25%
- **Description**: Character size relative to sprite sheet

### Speed
- **Range**: 1 - 10 px/frame
- **Default**: 2
- **Description**: How fast the character follows cursor

### Animation
- **Range**: 1 - 15 ticks/step
- **Default**: 7
- **Description**: Animation speed (lower = faster walk cycle)

### Shadow
- **Default**: ON
- **Description**: Drop shadow under character

### Fade on Leave
- **Default**: ON
- **Description**: Character fades when cursor leaves window

## Features

### Automatic Behaviors
- ✅ Character follows cursor smoothly
- ✅ Plays directional walk animations (up, down, left, right)
- ✅ Idle breathing animation when stationary
- ✅ Golden particle trail when moving
- ✅ Fades in on page load
- ✅ Fades out when cursor leaves window (if enabled)
- ✅ Reduces frame rate when tab is hidden (saves battery)

### Real-Time Sync
- Settings update instantly across all open tabs
- No page reload required
- Syncs across devices (if signed into Chrome)

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Character doesn't appear | Check extension is enabled in `chrome://extensions` |
| Character too small/large | Adjust "Size" slider in popup |
| Keyboard shortcut doesn't work | Check `chrome://extensions/shortcuts` |
| Settings don't sync | Make sure you're signed into Chrome |
| Performance issues | Disable "Shadow" or reduce "Size" |

## Where It Works
- ✅ All `http://` and `https://` websites
- ❌ Chrome internal pages (`chrome://`)
- ❌ Local files (`file://`)
- ❌ Chrome Web Store pages

## File Locations
- **Extension folder**: `d:\PROGRAMS\projects\The_man\`
- **Settings storage**: Chrome sync storage (cloud)
- **Sprite sheet**: `assets/char.png`

## Support
- **Documentation**: See [README.md](README.md)
- **Changelog**: See [CHANGELOG.md](CHANGELOG.md)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)
- **Build Guide**: See [BUILD.md](BUILD.md)

## Quick Tips
💡 **Tip 1**: Press Ctrl+Shift+H to quickly toggle without opening popup  
💡 **Tip 2**: Settings sync across all tabs automatically  
💡 **Tip 3**: Character uses less CPU when tab is hidden  
💡 **Tip 4**: Disable shadow for better performance  
💡 **Tip 5**: Try different size settings for different screen sizes  

## Default Settings (Reset Values)
```json
{
  "enabled": true,
  "scale": 25,
  "speed": 2,
  "animSpeed": 7,
  "shadow": true,
  "hideOnLeave": true
}
```

## Version
**Current Version**: 1.1.0  
**Manifest**: V3  
**License**: MIT

---

**Need more help?** Read the full [README.md](README.md)
