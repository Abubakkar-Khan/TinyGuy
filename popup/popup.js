'use strict';

const LOG = '[TinyGuy]';

const DEFAULTS = {
  enabled:     true,
  scale:       5,
  speed:       3,
  animSpeed:   7,
  shadow:      true,
  keyboardControl: false,
  xp:          0,
  level:       1,
  steps:       0,
};

document.addEventListener('DOMContentLoaded', () => {
  console.log(LOG, 'Popup initializing...');

  const el = {
    enabled:      document.getElementById('enabled'),
    scale:        document.getElementById('scale'),
    scaleOut:     document.getElementById('scale-out'),
    speed:        document.getElementById('speed'),
    speedOut:     document.getElementById('speed-out'),
    animSpeed:    document.getElementById('animSpeed'),
    animOut:      document.getElementById('animSpeed-out'),
    shadow:       document.getElementById('shadow'),
    keyboardCtrl: document.getElementById('keyboardControl'),
    main:         document.getElementById('main'),
    preview:      document.getElementById('preview'),
    levelDisplay: document.getElementById('level-display'),
    xpBar:        document.getElementById('xp-bar'),
    xpText:       document.getElementById('xp-text'),
    stepsDisplay: document.getElementById('steps-display'),
    statsPanel:   document.getElementById('stats-panel'),
    powerLed:     document.getElementById('power-led'),
  };

  /* ── Sprite preview animation ──────────────────── */
  const canvas = el.preview;
  const ctx = canvas.getContext('2d');
  const sprite = new Image();
  let spriteLoaded = false;
  let frameIndex = 0;
  let animTimer = null;

  const SPRITE_COLS = 4;
  const SPRITE_ROWS = 4;

  sprite.onload = () => {
    spriteLoaded = true;
    drawFrame();
    startAnimation();
  };

  sprite.onerror = () => {
    drawPlaceholder();
  };

  try {
    sprite.src = chrome.runtime.getURL('assets/char.png');
  } catch (e) {
    drawPlaceholder();
  }

  function drawFrame() {
    if (!spriteLoaded) return;
    const fw = sprite.width / SPRITE_COLS;
    const fh = sprite.height / SPRITE_ROWS;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    const scale = Math.min(
      (canvas.width) / fw,
      (canvas.height) / fh
    );
    const dw = fw * scale;
    const dh = fh * scale;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;

    ctx.drawImage(
      sprite,
      frameIndex * fw, 0,
      fw, fh,
      dx, dy,
      dw, dh
    );
  }

  function drawPlaceholder() {
    ctx.fillStyle = '#0f380f';
    ctx.fillRect(8, 8, 20, 20);
  }

  function startAnimation() {
    if (animTimer) clearInterval(animTimer);
    animTimer = setInterval(() => {
      frameIndex = (frameIndex + 1) % SPRITE_COLS;
      drawFrame();
    }, 200);
  }

  /* ── Stats helpers ─────────────────────────────── */
  function formatNumber(n) {
    return Number(n).toLocaleString();
  }

  function xpForLevel(level) {
    return level * 50;
  }

  function updateStats(xp, level, steps) {
    const maxXp = xpForLevel(level);
    const pct = Math.min(100, (xp / maxXp) * 100);

    el.levelDisplay.textContent = level;
    el.xpBar.style.width = pct + '%';
    el.xpText.textContent = `${xp} / ${maxXp}`;
    el.stepsDisplay.textContent = formatNumber(steps);
  }

  /* ── UI helpers ────────────────────────────────── */
  function updateOutputs(s) {
    el.scaleOut.textContent = s.scale + '%';
    el.speedOut.textContent = s.speed;
    el.animOut.textContent  = s.animSpeed;
  }

  function updateMainState(enabled) {
    el.main.classList.toggle('disabled', !enabled);
    if (enabled) {
      el.powerLed.classList.remove('off');
    } else {
      el.powerLed.classList.add('off');
    }
  }

  function save(key, value) {
    chrome.storage.sync.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        console.error(LOG, 'Save error:', chrome.runtime.lastError.message);
      }
    });
  }

  /* ── Load settings ─────────────────────────────── */
  chrome.storage.sync.get(DEFAULTS, (s) => {
    el.enabled.checked     = s.enabled;
    el.scale.value         = s.scale;
    el.speed.value         = s.speed;
    el.animSpeed.value     = s.animSpeed;
    el.shadow.checked      = s.shadow;
    el.keyboardCtrl.checked = s.keyboardControl;

    updateOutputs(s);
    updateMainState(s.enabled);
    updateStats(s.xp, s.level, s.steps);
  });

  /* ── Event bindings ────────────────────────────── */
  el.enabled.addEventListener('change', function () {
    const enabled = this.checked;
    save('enabled', enabled);
    updateMainState(enabled);
  });

  el.scale.addEventListener('input', function () {
    const v = Number(this.value);
    el.scaleOut.textContent = v + '%';
    save('scale', v);
  });

  el.speed.addEventListener('input', function () {
    const v = Number(this.value);
    el.speedOut.textContent = v;
    save('speed', v);
  });

  el.animSpeed.addEventListener('input', function () {
    const v = Number(this.value);
    el.animOut.textContent = v;
    save('animSpeed', v);
  });

  el.shadow.addEventListener('change', function () {
    save('shadow', this.checked);
  });
  
  el.keyboardCtrl.addEventListener('change', function () {
    save('keyboardControl', this.checked);
  });

  /* ── Real-time storage listener ────────────────── */
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;

    if (changes.xp || changes.level || changes.steps) {
      chrome.storage.sync.get(['xp', 'level', 'steps'], (s) => {
        updateStats(s.xp, s.level, s.steps);
      });
    }

    if (changes.enabled) {
      el.enabled.checked = changes.enabled.newValue;
      updateMainState(changes.enabled.newValue);
    }
  });

});
