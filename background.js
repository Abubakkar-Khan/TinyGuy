'use strict';

const DEFAULTS = {
  enabled     : true,
  scale       : 5,     // 5% = 0.05× native size — truly tiny
  speed       : 3,
  animSpeed   : 7,
  shadow      : true,
  keyboardControl: false, // New WASD + Space control setting
  xp          : 0,
  level       : 1,
  steps       : 0,
};

/* Write any missing keys on install OR update */
chrome.runtime.onInstalled.addListener(function (details) {
  chrome.storage.sync.get(null, function (stored) {
    var patch = {};

    // Always write missing keys
    for (var k in DEFAULTS) {
      if (!(k in stored)) patch[k] = DEFAULTS[k];
    }

    if (details.reason === 'update' && stored.scale && (stored.scale === 25 || stored.scale === 50 || stored.scale === 80 || stored.scale === 150 || stored.scale === 15)) {
      patch.scale = 5;
    }

    if (Object.keys(patch).length > 0) {
      chrome.storage.sync.set(patch, function() {
        console.log('[TinyGuy] Settings initialized:', patch);
      });
    }
  });
});

/* Keyboard shortcut: Ctrl+Shift+H to toggle */
chrome.commands.onCommand.addListener(function (command) {
  if (command === 'toggle-character') {
    chrome.storage.sync.get(['enabled'], function (data) {
      var newState = !data.enabled;
      chrome.storage.sync.set({ enabled: newState }, function() {
        console.log('[TinyGuy] Toggled via keyboard:', newState ? 'ON' : 'OFF');
      });
    });
  }
});
