# PROGRESS — Registre

Suivi de rédaction et journal des décisions. Voir `SPEC.md` pour le cahier des charges.

Statuts : `à faire` · `ébauche` · `rédigé` · `vérifié`
Une page passe à `vérifié` quand elle coche toute la liste du §13 de SPEC.md.

**Total prévu : 140 pages rédigées + 250 termes de glossaire.**

---

## Phase 0 — Fondations

| Élément | Statut |
|---|---|
| Node 22 (nvm) | ✅ fait — v22.23.2 |
| Projet Astro 7.2.4 initialisé | ✅ fait |
| Vault Obsidian `content/` + config liens markdown | ✅ fait |
| Vérification de l'API Astro 7 (collections, remark, rendu) | ✅ fait — lue dans les types, pas de mémoire |
| Schémas Zod des collections | ✅ fait |
| Design system (tokens, typo, thème sombre/clair) | ✅ fait |
| Layouts + navigation + sommaire + fil d'Ariane | ✅ fait |
| Les 4 callouts (`INFO`, `CIEL`, `PIÈGE`, `À VÉRIFIER`) | ✅ fait |
| Composant de données live OKX | ✅ fait — testé, y compris l'état dégradé |
| Recherche Pagefind (`/` et `Ctrl+K`) | ✅ fait — testée dans le navigateur |
| Déploiement GitHub Pages | ✅ en ligne sur https://skavyoy8.github.io |
| Vérificateur de liens internes (`npm run liens`) | ✅ fait — bonus |
| **Page témoin 1** — `/okx/on-chain-off-chain` | **rédigé — à valider** |
| **Page témoin 2** — `/fondamentaux/hachage` | **rédigé — à valider** |
| **Page témoin 3** — `/cryptos/btc` | **rédigé — à valider** |

> ⛔ **Point d'arrêt.** Les 3 pages témoins doivent être validées par Luke avant d'écrire la 4e.

---

## Phase 1 — OKX (§7.3) — priorité de lecture

| # | Page | Chemin | Statut |
|---|---|---|---|
| 1 | Ce qu'est un exchange centralisé | `/okx/exchange-centralise` | rédigé |
| 2 | **On-chain vs off-chain** | `/okx/on-chain-off-chain` | rédigé |
| 3 | Dépôts et retraits | `/okx/depots-retraits` | rédigé |
| 4 | Le choix du réseau | `/okx/choix-du-reseau` | rédigé |
| 5 | Custodial vs non-custodial | `/okx/custodial-non-custodial` | rédigé |
| 6 | App OKX vs OKX Wallet | `/okx/app-vs-wallet` | à faire |
| 7 | Proof of Reserves | `/okx/proof-of-reserves` | rédigé |
| 8 | Comptes de trading et de financement | `/okx/comptes` | rédigé |
| 9 | KYC | `/okx/kyc` | à faire |
| 10 | Cadre réglementaire (MiCA, PSAN/AMF) | `/okx/cadre-reglementaire` | à faire |
| 11 | L'API OKX v5 | `/okx/api-v5` | rédigé |
| 12 | Les frais chez OKX | `/okx/frais` | rédigé |
| 13 | OKX Pay et la carte | `/okx/pay-et-carte` | à faire |
| 14 | Historique et controverses | `/okx/historique-controverses` | à faire |
| 15 | ➕ Étude de cas : la faillite de FTX | `/okx/etude-ftx` | à faire |

## Phase 2 — Fondamentaux (§7.1)

| # | Page | Chemin | Statut |
|---|---|---|---|
| 1 | Qu'est-ce qu'une blockchain | `/fondamentaux/blockchain` | à faire |
| 2 | Les fonctions de hachage | `/fondamentaux/hachage` | rédigé |
| 3 | Cryptographie asymétrique | `/fondamentaux/cryptographie-asymetrique` | à faire |
| 4 | Signatures numériques | `/fondamentaux/signatures` | à faire |
| 5 | ➕ Adresses et checksums (bech32, EIP-55) | `/fondamentaux/adresses` | rédigé |
| 6 | Seed phrase et dérivation (BIP39/BIP32) | `/fondamentaux/seed-phrase` | à faire |
| 7 | Le réseau pair-à-pair | `/fondamentaux/reseau-p2p` | à faire |
| 8 | Le problème du consensus | `/fondamentaux/consensus` | à faire |
| 9 | Proof of Work | `/fondamentaux/proof-of-work` | rédigé |
| 10 | Proof of Stake | `/fondamentaux/proof-of-stake` | à faire |
| 11 | Anatomie d'une transaction | `/fondamentaux/transaction` | à faire |
| 12 | ➕ Unités et précision (satoshi, wei, decimals) | `/fondamentaux/unites` | à faire |
| 13 | Les frais de réseau | `/fondamentaux/frais-reseau` | à faire |
| 14 | Mempool et confirmations | `/fondamentaux/mempool` | à faire |
| 15 | ➕ Nonce, RBF et transaction bloquée | `/fondamentaux/nonce-rbf` | à faire |
| 16 | Forks | `/fondamentaux/forks` | à faire |
| 17 | Le trilemme | `/fondamentaux/trilemme` | à faire |
| 18 | Explorateurs de blocs | `/fondamentaux/explorateurs` | à faire |

