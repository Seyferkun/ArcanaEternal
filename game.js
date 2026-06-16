// Arcana Eternal - Complete Game Engine
// All features: menu, map, combat, rewards, shop, rest, deck viewer, relics

let canvas, ctx, ui;
let state = 'menu';
let runData = null;
let combat = null;
let rewardCards = [];

// --- CARD DATABASE ---
const CARDS = {
  golpe_rapido: { id:'golpe_rapido', name:'Golpe Rapido', type:'attack', cost:1, damage:6, desc:'Causa 6 de dano.', color:'#e74c3c' },
  espadada: { id:'espadada', name:'Espadada', type:'attack', cost:1, damage:8, desc:'Causa 8 de dano.', color:'#c0392b' },
  investida: { id:'investida', name:'Investida', type:'attack', cost:2, damage:12, block:5, desc:'Causa 12. Ganha 5 escudo.', color:'#e67e22' },
  golpe_brutal: { id:'golpe_brutal', name:'Golpe Brutal', type:'attack', cost:2, damage:18, desc:'Causa 18 de dano.', color:'#8e44ad' },
  corte_duplo: { id:'corte_duplo', name:'Corte Duplo', type:'attack', cost:1, damage:3, hits:2, desc:'Causa 3 de dano 2x.', color:'#2980b9' },
  estocada: { id:'estocada', name:'Estocada', type:'attack', cost:0, damage:4, draw:1, desc:'Causa 4. Compra 1.', color:'#16a085' },
  fireball: { id:'fireball', name:'Bola de Fogo', type:'attack', cost:1, damage:8, desc:'Causa 8 de dano.', color:'#e74c3c' },
  ice_shard: { id:'ice_shard', name:'Estilhaço de Gelo', type:'attack', cost:1, damage:6, apply:'vulnerable', applyVal:1, desc:'Causa 6. Aplica 1 Vulnerable.', color:'#3498db' },
  thunder_bolt: { id:'thunder_bolt', name:'Raio', type:'attack', cost:1, damage:7, draw:1, desc:'Causa 7. Compra 1.', color:'#f1c40f' },
  quick_stab: { id:'quick_stab', name:'Estocada Rápida', type:'attack', cost:0, damage:4, draw:1, desc:'Causa 4. Compra 1.', color:'#2ecc71' },
  smoke_bomb: { id:'smoke_bomb', name:'Bomba de Fumaça', type:'skill', cost:1, block:6, draw:1, desc:'Ganha 6 escudo. Compra 1.', color:'#95a5a6' },
  backstab: { id:'backstab', name:'Traição', type:'attack', cost:2, damage:18, desc:'Causa 18 de dano.', color:'#2c3e50' },
  holy_light: { id:'holy_light', name:'Luz Divina', type:'attack', cost:1, damage:5, heal:3, desc:'Causa 5. Cura 3 HP.', color:'#f1c40f' },
  protect: { id:'protect', name:'Proteção', type:'skill', cost:1, block:6, heal:2, desc:'Ganha 6 escudo. Cura 2 HP.', color:'#2ecc71' },
  cure: { id:'cure', name:'Cura', type:'skill', cost:2, heal:12, desc:'Cura 12 HP.', color:'#27ae60' },
  escudo_reforcado: { id:'escudo_reforcado', name:'Escudo Reforçado', type:'skill', cost:1, block:8, desc:'Ganha 8 de escudo.', color:'#2ecc71' },
  foco: { id:'foco', name:'Foco', type:'skill', cost:1, draw:2, desc:'Compra 2 cartas.', color:'#9b59b6' },
  forca_interior: { id:'forca_interior', name:'Força Interior', type:'power', cost:2, perm:true, buff:'strength', amount:2, desc:'Permanente: +2 Força.', color:'#d35400' }
};

// --- ENEMY DATABASE ---
const ENEMY_DB = {
  skeleton: { name:'Esqueleto', hp:30, maxHp:30, intent:'attack', intentVal:7, color:'#bdc3c7' },
  bat: { name:'Morcego Sombrio', hp:22, maxHp:22, intent:'attack', intentVal:5, hits:2, color:'#8e44ad' },
  slime: { name:'Slime', hp:40, maxHp:40, intent:'attack', intentVal:6, color:'#27ae60' },
  goblin: { name:'Goblin', hp:25, maxHp:25, intent:'attack', intentVal:8, debuff:'weak', color:'#e67e22' },
  spider: { name:'Aranha', hp:35, maxHp:35, intent:'attack', intentVal:7, poison:3, color:'#2c3e50' },
  ghost: { name:'Fantasma', hp:28, maxHp:28, intent:'attack', intentVal:9, dodge:true, color:'#95a5a6' },
  orc: { name:'Orc Berserker', hp:45, maxHp:45, intent:'attack', intentVal:12, selfDamage:3, color:'#c0392b' },
  imp: { name:'Diabo', hp:20, maxHp:20, intent:'attack', intentVal:4, stealEnergy:1, color:'#e74c3c' },
  dark_paladin: { name:'Paladino Sombrio', hp:80, maxHp:80, intent:'attack', intentVal:14, heal:5, color:'#2c3e50', elite:true },
  lich: { name:'Lich', hp:120, maxHp:120, intent:'attack', intentVal:18, summon:true, color:'#8e44ad', boss:true },
  dragon: { name:'Dragão Vermelho', hp:150, maxHp:150, intent:'attack', intentVal:20, aoe:true, color:'#c0392b', boss:true }
};

