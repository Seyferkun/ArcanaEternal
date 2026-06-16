# Arcana Eternal — Style Guide

## Paleta de Cores

### Cores Principais
- **Background:** `#0b0f19` (azul muito escuro)
- **Surface:** `#151f32` (azul escuro)
- **Border:** `#1e293b` (cinza azulado)
- **Text:** `#f1f5f9` (branco gelo)
- **Text Dim:** `#64748b` (cinza)

### Cores de Acento
- **Gold:** `#fbbf24` (dourado FF)
- **Blue:** `#6366f1` (índigo)
- **Red:** `#ef4444` (vermelho)
- **Green:** `#22c55e` (verde)
- **Purple:** `#a855f7` (roxo)

### Cores por Elemento
- **Fogo:** `#ef4444` (vermelho/laranja)
- **Gelo:** `#3498db` (azul claro)
- **Raio:** `#f1c40f` (amarelo)
- **Terra:** `#27ae60` (verde)
- **Vento:** `#1abc9c` (turquesa)
- **Holy:** `#fbbf24` (dourado)
- **Dark:** `#8e44ad` (roxo escuro)

### Cores por Raridade
- **Common:** `#9ca3af` (cinza)
- **Uncommon:** `#22c55e` (verde)
- **Rare:** `#3b82f6` (azul)
- **Legendary:** `#fbbf24` (dourado)

## Tipografia

### Fontes
- **Títulos:** `Cinzel, serif` (estilo FF)
- **Texto:** `Lato, sans-serif` (legível)
- **Números:** `Lato, monospace` (alinhado)

### Tamanhos
- **Título principal:** 56px, bold, Cinzel
- **Subtítulo:** 18px, regular, Lato
- **Título de seção:** 28px, bold, Cinzel
- **Texto corpo:** 14-16px, regular, Lato
- **Labels:** 12-13px, bold, Lato
- **Botões:** 18-22px, bold, Cinzel

## Componentes UI

### Botões
```css
/* Normal */
padding: 16px 40px;
font: bold 18px Cinzel;
background: linear-gradient(135deg, #4338ca, #6366f1);
color: #fff;
border: 2px solid #fbbf24;
border-radius: 8px;
box-shadow: 0 4px 20px rgba(99,102,241,0.4);

/* Hover */
transform: translateY(-2px);
box-shadow: 0 6px 30px rgba(99,102,241,0.6);

/* Gold variant */
background: linear-gradient(135deg, #b45309, #fbbf24);
color: #000;
border-color: #fff;

/* Red variant */
background: linear-gradient(135deg, #991b1b, #ef4444);

/* Green variant */
background: linear-gradient(135deg, #166534, #22c55e);
```

### Cards
```css
/* Card frame */
border: 2px solid #fbbf24;
border-radius: 8px;
box-shadow: 0 4px 15px rgba(0,0,0,0.5);

/* Card hover */
transform: translateY(-8px) scale(1.05);
box-shadow: 0 8px 30px rgba(251,191,36,0.4);
border-color: #fff;

/* Card disabled */
opacity: 0.5;
cursor: not-allowed;
border-color: #333;
```

### Barras
```css
/* HP bar */
height: 12px;
border-radius: 6px;
background: #333;
border: 1px solid #1e293b;

/* HP fill (gradient) */
background: linear-gradient(90deg, #991b1b, #ef4444);

/* Energy display */
font: bold 24px Cinzel;
color: #fbbf24;
text-shadow: 0 0 10px rgba(251,191,36,0.5);
```

### Nodes (Mapa)
```css
/* Node circle */
width: 70px;
height: 70px;
border-radius: 50%;
border: 3px solid #fbbf24;
box-shadow: 0 0 20px rgba(251,191,36,0.2);

/* Node hover */
transform: scale(1.15);
box-shadow: 0 0 30px rgba(251,191,36,0.5);
```

## Efeitos Visuais

### Glow
```css
text-shadow: 0 0 20px currentColor;
filter: drop-shadow(0 0 10px rgba(251,191,36,0.5));
```

### Partículas
- Douradas (`rgba(251,191,36,0.3)`)
- Tamanho: 1-4px
- Quantidade: 30-50
- Animação: flutuação lenta

### Gradientes
```css
/* Background radial */
radial-gradient(circle, #1a1a3e, #0b0f19);

/* Botão */
linear-gradient(135deg, #4338ca, #6366f1)

/* Card frame gold */
linear-gradient(135deg, #b45309, #fbbf24, #b45309)
```

### Animações
```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Pulse */
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(251,191,36,0.3); }
  50% { box-shadow: 0 0 40px rgba(251,191,36,0.6); }
}

/* Glow */
@keyframes glow {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.3); }
}
```

## Layout

### Canvas
- Fullscreen: `width: 100vw; height: 100vh`
- UI layer: `position: absolute; top: 0; left: 0`
- Responsive: `resize()` on window resize

### Combate
- **Área do inimigo:** top 150px, centered
- **Área do jogador:** bottom 180px, centered
- **Mão de cartas:** bottom 200px, centered
- **Energia:** bottom 20px, centered
- **Fim do Turno:** bottom-right

### Mapa
- **Nós:** vertical line, centered
- **Espaçamento:** equal between nodes
- **Bottom bar:** 80px height, HP + gold + deck button

### Deck Viewer
- **Grid:** auto-fit columns, 120px card width
- **Gap:** 10px
- **Start Y:** 80px (below title)

## Cards Design

### Card Frame
- **Border:** 2-3px solid (gold/silver/bronze by rarity)
- **Corner radius:** 8px
- **Inner art area:** centered, with padding
- **Name bar:** bottom 30px, semi-transparent

### Card Back
- **Pattern:** FF-style geometric
- **Color:** Deep blue + gold accents
- **Border:** Gold frame

### Card Art
- **Size:** 768x1024 (portrait)
- **Style:** Anime/fantasy illustration
- **Theme:** Matches card effect (fire, ice, etc.)
- **No text or borders** in the art itself

## Sprites

### Enemy Sprites
- **Size:** 768x1024 (portrait)
- **Style:** Anime illustration, FF-style
- **Background:** Dark/transparent
- **Pose:** Full body, combat-ready
- **Quality:** High detail, consistent style

### Character Portraits
- **Size:** 70x70 (in-game)
- **Style:** Anime headshot
- **Border:** Gold frame with glow

## Backgrounds

### Scenes
1. **Forest:** Ancient trees, mushrooms, fog, fireflies
2. **Desert:** Sand dunes, ruins, heat shimmer
3. **Ice Cave:** Crystals, stalactites, aurora
4. **Castle:** Gothic architecture, torches, throne room
5. **Netherworld:** Floating rocks, lava, red clouds

### Specs
- **Size:** 1920x1080 (landscape)
- **Style:** Wide landscape, no characters
- **Quality:** High detail, atmospheric

---

*Guia de estilo criado por Laptop Hermes. Última atualização: 2026-06-16.*