## Phase 3 — Marchés (§7.4) + 100 premiers termes du glossaire

| # | Page | Chemin | Statut |
|---|---|---|---|
| 1 | Qu'est-ce qu'un marché | `/marches/marche` | à faire |
| 2 | Le carnet d'ordres | `/marches/carnet-ordres` | rédigé |
| 3 | Le spread | `/marches/spread` | rédigé |
| 4 | La liquidité | `/marches/liquidite` | à faire |
| 5 | Ordre au marché vs ordre limite | `/marches/marche-vs-limite` | à faire |
| 6 | Ordres avancés | `/marches/ordres-avances` | à faire |
| 7 | Maker et taker | `/marches/maker-taker` | rédigé |
| 8 | Le slippage | `/marches/slippage` | à faire |
| 9 | ➕ tickSz, lotSz, minSz | `/marches/tick-et-lot` | à faire |
| 10 | Les paires de trading | `/marches/paires` | à faire |
| 11 | Bougies japonaises | `/marches/bougies` | à faire |
| 12 | Le volume | `/marches/volume` | à faire |
| 13 | Capitalisation, FDV, offre circulante | `/marches/capitalisation` | à faire |
| 14 | La dominance | `/marches/dominance` | à faire |
| 15 | Le vocabulaire | `/marches/vocabulaire` | à faire |
| 16 | L'analyse technique | `/marches/analyse-technique` | à faire |
| 17 | L'analyse on-chain | `/marches/analyse-on-chain` | à faire |

## Phase 4 — Les chaînes (§7.2)

| # | Page | Chemin | Statut |
|---|---|---|---|
| 1 | Bitcoin | `/chaines/bitcoin` | à faire |
| 2 | Le Lightning Network | `/chaines/lightning` | à faire |
| 3 | Ethereum | `/chaines/ethereum` | à faire |
| 4 | UTXO vs comptes | `/chaines/utxo-vs-comptes` | à faire |
| 5 | Smart contracts | `/chaines/smart-contracts` | à faire |
| 6 | Les standards de tokens | `/chaines/standards-tokens` | à faire |
| 7 | Coin vs token | `/chaines/coin-vs-token` | à faire |
| 8 | Layer 2 | `/chaines/layer-2` | à faire |
| 9 | X Layer | `/chaines/x-layer` | à faire |
| 10 | Les autres L1 *(tableau comparatif)* | `/chaines/autres-l1` | à faire |
| 11 | Bridges | `/chaines/bridges` | à faire |
| 12 | Tokens wrapped | `/chaines/wrapped` | à faire |
| 13 | Stablecoins — le principe | `/chaines/stablecoins` | à faire |
| 14 | Stablecoins adossés au fiat | `/chaines/stablecoins-fiat` | à faire |
| 15 | Stablecoins crypto-collatéralisés | `/chaines/stablecoins-crypto` | à faire |
| 16 | Algorithmiques et l'effondrement d'UST/Luna | `/chaines/stablecoins-algorithmiques` | à faire |
| 17 | Oracles | `/chaines/oracles` | à faire |

## Phase 5 — Dérivés (§7.5)

| # | Page | Chemin | Statut |
|---|---|---|---|
| 1 | Qu'est-ce qu'un produit dérivé | `/derives/produit-derive` | à faire |
| 2 | Futures à échéance | `/derives/futures` | à faire |
| 3 | Les perpétuels | `/derives/perpetuels` | à faire |
| 4 | ➕ Mark price, index price, last price | `/derives/mark-index-last` | à faire |
| 5 | Le funding rate | `/derives/funding-rate` | à faire |
| 6 | La marge | `/derives/marge` | à faire |
| 7 | Le levier | `/derives/levier` | à faire |
| 8 | La liquidation | `/derives/liquidation` | à faire |
| 9 | Fonds d'assurance et auto-deleveraging | `/derives/adl` | à faire |
| 10 | Open interest et ratio long/short | `/derives/open-interest` | à faire |
| 11 | Les options | `/derives/options` | à faire |
| 12 | « ETF » à levier vs ETF Bitcoin spot | `/derives/etf-desambiguisation` | à faire |
| 13 | Rebalancing et décroissance de valeur | `/derives/decroissance-levier` | à faire |

