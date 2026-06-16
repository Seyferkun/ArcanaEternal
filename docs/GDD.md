# Arcana Eternal — Game Design Document (GDD)

## Elevator Pitch

A roguelike deckbuilder card game with Final Fantasy-inspired aesthetics. Build your deck, battle through procedurally generated encounters, and collect arcane cards in an eternal cycle of combat and discovery.

## Core Pillars

1. **Accessible Depth** — Easy to learn, hard to master. Like Slay the Spire.
2. **FF Nostalgia** — Job system, mana crystals, summons, and a rich fantasy world.
3. **AI-Generated Art** — All card art, characters, and environments generated via ComfyUI.
4. **Browser-Based** — Playable on any device with a web browser. No install.

## Genre & Inspiration

- **Primary**: Roguelike Deckbuilder (Slay the Spire, Darkest Dungeon)
- **Secondary Aesthetic**: Final Fantasy (I through XVI), FFT, FFXIV
- **Tertiary**: Magic: The Gathering, Hearthstone, Monster Train

---

## Game Overview

### Core Loop

```
Run Start → Build Starter Deck → Map Navigation → Combat → Rewards → 
Card Pick → Shop/Rest → Next Encounter → Boss → Run End → Unlock → Repeat
```

### Win Condition

Defeat the final boss (Demon Lord) with the constructed deck.

### Lose Condition

Health reaches 0 at any point during a run.

---

## Combat System

### Turn Structure

1. **Start of Turn**: Draw 5 cards, gain 3 mana, enemy intent shown
2. **Player Phase**: Play cards (cost mana), use abilities, end turn
3. **Enemy Phase**: Enemy executes their intended action
4. **End of Turn**: Discard remaining hand, check win/lose

### Card Types

| Type | Color | Description |
|------|-------|-------------|
| **Attack** | Red | Deal damage to enemy |
| **Skill** | Blue | Buff, debuff, draw, block |
| **Power** | Purple | Permanent passive effect for the rest of combat |
| **Summon** | Gold | Call a creature to fight alongside you |

### Mana System

- Start each turn with 3 mana
- Cards cost 0-6 mana
- Some cards generate mana
- Unused mana does NOT carry over

### Block & Damage

- **Block**: Temporary shield for one turn (resets each turn)
- **HP**: Permanent health for the duration of a run
- **Intentions**: Enemies show their next action (attack type, damage, buff, etc.)

### Status Effects

| Effect | Description |
|--------|-------------|
| **Poison** | Takes damage at start of each turn, stacks |
| **Burn** | Takes damage when attacked, decays |
| **Weak** | Deals 25% less damage |
| **Vulnerable** | Takes 25% more damage |
| **Strength** | Increases damage dealt |
| **Dexterity** | Increases block gained |
| **Regenerate** | Heals at end of each turn |
| **Arcane Shield** | Absorbs next X damage |

---

## Job System (FF-Inspired)

Each run, the player starts with a **Job** that determines their starter deck and special ability.

| Job | Element | Starter Theme | Special |
|-----|---------|--------------|---------|
| **Warrior** | Physical | Attack + Block cards | +2 Strength at start of each combat |
| **Black Mage** | Fire/Ice/Lightning | High damage spells | Deal 3 random elemental damage to all enemies |
| **Thief** | Wind | Fast cards, draw, steal | Draw 2 extra cards on first turn |
| **White Mage** | Holy | Healing, protection, light damage | Heal 5 HP at start of each combat |
| **Dragoon** | Earth | Jump attacks, spears | Ignore enemy block |
| **Dark Knight** | Dark | Life steal, sacrifice damage | Gain 2 HP when dealing damage |
| **Bard** | Neutral | Support, buffs, debuffs | All allies gain +1 Strength |

---

## Card Design

### Base Cards (Common, in starter deck)

Each Job has 10 base cards:

**Warrior Example:**
1. Strike (0 mana) — Deal 6 damage
2. Defend (1 mana) — Gain 5 block
3. Heavy Blow (2 mana) — Deal 10 damage, apply 1 Weak
4. Shield Bash (1 mana) — Deal 4 damage, gain 4 block
5. Battle Cry (1 mana) — Gain 2 Strength

### Reward Cards (Uncommon/Rare, picked after combat)

60+ unique cards across all jobs, including cross-job cards.

### Card Rarity

| Rarity | Color | Drop Rate | Notes |
|--------|-------|-----------|-------|
| Common | Gray | 60% | Basic attacks and skills |
| Uncommon | Green | 25% | More powerful, synergistic |
| Rare | Blue | 12% | Strong effects,build-defining |
| Legendary | Gold | 3% | Run-winning power |

---

## Enemy Design

### Enemy Types

| Type | Count | Description |
|------|-------|-------------|
| **Basic** | 15 | Low HP, simple attacks |
| **Elite** | 3 | Higher HP, multiple abilities |
| **Boss** | 3 | Unique mechanics, high HP, 2 phases |

### Enemy Examples

