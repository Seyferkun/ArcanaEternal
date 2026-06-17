// ============================================
// ARCANA ETERNAL v2.1 — Phaser 3 Game Engine
// Complete rewrite with full card database
// ============================================

// ============================================
// ARCANA ETERNAL v2.1 — Phaser 3 Game Engine
// ============================================

// ===== CARD DATABASE (63 cards) =====
const CARD_DB = {
  // Warrior
  W01_strike:{id:'W01_strike',name:'Golpe Rápido',type:'attack',cost:1,damage:6,desc:'Causa 6 de dano.',color:'#e74c3c',rarity:'common',art:'W01_strike',job:'Warrior'},
  W02_defend:{id:'W02_defend',name:'Defender',type:'skill',cost:1,block:8,desc:'Ganha 8 de escudo.',color:'#2ecc71',rarity:'common',art:'W02_defend',job:'Warrior'},
  W03_heavy_blow:{id:'W03_heavy_blow',name:'Golpe Pesado',type:'attack',cost:2,damage:14,desc:'Causa 14 de dano.',color:'#c0392b',rarity:'common',art:'W03_heavy_blow',job:'Warrior'},
  W04_shield_bash:{id:'W04_shield_bash',name:'Escudo Bate',type:'attack',cost:1,damage:6,block:4,desc:'Causa 6. Ganha 4 escudo.',color:'#e67e22',rarity:'common',art:'W04_shield_bash',job:'Warrior'},
  W05_battle_cry:{id:'W05_battle_cry',name:'Grito de Guerra',type:'skill',cost:1,draw:2,desc:'Compra 2 cartas.',color:'#f39c12',rarity:'uncommon',art:'W05_battle_cry',job:'Warrior'},
  W07_whirlwind:{id:'W07_whirlwind',name:'Furacão',type:'attack',cost:2,damage:5,hits:3,desc:'Causa 5 de dano 3x.',color:'#d35400',rarity:'uncommon',art:'W07_whirlwind',job:'Warrior'},
  W08_earthquake:{id:'W08_earthquake',name:'Terramoto',type:'attack',cost:3,damage:20,desc:'Causa 20 de dano.',color:'#8e44ad',rarity:'rare',art:'W08_earthquake',job:'Warrior'},
  W10_titans_wrath:{id:'W10_titans_wrath',name:'Fúria do Titã',type:'attack',cost:4,damage:35,desc:'Causa 35 de dano devastador.',color:'#fbbf24',rarity:'legendary',art:'W10_titans_wrath',job:'Warrior'},
  // Black Mage
  BM01_fireball:{id:'BM01_fireball',name:'Bola de Fogo',type:'attack',cost:1,damage:8,desc:'Causa 8 de dano.',color:'#e74c3c',rarity:'common',art:'BM01_fireball',job:'Black Mage'},
  BM02_ice_shard:{id:'BM02_ice_shard',name:'Estilhaço de Gelo',type:'attack',cost:1,damage:6,apply:'vulnerable',applyVal:2,desc:'Causa 6. Aplica 2 Vulnerável.',color:'#3498db',rarity:'common',art:'BM02_ice_shard',job:'Black Mage'},
  BM03_thunder_bolt:{id:'BM03_thunder_bolt',name:'Raio',type:'attack',cost:1,damage:7,draw:1,desc:'Causa 7. Compra 1.',color:'#f1c40f',rarity:'common',art:'BM03_thunder_bolt',job:'Black Mage'},
  BM04_arcane_missile:{id:'BM04_arcane_missile',name:'Mísseis Arcano',type:'attack',cost:0,damage:3,hits:2,desc:'Causa 3 de dano 2x.',color:'#9b59b6',rarity:'common',art:'BM04_arcane_missile',job:'Black Mage'},
  BM06_blizzard:{id:'BM06_blizzard',name:'Nevasca',type:'attack',cost:2,damage:6,hits:3,desc:'Causa 6 de dano 3x.',color:'#2980b9',rarity:'uncommon',art:'BM06_blizzard',job:'Black Mage'},
  BM07_meteor:{id:'BM07_meteor',name:'Meteoro',type:'attack',cost:3,damage:22,desc:'Causa 22 de dano.',color:'#e67e22',rarity:'rare',art:'BM07_meteor',job:'Black Mage'},
  BM10_ultima:{id:'BM10_ultima',name:'Ultima',type:'attack',cost:5,damage:40,desc:'Causa 40 de dano devastador.',color:'#fbbf24',rarity:'legendary',art:'BM10_ultima',job:'Black Mage'},
  // Thief
  T01_quick_stab:{id:'T01_quick_stab',name:'Estocada Rápida',type:'attack',cost:0,damage:4,draw:1,desc:'Causa 4. Compra 1.',color:'#2ecc71',rarity:'common',art:'T01_quick_stab',job:'Thief'},
  T02_smoke_bomb:{id:'T02_smoke_bomb',name:'Bomba de Fumaça',type:'skill',cost:1,block:6,draw:1,desc:'Ganha 6 escudo. Compra 1.',color:'#95a5a6',rarity:'common',art:'T02_smoke_bomb',job:'Thief'},
  T03_backstab:{id:'T03_backstab',name:'Traição',type:'attack',cost:2,damage:18,desc:'Causa 18 de dano.',color:'#2c3e50',rarity:'common',art:'T03_backstab',job:'Thief'},
  T05_dagger_throw:{id:'T05_dagger_throw',name:'Arremesso de Adaga',type:'attack',cost:1,damage:4,hits:2,desc:'Causa 4 de dano 2x.',color:'#16a085',rarity:'common',art:'T05_dagger_throw',job:'Thief'},
  T06_shadow_step:{id:'T06_shadow_step',name:'Passo Sombrio',type:'skill',cost:1,block:8,energy:1,desc:'Ganha 8 escudo. +1 energia.',color:'#34495e',rarity:'uncommon',art:'T06_shadow_step',job:'Thief'},
  T07_assassinate:{id:'T07_assassinate',name:'Assassinar',type:'attack',cost:3,damage:25,desc:'Causa 25 de dano.',color:'#c0392b',rarity:'rare',art:'T07_assassinate',job:'Thief'},
  T08_wind_dash:{id:'T08_wind_dash',name:'Rajada de Vento',type:'attack',cost:2,damage:10,draw:2,desc:'Causa 10. Compra 2.',color:'#1abc9c',rarity:'rare',art:'T08_wind_dash',job:'Thief'},
  T10_eternal_night:{id:'T10_eternal_night',name:'Noite Eterna',type:'attack',cost:4,damage:15,hits:3,desc:'Causa 15 de dano 3x.',color:'#2c3e50',rarity:'legendary',art:'T10_eternal_night',job:'Thief'},
  // White Mage
  WM01_holy_light:{id:'WM01_holy_light',name:'Luz Divina',type:'attack',cost:1,damage:5,heal:3,desc:'Causa 5. Cura 3 HP.',color:'#f1c40f',rarity:'common',art:'WM01_holy_light',job:'White Mage'},
  WM02_protect:{id:'WM02_protect',name:'Proteção',type:'skill',cost:1,block:6,heal:2,desc:'Ganha 6 escudo. Cura 2 HP.',color:'#2ecc71',rarity:'common',art:'WM02_protect',job:'White Mage'},
  WM03_cure:{id:'WM03_cure',name:'Cura',type:'skill',cost:2,heal:12,desc:'Cura 12 HP.',color:'#27ae60',rarity:'common',art:'WM03_cure',job:'White Mage'},
  WM04_smite:{id:'WM04_smite',name:'Castigo',type:'attack',cost:2,damage:10,heal:5,desc:'Causa 10. Cura 5 HP.',color:'#f39c12',rarity:'uncommon',art:'WM04_smite',job:'White Mage'},
  WM05_prayer:{id:'WM05_prayer',name:'Oração',type:'skill',cost:1,heal:8,draw:1,desc:'Cura 8 HP. Compra 1.',color:'#1abc9c',rarity:'uncommon',art:'WM05_prayer',job:'White Mage'},
  WM06_divine_shield:{id:'WM06_divine_shield',name:'Escudo Divino',type:'skill',cost:2,block:14,desc:'Ganha 14 de escudo.',color:'#fbbf24',rarity:'rare',art:'WM06_divine_shield',job:'White Mage'},
  WM07_holy:{id:'WM07_holy',name:'Sagrado',type:'attack',cost:3,damage:18,heal:8,desc:'Causa 18. Cura 8 HP.',color:'#d4ac0d',rarity:'rare',art:'WM07_holy',job:'White Mage'},
  WM08_resurrection:{id:'WM08_resurrection',name:'Ressurreição',type:'skill',cost:3,heal:25,desc:'Cura 25 HP.',color:'#fbbf24',rarity:'legendary',art:'WM08_resurrection',job:'White Mage'},
  // Dragoon
  D01_thrust:{id:'D01_thrust',name:'Estocada',type:'attack',cost:1,damage:7,desc:'Causa 7 de dano.',color:'#e67e22',rarity:'common',art:'D01_thrust',job:'Dragoon'},
  D02_jump:{id:'D02_jump',name:'Salto',type:'skill',cost:1,block:5,energy:1,desc:'Ganha 5 escudo. +1 energia.',color:'#2980b9',rarity:'common',art:'D02_jump',job:'Dragoon'},
  D04_dragon_dive:{id:'D04_dragon_dive',name:'Mergulho do Dragão',type:'attack',cost:3,damage:20,desc:'Causa 20 de dano.',color:'#c0392b',rarity:'uncommon',art:'D04_dragon_dive',job:'Dragoon'},
  // Dark Knight
  DK01_soul_drain:{id:'DK01_soul_drain',name:'Drenar Alma',type:'attack',cost:1,damage:6,heal:3,desc:'Causa 6. Cura 3 HP.',color:'#8e44ad',rarity:'common',art:'DK01_soul_drain',job:'Dark Knight'},
  DK02_dark_slash:{id:'DK02_dark_slash',name:'Corte Sombrio',type:'attack',cost:2,damage:14,selfDamage:3,desc:'Causa 14. Perde 3 HP.',color:'#2c3e50',rarity:'common',art:'DK02_dark_slash',job:'Dark Knight'},
  DK03_blood_price:{id:'DK03_blood_price',name:'Preço de Sangue',type:'skill',cost:0,draw:3,selfDamage:5,desc:'Compra 3. Perde 5 HP.',color:'#c0392b',rarity:'uncommon',art:'DK03_blood_price',job:'Dark Knight'},
  // Bard
  B01_song_of_courage:{id:'B01_song_of_courage',name:'Canção de Coragem',type:'skill',cost:1,buff:'strength',amount:2,desc:'+2 Força até fim do combate.',color:'#f39c12',rarity:'common',art:'B01_song_of_courage',job:'Bard'},
  B02_lullaby:{id:'B02_lullaby',name:'Canção de Ninar',type:'skill',cost:1,apply:'weak',applyVal:3,desc:'Aplica 3 Fraco ao inimigo.',color:'#9b59b6',rarity:'common',art:'B02_lullaby',job:'Bard'},
  B03_melody_of_healing:{id:'B03_melody_of_healing',name:'Melodia de Cura',type:'skill',cost:1,heal:6,desc:'Cura 6 HP.',color:'#2ecc71',rarity:'common',art:'B03_melody_of_healing',job:'Bard'},
  B04_inspire:{id:'B04_inspire',name:'Inspirar',type:'skill',cost:1,draw:2,energy:1,desc:'Compra 2. +1 energia.',color:'#1abc9c',rarity:'uncommon',art:'B04_inspire',job:'Bard'},
  B06_battle_hymn:{id:'B06_battle_hymn',name:'Hino de Batalha',type:'skill',cost:2,buff:'strength',amount:3,desc:'+3 Força até fim do combate.',color:'#e67e22',rarity:'uncommon',art:'B06_battle_hymn',job:'Bard'},
  B07_sonic_boom:{id:'B07_sonic_boom',name:'Explosão Sônica',type:'attack',cost:2,damage:12,apply:'vulnerable',applyVal:2,desc:'Causa 12. Aplica 2 Vulnerável.',color:'#d35400',rarity:'uncommon',art:'B07_sonic_boom',job:'Bard'},
  B08_encore:{id:'B08_encore',name:'Bis',type:'skill',cost:0,copyLast:true,desc:'Repete a última carta jogada.',color:'#8e44ad',rarity:'rare',art:'B08_encore',job:'Bard'},
  B09_symphony:{id:'B09_symphony',name:'Sinfonia',type:'attack',cost:3,damage:8,hits:3,heal:5,desc:'Causa 8 x3. Cura 5 HP.',color:'#fbbf24',rarity:'legendary',art:'B09_symphony',job:'Bard'},
  B10_eternal_song:{id:'B10_eternal_song',name:'Canção Eterna',type:'power',cost:2,perm:true,effect:'draw_per_turn',amount:1,desc:'Permanente: compra 1 carta/turno.',color:'#d4ac0d',rarity:'legendary',art:'B10_eternal_song',job:'Bard'},
};

