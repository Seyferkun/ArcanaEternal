// Arcana Eternal - Minimal Working Version
let canvas, ctx, ui;
let state = 'menu';
let runData = null;

function init() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');
  ui = document.getElementById('ui-layer');
  resize();
}

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function render() {
  // Clear UI layer
  if (ui) ui.innerHTML = '';
  
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  if (state === 'menu') {
    renderMenu();
  } else if (state === 'map') {
    renderMap();
  }
}

function renderMenu() {
  // Background
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Title
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 48px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('ARCANA ETERNAL', canvas.width/2, canvas.height/2 - 60);
  
  // Subtitle
  ctx.fillStyle = '#64748b';
  ctx.font = '18px Segoe UI';
  ctx.fillText('Roguelike Deckbuilder Card Game', canvas.width/2, canvas.height/2 - 20);
  
  // Button
  const btn = document.createElement('button');
  btn.textContent = 'Novo Jogo';
  btn.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);padding:20px 48px;font-size:22px;font-weight:700;background:linear-gradient(135deg,#1a5276,#2980b9);color:#fff;border:none;border-radius:12px;cursor:pointer;box-shadow:0 4px 20px rgba(41,128,185,.5);pointer-events:auto';
  btn.onclick = () => {
    runData = { 
      floor: 1, hp: 70, maxHp: 70, gold: 50, 
      deck: [
        {id:'golpe_rapido', name:'Golpe Rapido', type:'attack', cost:1, damage:6, desc:'Causa 6 de dano.', color:'#e74c3c'},
        {id:'golpe_rapido', name:'Golpe Rapido', type:'attack', cost:1, damage:6, desc:'Causa 6 de dano.', color:'#e74c3c'},
        {id:'golpe_rapido', name:'Golpe Rapido', type:'attack', cost:1, damage:6, desc:'Causa 6 de dano.', color:'#e74c3c'},
        {id:'golpe_rapido', name:'Golpe Rapido', type:'attack', cost:1, damage:6, desc:'Causa 6 de dano.', color:'#e74c3c'},
        {id:'golpe_rapido', name:'Golpe Rapido', type:'attack', cost:1, damage:6, desc:'Causa 6 de dano.', color:'#e74c3c'},
        {id:'escudo_reforcado', name:'Escudo Reforcado', type:'skill', cost:1, block:8, desc:'Ganha 8 de escudo.', color:'#2ecc71'},
        {id:'escudo_reforcado', name:'Escudo Reforcado', type:'skill', cost:1, block:8, desc:'Ganha 8 de escudo.', color:'#2ecc71'},
        {id:'escudo_reforcado', name:'Escudo Reforcado', type:'skill', cost:1, block:8, desc:'Ganha 8 de escudo.', color:'#2ecc71'},
        {id:'foco', name:'Foco', type:'skill', cost:1, draw:2, desc:'Compra 2 cartas.', color:'#9b59b6'},
        {id:'foco', name:'Foco', type:'skill', cost:1, draw:2, desc:'Compra 2 cartas.', color:'#9b59b6'}
      ],
      path: generateMap() 
    };
    state = 'map';
    render();
  };
  ui.appendChild(btn);
}

function generateMap() {
  const nodes = [];
  const floors = 3;
  const nodesPerFloor = [3, 3, 1];
  
  for (let f = 0; f < floors; f++) {
    const count = nodesPerFloor[f];
    for (let n = 0; n < count; n++) {
      let type;
      if (f === floors - 1 && n === 0) type = 'boss';
      else if (n === 0) type = 'combat';
      else if (n === 1) {
        const r = Math.random();
        if (r < 0.4) type = 'event';
        else if (r < 0.7) type = 'shop';
        else type = 'rest';
      } else type = 'elite';
      nodes.push({ floor: f, index: n, type });
    }
  }
  return nodes;
}

