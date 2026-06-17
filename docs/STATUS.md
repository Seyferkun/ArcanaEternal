# Arcana Eternal — Estado Atual

## Versão: v2.4
## URL: https://seyferkun.github.io/ArcanaEternal/
## Motor: Phaser 3.80.1

## Funcionalidades Implementadas

### Sistema de Cartas
- 63 cartas únicas em 7 jobs
- 3 tipos: Ataque, Habilidade, Poder
- 4 raridades: Comum, Incomum, Rara, Lendária
- Custo: 0-5 mana
- Efeitos: Dano, bloqueio, cura, compra, buffs, debuffs

### Jobs (7)
1. Warrior — Ataques físicos, bloqueio, força
2. Black Mage — Magias elementais (fogo, gelo, raio)
3. Thief — Ataques rápidos, esquiva, veneno
4. White Mage — Cura, proteção, luz divina
5. Dragoon — Ataques de lança, pulo, perfuração
6. Dark Knight — Dano sombrio, roubo de vida, sacrifício
7. Bard — Buffs, debuffs, suporte

### Inimigos (13)
- Normais: Skeleton, Slime, Goblin, Wolf, Spider, Ghost, Dark Mage (7)
- Elites: Golem, Dark Knight (2)
- Bosses: Dragon, Lich, Demon Lord (3)

### Relíquias (9)
- Comum: Anel de Força, Amuleto de Vitalidade
- Incomum: Botas de Velocidade, Anel de Regeneração
- Rara: Espada da Fúria, Escudo de Luz, Orbe da Sabedoria
- Lendária: Coroa dos Reis

### Cenas (10)
1. BootScene — Loading screen com barra de progresso
2. MenuScene — Menu principal com partículas animadas
3. MapScene — Mapa procedural com 3 andares
4. CombatScene — Combate turn-based completo
5. RewardScreen — Escolha de carta ou relíquia
6. ShopScene — Comprar/vender cartas
7. RestScene — Curar ou melhorar carta
8. EventScene — Eventos aleatórios
9. DeckScene — Ver todas as cartas
10. GameOver/Victory — Ecrãs finais

### Efeitos Sonoros
- Jogar carta, dano, cura, vitória, derrota, botão

### Arte
- 66+ imagens de cartas
- 18 sprites de inimigos
- 5 backgrounds
- 3 card frames (gold, silver, bronze)
- 16 artes elementais

## Próximos Passos
- Gerar mais artes de cartas com ComfyUI
- Adicionar mais inimigos e bosses
- Implementar achievements
- Adicionar animações de combate mais complexas
- Balanceamento contínuo