// ===== ENEMY DATABASE =====
const ENEMY_DB = {
  skeleton:{name:'Esqueleto',hp:28,maxHp:28,dmg:6,sprite:'skeleton',intent:['attack','defend']},
  slime:{name:'Slime',hp:35,maxHp:35,dmg:5,sprite:'slime',intent:['attack','attack']},
  goblin:{name:'Goblin',hp:22,maxHp:22,dmg:7,sprite:'goblin',intent:['attack','buff']},
  wolf:{name:'Lobo',hp:32,maxHp:32,dmg:8,sprite:'wolf',intent:['attack','attack']},
  spider:{name:'Aranha',hp:40,maxHp:40,dmg:9,sprite:'spider',intent:['attack','poison']},
  ghost:{name:'Fantasma',hp:30,maxHp:30,dmg:10,sprite:'ghost',intent:['attack','dodge']},
  dark_mage:{name:'Mago Negro',hp:45,maxHp:45,dmg:12,sprite:'dark_mage',intent:['attack','debuff']},
  golem:{name:'Golem de Pedra',hp:80,maxHp:80,dmg:14,sprite:'golem',intent:['attack','defend'],elite:true},
  dark_knight:{name:'Cav. Sombrio',hp:90,maxHp:90,dmg:16,sprite:'dark_knight',intent:['attack','lifesteal'],elite:true},
  boss_dragon:{name:'Dragão Vermelho',hp:150,maxHp:150,dmg:20,sprite:'boss_dragon',intent:['attack','aoe','buff'],boss:true},
  boss_lich:{name:'Lich',hp:120,maxHp:120,dmg:18,sprite:'boss_lich',intent:['attack','summon','debuff'],boss:true},
  boss_demon:{name:'Demon Lord',hp:180,maxHp:180,dmg:25,sprite:'boss_demon',intent:['attack','aoe','lifesteal'],boss:true},
};

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#0b0f19',
  scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
  render: { antialias: true, pixelArt: false }
};