function renderMap() {
  if (!runData || !runData.path) return;
  
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Title
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 28px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Andar ' + runData.floor + ' / 3', canvas.width/2, 45);
  
  // Subtitle
  ctx.fillStyle = '#64748b';
  ctx.font = '14px Segoe UI';
  ctx.fillText('Escolhe o teu caminho', canvas.width/2, 68);
  
  // Draw nodes
  const path = runData.path;
  const floorNodes = path.filter(n => n.floor === runData.floor - 1);
  const startY = 120;
  const endY = canvas.height - 120;
  const spacing = (endY - startY) / Math.max(floorNodes.length - 1, 1);
  
  const nodeColors = { combat: '#e74c3c', elite: '#f39c12', boss: '#8e44ad', event: '#3498db', shop: '#2ecc71', rest: '#1abc9c' };
  const nodeIcons = { combat: '⚔', elite: '★', boss: '☠', event: '?', shop: '$', rest: '♨' };
  const nodeLabels = { combat: 'Combate', elite: 'Elite', boss: 'Boss', event: 'Evento', shop: 'Loja', rest: 'Descanso' };
  
  // Draw connecting lines
  ctx.strokeStyle = 'rgba(251,191,36,0.3)';
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 6]);
  for (let i = 0; i < floorNodes.length; i++) {
    const x = canvas.width / 2;
    const y = startY + i * spacing;
    if (i < floorNodes.length - 1) {
      const nextY = startY + (i + 1) * spacing;
      ctx.beginPath();
      ctx.moveTo(x, y + 30);
      ctx.lineTo(x, nextY - 30);
      ctx.stroke();
    }
  }
  ctx.setLineDash([]);
  
  // Draw nodes
  floorNodes.forEach((node, i) => {
    const x = canvas.width / 2;
    const y = startY + i * spacing;
    
    // Glow
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 50);
    gradient.addColorStop(0, nodeColors[node.type] || 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    ctx.fill();
    
    // Circle
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fillStyle = nodeColors[node.type] || '#333';
    ctx.fill();
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Icon
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(nodeIcons[node.type], x, y);
    
    // Label
    ctx.fillStyle = '#f1f5f9';
    ctx.font = 'bold 13px Segoe UI';
    ctx.fillText(nodeLabels[node.type], x, y + 52);
    
    // Clickable
    const btn = document.createElement('button');
    btn.style.cssText = 'position:absolute;left:'+(x-40)+'px;top:'+(y-40)+'px;width:80px;height:80px;background:transparent;border:2px solid transparent;border-radius:50%;cursor:pointer;transition:all .2s';
    btn.onmouseenter = () => { btn.style.borderColor = '#fbbf24'; btn.style.background = 'rgba(251,191,36,0.1)'; };
    btn.onmouseleave = () => { btn.style.borderColor = 'transparent'; btn.style.background = 'transparent'; };
    btn.onclick = () => enterNode(node, i);
    ui.appendChild(btn);
  });
  
  // Bottom UI
  ctx.fillStyle = 'rgba(11,15,25,0.8)';
  ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
  
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 14px Segoe UI';
  ctx.textAlign = 'left';
  ctx.fillText('HP', 20, canvas.height - 55);
  
  const hpBarW = 150, hpBarH = 12;
  ctx.fillStyle = '#333';
  ctx.fillRect(50, canvas.height - 62, hpBarW, hpBarH);
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(50, canvas.height - 62, hpBarW * (runData.hp / runData.maxHp), hpBarH);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 10px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText(runData.hp + '/' + runData.maxHp, 125, canvas.height - 52);
  
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 14px Segoe UI';
  ctx.textAlign = 'left';
  ctx.fillText('💰 ' + runData.gold, 20, canvas.height - 25);
  
  // Debug info
  ctx.fillStyle = '#64748b';
  ctx.font = '12px Segoe UI';
  ctx.textAlign = 'right';
  ctx.fillText('Floor ' + runData.floor + '/3 | Nodes: ' + floorNodes.length, canvas.width - 20, canvas.height - 10);
}

// --- COMBAT SYSTEM ---
let combat = null;

