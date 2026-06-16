// Arcana Eternal — Extended Content Pack
// Add to game.js content

// --- EXPANDED CARD DATABASE ---
const CARD_DB = {
  // ATTACKS
  golpe_rapido: { id:'golpe_rapido', name:'Golpe Rapido', type:'attack', cost:1, damage:6, desc:'Causa 6 de dano.', color:'#e74c3c', rarity:'common' },
  espadada: { id:'espadada', name:'Espadada', type:'attack', cost:1, damage:8, desc:'Causa 8 de dano.', color:'#c0392b', rarity:'common' },
  investida: { id:'investida', name:'Investida', type:'attack', cost:2, damage:12, block:5, desc:'Causa 12. Ganha 5 escudo.', color:'#e67e22', rarity:'common' },
  golpe_brutal: { id:'golpe_brutal', name:'Golpe Brutal', type:'attack', cost:2, damage:18, desc:'Causa 18 de dano.', color:'#8e44ad', rarity:'uncommon' },
  corte_duplo: { id:'corte_duplo', name:'Corte Duplo', type:'attack', cost:1, damage:3, hits:2, desc:'Causa 3 de dano 2x.', color:'#2980b9', rarity:'common' },
  estocada: { id:'estocada', name:'Estocada', type:'attack', cost:0, damage:4, draw:1, desc:'Causa 4 de dano. Compra 1.', color:'#16a085', rarity:'common' },
  punho_ferro: { id:'punho_ferro', name:'Punho de Ferro', type:'attack', cost:1, damage:8, bonus:'block_damage', bonusVal:5, desc:'Causa 8. Se tiver escudo, +5 dano.', color:'#34495e', rarity:'common' },
  furia: { id:'furia', name:'Furia', type:'attack', cost:1, damage:5, bonus:'weak_damage', desc:'Causa 5. Se inimigo fraco, repete x2.', color:'#c0392b', rarity:'uncommon' },
  lamina_flamejante: { id:'lamina_flamejante', name:'Lamina Flamejante', type:'attack', cost:2, damage:10, apply:'vulnerable', applyVal:2, desc:'Causa 10. Aplica 2 vulnerable.', color:'#d35400', rarity:'uncommon' },
  golpe_sombrio: { id:'golpe_sombrio', name:'Golpe Sombrio', type:'attack', cost:2, damage:14, lifesteal:true, desc:'Causa 14. Cura metade do dano.', color:'#2c3e50', rarity:'rare' },
  celestial_smite: { id:'celestial_smite', name:'Golpe Celestial', type:'attack', cost:3, damage:25, desc:'Causa 25 de dano devastador.', color:'#f1c40f', rarity:'rare' },
  furia_gelo: { id:'furia_gelo', name:'Furia de Gelo', type:'attack', cost:2, damage:9, apply:'weak', applyVal:2, desc:'Causa 9. Aplica 2 weak.', color:'#3498db', rarity:'uncommon' },
  tempestade: { id:'tempestade', name:'Tempestade', type:'attack', cost:2, damage:7, hits:3, desc:'Causa 7 de dano 3x.', color:'#1abc9c', rarity:'rare' },
  executions_blade: { id:'execution_blade', name:'Lamina Executora', type:'attack', cost:3, damage:30, bonus:'low_hp_bonus', bonusVal:15, desc:'Causa 30. Se inimigo <30% HP, +15.', color:'#e74c3c', rarity:'rare' },
  
  // SKILLS
  escudo_reforcado: { id:'escudo_reforcado', name:'Escudo Reforcado', type:'skill', cost:1, block:8, desc:'Ganha 8 de escudo.', color:'#2ecc71', rarity:'common' },
  barreira_gelo: { id:'barreira_gelo', name:'Barreira de Gelo', type:'skill', cost:2, block:12, desc:'Ganha 12 de escudo.', color:'#3498db', rarity:'common' },
  foco: { id:'foco', name:'Foco', type:'skill', cost:1, draw:2, desc:'Compra 2 cartas.', color:'#9b59b6', rarity:'common' },
  preparacao: { id:'preparacao', name:'Preparacao', type:'skill', cost:1, buff:'strength', amount:3, desc:'Proximo ataque +50%.', color:'#f39c12', rarity:'common' },
  esquiva: { id:'esquiva', name:'Esquiva', type:'skill', cost:1, block:6, draw:1, desc:'Ganha 6 escudo. Compra 1.', color:'#1abc9c', rarity:'common' },
  abencao: { id:'abencao', name:'Abencao', type:'skill', cost:0, heal:4, desc:'Recupera 4 HP.', color:'#2ecc71', rarity:'common' },
  meditacao: { id:'meditacao', name:'Meditacao', type:'skill', cost:1, draw:1, energy:1, desc:'Compra 1. +1 energia proximo turno.', color:'#9b59b6', rarity:'uncommon' },
  barricada: { id:'barricada', name:'Barricada', type:'skill', cost:2, block:16, desc:'Ganha 16 de escudo.', color:'#2ecc71', rarity:'uncommon' },
  fe_intocavel: { id:'fe_intocavel', name:'Fe Intocavel', type:'skill', cost:2, block:10, draw:2, desc:'Ganha 10 escudo. Compra 2.', color:'#f1c40f', rarity:'rare' },
  golpe_refletivo: { id:'golpe_refletivo', name:'Golpe Refletivo', type:'skill', cost:1, block:5, damage:5, desc:'Ganha 5 escudo. Causa 5 dano.', color:'#16a085', rarity:'uncommon' },
  purificacao: { id:'purificacao', name:'Purificacao', type:'skill', cost:1, heal:8, draw:1, desc:'Cura 8 HP. Compra 1.', color:'#2ecc71', rarity:'rare' },
  raio_paralizante: { id:'raio_paralizante', name:'Raio Paralizante', type:'skill', cost:2, apply:'stun', applyVal:1, desc:'Atordoal inimigo por 1 turno.', color:'#f39c12', rarity:'rare' },
  
  // POWERS (permanent)
  forca_interior: { id:'forca_interior', name:'Forca Interior', type:'power', cost:2, perm:true, buff:'strength', amount:2, desc:'Permanente: +2 Strength.', color:'#d35400', rarity:'uncommon' },
  armadura_viva: { id:'armadura_viva', name:'Armadura Viva', type:'power', cost:2, perm:true, effect:'block_per_turn', amount:3, desc:'Permanente: +3 escudo por turno.', color:'#7f8c8d', rarity:'uncommon' },
  vortice_arcano: { id:'vortice_arcano', name:'Vortice Arcano', type:'power', cost:1, perm:true, effect:'zero_cost_damage', amount:2, desc:'Permanente: cartas 0 custam +2 dano.', color:'#8e44ad', rarity:'rare' },
  regeneracao: { id:'regeneracao', name:'Regeneracao', type:'power', cost:2, perm:true, effect:'regen', amount:3, desc:'Permanente: regenera 3 HP por turno.', color:'#2ecc71', rarity:'rare' },
  lamina_eco: { id:'lamina_eco', name:'Lamina Eco', type:'power', cost:2, perm:true, effect:'first_attack_double', desc:'Permanente: primeiro ataque 2x dano.', color:'#e74c3c', rarity:'rare' },
};

