# Build Instructions

## Creating a Distribution Package

To create a `.zip` file for distribution or Chrome Web Store submission:

### Windows (PowerShell)
```powershell
# Navigate to the parent directory
cd d:\PROGRAMS\projects

# Create a zip file (excluding development files)
Compress-Archive -Path "The_man\*" -DestinationPath "The_man_v1.1.0.zip" -Force -CompressionLevel Optimal
```

### Windows (Command Prompt)
```cmd
# Use 7-Zip (if installed)
7z a -tzip The_man_v1.1.0.zip The_man\* -x!.vscode -x!.git -x!*.md -x!BUILD.md -x!CONTRIBUTING.md
```

### macOS/Linux
```bash
# Navigate to the parent directory
cd /path/to/projects

# Create a zip file (excluding development files)
zip -r The_man_v1.1.0.zip The_man/ \
  -x "*.git*" \
  -x "*/.vscode/*" \
  -x "*/BUILD.md" \
  -x "*/CONTRIBUTING.md"
```

## Files to Include in Distribution

**Required files:**
- `manifest.json`
- `background.js`
- `content.js`
- `assets/` (all sprite sheets)
- `icons/` (all icon sizes)
- `popup/` (all popup files)
- `README.md`
- `LICENSE`

**Optional files:**
- `CHANGELOG.md` (recommended for users)

**Exclude from distribution:**
- `.vscode/` (development settings)
- `.git/` (version control)
- `BUILD.md` (build instructions)
- `CONTRIBUTING.md` (development guide)
- `.gitignore` (git configuration)

## Chrome Web Store Submission

1. **Create the ZIP package** using the commands above

2. **Prepare store assets:**
   - Extension icon: 128×128px (already in `icons/icon128.png`)
   - Small promo tile: 440×280px (create this)
   - Large promo tile: 920×680px (create this)
   - Marquee promo tile: 1400×560px (optional)
   - Screenshots: 1280×800px or 640×400px (at least 1 required)

3. **Go to Chrome Web Store Developer Dashboard:**
   - https://chrome.google.com/webstore/devconsole

4. **Upload the ZIP file**

5. **Fill in store listing:**
   - Name: "The Hollow Man"
   - Summary: "A sprite character that follows your cursor on every webpage"
   - Description: Use content from README.md
   - Category: "Fun"
   - Language: English

6. **Set privacy practices:**
   - Does NOT collect user data
   - Does NOT use remote code
   - Complies with Chrome Web Store policies

7. **Submit for review**

## Version Bumping

When releasing a new version:

1. **Update version in `manifest.json`:**
   ```json
   "version": "1.2.0"
   ```

2. **Update CHANGELOG.md** with new changes

3. **Update version badges in README.md**

4. **Update popup HTML** (or let JavaScript load it dynamically)

5. **Create new ZIP** with updated version number in filename

6. **Test thoroughly** before submission

## File Size Optimization

Current extension size: ~50KB (very small!)

To further optimize:
- Compress PNG files with tools like TinyPNG or pngquant
- Minify JavaScript (optional, but reduces readability)
- Remove comments from production build (optional)

## Testing Before Release

- [ ] Load unpacked extension in Chrome
- [ ] Test on at least 5 different websites
- [ ] Test all popup controls
- [ ] Test keyboard shortcut
- [ ] Test settings sync across tabs
- [ ] Check for console errors
- [ ] Test on different screen sizes
- [ ] Test with Chrome DevTools open
- [ ] Test performance with tab hidden
- [ ] Verify all animations work correctly

## Support

For questions about building or distributing, see [CONTRIBUTING.md](CONTRIBUTING.md).
