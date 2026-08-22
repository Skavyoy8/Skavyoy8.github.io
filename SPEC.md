# PROMPT — Construction d'un wiki crypto personnel

> À coller dans Claude Code, ou à déposer à la racine du projet sous le nom `SPEC.md`
> puis lancer : « Lis SPEC.md en entier et commence la Phase 0. »

---

## 1. Le projet en une phrase

Construire un wiki personnel, en français, qui explique **comment fonctionne techniquement tout ce qu'on croise sur OKX et dans l'univers crypto** — de la fonction de hachage jusqu'au funding rate d'un perpétuel — pour quelqu'un qui veut *comprendre*, pas investir.

---

## 2. À qui ce site s'adresse (lis attentivement, ça conditionne tout le ton)

Un seul lecteur : Luke, 18 ans, élève en Terminale Bac Pro CIEL (Cybersécurité, Informatique, Réseaux, Électronique), en France.

**Ce qu'il maîtrise déjà :**
- réseaux : IP, IPv6, client/serveur, protocoles, notion de nœud et de propagation
- systèmes : Linux, machines virtuelles, ligne de commande
- sécurité : bases offensives via TryHackMe, énumération, notion de vulnérabilité
- développement : HTML/CSS, Git et GitHub (niveau débutant mais réel), Obsidian
- électronique et signal analogique/numérique

**Ce qu'il ne maîtrise pas :**
- absolument tout le vocabulaire financier, sans exception
- la mécanique des marchés
- la crypto au-delà de l'usage basique de l'app OKX

**Conséquence directe sur la rédaction :**

Ne vulgarise **jamais** la partie technique. Il n'a pas besoin qu'on lui explique ce qu'est un serveur, une base de données ou une requête HTTP. Utilise le vocabulaire informatique normal.

À l'inverse, ne présuppose **rien** du côté finance. Le mot « liquidité », « position », « spread » ou « collatéral » doit être défini la première fois qu'il apparaît.

**Le levier de personnalisation le plus important : ancre chaque concept crypto sur un concept CIEL qu'il connaît déjà.** Exemples de ponts à exploiter systématiquement :

| Concept crypto | Ancrage à utiliser |
|---|---|
| Fonction de hachage | checksum, empreinte de fichier, intégrité |
| Chaînage des blocs | chaîne d'intégrité, journal append-only |
| Clé privée / publique | TLS, SSH, paire de clés |
| Nœud, propagation P2P | hôte réseau, broadcast, protocole de gossip |
| Consensus | élection de leader, tolérance aux pannes, systèmes distribués |
| Matching engine d'un CEX | base de données + file d'attente, transactions ACID |
| API REST/WebSocket OKX | client/serveur, polling vs push |
| Signature de transaction | signature numérique, non-répudiation |
| Merkle tree (Proof of Reserves) | arbre de hachage, vérification d'intégrité partielle |
| Smart contract | programme déterministe sur machine virtuelle (EVM ≈ VM) |
| Phishing crypto, approbations | sécurité applicative, principe du moindre privilège |

Ces ponts ne sont pas décoratifs : ce sont eux qui rendent le site *personnalisé*. Chaque page de fondamentaux doit en contenir au moins un, dans un encadré dédié.

---

## 3. Ce que ce site N'EST PAS — anti-objectifs stricts

Ces règles ne sont pas négociables. Elles définissent le projet autant que le reste.

1. **Ce n'est pas un site de conseil financier.** Aucune recommandation d'achat, aucune stratégie, aucun « comment gagner », aucun signal, aucun portefeuille type. Zéro.
2. **Pas de moralisation.** N'ajoute pas de bandeau « investissez prudemment », « le trading est risqué », « faites vos propres recherches » sur chaque page. Le lecteur est déjà au courant, c'est infantilisant et ça pollue la lecture.
3. **Le risque se traite comme de la mécanique, pas comme de la morale.** Exemple : sur la page Liquidation, on explique la formule, on montre un exemple chiffré, on dit factuellement à partir de quel mouvement de prix la position disparaît. C'est un fait technique. Aucune phrase du type « attention, soyez prudent ».
4. **Pas de contenu promotionnel.** OKX est l'objet d'étude, pas un partenaire. Les critiques, controverses et limites sont documentées comme le reste.
5. **Pas de remplissage.** Une page courte et exacte vaut mieux qu'une page longue et vague. Si tu n'as pas de matière solide sur un sujet, écris une page courte et signale-le, ne brode pas.
6. **Pas d'invention.** Si tu n'es pas sûr d'un chiffre, d'une date ou d'un mécanisme, ne l'écris pas : utilise le callout `À VÉRIFIER` prévu au §8 et mets le lien vers la source primaire.