## Phase 6 — Produits et DeFi (§7.6)

| # | Page | Chemin | Statut |
|---|---|---|---|
| 1 | OKX Earn | `/produits/earn` | à faire |
| 2 | Staking | `/produits/staking` | à faire |
| 3 | Lending / emprunt sur exchange | `/produits/lending` | à faire |
| 4 | Qu'est-ce que la DeFi | `/produits/defi` | à faire |
| 5 | Les AMM et la formule x·y=k | `/produits/amm` | à faire |
| 6 | Pools de liquidité | `/produits/pools` | à faire |
| 7 | Impermanent loss | `/produits/impermanent-loss` | à faire |
| 8 | DEX vs CEX | `/produits/dex-vs-cex` | à faire |
| 9 | OKX DEX et les agrégateurs | `/produits/okx-dex` | à faire |
| 10 | Yield farming, restaking | `/produits/yield-farming` | à faire |
| 11 | Les NFT | `/produits/nft` | à faire |
| 12 | Les airdrops | `/produits/airdrops` | à faire |
| 13 | Les bots de trading OKX | `/produits/bots-okx` | à faire |
| 14 | Bots hors exchange (Freqtrade) | `/produits/bots-externes` | à faire |

## Phase 7 — Sécurité (§7.7) et Fiscalité (§7.8)

| # | Page | Chemin | Statut |
|---|---|---|---|
| 1 | Le modèle de menace | `/securite/modele-de-menace` | à faire |
| 2 | Sécuriser un compte d'exchange | `/securite/compte-exchange` | à faire |
| 3 | Phishing crypto | `/securite/phishing` | à faire |
| 4 | Les approbations de contrats | `/securite/approbations` | à faire |
| 5 | Portefeuilles matériels | `/securite/hardware-wallet` | à faire |
| 6 | Seed phrase — stockage | `/securite/seed-phrase` | à faire |
| 7 | Arnaques classiques | `/securite/arnaques` | à faire |
| 8 | Malwares crypto | `/securite/malwares` | à faire |
| 9 | Analyse d'une arnaque réelle | `/securite/etude-de-cas` | à faire |
| 10 | Plus-values des particuliers — PFU | `/fiscalite/pfu` | à faire |
| 11 | Quel événement est imposable | `/fiscalite/fait-generateur` | à faire |
| 12 | Les obligations déclaratives | `/fiscalite/declaration` | à faire |
| 13 | Comptes d'actifs numériques à l'étranger | `/fiscalite/comptes-etrangers` | à faire |
| 14 | Minage, staking, airdrops | `/fiscalite/revenus` | à faire |
| 15 | MiCA et le cadre européen | `/fiscalite/mica` | à faire |

## Phase 8 — Fiches cryptos (§7.9)

Index live filtrable : `/cryptos` — à faire

BTC *(rédigé)* · ETH · USDT · USDC · BNB · SOL · XRP · ADA · DOGE · TRX · TON · AVAX · DOT · LINK · POL · LTC · BCH · SHIB · UNI · ATOM · XLM · NEAR · APT · SUI · ARB · OP · FIL · ICP · OKB · XMR — **1/30 rédigées**

## Phase 9 — Glossaire et finitions

| Élément | Statut |
|---|---|
| Termes définis | 72/250 |
| Liaison automatique des termes (1re occurrence) | ✅ fait |
| Page d'index alphabétique du glossaire | ✅ fait |
| Vérification des liens internes et des sources | à faire |
| Relecture croisée | à faire |

---

## Journal des décisions techniques

### 2026-08-22 — Glossaire (avance sur la Phase 9)

- **Liaison automatique bridée à trois niveaux**, sinon la fonction devient nuisible : première occurrence seulement, uniquement les termes déclarés dans le `termes:` de la page, et jamais dans un titre, un bloc de code ou un lien existant.
- **Infobulle par l'attribut `title` natif**, donc zéro JavaScript.
- **Détection tolérante** à la casse et aux deux apostrophes (`'` et `’`), avec frontières de mot obligatoires : « gas » ne se lie pas dans « gaspillage ».
- Le plugin remark ne peut pas lire les collections Astro (il tourne pendant le rendu) : `scripts/glossaire.mjs` génère un index JSON au `prebuild`.