// ============================================
// BOOT SCENE
// ============================================
class BootScene extends Phaser.Scene {
  constructor() { super({ key: 'BootScene' }); }

  preload() {
    const w = this.cameras.main.width, h = this.cameras.main.height;
    const pb = this.add.graphics(), pbox = this.add.graphics();
    pbox.fillStyle(0x1e293b, 1).fillRect(w/2-160, h/2-15, 320, 30);
    this.add.text(w/2, h/2-40, 'Loading...', { fontFamily: 'Cinzel,serif', fontSize: '18px', color: '#fbbf24' }).setOrigin(0.5);
    const pt = this.add.text(w/2, h/2, '0%', { fontFamily: 'Lato,sans-serif', fontSize: '14px', color: '#64748b' }).setOrigin(0.5);
    this.load.on('progress', v => { pt.setText(Math.round(v*100)+'%'); pb.clear(); pb.fillStyle(0xfbbf24,1).fillRect(w/2-155, h/2-10, 310*v, 20); });
    this.load.on('complete', () => { pb.destroy(); pbox.destroy(); pt.destroy(); });

    // Load all cards from CARD_DB
    Object.values(CARD_DB).forEach(card => {
      if (card.art) this.load.image(card.art, 'assets/cards/' + card.art + '.png');
    });

    // Load all enemies
    Object.values(ENEMY_DB).forEach(enemy => {
      this.load.image(enemy.sprite, 'assets/enemies/' + enemy.sprite + '.png');
    });

    // Load backgrounds
    ['bg_forest','bg_desert','bg_ice_cave','bg_castle','bg_netherworld'].forEach(k => this.load.image(k, 'assets/backgrounds/' + k + '.jpg'));
  }

  create() {
    this.cameras.main.fadeOut(300);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('MenuScene'));
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function shuffle(arr) { for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr; }

function getStarterDeck() {
  const deck = [];
  for(let i=0;i<5;i++) deck.push({...CARD_DB.W01_strike});
  for(let i=0;i<4;i++) deck.push({...CARD_DB.W02_defend});
  deck.push({...CARD_DB.W03_heavy_blow});
  return deck;
}

function generateMap() {
  const nodes = [];
  for(let f=0;f<3;f++){
    const c=f===2?1:3;
    for(let n=0;n<c;n++){
      let t;
      if(f===2&&n===0) t='boss';
      else if(n===0) t='combat';
      else if(n===1){const r=Math.random();t=r<0.4?'event':r<0.7?'shop':'rest';}
      else t='elite';
      nodes.push({floor:f,index:n,type:t});
    }
  }
  return nodes;
}

// ============================================
// MENU SCENE
// ============================================
class MenuScene extends Phaser.Scene {
  constructor() { super({ key: 'MenuScene' }); }

  create() {
    const { width: w, height: h } = this.cameras.main, cx = w/2, cy = h/2;

    // Background with gradient
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a1a3e, 0x1a1a3e, 0x0b0f19, 0x0b0f19, 1);
    bg.fillRect(0, 0, w, h);

    // Animated particles
    this.particles = [];
    for(let i=0;i<60;i++){
      const p=this.add.circle(Math.random()*w,Math.random()*h,Math.random()*3+1,0xfbbf24,Math.random()*0.3+0.1);
      p.sx=(Math.random()-0.5)*0.3;p.sy=(Math.random()-0.5)*0.3;
      this.particles.push(p);
    }

    // Decorative frame
    this.add.graphics().lineStyle(2,0xfbbf24,0.15).lineBetween(cx-250,cy-140,cx+250,cy-140);
    this.add.graphics().lineStyle(2,0xfbbf24,0.15).lineBetween(cx-250,cy+60,cx+250,cy+60);
    [[cx-250,cy-140],[cx+250,cy-140],[cx-250,cy+60],[cx+250,cy+60]].forEach(([x,y])=>this.add.circle(x,y,6,0xfbbf24));

    // Title
    this.add.text(cx,cy-100,'ARCANA',{fontFamily:'Cinzel,serif',fontSize:'64px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);
    this.add.text(cx,cy-40,'ETERNAL',{fontFamily:'Cinzel,serif',fontSize:'48px',fontStyle:'bold',color:'#10b981'}).setOrigin(0.5);
    this.add.text(cx,cy+10,'Roguelike Deckbuilder',{fontFamily:'Lato,sans-serif',fontSize:'16px',color:'#64748b'}).setOrigin(0.5);

    // Button
    const btnBg=this.add.graphics().fillStyle(0x1a5276,1).fillRoundedRect(cx-120,cy+55,240,50,8).lineStyle(2,0xfbbf24,1).strokeRoundedRect(cx-120,cy+55,240,50,8);
    const btnTxt=this.add.text(cx,cy+80,'✦ Novo Jogo ✦',{fontFamily:'Cinzel,serif',fontSize:'20px',fontStyle:'bold',color:'#fff'}).setOrigin(0.5);
    this.add.zone(cx,cy+80,240,55).setInteractive({useHandCursor:true})
      .on('pointerover',()=>{btnBg.clear().fillStyle(0x2980b9,1).fillRoundedRect(cx-120,cy+50,240,50,8).lineStyle(2,0xffffff,1).strokeRoundedRect(cx-120,cy+50,240,50,8);this.tweens.add({targets:btnTxt,y:cy+75,duration:150});})
      .on('pointerout',()=>{btnBg.clear().fillStyle(0x1a5276,1).fillRoundedRect(cx-120,cy+55,240,50,8).lineStyle(2,0xfbbf24,1).strokeRoundedRect(cx-120,cy+55,240,50,8);this.tweens.add({targets:btnTxt,y:cy+80,duration:150});})
      .on('pointerdown',()=>{this.cameras.main.fadeOut(500);this.cameras.main.once('camerafadeoutcomplete',()=>this.scene.start('MapScene'));});

    this.add.text(cx,h-25,'v2.1 | Phaser 3 | 63 Cards | 7 Jobs | 13 Enemies',{fontFamily:'Lato,sans-serif',fontSize:'11px',color:'#333'}).setOrigin(0.5);
    this.cameras.main.fadeIn(600);
  }

  update(){
    this.particles.forEach(p=>{p.x+=p.sx;p.y+=p.sy;if(p.x<0)p.x=this.cameras.main.width;if(p.x>this.cameras.main.width)p.x=0;if(p.y<0)p.y=this.cameras.main.height;if(p.y>this.cameras.main.height)p.y=0;});
  }
}

// ============================================
// MAP SCENE
// ============================================
class MapScene extends Phaser.Scene {
  constructor(){super({key:'MapScene'});this.runData={floor:1,hp:80,maxHp:80,gold:50,deck:[],relics:[],path:[]};}

  create(){
    const{w,h}=this.cameras.main,cx=w/2;

    if(this.runData.deck.length===0) this.runData.deck=getStarterDeck();
    this.runData.path=generateMap();

    // Background
    this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);