// --- INIT ---
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

// --- RENDER ---
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
    case 'deck': renderDeck(); break;
    case 'gameover': renderGameOver(); break;
    case 'victory': renderVictory(); break;
  }
}

// --- MENU ---
function renderMenu() {
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Particles
  for(var i=0;i<30;i++){
    ctx.fillStyle = 'rgba(251,191,36,' + (Math.random()*0.3) + ')';
    ctx.beginPath();
    ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*3+1, 0, Math.PI*2);
    ctx.fill();
  }
  
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 56px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('ARCANA ETERNAL', canvas.width/2, canvas.height/2 - 80);
  
  ctx.fillStyle = '#64748b';
  ctx.font = '18px Segoe UI';
  ctx.fillText('Roguelike Deckbuilder Card Game', canvas.width/2, canvas.height/2 - 30);
  
  const btn = document.createElement('button');
  btn.textContent = 'Novo Jogo';
  btn.className = 'btn';
  btn.style.cssText = 'position:absolute;top:55%;left:50%;transform:translate(-50%,-50%);padding:20px 48px;font-size:22px;font-weight:700;background:linear-gradient(135deg,#1a5276,#2980b9);color:#fff;border:none;border-radius:12px;cursor:pointer;box-shadow:0 4px 20px rgba(41,128,185,.5);transition:all .2s';
  btn.onclick = () => {
    runData = { floor:1, hp:70, maxHp:70, gold:50, deck: getStarterDeck(), relics:[], path: generateMap() };
    state = 'map';
    render();
  };
  ui.appendChild(btn);
  
  ctx.fillStyle = '#444';
  ctx.font = '12px Segoe UI';
  ctx.fillText('v1.0 | 98 AI Art Assets | 7 Jobs | 63 Cards', canvas.width/2, canvas.height - 30);
}

function getStarterDeck() {
  const deck = [];
  for(let i=0;i<5;i++) deck.push({...CARDS.golpe_rapido});
  for(let i=0;i<4;i++) deck.push({...CARDS.escudo_reforcado});
  deck.push({...CARDS.investida});
  return shuffle(deck);
}

// --- MAP ---
function generateMap() {
  const nodes = [];
  for(let f=0;f<3;f++){
    const count = f===2?1:3;
    for(let n=0;n<count;n++){
      let type;
      if(f===2&&n==0) type='boss';
      else if(n===0) type='combat';
      else if(n===1){ const r=Math.random(); type=r<.4?'event':r<.7?'shop':'rest'; }
      else type='elite';
      nodes.push({floor:f,index:n,type});
    }
  }
  return nodes;
}

