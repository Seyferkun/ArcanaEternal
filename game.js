// ============================================
// ARCANA ETERNAL v2.0 — Phaser 3 Game Engine
// ============================================
// Todos os códigos Phaser num só ficheiro
// para compatibilidade com GitHub Pages

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#0b0f19',
  scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
  render: { antialias: true, pixelArt: false }
};

// ============================================
// BOOT SCENE — Loading screen
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

    // Load all card images (66 total)
    const cards = [
      'card_back','card_frame_gold','card_frame_silver','card_frame_bronze',
      'W01_strike','W02_defend','W03_heavy_blow','W04_shield_bash','W05_battle_cry',
      'W07_whirlwind','W08_earthquake','W10_titans_wrath',
      'BM01_fireball','BM02_ice_shard','BM03_thunder_bolt','BM04_arcane_missile',
      'BM06_blizzard','BM07_meteor','BM08_mana_surge','BM10_ultima',
      'T01_quick_stab','T02_smoke_bomb','T03_backstab','T05_dagger_throw',
      'T06_shadow_step','T07_assassinate','T08_wind_dash','T10_eternal_night',
      'WM01_holy_light','WM02_protect','WM03_cure','WM04_smite',
      'WM05_prayer','WM06_divine_shield','WM07_holy','WM08_resurrection',
      'DK01_soul_drain','DK02_dark_slash','DK03_blood_price',
      'B01_song_of_courage','B02_lullaby','B03_melody_of_healing',
      'B04_inspire','B06_battle_hymn','B07_sonic_boom',
      'B08_encore','B09_symphony','B10_eternal_song',
      'N01_arcane_intellect','N02_mana_burst',
      'card_fire_01','card_fire_02','card_fire_03','card_ice_01','card_ice_02','card_ice_03',
      'card_lightning_01','card_lightning_02','card_earth_01','card_earth_02',
      'card_wind_01','card_wind_02','card_holy_01','card_holy_02','card_dark_01','card_dark_02'
    ];
    cards.forEach(k => this.load.image(k, 'assets/cards/' + k + '.png'));

    // Load enemies (18 total)
    ['goblin','skeleton','slime','wolf','dark_mage','golem','orc','harpy','ghost',
     'fire_elemental','spider','bandit','treant','merman','dark_knight',
     'boss_dragon','boss_lich','boss_demon'
    ].forEach(k => this.load.image(k, 'assets/enemies/' + k + '.png'));

    // Backgrounds & UI
    ['bg_forest','bg_desert','bg_ice_cave','bg_castle','bg_netherworld'].forEach(k => this.load.image(k, 'assets/backgrounds/' + k + '.jpg'));
    ['icon_gold','icon_hp'].forEach(k => this.load.image(k, 'assets/ui/' + k + '.png'));
  }

  create() {
    this.cameras.main.fadeOut(300);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('MenuScene'));
  }
}

// ============================================
// MENU SCREEN
// ============================================
class MenuScene extends Phaser.Scene {
  constructor() { super({ key: 'MenuScene' }); }