---

## 4. Stack technique

- **Astro** (dernière version stable) en mode static site generation
- **Content Collections** d'Astro pour le contenu en Markdown avec frontmatter typé (schéma Zod)
- **CSS** : Tailwind, ou CSS natif avec variables — au choix, mais un seul système, pas de mélange
- **Recherche** : Pagefind (indexation statique, fonctionne sans backend)
- **Diagrammes** : SVG inline écrits à la main. Pas de bibliothèque de charts pour les schémas conceptuels, pas d'images bitmap, pas de banques d'images.
- **Données de marché** : API publique OKX v5, appelée côté client
- **Déploiement** : GitHub Pages via GitHub Actions
- **Zéro dépendance inutile.** Chaque paquet ajouté doit être justifié.

### Contrainte structurante : compatibilité Obsidian

Tout le contenu vit dans des fichiers `.md` bruts, éditables directement dans un vault Obsidian synchronisé entre PC et iPhone. Concrètement :

- frontmatter YAML standard
- pas de syntaxe MDX ni de composants JSX dans les fichiers de contenu
- les liens internes s'écrivent en markdown classique `[texte](/chemin)`, pas en `[[wikilink]]`
- les composants visuels (callouts, fiches techniques, blocs de données live) s'obtiennent via des **directives markdown** ou des balises HTML simples qui restent lisibles dans Obsidian

L'objectif : Luke est sur OKX, il comprend un truc, il l'écrit sur son téléphone dans Obsidian, ça se retrouve sur le site au prochain push.

---

## 5. Arborescence

```
/
├── SPEC.md                    ← ce document
├── PROGRESS.md                ← suivi de rédaction, voir §12
├── src/
│   ├── content/
│   │   ├── fondamentaux/
│   │   ├── chaines/
│   │   ├── okx/
│   │   ├── marches/
│   │   ├── derives/
│   │   ├── produits/
│   │   ├── securite/
│   │   ├── fiscalite/
│   │   ├── cryptos/           ← une page par crypto
│   │   └── glossaire/         ← un fichier par terme
│   ├── components/
│   ├── layouts/
│   └── pages/
└── public/
```

---

## 6. Modèle de page

Frontmatter obligatoire sur chaque page de contenu :

```yaml
---
titre: "Le funding rate"
section: "derives"
ordre: 4
resume: "Le mécanisme qui force le prix d'un perpétuel à coller au prix spot."
niveau: "intermediaire"        # bases | intermediaire | avance
prerequis: ["/derives/perpetuels", "/marches/carnet-ordres"]
termes: ["funding-rate", "perpetuel", "arbitrage"]
sources:
  - titre: "OKX — Funding rate calculation"
    url: "https://..."
  - titre: "..."
    url: "https://..."
maj: 2026-08-22
statut: "redige"               # ebauche | redige | verifie
---
```

Structure du corps, dans cet ordre :

1. **En une phrase** — la définition la plus courte possible, en gras.
2. **Le problème que ça résout** — pourquoi ce truc existe. Personne ne comprend une solution sans connaître le problème.
3. **Comment ça marche** — le cœur technique, avec schéma SVG quand il y a une structure ou un flux.
4. **Encadré CIEL** — le pont vers un concept qu'il connaît déjà (§2).
5. **Exemple chiffré concret** — avec de vrais nombres, calculés pas à pas.
6. **Sur OKX précisément** — où ça se trouve dans l'app/l'interface, comment ça s'appelle chez eux, les différences avec la théorie générale.
7. **Les pièges** — erreurs de compréhension classiques, faux amis de vocabulaire.
8. **Pour aller plus loin** — liens internes vers les pages liées.
9. **Sources** — généré automatiquement depuis le frontmatter.

---

## 7. Plan de contenu complet

Voici l'intégralité des pages à produire. C'est le périmètre du projet.

### 7.1 — Fondamentaux (`/fondamentaux`)

