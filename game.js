// Arcana Eternal — Core Game Engine
// Phase 1: Card combat system, map generation, game state machine

let canvas, ctx, ui;

function init() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');
  ui = document.getElementById('ui-layer');
}

// --- CONSTANTS ---
const CARD_W = 140, CARD_H = 200;
const ENERGY_MAX = 3;
const HAND_SIZE = 5;
const DRAW_PER_TURN = 5;

// --- GAME STATE ---
let state = 'menu'; // menu, map, combat, reward, shop, rest, gameover, victory
let runData = null;

function newRun() {
  return {
    floor: 1,
    hp: 70, maxHp: 70,
    gold: 50,
    deck: getStarterDeck(),
    relics: [],
    path: null,
    nodeIndex: 0,
    metaEssence: 0
  };
}

function getStarterDeck() {
  const cards = [];
  // 8 basic attacks
  for (let i = 0; i < 4; i++) cards.push({...CARDS.golpe_rapido});
  for (let i = 0; i < 4; i++) cards.push({...CARDS.espadada});
  // 4 skills
  for (let i = 0; i < 2; i++) cards.push({...CARDS.escudo_reforcado});
  for (let i = 0; i < 2; i++) cards.push({...CARDS.foco});
  return shuffle(cards);
}

// --- CARD DATABASE ---
const CARDS = {
  golpe_rapido: { id: 'golpe_rapido', name: 'Golpe Rapido', type: 'attack', cost: 1, damage: 6, desc: 'Causa 6 de dano.', color: '#e74c3c' },
  espadada: { id: 'espadada', name: 'Espadada', type: 'attack', cost: 1, damage: 8, desc: 'Causa 8 de dano.', color: '#c0392b' },
  investida: { id: 'investida', name: 'Investida', type: 'attack', cost: 2, damage: 12, block: 5, desc: 'Causa 12 de dano. Ganha 5 de escudo.', color: '#e67e22' },
  golpe_brutal: { id: 'golpe_brutal', name: 'Golpe Brutal', type: 'attack', cost: 2, damage: 18, desc: 'Causa 18 de dano.', color: '#8e44ad' },
  corte_duplo: { id: 'corte_duplo', name: 'Corte Duplo', type: 'attack', cost: 1, damage: 3, hits: 2, desc: 'Causa 3 de dano 2x.', color: '#2980b9' },
  estocada: { id: 'estocada', name: 'Estocada', type: 'attack', cost: 0, damage: 4, draw: 1, desc: 'Causa 4 de dano. Compra 1 carta.', color: '#16a085' },
  escudo_reforcado: { id: 'escudo_reforcado', name: 'Escudo Reforcado', type: 'skill', cost: 1, block: 8, desc: 'Ganha 8 de escudo.', color: '#2ecc71' },
  barreira_gelo: { id: 'barreira_gelo', name: 'Barreira de Gelo', type: 'skill', cost: 2, block: 12, desc: 'Ganha 12 de escudo.', color: '#3498db' },
  foco: { id: 'foco', name: 'Foco', type: 'skill', cost: 1, draw: 2, desc: 'Compra 2 cartas.', color: '#9b59b6' },
  preparacao: { id: 'preparacao', name: 'Preparacao', type: 'skill', cost: 1, buff: 'strength', amount: 3, desc: 'Proximo ataque +50%.', color: '#f39c12' },
  esquiva: { id: 'esquiva', name: 'Esquiva', type: 'skill', cost: 1, block: 6, draw: 1, desc: 'Ganha 6 de escudo. Compra 1.', color: '#1abc9c' },
  forca_interior: { id: 'forca_interior', name: 'Forca Interior', type: 'power', cost: 1, perm: true, buff: 'strength', amount: 2, desc: 'Permanente: +2 Strength.', color: '#d35400' },
};

