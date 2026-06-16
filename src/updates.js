// Arcana Eternal — Game Updates & New Features
// This file adds: relics system, expanded enemies, better map generation

// --- RELICS SYSTEM ---
const RELIC_DB = {
  arcane_crystal: { id: 'arcane_crystal', name: 'Cristal Arcano', desc: '+1 mana por turno', effect: { type: 'mana_per_turn', value: 1 }},
  warrior_crest: { id: 'warrior_crest', name: 'Cristal do Guerreiro', desc: '+2 de força', effect: { type: 'strength', value: 2 }},
  mana_potion: { id: 'mana_potion', name: 'Poção de Mana', desc: '+1 mana por turno', effect: { type: 'mana_per_turn', value: 1 }},
  berserker_axe: { id: 'berserker_axe', name: 'Machado do Berserker', desc: '+25% dano, +25% dano recebido', effect: { type: 'damage_amp', value: 0.25 }},
  thieves_gloves: { id: 'thieves_gloves', name: 'Luvas do Ladrao', desc: '+3 ouro por combate', effect: { type: 'gold_per_combat', value: 3 }},
  vampire_fang: { id: 'vampire_fang', name: 'Presa de Vampire', desc: 'Cura 2HP ao causar dano', effect: { type: 'lifesteal', value: 2 }},
  phoenix_feather: { id: 'phoenix_feather', name: 'Pena de Fenix', desc: 'Revive uma vez por run', effect: { type: 'revive', value: 1 }},
  crystal_heart: { id: 'crystal_heart', name: 'Coração de Cristal', desc: 'Dobra a cura', effect: { type: 'heal_amp', value: 2 }},
  time_crystal: { id: 'time_crystal', name: 'Cristal do Tempo', desc: 'Turno extra uma vez por combate', effect: { type: 'extra_turn', value: 1 }},
  void_stone: { id: 'void_stone', name: 'Pedra do Vazio', desc: 'Cartas custam 0, nao compra cartas', effect: { type: 'zero_cost', value: true }},
};

// --- EXPANDED ENEMY DATABASE ---
const ENEMY_DB = {
  // Act 1 - Forest (weakest)
  goblin: { name: 'Goblin', hp: 14, str: 0, intents: [{t:'attack',v:6},{t:'buff',str:2}], color: '#2ecc71' },
  slime: { name: 'Slime', hp: 22, str: 0, intents: [{t:'attack',v:4,effect:'poison',ev:2},{t:'split'}], color: '#3498db' },
  bat: { name: 'Morcego', hp: 10, str: 0, intents: [{t:'attack',v:5},{t:'summon',ally:'bat'}], color: '#8e44ad' },
  spider: { name: 'Aranha', hp: 16, str: 0, intents: [{t:'attack',v:5,effect:'poison',ev:2},{t:'debuff',weak:2}], color: '#2c3e50' },
  wolf: { name: 'Lobo', hp: 18, str: 0, intents: [{t:'attack',v:7},{t:'buff',str:1}], color: '#7f8c8d' },
  mushroom: { name: 'Cogumelo', hp: 30, str: 0, intents: [{t:'attack',v:3,effect:'poison',ev:3},{t:'heal',v:5},{t:'debuff',vuln:2}], color: '#e74c3c' },
  
  // Act 2 - Desert/Ruins
  orc: { name: 'Orc', hp: 28, str: 0, intents: [{t:'attack',v:9},{t:'buff',str:3}], color: '#d35400' },
  harpy: { name: 'Harpia', hp: 20, str: 0, intents: [{t:'attack',v:6},{t:'deny_draw',v:1}], color: '#9b59b6' },
  ghost: { name: 'Fantasma', hp: 22, str: 0, intents: [{t:'attack',v:5,effect:'grave',ev:1},{t:'untouchable',v:1}], color: '#bdc3c7' },
  fire_elemental: { name: 'Elemental de Fogo', hp: 28, str: 0, intents: [{t:'attack',v:8,effect:'burn',ev:2},{t:'aoe',v:3,hits:3}], color: '#e74c3c' },
  bandit: { name: 'Bandido', hp: 22, str: 0, intents: [{t:'attack',v:6},{t:'steal_gold',v:5}], color: '#f39c12' },
  treant: { name: 'Arvore-Abencoada', hp: 35, str: 0, intents: [{t:'attack',v:10},{t:'heal',v:5},{t:'debuff',weak:1}], color: '#27ae60' },
  merman: { name: 'Tritao', hp: 25, str: 0, intents: [{t:'attack',v:8},{t:'aoe',v:6}], color: '#16a085' },
  
  // Act 3 - Castle/Netherworld
  dark_knight: { name: 'Cavaleiro Negro', hp: 55, str: 0, intents: [{t:'attack',v:15},{t:'block',v:12},{t:'debuff',vuln:2}], color: '#2c3e50' },
  dark_mage: { name: 'Mago Negro', hp: 35, str: 0, intents: [{t:'attack',v:12,effect:'burn',ev:3},{t:'debuff',weak:3},{t:'heal',v:8}], color: '#8e44ad' },
  golem: { name: 'Golem', hp: 50, str: 0, intents: [{t:'attack',v:14},{t:'block',v:16},{t:'debuff',vuln:1}], color: '#95a5a6' },
  
  // ELITES
  twin_assassins: { name: 'Assassinos Gemeos', hp: 65, str: 0, intents: [{t:'attack',v:8,hits:2},{t:'debuff',weak:2},{t:'untouchable',v:1}], color: '#c0392b', elite: true },
  dark_paladin: { name: 'Paladino Negro', hp: 80, str: 0, intents: [{t:'attack',v:18},{t:'block',v:15},{t:'heal',v:10}], color: '#34495e', elite: true },
  void_entity: { name: 'Entidade do Vazio', hp: 90, str: 0, intents: [{t:'attack',v:20,effect:'vuln',ev:3},{t:'aoe',v:8,hits:2},{t:'buff',str:4}], color: '#1abc9c', elite: true },
  
  // BOSSES
  lich: { name: 'Lich Rei', hp: 120, str: 0, intents: [{t:'attack',v:18,effect:'grave',ev:2},{t:'summon',ally:'skeleton'},{t:'aoe',v:8}], color: '#8e44ad', boss: true, phases: 2 },
  dragon: { name: 'Dragao Vermelho', hp: 150, str: 0, intents: [{t:'attack',v:22,effect:'burn',ev:3},{t:'aoe',v:12,hits:2},{t:'buff',str:5}], color: '#e74c3c', boss: true, phases: 2 },
  demon: { name: 'Senhor Demonio', hp: 180, str: 0, intents: [{t:'attack',v:28,effect:'vuln',ev:3},{t:'aoe',v:15,hits:2},{t:'heal',v:25},{t:'buff',str:6}], color: '#c0392b', boss: true, phases: 2 },
};