  create() {
    const { width: w, height: h } = this.cameras.main, cx = w/2, cy = h/2;

    // Background
    this.add.graphics().fillGradientStyle(0x1a1a3e,0x1a1a3e,0x0b0f19,0x0b0f19,1).fillRect(0,0,w,h);

    // Floating particles
    this.particles = [];
    for(let i=0;i<60;i++){
      const p=this.add.circle(Math.random()*w,Math.random()*h,Math.random()*3+1,0xfbbf24,Math.random()*0.3+0.1);
      p.sx=(Math.random()-0.5)*0.3;p.sy=(Math.random()-0.5)*0.3;
      this.particles.push(p);
    }

    // Decorative frame
    const lineColor = 0xfbbf24, lineAlpha = 0.15;
    this.add.graphics().lineStyle(2,lineColor,lineAlpha).lineBetween(cx-250,cy-140,cx+250,cy-140);
    this.add.graphics().lineStyle(2,lineColor,lineAlpha).lineBetween(cx-250,cy+60,cx+250,cy+60);
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

    this.add.text(cx,h-25,'v2.0 | Phaser 3 | 66 AI Art Assets',{fontFamily:'Lato,sans-serif',fontSize:'11px',color:'#333'}).setOrigin(0.5);
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
    if(this.runData.deck.length===0){for(let i=0;i<5;i++)this.runData.deck.push({id:'golpe_rapido',name:'Golpe Rápido',type:'attack',cost:1,damage:6,color:'#e74c3c',art:'W01_strike'});for(let i=0;i<5;i++)this.runData.deck.push({id:'escudo_reforcado',name:'Escudo Ref.',type:'skill',cost:1,block:8,color:'#2ecc71',art:'W04_shield_bash'});this.runData.deck.push({id:'investida',name:'Investida',type:'attack',cost:2,damage:12,block:5,color:'#e67e22',art:'W03_heavy_blow'});}
    this.runData.path=this.genMap();
    this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    this.add.text(cx,45,`Andar ${this.runData.floor} / 3`,{fontFamily:'Cinzel,serif',fontSize:'28px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);
    this.add.text(cx,68,'Escolhe o teu caminho',{fontFamily:'Lato,sans-serif',fontSize:'14px',color:'#64748b'}).setOrigin(0.5);
    const fn=this.runData.path.filter(n=>n.floor===this.runData.floor-1),sY=120,eY=h-120,sp=(eY-sY)/Math.max(fn.length-1,1);
    const nc={combat:0xe74c3c,elite:0xf39c12,boss:0x8e44ad,event:0x3498db,shop:0x2ecc71,rest:0x1abc9c};
    const ni={combat:'⚔',elite:'★',boss:'☠',event:'?',shop:'$',rest:'♨'};
    const nl={combat:'Combate',elite:'Elite',boss:'Boss',event:'Evento',shop:'Loja',rest:'Descanso'};
    fn.forEach((node,i)=>{
      const x=cx,y=sY+i*sp,c=nc[node.type]||0x333;
      if(i<fn.length-1)this.add.graphics().lineStyle(3,0xfbbf24,0.3).lineBetween(x,y+35,x,sY+(i+1)*sp-35);
      this.add.circle(x,y,50,c,0.15);
      const circ=this.add.circle(x,y,35,c).setStrokeStyle(3,0xfbbf24);
      this.add.text(x,y,ni[node.type],{fontSize:'28px'}).setOrigin(0.5);
      this.add.text(x,y+52,nl[node.type],{fontFamily:'Lato,sans-serif',fontSize:'13px',fontStyle:'bold',color:'#f1f5f9'}).setOrigin(0.5);
      this.add.zone(x,y,80,90).setInteractive({useHandCursor:true})
        .on('pointerover',()=>this.tweens.add({targets:circ,scale:1.15,duration:200}))
        .on('pointerout',()=>this.tweens.add({targets:circ,scale:1,duration:200}))
        .on('pointerdown',()=>this.enterNode(node));
    });
    this.add.graphics().fillStyle(0x0b0f19,0.8).fillRect(0,h-80,w,80);
    this.add.graphics().fillStyle(0x333,1).fillRect(50,h-62,150,12);
    this.add.graphics().fillStyle(this.runData.hp/this.runData.maxHp>0.3?0x2ecc71:0xe74c3c,1).fillRect(50,h-62,150*(this.runData.hp/this.runData.maxHp),12);
    this.add.text(125,h-58,`${this.runData.hp}/${this.runData.maxHp}`,{fontSize:'10px',color:'#fff'}).setOrigin(0.5);
    this.add.text(50,h-25,`💰 ${this.runData.gold}`,{fontFamily:'Lato,sans-serif',fontSize:'14px',fontStyle:'bold',color:'#fbbf24'});
    this.add.text(w-80,h-50,`📋 ${this.runData.deck.length}`,{fontFamily:'Lato,sans-serif',fontSize:'14px',color:'#e74c3c'}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('DeckScene',{runData:this.runData}));
    this.cameras.main.fadeIn(300);
  }

  genMap(){const nodes=[];for(let f=0;f<3;f++){const c=f===2?1:3;for(let n=0;n<c;n++){let t;if(f===2&&n===0)t='boss';else if(n===0)t='combat';else if(n===1){const r=Math.random();t=r<0.4?'event':r<0.7?'shop':'rest';}else t='elite';nodes.push({floor:f,index:n,type:t});}}return nodes;}

  enterNode(node){
    if(node.type==='combat'||node.type==='elite'||node.type==='boss'){
      const pool=node.type==='boss'?['boss_lich','boss_dragon','boss_demon']:node.type==='elite'?['dark_knight','golem']:['skeleton','slime','goblin'];
      this.scene.start('CombatScene',{runData:this.runData,enemyKey:pool[Math.floor(Math.random()*pool.length)]});
    }else if(node.type==='rest'){this.scene.start('RestScene',{runData:this.runData});}
    else if(node.type==='shop'){this.scene.start('ShopScene',{runData:this.runData});}
    else if(node.type==='event'){this.runData.gold+=20;this.advMap();}
  }

  advMap(){this.runData.floor++;if(this.runData.floor>3){this.scene.start('VictoryScene',{runData:this.runData});return;}this.runData.path=this.genMap();this.scene.restart();}
}

// ============================================
// COMBAT SCENE
// ============================================
const ENEMIES={
  skeleton:{name:'Esqueleto',hp:30,maxHp:30,dmg:7,sprite:'skeleton'},
  slime:{name:'Slime',hp:40,maxHp:40,dmg:6,sprite:'slime'},
  goblin:{name:'Goblin',hp:25,maxHp:25,dmg:8,sprite:'goblin'},
  wolf:{name:'Loboo',hp:35,maxHp:35,dmg:9,sprite:'wolf'},
  dark_mage:{name:'Mago Negro',hp:50,maxHp:50,dmg:11,sprite:'dark_mage'},
  golem:{name:'Golem',hp:60,maxHp:60,dmg:13,sprite:'golem'},
  dark_knight:{name:'Cav. Sombrio',hp:80,maxHp:80,dmg:14,sprite:'dark_knight'},
  boss_dragon:{name:'Dragão',hp:150,maxHp:150,dmg:20,sprite:'boss_dragon'},
  boss_lich:{name:'Lich',hp:120,maxHp:120,dmg:18,sprite:'boss_lich'},
  boss_demon:{name:'Demônio',hp:180,maxHp:180,dmg:25,sprite:'boss_demon'},
};

class CombatScene extends Phaser.Scene {
  constructor(){super({key:'CombatScene'});}
  init(data){this.runData=data.runData;this.enemyKey=data.enemyKey;}

  create(){
    const{w,h}=this.cameras.main,cx=w/2;
    this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    const et=ENEMIES[this.enemyKey]||ENEMIES.skeleton;
    this.enemy={...et,hp:et.maxHp};

    // Enemy sprite
    if(this.textures.exists(this.enemy.sprite)){
      this.enemyImg=this.add.image(cx,100,this.enemy.sprite).setScale(0.7);
    } else {
      this.enemyImg=this.add.circle(cx,100,50,0xe74c3c).setStrokeStyle(3,0xfbbf24);
    }
    this.add.text(cx,50,this.enemy.name,{fontFamily:'Cinzel,serif',fontSize:'18px',fontStyle:'bold',color:'#f1f5f9'}).setOrigin(0.5);

    // Enemy HP
    this.enemyHpBar=this.add.graphics();
    this.updateEnemyHP();
    this.add.text(cx,175,`${this.enemy.hp}/${this.enemy.maxHp}`,{fontSize:'12px',color:'#fff'}).setOrigin(0.5);
    this.add.text(cx,200,`⚔ Atacar: ${this.enemy.dmg}`,{fontFamily:'Lato,sans-serif',fontSize:'14px',color:'#fbbf24'}).setOrigin(0.5);
    this.add.text(cx,220,'❓ Intenção: Atacar',{fontFamily:'Lato,sans-serif',fontSize:'12px',color:'#64748b'}).setOrigin(0.5);

    // Player HP
    this.add.text(50,h-60,`HP: ${this.runData.hp}/${this.runData.maxHp}`,{fontFamily:'Lato,sans-serif',fontSize:'14px',fontStyle:'bold',color:(this.runData.hp/this.runData.maxHp>0.3?'#2ecc71':'#e74c3c')});

    // Energy
    this.energy=3;this.energyText=this.add.text(cx,h-20,'⚡ 3/3',{fontFamily:'Cinzel,serif',fontSize:'22px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);

    // Combat state
    this.combat={hand:[],drawPile:this.shuffle([...this.runData.deck]),discardPile:[],playerBlock:0,enemyBlock:0,turn:1,over:false};
    for(let i=0;i<5;i++)this.drawCard();
    this.renderHand();

    // End turn button
    this.add.text(w-80,h-50,'Fim Turno',{fontFamily:'Cinzel,serif',fontSize:'14px',fontStyle:'bold',color:'#fff',backgroundColor:'#e74c3c',padding:{x:12,y:8}}).setOrigin(0.5)
      .setInteractive({useHandCursor:true}).on('pointerdown',()=>this.endTurn());

    // Fade in
    this.cameras.main.fadeIn(400);
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
      bg.fillStyle(c.color,1).fillRoundedRect(x-cW/2,hY,cW,cH,6);
      bg.lineStyle(2,can?0xfbbf24:0x333,1).strokeRoundedRect(x-cW/2,hY,cW,cH,6);

      if(this.textures.exists(card.art)){
        this.add.image(x,hY+45,card.art).setDisplaySize(cW-16,cH-70);
      }

      // Card glow effect when playable
      if(can){
        const glow=this.add.graphics();
        glow.lineStyle(2,0xfbbf24,0.3).strokeRoundedRect(x-cW/2-2,hY-2,cW+4,cH+4,8);
        this.tweens.add({targets:glow,alpha:{from:0.3,to:0.8},duration:1000,repeat:-1,yoyo:true});
      }

      this.add.text(x,hY+cH-22,card.name,{fontFamily:'Lato,sans-serif',fontSize:'9px',fontStyle:'bold',color:'#fff',wordWrap:{width:cW-8},align:'center'}).setOrigin(0.5);
      this.add.text(x,hY+14,`${card.cost}⚡`,{fontFamily:'Cinzel,serif',fontSize:'14px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);

      if(can){
        this.add.zone(x,hY+cH/2,cW,cH).setInteractive({useHandCursor:true})
          .on('pointerover',()=>this.tweens.add({targets:bg,y:hY-10,duration:150,ease:'Power2'}))
          .on('pointerout',()=>this.tweens.add({targets:bg,y:hY,duration:150,ease:'Power2'}))
          .on('pointerdown',()=>this.playCard(i));
      }
      this.cardSprites.push(bg);
    });
  }

  drawCard(){
    if(this.combat.drawPile.length===0){if(this.combat.discardPile.length===0)return;this.combat.drawPile=this.shuffle([...this.combat.discardPile]);this.combat.discardPile=[];}
    if(this.combat.hand.length<12)this.combat.hand.push(this.combat.drawPile.pop());
  }

  playCard(i){
    if(this.combat.over)return;
    const card=this.combat.hand[i];
    if(!card||card.cost>this.energy)return;
    this.energy-=card.cost;
    this.combat.hand.splice(i,1);
    this.combat.discardPile.push(card);

    // Card play animation
    this.tweens.add({targets:this.cardSprites[i],alpha:0,scale:1.5,duration:200,onComplete:()=>{if(this.cardSprites[i])this.cardSprites[i].destroy();}});

    // Apply effect
    if(card.damage){
      this.enemy.hp-=card.damage;
      this.showDmg(this.enemyImg.x,this.enemyImg.y-30,card.damage,'#ef4444');
      this.cameras.main.shake(100,0.003);
    }
    if(card.block)this.combat.playerBlock+=card.block;
    if(card.heal){this.runData.hp=Math.min(this.runData.maxHp,this.runData.hp+card.heal);this.showDmg(50,this.cameras.main.height-80,card.heal,'#2ecc71');}

    this.updateEnemyHP();
    this.energyText.setText(`⚡ ${this.energy}/3`);

    if(this.enemy.hp<=0){this.endCombat(true);return;}
    this.renderHand();
  }

  endTurn(){
    if(this.combat.over)return;
    const dmg=Math.max(0,this.enemy.dmg-this.combat.playerBlock);
    this.combat.playerBlock=0;
    this.runData.hp-=dmg;
    if(dmg>0)this.showDmg(this.cameras.main.width/2,this.cameras.main.height-100,dmg,'#ef4444');

    if(this.runData.hp<=0){this.endCombat(false);return;}
    this.combat.turn++;this.energy=3;this.combat.enemyBlock=0;
    for(let i=0;i<5;i++)this.drawCard();
    this.energyText.setText(`⚡ ${this.energy}/3`);
    this.renderHand();
  }

  endCombat(won){
    this.combat.over=true;
    const{w,h}=this.cameras.main;
    this.add.rectangle(w/2,h/2,w,h,0x000000,0.7);
    this.add.text(w/2,h/2-30,won?'VITÓRIA!':'DERROTA',{fontFamily:'Cinzel,serif',fontSize:'42px',fontStyle:'bold',color:won?'#fbbf24':'#e74c3c'}).setOrigin(0.5);
    this.add.text(w/2,h/2+40,won?'Continuar':'Menu Principal',{fontFamily:'Cinzel,serif',fontSize:'18px',color:'#fff',backgroundColor:'#6366f1',padding:{x:20,y:12}}).setOrigin(0.5)
      .setInteractive({useHandCursor:true}).on('pointerdown',()=>{if(won)this.scene.start('RewardScene',{runData:this.runData});else this.scene.start('MenuScene');});
  }

  updateEnemyHP(){
    if(this.enemyHpBar)this.enemyHpBar.destroy();
    const cx=this.cameras.main.width/2,pct=Math.max(0,this.enemy.hp/this.enemy.maxHp);
    this.enemyHpBar=this.add.graphics();
    this.enemyHpBar.fillStyle(0x333,1).fillRect(cx-100,155,200,14);
    this.enemyHpBar.fillStyle(pct>0.3?0x2ecc71:0xe74c3c,1).fillRect(cx-100,155,200*pct,14);
  }

  showDmg(x,y,amount,color){
    const txt=this.add.text(x,y,`-${amount}`,{fontFamily:'Cinzel,serif',fontSize:'28px',fontStyle:'bold',color:color}).setOrigin(0.5);
    this.tweens.add({targets:txt,y:y-40,alpha:0,duration:800,ease:'Power2',onComplete:()=>txt.destroy()});
  }

  shuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
}

// ============================================
// REWARD SCENE
// ============================================
class RewardScene extends Phaser.Scene {
  constructor(){super({key:'RewardScene'});}init(data){this.runData=data.runData;}
  create(){
    const{w,h}=this.cameras.main;
    this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    this.add.text(w/2,60,'Escolha uma Carta',{fontFamily:'Cinzel,serif',fontSize:'28px',fontStyle:'bold',color:'#f1f5f9'}).setOrigin(0.5);
    [{id:'BM01_fireball',name:'Bola de Fogo',cost:1,damage:8,color:'#e74c3c',art:'BM01_fireball'},
     {id:'BM02_ice_shard',name:'Estilhaço Gelo',cost:1,damage:6,color:'#3498db',art:'BM02_ice_shard'},
     {id:'WM01_holy_light',name:'Luz Divina',cost:1,damage:5,heal:3,color:'#f1c40f',art:'WM01_holy_light'}
    ].forEach((card,i)=>{
      const x=w/2-180+i*180,y=h/2;
      const bg=this.add.graphics();
      bg.fillStyle(Phaser.Display.Color.HexStringToColor(card.color).color,1).fillRoundedRect(x-70,y-100,140,200,8);
      bg.lineStyle(2,0xfbbf24,1).strokeRoundedRect(x-70,y-100,140,200,8);
      if(this.textures.exists(card.art))this.add.image(x,y-20,card.art).setDisplaySize(90,90);
      this.add.text(x,y+55,card.name,{fontFamily:'Lato,sans-serif',fontSize:'11px',fontStyle:'bold',color:'#fff',wordWrap:{width:120}}).setOrigin(0.5);
      this.add.text(x,y+75,`Custo: ${card.cost}⚡`,{fontSize:'10px',color:'#fbbf24'}).setOrigin(0.5);
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
    const{w,h}=this.cameras.main;this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    this.add.text(w/2,60,'LOJA',{fontFamily:'Cinzel,serif',fontSize:'28px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);
    this.add.text(w/2,90,`Ouro: ${this.runData.gold}`,{fontFamily:'Lato,sans-serif',fontSize:'16px',color:'#fbbf24'}).setOrigin(0.5);
    this.add.text(w/2,h-50,'Sair da Loja',{fontFamily:'Cinzel,serif',fontSize:'18px',color:'#fff',backgroundColor:'#2ecc71',padding:{x:20,y:12}}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('MapScene',{runData:this.runData}));
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
    this.add.text(w/2,h/2+40,'Melhorar Carta (+2 dano)',{fontFamily:'Cinzel,serif',fontSize:'18px',color:'#fff',backgroundColor:'#6366f1',padding:{x:20,y:12}}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>{if(this.runData.deck.length>0){const i=Math.floor(Math.random()*this.runData.deck.length);this.runData.deck[i].damage=(this.runData.deck[i].damage||0)+2;}this.scene.start('MapScene',{runData:this.runData});});
    this.cameras.main.fadeIn(300);
  }
}

// ============================================
// DECK SCENE
// ============================================
class DeckScene extends Phaser.Scene {
  constructor(){super({key:'DeckScene'});}init(data){this.runData=data.runData;}
  create(){
    const{w,h}=this.cameras.main;this.add.graphics().fillStyle(0x0b0f19,1).fillRect(0,0,w,h);
    this.add.text(w/2,40,`BARALHO (${this.runData.deck.length})`,{fontFamily:'Cinzel,serif',fontSize:'24px',fontStyle:'bold',color:'#fbbf24'}).setOrigin(0.5);
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
    this.add.text(w/2,h/2+60,'Menu Principal',{fontFamily:'Cinzel,serif',fontSize:'18px',color:'#fff',backgroundColor:'#6366f1',padding:{x:20,y:12}}).setOrigin(0.5).setInteractive({useHandCursor:true}).on('pointerdown',()=>this.scene.start('MenuScene'));
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
// START GAME
// ============================================
config.scene=[BootScene,MenuScene,MapScene,CombatScene,RewardScene,ShopScene,RestScene,DeckScene,GameOverScene,VictoryScene];
const game=new Phaser.Game(config);
window.addEventListener('resize',()=>game.scale.resize(window.innerWidth,window.innerHeight));