// --- ENEMY DATABASE ---
const ENEMY_LITE = {
  skeleton: { name: 'Esqueleto', hp: 30, maxHp: 30, intent: 'attack', intentVal: 7, color: '#bdc3c7' },
  bat: { name: 'Morcego Sombrio', hp: 22, maxHp: 22, intent: 'attack', intentVal: 5, hits: 2, color: '#8e44ad' },
  slime: { name: 'Slime', hp: 40, maxHp: 40, intent: 'attack', intentVal: 6, color: '#27ae60' },
  goblin: { name: 'Goblin', hp: 25, maxHp: 25, intent: 'attack', intentVal: 8, debuff: 'weak', color: '#e67e22' },
  spider: { name: 'Aranha', hp: 35, maxHp: 35, intent: 'attack', intentVal: 7, poison: 3, color: '#2c3e50' },
  ghost: { name: 'Fantasma', hp: 28, maxHp: 28, intent: 'attack', intentVal: 9, dodge: true, color: '#95a5a6' },
  orc: { name: 'Orc Berserker', hp: 45, maxHp: 45, intent: 'attack', intentVal: 12, selfDamage: 3, color: '#c0392b' },
  imp: { name: 'Diabo', hp: 20, maxHp: 20, intent: 'attack', intentVal: 4, stealEnergy: 1, color: '#e74c3c' },
  mushroom: { name: 'Cogumelo', hp: 50, maxHp: 50, intent: 'attack', intentVal: 6, regen: 5, color: '#e67e22' },
  knight: { name: 'Cavaleiro', hp: 55, maxHp: 55, intent: 'defend', intentVal: 10, color: '#7f8c8d' },
  // Elites
  paladin: { name: 'Paladino Sombrio', hp: 80, maxHp: 80, intent: 'attack', intentVal: 14, heal: 5, color: '#2c3e50', elite: true },
  assassins: { name: 'Assassinos Gemeos', hp: 45, maxHp: 45, intent: 'attack', intentVal: 8, hits: 2, color: '#8e44ad', elite: true },
  golem: { name: 'Golem', hp: 100, maxHp: 100, intent: 'attack', intentVal: 25, slow: true, color: '#7f8c8d', elite: true },
  // Bosses
  lich: { name: 'Rei Lich', hp: 120, maxHp: 120, intent: 'attack', intentVal: 15, summon: true, color: '#2c3e50', boss: true },
  dragon: { name: 'Dragao Ancestral', hp: 150, maxHp: 150, intent: 'attack', intentVal: 20, color: '#c0392b', boss: true },
  void_entity: { name: 'Entidade do Vazio', hp: 100, maxHp: 100, intent: 'attack', intentVal: 15, color: '#8e44ad', boss: true },
};

// --- COMBAT STATE ---
let combat = null;

function startCombat(enemyKey) {
  const template = ENEMY_DB[enemyKey];
  const enemy = { ...template, hp: template.maxHp };
  
  combat = {
    enemy,
    enemyKey: enemyKey,
    hand: [],
    drawPile: shuffle([...runData.deck]),
    discardPile: [],
    exhaustPile: [],
    energy: ENERGY_MAX,
    maxEnergy: ENERGY_MAX,
    turn: 1,
    playerBlock: 0,
    enemyBlock: 0,
    playerStrength: 0,
    enemyStrength: 0,
    playerWeak: 0,
    enemyWeak: 0,
    playerVuln: 0,
    enemyVuln: 0,
    poison: 0,
    enemyPoison: 0,
    powers: [],
    over: false,
    result: null,
    animating: false,
    log: []
  };
  
  // Draw initial hand
  for (let i = 0; i < HAND_SIZE; i++) drawCard();
  
  state = 'combat';
  addLog('Combate iniciado contra ' + enemy.name + '!');
}

function drawCard() {
  if (combat.drawPile.length === 0) {
    if (combat.discardPile.length === 0) return;
    combat.drawPile = shuffle([...combat.discardPile]);
    combat.discardPile = [];
    addLog('Baralho reciclado.');
  }
  if (combat.hand.length < 12) {
    combat.hand.push(combat.drawPile.pop());
  }
}

function playCard(index) {
  if (combat.animating || combat.over) return;
  const card = combat.hand[index];
  if (!card) return;
  if (card.cost > combat.energy) {
    addLog('Energia insuficiente!');
    return;
  }
  
  combat.energy -= card.cost;
  combat.hand.splice(index, 1);
  
  // Handle card type
  if (card.type === 'attack') {
    let dmg = card.damage + combat.playerStrength;
    if (combat.enemyWeak > 0) dmg = Math.floor(dmg * 0.75);
    if (combat.enemyVuln > 0) dmg = Math.floor(dmg * 1.5);
    if (card.hits) {
      for (let h = 0; h < card.hits; h++) {
        dealDamageToEnemy(dmg);
      }
    } else {
      dealDamageToEnemy(dmg);
    }
    if (card.block) gainBlock(card.block);
    if (card.draw) { for (let i = 0; i < card.draw; i++) drawCard(); }
  } else if (card.type === 'skill') {
    if (card.block) gainBlock(card.block);
    if (card.draw) { for (let i = 0; i < card.draw; i++) drawCard(); }
    if (card.buff === 'strength') combat.playerStrength += card.amount;
  } else if (card.type === 'power') {
    combat.powers.push({ name: card.name, strength: card.amount || 0 });
    combat.playerStrength += card.amount || 0;
  }
  
  // Discard
  if (card.perm) {
    // Powers stay in play
  } else {
    combat.discardPile.push(card);
  }
  
  addLog('Jogou ' + card.name);
  
  // Check enemy death
  if (combat.enemy.hp <= 0) {
    endCombat(true);
    return;
  }
  
  render();
}