const ENEMY_DB = {
  skeleton: { name: 'Esqueleto', hp: 30, maxHp: 30, intent: 'attack', intentVal: 7, color: '#bdc3c7' },
  bat: { name: 'Morcego Negro', hp: 22, maxHp: 22, intent: 'attack', intentVal: 5, hits: 2, color: '#8e44ad' },
  slime: { name: 'Slime', hp: 40, maxHp: 40, intent: 'attack', intentVal: 6, color: '#27ae60' },
  goblin: { name: 'Goblin', hp: 25, maxHp: 25, intent: 'attack', intentVal: 8, color: '#e67e22' },
  spider: { name: 'Aranha', hp: 35, maxHp: 35, intent: 'attack', intentVal: 7, poison: 3, color: '#2c3e50' },
  orc: { name: 'Orc', hp: 50, maxHp: 50, intent: 'attack', intentVal: 12, color: '#c0392b' },
  imp: { name: 'Diabrete', hp: 28, maxHp: 28, intent: 'attack', intentVal: 4, color: '#e74c3c' },
  mushroom: { name: 'Cogumelo', hp: 55, maxHp: 55, intent: 'attack', intentVal: 6, regen: 5, color: '#e67e22' },
  knight: { name: 'Cavaleiro', hp: 60, maxHp: 60, intent: 'defend', intentVal: 10, color: '#7f8c8d' },
  wraith: { name: 'Espectro', hp: 42, maxHp: 42, intent: 'attack', intentVal: 11, color: '#8e44ad' },
  dark_paladin: { name: 'Paladino Sombrio', hp: 80, maxHp: 80, intent: 'attack', intentVal: 14, heal: 5, color: '#2c3e50', elite: true },
  twin_assassins: { name: 'Assassinos Gémeos', hp: 45, maxHp: 45, intent: 'attack', intentVal: 8, hits: 2, color: '#8e44ad', elite: true },
  golem: { name: 'Golem', hp: 100, maxHp: 100, intent: 'attack', intentVal: 20, slow: true, color: '#7f8c8d', elite: true },
  vampire: { name: 'Vampiro', hp: 75, maxHp: 75, intent: 'attack', intentVal: 16, lifesteal: 0.3, color: '#c0392b', elite: true },
  lich: { name: 'Rei Lich', hp: 120, maxHp: 120, intent: 'attack', intentVal: 15, summon: true, color: '#2c3e50', boss: true },
  dragon: { name: 'Dragão Ancestral', hp: 150, maxHp: 150, intent: 'attack', intentVal: 20, color: '#c0392b', boss: true },
  void_entity: { name: 'Entidade do Vazio', hp: 100, maxHp: 100, intent: 'attack', intentVal: 17, color: '#8e44ad', boss: true }
};

function startCombat(enemyKey) {
  const template = ENEMY_DB[enemyKey];
  if (!template) { console.error('Enemy not found:', enemyKey); return; }
  const enemy = { ...template, hp: template.maxHp };
  combat = {
    enemy, enemyKey, hand: [], drawPile: shuffle([...runData.deck]),
    discardPile: [], exhaustPile: [], energy: 3, maxEnergy: 3, turn: 1,
    playerBlock: 0, enemyBlock: 0, playerStrength: 0, enemyStrength: 0,
    playerWeak: 0, enemyWeak: 0, playerVuln: 0, enemyVuln: 0,
    poison: 0, enemyPoison: 0, powers: [], over: false, result: null, log: []
  };
  for (let i = 0; i < 5; i++) drawCard();
  state = 'combat';
  render();
}

function drawCard() {
  if (combat.drawPile.length === 0) {
    if (combat.discardPile.length === 0) return;
    combat.drawPile = shuffle([...combat.discardPile]);
    combat.discardPile = [];
  }
  if (combat.hand.length < 12) combat.hand.push(combat.drawPile.pop());
}

function playCard(index) {
  const card = combat.hand[index];
  if (!card || card.cost > combat.energy || combat.over) return;
  combat.energy -= card.cost;
  combat.hand.splice(index, 1);
  combat.discardPile.push(card);
  
  if (card.type === 'attack') {
    let dmg = card.damage + combat.playerStrength;
    if (combat.enemyVuln > 0) dmg = Math.floor(dmg * 1.5);
    if (card.hits) {
      for (let h = 0; h < card.hits; h++) dealDamageToEnemy(dmg);
    } else {
      dealDamageToEnemy(dmg);
    }
  } else if (card.type === 'skill') {
    if (card.block) gainBlock(card.block);
    if (card.draw) for (let i = 0; i < card.draw; i++) drawCard();
    if (card.apply === 'vulnerable') combat.enemyVuln = Math.max(combat.enemyVuln, card.applyVal || 2);
    if (card.apply === 'weak') combat.enemyWeak = Math.max(combat.enemyWeak, card.applyVal || 2);
  } else if (card.type === 'power') {
    if (card.buff === 'strength') combat.playerStrength += card.amount || 2;
    combat.powers.push(card);
  }
  
  if (combat.enemy.hp <= 0) {
    combat.over = true;
    combat.result = 'victory';
    state = 'reward';
  }
  render();
}