function renderMap() {
  if(!runData||!runData.path) return;
  
  ctx.fillStyle = '#0b0f19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 28px Segoe UI';
  ctx.textAlign = 'center';
  ctx.fillText('Andar '+runData.floor+' / 3', canvas.width/2, 45);
  
  const path = runData.path;
  const floorNodes = path.filter(n=>n.floor===runData.floor-1);
  const startY = 120, endY = canvas.height-120;
  const spacing = (endY-startY)/Math.max(floorNodes.length-1,1);
  
  const nodeColors = {combat:'#e74c3c',elite:'#f39c12',boss:'#8e44ad',event:'#3498db',shop:'#2ecc71',rest:'#1abc9c'};
  const nodeIcons = {combat:'⚔',elite:'★',boss:'☠',event:'?',shop:'$',rest:'♨'};
  const nodeLabels = {combat:'Combate',elite:'Elite',boss:'Boss',event:'Evento',shop:'Loja',rest:'Descanso'};
  
  // Lines
  ctx.strokeStyle = 'rgba(251,191,36,0.3)';
  ctx.lineWidth = 3;
  ctx.setLineDash([8,6]);
  for(let i=0;i<floorNodes.length;i++){
    const x=canvas.width/2, y=startY+i*spacing;
    if(i<floorNodes.length-1){
      ctx.beginPath(); ctx.moveTo(x,y+30); ctx.lineTo(x,startY+(i+1)*spacing-30); ctx.stroke();
    }
  }
  ctx.setLineDash([]);
  
  // Nodes
  floorNodes.forEach((node,i)=>{
    const x=canvas.width/2, y=startY+i*spacing;
    
    // Glow
    const g=ctx.createRadialGradient(x,y,0,x,y,50);
    g.addColorStop(0,nodeColors[node.type]);
    g.addColorStop(1,'transparent');
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.arc(x,y,50,0,Math.PI*2); ctx.fill();
    
    // Circle
    ctx.beginPath(); ctx.arc(x,y,35,0,Math.PI*2);
    ctx.fillStyle=nodeColors[node.type]; ctx.fill();
    ctx.strokeStyle='#f1f5f9'; ctx.lineWidth=3; ctx.stroke();
    
    // Icon
    ctx.fillStyle='#fff'; ctx.font='bold 24px Segoe UI'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(nodeIcons[node.type],x,y);
    
    // Label
    ctx.fillStyle='#f1f5f9'; ctx.font='bold 13px Segoe UI'; ctx.textBaseline='alphabetic';
    ctx.fillText(nodeLabels[node.type],x,y+52);
    
    // Button
    const btn=document.createElement('button');
    btn.style.cssText='position:absolute;left:'+(x-40)+'px;top:'+(y-40)+'px;width:80px;height:80px;background:transparent;border:2px solid transparent;border-radius:50%;cursor:pointer;transition:all .2s';
    btn.onmouseenter=()=>{btn.style.borderColor='#fbbf24';btn.style.background='rgba(251,191,36,0.1)';};
    btn.onmouseleave=()=>{btn.style.borderColor='transparent';btn.style.background='transparent';};
    btn.onclick=()=>enterNode(node);
    ui.appendChild(btn);
  });
  
  // Bottom bar
  ctx.fillStyle='rgba(11,15,25,0.8)'; ctx.fillRect(0,canvas.height-80,canvas.width,80);
  
  // HP
  ctx.fillStyle='#64748b'; ctx.font='bold 14px Segoe UI'; ctx.textAlign='left'; ctx.fillText('HP',20,canvas.height-55);
  ctx.fillStyle='#333'; ctx.fillRect(50,canvas.height-62,150,12);
  ctx.fillStyle='#e74c3c'; ctx.fillRect(50,canvas.height-62,150*(runData.hp/runData.maxHp),12);
  ctx.fillStyle='#fff'; ctx.font='bold 10px Segoe UI'; ctx.textAlign='center';
  ctx.fillText(runData.hp+'/'+runData.maxHp,125,canvas.height-52);
  
  // Gold
  ctx.fillStyle='#fbbf24'; ctx.font='bold 14px Segoe UI'; ctx.textAlign='left';
  ctx.fillText('💰 '+runData.gold,20,canvas.height-25);
  
  // Deck button
  const deckBtn=document.createElement('button');
  deckBtn.textContent='📋 Baralho ('+runData.deck.length+')';
  deckBtn.style.cssText='position:absolute;right:20px;bottom:20px;padding:10px 20px;font-size:14px;background:#333;color:#fff;border:none;border-radius:6px;cursor:pointer';
  deckBtn.onclick=()=>{state='deck';render();};
  ui.appendChild(deckBtn);
}

function enterNode(node) {
  if(node.type==='combat'||node.type==='elite'||node.type==='boss'){
    const pool = node.type==='boss'?['lich','dragon']:node.type==='elite'?['dark_paladin','orc','spider']:['skeleton','bat','slime','goblin','imp'];
    startCombat(pool[Math.floor(Math.random()*pool.length)]);
  } else if(node.type==='rest'){
    state='rest'; render();
  } else if(node.type==='shop'){
    state='shop'; render();
  } else if(node.type==='event'){
    const goldGain = 10+Math.floor(Math.random()*15);
    runData.gold += goldGain;
    alert('Evento: Encontrou '+goldGain+' de ouro!');
    advanceMap();
  }
}

function advanceMap() {
  runData.floor++;
  if(runData.floor>3){ state='victory'; render(); return; }
  runData.path = generateMap();
  state='map'; render();
}

