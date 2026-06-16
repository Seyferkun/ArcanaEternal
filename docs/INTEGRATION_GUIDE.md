# Arcana Eternal — Integration Guide for VPS Hermes

## Overview
This document describes how to integrate the art assets and visual improvements into the game engine.

## File Structure
```
ArcanaEternal/
├── index.html          # Main HTML (scripts at end of body)
├── style.css           # FF-style CSS with variables
├── game.js             # Complete game engine
├── assets.js           # Asset loader + mappings
├── content.js          # Extended card/enemy database
├── effects.js          # Audio & particle effects
└── assets/
    ├── cards/          # 85+ card images
    ├── characters/     # 4 character portraits
    ├── enemies/        # 18+ enemy sprites
    ├── backgrounds/    # 5 background scenes
    └── ui/             # 6 UI icons
```

## Integration Steps

### 1. Replace game.js
The new game.js includes:
- Complete combat system (playCard, endTurn, enemyTurn)
- Map with node selection
- Reward screen (pick 3 cards)
- Shop system (buy/sell cards)
- Rest site (heal/upgrade)
- Deck viewer
- Game Over / Victory screens
- Art integration (card art + enemy sprites)

### 2. Replace assets.js
The new assets.js includes:
- 85 card image paths
- 18 enemy sprite paths
- 10 background paths (5 original + 5 enhanced)
- 6 UI icon paths
- Card frame paths (gold, silver, bronze)
- `getCardArt(cardId)` — maps card IDs to asset keys
- `getEnemySprite(enemyKey)` — maps enemy keys to asset keys
- `loadAssets(callback)` — loads all images with timeout fallback

### 3. Update index.html
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Arcana Eternal</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<canvas id="game"></canvas>
<div id="ui-layer"></div>
<script src="assets.js"></script>
<script src="game.js"></script>
<script src="content.js"></script>
<script src="effects.js"></script>
<script>
window.addEventListener('DOMContentLoaded', function() {
  try {
    if (typeof init === 'function') init();
    if (typeof resize === 'function') resize();
    if (typeof loadAssets === 'function') {
      loadAssets(function() {
        if (typeof render === 'function') render();
      });
    }
  } catch(e) {
    document.body.innerHTML = '<h1 style="color:red;padding:40px">Erro: ' + e.message + '</h1>';
  }
});
</script>
</body>
</html>
```

### 4. Card Art Mapping
Cards are mapped by ID to asset files:
- Warrior: `golpe_rapido` → `W01_strike`, `espadada` → `W02_defend`, etc.
- Black Mage: `fireball` → `BM01_fireball`, `ice_shard` → `BM02_ice_shard`, etc.
- Thief: `quick_stab` → `T01_quick_stab`, `backstab` → `T03_backstab`, etc.
- White Mage: `holy_light` → `WM01_holy_light`, `cure` → `WM03_cure`, etc.
- Dragoon: `thrust` → `D01_thrust`, `jump` → `D02_jump`, etc.
- Dark Knight: `soul_drain` → `DK01_soul_drain`, etc.
- Bard: `song_of_courage` → `B01_song_of_courage`, etc.
- Neutral: `arcane_intellect` → `N01_arcane_intellect`, etc.

### 5. Enemy Sprite Mapping
Enemies are mapped by key:
- `skeleton` → `skeleton`, `bat` → `wolf`, `goblin` → `goblin`, etc.
- Bosses: `lich` → `boss_lich`, `dragon` → `boss_dragon`, `void_entity` → `boss_demon`

### 6. CSS Variables
The new CSS uses CSS variables for easy theming:
```css
:root {
  --bg: #0b0f19;
  --gold: #fbbf24;
  --blue: #6366f1;
  --red: #ef4444;
  --green: #22c55e;
  /* ... */
}
```

### 7. Fonts
Uses Google Fonts:
- **Cinzel** — for titles and buttons
- **Lato** — for body text

Add to HTML head:
```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
```

## Testing Checklist
- [ ] Menu loads with particles and glow
- [ ] "Novo Jogo" starts a new run
- [ ] Map shows 3 nodes per floor
- [ ] Combat loads with enemy sprite and card hand
- [ ] Cards show art images
- [ ] Playing cards works (energy, damage, discard)
- [ ] End Turn triggers enemy attack
- [ ] Rewards screen shows 3 cards to pick
- [ ] Shop shows buy/sell options
- [ ] Rest site heals or upgrades
- [ ] Deck viewer shows all cards
- [ ] Game Over / Victory screens work

## Known Issues
- `cache-buster.js` referenced but doesn't exist (404 error in console, non-blocking)
- Some card arts may not load (fallback to colored rectangles)
- Fonts may take a moment to load on first visit

## Next Steps
1. Generate remaining card arts (28 more)
2. Generate enhanced enemy sprites (12 more)
3. Generate additional backgrounds (3 more)
4. Add UI elements (buttons, frames, particles)
5. Balance combat (adjust damage/HP values)
6. Add sound effects
7. Add more cards to content.js database

---

*Integration guide created by Laptop Hermes. Last updated: 2026-06-16.*