function dealDamageToEnemy(dmg) {
  if (combat.enemyBlock > 0) {
    const blocked = Math.min(combat.enemyBlock, dmg);
    combat.enemyBlock -= blocked;
    dmg -= blocked;
  }
  combat.enemy.hp = Math.max(0, combat.enemy.hp - dmg);
}

function gainBlock(amount) {
  combat.playerBlock += amount;
}

function endTurn() {
  if (combat.over) return;
  // Enemy turn
  const enemy = combat.enemy;
  let intentVal = enemy.intentVal + combat.enemyStrength;
  if (combat.enemyWeak > 0) intentVal = Math.floor(intentVal * 0.75);
  
  if (enemy.intent === 'attack') {
    if (combat.playerBlock > 0) {
      const blocked = Math.min(combat.playerBlock, intentVal);
      combat.playerBlock -= blocked;
      intentVal -= blocked;
    }
    runData.hp = Math.max(0, runData.hp - intentVal);
  } else {
    combat.enemyBlock += enemy.intentVal;
  }
  
  // Status effects
  if (combat.poison > 0) { runData.hp -= combat.poison; combat.poison--; }
  if (combat.enemyPoison > 0) { combat.enemy.hp -= combat.enemyPoison; combat.enemyPoison--; }
  if (combat.enemyVuln > 0) combat.enemyVuln--;
  if (combat.enemyWeak > 0) combat.enemyWeak--;
  if (combat.playerVuln > 0) combat.playerVuln--;
  if (combat.playerWeak > 0) combat.playerWeak--;
  
  // Reset block
  combat.playerBlock = 0;
  combat.enemyBlock = 0;
  
  // Check player death
  if (runData.hp <= 0) {
    combat.over = true;
    combat.result = 'defeat';
    state = 'gameover';
    render();
    return;
  }
  
  // Next turn
  combat.turn++;
  combat.energy = combat.maxEnergy;
  for (let i = 0; i < 5; i++) drawCard();
  render();
}