// --- COMBAT ---
function startCombat(enemyKey) {
  const template = ENEMY_DB[enemyKey];
  const enemy = {...template, hp:template.maxHp};
  combat = {
    enemy, enemyKey, hand:[], drawPile:shuffle([...runData.deck]), discardPile:[],
    energy:3, maxEnergy:3, turn:1, playerBlock:0, enemyBlock:0,
    playerStrength:0, enemyStrength:0, playerWeak:0, enemyWeak:0,
    playerVuln:0, enemyVuln:0, enemyPoison:0, powers:[], over:false, result:null
  };
  for(let i=0;i<5;i++) drawCard();
  state='combat';
  render();
}

function drawCard() {
  if(combat.drawPile.length===0){
    if(combat.discardPile.length===0) return;
    combat.drawPile=shuffle([...combat.discardPile]); combat.discardPile=[];
  }
  if(combat.hand.length<12) combat.hand.push(combat.drawPile.pop());
}

function playCard(index) {
  if(!combat||combat.over) return;
  const card = combat.hand[index];
  if(!card||card.cost>combat.energy) return;
  
  combat.energy -= card.cost;
  combat.hand.splice(index,1);
  
  if(card.type==='attack'){
    let dmg = card.damage + combat.playerStrength;
    if(combat.enemyVuln>0) dmg=Math.floor(dmg*1.5);
    if(card.hits){ for(let h=0;h<card.hits;h++) dealDamageToEnemy(dmg); }
    else dealDamageToEnemy(dmg);
    if(card.block) combat.playerBlock+=card.block;
    if(card.draw) for(let i=0;i<card.draw;i++) drawCard();
  } else if(card.type==='skill'){
    if(card.block) combat.playerBlock+=card.block;
    if(card.draw) for(let i=0;i<card.draw;i++) drawCard();
    if(card.apply==='vulnerable') combat.enemyVuln=2;
  } else if(card.type==='power'){
    combat.powers.push({name:card.name,amount:card.amount||0});
    combat.playerStrength+=card.amount||0;
  }
  
  combat.discardPile.push(card);
  
  if(combat.enemy.hp<=0){ endCombat(true); return; }
  render();
}

function dealDamageToEnemy(dmg) {
  let actual=Math.max(0,dmg-combat.enemyBlock);
  combat.enemyBlock=Math.max(0,combat.enemyBlock-dmg);
  combat.enemy.hp-=actual;
}

function endTurn() {
  if(!combat||combat.over) return;
  while(combat.hand.length>0) combat.discardPile.push(combat.hand.pop());
  
  // Enemy turn
  const e=combat.enemy;
  if(e.intent==='attack'){
    let dmg=e.intentVal+combat.enemyStrength;
    if(combat.playerVuln>0) dmg=Math.floor(dmg*1.5);
    if(e.hits){ for(let h=0;h<e.hits;h++) dealDamageToPlayer(dmg); }
    else dealDamageToPlayer(dmg);
  }
  
  if(runData.hp<=0){ endCombat(false); return; }
  
  combat.turn++;
  combat.energy=combat.maxEnergy;
  combat.playerBlock=0; combat.enemyBlock=0;
  combat.enemyVuln=Math.max(0,combat.enemyVuln-1);
  combat.playerVuln=Math.max(0,combat.playerVuln-1);
  
  for(let i=0;i<5;i++) drawCard();
  render();
}

function dealDamageToPlayer(dmg) {
  let actual=Math.max(0,dmg-combat.playerBlock);
  combat.playerBlock=Math.max(0,combat.playerBlock-dmg);
  runData.hp-=actual;
}

function endCombat(won) {
  combat.over=true;
  combat.result=won;
  if(won){
    generateRewards();
    state='reward';
  } else {
    state='gameover';
  }
  render();
}

