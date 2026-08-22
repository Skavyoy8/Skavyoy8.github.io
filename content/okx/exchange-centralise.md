---
titre: "Ce qu'est un exchange centralisé"
section: "okx"
ordre: 10
resume: "Un CEX est un serveur privé qui tient les comptes de ses clients, appareille leurs ordres dans un carnet en mémoire vive, et ne signe une transaction on-chain que pour un dépôt ou un retrait."
niveau: "bases"
prerequis: ["/okx/on-chain-off-chain"]
termes: ["cex", "dex", "moteur-appariement", "carnet-ordres", "priorite-prix-temps", "maker", "taker", "spread", "portefeuille-chaud", "portefeuille-froid", "liquidite"]
sources:
  - titre: "OKX — API v5, documentation officielle"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — Order Execution Policy (priorité prix-temps)"
    url: "https://tr.okx.com/en/help/order-execution-policy"
  - titre: "Règlement (UE) 2023/1114 (MiCA) — articles 70 et 76"
    url: "https://eur-lex.europa.eu/eli/reg/2023/1114/oj"
  - titre: "OKX — Portefeuilles froids et délais de retrait"
    url: "https://www.okx.com/help/what-is-a-segregated-wallet-and-why-is-my-withdrawal-delayed"
  - titre: "Uniswap — Whitepaper (modèle DEX à pool)"
    url: "https://uniswap.org/whitepaper.pdf"
statut: "redige"
---

**Un exchange centralisé est un serveur privé qui tient les comptes de ses clients, appareille leurs ordres dans un carnet en mémoire vive, et ne signe une transaction on-chain que pour un dépôt ou un retrait.**

## Le problème que ça résout

Tu as 1 BTC, tu veux des USDT. Sans intermédiaire, il faut résoudre trois problèmes séparés :

1. **Le rendez-vous.** Trouver quelqu'un qui veut exactement l'inverse, au même moment.
2. **Le prix.** Se mettre d'accord sur un taux, sans référence commune.
3. **Le règlement.** L'un des deux doit envoyer en premier, donc faire confiance à l'autre.

Un exchange centralisé — CEX, *centralized exchange* — résout les trois en devenant le point de passage unique. Tout le monde envoie ses ordres au même serveur, ce qui règle le rendez-vous. Le prix sort mécaniquement de la confrontation de ces ordres. Et le règlement devient trivial : l'établissement détient déjà les deux actifs, ta contrepartie et toi étant tous les deux ses clients — livrer, c'est modifier deux lignes dans sa base.

Le coût de cette solution est dans son nom. Un seul serveur a autorité sur les soldes de tout le monde.

## Comment ça marche