// --- EXPANDED ENEMIES ---
const ENEMY_DB = {
  // Floor 1 normals
  skeleton: { name:' Esqueleto', hp:30, maxHp:30, intent:'attack', intentVal:7, color:'#bdc3c7' },
  bat: { name:'Morcego Sombrio', hp:22, maxHp:22, intent:'attack', intentVal:5, hits:2, color:'#8e44ad' },
  slime: { name:'Slime', hp:40, maxHp:40, intent:'attack', intentVal:6, color:'#27ae60' },
  goblin: { name:'Goblin', hp:25, maxHp:25, intent:'attack', intentVal:8, debuff:'weak', color:'#e67e22' },
  spider: { name:'Aranha', hp:35, maxHp:35, intent:'attack', intentVal:7, poison:3, color:'#2c3e50' },
  // Floor 1 elites
  dark_paladin: { name:'Paladino Sombrio', hp:80, maxHp:80, intent:'attack', intentVal:14, heal:5, color:'#2c3e50', elite:true },
  twin_assassins: { name:'Assassinos Gemeos', hp:45, maxHp:45, intent:'attack', intentVal:8, hits:2, color:'#8e44ad', elite:true },
  
  // Floor 2 normals
  ghost: { name:'Fantasma', hp:35, maxHp:35, intent:'attack', intentVal:9, dodge:true, color:'#95a5a6' },
  orc: { name:'Orc Berserker', hp:50, maxHp:50, intent:'attack', intentVal:12, selfDamage:3, color:'#c0392b' },
  imp: { name:'Diabo', hp:28, maxHp:28, intent:'attack', intentVal:4, stealEnergy:1, color:'#e74c3c' },
  mushroom: { name:'Cogumelo', hp:55, maxHp:55, intent:'attack', intentVal:6, regen:5, color:'#e67e22' },
  knight: { name:'Cavaleiro', hp:60, maxHp:60, intent:'defend', intentVal:10, color:'#7f8c8d' },
  wraith: { name:'Espectro', hp:42, maxHp:42, intent:'attack', intentVal:11, lifesteal:0.5, color:'#8e44ad' },
  // Floor 2 elites
  golem: { name:'Golem', hp:100, maxHp:100, intent:'attack', intentVal:20, slow:true, color:'#7f8c8d', elite:true },
  vampire: { name:'Vampiro', hp:75, maxHp:75, intent:'attack', intentVal:16, lifesteal:0.3, color:'#c0392b', elite:true },
  
  // Floor 3 bosses
  lich: { name:'Rei Lich', hp:130, maxHp:130, intent:'attack', intentVal:16, summon:true, color:'#2c3e50', boss:true },
  dragon: { name:'Dragao Ancestral', hp:160, maxHp:160, intent:'attack', intentVal:22, color:'#c0392b', boss:true },
  void_entity: { name:'Entidade do Vazio', hp:120, maxHp:120, intent:'attack', intentVal:17, color:'#8e44ad', boss:true },
};