function dealDamageToEnemy(dmg) {
  let actual = Math.max(0, dmg - combat.enemyBlock);
  combat.enemyBlock = Math.max(0, combat.enemyBlock - dmg);
  combat.enemy.hp -= actual;
  if (actual > 0) addLog('Causou ' + actual + ' de dano!');
}

function gainBlock(amount) {
  combat.playerBlock += amount;
  addLog('Ganhou ' + amount + ' de escudo.');
}

function endTurn() {
  if (combat.animating || combat.over) return;
  
  // Discard hand
  while (combat.hand.length > 0) {
    combat.discardPile.push(combat.hand.pop());
  }
  
  // Enemy turn
  enemyTurn();
  
  // Check player death
  if (runData.hp <=

0) {
    endCombat(false);
    return;
  }
  
  // New turn
  combat.turn++;
  combat.energy = combat.maxEnergy;
  combat.playerBlock = 0;
  combat.enemyBlock = 0;
  combat.enemyWeak = Math.max(0, combat.enemyWeak - 1);
  combat.playerWeak = Math.max(0, combat.playerWeak - 1);
  combat.enemyVuln = Math.max(0, combat.enemyVuln - 1);
  combat.playerVuln = Math.max(0, combat.playerVuln - 1);
  
  // Enemy poison
  if (combat.enemyPoison > 0) {
    combat.enemy.hp -= combat.enemyPoison;
    combat.enemyPoison--;
    addLog('Veneno: inimigo perde ' + (combat.enemyPoison + 1) + ' HP');
    if (combat.enemy.hp <= 0) { endCombat(true); return; }
  }
  
  // Enemy regen
  if (combat.enemy.regen) {
    combat.enemy.hp = Math.min(combat.enemy.maxHp, combat.enemy.hp + combat.enemy.regen);
  }
  
  // Draw new hand
  for (let i = 0; i < DRAW_PER_TURN; i++) drawCard();
  
  // Update enemy intent
  updateEnemyIntent();
  
  addLog('--- Turno ' + combat.turn + ' ---');
  render();
}

function enemyTurn() {
  const e = combat.enemy;
  const intent = e.intent;
  
  if (intent === 'attack') {
    let dmg = e.intentVal + combat.enemyStrength;
    if (combat.playerWeak > 0) dmg = Math.floor(dmg * 0.75);
    if (combat.playerVuln > 0) dmg = Math.floor(dmg * 1.5);
    
    if (e.hits) {
      for (let h = 0; h < e.hits; h++) {
        dealDamageToPlayer(dmg);
      }
    } else {
      dealDamageToPlayer(dmg);
    }
    
    if (e.selfDamage) {
      e.hp -= e.selfDamage;
      addLog(e.name + ' sofre ' + e.selfDamage + ' de dano colateral');
    }
  } else if (intent === 'defend') {
    combat.enemyBlock += e.intentVal;
    addLog(e.name + ' ganhou ' + e.intentVal + ' de escudo');
  }
  
  // Apply debuffs
  if (e.debuff === 'weak') combat.playerWeak = 2;
  if (e.poison) combat.enemyPoison = (combat.enemyPoison || 0) + e.poison;
  if (e.stealEnergy) combat.energy = Math.max(0, combat.energy - e.stealEnergy);
}

function dealDamageToPlayer(dmg) {
  let actual = Math.max(0, dmg - combat.playerBlock);
  combat.playerBlock = Math.max(0, combat.playerBlock - dmg);
  runData.hp -= actual;
  if (actual > 0) addLog(combat.enemy.name + ' causou ' + actual + ' de dano!');
}

function updateEnemyIntent() {
  const e = combat.enemy;
  // Simple AI: alternate between attack and defend
  if (combat.turn % 3 === 0) {
    e.intent = 'defend';
    e.intentVal = 8 + Math.floor(Math.random() * 6);
  } else {
    e.intent = 'attack';
    e.intentVal = (e.intentVal || 6) + Math.floor(Math.random() * 3);
  }
}