### 2026-08-22 — Phase 1

- **Migration de la config Markdown** : Astro 7 a déprécié `markdown.remarkPlugins` / `rehypePlugins`. Les plugins passent désormais par `markdown.processor: unified({...})` importé de `@astrojs/markdown-remark`.
- **Les quatre hôtes de l'API OKX répondent à l'identique** (`www`, `openapi`, `my`, `eea`) — vérifié, alors que la documentation n'annonce que `openapi.okx.com`.
- **Aucun barème de retrait par chaîne n'est écrit dans le wiki** : l'endpoint `asset/currencies` est privé et la page des frais de retrait exige une connexion. Plutôt qu'inventer un montant, les pages donnent le coût réseau brut mesuré, qui explique la cause de l'écart.

### 2026-08-22 — Phase 0

- **Nom du projet : Registre.** « Registre » est la traduction française de *ledger*, ce qu'est une blockchain.
- **Node 22.23.2 via nvm.** Astro 7.2.4 exige `node >= 22.12.0` ; la machine était en 20.19.2. `prefix=/home/luke/.local` a été retiré de `~/.npmrc` (incompatible avec nvm, aucun paquet global n'y était installé — sauvegarde : `~/.npmrc.bak-avant-nvm`).
- **Dépôt GitHub de type site utilisateur** : `Skavyoy8/Skavyoy8.github.io`, site servi sur `https://skavyoy8.github.io` pour que `base` reste `/` et que les liens markdown `[texte](/chemin)` fonctionnent sans réécriture.
- **Le contenu vit dans `content/` à la racine, pas dans `src/`.** Le vault Obsidian ne contient ainsi que du Markdown — pas de code, pas de `node_modules` sur l'écran d'un iPhone.
- **Callouts en syntaxe Obsidian `> [!ciel]`** plutôt qu'en directives `:::`. C'est du blockquote Markdown standard : lisible partout, déjà stylé nativement dans Obsidian, restylé au build pour le site.
- **CSS natif avec variables, pas Tailwind.** Le contenu venant du Markdown, les classes utilitaires ne s'y appliquent pas sans `@tailwindcss/typography` ; ça contredirait le « zéro dépendance inutile » du §4.
- **Palette et typographie reprises du snippet Obsidian existant** (`~/Notes/.obsidian/snippets/crypto.css`) : Ayu Dark, accent `#00E676`, IBM Plex Sans + JetBrains Mono. Le site et le vault ont la même identité visuelle. `#FFB300`, `#22D3EE` et `#FF5370` sont réservés aux rôles fonctionnels des callouts, jamais décoratifs.
- **Frontmatter permissif.** Seuls `titre` et `resume` sont obligatoires dans le schéma Zod : une note écrite depuis l'iPhone sans `ordre` ni `sources` ne doit jamais casser le build GitHub Actions. `maj` est dérivé de la date du commit git.
- **Liaison du glossaire bridée** à la première occurrence de chaque terme, uniquement pour les termes déclarés dans `termes`, jamais dans un titre, un bloc de code ou un lien existant.
- **Règle anti-doublon section ↔ fiche crypto :** la page de section explique le *mécanisme*, la fiche crypto donne *l'identité, les données live et les spécificités*.
- **API OKX v5 : les 6 endpoints du §8 de SPEC.md sont vérifiés** (HTTP 200 le 2026-08-22) et le CORS est permissif — les appels côté client depuis GitHub Pages fonctionneront.
- **Recherche Pagefind : `pagefind-ui.js` n'est pas un module ES** mais un script classique qui pose `window.PagefindUI`. Il faut l'injecter par une balise `<script>`, un `import()` dynamique échoue.
- **Ordre des plugins rehype :** Astro n'attribue les `id` de titres qu'APRÈS les plugins utilisateur. `rehypeHeadingIds` est donc appelé explicitement en premier, et l'ancre ajoutée aux titres ne contient aucun texte — sinon son « # » se retrouverait dans les libellés du sommaire.
- **Avertissements de collections vides tus** dans `pagesDe()` : dix sections vides produisaient des dizaines de lignes par page et noyaient les vraies erreurs.
- **Polices auto-hébergées** (`@fontsource-variable`) plutôt que Google Fonts : pas de requête tierce, et le site marche hors ligne.
- **5 pages ajoutées au plan §7** (marquées ➕) : mark/index/last price, unités et précision, adresses et checksums, tickSz/lotSz/minSz, étude de cas FTX.