function renderCombat() {
  if (!combat) return;
  const enemy = combat.enemy;
  
  // Background
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Enemy sprite
  const ex = canvas.width/2, ey = 150;
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
  ctx.fillText(enemy.name + (enemy.elite ? ' [ELITE]' : '') + (enemy.boss ? ' [BOSS]' : ''), ex, ey - 70);
  
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
  
  // Player area
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 16px Segoe UI';
  ctx.textAlign = 'left';
  ctx.fillText('HP: ' + runData.hp + '/' + runData.maxHp, 20, canvas.height - 40);
  ctx.fillText('Ouro: ' + runData.gold, 20, canvas.height - 15);
  ctx.fillStyle = '#fbbf24';
  ctx.textAlign = 'right';
  ctx.fillText('⚡ ' + combat.energy + '/' + combat.maxEnergy, canvas.width - 20, canvas.height - 40);
  ctx.fillStyle = '#64748b';
  ctx.fillText('Turno ' + combat.turn, canvas.width/2, canvas.height - 20);
  
  // Hand
  const handY = canvas.height - CARD_H - 20;
  const totalHandW = combat.hand.length * (CARD_W + 10) - 10;
  const handStartX = canvas.width/2 - totalHandW/2;
  
  combat.hand.forEach((card, i) => {
    const cx = handStartX + i * (CARD_W + 10);
    const canPlay = card.cost <= combat.energy && !combat.over;
    
    // Card art or background
    var artImg = canPlay ? getCardArt(card.id) : null;
    if (artImg && assetsLoaded) {
      ctx.drawImage(artImg, cx, handY, CARD_W, CARD_H);
      ctx.strokeStyle = canPlay ? '#fbbf24' : '#333';
      ctx.lineWidth = canPlay ? 2 : 1;
      ctx.strokeRect(cx, handY, CARD_W, CARD_H);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(cx, handY + CARD_H - 50, CARD_W, 50);
    } else {
      ctx.fillStyle = canPlay ? (card.color || '#2c3e50') : '#1a1a2e';
      ctx.strokeStyle = canPlay ? '#fbbf24' : '#333';
      ctx.lineWidth = canPlay ? 2 : 1;
      ctx.fillRect(cx, handY, CARD_W, CARD_H);
      ctx.strokeRect(cx, handY, CARD_W, CARD_H);
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
    ctx.fillText(card.desc, cx + CARD_W/2, handY + CARD_H - 30);
    
    // Clickable
    if (canPlay) {
      const btn = document.createElement('button');
      btn.style.cssText = 'position:absolute;left:'+cx+'px;top:'+handY+'px;width:'+CARD_W+'px;height:'+CARD_H+'px;background:transparent;border:none;cursor:pointer';
      btn.onclick = () => playCard(i);
      ui.appendChild(btn);
    }
  });
  
  // End turn button
  if (!combat.over) {
    const btn = document.createElement('button');
    btn.textContent = 'Fim do Turno';
    btn.style.cssText = 'position:absolute;right:20px;bottom:100px;padding:12px 24px;font-size:16px;font-weight:700;background:#e74c3c;color:#fff;border:none;border-radius:8px;cursor:pointer';
    btn.onclick = endTurn;
    ui.appendChild(btn);
  } else {
    // Result
    ctx.fillStyle = combat.result === 'victory' ? '#2ecc71' : '#e74c3c';
    ctx.font = 'bold 36px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(combat.result === 'victory' ? 'VITÓRIA!' : 'DERROTA', canvas.width/2, canvas.height/2);
    
    const btn = document.createElement('button');
    btn.textContent = combat.result === 'victory' ? 'Continuar' : 'Menu';
    btn.style.cssText = 'position:absolute;left:50%;top:60%;transform:translateX(-50%);padding:16px 32px;font-size:18px;font-weight:700;background:#2ecc71;color:#fff;border:none;border-radius:8px;cursor:pointer';
    btn.onclick = () => {
      if (combat.result === 'victory') {
        state = 'reward';
      } else {
        state = 'menu';
      }
      combat = null;
      render();
    };
    ui.appendChild(btn);
  }
}

// --- REWARD SYSTEM ---
function generateRewards() {
  const cardKeys = Object.keys(CARDS);
  for (let i = 0; i < 3; i++) {
    const key = cardKeys[Math.floor(Math.random() * cardKeys.length)];
    rewardCards.push({...CARDS[key]});
  }
}

function renderReward() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 28px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Recompensa!', canvas.width/2, 60);
  
  ctx.fillStyle = '#64748b';
  ctx.font = '16px Segoe UI';
  ctx.fillText('Escolhe uma carta para adicionar ao teu baralho', canvas.width/2, 90);
  
  // Show reward cards
  const cardW = 140, cardH = 200;
  const totalW = rewardCards.length * (cardW + 20) - 20;
  const startX = canvas.width/2 - totalW/2;
  
  rewardCards.forEach((card, i) => {
    const cx = startX + i * (cardW + 20);
    const cy = 120;
    
    ctx.fillStyle = card.color || '#2c3e50';
    ctx.fillRect(cx, cy, cardW, cardH);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, cy, cardW, cardH);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(card.name, cx + cardW/2, cy + 25);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px Segoe UI';
    ctx.fillText(card.cost + '⚡', cx + cardW/2, cy + 50);
    ctx.fillStyle = '#ddd';
    ctx.font = '11px Segoe UI';
    ctx.fillText(card.desc, cx + cardW/2, cy + cardH - 30);
    
    const btn = document.createElement('button');
    btn.style.cssText = 'position:absolute;left:'+cx+'px;top:'+cy+'px;width:'+cardW+'px;height:'+cardH+'px;background:transparent;border:none;cursor:pointer';
    btn.onclick = () => {
      runData.deck.push({...card});
      advanceMap();
    };
    ui.appendChild(btn);
  });
  
  // Skip button
  const skipBtn = document.createElement('button');
  skipBtn.textContent = 'Saltar';
  skipBtn.style.cssText = 'position:absolute;bottom:40px;left:50%;transform:translateX(-50%);padding:12px 24px;font-size:14px;background:#333;color:#fff;border:none;border-radius:8px;cursor:pointer';
  skipBtn.onclick = advanceMap;
  ui.appendChild(skipBtn);
}