// --- SHOP SYSTEM ---
let shopCards = [];

function generateShop() {
  shopCards = [];
  const keys = Object.keys(CARD_DB);
  for (let i = 0; i < 5; i++) {
    const key = keys[Math.floor(Math.random() * keys.length)];
    shopCards.push({...CARD_DB[key], price: 10 + Math.floor(Math.random() * 20)});

}
}

function buyCard(index) {
  if (state !== 'shop') return;
  const card = shopCards[index];
  if (!card) return;
  if (runData.gold < card.price) { addLog('Ouro insuficiente!'); return; }
  runData.gold -= card.price;
  runData.deck.push({...card});
  addLog('Comprou ' + card.name + ' por ' + card.price + ' de ouro.');
  shopCards.splice(index, 1);
  render();
}

function sellCard(index) {
  if (state !== 'shop') return;
  const card = runData.deck[index];
  if (!card) return;
  const sellPrice = 5 + Math.floor(Math.random() * 10);
  runData.gold += sellPrice;
  runData.deck.splice(index, 1);
  addLog('Vendeu ' + card.name + ' por ' + sellPrice + ' de ouro.');
  render();
}

// --- REST SITE ---
function restHeal() {
  const healAmt = Math.floor(runData.maxHp * 0.3);
  runData.hp = Math.min(runData.maxHp, runData.hp + healAmt);
  addLog('Descansou. Curou ' + healAmt + ' HP.');
  advanceFromShop();
}

function restUpgrade() {
  // Upgrade a random card (simplified: just add +2 damage to first attack)
  const attacks = runData.deck.filter(c => c.type === 'attack');
  if (attacks.length === 0) { addLog('Sem cartas de ataque para melhorar.'); return; }
  const card = attacks[0];
  card.damage += 2;
  card.name += '+';
  addLog('Melhorou ' + card.name + '! Dano +2.');
  advanceFromShop();
}

function advanceFromShop() {
  state = 'map';
  advanceMap();
  render();
}