<figure class="schema">
<svg viewBox="0 0 640 300" role="img" aria-label="Les quatre étages d'un exchange centralisé, les portefeuilles chauds et froids, et les deux seules opérations qui traversent la frontière on-chain">
  <line x1="452" y1="10" x2="452" y2="295" stroke="var(--bordure-forte)" stroke-width="1.5" stroke-dasharray="5 5"/>
  <text x="14" y="20" font-size="11" fill="var(--texte-faible)">CHEZ OKX — off-chain</text>
  <text x="462" y="20" font-size="11" fill="var(--texte-faible)">ON-CHAIN</text>

  <rect x="14" y="34" width="214" height="34" rx="5" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="24" y="49" font-size="11" fill="var(--texte-fort)" font-weight="600">1 · Passerelle</text>
  <text x="24" y="62" font-size="10" fill="var(--texte-doux)">REST + WebSocket</text>

  <rect x="14" y="80" width="214" height="34" rx="5" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="24" y="95" font-size="11" fill="var(--texte-fort)" font-weight="600">2 · Contrôle de risque</text>
  <text x="24" y="108" font-size="10" fill="var(--texte-doux)">le solde couvre-t-il l'ordre ?</text>

  <rect x="14" y="126" width="214" height="54" rx="5" fill="var(--accent-voile)" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="24" y="142" font-size="11" fill="var(--accent)" font-weight="600">3 · Moteur d'appariement</text>
  <text x="24" y="156" font-size="10" fill="var(--texte-doux)">carnet en mémoire vive</text>
  <text x="24" y="170" font-size="10" fill="var(--texte-doux)">priorité : prix, puis arrivée</text>

  <rect x="14" y="192" width="214" height="40" rx="5" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="24" y="208" font-size="11" fill="var(--texte-fort)" font-weight="600">4 · Base des soldes</text>
  <text x="24" y="222" font-size="10" fill="var(--code-texte)">1 ligne par client et par actif</text>

  <path d="M121 68 L121 78 M121 114 L121 124 M121 180 L121 190" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M117 76 L121 80 L125 76 Z M117 122 L121 126 L125 122 Z M117 188 L121 192 L125 188 Z" fill="var(--texte-faible)"/>

  <rect x="14" y="240" width="214" height="26" rx="4" fill="var(--fond-alt)" stroke="var(--bordure)"/>
  <text x="121" y="257" font-size="10" fill="var(--attention)" text-anchor="middle">étages 1 à 4 : 0 octet on-chain</text>

  <text x="250" y="48" font-size="10" fill="var(--texte-faible)">Portefeuilles d'OKX</text>
  <rect x="250" y="56" width="180" height="44" rx="5" fill="var(--attention-voile)" stroke="var(--attention)"/>
  <text x="262" y="74" font-size="11" fill="var(--texte-fort)" font-weight="600">Portefeuille chaud</text>
  <text x="262" y="90" font-size="10" fill="var(--texte-doux)">clés en ligne, signature auto</text>

  <rect x="250" y="116" width="180" height="44" rx="5" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="262" y="134" font-size="11" fill="var(--texte-fort)" font-weight="600">Portefeuille froid</text>
  <text x="262" y="150" font-size="10" fill="var(--texte-doux)">clés hors ligne</text>

  <path d="M340 100 L340 114" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M336 106 L340 100 L344 106 Z M336 110 L340 116 L344 110 Z" fill="var(--texte-faible)"/>

  <rect x="470" y="56" width="158" height="30" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="549" y="76" font-size="11" fill="var(--texte-doux)" text-anchor="middle">bloc n</text>
  <rect x="470" y="94" width="158" height="30" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="549" y="114" font-size="11" fill="var(--texte-doux)" text-anchor="middle">bloc n+1</text>
  <rect x="470" y="132" width="158" height="30" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="549" y="152" font-size="11" fill="var(--texte-doux)" text-anchor="middle">bloc n+2</text>
  <path d="M549 86 L549 94 M549 124 L549 132" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <text x="549" y="182" font-size="10" fill="var(--texte-faible)" text-anchor="middle">répliqué par des milliers de nœuds</text>

  <path d="M620 222 L256 222" stroke="var(--accent)" stroke-width="1.6" fill="none"/>
  <path d="M264 218 L256 222 L264 226 Z" fill="var(--accent)"/>
  <text x="438" y="214" font-size="11" fill="var(--accent)" text-anchor="middle">DÉPÔT — ta transaction, ta signature</text>

  <path d="M256 280 L620 280" stroke="var(--info)" stroke-width="1.6" fill="none"/>
  <path d="M612 276 L620 280 L612 284 Z" fill="var(--info)"/>
  <text x="438" y="272" font-size="11" fill="var(--info)" text-anchor="middle">RETRAIT — transaction signée par OKX</text>
</svg>
<figcaption>Le moteur d'appariement ne touche jamais une clé privée. Les portefeuilles ne connaissent pas le carnet d'ordres. Les deux ne se rencontrent que dans la base des soldes.</figcaption>
</figure>

### 1 — La passerelle

L'app iPhone, le site web et un script `curl` sont trois clients du même service HTTP. Aucun n'a de privilège particulier : l'app ne fait que rendre en pixels ce que l'API renvoie en JSON. Tu peux vérifier ça toi-même, l'API publique ne demande aucune authentification :