1. Qu'est-ce qu'une blockchain — registre, bloc, chaînage
2. Les fonctions de hachage — SHA-256, propriétés, effet avalanche
3. Cryptographie asymétrique — clé privée, clé publique, adresse
4. Signatures numériques — prouver sans révéler
5. Seed phrase et dérivation — BIP39, BIP32, portefeuilles hiérarchiques
6. Le réseau pair-à-pair — nœuds, types de nœuds, propagation
7. Le problème du consensus — double dépense, généraux byzantins
8. Proof of Work — minage, difficulté, hashrate, coût énergétique
9. Proof of Stake — validateurs, mise, slashing, finalité
10. Anatomie d'une transaction — de la signature à la confirmation
11. Les frais de réseau — pourquoi ils existent, comment ils varient
12. Mempool et confirmations — pourquoi « en attente »
13. Forks — soft fork, hard fork, cas historiques
14. Le trilemme — sécurité, décentralisation, scalabilité
15. Explorateurs de blocs — lire une transaction soi-même

### 7.2 — Les chaînes (`/chaines`)

1. Bitcoin — modèle UTXO, script, halving, offre limitée
2. Le Lightning Network — canaux de paiement
3. Ethereum — modèle à comptes, EVM, gas
4. UTXO vs comptes — comparaison des deux modèles
5. Smart contracts — ce que c'est vraiment, ce que ça ne peut pas faire
6. Les standards de tokens — ERC-20, ERC-721, ERC-1155
7. Coin vs token — la distinction que tout le monde confond
8. Layer 2 — pourquoi, rollups optimistic vs zero-knowledge
9. X Layer — le L2 d'OKX, positionnement
10. Les autres L1 — Solana, BNB Chain, Tron, Cardano, Avalanche, Polkadot, TON, Sui, Aptos
11. Bridges — comment on fait passer un actif d'une chaîne à l'autre, pourquoi c'est le maillon faible
12. Tokens wrapped — WBTC et compagnie
13. Stablecoins — le principe
14. Stablecoins adossés au fiat — USDT, USDC, réserves, audits, risques
15. Stablecoins crypto-collatéralisés — DAI, surcollatéralisation
16. Stablecoins algorithmiques et l'effondrement d'UST/Luna — étude de cas
17. Oracles — comment une blockchain apprend un prix du monde réel

### 7.3 — OKX (`/okx`) — **section prioritaire**

1. Ce qu'est un exchange centralisé — architecture, matching engine
2. **On-chain vs off-chain** — la page la plus importante du site : quand tu achètes du BTC sur OKX, rien ne se passe sur la blockchain
3. Dépôts et retraits — adresse de dépôt, mémo/tag, confirmations
4. Le choix du réseau — pourquoi envoyer de l'USDT sur le mauvais réseau perd les fonds
5. Custodial vs non-custodial — « not your keys, not your coins »
6. App OKX vs OKX Wallet — deux produits que tout oppose
7. Proof of Reserves — arbre de Merkle, ce que ça prouve et ce que ça ne prouve pas
8. Comptes de trading et de financement — pourquoi cette séparation
9. KYC — ce qu'ils demandent, pourquoi, niveaux de vérification
10. Le cadre réglementaire — MiCA, PSAN/AMF, ce que ça change concrètement en France
11. L'API OKX v5 — endpoints publics vs privés, REST vs WebSocket, clés API et permissions
12. Les frais chez OKX — structure, niveaux, réductions
13. OKX Pay et la carte — fonctionnement, ce qui est on-chain là-dedans
14. Historique et controverses — à documenter honnêtement, sources à l'appui

### 7.4 — Marchés (`/marches`)

1. Qu'est-ce qu'un marché — acheteurs, vendeurs, découverte du prix
2. Le carnet d'ordres — bid, ask, profondeur
3. Le spread — et ce qu'il révèle
4. La liquidité — définition, pourquoi ça compte
5. Ordre au marché vs ordre limite
6. Ordres avancés — stop, stop suiveur, OCO, iceberg, TWAP
7. Maker et taker — pourquoi le même trade coûte deux prix différents
8. Le slippage — mécanique, exemple chiffré
9. Les paires de trading — base, quote, BTC-USDT vs BTC-USDC vs BTC-EUR
10. Bougies japonaises — lecture d'une bougie, timeframes
11. Le volume — ce qu'il mesure, wash trading
12. Capitalisation, FDV, offre circulante — les chiffres qu'on lit partout et ce qu'ils valent
13. La dominance — BTC dominance, ce que ça indique
14. Le vocabulaire — bullish, bearish, long, short, ATH, ATL, FOMO, HODL, whale, rug pull, DYOR, dip, pump, dump
15. L'analyse technique — moyennes mobiles, RSI, MACD, supports/résistances : présentation neutre de ce que les gens utilisent, **avec ce que dit la recherche académique sur son pouvoir prédictif réel**
16. L'analyse on-chain — ce qu'on peut lire directement dans la blockchain