function renderCombat() {
  if(!combat) return;
  ctx.fillStyle='#0b0f19';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  const enemy=combat.enemy;
  const ex=canvas.width/2, ey=150;
  
  // Enemy sprite
  var spriteKey=getEnemySprite(combat.enemyKey);
  if(loadedAssets[spriteKey]){
    ctx.drawImage(loadedAssets[spriteKey],ex-60,ey-60,120,120);
  } else {
    ctx.fillStyle=enemy.color||'#e74c3c';
    ctx.beginPath(); ctx.arc(ex,ey,50,0,Math.PI*2); ctx.fill();
  }
  
  // Enemy name
  ctx.fillStyle='#f1f5f9'; ctx.font='bold 18px Segoe UI'; ctx.textAlign='center';
  ctx.fillText(enemy.name+(elite?' [ELITE]':'')+(boss?' [BOSS]':''),ex,ey-70);
  
  // HP bar
  const hpW=200, hpH=16;
  ctx.fillStyle='#333'; ctx.fillRect(ex-hpW/2,ey+60,hpW,hpH);
  ctx.fillStyle='#e74c3c'; ctx.fillRect(ex-hpW/2,ey+60,hpW*(enemy.hp/enemy.maxHp),hpH);
  ctx.fillStyle='#fff'; ctx.font='12px Segoe UI';
  ctx.fillText(enemy.hp+'/'+enemy.maxHp,ex,ey+73);
  
  // Intent
  if(!combat.over){
    ctx.fillStyle='#fbbf24'; ctx.font='14px Segoe UI';
    const intentText=enemy.intent==='attack'?'⚔ Atacar: '+enemy.intentVal:'🛡 Defender: '+enemy.intentVal;
    ctx.fillText(intentText,ex,ey+100);
  }
  
  // Player area
  const px=canvas.width/2, py=canvas.height-180;
  
  // Player portrait
  if(loadedAssets.warrior){
    ctx.drawImage(loadedAssets.warrior,20,canvas.height-140,70,70);
    ctx.strokeStyle='#fbbf24'; ctx.lineWidth=2; ctx.strokeRect(20,canvas.height-140,70,70);
  }
  
  // Player HP
  ctx.fillStyle='#64748b'; ctx.font='bold 14px Segoe UI'; ctx.textAlign='left';
  ctx.fillText('HP',20,canvas.height-55);
  ctx.fillStyle='#333'; ctx.fillRect(50,canvas.height-62,150,12);
  ctx.fillStyle='#2ecc71'; ctx.fillRect(50,canvas.height-62,150*(runData.hp/runData.maxHp),12);
  ctx.fillStyle='#fff'; ctx.font='bold 10px Segoe UI'; ctx.textAlign='center';
  ctx.fillText(runData.hp+'/'+runData.maxHp,125,canvas.height-52);
  
  // Energy
  ctx.fillStyle='#fbbf24'; ctx.font='bold 16px Segoe UI'; ctx.textAlign='center';
  ctx.fillText('⚡ '+combat.energy+'/'+combat.maxEnergy,canvas.width/2,canvas.height-20);
  
  // Hand
  const handY=canvas.height-200;
  const totalHandW=combat.hand.length*130;
  const handStartX=canvas.width/2-totalHandW/2;
  
  combat.hand.forEach((card,i)=>{
    const cx=handStartX+i*130;
    const canPlay=card.cost<=combat.energy&&!combat.over;
    
    // Card art
    var artKey=getCardArt(card.id);
    if(artKey&&loadedAssets[artKey]){
      ctx.drawImage(loadedAssets[artKey],cx,handY,120,170);
      ctx.strokeStyle=canPlay?'#fbbf24':'#333'; ctx.lineWidth=canPlay?2:1;
      ctx.strokeRect(cx,handY,120,170);
      ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(cx,handY+140,120,30);
    } else {
      ctx.fillStyle=canPlay?(card.color||'#2c3e50'):'#1a1a2e';
      ctx.strokeStyle=canPlay?'#fbbf24':'#333'; ctx.lineWidth=canPlay?2:1;
      roundRect(ctx,cx,handY,120,170,6); ctx.fill(); ctx.stroke();
    }
    
    // Name
    ctx.fillStyle=canPlay?'#fff':'#555'; ctx.font='bold 11px Segoe UI'; ctx.textAlign='center';
    ctx.fillText(card.name,cx+60,handY+155);
    
    // Cost
    ctx.fillStyle='#fbbf24'; ctx.font='bold 14px Segoe UI';
    ctx.fillText(card.cost+'⚡',cx+60,handY+15);
    
    // Button
    if(canPlay){
      const btn=document.createElement('button');
      btn.style.cssText='position:absolute;left:'+cx+'px;top:'+handY+'px;width:120px;height:170px;background:transparent;border:none;cursor:pointer;border-radius:6px';
      btn.onclick=()=>playCard(i);
      ui.appendChild(btn);
    }
  });
  
  // End turn button
  if(!combat.over){
    const endBtn=document.createElement('button');
    endBtn.textContent='Fim do Turno';
    endBtn.style.cssText='position:absolute;right:20px;bottom:20px;padding:12px 24px;font-size:16px;background:#e74c3c;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700';
    endBtn.onclick=()=>endTurn();
    ui.appendChild(endBtn);
  }
  
  // Combat over overlay
  if(combat.over){
    ctx.fillStyle='rgba(0,0,0,0.7)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    ctx.fillStyle=combat.result?'#2ecc71':'#e74c3c';
    ctx.font='bold 36px Segoe UI'; ctx.textAlign='center';
    ctx.fillText(combat.result?'VITÓRIA!':'DERROTA',canvas.width/2,canvas.height/2-20);
    
    const continueBtn=document.createElement('button');
    continueBtn.textContent=combat.result?'Continuar':'Menu Principal';
    continueBtn.style.cssText='position:absolute;top:55%;left:50%;transform:translate(-50%,-50%);padding:14px 36px;font-size:18px;background:#6366f1;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700';
    continueBtn.onclick=()=>{
      if(combat.result){ state='reward'; render(); }
      else{ state='menu'; render(); }
    };
    ui.appendChild(continueBtn);
  }
}

