// ============================================
// ARCANA ETERNAL — Card Database (63 cards)
// ============================================

const CARD_DB = {
  // ===== WARRIOR (W) - 10 cards =====
  W01_strike: { id:'W01_strike', name:'Golpe Rápido', type:'attack', cost:1, damage:6, desc:'Causa 6 de dano.', color:'#e74c3c', rarity:'common', art:'W01_strike', job:'Warrior' },
  W02_defend: { id:'W02_defend', name:'Defender', type:'skill', cost:1, block:8, desc:'Ganha 8 de escudo.', color:'#2ecc71', rarity:'common', art:'W02_defend', job:'Warrior' },
  W03_heavy_blow: { id:'W03_heavy_blow', name:'Golpe Pesado', type:'attack', cost:2, damage:14, desc:'Causa 14 de dano.', color:'#c0392b', rarity:'common', art:'W03_heavy_blow', job:'Warrior' },
  W04_shield_bash: { id:'W04_shield_bash', name:'Escudo Bate', type:'attack', cost:1, damage:6, block:4, desc:'Causa 6. Ganha 4 escudo.', color:'#e67e22', rarity:'common', art:'W04_shield_bash', job:'Warrior' },
  W05_battle_cry: { id:'W05_battle_cry', name:'Grito de Guerra', type:'skill', cost:1, draw:2, desc:'Compra 2 cartas.', color:'#f39c12', rarity:'uncommon', art:'W05_battle_cry', job:'Warrior' },
  W06_whirlwind: { id:'W06_whirlwind', name:'Furacão', type:'attack', cost:2, damage:5, hits:3, desc:'Causa 5 de dano 3x.', color:'#d35400', rarity:'uncommon', art:'W07_whirlwind', job:'Warrior' },
  W07_earthquake: { id:'W07_earthquake', name:'Terramoto', type:'attack', cost:3, damage:20, desc:'Causa 20 de dano.', color:'#8e44ad', rarity:'rare', art:'W08_earthquake', job:'Warrior' },
  W08_titans_wrath: { id:'W08_titans_wrath', name:'Fúria do Titã', type:'attack', cost:4, damage:35, desc:'Causa 35 de dano devastador.', color:'#fbbf24', rarity:'legendary', art:'W10_titans_wrath', job:'Warrior' },
  W09_pommel_strike: { id:'W09_pommel_strike', name:'Golpe de Punho', type:'attack', cost:0, damage:4, draw:1, desc:'Causa 4. Compra 1.', color:'#95a5a6', rarity:'common', art:'W01_strike', job:'Warrior' },
  W10_shield_wall: { id:'W10_shield_wall', name:'Muralha de Escudos', type:'skill', cost:2, block:16, desc:'Ganha 16 de escudo.', color:'#27ae60', rarity:'rare', art:'W04_shield_bash', job:'Warrior' },

  // ===== BLACK MAGE (BM) - 10 cards =====
  BM01_fireball: { id:'BM01_fireball', name:'Bola de Fogo', type:'attack', cost:1, damage:8, desc:'Causa 8 de dano.', color:'#e74c3c', rarity:'common', art:'BM01_fireball', job:'Black Mage' },
  BM02_ice_shard: { id:'BM02_ice_shard', name:'Estilhaço de Gelo', type:'attack', cost:1, damage:6, apply:'vulnerable', applyVal:2, desc:'Causa 6. Aplica 2 Vulnerável.', color:'#3498db', rarity:'common', art:'BM02_ice_shard', job:'Black Mage' },
  BM03_thunder_bolt: { id:'BM03_thunder_bolt', name:'Raio', type:'attack', cost:1, damage:7, draw:1, desc:'Causa 7 de dano. Compra 1.', color:'#f1c40f', rarity:'common', art:'BM03_thunder_bolt', job:'Black Mage' },
  BM04_arcane_missile: { id:'BM04_arcane_missile', name:'Mísseis Arcano', type:'attack', cost:0, damage:3, hits:2, desc:'Causa 3 de dano 2x.', color:'#9b59b6', rarity:'common', art:'BM04_arcane_missile', job:'Black Mage' },
  BM05_meditate: { id:'BM05_meditate', name:'Meditar', type:'skill', cost:1, draw:3, desc:'Compra 3 cartas.', color:'#1abc9c', rarity:'uncommon', art:'BM05_meditate', job:'Black Mage' },
  BM06_blizzard: { id:'BM06_blizzard', name:'Nevasca', type:'attack', cost:2, damage:6, hits:3, desc:'Causa 6 de dano 3x.', color:'#2980b9', rarity:'uncommon', art:'BM06_blizzard', job:'Black Mage' },
  BM07_meteor: { id:'BM07_meteor', name:'Meteoro', type:'attack', cost:3, damage:22, desc:'Causa 22 de dano.', color:'#e67e22', rarity:'rare', art:'BM07_meteor', job:'Black Mage' },
  BM08_mana_surge: { id:'BM08_mana_surge', name:'Onda de Mana', type:'skill', cost:2, energy:2, desc:'Ganha 2 de energia.', color:'#8e44ad', rarity:'rare', art:'BM08_mana_surge', job:'Black Mage' },
  BM09_flame_shield: { id:'BM09_flame_shield', name:'Escudo de Chamas', type:'skill', cost:1, block:6, damage:4, desc:'Ganha 6 escudo. Causa 4 dano.', color:'#d35400', rarity:'uncommon', art:'BM01_fireball', job:'Black Mage' },
  BM10_ultima: { id:'BM10_ultima', name:'Ultima', type:'attack', cost:5, damage:40, desc:'Causa 40 de dano devastador.', color:'#fbbf24', rarity:'legendary', art:'BM10_ultima', job:'Black Mage' },

  // ===== THIEF (T) - 10 cards =====
  T01_quick_stab: { id:'T01_quick_stab', name:'Estocada Rápida', type:'attack', cost:0, damage:4, draw:1, desc:'Causa 4. Compra 1.', color:'#2ecc71', rarity:'common', art:'T01_quick_stab', job:'Thief' },
  T02_smoke_bomb: { id:'T02_smoke_bomb', name:'Bomba de Fumaça', type:'skill', cost:1, block:6, draw:1, desc:'Ganha 6 escudo. Compra 1.', color:'#95a5a6', rarity:'common', art:'T02_smoke_bomb', job:'Thief' },
  T03_backstab: { id:'T03_backstab', name:'Traição', type:'attack', cost:2, damage:18, desc:'Causa 18 de dano.', color:'#2c3e50', rarity:'common', art:'T03_backstab', job:'Thief' },
  T04_poison_blade: { id:'T04_poison_blade', name:'Lâmina Envenenada', type:'attack', cost:1, damage:5, apply:'poison', applyVal:3, desc:'Causa 5. Aplica 3 Veneno.', color:'#27ae60', rarity:'uncommon', art:'T01_quick_stab', job:'Thief' },
  T05_dagger_throw: { id:'T05_dagger_throw', name:'Arremesso de Adaga', type:'attack', cost:1, damage:4, hits:2, desc:'Causa 4 de dano 2x.', color:'#16a085', rarity:'common', art:'T05_dagger_throw', job:'Thief' },
  T06_shadow_step: { id:'T06_shadow_step', name:'Passo Sombrio', type:'skill', cost:1, block:8, energy:1, desc:'Ganha 8 escudo. +1 energia.', color:'#34495e', rarity:'uncommon', art:'T06_shadow_step', job:'Thief' },
  T07_assassinate: { id:'T07_assassinate', name:'Assassinar', type:'attack', cost:3, damage:25, desc:'Causa 25 de dano.', color:'#c0392b', rarity:'rare', art:'T07_assassinate', job:'Thief' },
  T08_wind_dash: { id:'T08_wind_dash', name:'Rajada de Vento', type:'attack', cost:2, damage:10, draw:2, desc:'Causa 10. Compra 2.', color:'#1abc9c', rarity:'rare', art:'T08_wind_dash', job:'Thief' },
  T09_trap_card: { id:'T09_trap_card', name:'Carta Armadilha', type:'skill', cost:0, block:12, desc:'Ganha 12 de escudo.', color:'#7f8c8d', rarity:'uncommon', art:'T02_smoke_bomb', job:'Thief' },
  T10_eternal_night: { id:'T10_eternal_night', name:'Noite Eterna', type:'attack', cost:4, damage:15, hits:3, desc:'Causa 15 de dano 3x.', color:'#2c3e50', rarity:'legendary', art:'T10_eternal_night', job:'Thief' },

  // ===== WHITE MAGE (WM) - 8 cards =====
  WM01_holy_light: { id:'WM01_holy_light', name:'Luz Divina', type:'attack', cost:1, damage:5, heal:3, desc:'Causa 5 de dano. Cura 3 HP.', color:'#f1c40f', rarity:'common', art:'WM01_holy_light', job:'White Mage' },
  WM02_protect: { id:'WM02_protect', name:'Proteção', type:'skill', cost:1, block:6, heal:2, desc:'Ganha 6 escudo. Cura 2 HP.', color:'#2ecc71', rarity:'common', art:'WM02_protect', job:'White Mage' },
  WM03_cure: { id:'WM03_cure', name:'Cura', type:'skill', cost:2, heal:12, desc:'Cura 12 HP.', color:'#27ae60', rarity:'common', art:'WM03_cure', job:'White Mage' },
  WM04_smite: { id:'WM04_smite', name:'Castigo', type:'attack', cost:2, damage:10, heal:5, desc:'Causa 10. Cura 5 HP.', color:'#f39c12', rarity:'uncommon', art:'WM04_smite', job:'White Mage' },
  WM05_prayer: { id:'WM05_prayer', name:'Oração', type:'skill', cost:1, heal:8, draw:1, desc:'Cura 8 HP. Compra 1.', color:'#1abc9c', rarity:'uncommon', art:'WM05_prayer', job:'White Mage' },
  WM06_divine_shield: { id:'WM06_divine_shield', name:'Escudo Divino', type:'skill', cost:2, block:14, desc:'Ganha 14 de escudo.', color:'#fbbf24', rarity:'rare', art:'WM06_divine_shield', job:'White Mage' },
  WM07_holy: { id:'WM07_holy', name:'Sagrado', type:'attack', cost:3, damage:18, heal:8, desc:'Causa 18. Cura 8 HP.', color:'#d4ac0d', rarity:'rare', art:'WM07_holy', job:'White Mage' },
  WM08_resurrection: { id:'WM08_resurrection', name:'Ressurreição', type:'skill', cost:3, heal:25, desc:'Cura 25 HP.', color:'#fbbf24', rarity:'legendary', art:'WM08_resurrection', job:'White Mage' },

  // ===== DRAGOON (D) - 8 cards =====
  D01_thrust: { id:'D01_thrust', name:'Estocada', type:'attack', cost:1, damage:7, desc:'Causa 7 de dano.', color:'#e67e22', rarity:'common', art:'D01_thrust', job:'Dragoon' },
  D02_jump: { id:'D02_jump', name:'Salto', type:'skill', cost:1, block:5, energy:1, desc:'Ganha 5 escudo. +1 energia.', color:'#2980b9', rarity:'common', art:'D02_jump', job:'Dragoon' },
  D03_polearm_slash: { id:'D03_polearm_slash', name:'Corte de Alabarda', type:'attack', cost:2, damage:12, desc:'Causa 12 de dano.', color:'#d35400', rarity:'common', art:'D01_thrust', job:'Dragoon' },
  D04_dragon_dive: { id:'D04_dragon_dive', name:'Mergulho do Dragão', type:'attack', cost:3, damage:20, desc:'Causa 20 de dano.', color:'#c0392b', rarity:'uncommon', art:'D04_dragon_dive', job:'Dragoon' },
  D05_spear_mastery: { id:'D05_spear_mastery', name:'Maestria de Lança', type:'power', cost:2, perm:true, buff:'strength', amount:2, desc:'Permanente: +2 Força.', color:'#8e44ad', rarity:'rare', art:'D01_thrust', job:'Dragoon' },
  D06_impale: { id:'D06_impale', name:'Empalar', type:'attack', cost:2, damage:15, apply:'vulnerable', applyVal:3, desc:'Causa 15. Aplica 3 Vulnerável.', color:'#e74c3c', rarity:'uncommon', art:'D04_dragon_dive', job:'Dragoon' },
  D07_dragoon_oath: { id:'D07_dragoon_oath', name:'Juramento do Dragoon', type:'power', cost:1, perm:true, effect:'block_per_turn', amount:3, desc:'Permanente: +3 escudo/turno.', color:'#27ae60', rarity:'rare', art:'D02_jump', job:'Dragoon' },
  D08_skyfall_spear: { id:'D08_skyfall_spear', name:'Lança Celestial', type:'attack', cost:4, damage:30, desc:'Causa 30 de dano.', color:'#fbbf24', rarity:'legendary', art:'D04_dragon_dive', job:'Dragoon' },

  // ===== DARK KNIGHT (DK) - 8 cards =====
  DK01_soul_drain: { id:'DK01_soul_drain', name:'Drenar Alma', type:'attack', cost:1, damage:6, heal:3, desc:'Causa 6. Cura 3 HP.', color:'#8e44ad', rarity:'common', art:'DK01_soul_drain', job:'Dark Knight' },
  DK02_dark_slash: { id:'DK02_dark_slash', name:'Corte Sombrio', type:'attack', cost:2, damage:14, selfDamage:3, desc:'Causa 14. Perde 3 HP.', color:'#2c3e50', rarity:'common', art:'DK02_dark_slash', job:'Dark Knight' },
  DK03_blood_price: { id:'DK03_blood_price', name:'Preço de Sangue', type:'skill', cost:0, draw:3, selfDamage:5, desc:'Compra 3. Perde 5 HP.', color:'#c0392b', rarity:'uncommon', art:'DK03_blood_price', job:'Dark Knight' },
  DK04_shadow_strike: { id:'DK04_shadow_strike', name:'Golpe Sombrio', type:'attack', cost:1, damage:8, apply:'weak', applyVal:2, desc:'Causa 8. Aplica 2 Fraco.', color:'#34495e', rarity:'common', art:'DK01_soul_drain', job:'Dark Knight' },
  DK05_dark_armor: { id:'DK05_dark_armor', name:'Armadura Sombria', type:'skill', cost:2, block:10, selfDamage:3, desc:'Ganha 10 escudo. Perde 3 HP.', color:'#1a252f', rarity:'uncommon', art:'DK02_dark_slash', job:'Dark Knight' },
  DK06_soul_reaver: { id:'DK06_soul_reaver', name:'Ceifador de Almas', type:'attack', cost:3, damage:20, heal:10, desc:'Causa 20. Cura 10 HP.', color:'#6c3483', rarity:'rare', art:'DK01_soul_drain', job:'Dark Knight' },
  DK07_dark_pact: { id:'DK07_dark_pact', name:'Pacto Sombrio', type:'power', cost:2, perm:true, effect:'lifesteal', amount:5, desc:'Permanente: 50% roubo de vida.', color:'#4a235a', rarity:'rare', art:'DK03_blood_price', job:'Dark Knight' },
  DK08_abyssal_blade: { id:'DK08_abyssal_blade', name:'Lâmina Abissal', type:'attack', cost:4, damage:28, selfDamage:5, desc:'Causa 28. Perde 5 HP.', color:'#fbbf24', rarity:'legendary', art:'DK02_dark_slash', job:'Dark Knight' },

  // ===== BARD (B) - 9 cards =====
  B01_song_of_courage: { id:'B01_song_of_courage', name:'Canção de Coragem', type:'skill', cost:1, buff:'strength', amount:2, desc:'+2 Força até fim do combate.', color:'#f39c12', rarity:'common', art:'B01_song_of_courage', job:'Bard' },
  B02_lullaby: { id:'B02_lullaby', name:'Canção de Ninar', type:'skill', cost:1, apply:'weak', applyVal:3, desc:'Aplica 3 Fraco ao inimigo.', color:'#9b59b6', rarity:'common', art:'B02_lullaby', job:'Bard' },
  B03_melody_of_healing: { id:'B03_melody_of_healing', name:'Melodia de Cura', type:'skill', cost:1, heal:6, desc:'Cura 6 HP.', color:'#2ecc71', rarity:'common', art:'B03_melody_of_healing', job:'Bard' },
  B04_inspire: { id:'B04_inspire', name:'Inspirar', type:'skill', cost:1, draw:2, energy:1, desc:'Compra 2. +1 energia.', color:'#1abc9c', rarity:'uncommon', art:'B04_inspire', job:'Bard' },
  B05_battle_hymn: { id:'B05_battle_hymn', name:'Hino de Batalha', type:'skill', cost:2, buff:'strength', amount:3, desc:'+3 Força até fim do combate.', color:'#e67e22', rarity:'uncommon', art:'B06_battle_hymn', job:'Bard' },
  B06_sonic_boom: { id:'B06_sonic_boom', name:'Explosão Sônica', type:'attack', cost:2, damage:12, apply:'vulnerable', applyVal:2, desc:'Causa 12. Aplica 2 Vulnerável.', color:'#d35400', rarity:'uncommon', art:'B07_sonic_boom', job:'Bard' },
  B07_encore: { id:'B07_encore', name:'Bis', type:'skill', cost:0, copyLast:true, desc:'Repete a última carta jogada.', color:'#8e44ad', rarity:'rare', art:'B08_encore', job:'Bard' },
  B08_symphony: { id:'B08_symphony', name:'Sinfonia', type:'attack', cost:3, damage:8, hits:3, heal:5, desc:'Causa 8 x3. Cura 5 HP.', color:'#fbbf24', rarity:'legendary', art:'B09_symphony', job:'Bard' },
  B09_eternal_song: { id:'B09_eternal_song', name:'Canção Eterna', type:'power', cost:2, perm:true, effect:'draw_per_turn', amount:1, desc:'Permanente: compra 1 carta/turno.', color:'#d4ac0d', rarity:'legendary', art:'B10_eternal_song', job:'Bard' },
};

