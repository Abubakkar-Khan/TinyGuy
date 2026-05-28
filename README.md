# 🎮 Tiny Guy

**A tiny pixel companion that follows your cursor — earn XP, level up, and watch your little buddy come alive!**

A Chrome extension that places a cute, tiny pixel-art character on every webpage. He follows your cursor, leaves colorful pixel dust trails, earns XP as you browse, and celebrates every level-up with a burst of particles.

## ✨ Features

- 🕹️ **Tiny pixel character** follows your cursor across every webpage
- ⚡ **XP & Level system** — earn XP by moving, level up and unlock celebrations
- 👟 **Step counter** — tracks total pixels traveled
- 🌟 **Pixel dust trail** — colorful square particles in neon green, blue, pink, and gold
- 🎉 **Level-up celebrations** — particle burst + floating "LVL UP!" text
- 🏃 **Idle bounce** — character does a little hop when idle for ~5 seconds
- 🎨 **Retro pixel-art popup** — CRT scanlines, Press Start 2P font, neon glow effects
- ⚙️ **Customizable** — adjust size, speed, animation speed, shadow, and fade behavior
- ⌨️ **Keyboard shortcut** — `Ctrl+Shift+H` to toggle on/off
- 🔄 **Real-time sync** — settings sync across all tabs

## 📦 Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked** and select the project folder
5. Click the extension icon to open the retro control panel!

## 🎮 Controls

| Setting | Description |
|---------|------------|
| **SIZE** | Character scale (10-100%) |
| **SPEED** | Movement speed (1-10) |
| **ANIM** | Animation frame rate (1-15) |
| **SHADOW** | Toggle drop shadow |
| **FADE OUT** | Fade when cursor leaves window |

## 🛠️ Tech Stack

- Pure vanilla JavaScript (no frameworks)
- Chrome Extension Manifest V3
- HTML5 Canvas for rendering
- CSS3 with pixel-art styling & CRT effects
- Google Fonts (Press Start 2P)

## 📁 Project Structure

```
TinyGuy/
├── manifest.json          # Extension manifest (MV3)
├── background.js          # Service worker (defaults, keyboard shortcut)
├── content.js             # Game engine (character, particles, XP system)
├── popup/
│   ├── popup.html         # Retro game menu structure
│   ├── popup.css          # Pixel-art CRT styling
│   └── popup.js           # Controls, stats display, sprite preview
├── assets/
│   └── char.png           # Sprite sheet (4×4 grid)
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.
