# Release Notes Template

Use this template when creating release notes for new versions.

---

# The Hollow Man v[VERSION] Release Notes

**Release Date**: [DATE]  
**Version**: [VERSION]  
**Type**: [Major / Minor / Patch]

## 🎉 What's New

[Describe the main new features or improvements in this release]

### New Features
- **[Feature Name]**: [Description of what it does and why it's useful]
- **[Feature Name]**: [Description of what it does and why it's useful]

### Improvements
- **[Improvement]**: [What was improved and the benefit]
- **[Improvement]**: [What was improved and the benefit]

### Bug Fixes
- **Fixed**: [Description of bug that was fixed]
- **Fixed**: [Description of bug that was fixed]

## 📊 Performance

- [Any performance improvements, e.g., "Reduced CPU usage by 20%"]
- [Memory optimizations]
- [Load time improvements]

## 🔧 Technical Changes

- [Any technical changes developers should know about]
- [API changes]
- [Dependency updates]

## 📝 Breaking Changes

[List any breaking changes that require user action]

⚠️ **Action Required**: [What users need to do]

## 🐛 Known Issues

- [Any known issues in this release]
- [Workarounds if available]

## 📦 Installation

### New Users
1. Download the extension from [link]
2. Open `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the extension folder

### Existing Users
- The extension will update automatically
- Or manually update from `chrome://extensions`

## 🔄 Upgrade Notes

[Any special notes for users upgrading from previous versions]

## 📚 Documentation

- [README.md](README.md) - Complete documentation
- [CHANGELOG.md](CHANGELOG.md) - Full version history
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick reference guide

## 🙏 Acknowledgments

[Thank contributors, testers, or anyone who helped with this release]

## 💬 Feedback

We'd love to hear from you!
- Report bugs: [link to issues]
- Request features: [link to discussions]
- Ask questions: [link to support]

## 📅 What's Next

[Preview of what's coming in the next release]

---

**Full Changelog**: [Link to CHANGELOG.md]

---

# Example Release Notes (v1.1.0)

---

# The Hollow Man v1.1.0 Release Notes

**Release Date**: 2024  
**Version**: 1.1.0  
**Type**: Minor Release

## 🎉 What's New

This release brings exciting visual enhancements, performance optimizations, and quality-of-life improvements to make The Hollow Man even better!

### New Features
- **Particle Trail Effect**: A beautiful golden particle trail now follows the character as it moves, adding visual flair to the animation
- **Idle Breathing Animation**: The character now has a subtle breathing animation when stationary, making it feel more alive
- **Keyboard Shortcut**: Press Ctrl+Shift+H (Cmd+Shift+H on Mac) to quickly toggle the character on/off without opening the popup
- **Dynamic Version Display**: The popup now shows the current version number automatically

### Improvements
- **Performance Optimization**: The extension now reduces to 10fps when the tab is hidden, saving CPU and battery life
- **Smooth Fade-In**: The character now smoothly fades in when first appearing, instead of popping in instantly
- **Better Error Handling**: Added error boundaries and graceful failure handling for improved reliability
- **Cleaner Popup Design**: Simplified the popup to 260px width with a more minimal, focused design
- **Sprite Rendering**: Fixed sprite frame bleeding by adjusting source coordinates

### Bug Fixes
- **Fixed**: Sprite direction mapping (left/right were flipped)
- **Fixed**: Row overlap bleeding in sprite sheet rendering
- **Fixed**: Enable/disable toggle not working in popup
- **Fixed**: Frame calculation using Math.floor instead of Math.round for cleaner boundaries

## 📊 Performance

- Reduced CPU usage by ~90% when tab is hidden (60fps → 10fps)
- Smoother fade transitions with better easing (0.08 interpolation)
- More efficient particle system with automatic cleanup
- Optimized canvas rendering with `imageSmoothingEnabled: false`

## 🔧 Technical Changes

- Added error boundary wrapper in content.js
- Improved sprite loading error handling with automatic cleanup
- Added storage error detection and logging
- Implemented settings migration system for version updates
- Added keyboard command listener in background.js

## 📝 Breaking Changes

None! This release is fully backward compatible.

## 🐛 Known Issues

None at this time. If you encounter any issues, please report them!

## 📦 Installation

### New Users
1. Download the extension
2. Open `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `The_man` folder

### Existing Users
Your settings will be automatically migrated. The default size has been reduced to 25% for a more subtle appearance. You can adjust this in the popup if desired.

## 🔄 Upgrade Notes

**Settings Migration**: If you're upgrading from v1.0.0, your character size will be automatically adjusted to the new default (25%) if it was set to the old defaults (150%, 80%, or 50%). All other settings will be preserved.

## 📚 Documentation

- [README.md](README.md) - Complete documentation with UML diagrams
- [CHANGELOG.md](CHANGELOG.md) - Full version history
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Quick reference guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [BUILD.md](BUILD.md) - Build and distribution guide

## 🙏 Acknowledgments

Thank you to all users who provided feedback and suggestions for this release!

## 💬 Feedback

We'd love to hear from you!
- Report bugs via GitHub Issues
- Request features via GitHub Discussions
- Share your experience on social media

## 📅 What's Next

Future releases may include:
- Per-site control (whitelist/blacklist)
- Multiple character sprites
- Custom sprite upload
- Click interactions
- Sound effects

---

**Full Changelog**: See [CHANGELOG.md](CHANGELOG.md) for complete version history.