    // Floor background image
    const floorImgs=['bg_forest','bg_desert','bg_ice_cave'];
    if(this.textures.exists(floorImgs[this.runData.floor-1])){
      const floorBg=this.add.image(cx,h/2,floorImgs[this.runData.floor-1]).setAlpha(0.3).setDisplaySize(w,h);
    }

    this.add.text(cx,45,`Andar ${this.runData.floor} / 3`,{fontFamily:'Cinzel,serif',fontSize:'28px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);
    this.add.text(cx,68,'Escolhe o teu caminho',{fontFamily:'Lato,sans-serif',fontSize:'14px',color:'#64748b'}).setOrigin(0.5);

    const fn=this.runData.path.filter(n=>n.floor===this.runData.floor-1),sY=120,eY=h-120,sp=(eY-sY)/Math.max(fn.length-1,1);
    const nc={combat:0xe74c3c,elite:0xf39c12,boss:0x8e44ad,event:0x3498db,shop:0x2ecc71,rest:0x1abc9c};
    const ni={combat:'⚔',elite:'★',boss:'☠',event:'?',shop:'$',rest:'♨'};
    const nl={combat:'Combate',elite:'Elite',boss:'Boss',event:'Evento',shop:'Loja',rest:'Descanso'};

    fn.forEach((node,i)=>{
      const x=cx,y=sY+i*sp,c=nc[node.type]||0x333;

      // Connection line with animation
      if(i<fn.length-1){
        const line=this.add.graphics().lineStyle(3,0xfbbf24,0.3).lineBetween(x,y+35,x,sY+(i+1)*sp-35);
      }

      // Glow
      this.add.circle(x,y,50,c,0.15);

      // Node circle
      const circ=this.add.circle(x,y,35,c).setStrokeStyle(3,0xfbbf24);

      // Icon
      this.add.text(x,y,ni[node.type],{fontSize:'28px'}).setOrigin(0.5);

      // Label
      this.add.text(x,y+52,nl[node.type],{fontFamily:'Lato,sans-serif',fontSize:'13px',fontStyle:'bold',color:'#f1f5f9'}).setOrigin(0.5);

      // Interactive zone
      const glowRing=this.add.circle(x,y,45,0xfbbf24,0).setStrokeStyle(2,0xfbbf24,0);
      this.add.zone(x,y,80,90).setInteractive({useHandCursor:true})
        .on('pointerover',()=>{this.tweens.add({targets:[circ,glowRing],scale:1.15,duration:200});this.tweens.add({targets:glowRing,alpha:0.5,duration:200});})
        .on('pointerout',()=>{this.tweens.add({targets:[circ,glowRing],scale:1,duration:200});this.tweens.add({targets:glowRing,alpha:0,duration:200});})
        .on('pointerdown',()=>this.enterNode(node));
    });

    // Bottom bar
    this.add.graphics().fillStyle(0x0b0f19,0.8).fillRect(0,h-80,w,80);

    // HP bar
    this.add.graphics().fillStyle(0x333,1).fillRect(50,h-62,150,12);
    this.add.graphics().fillStyle(this.runData.hp/this.runData.maxHp>0.3?0x2ecc71:0xe74c3c,1).fillRect(50,h-62,150*(this.runData.hp/this.runData.maxHp),12);
    this.add.text(125,h-58,`${this.runData.hp}/${this.runData.maxHp}`,{fontSize:'10px',color:'#fff'}).setOrigin(0.5);
    this.add.text(20,h-58,'HP',{fontFamily:'Lato,sans-serif',fontSize:'12px',fontStyle:'bold',color:'#64748b'});

    // Gold
    this.add.text(50,h-25,`💰 ${this.runData.gold}`,{fontFamily:'Lato,sans-serif',fontSize:'14px',fontStyle:'bold',color:'#fbbf24'});

    // Relics indicator
    if(this.runData.relics.length>0){
      this.add.text(w/2,h-25,`🔮 ${this.runData.relics.length} relíquias`,{fontFamily:'Lato,sans-serif',fontSize:'12px',color:'#a855f7'});
    }

    // Deck button
    this.add.text(w-80,h-50,`📋 ${this.runData.deck.length}`,{fontFamily:'Lato,sans-serif',fontSize:'14px',color:'#e74c3c'}).setOrigin(0.5)
      .setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('DeckScene',{runData:this.runData}));

    this.cameras.main.fadeIn(400);
  }

  enterNode(node){
    if(node.type==='combat'||node.type==='elite'||node.type==='boss'){
      const pool=node.type==='boss'?['boss_dragon','boss_lich','boss_demon']:node.type==='elite'?['golem','dark_knight','dark_mage']:['skeleton','slime','goblin','wolf','spider'];
      const enemyKey=pool[Math.floor(Math.random()*pool.length)];
      this.scene.start('CombatScene',{runData:this.runData,enemyKey});
    }else if(node.type==='rest'){
      this.scene.start('RestScene',{runData:this.runData});
    }else if(node.type==='shop'){
      this.scene.start('ShopScene',{runData:this.runData});
    }else if(node.type==='event'){
      this.scene.start('EventScene',{runData:this.runData});
    }
  }

  showEventResult(text,goldGain){
    const{w,h}=this.cameras.main;
    const overlay=this.add.rectangle(w/2,h/2,w,h,0x000000,0.7);
    const msg=this.add.text(w/2,h/2,text,{fontFamily:'Cinzel,serif',fontSize:'20px',color:'#fbbf24',wordWrap:{width:w-100}}).setOrigin(0.5);
    this.time.delayedCall(2000,()=>{overlay.destroy();msg.destroy();this.advanceMap();});
  }

  advanceMap(){
    this.runData.floor++;
    if(this.runData.floor>3){this.scene.start('VictoryScene',{runData:this.runData});return;}
    this.runData.path=generateMap();
    this.scene.restart();
  }
}

// ============================================
// COMBAT SCENE — Full implementation
// ============================================
class CombatScene extends Phaser.Scene {
  constructor(){super({key:'CombatScene'});}
  init(data){
    this.runData=data.runData;
    this.enemyKey=data.enemyKey;
  }

  create(){
    const{w,h}=this.cameras.main,cx=w/2;
    this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);

    // Enemy data from database
    const enemyTemplate=ENEMY_DB[this.enemyKey]||ENEMY_DB.skeleton;
    this.enemy={...enemyTemplate,hp:enemyTemplate.maxHp,block:0,strength:0,weak:0,vulnerable:0,poison:0};
    this.playerBlock=0;
    this.energy=3;
    this.turn=1;
    this.combatOver=false;

    // Background based on enemy type
    const bgKey=enemyTemplate.boss?'bg_netherworld':enemyTemplate.elite?'bg_castle':'bg_forest';
    if(this.textures.exists(bgKey)){
      this.add.image(cx,h/2,bgKey).setAlpha(0.2).setDisplaySize(w,h);
    }

    // Enemy sprite
    if(this.textures.exists(this.enemy.sprite)){
      this.enemyImg=this.add.image(cx,100,this.enemy.sprite).setScale(enemyTemplate.boss?1.2:0.7);
    } else {
      this.enemyImg=this.add.circle(cx,100,enemyTemplate.boss?60:50,enemyTemplate.boss?0x8e44ad:0xe74c3c).setStrokeStyle(3,0xfbbf24);
    }

