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
    runData = { floor: 1, hp: 70, maxHp: 70, gold: 50, path: generateMap() };
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
    btn.onclick = () => { alert('Clicou: ' + node.type); };
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

window.addEventListener('resize', resize);