function endCombat(victory) {
  combat.over = true;
  combat.result = victory;
  
  if (victory) {
    const goldReward = 15 + Math.floor(Math.random() * 20);
    runData.gold += goldReward;
    addLog('Vitoria! Ganhou ' + goldReward + ' de ouro.');
    state = 'reward';
  } else {
    addLog('Derrota...');
    state = 'gameover';
  }
  render();
}

// --- MAP GENERATION ---
function generateMap() {
  const nodes = [];
  const floors = 3;
  const nodesPerFloor = [8, 8, 1]; // last floor is boss
  
  for (let f = 0; f < floors; f++) {
    const count = nodesPerFloor[f];
    for (let n = 0; n < count; n++) {
      let type;
      if (f === floors - 1 && n === 0) {
        type = 'boss';
      } else if (n === count - 1 && f < floors - 1) {
        type = 'elite';
      } else {
        const r = Math.random();
        if (r < 0.5) type = 'combat';
        else if (r < 0.7) type = 'event';
        else if (r < 0.85) type = 'shop';
        else type = 'rest';
      }
      nodes.push({ floor: f, index: n, type, x: n * 120 + 60, y: f * 140 + 80 });
    }
  }
  return nodes;
}

// --- REWARD SYSTEM ---
let rewardCards = [];

function generateRewards() {
  rewardCards = [];
  const cardKeys = Object.keys(CARDS);
  for (let i = 0; i < 3; i++) {
    const key = cardKeys[Math.floor(Math.random() * cardKeys.length)];
    rewardCards.push({...CARDS[key]});
  }
}

// --- UTILITY ---
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function addLog(msg) {
  if (combat) {
    combat.log.push(msg);
    if (combat.log.length > 20) combat.log.shift();
  }
}

// --- RENDERING ---
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ui.innerHTML = '';
  
  switch(state) {
    case 'menu': renderMenu(); break;
    case 'map': renderMap(); break;
    case 'combat': renderCombat(); break;
    case 'reward': renderReward(); break;
    case 'shop': renderShop(); break;
    case 'rest': renderRest(); break;
    case 'gameover': renderGameOver(); break;
    case 'victory': renderVictory(); break;
  }
}

function renderMenu() {
  // Background
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Decorative particles
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgba(99,102,241,${Math.random() * 0.3})`;
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Title
  ctx.fillStyle = '#6366f1';
  ctx.font = 'bold 56px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('ARCANA', canvas.width/2, canvas.height/2 - 100);
  
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 36px Segoe UI';
  ctx.fillText('ETERNAL', canvas.width/2, canvas.height/2 - 50);
  
  ctx.fillStyle = '#64748b';
  ctx.font = '16px Segoe UI';
  ctx.fillText('Roguelike Deckbuilder — Final Fantasy Style', canvas.width/2, canvas.height/2 + 10);
  
  // Version
  ctx.fillStyle = '#333';
  ctx.font = '12px Segoe UI';
  ctx.fillText('v0.1 — Alpha', canvas.width/2, canvas.height/2 + 35);
  
  // New Game button
  const btnY = canvas.height/2 + 80;
  const btn = document.createElement('button');
  btn.textContent = '⚔️  Novo Jogo';
  btn.style.cssText = `position:absolute;top:${btnY}px;left:50%;transform:translateX(-50%);padding:16px 48px;font-size:20px;background:#6366f1;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700;box-shadow:0 4px 15px rgba(99,102,241,0.4);transition:all 0.2s`;
  btn.onmouseenter = () => { btn.style.background = '#4f46e5'; btn.style.transform = 'translateX(-50%) scale(1.05)'; };
  btn.onmouseleave = () => { btn.style.background = '#6366f1'; btn.style.transform = 'translateX(-50%) scale(1)'; };
  btn.onclick = () => { 
    runData = newRun(); 
    runData.path = generateMap(); 
    state = 'map'; 
    sfxClick();
    render(); 
  };
  ui.appendChild(btn);
  
  // Continue button (if save exists)
  if (localStorage.getItem('arcana_save')) {
    const contBtn = document.createElement('button');
    contBtn.textContent = '📜  Continuar';
    contBtn.style.cssText = `position:absolute;top:${btnY + 65}px;left:50%;transform:translateX(-50%);padding:12px 36px;font-size:16px;background:#1e293b;color:#f1f5f9;border:1px solid #334155;border-radius:8px;cursor:pointer;font-weight:600`;
    contBtn.onclick = () => {
      try {
        const save = JSON.parse(localStorage.getItem('arcana_save'));
        runData = save.runData;
        state = save.state;
        sfxClick();
        render();
      } catch(e) { localStorage.removeItem('arcana_save'); }
    };
    ui.appendChild(contBtn);
  }
  
  // Footer
  ctx.fillStyle = '#334155';
  ctx.font = '11px Segoe UI';
  ctx.fillText('Feito com ❤️ por Laptop Hermes + VPS Hermes', canvas.width/2, canvas.height - 20);
}

