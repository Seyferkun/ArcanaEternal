// Arcana Eternal — Audio & Effects System
// Add to game.js

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
  if (!audioCtx) audioCtx = new AudioCtx();
}

function playTone(freq, duration, type, vol) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type || 'sine';
  osc.frequency.value = freq;
  gain.gain.value = vol || 0.1;
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function sfxCardPlay() { playTone(800, 0.1, 'sine', 0.08); setTimeout(() => playTone(1200, 0.08, 'sine', 0.06), 50); }
function sfxDamage() { playTone(200, 0.15, 'sawtooth', 0.1); playTone(150, 0.2, 'square', 0.05); }
function sfxBlock() { playTone(600, 0.1, 'triangle', 0.08); }
function sfxHeal() { playTone(500, 0.15, 'sine', 0.06); setTimeout(() => playTone(700, 0.15, 'sine', 0.06), 100); setTimeout(() => playTone(900, 0.2, 'sine', 0.06), 200); }
function sfxVictory() { [523,659,784,1047].forEach((f,i) => setTimeout(() => playTone(f, 0.3, 'sine', 0.08), i*150)); }
function sfxDefeat() { playTone(300, 0.3, 'sawtooth', 0.08); setTimeout(() => playTone(200, 0.4, 'sawtooth', 0.06), 200); }
function sfxClick() { playTone(1000, 0.05, 'sine', 0.04); }
function sfxReward() { playTone(600, 0.1, 'sine', 0.06); setTimeout(() => playTone(900, 0.15, 'sine', 0.06), 80); setTimeout(() => playTone(1200, 0.2, 'sine', 0.06), 160); }

// --- PARTICLES ---
let particles = [];

function spawnParticles(x, y, color, count) {
  for (let i = 0; i < (count || 8); i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6 - 2,
      life: 1,
      decay: 0.02 + Math.random() * 0.02,
      size: 2 + Math.random() * 4,
      color
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.1;
    p.life -= p.decay;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function drawParticles() {
  particles.forEach(p => {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// --- SCREEN SHAKE ---
let shakeX = 0, shakeY = 0, shakeDuration = 0;

function screenShake(intensity, duration) {
  shakeDuration = duration || 10;
  shakeX = (Math.random() - 0.5) * intensity;
  shakeY = (Math.random() - 0.5) * intensity;
}

function updateShake() {
  if (shakeDuration > 0) {
    shakeDuration--;
    shakeX *= 0.9;
    shakeY *= 0.9;
  } else {
    shakeX = 0;
    shakeY = 0;
  }
}

// --- CARD HOVER EFFECT ---
let hoveredCard = -1;

function getCardAt(mouseX, mouseY) {
  if (state !== 'combat') return -1;
  const handY = canvas.height - CARD_H - 20;
  const totalHandW = combat.hand.length * (CARD_W + 10) - 10;
  const handStartX = canvas.width / 2 - totalHandW / 2;
  
  for (let i = 0; i < combat.hand.length; i++) {
    const cx = handStartX + i * (CARD_W + 10);
    if (mouseX >= cx && mouseX <= cx + CARD_W && mouseY >= handY && mouseY <= handY + CARD_H) {
      return i;
    }
  }
  return -1;
}

// --- ENEMY INTENT ICON ---
function drawIntentIcon(x, y, enemy) {
  const intent = enemy.intent;
  const val = enemy.intentVal;
  
  ctx.save();
  ctx.globalAlpha = 0.9;
  
  // Background circle
  ctx.fillStyle = intent === 'attack' ? '#e74c3c' : '#3498db';
  ctx.beginPath();
  ctx.arc(x, y, 18, 0, Math.PI * 2);
  ctx.fill();
  
  // Icon
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px Segoe UI';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (intent === 'attack') {
    ctx.fillText('⚔', x, y);
    ctx.font = 'bold 10px Segoe UI';
    ctx.fillText(val, x, y + 28);
  } else {
    ctx.fillText('🛡', x, y);
    ctx.font = 'bold 10px Segoe UI';
    ctx.fillText(val, x, y + 28);
  }
  ctx.restore();
}

// --- UPDATE render() to use new effects ---
// In renderCombat(), add before the hand drawing:
//   updateParticles();
//   drawParticles();
//   updateShake();
// And apply shake: ctx.save(); ctx.translate(shakeX, shakeY);

// --- ENEMY DEATH ANIMATION ---
let enemyDying = false;
let enemyDeathTimer = 0;

function triggerEnemyDeath() {
  enemyDying = true;
  enemyDeathTimer = 30;
  screenShake(8, 15);
  sfxVictory();
  spawnParticles(canvas.width/2, 150, '#fbbf24', 20);
  spawnParticles(canvas.width/2, 150, '#e74c3c', 15);
}

// --- UPDATE playCard to add SFX ---
// Add after each card type:
//   sfxCardPlay();
//   if (card.type === 'attack') { sfxDamage(); screenShake(4, 8); }

// --- UPDATE endTurn to add SFX ---
// Add: sfxClick();

// --- UPDATE enemyTurn ---
// Add when enemy attacks: sfxDamage(); screenShake(3, 6);
// Add when enemy defends: sfxBlock();

// --- UPDATE endCombat ---
// Add: if (victory) sfxVictory(); else sfxDefeat();

// --- UPDATE restHeal ---
// Add: sfxHeal();