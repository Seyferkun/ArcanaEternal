# Arcana Eternal — Game Design Document (GDD)

## 1. Visão Geral

**Gênero:** Roguelike Deckbuilder Card Game  
**Estilo Visual:** Final Fantasy (FF TCG / FFXIV)  
**Plataforma:** Web (HTML5 Canvas)  
**Público-alvo:** Fãs de card games e RPGs

## 2. Mecânicas Principais

### 2.1 Sistema de Combate
- **Turn-based** com sistema de energia (3 mana/turno)
- **Mão de 5 cartas** por turno
- **Tipos de carta:** Ataque, Habilidade, Poder (permanente)
- **Status Effects:** Fraco, Vulnerável, Veneno, Escudo
- **Inimigos** com intenções visíveis (atacar/defender)

### 2.2 Sistema de Cartas
- **63 cartas únicas** distribuídas em 7 jobs
- **Custo:** 0-6 mana
- **Efeitos:** Dano, bloqueio, cura, compra de cartas, buffs/debuffs
- **Raridade:** Comum, Incomum, Rara, Lendária

### 2.3 Jobs (Classes)
1. **Warrior** — Ataques físicos, bloqueio, força
2. **Black Mage** — Magias elementais (fogo, gelo, raio)
3. **Thief** — Ataques rápidos, esquiva, roubo
4. **White Mage** — Cura, proteção, luz divina
5. **Dragoon** — Ataques de lança, pulo, perfuração
6. **Dark Knight** — Dano sombrio, roubo de vida, sacrifício
7. **Bard** — Buffs, debuffs, suporte

### 2.4 Mapa Procedural
- **3 andares** por run
- **Tipos de nó:** Combate, Elite, Boss, Evento, Loja, Descanso
- **Caminhos ramificados** com escolha do jogador

### 2.5 Progressão
- **Meta-progressão:** Desbloqueio de cartas, relíquias, jobs
- **Relíquias:** Efeitos permanentes durante a run
- **Gold:** Moeda para compras na loja

## 3. Arte e Design Visual

### 3.1 Estilo
- **Inspiração:** FF TCG, FFXIV, FFT
- **Paleta:** Dourado, azul escuro, roxo, vermelho
- **UI:** Molduras ornamentadas, partículas brilhantes, glow effects
- **Fontes:** Cinzel (títulos), Lato (texto)

### 3.2 Assets Necessários

#### Cards (63 total)
- Card back design
- Card frame (gold, silver, bronze por raridade)
- Card art para cada carta (ilustração temática)

#### Enemies (20+ sprites)
- Normais: Goblin, Skeleton, Slime, Wolf, Spider, Bat, Imp, Ghost, Orc, Mushroom
- Elites: Dark Paladin, Twin Assassins, Golem, Vampire
- Bosses: Lich King, Red Dragon, Demon Lord

#### Backgrounds (5 cenas)
- Forest (floresta mística)
- Desert (deserto com ruínas)
- Ice Cave (caverna de gelo)
- Castle (castelo sombrio)
- Netherworld (mundo inferior)

#### UI Elements
- Ícones: Ataque, Defesa, Compra, Ouro, HP, Mana
- Botões: Normal, Gold, Red, Green
- Barras: HP, Energia
- Molduras: Card frames, painéis

### 3.3 Animações
- Card hover (elevação + brilho)
- Card play (movimento + fade)
- Damage numbers (flutuantes)
- Partículas (menu, combate)
- Transições de tela (fade)

## 4. Telas do Jogo

### 4.1 Menu Principal
- Título com glow
- Partículas douradas
- Botão "Novo Jogo"
- Link para "Créditos"

### 4.2 Mapa
- Nós conectados por linhas
- Ícones por tipo de nó
- Barra de HP e ouro
- Botão "Ver Baralho"

### 4.3 Combate
- Área do inimigo (sprite + HP bar + intenção)
- Área do jogador (retrato + HP + energia)
- Mão de cartas (com arte)
- Botão "Fim do Turno"
- Log de combate

### 4.4 Recompensas
- 3 cartas para escolher
- Arte grande com moldura
- Botão "Pular"

### 4.5 Loja
- Cartas para comprar (15 gold)
- Cartas para vender (5-15 gold)
- Botão "Sair"

### 4.6 Descanso
- Opção "Descansar" (+30% HP)
- Opção "Melhorar Carta" (+2 dano)

### 4.7 Deck Viewer
- Grid de todas as cartas
- Molduras por raridade
- Botão "Voltar"

### 4.8 Game Over / Victory
- Título grande
- Estatísticas da run
- Botão "Menu Principal"

## 5. Balanceamento

### 5.1 Cartas
- **Custo 0:** 2-4 dano, 1-2 bloqueio
- **Custo 1:** 4-8 dano, 3-5 bloqueio, 1 compra
- **Custo 2:** 8-14 dano, 6-10 bloqueio, 2 compras, efeitos
- **Custo 3+:** 14+ dano, efeitos poderosos

### 5.2 Inimigos
- **Normais:** 20-50 HP, 4-12 dano
- **Elites:** 50-80 HP, 10-16 dano, habilidades especiais
- **Bosses:** 100-150 HP, 16-22 dano, habilidades únicas

### 5.3 Progressão
- **Andar 1:** Inimigos normais (20-35 HP)
- **Andar 2:** Inimigos normais + elites (35-60 HP)
- **Andar 3:** Elite + Boss (60-150 HP)

## 6. Especificações Técnicas

### 6.1 Performance
- 60 FPS em dispositivos modernos
- Tempo de carga < 3 segundos
- Assets totais < 50MB (comprimidos)

### 6.2 Compatibilidade
- Chrome, Firefox, Safari, Edge (últimas 2 versões)
- Desktop e mobile (responsivo)
- Touch support para mobile

### 6.3 Save/Load
- LocalStorage para progresso
- Save automático após cada combate

## 7. Roadmap

### Fase 1 (Atual) — MVP
- ✅ Menu principal
- ✅ Mapa com nós
- ✅ Combate básico
- ✅ 98 assets de arte
- ✅ Card art mapping

### Fase 2 — Polish
- 🎨 Card frames melhorados
- 🎨 Animações de combate
- 🎨 Efeitos sonoros
- 🎨 Partículas e VFX

### Fase 3 — Conteudo
- 📝 Mais cartas (100+)
- 📝 Mais inimigos (30+)
- 📝 Mais relíquias (20+)
- 📝 Eventos aleatórios

### Fase 4 — Multiplayer
- 🏆 Leaderboard
- 🏆 Runs diárias
- 🏆 Conquistas

---

*Documento criado por Laptop Hermes. Última atualização: 2026-06-16.*