// ===== ENEMY DATABASE =====
const ENEMY_DB = {
  // Floor 1 - Normals
  skeleton: { name:'Esqueleto', hp:28, maxHp:28, dmg:6, sprite:'skeleton', intent:['attack','defend'] },
  slime: { name:'Slime', hp:35, maxHp:35, dmg:5, sprite:'slime', intent:['attack','attack'] },
  goblin: { name:'Goblin', hp:22, maxHp:22, dmg:7, sprite:'goblin', intent:['attack','buff'] },
  bat: { name:'Morcego', hp:18, maxHp:18, dmg:4, hits:2, sprite:'wolf', intent:['attack','attack'] },
  wolf: { name:'Lobo', hp:32, maxHp:32, dmg:8, sprite:'wolf', intent:['attack','attack'] },
  // Floor 2 - Normals +
  spider: { name:'Aranha', hp:40, maxHp:40, dmg:9, sprite:'spider', intent:['attack','poison'] },
  ghost: { name:'Fantasma', hp:30, maxHp:30, dmg:10, sprite:'ghost', intent:['attack','dodge'] },
  orc: { name:'Orc', hp:50, maxHp:50, dmg:11, sprite:'goblin', intent:['attack','buff'] },
  dark_mage: { name:'Mago Negro', hp:45, maxHp:45, dmg:12, sprite:'dark_mage', intent:['attack','debuff'] },
  // Elites
  golem: { name:'Golem de Pedra', hp:80, maxHp:80, dmg:14, sprite:'golem', intent:['attack','defend'], elite:true },
  dark_knight: { name:'Cav. Sombrio', hp:90, maxHp:90, dmg:16, sprite:'dark_knight', intent:['attack','lifesteal'], elite:true },
  // Bosses
  boss_dragon: { name:'Dragão Vermelho', hp:150, maxHp:150, dmg:20, sprite:'boss_dragon', intent:['attack','aoe','buff'], boss:true },
  boss_lich: { name:'Lich', hp:120, maxHp:120, dmg:18, sprite:'boss_lich', intent:['attack','summon','debuff'], boss:true },
  boss_demon: { name:'Demon Lord', hp:180, maxHp:180, dmg:25, sprite:'boss_demon', intent:['attack','aoe','lifesteal'], boss:true },
};