function renderMap() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Title
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 24px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Andar ' + runData.floor + ' / 3', canvas.width/2, 40);
  
  // Subtitle
  ctx.fillStyle = '#64748b';
  ctx.font = '14px Segoe UI';
  ctx.fillText('Escolha o seu caminho', canvas.width/2, 65);
  
  // Draw nodes
  const nodeColors = { combat: '#e74c3c', elite: '#f39c12', boss: '#8e44ad', event: '#3498db', shop: '#2ecc71', rest: '#1abc9c' };
  const nodeLabels = { combat: '⚔', elite: '★', boss: '☠', event: '?', shop: '$', rest: '♨' };
  
  const cols = Math.min(runData.path.length, 8);
  const totalW = cols * 100;
  const startX = canvas.width/2 - totalW/2 + 50;
  
  runData.path.forEach((node, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = startX + col * 100;
    const y = 120 + row * 120;
    
    // Draw line to next node
    if (i < runData.path.length - 1) {
      const nextCol = (i + 1) % cols;
      const nextRow = Math.floor((i + 1) / cols);
      const nx = startX + nextCol * 100;
      const ny = 120 + nextRow * 120;
      
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 25, y);
      ctx.lineTo(nx - 25, ny);
      ctx.stroke();
    }
    
    // Highlight current node
    const isCurrent = i === runData.nodeIndex;
    
    // Node circle
    ctx.beginPath();
    ctx.arc(x, y, isCurrent ? 30 : 25, 0, Math.PI * 2);
    ctx.fillStyle = nodeColors[node.type] || '#333';
    ctx.fill();
    
    if (isCurrent) {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Glow effect
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(251,191,36,0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Label
    ctx.fillStyle = '#fff';
    ctx.font = '20px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(nodeLabels[node.type], x, y);
    
    // Node type label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Segoe UI';
    ctx.fillText(node.type.toUpperCase(), x, y + 35);
    
    // Clickable
    const btn = document.createElement('button');
    btn.style.cssText = `position:absolute;left:${x-30}px;top:${y-30}px;width:60px;height:60px;background:transparent;border:none;cursor:pointer`;
    btn.onclick = () => enterNode(node, i);
    btn.title = node.type.charAt(0).toUpperCase() + node.type.slice(1);
    ui.appendChild(btn);
  });
  
  // HP and Gold bar
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
  
  // HP bar
  ctx.fillStyle = '#334155';
  ctx.fillRect(20, canvas.height - 45, 200, 20);
  const hpPct = runData.hp / runData.maxHp;
  ctx.fillStyle = hpPct > 0.5 ? '#10b981' : hpPct > 0.25 ? '#f59e0b' : '#ef4444';
  ctx.fillRect(20, canvas.height - 45, 200 * hpPct, 20);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 12px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('HP: ' + runData.hp + '/' + runData.maxHp, 120, canvas.height - 31);
  
  // Gold
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 16px Segoe UI';
  ctx.textAlign = 'left';
  ctx.fillText('💰 ' + runData.gold, 20, canvas.height - 15);
  
  // Floor progress
  ctx.fillStyle = '#64748b';
  ctx.font = '12px Segoe UI';
  ctx.textAlign = 'right';
  ctx.fillText('Nó ' + (runData.nodeIndex + 1) + '/' + runData.path.length, canvas.width - 20, canvas.height - 15);
}