### 7.5 — Dérivés (`/derives`)

1. Qu'est-ce qu'un produit dérivé — le concept, hors crypto d'abord
2. Futures à échéance — le modèle historique
3. Les perpétuels — le contrat sans échéance, l'invention centrale de la crypto
4. Le funding rate — la mécanique complète, avec exemple chiffré
5. La marge — initiale, de maintenance, isolée vs croisée
6. Le levier — définition mathématique exacte, ce que multiplie réellement un x10
7. La liquidation — calcul du prix de liquidation, déroulé technique
8. Fonds d'assurance et auto-deleveraging — ce qui se passe quand la liquidation ne suffit pas
9. Open interest et ratio long/short — lecture de ces indicateurs
10. Les options — bases : call, put, strike, échéance
11. **« ETF » à levier tokenisés vs ETF Bitcoin spot** — deux produits sans aucun rapport qui portent le même mot. Page de désambiguïsation explicite.
12. Le rebalancing des produits à levier et la décroissance de valeur — pourquoi un x3 ne fait pas x3 sur la durée

### 7.6 — Produits et DeFi (`/produits`)

1. OKX Earn — vue d'ensemble
2. Staking — on-chain réel vs produit d'exchange
3. Lending / emprunt sur exchange
4. Qu'est-ce que la DeFi
5. Les AMM et la formule x·y=k
6. Pools de liquidité — être fournisseur de liquidité
7. Impermanent loss — mécanique et exemple chiffré
8. DEX vs CEX — comparaison structurelle
9. OKX DEX et les agrégateurs
10. Yield farming, restaking — les couches empilées
11. Les NFT — standard technique, usages, marché
12. Les airdrops — mécanique, critères, fermes à airdrop
13. Les bots de trading OKX — grid, DCA, martingale : comment ils sont implémentés
14. Bots hors exchange — Freqtrade, backtesting, mode dry-run, biais de surapprentissage

### 7.7 — Sécurité (`/securite`)

1. Le modèle de menace — qui t'attaque et pourquoi
2. Sécuriser un compte d'exchange — 2FA, code anti-phishing, whitelist de retrait
3. Phishing crypto — faux sites, faux support, faux airdrops
4. Les approbations de contrats — le vecteur le plus sous-estimé, comment révoquer
5. Portefeuilles matériels — modèle de sécurité
6. Seed phrase — stockage, sauvegarde, ce qu'il ne faut jamais faire
7. Arnaques classiques — pig butchering, rug pull, pump & dump, faux tokens
8. Malwares crypto — clipboard hijacking, faux wallets
9. Analyse d'une arnaque réelle, décortiquée étape par étape

### 7.8 — Fiscalité et cadre France (`/fiscalite`)

Section purement factuelle, sourcée sur les textes officiels (impots.gouv.fr, BOFiP, AMF). Aucune optimisation, aucun conseil.

1. Le régime des plus-values crypto des particuliers — PFU
2. Quel événement est imposable — cession vers monnaie fiduciaire, achat de bien ; le cas crypto→crypto
3. Les obligations déclaratives — formulaires concernés
4. La déclaration des comptes d'actifs numériques à l'étranger
5. Minage, staking, airdrops — traitement fiscal
6. MiCA et le cadre européen

> Ajouter sur chaque page de cette section un callout `À VÉRIFIER` : la fiscalité change, et les infos doivent être recoupées sur les sources officielles avant tout usage.

### 7.9 — Fiches cryptos (`/cryptos`)

Une page rédigée à la main pour chacune de ces trente : BTC, ETH, USDT, USDC, BNB, SOL, XRP, ADA, DOGE, TRX, TON, AVAX, DOT, LINK, POL, LTC, BCH, SHIB, UNI, ATOM, XLM, NEAR, APT, SUI, ARB, OP, FIL, ICP, OKB, XMR.

Structure de fiche imposée :