// ===== RELIC DATABASE =====
const RELIC_DB = {
  ring_of_strength: { name:'Anel de Força', desc:'+2 Strength permanente.', effect:'strength', value:2, rarity:'common' },
  amulet_of_vitality: { name:'Amuleto de Vitalidade', desc:'+15 HP máximo.', effect:'maxHp', value:15, rarity:'common' },
  boots_of_speed: { name:'Botas de Velocidade', desc:'+1 energia por turno.', effect:'energy', value:1, rarity:'uncommon' },
  ring_of_regen: { name:'Anel de Regeneração', desc:'Cura 3 HP por turno.', effect:'regen', value:3, rarity:'uncommon' },
  sword_of_fury: { name:'Espada da Fúria', desc:'+3 dano em ataques.', effect:'damage', value:3, rarity:'rare' },
  shield_of_light: { name:'Escudo de Luz', desc:'+5 escudo por turno.', effect:'block_per_turn', value:5, rarity:'rare' },
  orb_of_wisdom: { name:'Orbe da Sabedoria', desc:'Compra 1 carta extra por turno.', effect:'draw_per_turn', value:1, rarity:'rare' },
  crown_of_kings: { name:'Coroa dos Reis', desc:'+2 Strength, +10 HP, +1 energia.', effect:'multi', value:{str:2,hp:10,energy:1}, rarity:'legendary' },
};

// Export for use in game.js
if (typeof module !== 'undefined') {
  module.exports = { CARD_DB, ENEMY_DB, RELIC_DB };
}
