# Contributing to The Hollow Man

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd The_man
   ```

2. **Load the extension in Chrome**
   - Open `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `The_man` folder

3. **Make changes**
   - Edit the relevant files
   - Click the refresh icon in `chrome://extensions` to reload
   - Test on multiple websites

## Project Structure

```
The_man/
├── manifest.json       # Extension configuration
├── background.js       # Service worker (settings, keyboard shortcuts)
├── content.js          # Main animation logic (injected into pages)
├── assets/             # Sprite sheets and images
├── icons/              # Extension icons
└── popup/              # Settings UI
    ├── popup.html
    ├── popup.css
    └── popup.js
```

## Code Style

- **JavaScript**: ES5 syntax for maximum compatibility
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Always use semicolons
- **Comments**: Use `/* */` for block comments, `//` for inline
- **Naming**: camelCase for variables/functions, UPPER_CASE for constants

## Testing Checklist

Before submitting changes, verify:

- [ ] Extension loads without errors in `chrome://extensions`
- [ ] Character appears and follows cursor smoothly
- [ ] All popup controls work correctly
- [ ] Settings sync across multiple tabs in real-time
- [ ] Keyboard shortcut (Ctrl+Shift+H) toggles character
- [ ] No console errors in DevTools (F12)
- [ ] Character fades out when cursor leaves window (if enabled)
- [ ] Idle animation plays when stationary
- [ ] Particle trail appears behind moving character
- [ ] Performance: reduced frame rate when tab is hidden
- [ ] Works on multiple websites (test at least 3 different domains)

## Feature Ideas

Potential enhancements (not yet implemented):

- **Per-site control**: Whitelist/blacklist specific domains
- **Multiple characters**: Choose from different sprite sheets
- **Click interactions**: Character reacts to mouse clicks
- **Sound effects**: Optional audio for footsteps/interactions
- **Preset profiles**: Quick-switch between different configurations
- **Live preview**: Show character in popup while adjusting settings
- **Onboarding**: First-time user tutorial overlay
- **Custom sprites**: Allow users to upload their own sprite sheets

## Submitting Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the code style guidelines
   - Add comments for complex logic
   - Update README.md if adding new features

3. **Test thoroughly**
   - Run through the testing checklist
   - Test on multiple websites
   - Check for console errors

4. **Update documentation**
   - Update CHANGELOG.md with your changes
   - Update README.md if needed
   - Add comments to complex code

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Use conventional commit prefixes:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `perf:` - Performance improvements
   - `test:` - Adding tests

6. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

## Bug Reports

When reporting bugs, please include:

- Chrome version
- Operating system
- Steps to reproduce
- Expected behavior
- Actual behavior
- Console errors (if any)
- Screenshots (if applicable)

## Questions?

Feel free to open an issue for:
- Feature requests
- Bug reports
- Questions about the code
- Suggestions for improvements

Thank you for contributing! 🎉