function enterNode(node, index) {
  const typeMap = { combat: ['skeleton','bat','slime','goblin','spider','orc','imp','mushroom','knight','wraith'], elite: ['dark_paladin','twin_assassins','golem','vampire'], boss: ['lich','dragon','void_entity'] };
  let pool = null;
  
  if (node.type === 'combat') {
    pool = typeMap.combat;
    startCombat(pool[Math.floor(Math.random() * pool.length)]);
  } else if (node.type === 'elite') {
    pool = typeMap.elite;
    startCombat(pool[Math.floor(Math.random() * pool.length)]);
  } else if (node.type === 'boss') {
    pool = typeMap.boss;
    startCombat(pool[Math.floor(Math.random() * pool.length)]);
  } else if (node.type === 'rest') {
    state = 'rest';
    render(); return;
  } else if (node.type === 'event') {
    const goldGain = 10 + Math.floor(Math.random() * 15);
    runData.gold += goldGain;
    addLog('Evento: encontrou ' + goldGain + ' de ouro!');
    advanceMap();
  } else if (node.type === 'shop') {
    generateShop();
    state = 'shop';
    render(); return;
  }
  render();
}

function advanceMap() {
  runData.nodeIndex++;
  if (runData.nodeIndex >= runData.path.length) {
    runData.floor++;
    runData.nodeIndex = 0;
    if (runData.floor > 3) {
      state = 'victory';
      return;
    }
    runData.path = generateMap();
  }
  state = 'map';
}