// --- SHOP SYSTEM ---
let shopCards = [];

function generateShop() {
  shopCards = [];
  const cardKeys = Object.keys(CARDS);
  for (let i = 0; i < 5; i++) {
    const key = cardKeys[Math.floor(Math.random() * cardKeys.length)];
    shopCards.push({...CARDS[key], price: 10 + Math.floor(Math.random() * 20)});
  }
}

function renderShop() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 28px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Loja', canvas.width/2, 50);
  ctx.fillStyle = '#64748b';
  ctx.font = '16px Segoe UI';
  ctx.fillText('Ouro: ' + runData.gold, canvas.width/2, 80);
  
  const cardW = 140, cardH = 200;
  const totalW = shopCards.length * (cardW + 15) - 15;
  const startX = canvas.width/2 - totalW/2;
  
  shopCards.forEach((card, i) => {
    const cx = startX + i * (cardW + 15);
    const cy = 100;
    
    ctx.fillStyle = card.color || '#2c3e50';
    ctx.fillRect(cx, cy, cardW, cardH);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, cy, cardW, cardH);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(card.name, cx + cardW/2, cy + 25);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px Segoe UI';
    ctx.fillText(card.cost + '⚡', cx + cardW/2, cy + 45);
    ctx.fillStyle = '#ddd';
    ctx.font = '10px Segoe UI';
    ctx.fillText(card.desc, cx + cardW/2, cy + cardH - 30);
    ctx.fillStyle = '#2ecc71';
    ctx.font = 'bold 14px Segoe UI';
    ctx.fillText(card.price + 'g', cx + cardW/2, cy + cardH - 10);
    
    const btn = document.createElement('button');
    btn.style.cssText = 'position:absolute;left:'+cx+'px;top:'+cy+'px;width:'+cardW+'px;height:'+cardH+'px;background:transparent;border:none;cursor:pointer';
    btn.onclick = () => {
      if (runData.gold >= card.price) {
        runData.gold -= card.price;
        runData.deck.push({...card});
        shopCards.splice(i, 1);
        render();
      }
    };
    ui.appendChild(btn);
  });
  
  // Leave button
  const leaveBtn = document.createElement('button');
  leaveBtn.textContent = 'Sair';
  leaveBtn.style.cssText = 'position:absolute;bottom:40px;right:20px;padding:12px 24px;font-size:14px;background:#e74c3c;color:#fff;border:none;border-radius:8px;cursor:pointer';
  leaveBtn.onclick = advanceMap;
  ui.appendChild(leaveBtn);
}

// --- REST SYSTEM ---
function renderRest() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#1abc9c';
  ctx.font = 'bold 28px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Local de Descanso', canvas.width/2, 60);
  
  ctx.fillStyle = '#64748b';
  ctx.font = '16px Segoe UI';
  ctx.fillText('HP: ' + runData.hp + '/' + runData.maxHp, canvas.width/2, 100);
  
  // Rest button
  const restBtn = document.createElement('button');
  restBtn.textContent = 'Descansar (+30% HP)';
  restBtn.style.cssText = 'position:absolute;left:50%;top:40%;transform:translateX(-50%);padding:16px 32px;font-size:18px;font-weight:700;background:#1abc9c;color:#fff;border:none;border-radius:8px;cursor:pointer';
  restBtn.onclick = () => {
    const healAmt = Math.floor(runData.maxHp * 0.3);
    runData.hp = Math.min(runData.maxHp, runData.hp + healAmt);
    advanceMap();
  };
  ui.appendChild(restBtn);
  
  // Upgrade button
  const upBtn = document.createElement('button');
  upBtn.textContent = 'Melhorar Carta (Grátis)';
  upBtn.style.cssText = 'position:absolute;left:50%;top:55%;transform:translateX(-50%);padding:14px 28px;font-size:16px;font-weight:700;background:#9b59b6;color:#fff;border:none;border-radius:8px;cursor:pointer';
  upBtn.onclick = () => {
    const attacks = runData.deck.filter(c => c.type === 'attack');
    if (attacks.length > 0) {
      const card = attacks[0];
      card.damage += 2;
      card.name += '+';
      advanceMap();
    }
  };
  ui.appendChild(upBtn);
}