- **Bloc de données live** (prix, variation 24h, volume) tiré de l'API OKX — jamais écrit en dur
- **Fiche d'identité** : lancement, créateur, chaîne, consensus, offre max et circulante, unité minimale
- **À quoi ça sert** — le problème revendiqué
- **Comment ça marche** — la spécificité technique réelle
- **Ce qui le distingue** — sans marketing
- **Critiques et controverses** — sourcées
- **Sur OKX** — paires disponibles, réseaux de dépôt supportés
- **Sources** — whitepaper en premier

Pour la **liste exhaustive** de tous les actifs (plusieurs centaines), pas de page rédigée : une page `/cryptos` avec un tableau filtrable et triable alimenté en direct par l'API. Chaque ligne pointe vers la fiche détaillée si elle existe.

### 7.10 — Glossaire (`/glossaire`)

Objectif : **250 termes minimum**, un fichier par terme, avec définition courte (2 phrases max), lien vers la page qui développe, et liste des pages où le terme apparaît.

Chaque occurrence d'un terme du glossaire dans une page de contenu doit être liée automatiquement à sa définition (transformation au build à partir du champ `termes` du frontmatter, avec infobulle au survol sur desktop).

---

## 8. Données live — API OKX

Endpoints publics, sans authentification, sans clé API. Base : `https://www.okx.com/api/v5/`

| Usage | Endpoint |
|---|---|
| Tous les tickers spot | `market/tickers?instType=SPOT` |
| Ticker unique | `market/ticker?instId=BTC-USDT` |
| Bougies | `market/candles?instId=BTC-USDT&bar=1D` |
| Carnet d'ordres | `market/books?instId=BTC-USDT&sz=20` |
| Instruments listés | `public/instruments?instType=SPOT` |
| Funding rate | `public/funding-rate?instId=BTC-USDT-SWAP` |

> Ces endpoints sont donnés de mémoire : **vérifie-les contre la documentation officielle** (`https://www.okx.com/docs-v5/`) avant d'écrire le moindre code, et corrige cette section si nécessaire.

Règles d'implémentation :

- appels côté client, avec cache court en `sessionStorage` pour ne pas spammer l'API
- gestion explicite des erreurs : si l'API ne répond pas, la page reste lisible et affiche un état dégradé propre, jamais un écran cassé
- aucune donnée de marché écrite en dur dans le markdown
- horodatage visible de la dernière mise à jour à côté de chaque bloc de données
- prévoir un composant réutilisable unique pour tous les blocs de prix

**Bonus pédagogique fort :** sur la page consacrée à l'API OKX, afficher côte à côte la requête envoyée et la réponse JSON brute, en direct. C'est le meilleur moyen de rendre l'abstraction concrète pour un profil réseau.

Idem sur la page « Carnet d'ordres » : afficher un vrai carnet BTC-USDT en direct, annoté, plutôt qu'un schéma théorique.

---

## 9. Design et mise en page

Le site doit avoir l'air d'une documentation technique sérieuse, pas d'un blog crypto. Références de style : documentation Stripe, MDN, Astro Docs.

- **Thème sombre par défaut**, bascule clair disponible
- **Typographie** : une sans-serif lisible pour le corps (Inter, IBM Plex Sans), une monospace pour tous les termes techniques, adresses, hashs et code (JetBrains Mono). La monospace n'est pas décorative : elle sert à signaler visuellement « ceci est un objet technique exact ».
- **Une seule couleur d'accent**, utilisée avec parcimonie. Le reste en niveaux de gris.
- **Largeur de texte limitée** (~70 caractères). Pas de pleine largeur.
- **Navigation** : sidebar avec les 9 sections, sommaire de la page à droite sur desktop, fil d'Ariane
- **Mobile d'abord.** Il lira ça sur son iPhone, à côté de l'app OKX ouverte. Le mobile n'est pas une dégradation, c'est le cas d'usage principal.
- **Recherche** accessible au clavier (`/` ou `Ctrl+K`)
- **Aucune image bitmap décorative.** Les seuls visuels sont des schémas SVG faits main qui expliquent quelque chose.
- **Callouts** — quatre types, quatre styles distincts :
  - `INFO` — précision utile
  - `CIEL` — l'encadré de pont vers ses connaissances (§2), c'est la signature du site
  - `PIÈGE` — erreur de compréhension classique ou faux ami de vocabulaire
  - `À VÉRIFIER` — information susceptible d'avoir changé, avec lien vers la source primaire
- **Indicateur de niveau** visible en haut de page (bases / intermédiaire / avancé) et liste des prérequis cliquables
- **Performance** : pas de JS bloquant, chargement instantané. C'est un site statique, ça doit se voir.