function renderCombat() {
  if (!combat) return;
  
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Enemy area
  const enemy = combat.enemy;
  const ex = canvas.width/2, ey = 150;
  
  // Enemy sprite
  var spriteKey = getEnemySprite(combat.enemyKey) || 'skeleton';
  if (assetsLoaded && loadedAssets[spriteKey]) {
    ctx.drawImage(loadedAssets[spriteKey], ex - 50, ey - 50, 100, 100);
  } else {
    ctx.fillStyle = enemy.color || '#e74c3c';
    ctx.beginPath();
    ctx.arc(ex, ey, 50, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Enemy name
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 18px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText(enemy.name + (elite ? ' [ELITE]' : '') + (boss ? ' [BOSS]' : ''), ex, ey - 70);
  
  // Enemy HP bar
  const hpW = 200, hpH = 16;
  ctx.fillStyle = '#333';
  ctx.fillRect(ex - hpW/2, ey + 60, hpW, hpH);
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(ex - hpW/2, ey + 60, hpW * (enemy.hp / enemy.maxHp), hpH);
  ctx.fillStyle = '#fff';
  ctx.font = '12px Segoe UI';
  ctx.fillText(enemy.hp + '/' + enemy.maxHp, ex, ey + 73);
  
  // Enemy intent
  if (!combat.over) {
    ctx.fillStyle = '#fbbf24';
    ctx.font = '14px Segoe UI';
    const intentText = enemy.intent === 'attack' ? '⚔ Atacar: ' + enemy.intentVal : '🛡 Defender: ' + enemy.intentVal;
    ctx.fillText(intentText, ex, ey + 100);
  }
  
  // Enemy block
  if (combat.enemyBlock > 0) {
    ctx.fillStyle = '#3498db';
    ctx.font = '14px Segoe UI';
    ctx.fillText('🛡 ' + combat.enemyBlock, ex + 80, ey + 10);
  }
  
  // Player area
  const px = canvas.width/2, py = canvas.height - 180;
  
  // Player portrait (bottom left)
  if (assetsLoaded && loadedAssets.warrior) {
    ctx.drawImage(loadedAssets.warrior, 20, canvas.height - 140, 70, 70);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, canvas.height - 140, 70, 70);
  }

  // Player block
  if (combat.playerBlock > 0) {
    ctx.fillStyle = '#3498db';
    ctx.font = '16px Segoe UI';
    ctx.fillText('🛡 ' + combat.playerBlock, px + 80, py - 30);
  }
  
  // Player HP
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 16px Segoe UI';
  ctx.textAlign = 'left';
  ctx.fillText('HP: ' + runData.hp + '/' + runData.maxHp, 20, canvas.height - 40);
  ctx.fillText('Ouro: ' + runData.gold, 20, canvas.height - 15);
  
  // Energy with icon
  if (assetsLoaded && loadedAssets.icon_mana) {
    ctx.drawImage(loadedAssets.icon_mana, canvas.width - 120, canvas.height - 55, 24, 24);
  }
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 20px Segoe UI';
  ctx.textAlign = 'right';
  ctx.fillText('⚡ ' + combat.energy + '/' + combat.maxEnergy, canvas.width - 20, canvas.height - 40);
  
  // Turn indicator
  ctx.fillStyle = '#64748b';
  ctx.font = '14px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Turno ' + combat.turn, canvas.width/2, canvas.height - 20);
  
  // Hand
  const handY = canvas.height - CARD_H - 20;
  const totalHandW = combat.hand.length * (CARD_W + 10) - 10;
  const handStartX = canvas.width/2 - totalHandW/2;
  
  combat.hand.forEach((card, i) => {
    const cx = handStartX + i * (CARD_W + 10);
    const canPlay = card.cost <= combat.energy && !combat.over;
    
    // Card background — use generated art if available
    var artId = card.id || card._id;
    var artImg = artId ? getCardArt(artId) : null;
    if (artImg && assetsLoaded) {
      ctx.drawImage(artImg, cx, handY, CARD_W, CARD_H);
      if (canPlay) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
      }
      ctx.strokeRect(cx, handY, CARD_W, CARD_H);
      // Darken bottom for text
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(cx, handY + CARD_H - 55, CARD_W, 55);
    } else {
      ctx.fillStyle = canPlay ? (card.color || '#2c3e50') : '#1a1a2e';
      ctx.strokeStyle = canPlay ? '#fbbf24' : '#333';
      ctx.lineWidth = canPlay ? 2 : 1;
      roundRect(ctx, cx, handY, CARD_W, CARD_H, 6);
      ctx.fill();
      ctx.stroke();
    }
    
    // Card name
    ctx.fillStyle = canPlay ? '#fff' : '#555';
    ctx.font = 'bold 13px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(card.name, cx + CARD_W/2, handY + 22);
    
    // Cost
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px Segoe UI';
    ctx.fillText(card.cost + '⚡', cx + CARD_W/2, handY + 42);
    
    // Description
    ctx.fillStyle = canPlay ? '#ddd' : '#444';
    ctx.font = '11px Segoe UI';
    wrapText(ctx, card.desc, cx + 10, handY + 62, CARD_W - 20, 13);
    
    // Clickable
    if (canPlay) {
      const btn = document.createElement('button');
      btn.style.cssText = `position:absolute;left:${cx}px;top:${handY}px;width:${CARD_W}px;height:${CARD_H}px;background:transparent;border:none;cursor:pointer;border-radius:8px`;
      btn.onclick = () => playCard(i);
      btn.onmouseenter = () => { btn.style.background = 'rgba(99,102,41,0.2)'; };
      btn.onmouseleave = () => { btn.style.background = 'transparent'; };
      ui.appendChild(btn);
    }
  });
  
  // End Turn button
  if (!combat.over) {
    const endBtn = document.createElement('button');
    endBtn.textContent = 'Fim de Turno';
    endBtn.style.cssText = 'position:absolute;right:20px;bottom:20px;padding:12px 24px;font-size:16px;background:#e74c3c;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700';
    endBtn.onclick = endTurn;
    ui.appendChild(endBtn);
  }
  
  // Combat log
  ctx.fillStyle = '#64748b';
  ctx.font = '12px Segoe UI';
  ctx.textAlign = 'left';
  const logStart = canvas.height - CARD_H - 80;
  combat.log.slice(-5).forEach((msg, i) => {
    ctx.fillText('> ' + msg, 20, logStart + i * 16);
  });
  
  // Powers
  if (combat.powers.length > 0) {
    ctx.fillStyle = '#a855f7';
    ctx.font = '12px Segoe UI';
    ctx.textAlign = 'right';
    combat.powers.forEach((p, i) => {
      ctx.fillText('✦ ' + p.name, canvas.width - 20, 80 + i * 18);
    });
  }
  
  // Combat result
  if (combat.over) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;flex-direction:column';
    
    const title = document.createElement('div');
    title.style.cssText = 'font-size:36px;font-weight:700;margin-bottom:20px';
    title.style.color = combat.result ? '#10b981' : '#ef4444';
    title.textContent = combat.result ? 'VITORIA!' : 'DERROTA';
    overlay.appendChild(title);
    
    if (combat.result) {
      const gold = document.createElement('div');

gold.style.cssText = 'font-size:20px;color:#fbbf24;margin-bottom:20px';
      gold.textContent = '+' + (15 + Math.floor(Math.random() * 20)) + ' Ouro';
      overlay.appendChild(gold);
    }
    
    const continueBtn = document.createElement('button');
    continueBtn.textContent = combat.result ? 'Continuar' : 'Menu Principal';
    continueBtn.style.cssText = 'padding:14px 36px;font-size:18px;background:#6366f1;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700';
    continueBtn.onclick = () => {
      if (combat.result) {
        generateRewards();
        state = 'reward';
      } else {
        state = 'menu';
      }
      render();
    };
    overlay.appendChild(continueBtn);
    
    ui.appendChild(overlay);
  }
}