// --- MAP GENERATION ---
function generateMap() {
  const path = [];
  const length = 12 + Math.floor(Math.random() * 5); // 12-16 nodes
  
  // Always start with combat
  path.push({ type: 'combat', enemy: getRandomEnemy('act1') });
  
  for (let i = 1; i < length - 1; i++) {
    const rand = Math.random();
    if (rand < 0.45) {
      path.push({ type: 'combat', enemy: getRandomEnemy('act1') });
    } else if (rand < 0.65) {
      path.push({ type: 'elite', enemy: getRandomEnemy('elite') });
    } else if (rand < 0.80) {
      path.push({ type: 'event' });
    } else if (rand < 0.90) {
      path.push({ type: 'shop' });
    } else {
      path.push({ type: 'rest' });
    }
  }
  
  // Always end with boss
  path.push({ type: 'boss', enemy: getRandomEnemy('boss') });
  
  return path;
}

function getRandomEnemy(type) {
  const keys = Object.keys(ENEMY_DB).filter(k => {
    const e = ENEMY_DB[k];
    if (type === 'elite') return e.elite;
    if (type === 'boss') return e.boss;
    if (type === 'act1') return !e.elite && !e.boss;
    return true;
  });
  return keys[Math.floor(Math.random() * keys.length)];
}

// --- COMBAT SYSTEM ---
function startCombat(enemyKey) {
  const template = ENEMY_DB[enemyKey];
  if (!template) return;
  
  combat = {
    enemy: { ...template, hp: template.hp, maxHp: template.hp },
    enemyKey,
    turn: 0,
    energy: ENERGY_MAX,
    maxEnergy: ENERGY_MAX,
    playerBlock: 0,
    enemyBlock: 0,
    playerStrength: 0,
    enemyStrength: 0,
    playerWeak: 0,
    enemyWeak: 0,
    playerVuln: 0,
    enemyVuln: 0,
    enemyPoison: 0,
    hand: [],
    drawPile: [...runData.deck],
    discardPile: [],
    result: null,
  };
  
  shuffle(combat.drawPile);
  for (let i = 0; i < DRAW_PER_TURN; i++) drawCard();
  updateEnemyIntent();
  state = 'combat';
  render();
}

function drawCard() {
  if (combat.drawPile.length === 0) {
    if (combat.discardPile.length === 0) return;
    combat.drawPile = [...combat.discardPile];
    combat.discardPile = [];
    shuffle(combat.drawPile);
  }
  if (combat.hand.length < 10) {
    combat.hand.push(combat.drawPile.pop());
  }
}

function playCard(index) {
  const card = combat.hand[index];
  if (!card || combat.energy < card.cost) return;
  
  combat.energy -= card.cost;
  combat.hand.splice(index, 1);
  combat.discardPile.push(card);
  
  // Apply card effects
  if (card.type === 'attack') {
    let dmg = card.damage + combat.playerStrength;
    if (combat.playerWeak > 0) dmg = Math.floor(dmg * 0.75);
    if (combat.enemyVuln > 0) dmg = Math.floor(dmg * 1.5);
    
    const hits = card.hits || 1;
    for (let h = 0; h < hits; h++) {
      dealDamageToEnemy(dmg);
    }
    sfxCardPlay();
    spawnParticles(canvas.width/2, 150, '#e74c3c', 12);
  } else if (card.type === 'skill') {
    if (card.block) {
      combat.playerBlock += card.block;
      sfxBlock();
    }
    if (card.draw) {
      for (let i = 0; i < card.draw; i++) drawCard();
    }
    if (card.apply === 'vulnerable') combat.enemyVuln = card.applyVal || 2;
    if (card.apply === 'weak') combat.enemyWeak = card.applyVal || 2;
    if (card.heal) {
      runData.hp = Math.min(runData.maxHp, runData.hp + card.heal);
      sfxHeal();
    }
  }
  
  if (combat.enemy.hp <= 0) {
    endCombat(true);
    return;
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

function endCombat(victory) {
  combat.result = victory;
  if (victory) {
    sfxVictory();
    runData.gold += 15 + Math.floor(Math.random() * 20);
  } else {
    sfxDefeat();
  }
  render();
}