---

## 10. Sources

Règle absolue : **chaque page cite au minimum deux sources primaires**, listées dans le frontmatter et rendues en fin de page.

Hiérarchie des sources, dans l'ordre de préférence :

1. Whitepapers originaux (Bitcoin, Ethereum, chaque projet)
2. Documentation technique officielle (docs Ethereum, docs OKX v5, EIPs, BIPs)
3. Textes réglementaires (règlement MiCA, AMF, impots.gouv.fr, BOFiP)
4. Publications académiques et rapports d'audit
5. Sources de données neutres (explorateurs de blocs, CoinGecko/CoinMarketCap pour la donnée brute)

**Interdits comme sources :** contenu promotionnel de projets, influenceurs, threads Twitter, sites d'affiliation, articles générés pour le SEO.

Quand deux sources sérieuses se contredisent, écris-le dans la page et cite les deux. C'est plus utile qu'un faux consensus.

---

## 11. Ton de rédaction

- Français, tutoiement, direct.
- Phrases courtes. Pas de remplissage rhétorique, pas d'introduction qui annonce ce qu'on va dire.
- Le vocabulaire anglais du domaine est conservé tel quel (funding rate, spread, staking) — c'est ce qu'il verra dans l'app — avec la traduction ou l'explication à la première occurrence.
- Quand un truc est mal conçu, absurde ou marketé, dis-le. L'honnêteté technique prime sur la neutralité de façade.
- Quand quelque chose est incertain ou débattu, dis-le aussi. Ne lisse pas.

---

## 12. Méthode de travail

Ne construis pas tout d'un bloc. Procède par phases, avec un commit par étape.

**Phase 0 — Fondations**
Initialiser Astro, les content collections avec schéma Zod, le layout, le design system, la navigation, le composant de données live, les quatre callouts, Pagefind, le déploiement GitHub Pages. Écrire **trois pages témoins** de bout en bout : `/okx/on-chain-off-chain`, `/fondamentaux/hachage`, `/cryptos/btc`. Ces trois pages servent d'étalon de qualité pour tout le reste.

→ **Stop. Faire valider ces trois pages avant d'aller plus loin.** Il est inutile d'en écrire 150 si le format ne convient pas.

**Phase 1** — Section OKX complète (§7.3), c'est la priorité de lecture
**Phase 2** — Fondamentaux (§7.1)
**Phase 3** — Marchés (§7.4) + glossaire des 100 premiers termes
**Phase 4** — Chaînes (§7.2)
**Phase 5** — Dérivés (§7.5)
**Phase 6** — Produits et DeFi (§7.6)
**Phase 7** — Sécurité (§7.7) et Fiscalité (§7.8)
**Phase 8** — Les 30 fiches cryptos + tableau exhaustif live
**Phase 9** — Complétion du glossaire, liaison automatique des termes, relecture croisée, vérification des liens et des sources

Maintenir `PROGRESS.md` à jour en permanence : liste de toutes les pages prévues, statut de chacune (`à faire` / `ébauche` / `rédigé` / `vérifié`), et journal des décisions techniques prises en cours de route.

À chaque fin de phase, faire un point court : ce qui a été produit, ce qui a été décidé, ce qui reste flou.

---

## 13. Critères de qualité — une page est finie quand

- [ ] elle commence par une définition en une phrase
- [ ] elle explique le problème avant la solution
- [ ] elle contient au moins un exemple chiffré concret
- [ ] elle contient un encadré CIEL quand c'est pertinent
- [ ] elle dit où ça se trouve dans OKX quand c'est applicable
- [ ] elle a un schéma SVG s'il y a un flux, une structure ou une hiérarchie à montrer
- [ ] elle cite au moins deux sources primaires
- [ ] tous ses termes techniques sont dans le glossaire
- [ ] ses prérequis sont déclarés et cliquables
- [ ] elle ne contient aucun conseil d'investissement, aucun avertissement moralisateur, aucune phrase de remplissage
- [ ] elle est lisible et agréable sur un écran d'iPhone

---

## 14. Première action

Lis ce document en entier, puis :

1. Signale-moi toute incohérence, tout choix technique que tu contesterais, et toute page du plan §7 qui te semble manquante ou en trop.
2. Propose l'arborescence de fichiers définitive.
3. Attends validation avant d'écrire la moindre ligne de code.