function renderReward() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 28px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Escolha uma Carta', canvas.width/2, 60);
  
  ctx.fillStyle = '#64748b';
  ctx.font = '16px Segoe UI';
  ctx.fillText('Ouro: ' + runData.gold + ' | HP: ' + runData.hp + '/' + runData.maxHp, canvas.width/2, 90);
  
  // Show 3 reward cards
  const cardW = 180, cardH = 260;
  const gap = 30;
  const totalW = 3 * cardW + 2 * gap;
  const startX = canvas.width/2 - totalW/2;
  const cy = canvas.height/2 - cardH/2;
  
  rewardCards.forEach((card, i) => {
    const cx = startX + i * (cardW + gap);
    
    // Card
    ctx.fillStyle = card.color || '#333';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    roundRect(ctx, cx, cy, cardW, cardH, 10);
    ctx.fill();
    ctx.stroke();
    
    // Name
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(card.name, cx + cardW/2, cy + 30);
    
    // Cost
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px Segoe UI';
    ctx.fillText(card.cost + ' ⚡', cx + cardW/2, cy + 55);
    
    // Type
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Segoe UI';
    ctx.fillText(card.type.toUpperCase(), cx + cardW/2, cy + 80);
    
    // Description
    ctx.fillStyle = '#ccc';
    ctx.font = '13px Segoe UI';
    wrapText(ctx, card.desc, cx + 15, cy + 110, cardW - 30, 16);
    
    // Pick button
    const btn = document.createElement('button');
    btn.textContent = 'Escolher';
    btn.style.cssText = `position:absolute;left:${cx + cardW/2 - 50}px;top:${cy + cardH + 15}px;width:100px;padding:10px;font-size:14px;background:#6366f1;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600`;
    btn.onclick = () => {
      runData.deck.push({...card});
      addLog('Adicionou ' + card.name + ' ao baralho!');
      advanceMap();
      render();
    };
    ui.appendChild(btn);
  });
  
  // Skip button
  const skipBtn = document.createElement('button');
  skipBtn.textContent = 'Pular';
  skipBtn.style.cssText = 'position:absolute;bottom:40px;left:50%;transform:translateX(-50%);padding:10px 24px;font-size:14px;background:#333;color:#aaa;border:none;border-radius:6px;cursor:pointer';
  skipBtn.onclick = () => { advanceMap(); render(); };
  ui.appendChild(skipBtn);
}

function renderGameOver() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 48px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('DERROTA', canvas.width/2, canvas.height/2 - 60);
  
  ctx.fillStyle = '#64748b';
  ctx.font = '18px Segoe UI';
  ctx.fillText('Voce caiu nas sombras...', canvas.width/2, canvas.height/2);
  ctx.fillText('Andar alcancado: ' + runData.floor, canvas.width/2, canvas.height/2 + 30);
  ctx.fillText('Essencia Arcana ganha: ' + (runData.floor * 10), canvas.width/2, canvas.height/2 + 55);
  
  const btn = document.createElement('button');
  btn.textContent = 'Menu Principal';
  btn.style.cssText = 'position:absolute;top:65%;left:50%;transform:translateX(-50%);padding:14px 36px;font-size:18px;background:#6366f1;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700';
  btn.onclick = () => { state = 'menu'; render(); };
  ui.appendChild(btn);
}

function renderVictory() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 48px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('VITORIA!', canvas.width/2, canvas.height/2 - 60);
  
  ctx.fillStyle = '#fbbf24';
  ctx.font = '24px Segoe UI';
  ctx.fillText('Voce derrotou o chefe final!', canvas.width/2, canvas.height/2 - 10);
  
  ctx.fillStyle = '#64748b';
  ctx.font = '18px Segoe UI';
  ctx.fillText('Cartas no baralho: ' + runData.deck.length, canvas.width/2, canvas.height/2 + 30);
  ctx.fillText('Ouro acumulado: ' + runData.gold, canvas.width/2, canvas.height/2 + 55);
  
  const btn = document.createElement('button');
  btn.textContent = 'Menu Principal';
  btn.style.cssText = 'position:absolute;top:65%;left:50%;transform:translateX(-50%);padding:14px 36px;font-size:18px;background:#6366f1;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700';
  btn.onclick = () => { state = 'menu'; render(); };
  ui.appendChild(btn);
}

// --- HELPERS ---
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

// --- INIT ---
window.addEventListener('resize', resize);
resize();
render();