# ArcanaEternal

**Roguelike Deckbuilder Card Game — FF-style AI Art**

## Concept

A roguelike deckbuilder with Final Fantasy-inspired aesthetics and AI-generated art. Build your deck, battle through procedurally generated encounters, and collect arcane cards in an eternal cycle of combat and discovery.

## Vision

- **Genre**: Roguelike Deckbuilder (Slay the Spire meets Final Fantasy Tactics)
- **Art Style**: AI-generated FF-style character art, card illustrations, and environments
- **Core Loop**: Battle → Collect Cards → Upgrade Deck → Face Stronger Enemies → Repeat
- **Unique Hook**: Cards are imbued with "Arcana" — elemental affinities that combo in FF-style Job system
- **Permadeath with Meta-Progression**: Unlock permanent card pools, starters, and relics between runs

## Core Mechanics (WIP)

- **Turn-based card combat** — Energy system (3/turn), hand of 5, draw from shuffled deck
- **Arcana Affinities** — Fire, Ice, Lightning, Earth, Wind, Light, Dark — combo bonuses for matching
- **Job Classes** — Warrior, Mage, Thief, White Mage, Black Mage, Dragoon, etc. (FF-inspired)
- **Relic System** — Permanent buffs that modify card behavior (à la Slay the Spire)
- **Procedural Encounters** — Elites, Bosses, Events, Shops, Rest Sites

## Tech Stack (TBD)

To be decided between:
- **Unity** (C#) — Cross-platform, rich ecosystem, asset store
- **Godot** (GDScript/C#) — Lightweight, open source, good 2D support
- **Web** (HTML5 + Phaser.js) — Instant-play, no install, easy sharing

## Repo Structure (Proposed)

```
ArcanaEternal/
├── docs/              # Game design doc, mechanics, lore
├── design/            # Wireframes, mockups, card templates
├── assets/            # AI-generated art (ComfyUI outputs)
│   ├── characters/
│   ├── cards/
│   ├── environments/
│   └── ui/
├── src/               # Source code (TBD engine)
├── tools/             # Scripts, ComfyUI workflows, prompts
└── README.md
```

## Roadmap

| Phase | Goal |
|-------|------|
| 0 — Design | Finalize mechanics, card list, lore bible |
| 1 — Prototype | Playable combat loop (paper or simple digital) |
| 2 — Vertical Slice | 1 full run, 20+ cards, 1 boss, basic UI |
| 3 — Art Pass | Generate all card art via ComfyUI |
| 4 — Alpha | Complete content, balance, polish |

## Credits

- **Creator**: Yoshy (Seyferkun)
- **AI Art**: ComfyUI + custom workflows
- **Development**: Laptop Hermes + VPS Hermes collaboration

---

*This repo is actively developed. See `docs/` for detailed game design.*
