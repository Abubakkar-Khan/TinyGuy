'use strict';

(function () {

  if (window.__tinyGuy) return;
  window.__tinyGuy = true;

  window.addEventListener('error', function (e) {
    if (e.filename && e.filename.includes('content.js')) {
      console.error('[TinyGuy] Runtime error:', e.message, e.filename, e.lineno);
    }
  });

  var COLS     = 4;
  var ROWS     = 4;
  var IDLE_ROW = 0;
  var DUST_COLORS   = ['#2de370', '#4cc9f0', '#ff6b9d', '#ffd700'];
  var MAX_PARTICLES = 40;
  var XP_PER_500PX  = 1;
  var SAVE_INTERVAL = 5000;
  var IDLE_BOUNCE_THRESHOLD = 300;
  var IDLE_BOUNCE_DURATION  = 20;

  var canvas, ctx, raf;
  var alive     = false;
  var img       = null;
  var ready     = false;
  var frameW    = 0;
  var frameH    = 0;

  var posX = 0, posY = 0;
  var targetX = 0, targetY = 0;
  var dir      = IDLE_ROW;
  var frame    = 0;
  var tick     = 0;
  var alpha    = 0;
  var inWin    = true;
  var idleTick = 0;
  var tabVisible = true;

  // Keyboard state
  var keys = { w: false, a: false, s: false, d: false };

  var particles = [];
  var xp            = 0;
  var level         = 1;
  var steps         = 0;
  var stepAccum     = 0;
  var distAccum     = 0;
  var lastSaveTime  = 0;
  var statsDirty    = false;

  var bouncing       = false;
  var bounceFrame    = 0;
  var bounceOffsetY  = 0;
  var levelUpText       = null;
  var celebrationActive = false;

  var cfg = {
    enabled     : true,
    scale       : 0.05,
    speed       : 3,
    animSpeed   : 6,
    shadow      : true,
    keyboardControl: false
  };

  chrome.storage.local.get(null, function (stored) {
    applyConfig(stored || {});
    loadStats(stored || {});
    if (cfg.enabled) start();
  });

  chrome.storage.onChanged.addListener(function (changes, area) {
    if (area !== 'local') return;
    var patch = {};
    for (var k in changes) patch[k] = changes[k].newValue;
    applyConfig(patch);
    loadStats(patch); // Update stats from other tabs
    if (cfg.enabled && !alive) start();
    else if (!cfg.enabled && alive) stop();
  });

  function applyConfig(s) {
    if ('enabled'     in s) cfg.enabled     = (s.enabled !== false);
    if ('scale'       in s) cfg.scale       = clamp(Number(s.scale) / 100, 0.01, 5);
    if ('speed'       in s) cfg.speed       = clamp(Number(s.speed), 1, 20);
    if ('animSpeed'   in s) cfg.animSpeed   = clamp(Number(s.animSpeed), 1, 30);
    if ('shadow'      in s) cfg.shadow      = (s.shadow !== false);
    if ('keyboardControl' in s) cfg.keyboardControl = (s.keyboardControl === true);
  }

  function loadStats(s) {
    if ('xp'    in s) xp    = Math.max(0, Number(s.xp)    || 0);
    if ('level' in s) level = Math.max(1, Number(s.level)  || 1);
    if ('steps' in s) steps = Math.max(0, Number(s.steps)  || 0);
  }

  function maybeSaveStats() {
    if (!statsDirty) return;
    var now = Date.now();
    if (now - lastSaveTime < SAVE_INTERVAL) return;
    lastSaveTime = now;
    statsDirty   = false;
    chrome.storage.local.set({ xp: xp, level: level, steps: steps });
  }

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function randInt(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
  function pickDustColor() { return DUST_COLORS[randInt(0, DUST_COLORS.length - 1)]; }

  function xpToNextLevel() { return level * 50; }

  function addDistance(dist) {
    stepAccum += dist / 10;
    if (stepAccum >= 1) {
      var wholeSteps = Math.floor(stepAccum);
      steps += wholeSteps;
      stepAccum -= wholeSteps;
      statsDirty = true;
    }
    
    distAccum += dist;
    while (distAccum >= 500) {
      distAccum -= 500;
      xp += XP_PER_500PX;
      var needed = xpToNextLevel();
      if (xp >= needed) {
        xp = 0;
        level++;
        triggerLevelUpCelebration();
      }
    }
  }

  function spawnDustParticle(px, py) {
    if (particles.length >= MAX_PARTICLES) return;
    particles.push({
      x: px + (Math.random() - 0.5) * 6,
      y: py + (Math.random() - 0.5) * 4,
      vx: (Math.random() - 0.5) * 1.2,
      vy: Math.random() * 0.5 + 0.2,
      size: randInt(2, 3),
      color: pickDustColor(),
      alpha: 0.7 + Math.random() * 0.3,
      life: 0,
      maxLife: randInt(20, 40),
      gravity: 0.03
    });
  }

  function spawnCelebrationParticle(px, py) {
    var angle = Math.random() * Math.PI * 2;
    var speed = 2 + Math.random() * 4;
    particles.push({
      x: px, y: py,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: randInt(2, 4),
      color: pickDustColor(),
      alpha: 1.0, life: 0,
      maxLife: randInt(30, 60),
      gravity: 0.06
    });
  }

  function updateParticles() {
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha = (1 - p.life / p.maxLife) * 0.9;
      if (p.life >= p.maxLife || p.alpha <= 0.01) particles.splice(i, 1);
    }
  }

  function drawParticles() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      if (p.alpha <= 0.01) continue;
      ctx.globalAlpha = p.alpha * Math.min(1, alpha);
      ctx.fillStyle   = p.color;
      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
    }
    ctx.globalAlpha = 1;
  }

  function triggerLevelUpCelebration() {
    celebrationActive = true;
    for (var i = 0; i < 25; i++) spawnCelebrationParticle(posX, posY);
    levelUpText = { x: posX, y: posY - 20, alpha: 1.0, offsetY: 0 };
  }

  function updateLevelUpText() {
    if (!levelUpText) return;
    levelUpText.offsetY -= 0.8;
    levelUpText.alpha   -= 0.012;
    if (levelUpText.alpha <= 0) {
      levelUpText = null;
      celebrationActive = false;
    }
  }

  function drawLevelUpText() {
    if (!levelUpText || levelUpText.alpha <= 0.01) return;
    ctx.save();
    ctx.globalAlpha = levelUpText.alpha * Math.min(1, alpha);
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.strokeText('LVL UP!', Math.floor(levelUpText.x), Math.floor(levelUpText.y + levelUpText.offsetY));
    ctx.fillStyle = '#ffd700';
    ctx.fillText('LVL UP!', Math.floor(levelUpText.x), Math.floor(levelUpText.y + levelUpText.offsetY));
    ctx.restore();
  }

  function updateIdleBounce() {
    if (bouncing) {
      bounceFrame++;
      var t = bounceFrame / IDLE_BOUNCE_DURATION;
      bounceOffsetY = -Math.sin(t * Math.PI) * 6;
      if (bounceFrame >= IDLE_BOUNCE_DURATION) {
        bouncing = false;
        bounceFrame = 0;
        bounceOffsetY = 0;
        idleTick = 0;
      }
    } else {
      bounceOffsetY = 0;
    }
  }

  function start() {
    if (alive) return;
    alive = true;
    canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2147483647';
    canvas.style.display = 'block';

    document.documentElement.appendChild(canvas);
    ctx = canvas.getContext('2d');
    setSize();

    posX = targetX = canvas.width  / 2;
    posY = targetY = canvas.height / 2;
    alpha = 0; idleTick = 0; tick = 0;
    bouncing = false; bounceFrame = 0; bounceOffsetY = 0;
    particles = []; levelUpText = null;
    lastSaveTime = Date.now();
    keys = { w: false, a: false, s: false, d: false };

    loadSprite();

    window.addEventListener('resize', setSize, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    document.addEventListener('visibilitychange', onVisibilityChange);

    raf = requestAnimationFrame(loop);
  }

  function stop() {
    alive = false;
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    if (canvas) { canvas.remove(); canvas = null; ctx = null; }
    window.removeEventListener('resize', setSize);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseleave', onLeave);
    window.removeEventListener('mouseenter', onEnter);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    document.removeEventListener('visibilitychange', onVisibilityChange);

    if (statsDirty) {
      chrome.storage.local.set({ xp: xp, level: level, steps: steps });
      statsDirty = false;
    }
  }

  function loadSprite() {
    img = new Image();
    img.onload = function () {
      frameW = Math.floor(img.naturalWidth / COLS);
      frameH = Math.floor(img.naturalHeight / ROWS);
      ready = true;
    };
    img.src = chrome.runtime.getURL('assets/char.png');
  }

  function setSize() {
    if (!canvas) return;
    canvas.width = window.innerWidth || document.documentElement.clientWidth || 800;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || 600;
  }

  function isInputActive() {
    const active = document.activeElement;
    if (!active) return false;
    const tag = active.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || active.isContentEditable;
  }

  function onKeyDown(e) {
    if (!cfg.keyboardControl || isInputActive() || e.repeat) return;
    const key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
      keys[key] = true;
    }
    if (key === 'k') {
      e.preventDefault(); // prevent potential default
      simulateClick(posX, posY, 'left');
    }
  }

  function onKeyUp(e) {
    if (!cfg.keyboardControl) return;
    const key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) {
      keys[key] = false;
    }
  }

  function simulateClick(x, y, type) {
    const el = document.elementFromPoint(x, y);
    if (el) {
      if (type === 'left') {
        const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y, button: 0 };
        el.dispatchEvent(new MouseEvent('mousedown', opts));
        el.dispatchEvent(new MouseEvent('mouseup', opts));
        el.dispatchEvent(new MouseEvent('click', opts));
      }
      
      // Little visual feedback burst
      for (let i = 0; i < 5; i++) {
        spawnDustParticle(x, y);
      }
    }
  }

  function onMove(e) { 
    if (!cfg.keyboardControl) {
      targetX = e.clientX; targetY = e.clientY; 
    }
    inWin = true; 
  }
  function onLeave() { inWin = false; }
  function onEnter() { inWin = true;  }
  function onVisibilityChange() { tabVisible = !document.hidden; }

  function loop() {
    if (!alive) return;
    if (!tabVisible) {
      setTimeout(function () { raf = requestAnimationFrame(loop); }, 100);
      return;
    }

    raf = requestAnimationFrame(loop);
    tick++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var moving = false;
    var dx = 0, dy = 0;
    var step = 0;

    if (cfg.keyboardControl) {
      // WASD overrides target
      let kx = 0, ky = 0;
      if (keys.a) kx -= 1;
      if (keys.d) kx += 1;
      if (keys.w) ky -= 1;
      if (keys.s) ky += 1;

      if (kx !== 0 || ky !== 0) {
        moving = true;
        let len = Math.sqrt(kx*kx + ky*ky);
        dx = kx; dy = ky;
        step = cfg.speed;
        posX += (kx / len) * step;
        posY += (ky / len) * step;
        targetX = posX; // Keep synced
        targetY = posY;
      } else {
        // Explicitly clear targets if not holding keys so no drifting occurs
        targetX = posX;
        targetY = posY;
      }
    } else {
      // Mouse follow
      dx = targetX - posX;
      dy = targetY - posY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      moving = dist > 1;
      if (moving) {
        step = Math.min(cfg.speed, dist);
        posX += (dx / dist) * step;
        posY += (dy / dist) * step;
      }
    }

    if (moving) {
      addDistance(step);
      if (tick % 3 === 0) spawnDustParticle(posX, posY);
      idleTick = 0; bouncing = false; bounceFrame = 0; bounceOffsetY = 0;
    } else {
      idleTick++;
      if (idleTick >= IDLE_BOUNCE_THRESHOLD && !bouncing) {
        bouncing = true; bounceFrame = 0;
      }
    }

    var charW = ready ? frameW * cfg.scale : 20;
    var charH = ready ? frameH * cfg.scale : 20;
    var halfW = charW / 2;
    var halfH = charH / 2;
    posX = clamp(posX, halfW, canvas.width  - halfW);
    posY = clamp(posY, halfH, canvas.height - halfH);

    if (moving) {
      if (Math.abs(dx) > Math.abs(dy)) {
        dir = dx > 0 ? 1 : 2;
      } else {
        dir = dy > 0 ? 0 : 3;
      }
      if (tick % cfg.animSpeed === 0) frame = (frame + 1) % COLS;
    } else {
      dir = IDLE_ROW;
      if (idleTick % 60 === 0) frame = (frame === 0) ? 1 : 0;
    }

    updateIdleBounce();

    alpha = 1;

    if (!ready || frameW === 0) {
      updateParticles(); updateLevelUpText(); maybeSaveStats();
      return;
    }

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    updateParticles();
    drawParticles();
    ctx.restore();

    var w = frameW * cfg.scale;
    var h = frameH * cfg.scale;
    var drawX = Math.floor(posX - w / 2);
    var drawY = Math.floor(posY - h / 2 + bounceOffsetY);

    ctx.save();
    ctx.globalAlpha = Math.min(1, alpha);
    ctx.imageSmoothingEnabled = false;

    if (cfg.shadow) {
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 6; ctx.shadowOffsetX = 1; ctx.shadowOffsetY = 3;
    }

    ctx.drawImage(img, frame * frameW, dir * frameH + 1, frameW, frameH - 3, drawX, drawY, Math.floor(w), Math.floor(h));
    ctx.restore();

    updateLevelUpText();
    drawLevelUpText();
    maybeSaveStats();
  }

}());