// --- REWARDS ---
function generateRewards() {
  rewardCards=[];
  const keys=Object.keys(CARDS);
  for(let i=0;i<3;i++){
    const key=keys[Math.floor(Math.random()*keys.length)];
    rewardCards.push({...CARDS[key]});
  }
}

function renderReward() {
  ctx.fillStyle='#0b0f19';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  ctx.fillStyle='#f1f5f9'; ctx.font='bold 28px Segoe UI'; ctx.textAlign='center';
  ctx.fillText('Escolha uma Carta',canvas.width/2,60);
  
  ctx.fillStyle='#64748b'; ctx.font='16px Segoe UI';
  ctx.fillText('Ouro: '+runData.gold+' | HP: '+runData.hp+'/'+runData.maxHp,canvas.width/2,90);
  
  const cardW=180, cardH=260, gap=30;
  const totalW=3*cardW+2*gap;
  const startX=canvas.width/2-totalW/2;
  const cy=canvas.height/2-cardH/2;
  
  rewardCards.forEach((card,i)=>{
    const cx=startX+i*(cardW+gap);
    
    // Card art
    var artKey=getCardArt(card.id);
    if(artKey&&loadedAssets[artKey]){
      ctx.drawImage(loadedAssets[artKey],cx,cy,cardW,cardH);
      ctx.strokeStyle='#fbbf24'; ctx.lineWidth=2; ctx.strokeRect(cx,cy,cardW,cardH);
      ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(cx,cy+cardH-55,cardW,55);
    } else {
      ctx.fillStyle=card.color||'#333'; ctx.strokeStyle='#fbbf24'; ctx.lineWidth=2;
      roundRect(ctx,cx,cy,cardW,cardH,10); ctx.fill(); ctx.stroke();
    }
    
    ctx.fillStyle='#fff'; ctx.font='bold 16px Segoe UI'; ctx.textAlign='center';
    ctx.fillText(card.name,cx+cardW/2,cy+30);
    ctx.fillStyle='#fbbf24'; ctx.font='bold 18px Segoe UI';
    ctx.fillText(card.cost+' ⚡',cx+cardW/2,cy+55);
    ctx.fillStyle='#64748b'; ctx.font='12px Segoe UI';
    ctx.fillText(card.type.toUpperCase(),cx+cardW/2,cy+80);
    ctx.fillStyle='#ccc'; ctx.font='13px Segoe UI';
    wrapText(ctx,card.desc,cx+15,cy+110,cardW-30,16);
    
    const btn=document.createElement('button');
    btn.textContent='Escolher';
    btn.style.cssText='position:absolute;left:'+(cx+cardW/2-50)+'px;top:'+(cy+cardH+15)+'px;width:100px;padding:10px;font-size:14px;background:#6366f1;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600';
    btn.onclick=()=>{
      runData.deck.push({...card});
      advanceMap();
    };
    ui.appendChild(btn);
  });
  
  // Skip button
  const skipBtn=document.createElement('button');
  skipBtn.textContent='Pular';
  skipBtn.style.cssText='position:absolute;bottom:40px;left:50%;transform:translateX(-50%);padding:10px 24px;font-size:14px;background:#333;color:#aaa;border:none;border-radius:6px;cursor:pointer';
  skipBtn.onclick=()=>advanceMap();
  ui.appendChild(skipBtn);
}