| Enemy | Type | HP | Abilities |
|-------|------|----|-----------|
| Goblin | Basic | 12-18 | Strike (6), Rage (+2 Str) |
| Skeleton | Basic | 15-20 | Bone Slash (8), Reassemble (heal 5) |
| Slime | Basic | 20-30 | Acid Splash (4+Poison), Split |
| Wolf | Basic | 10-15 | Bite (7), Pack Tally (summon wolf) |
| Dark Mage | Basic | 18-25 | Shadow Bolt (10), Dark Shield (block+weak) |
| Golem | Basic | 30-40 | Smash (12), Stone Skin (block 10) |
| Orc | Basic | 20-30 | Cleave (9), Warcry (+3 Str) |
| Harpy | Basic | 12-18 | Talon Slash (6), Wind Gust (draw denial) |
| Ghost | Basic | 15-22 | Haunt (5+grave), Phase (untouchable 1 turn) |
| Fire Elemental | Basic | 20-28 | Flame Burst (8+Burn), Inferno (3x3 Burn) |
| Spider | Basic | 15-20 | Venom Bite (5+Poison 2), Web (weak 2) |
| Bandit | Basic | 14-19 | Dagger (6), Pilfer (steal gold) |
| Treant | Basic | 25-35 | Root Slam (10), Regenerate (5/turn) |
| Merman | Basic | 18-24 | Trident (8), Tidal Wave (6 all) |
| Dark Knight | Elite | 50-65 | Soul Blade (15), Dark Shield (block 12) |
| Lich King | Boss | 120 | Death Bolt (18), Summon Dead (2 skeletons), Phase 2: Necro Storm (8 all) |
| Red Dragon | Boss | 150 | Fire Breath (20), Wing Gust (10+weak), Phase 2: Inferno (5x6) |
| Demon Lord | Boss | 180 | Demon Strike (25), Dark Ritual (heal 30), Phase 2: Apocalypse (15 all) |

---

## Map Design

### Map Structure

- **Length**: 15-20 nodes per run
- **Branching**: Player chooses path at each junction
- **Depth**: 3-4 levels before boss

### Node Types

| Node | Icon | Description |
|------|------|-------------|
| **Combat** | ⚔️ | Fight 1-3 basic enemies |
| **Elite** | 💀 | Fight 1 elite enemy, better rewards |
| **Boss** | 👑 | Fight 1 boss (end of act) |
| **Shop** | 🛒 | Buy/sell cards and relics |
| **Rest** | 🔥 | Heal 30% HP or upgrade a card |
| **Event** | ❓ | Random encounter, various outcomes |
| **Treasure** | 💎 | Free relic or gold |

---

## Progression System

### Within a Run

- **Gold**: Earned from combat, spent at shops
- **Health**: Lost in combat, partially healed at rest sites
- **Deck**: Grows from rewards, can be trimmed at shops
- **Relics**: Permanent buffs for the duration of the run

### Meta-Progression (Between Runs)

- **Unlocked Cards**: New cards added to the reward pool
- **Unlocked Relics**: New relics that can appear in runs
- **Unlocked Jobs**: Additional starting jobs
- **Ascension Levels**: Difficulty modifiers unlocked after first win |

---

## Art Direction

### Style

- **Character Art**: High-quality anime/FF style (FFXIV, FFT)
- **Card Art**: Consistent style across all cards, AI-generated with ComfyUI
- **UI**: Clean, dark theme with FF-inspired gold accents
- **Enemies**: Each enemy has a unique portrait/sprite
- **Backgrounds**: Themed per act/area (forest, desert, castle, netherworld)

### Color Palette

| Element | Color |
|---------|-------|
| Mana | Blue |
| Attack | Red |
| Skill | Blue/Green |
| Power | Purple |
| Summon | Gold |
| Background UI | Dark navy/black |
| Accent | Gold |

---

## Technical Specifications

### Platform

- HTML5 + CSS3 + JavaScript (vanilla, no frameworks)
- Runs in any modern browser
- Responsive: desktop, tablet, mobile
- Save/Load via localStorage

### Performance Target

- 60 FPS on mid-range devices
- Load time < 2 seconds
- Total asset size < 50MB (compressed)

### Asset Specs

| Asset | Size | Format |
|-------|------|--------|
| Card illustrations | 768x1024 | PNG (transparent) |
| Character portraits | 768x1024 | PNG |
| Enemy sprites | 768x1024 | PNG |
| UI icons | 512x512 | PNG |
| Backgrounds | 1920x1080 | JPG |
| Boss art | 1024x1024 | PNG |

---

## Sound Design (Placeholder Phase)

- Battle music (looping)
- Card play SFX
- Damage/death SFX
- Victory/defeat jingles
- UI click sounds

---

## Monetization Strategy

- **Open Source** on GitHub
- **Free to play** via GitHub Pages
- **Optional**: itch.io demo with link to full game
- **Future**: Premium DLC card packs (if community supports)

---

## Development Roadmap

| Phase | Duration | Goal |
|-------|----------|------|
| 0 — GDD | Done | This document |
| 1 — Core Engine | 3-5 days | Playable combat loop (HTML5) |
| 2 — Art Pipeline | 5-7 days | All assets generated |
| 3 — Integration | 3-4 days | Art + engine + polish |
| 4 — Balance | 3-5 days | Playtesting + tuning |
| 5 — Launch | 2-3 days | Deploy + announce |

**Total estimated time: ~17 working days**

---

*Document created by Laptop Hermes + VPS Hermes. Last updated: 2026-06-16.*