// --- GAME OVER / VICTORY ---
function renderGameOver() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#e74c3c';
  ctx.font = 'bold 48px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('DERROTA', canvas.width/2, canvas.height/2 - 20);
  ctx.fillStyle = '#64748b';
  ctx.font = '18px Segoe UI';
  ctx.fillText('Andar atingido: ' + runData.floor, canvas.width/2, canvas.height/2 + 30);
  
  const btn = document.createElement('button');
  btn.textContent = 'Menu Principal';
  btn.style.cssText = 'position:absolute;left:50%;top:65%;transform:translateX(-50%);padding:16px 32px;font-size:18px;font-weight:700;background:#333;color:#fff;border:none;border-radius:8px;cursor:pointer';
  btn.onclick = () => { state = 'menu'; combat = null; render(); };
  ui.appendChild(btn);
}

function renderVictory() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 48px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('VITÓRIA!', canvas.width/2, canvas.height/2 - 20);
  ctx.fillStyle = '#64748b';
  ctx.font = '18px Segoe UI';
  ctx.fillText('Completaste os 3 andares!', canvas.width/2, canvas.height/2 + 30);
  
  const btn = document.createElement('button');
  btn.textContent = 'Jogar Novamente';
  btn.style.cssText = 'position:absolute;left:50%;top:65%;transform:translateX(-50%);padding:16px 32px;font-size:18px;font-weight:700;background:#fbbf24;color:#0b0f19;border:none;border-radius:8px;cursor:pointer';
  btn.onclick = () => { state = 'menu'; combat = null; render(); };
  ui.appendChild(btn);
}

// --- EVENT SYSTEM ---
function renderEvent() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#3498db';
  ctx.font = 'bold 28px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Evento!', canvas.width/2, 60);
  
  ctx.fillStyle = '#f1f5f9';
  ctx.font = '18px Segoe UI';
  ctx.fillText('Encontraste um evento misterioso...', canvas.width/2, 120);
  
  const btn = document.createElement('button');
  btn.textContent = 'Continuar';
  btn.style.cssText = 'position:absolute;left:50%;top:50%;transform:translateX(-50%);padding:16px 32px;font-size:18px;font-weight:700;background:#3498db;color:#fff;border:none;border-radius:8px;cursor:pointer';
  btn.onclick = advanceMap;
  ui.appendChild(btn);
}

// --- UTILITY ---
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function advanceMap() {
  if (runData.floor >= 3) {
    state = 'victory';
  } else {
    runData.floor++;
    runData.path = generateMap();
    state = 'map';
  }
  render();
}

function addLog(msg) {
  if (combat) combat.log.push(msg);
}

// --- ENTER NODE ---
function enterNode(node, index) {
  const typeMap = { combat: ['skeleton','bat','slime','goblin','spider','orc','imp','mushroom','knight','wraith'], elite: ['dark_paladin','twin_assassins','golem','vampire'], boss: ['lich','dragon','void_entity'] };
  
  if (node.type === 'combat' || node.type === 'elite' || node.type === 'boss') {
    const pool = typeMap[node.type];
    startCombat(pool[Math.floor(Math.random() * pool.length)]);
  } else if (node.type === 'rest') {
    state = 'rest';
    render();
  } else if (node.type === 'shop') {
    generateShop();
    state = 'shop';
    render();
  } else if (node.type === 'event') {
    state = 'event';
    render();
  }
}

// --- RENDER DISPATCH ---
function render() {
  if (ui) ui.innerHTML = '';
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  switch(state) {
    case 'menu': renderMenu(); break;
    case 'map': renderMap(); break;
    case 'combat': renderCombat(); break;
    case 'reward': renderReward(); break;
    case 'shop': renderShop(); break;
    case 'rest': renderRest(); break;
    case 'event': renderEvent(); break;
    case 'gameover': renderGameOver(); break;
    case 'victory': renderVictory(); break;
  }
}

window.addEventListener('resize', resize);