// --- SHOP ---
function renderShop() {
  ctx.fillStyle='#0b0f19';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  ctx.fillStyle='#fbbf24'; ctx.font='bold 28px Segoe UI'; ctx.textAlign='center';
  ctx.fillText('LOJA',canvas.width/2,60);
  ctx.fillStyle='#64748b'; ctx.font='16px Segoe UI';
  ctx.fillText('Ouro: '+runData.gold,canvas.width/2,90);
  
  // Sell cards
  ctx.fillStyle='#f1f5f9'; ctx.font='bold 18px Segoe UI';
  ctx.fillText('Vender Cartas',canvas.width/2,140);
  
  const cardW=120, cardH=170;
  const cols=Math.min(runData.deck.length,5);
  const startX=canvas.width/2-(cols*(cardW+10))/2;
  
  runData.deck.forEach((card,i)=>{
    if(i>=5) return;
    const cx=startX+i*(cardW+10), cy=170;
    
    var artKey=getCardArt(card.id);
    if(artKey&&loadedAssets[artKey]){
      ctx.drawImage(loadedAssets[artKey],cx,cy,cardW,cardH);
    } else {
      ctx.fillStyle=card.color||'#333';
      roundRect(ctx,cx,cy,cardW,cardH,6); ctx.fill();
    }
    
    ctx.fillStyle='#fff'; ctx.font='bold 11px Segoe UI'; ctx.textAlign='center';
    ctx.fillText(card.name,cx+cardW/2,cy+cardH-15);
    
    const sellPrice=5+Math.floor(Math.random()*10);
    const btn=document.createElement('button');
    btn.textContent='Vender ('+sellPrice+'g)';
    btn.style.cssText='position:absolute;left:'+cx+'px;top:'+(cy+cardH+5)+'px;width:120px;padding:8px;font-size:12px;background:#e74c3c;color:#fff;border:none;border-radius:4px;cursor:pointer';
    btn.onclick=()=>{
      if(runData.gold>=sellPrice){
        runData.gold-=sellPrice;
        runData.deck.splice(i,1);
        render();
      }
    };
    ui.appendChild(btn);
  });
  
  // Buy new cards
  ctx.fillStyle='#f1f5f9'; ctx.font='bold 18px Segoe UI';
  ctx.fillText('Comprar Cartas (15 ouro)',canvas.width/2,400);
  
  const buyKeys=Object.keys(CARDS);
  for(let i=0;i<3;i++){
    const key=buyKeys[Math.floor(Math.random()*buyKeys.length)];
    const card=CARDS[key];
    const cx=startX+i*(cardW+10), cy=430;
    
    var artKey=getCardArt(card.id);
    if(artKey&&loadedAssets[artKey]){
      ctx.drawImage(loadedAssets[artKey],cx,cy,cardW,cardH);
    } else {
      ctx.fillStyle=card.color||'#333';
      roundRect(ctx,cx,cy,cardW,cardH,6); ctx.fill();
    }
    
    ctx.fillStyle='#fff'; ctx.font='bold 11px Segoe UI'; ctx.textAlign='center';
    ctx.fillText(card.name,cx+cardW/2,cy+cardH-15);
    
    const btn=document.createElement('button');
    btn.textContent='Comprar (15g)';
    btn.style.cssText='position:absolute;left:'+cx+'px;top:'+(cy+cardH+5)+'px;width:120px;padding:8px;font-size:12px;background:#2ecc71;color:#fff;border:none;border-radius:4px;cursor:pointer';
    btn.onclick=()=>{
      if(runData.gold>=15){
        runData.gold-=15;
        runData.deck.push({...card});
        render();
      }
    };
    ui.appendChild(btn);
  }
  
  // Leave button
  const leaveBtn=document.createElement('button');
  leaveBtn.textContent='Sair da Loja';
  leaveBtn.style.cssText='position:absolute;bottom:20px;left:50%;transform:translateX(-50%);padding:12px 24px;font-size:16px;background:#333;color:#fff;border:none;border-radius:8px;cursor:pointer';
  leaveBtn.onclick=()=>advanceMap();
  ui.appendChild(leaveBtn);
}

// --- REST ---
function renderRest() {
  ctx.fillStyle='#0b0f19';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  ctx.fillStyle='#1abc9c'; ctx.font='bold 28px Segoe UI'; ctx.textAlign='center';
  ctx.fillText('Local de Descanso',canvas.width/2,60);
  ctx.fillStyle='#64748b'; ctx.font='16px Segoe UI';
  ctx.fillText('HP: '+runData.hp+'/'+runData.maxHp,canvas.width/2,90);
  
  // Heal button
  const healBtn=document.createElement('button');
  healBtn.textContent='Descansar (+30% HP)';
  healBtn.style.cssText='position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);padding:20px 40px;font-size:18px;background:#2ecc71;color:#fff;border:none;border-radius:12px;cursor:pointer;font-weight:700';
  healBtn.onclick=()=>{
    runData.hp=Math.min(runData.maxHp,runData.hp+Math.floor(runData.maxHp*0.3));
    advanceMap();
  };
  ui.appendChild(healBtn);
  
  // Upgrade button
  const upgradeBtn=document.createElement('button');
  upgradeBtn.textContent='Melhorar Carta';
  upgradeBtn.style.cssText='position:absolute;top:55%;left:50%;transform:translate(-50%,-50%);padding:20px 40px;font-size:18px;background:#6366f1;color:#fff;border:none;border-radius:12px;cursor:pointer;font-weight:700';
  upgradeBtn.onclick=()=>{
    if(runData.deck.length>0){
      const idx=Math.floor(Math.random()*runData.deck.length);
      if(!runData.deck[idx].upgraded){
        runData.deck[idx].damage=(runData.deck[idx].damage||0)+2;
        runData.deck[idx].upgraded=true;
        runData.deck[idx].name+='+';
      }
      advanceMap();
    }
  };
  ui.appendChild(upgradeBtn);
}