// --- SHOP RENDER ---
function renderShop() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 28px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('LOJA', canvas.width/2, 50);
  
  ctx.fillStyle = '#fbbf24';
  ctx.font = '18px Segoe UI';
  ctx.fillText('Ouro: ' + runData.gold + ' | HP: ' + runData.hp + '/' + runData.maxHp, canvas.width/2, 80);
  
  // Shop cards
  const cardW = 140, cardH = 190, gap = 20;
  const totalW = shopCards.length * (cardW + gap);
  const startX = canvas.width/2 - totalW/2;
  
  shopCards.forEach((card, i) => {
    const cx = startX + i * (cardW + gap);
    const cy = 140;
    
    ctx.fillStyle = card.color || '#333';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    roundRect(ctx, cx, cy, cardW, cardH, 8);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(card.name, cx + cardW/2, cy + 22);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 14px Segoe UI';
    ctx.fillText(card.price + ' gold', cx + cardW/2, cy + 45);
    
    const btn = document.createElement('button');
    btn.textContent = 'Comprar (' + card.price + 'g)';
    btn.style.cssText = 'position:absolute;left:' + (cx + cardW/2 - 55) + 'px;top:' + (cy + cardH + 10) + 'px;width:110px;padding:8px;font-size:13px;background:#2ecc71;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600';
    btn.onclick = () => buyCard(i);
    ui.appendChild(btn);
  });
  
  // Player deck
  ctx.fillStyle = '#64748b';
  ctx.font = '16px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Seu Baralho (' + runData.deck.length + ' cartas) — clique para vender', canvas.width/2, 400);
  
  const deckStartX = 40;
  runData.deck.slice(0, 20).forEach((card, i) => {
    const cx = deckStartX + (i % 10) * 80;
    const cy = 430 + Math.floor(i / 10) * 60;
    
    ctx.fillStyle = card.color || '#333';
    roundRect(ctx, cx, cy, 70, 50, 4);
    ctx.fill();
    
    ctx.fillStyle = '#fff';
    ctx.font = '9px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText(card.name.substring(0, 10), cx + 35, cy + 20);
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(card.cost + 'e', cx + 35, cy + 38);
    
    const sellBtn = document.createElement('button');
    sellBtn.textContent = 'Vender';
    sellBtn.style.cssText = 'position:absolute;left:' + cx + 'px;top:' + (cy + 52) + 'px;width:70px;padding:4px;font-size:10px;background:#e74c3c;color:white;border:none;border-radius:4px;cursor:pointer';
    sellBtn.onclick = () => sellCard(i);
    ui.appendChild(sellBtn);
  });
  
  // Rest/Upgrade buttons
  const healBtn = document.createElement('button');
  healBtn.textContent = 'Descansar (+30% HP)';
  healBtn.style.cssText = 'position:absolute;bottom:80px;left:50%;transform:translateX(-50%);padding:14px 32px;font-size:16px;background:#1abc9c;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700';
  healBtn.onclick = restHeal;
  ui.appendChild(healBtn);
  
  const upgradeBtn = document.createElement('button');
  upgradeBtn.textContent = 'Melhorar Carta (Gratis)';
  upgradeBtn.style.cssText = 'position:absolute;bottom:30px;left:50%;transform:translateX(-50%);padding:12px 28px;font-size:14px;background:#9b59b6;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600';
  upgradeBtn.onclick = restUpgrade;
  ui.appendChild(upgradeBtn);
}

// --- UPDATE render() to include shop ---
// Add to the switch statement in render():
// case 'shop': renderShop(); break;
// case 'rest': renderRest(); break;

function renderRest() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 32px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Local de Descanso', canvas.width/2, 100);
  
  ctx.fillStyle = '#64748b';
  ctx.font = '18px Segoe UI';
  ctx.fillText('HP: ' + runData.hp + '/' + runData.maxHp, canvas.width/2, 150);
  
  const healBtn = document.createElement('button');
  healBtn.textContent = 'Descansar (Curar 30% HP)';
  healBtn.style.cssText = 'position:absolute;top:40%;left:50%;transform:translateX(-50%);padding:16px 40px;font-size:18px;background:#1abc9c;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700';
  healBtn.onclick = restHeal;
  ui.appendChild(healBtn);
  
  const upgradeBtn = document.createElement('button');
  upgradeBtn.textContent = 'Melhorar uma Carta';
  upgradeBtn.style.cssText = 'position:absolute;top:52%;left:50%;transform:translateX(-50%);padding:14px 36px;font-size:16px;background:#9b59b6;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600';
  upgradeBtn.onclick = restUpgrade;
  ui.appendChild(upgradeBtn);
}

// Update node entry for shop and rest
function enterNode(node, index) {
  const typeMap = {
    combat: ['skeleton','bat','slime','spider','orc','mushroom','goblin','imp','knight','wraith'],
    elite: ['dark_paladin','twin_assassins','golem','vampire'],
    boss: ['lich','dragon','void_entity']
  };
  
  if (node.type === 'combat') {
    const pool = typeMap.combat;
    startCombat(pool[Math.floor(Math.random() * pool.length)]);
  } else if (node.type === 'elite') {
    const pool = typeMap.elite;
    startCombat(pool[Math.floor(Math.random() * pool.length)]);
  } else if (node.type === 'boss') {
    const pool = typeMap.boss;
    startCombat(pool[Math.floor(Math.random() * pool.length)]);
  } else if (node.type === 'rest') {
    state = 'rest';
    render();
  } else if (node.type === 'shop') {
    generateShop();
    state = 'shop';
    render();
  } else if (node.type === 'event') {
    const events = [
      { text:'Encontrou um tesouro escondido!', effect:()=>{runData.gold+=25;}},
      { text:'Uma fonte magica cura suas feridas.', effect:()=>{runData.hp=Math.min(runData.maxHp,runData.hp+15);}},
      { text:'Um mercador oferece um desconto.', effect:()=>{runData.gold+=10;}},
    ];
    const ev = events[Math.floor(Math.random()*events.length)];
    ev.effect();
    addLog(ev.text);
    advanceMap();
    render();
  }
}