    // Enemy name
    const nameColor=enemyTemplate.boss?'#fbbf24':enemyTemplate.elite?'#f39c12':'#f1f5f9';
    this.add.text(cx,50,(enemyTemplate.boss?'👑 ':'')+this.enemy.name+(enemyTemplate.elite?' [ELITE]':''),{fontFamily:'Cinzel,serif',fontSize:'18px',fontStyle:'bold',color:nameColor}).setOrigin(0.5);

    // Enemy HP bar
    this.enemyHpBarBg=this.add.graphics().fillStyle(0x333,1).fillRect(cx-100,155,200,16);
    this.enemyHpBar=this.add.graphics();
    this.updateEnemyHP();

    // Enemy intent
    this.intentText=this.add.text(cx,195,'',{fontFamily:'Lato,sans-serif',fontSize:'14px',color:'#fbbf24'}).setOrigin(0.5);
    this.updateIntent();

    // Player area
    this.add.text(50,h-60,`HP: ${this.runData.hp}/${this.runData.maxHp}`,{fontFamily:'Lato,sans-serif',fontSize:'14px',fontStyle:'bold',color:(this.runData.hp/this.runData.maxHp>0.3?'#2ecc71':'#e74c3c')});

    // Energy
    this.energyText=this.add.text(cx,h-20,`⚡ ${this.energy}/3`,{fontFamily:'Cinzel,serif',fontSize:'22px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);

    // Log area
    this.logText=this.add.text(cx,h/2-20,'',{fontFamily:'Lato,sans-serif',fontSize:'12px',color:'#64748b'}).setOrigin(0.5);

    // Initialize combat
    this.combat={hand:[],drawPile:shuffle([...this.runData.deck]),discardPile:[],over:false};
    for(let i=0;i<5;i++)this.drawCard();
    this.renderHand();

    // End turn button
    this.endTurnBtn=this.add.text(w-80,h-50,'Fim Turno',{fontFamily:'Cinzel,serif',fontSize:'14px',fontStyle:'bold',color:'#fff',backgroundColor:'#e74c3c',padding:{x:12,y:8}}).setOrigin(0.5)
      .setInteractive({useHandCursor:true}).on('pointerdown',()=>this.endTurn());

    this.cameras.main.fadeIn(400);
  }

  drawCard(){
    if(this.combat.drawPile.length===0){if(this.combat.discardPile.length===0)return;this.combat.drawPile=shuffle([...this.combat.discardPile]);this.combat.discardPile=[];}
    if(this.combat.hand.length<12)this.combat.hand.push(this.combat.drawPile.pop());
  }

  renderHand(){
    if(this.cardSprites)this.cardSprites.forEach(s=>{if(s&&s.destroy)s.destroy();});
    this.cardSprites=[];
    const{w,h}=this.cameras.main,hY=h-210,cW=110,cH=160,gap=8;
    const totalW=this.combat.hand.length*(cW+gap)-gap,sX=w/2-totalW/2;

    this.combat.hand.forEach((card,i)=>{
      const x=sX+i*(cW+gap)+cW/2,can=card.cost<=this.energy&&!this.combat.over;
      const bg=this.add.graphics();
      const c=Phaser.Display.Color.HexStringToColor(card.color||'#2c3e50');

      // Card background
      bg.fillStyle(c.color,1).fillRoundedRect(x-cW/2,hY,cW,cH,6);
      bg.lineStyle(can?3:1,can?0xfbbf24:0x333,1).strokeRoundedRect(x-cW/2,hY,cW,cH,6);

      // Card art
      if(this.textures.exists(card.art)){
        const artImg=this.add.image(x,hY+42,card.art).setDisplaySize(cW-14,cH-65);
      }

      // Glow effect for playable cards
      if(can){
        const glow=this.add.graphics().lineStyle(2,0xfbbf24,0.2).strokeRoundedRect(x-cW/2-3,hY-3,cW+6,cH+6,8);
        this.tweens.add({targets:glow,alpha:{from:0.2,to:0.6},duration:1000,repeat:-1,yoyo:true});
      }

      // Card name
      this.add.text(x,hY+cH-22,card.name,{fontFamily:'Lato,sans-serif',fontSize:'9px',fontStyle:'bold',color:'#fff',wordWrap:{width:cW-8},align:'center'}).setOrigin(0.5);

      // Cost
      this.add.text(x,hY+14,`${card.cost}⚡`,{fontFamily:'Cinzel,serif',fontSize:'14px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);

      // Type badge
      const typeLabel=card.type==='attack'?'ATK':card.type==='skill'?'DEF':'POW';
      this.add.text(x+cW/2-18,hY+cH-8,typeLabel,{fontSize:'7px',color:'#ffffff88'}).setOrigin(0.5);

      if(can){
        this.add.zone(x,hY+cH/2,cW,cH).setInteractive({useHandCursor:true})
          .on('pointerover',()=>this.tweens.add({targets:bg,y:hY-12,duration:150,ease:'Power2'}))
          .on('pointerout',()=>this.tweens.add({targets:bg,y:hY,duration:150,ease:'Power2'}))
          .on('pointerdown',()=>{
            this.tweens.add({targets:bg,alpha:0,scale:1.3,duration:200});
            this.playCard(i);
          });
      }
      this.cardSprites.push(bg);
    });
  }

  playCard(index){
    if(this.combatOver)return;
    const card=this.combat.hand[index];
    if(!card||card.cost>this.energy)return;

    this.energy-=card.cost;
    this.combat.hand.splice(index,1);
    this.combat.discardPile.push(card);

    // Apply card effects
    let logMsg=`Jogou ${card.name}`;

    if(card.type==='attack'){
      let dmg=card.damage;
      if(this.enemy.vulnerable>0)dmg=Math.floor(dmg*1.5);
      if(card.hits){for(let h=0;h<card.hits;h++)this.enemy.hp-=dmg;}
      else this.enemy.hp-=dmg;
      logMsg+=` → ${dmg} dano`;
      this.showDamage(this.enemyImg.x,this.enemyImg.y-30,dmg,'#ef4444');
      this.cameras.main.shake(100,0.003);
      if(card.block){this.playerBlock+=card.block;logMsg+=` +${card.block} escudo`;}
      if(card.heal){this.runData.hp=Math.min(this.runData.maxHp,this.runData.hp+card.heal);this.showDamage(50,this.cameras.main.height-80,card.heal,'#2ecc71');logMsg+=` +${card.heal} cura`;}
      if(card.apply==='vulnerable'){this.enemy.vulnerable=(this.enemy.vulnerable||0)+card.applyVal;logMsg+=` +${card.applyVal} Vulnerável`;}
      if(card.apply==='weak'){this.enemy.weak=(this.enemy.weak||0)+card.applyVal;logMsg+=` +${card.applyVal} Fraco`;}
      if(card.apply==='poison'){this.enemy.poison=(this.enemy.poison||0)+card.applyVal;logMsg+=` +${card.applyVal} Veneno`;}
    } else if(card.type==='skill'){
      if(card.block){this.playerBlock+=card.block;logMsg+=` → ${card.block} escudo`;}
      if(card.heal){this.runData.hp=Math.min(this.runData.maxHp,this.runData.hp+card.heal);this.showDamage(50,this.cameras.main.height-80,card.heal,'#2ecc71');logMsg+=` +${card.heal} cura`;}
      if(card.draw){for(let d=0;d<(card.draw||1);d++)this.drawCard();logMsg+=` +${card.draw||1} carta(s)`;}
      if(card.apply==='vulnerable'){this.enemy.vulnerable=(this.enemy.vulnerable||0)+card.applyVal;logMsg+=` +${card.applyVal} Vulnerável`;}
      if(card.apply==='weak'){this.enemy.weak=(this.enemy.weak||0)+card.applyVal;logMsg+=` +${card.applyVal} Fraco`;}
    } else if(card.type==='power'){
      if(card.buff==='strength'){this.runData.strength=(this.runData.strength||0)+card.amount;logMsg+=` → +${card.amount} Força (permanente)`;}
      if(card.effect==='block_per_turn'){this.runData.blockPerTurn=(this.runData.blockPerTurn||0)+card.amount;logMsg+=` → +${card.amount} escudo/turno`;}
      if(card.effect==='draw_per_turn'){this.runData.drawPerTurn=(this.runData.drawPerTurn||0)+card.amount;logMsg+=` → +${card.amount} carta/turno`;}
      if(card.effect==='lifesteal'){this.runData.lifesteal=(this.runData.lifesteal||0)+card.amount;logMsg+=` → ${card.amount}% roubo de vida`;}
    }

    if(card.selfDamage){this.runData.hp-=card.selfDamage;logMsg+=` (-${card.selfDamage} HP)`;}

    this.logText.setText(logMsg);
    this.updateEnemyHP();
    this.energyText.setText(`⚡ ${this.energy}/3`);

    if(this.enemy.hp<=0){this.endCombat(true);return;}
    this.renderHand();
  }

  endTurn(){
    if(this.combatOver)return;

    // Enemy turn
    const intent=this.enemy.intent[Math.floor(Math.random()*this.enemy.intent.length)];
    let enemyDmg=0;
    let logMsg=`${this.enemy.name}: `;

    if(intent==='attack'){
      enemyDmg=Math.max(0,this.enemy.dmg-this.playerBlock);
      this.playerBlock=0;
      this.runData.hp-=enemyDmg;
      logMsg+=`Atacou por ${enemyDmg}`;
      if(this.enemy.hits){this.runData.hp-=enemyDmg;this.showDamage(w/2,h-100,enemyDmg*2,'#ef4444');}
      else this.showDamage(w/2,h-100,enemyDmg,'#ef4444');
    } else if(intent==='defend'){
      this.enemy.block+=8;
      logMsg+='Defendeu (+8 escudo)';
    } else if(intent==='buff'){
      this.enemy.strength=(this.enemy.strength||0)+2;
      logMsg+='Fortaleceu-se (+2 força)';
    } else if(intent==='debuff'){
      // Apply weak to player (simplified)
      logMsg+='Aplicou Fraco';
    } else if(intent==='poison'){
      this.enemy.poison=(this.enemy.poison||0)+2;
      logMsg+='Aplicou Veneno';
    } else if(intent==='summon'){
      this.enemy.hp=Math.min(this.enemy.maxHp,this.enemy.hp+15);
      logMsg+='Invocou (+15 HP)';
    } else if(intent==='aoe'){
      enemyDmg=Math.max(0,Math.floor(this.enemy.dmg*0.6)-this.playerBlock);
      this.playerBlock=0;
      this.runData.hp-=enemyDmg;
      logMsg+=`Ataque AOE por ${enemyDmg}`;
      this.showDamage(w/2,h-100,enemyDmg,'#ef4444');
    } else if(intent==='lifesteal'){
      enemyDmg=Math.max(0,Math.floor(this.enemy.dmg*0.8)-this.playerBlock);
      this.playerBlock=0;
      this.runData.hp-=enemyDmg;
      this.enemy.hp=Math.min(this.enemy.maxHp,this.enemy.hp+enemyDmg);
      logMsg+=`Roubo de vida: ${enemyDmg}`;
      this.showDamage(w/2,h-100,enemyDmg,'#8e44ad');
    }

    // Poison damage
    if(this.enemy.poison>0){
      this.enemy.hp-=this.enemy.poison;
      this.showDamage(this.enemyImg.x,this.enemyImg.y+30,this.enemy.poison,'#27ae60');
    }

    this.logText.setText(logMsg);

    if(this.runData.hp<=0){this.endCombat(false);return;}
    if(this.enemy.hp<=0){this.endCombat(true);return;}

    // New turn
    this.turn++;
    this.energy=3;
    this.playerBlock=0;
    this.enemy.block=0;
    this.enemy.vulnerable=Math.max(0,(this.enemy.vulnerable||0)-1);
    this.enemy.weak=Math.max(0,(this.enemy.weak||0)-1);

    // Draw cards
    const drawCount=(this.runData.drawPerTurn||0)+5;
    for(let i=0;i<drawCount;i++)this.drawCard();

    this.updateEnemyHP();
    this.updateIntent();
    this.energyText.setText(`⚡ ${this.energy}/3`);
    this.renderHand();
  }

  endCombat(won){
    this.combatOver=true;
    const{w,h}=this.cameras.main;
    this.add.rectangle(w/2,h/2,w,h,0x000000,0.7);
    this.add.text(w/2,h/2-30,won?'VITÓRIA!':'DERROTA',{fontFamily:'Cinzel,serif',fontSize:'42px',fontStyle:'bold',color:won?'#fbbf24':'#e74c3c'}).setOrigin(0.5);

    if(won){
      const goldReward=15+Math.floor(Math.random()*20);
      this.runData.gold+=goldReward;
      this.add.text(w/2,h/2+10,`+${goldReward} ouro`,{fontFamily:'Lato,sans-serif',fontSize:'16px',color:'#fbbf24'}).setOrigin(0.5);
    }

    this.add.text(w/2,h/2+60,won?'Continuar':'Menu Principal',{fontFamily:'Cinzel,serif',fontSize:'18px',color:'#fff',backgroundColor:'#6366f1',padding:{x:20,y:12}}).setOrigin(0.5)
      .setInteractive({useHandCursor:true}).on('pointerdown',()=>{
        if(won)this.scene.start('RewardScene',{runData:this.runData});
        else this.scene.start('MenuScene');
      });
  }

  updateEnemyHP(){
    if(this.enemyHpBar)this.enemyHpBar.destroy();
    const cx=this.cameras.main.width/2,pct=Math.max(0,this.enemy.hp/this.enemy.maxHp);
    this.enemyHpBar=this.add.graphics();
    this.enemyHpBar.fillStyle(0x333,1).fillRect(cx-100,155,200,16);
    this.enemyHpBar.fillStyle(pct>0.3?0x2ecc71:0xe74c3c,1).fillRect(cx-100,155,200*pct,16);
    this.add.text(cx,167,`${Math.max(0,this.enemy.hp)}/${this.enemy.maxHp}`,{fontSize:'11px',color:'#fff'}).setOrigin(0.5);
  }

  updateIntent(){
    const intent=this.enemy.intent[0];
    const icons={attack:'⚔',defend:'🛡',buff:'⬆',debuff:'⬇',poison:'☠',summon:'👻',aoe:'💥',lifesteal:'🩸'};
    const labels={attack:`Atacar: ${this.enemy.dmg}`,defend:'Defender +8',buff:'Fortalecer +2',debuff:'Fraco',poison:'Veneno +2',summon:'Invocar +15 HP',aoe:'Ataque AoE',lifesteal:'Roubo de Vida'};
    this.intentText.setText(`${icons[intent]||'?'} ${labels[intent]||intent}`);
  }

  showDamage(x,y,amount,color){
    const txt=this.add.text(x,y,`-${amount}`,{fontFamily:'Cinzel,serif',fontSize:'24px',fontStyle:'bold',color:color}).setOrigin(0.5);
    this.tweens.add({targets:txt,y:y-50,alpha:0,duration:800,ease:'Power2',onComplete:()=>txt.destroy()});
  }
}

// ============================================
// REWARD SCENE
// ============================================
class RewardScene extends Phaser.Scene {
  constructor(){super({key:'RewardScene'});}init(data){this.runData=data.runData;}
  create(){
    const{w,h}=this.cameras.main;
    this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    this.add.text(w/2,50,'Vitória! Escolha uma Carta',{fontFamily:'Cinzel,serif',fontSize:'24px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);
    this.add.text(w/2,80,`Ouro: ${this.runData.gold} | HP: ${this.runData.hp}/${this.runData.maxHp}`,{fontFamily:'Lato,sans-serif',fontSize:'14px',color:'#64748b'}).setOrigin(0.5);

    // Pick 3 random cards from database
    const allCards=Object.values(CARD_DB);
    const rewards=shuffle([...allCards]).slice(0,3);

    rewards.forEach((card,i)=>{
      const x=w/2-180+i*180,y=h/2+20;
      const bg=this.add.graphics();
      const c=Phaser.Display.Color.HexStringToColor(card.color);
      bg.fillStyle(c.color,1).fillRoundedRect(x-70,y-100,140,200,8);
      bg.lineStyle(2,0xfbbf24,1).strokeRoundedRect(x-70,y-100,140,200,8);

      if(this.textures.exists(card.art))this.add.image(x,y-20,card.art).setDisplaySize(90,90);

      this.add.text(x,y+55,card.name,{fontFamily:'Lato,sans-serif',fontSize:'11px',fontStyle:'bold',color:'#fff',wordWrap:{width:120}}).setOrigin(0.5);
      this.add.text(x,y+72,`${card.cost}⚡ | ${card.type.toUpperCase()}`,{fontSize:'9px',color:'#fbbf24'}).setOrigin(0.5);
      this.add.text(x,y+88,card.desc,{fontSize:'8px',color:'#64748b',wordWrap:{width:120}}).setOrigin(0.5);

      this.add.zone(x,y,140,200).setInteractive({useHandCursor:true})
        .on('pointerover',()=>this.tweens.add({targets:bg,scaleY:1.05,duration:150}))
        .on('pointerout',()=>this.tweens.add({targets:bg,scaleY:1,duration:150}))
        .on('pointerdown',()=>{this.runData.deck.push({...card});this.scene.start('MapScene',{runData:this.runData});});
    });

    this.add.text(w/2,h-60,'Pular',{fontFamily:'Cinzel,serif',fontSize:'14px',color:'#64748b'}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('MapScene',{runData:this.runData}));
    this.cameras.main.fadeIn(400);
  }
}

// ============================================
// SHOP SCENE
// ============================================
class ShopScene extends Phaser.Scene {
  constructor(){super({key:'ShopScene'});}init(data){this.runData=data.runData;}
  create(){
    const{w,h}=this.cameras.main;
    this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    this.add.text(w/2,50,'LOJA',{fontFamily:'Cinzel,serif',fontSize:'28px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);
    this.add.text(w/2,80,`Ouro: ${this.runData.gold}`,{fontFamily:'Lato,sans-serif',fontSize:'16px',color:'#fbbf24'}).setOrigin(0.5);

    // Buy cards
    this.add.text(w/2,130,'Comprar (15 ouro)',{fontFamily:'Lato,sans-serif',fontSize:'14px',fontStyle:'bold',color:'#f1f5f9'}).setOrigin(0.5);
    const allCards=Object.values(CARD_DB);
    const buyCards=shuffle([...allCards]).slice(0,3);

    buyCards.forEach((card,i)=>{
      const x=w/2-180+i*180,y=h/2-20;
      const bg=this.add.graphics().fillStyle(0x333,1).fillRoundedRect(x-60,y-50,120,130,6).lineStyle(1,0xfbbf24,0.5).strokeRoundedRect(x-60,y-50,120,130,6);
      if(this.textures.exists(card.art))this.add.image(x,y-15,card.art).setDisplaySize(70,70);
      this.add.text(x,y+30,card.name,{fontSize:'9px',fontStyle:'bold',color:'#fff'}).setOrigin(0.5);
      this.add.zone(x,y+55,80,25).setInteractive({useHandCursor:true}).on('pointerdown',()=>{
        if(this.runData.gold>=15){this.runData.gold-=15;this.runData.deck.push({...card});this.scene.restart();}
      });
      this.add.text(x,y+55,'Comprar (15g)',{fontSize:'10px',color:'#2ecc71'}).setOrigin(0.5);
    });

    // Sell cards
    this.add.text(w/2,h/2+120,'Vender Cartas (10 ouro)',{fontFamily:'Lato,sans-serif',fontSize:'14px',fontStyle:'bold',color:'#f1f5f9'}).setOrigin(0.5);
    if(this.runData.deck.length>0){
      const card=this.runData.deck[0];
      const x=w/2,y=h/2+170;
      const bg=this.add.graphics().fillStyle(0x333,1).fillRoundedRect(x-50,y-30,100,80,6);
      this.add.text(x,y-5,card.name,{fontSize:'9px',fontStyle:'bold',color:'#fff'}).setOrigin(0.5);
      this.add.zone(x,y+15,80,20).setInteractive({useHandCursor:true}).on('pointerdown',()=>{
        this.runData.gold+=10;this.runData.deck.shift();this.scene.restart();
      });
      this.add.text(x,y+15,'Vender (10g)',{fontSize:'10px',color:'#e74c3c'}).setOrigin(0.5);
    }

    this.add.text(w/2,h-50,'Sair da Loja',{fontFamily:'Cinzel,serif',fontSize:'16px',color:'#fff',backgroundColor:'#2ecc71',padding:{x:20,y:12}}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('MapScene',{runData:this.runData}));
    this.cameras.main.fadeIn(300);
  }
}

// ============================================
// REST SCENE
// ============================================
class RestScene extends Phaser.Scene {
  constructor(){super({key:'RestScene'});}init(data){this.runData=data.runData;}
  create(){
    const{w,h}=this.cameras.main;this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    this.add.text(w/2,60,'Local de Descanso',{fontFamily:'Cinzel,serif',fontSize:'28px',fontStyle:'bold',color:'#1abc9c'}).setOrigin(0.5);
    this.add.text(w/2,90,`HP: ${this.runData.hp}/${this.runData.maxHp}`,{fontFamily:'Lato,sans-serif',fontSize:'16px',color:'#64748b'}).setOrigin(0.5);

    this.add.text(w/2,h/2-40,'Descansar (+30% HP)',{fontFamily:'Cinzel,serif',fontSize:'18px',color:'#fff',backgroundColor:'#2ecc71',padding:{x:20,y:12}}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>{this.runData.hp=Math.min(this.runData.maxHp,this.runData.hp+Math.floor(this.runData.maxHp*0.3));this.scene.start('MapScene',{runData:this.runData});});
    this.add.text(w/2,h/2+40,'Melhorar Carta (+2 dano)',{fontFamily:'Cinzel,serif',fontSize:'18px',color:'#fff',backgroundColor:'#6366f1',padding:{x:20,y:12}}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>{if(this.runData.deck.length>0){const i=Math.floor(Math.random()*this.runData.deck.length);if(!this.runData.deck[i].upgraded){this.runData.deck[i].damage=(this.runData.deck[i].damage||0)+2;this.runData.deck[i].upgraded=true;this.runData.deck[i].name+='+';}}this.scene.start('MapScene',{runData:this.runData});});
    this.cameras.main.fadeIn(300);
  }
}

// ============================================
// EVENT SCENE
// ============================================
class EventScene extends Phaser.Scene {
  constructor(){super({key:'EventScene'});}init(data){this.runData=data.runData;}
  create(){
    const{w,h}=this.cameras.main;this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    this.add.text(w/2,60,'Evento Misterioso',{fontFamily:'Cinzel,serif',fontSize:'28px',fontStyle:'bold',color:'#3498db'}).setOrigin(0.5);

    const events=[
      {text:'Encontrou um baú de ouro!',gold:25,hp:0},
      {text:'Uma fada curou suas feridas!',gold:0,hp:20},
      {text:'Um mercante generoso deu-lhe ouro!',gold:15,hp:0},
      {text:'Encontrou uma fonte mágica!',gold:10,hp:10},
    ];
    const event=events[Math.floor(Math.random()*events.length)];

    this.add.text(w/2,h/2-40,event.text,{fontFamily:'Lato,sans-serif',fontSize:'18px',color:'#f1f5f9',wordWrap:{width:w-100}}).setOrigin(0.5);
    if(event.gold>0)this.add.text(w/2,h/2,`+${event.gold} ouro`,{fontFamily:'Lato,sans-serif',fontSize:'16px',color:'#fbbf24'}).setOrigin(0.5);
    if(event.hp>0)this.add.text(w/2,h/2+25,`+${event.hp} HP`,{fontFamily:'Lato,sans-serif',fontSize:'16px',color:'#2ecc71'}).setOrigin(0.5);

    this.runData.gold+=event.gold;
    this.runData.hp=Math.min(this.runData.maxHp,this.runData.hp+event.hp);

    this.add.text(w/2,h/2+80,'Continuar',{fontFamily:'Cinzel,serif',fontSize:'16px',color:'#fff',backgroundColor:'#6366f1',padding:{x:20,y:12}}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('MapScene',{runData:this.runData}));
    this.cameras.main.fadeIn(400);
  }
}

// ============================================
// DECK SCENE
// ============================================
class DeckScene extends Phaser.Scene {
  constructor(){super({key:'DeckScene'});}init(data){this.runData=data.runData;}
  create(){
    const{w,h}=this.cameras.main;this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    this.add.text(w/2,40,`BARALHO (${this.runData.deck.length} cartas)`,{fontFamily:'Cinzel,serif',fontSize:'24px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);
    this.add.text(60,40,'← Voltar',{fontFamily:'Cinzel,serif',fontSize:'16px',color:'#e74c3c'}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('MapScene',{runData:this.runData}));
    const cW=95,cH=130,gap=6,cols=Math.floor((w-40)/(cW+gap)),sX=(w-cols*(cW+gap)+gap)/2,sY=75;
    this.runData.deck.forEach((card,i)=>{
      const col=i%cols,row=Math.floor(i/cols),x=sX+col*(cW+gap)+cW/2,y=sY+row*(cH+gap)+cH/2;
      const bg=this.add.graphics();
      bg.fillStyle(Phaser.Display.Color.HexStringToColor(card.color||'#2c3e50').color,1).fillRoundedRect(x-cW/2,y-cH/2,cW,cH,4);
      bg.lineStyle(1,0xfbbf24,0.4).strokeRoundedRect(x-cW/2,y-cH/2,cW,cH,4);
      if(this.textures.exists(card.art))this.add.image(x,y-12,card.art).setDisplaySize(cW-12,cH-45);
      this.add.text(x,y+cH/2-16,card.name,{fontFamily:'Lato,sans-serif',fontSize:'8px',fontStyle:'bold',color:'#fff',wordWrap:{width:cW-6}}).setOrigin(0.5);
      this.add.text(x,y-cH/2+10,`${card.cost}⚡`,{fontFamily:'Cinzel,serif',fontSize:'11px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);
    });
    this.cameras.main.fadeIn(300);
  }
}

// ============================================
// GAME OVER / VICTORY
// ============================================
class GameOverScene extends Phaser.Scene {
  constructor(){super({key:'GameOverScene'});}init(data){this.runData=data.runData;}
  create(){
    const{w,h}=this.cameras.main;this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    this.add.text(w/2,h/2-60,'DERROTA',{fontFamily:'Cinzel,serif',fontSize:'48px',fontStyle:'bold',color:'#e74c3c'}).setOrigin(0.5);
    this.add.text(w/2,h/2+10,`Andar ${this.runData?.floor||0} | ${this.runData?.deck?.length||0} cartas`,{fontFamily:'Lato,sans-serif',fontSize:'16px',color:'#64748b'}).setOrigin(0.5);
    this.add.text(w/2,h/2+70,'Menu Principal',{fontFamily:'Cinzel,serif',fontSize:'18px',color:'#fff',backgroundColor:'#6366f1',padding:{x:20,y:12}}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('MenuScene'));
    this.cameras.main.fadeIn(500);
  }
}

class VictoryScene extends Phaser.Scene {
  constructor(){super({key:'VictoryScene'});}init(data){this.runData=data.runData;}
  create(){
    const{w,h}=this.cameras.main;this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    for(let i=0;i<40;i++){const p=this.add.circle(Math.random()*w,Math.random()*h,Math.random()*4+2,0xfbbf24,Math.random()*0.5+0.3);this.tweens.add({targets:p,y:p.y-60,alpha:0,duration:2000+Math.random()*1000,repeat:-1,yoyo:true});}
    this.add.text(w/2,h/2-60,'VITÓRIA!',{fontFamily:'Cinzel,serif',fontSize:'48px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);
    this.add.text(w/2,h/2+10,`${this.runData?.deck?.length||0} cartas | ${this.runData?.gold||0} ouro`,{fontFamily:'Lato,sans-serif',fontSize:'16px',color:'#64748b'}).setOrigin(0.5);
    this.add.text(w/2,h/2+80,'Menu Principal',{fontFamily:'Cinzel,serif',fontSize:'18px',color:'#fff',backgroundColor:'#6366f1',padding:{x:20,y:12}}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('MenuScene'));
    this.cameras.main.fadeIn(600);
  }
}

// ============================================
// LAUNCH GAME
// ============================================
config.scene=[BootScene,MenuScene,MapScene,CombatScene,RewardScene,ShopScene,RestScene,EventScene,DeckScene,GameOverScene,VictoryScene];
const game=new Phaser.Game(config);
window.addEventListener('resize',()=>game.scale.resize(window.innerWidth,window.innerHeight));