// --- DECK VIEWER ---
function renderDeck() {
  ctx.fillStyle='#0b0f19';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  ctx.fillStyle='#fbbf24'; ctx.font='bold 32px Segoe UI'; ctx.textAlign='center';
  ctx.fillText('BARALHO ('+runData.deck.length+' cartas)',canvas.width/2,40);
  
  const backBtn=document.createElement('button');
  backBtn.textContent='← Voltar';
  backBtn.style.cssText='position:absolute;top:20px;left:20px;padding:10px 20px;font-size:16px;background:#333;color:#fff;border:none;border-radius:6px;cursor:pointer';
  backBtn.onclick=()=>{state='map';render();};
  ui.appendChild(backBtn);
  
  const cardW=120, cardH=170;
  const cols=Math.floor((canvas.width-40)/(cardW+10));
  const startX=(canvas.width-cols*(cardW+10))/2;
  const startY=80;
  
  runData.deck.forEach((card,i)=>{
    const col=i%cols, row=Math.floor(i/cols);
    const cx=startX+col*(cardW+10), cy=startY+row*(cardH+10);
    
    var artKey=getCardArt(card.id);
    if(artKey&&loadedAssets[artKey]){
      ctx.drawImage(loadedAssets[artKey],cx,cy,cardW,cardH);
      ctx.strokeStyle='#fbbf24'; ctx.lineWidth=1; ctx.strokeRect(cx,cy,cardW,cardH);
      ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(cx,cy+cardH-30,cardW,30);
    } else {
      ctx.fillStyle=card.color||'#2c3e50';
      roundRect(ctx,cx,cy,cardW,cardH,6); ctx.fill();
    }
    
    ctx.fillStyle='#fff'; ctx.font='bold 11px Segoe UI'; ctx.textAlign='center';
    ctx.fillText(card.name,cx+cardW/2,cy+cardH-15);
    ctx.fillStyle='#fbbf24'; ctx.font='bold 14px Segoe UI';
    ctx.fillText(card.cost+'⚡',cx+cardW/2,cy+15);
  });
}

// --- GAME OVER / VICTORY ---
function renderGameOver() {
  ctx.fillStyle='#0b0f19';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#e74c3c'; ctx.font='bold 48px Segoe UI'; ctx.textAlign='center';
  ctx.fillText('DERROTA',canvas.width/2,canvas.height/2-20);
  ctx.fillStyle='#64748b'; ctx.font='18px Segoe UI';
  ctx.fillText('Andar '+runData.floor+' | '+runData.deck.length+' cartas',canvas.width/2,canvas.height/2+20);
  
  const btn=document.createElement('button');
  btn.textContent='Menu Principal';
  btn.style.cssText='position:absolute;top:60%;left:50%;transform:translate(-50%,-50%);padding:14px 36px;font-size:18px;background:#6366f1;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700';
  btn.onclick=()=>{state='menu';render();};
  ui.appendChild(btn);
}

function renderVictory() {
  ctx.fillStyle='#0b0f19';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#fbbf24'; ctx.font='bold 48px Segoe UI'; ctx.textAlign='center';
  ctx.fillText('VITÓRIA!',canvas.width/2,canvas.height/2-20);
  ctx.fillStyle='#64748b'; ctx.font='18px Segoe UI';
  ctx.fillText('Completaste o Arcana Eternal!',canvas.width/2,canvas.height/2+20);
  
  const btn=document.createElement('button');
  btn.textContent='Menu Principal';
  btn.style.cssText='position:absolute;top:60%;left:50%;transform:translate(-50%,-50%);padding:14px 36px;font-size:18px;background:#6366f1;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700';
  btn.onclick=()=>{state='menu';render();};
  ui.appendChild(btn);
}

// --- UTILITY ---
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  return arr;
}

function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
}

function wrapText(ctx,text,x,y,maxWidth,lineHeight){
  const words=text.split(' ');
  let line='';
  for(let n=0;n<words.length;n++){
    const testLine=line+words[n]+' ';
    if(ctx.measureText(testLine).width>maxWidth&&n>0){
      ctx.fillText(line,x,y);line=words[n]+' ';y+=lineHeight;
    } else {line=testLine;}
  }
  ctx.fillText(line,x,y);
}

// --- WINDOW RESIZE ---
window.addEventListener('resize',()=>{resize();render();});