```bash
curl -s "https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT"
```

### 2 — Le contrôle de risque

Avant que l'ordre atteigne le carnet, le serveur vérifie que ton solde couvre l'ordre et **gèle** le montant correspondant. Sinon l'ordre est refusé — c'est le code d'erreur `51008_1000`, « Order failed. Insufficient {ccy} balance in account ». Les fonds gelés n'apparaissent plus comme disponibles tant que l'ordre est ouvert.

### 3 — Le moteur d'appariement

Le cœur. Le **carnet d'ordres** est la liste des intentions non encore exécutées : les *bids* (offres d'achat) d'un côté, les *asks* (offres de vente) de l'autre. Il vit en mémoire vive, pas sur disque.

La raison est budgétaire, et le plafond documenté donne l'ordre de grandeur : **1 000 requêtes d'ordre par 2 secondes, pour un seul sous-compte**. C'est le plafond d'un client parmi des milliers, et la grande majorité de ces messages sont des ordres annulés avant d'être exécutés. Un aller-retour disque par message ne tient pas dans ce budget ; une structure en mémoire, si.

La structure, pour chaque instrument : deux ensembles triés de niveaux de prix, et à chaque niveau une file **FIFO**. La règle d'appariement, dite **priorité prix-temps**, tient en deux lignes dans la politique d'exécution publiée par OKX (traduit de l'anglais) :

> Les ordres de vente au prix le plus bas sont appariés avant ceux au prix le plus haut ; symétriquement, les ordres d'achat au prix le plus haut sont appariés avant ceux au prix le plus bas. À prix égal, l'ordre entré le premier dans le système est apparié le premier.

Deux mots de vocabulaire viennent directement de là :

- **maker** — ton ordre ne trouve pas de contrepartie immédiate et se pose dans le carnet. Il *fabrique* de la profondeur, donc de la **liquidité** : la capacité à échanger une quantité donnée sans déplacer le prix.
- **taker** — ton ordre trouve une contrepartie et l'exécute tout de suite. Il *prend* la profondeur.

### 4 — La base des soldes

Une exécution appariée descend dans la base : débit d'une colonne, crédit d'une autre, pour les deux contreparties, dans une seule transaction SQL. L'atomicité vient du SGBD. Il n'y a ni bloc, ni nœud, ni vote — un serveur a autorité sur ses propres lignes.

### En marge : les portefeuilles

Les fonds réels, eux, sont dans des portefeuilles qu'OKX contrôle. La documentation d'OKX les décrit elle-même en deux catégories, et énonce la conséquence directe sur les retraits (traduit de l'anglais) :

> Une partie des actifs des utilisateurs est stockée dans des portefeuilles froids. Si les actifs des portefeuilles chauds ne suffisent pas à couvrir la demande de retrait, une étape supplémentaire est nécessaire pour transférer des actifs du froid vers le chaud. Cela peut retarder la réception d'un retrait jusqu'à 24 heures.

Un **portefeuille chaud** a ses clés privées sur une machine connectée, qui peut donc signer automatiquement. Un **portefeuille froid** a ses clés hors ligne : signer y demande une intervention humaine. C'est un arbitrage classique disponibilité contre surface d'attaque, exactement le même que celui d'un HSM ou d'une autorité de certification racine gardée hors ligne.

### Ce qui distingue un CEX d'une banque et d'un DEX

| | Banque | CEX | DEX à pool |
|---|---|---|---|
| Agrément | établissement de crédit | prestataire de services sur crypto-actifs (MiCA) | le protocole lui-même n'est pas agréé |
| Qui détient les fonds | la banque | l'exchange | toi, dans ton portefeuille |
| Où vit le carnet | — | RAM d'un serveur privé | contrat sur une chaîne publique |
| Coût d'une exécution | — | 0 octet on-chain | 1 transaction + frais de réseau |
| Qui peut auditer le livre | régulateur, commissaires aux comptes | personne, depuis l'extérieur | n'importe qui, en lisant la chaîne |

Un CEX n'est pas une banque, et MiCA le dit de façon très concrète. L'article 70 §3 impose au prestataire de placer les fonds en monnaie officielle de ses clients « avant la fin du jour ouvrable suivant le jour où [ils] ont été reçus […] auprès d'un établissement de crédit ou d'une banque centrale », sur un compte identifiable séparément de ses propres comptes. Autrement dit : le régulateur part du principe que la banque est ailleurs.

L'article 76 encadre l'appariement lui-même. Il exige des « règles et procédures non discrétionnaires de nature à garantir une négociation équitable et ordonnée » (§1 e), interdit à la plateforme de négocier « pour compte propre sur la plate-forme de négociation de crypto-actifs qu'ils exploitent » (§5), impose de rendre publics en continu les prix acheteurs et vendeurs ainsi que l'importance des positions à ces prix (§9), puis le prix, le volume et l'heure de chaque transaction « en temps réel, dans la mesure où cela est techniquement possible » (§10). Ce que tu vois dans l'app n'est pas une courtoisie commerciale, c'est une obligation.

Et surtout, l'article 76 §12 nomme explicitement le fait central :

> Les prestataires de services sur crypto-actifs qui exploitent une plate-forme de négociation de crypto-actifs initient le règlement définitif des transactions portant sur des crypto-actifs dans le registre distribué dans les 24 heures à partir de l'exécution de la transaction sur la plate-forme de négociation ou, **en cas de transactions réglées en dehors du registre distribué**, au plus tard le jour de clôture.

« En dehors du registre distribué ». Le texte européen prévoit noir sur blanc le cas normal : le règlement d'un trade sur un CEX ne passe pas par la blockchain.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> Un moteur d'appariement, c'est une **file à priorité alimentée par un point de sérialisation unique**, posée devant une base transactionnelle.
>
> Le tri est à deux clés, comme un `sort -k1,1nr -k2,2n` : prix d'abord, horodatage d'arrivée ensuite. À chaque niveau de prix il y a une file FIFO, et c'est le serveur — pas le client — qui décide de l'ordre d'entrée dans cette file. Deux ordres partis au même instant de deux machines différentes n'arrivent pas au même instant : celui dont le paquet arrive en premier prend la place devant. Toute la course à la latence dans ce milieu vient de cette phrase.
>
> Le deuxième angle est celui du modèle de cohérence. Une blockchain résout le problème « aucun participant n'est digne de confiance, comment se mettre d'accord sur un ordre ? » — c'est du consensus byzantin, coûteux par construction. Un CEX ne résout pas ce problème : il le supprime. Un serveur d'autorité déclare l'ordre, et l'atomicité vient des propriétés ACID du SGBD. C'est exactement la différence entre un cluster maître-esclave avec bascule, et un système distribué sans maître. Le premier est mille fois plus rapide et tombe entièrement si le maître ment.
>
> Enfin, chaud contre froid, tu l'as déjà vu : c'est la clé SSH avec passphrase dans un agent en mémoire contre la clé de l'autorité de certification racine sur un support hors ligne dans un coffre. Même arbitrage, même raison.

## Exemple chiffré

Carnet `BTC-USDT` réel, relevé le 22 août 2026 à 16 h 24 min 48 s UTC :

```bash
curl -s "https://www.okx.com/api/v5/market/books?instId=BTC-USDT&sz=5"
```

| Côté | Prix (USDT) | Quantité (BTC) | Nombre d'ordres |
|---|---|---|---|
| ask | 77 230,6 | 0,00639856 | 1 |
| ask | 77 230,2 | 0,00001020 | 1 |
| ask | 77 230,0 | 0,00008096 | 1 |
| ask | 77 229,5 | 0,12445988 | 1 |
| **ask** | **77 229,4** | **0,39645775** | **5** |
| **bid** | **77 229,3** | **2,33028724** | **29** |
| bid | 77 227,9 | 0,06559891 | 2 |
| bid | 77 227,7 | 0,06045236 | 2 |
| bid | 77 227,2 | 0,00001020 | 1 |
| bid | 77 225,1 | 0,13586624 | 2 |

Le **spread** est l'écart entre le meilleur achat et la meilleure vente : 77 229,4 − 77 229,3 = **0,1 USDT**, soit 0,013 point de base du prix. C'est ce que coûte un aller-retour immédiat.

Regarde la dernière colonne : **29 ordres distincts sont empilés au prix 77 229,3**, pour 2,33 BTC au total. Ce sont 29 clients dans une seule file FIFO. Si une vente arrive, elle sert le premier de la file, puis le deuxième, dans l'ordre d'arrivée. Le 29ᵉ ne verra rien tant que 2,3 BTC ne se seront pas vendus à ce prix.

**Ce que fait un ordre d'achat au marché de 0,5 BTC.** Il consomme les asks du moins cher au plus cher :

```
0,39645775 BTC × 77 229,4 = 30 618,194158 USDT   (niveau 1 vidé)
0,10354225 BTC × 77 229,5 =  7 996,516196 USDT   (niveau 2 entamé)
                    total = 38 614,710354 USDT
```

Prix moyen payé : 38 614,710354 ÷ 0,5 = **77 229,4207 USDT**. Contre 77 229,4 si tout était passé au meilleur prix : **surcoût de 0,0104 USDT**, soit une dégradation de 0,00003 %. Ce n'est pas une loi de la nature, c'est la mesure d'un carnet particulier à un instant particulier. Le mécanisme, lui, est général : plus la taille de l'ordre dépasse la profondeur des premiers niveaux, plus il faut monter dans le carnet, et plus le prix moyen s'éloigne du meilleur prix affiché. C'est le [slippage](/marches/slippage).

**La file, vue de l'extérieur.** Une seconde plus tôt, l'endpoint des transactions publiques renvoyait ceci :

```json
{"instId":"BTC-USDT","side":"buy","sz":"0.05034411","px":"77229.4","tradeId":"1046507266","ts":"1787415887424"}
{"instId":"BTC-USDT","side":"buy","sz":"0.00280331","px":"77229.4","tradeId":"1046507265","ts":"1787415887424"}
{"instId":"BTC-USDT","side":"buy","sz":"0.00280330","px":"77229.4","tradeId":"1046507264","ts":"1787415887424"}
```

Trois exécutions, **même prix, même milliseconde, identifiants consécutifs**. Une exécution n'est pas un ordre : c'est l'appariement d'un ordre avec **un** ordre d'en face. Le moteur ne fusionne pas les ordres empilés à un même niveau, il déroule la file élément par élément et numérote chaque appariement. Un seul ordre au marché suffisamment gros produit donc plusieurs lignes ici.

> [!verifier] Ce que ce fragment prouve, et ce qu'il ne prouve pas
> Ces trois lignes établissent que le moteur décompose l'appariement en événements individuels, numérotés séquentiellement, à la même milliseconde. Elles ne permettent pas de dire s'il s'agit d'un seul ordre acheteur consommant trois vendeurs, ou de trois acheteurs distincts arrivés dans la même milliseconde : le flux public ne porte pas d'identifiant d'ordre. Les deux lectures sont compatibles avec les données ; seule la première est nécessaire au raisonnement ci-dessus.

## Sur OKX

Le catalogue, relevé le 22 août 2026 via `GET /api/v5/public/instruments` :

| Type d'instrument | Nombre |
|---|---|
| `SPOT` | 1 379 |
| `SWAP` (perpétuels) | 454 |
| `MARGIN` | 196 |
| `FUTURES` (à échéance) | 174 |

Chacun de ces 2 203 instruments a son propre carnet et son propre moteur d'appariement. `BTC-USDT` et `BTC-USDC` sont deux marchés séparés qui ne se parlent pas.

**Dans l'interface.** L'écran de trading spot montre les trois étages visibles : le carnet à droite (les 5 à 20 meilleurs niveaux de chaque côté), le fil des transactions récentes en dessous, et tes ordres ouverts en bas. Ce que tu ne vois pas, c'est le contrôle de risque, la base des soldes et les portefeuilles.

**Le détail qui trahit l'architecture.** Le paramètre `dest` de l'endpoint de retrait a deux valeurs :

- `dest=3` — *internal transfer*, vers un autre utilisateur OKX identifié par UID, e-mail ou téléphone. La documentation précise : « For internal transfer, transaction fee is always 0 ».
- `dest=4` — *on-chain withdrawal*, avec un paramètre `chain` et une adresse.

Deux valeurs d'un même champ, deux mondes. Envoyer 100 USDT à un autre client OKX coûte zéro parce que rien ne sort du serveur. Les envoyer à une adresse externe coûte les frais de réseau, parce qu'il faut construire, signer et diffuser une vraie transaction depuis le portefeuille chaud.

## Les pièges

> [!piege] « Mon ordre part sur la blockchain »
> Non. Un ordre est un message JSON envoyé à un serveur, gardé en RAM, et effacé si tu l'annules. Il n'est ni signé cryptographiquement par toi, ni diffusé, ni conservé publiquement. La seule trace est celle qu'OKX choisit d'en garder. Voir [On-chain vs off-chain](/okx/on-chain-off-chain).

> [!piege] « Le carnet d'ordres, c'est le marché »
> C'est le carnet d'**OKX**. Binance, Coinbase et Kraken ont chacun le leur, avec des prix légèrement différents au même instant. Il n'existe aucun carnet consolidé mondial pour les crypto-actifs, contrairement aux marchés d'actions réglementés. Un « prix du BTC » affiché quelque part est toujours un prix d'un lieu, ou une moyenne construite par quelqu'un selon une méthode qu'il a choisie.

> [!piege] Maker et taker ne sont pas acheteur et vendeur
> Un maker peut être acheteur ou vendeur ; un taker aussi. La distinction porte sur l'effet de l'ordre sur le carnet — poser ou consommer — pas sur le sens de l'opération. C'est cette distinction, et pas le sens, qui détermine les frais appliqués.

> [!piege] Le moteur d'appariement ne détient rien, mais l'établissement détient tout
> Le moteur ne manipule que des nombres. Les clés privées sont dans les portefeuilles, ailleurs dans l'infrastructure. La conséquence mécanique est simple : si la somme des soldes dans la base dépasse ce que contiennent réellement les portefeuilles chaud et froid, rien dans l'interface ne le montre. Les deux ensembles ne sont reliés par aucune contrainte technique — seulement par une politique interne et, depuis MiCA, par une obligation légale. C'est précisément le trou que le [Proof of Reserves](/okx/proof-of-reserves) tente de combler.

> [!verifier] L'implémentation interne d'OKX n'est pas publique
> Les quatre étages décrits ici sont l'architecture standard d'un exchange centralisé, cohérente avec ce que l'API v5 expose et avec la politique d'exécution publiée. Le code du moteur d'OKX, son langage, sa topologie de réplication et sa latence réelle ne sont pas documentés. Tout ce qui est affirmé au-dessus est soit observable depuis l'API publique, soit écrit dans la documentation officielle citée en sources — rien d'autre.

## Pour aller plus loin

- [On-chain vs off-chain](/okx/on-chain-off-chain) — pourquoi les étages 1 à 4 n'écrivent rien
- [Comptes de trading et de financement](/okx/comptes) — la frontière interne entre les portefeuilles et le carnet
- [L'API OKX v5](/okx/api-v5) — interroger toi-même les quatre étages
- [Le carnet d'ordres](/marches/carnet-ordres) — bid, ask, profondeur, en détail
- [Maker et taker](/marches/maker-taker) — pourquoi le même trade coûte deux prix
- [DEX vs CEX](/produits/dex-vs-cex) — la comparaison structurelle en détail
- [Proof of Reserves](/okx/proof-of-reserves) — vérifier que la base et les portefeuilles concordent
