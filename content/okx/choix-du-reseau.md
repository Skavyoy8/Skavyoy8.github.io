---
titre: "Le choix du réseau"
section: "okx"
ordre: 40
resume: "« USDT » n'est pas un actif : c'est un nom porté par une douzaine de jetons distincts, un par blockchain, qui ne communiquent pas entre eux. Envoyer sur le mauvais réseau, c'est écrire dans le mauvais registre."
niveau: "bases"
prerequis: ["/okx/on-chain-off-chain", "/okx/depots-retraits"]
termes: ["erc-20", "trc-20", "evm", "chain-id", "adresse", "base58check", "bech32", "keccak", "gas", "energie", "pont"]
sources:
  - titre: "Tether — Supported protocols (chaînes d'émission et adresses de contrat)"
    url: "https://tether.to/en/supported-protocols"
  - titre: "TRON — Account, dérivation d'adresse"
    url: "https://developers.tron.network/docs/account"
  - titre: "TRON — Paying for resources (prix de l'énergie et de la bande passante)"
    url: "https://developers.tron.network/docs/paying-for-resources"
  - titre: "EIP-155 — Simple replay attack protection (chainId)"
    url: "https://eips.ethereum.org/EIPS/eip-155"
  - titre: "EIP-55 — Mixed-case checksum address encoding"
    url: "https://eips.ethereum.org/EIPS/eip-55"
  - titre: "BIP 173 — Bech32, format d'adresse et somme de contrôle"
    url: "https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki"
  - titre: "OKX — API v5, champ chain (USDT-ERC20, USDT-TRC20)"
    url: "https://www.okx.com/docs-v5/en/"
statut: "redige"
---

**Un même nom de jeton désigne des objets différents sur des chaînes différentes ; l'adresse de destination ne porte aucune information sur la chaîne, donc rien ne peut refuser un envoi vers la mauvaise.**

## Le problème que ça résout

Tether émet de l'USDT sur quatorze chaînes selon sa propre page de transparence : Ethereum, Tron, Solana, Avalanche, BNB Smart Chain, TON, Near, Aptos, Tezos, Celo, Kaia, Liquid, Polkadot AssetHub, Cosmos via Kava. Sur Ethereum, l'USDT est le contrat `0xdac17f958d2ee523a2206206994597c13d831ec7`. Sur Tron, c'est `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t`. Deux programmes, deux registres, aucune passerelle native entre eux.

Pourquoi multiplier ? Parce que le coût et la vitesse d'un transfert ne dépendent pas du jeton mais de la chaîne qui le porte. Le même dollar tokenisé ne coûte pas le même prix à déplacer selon le registre où il est inscrit. Émettre partout, c'est laisser l'utilisateur choisir son compromis.

Le prix à payer pour cette souplesse, c'est un piège structurel : l'interface d'OKX affiche « USDT » comme s'il s'agissait d'une seule chose, et te demande ensuite de choisir un « réseau » comme s'il s'agissait d'une préférence. Ce n'est pas une préférence. C'est le choix de l'objet lui-même.

## Comment ça marche

Trois niveaux d'incompatibilité, du plus évident au plus vicieux.

### 1. Les registres sont disjoints

Ton solde d'USDT ERC-20 est une entrée dans le tableau `balanceOf` d'un contrat déployé sur Ethereum. Ce contrat n'existe pas sur Tron. Un nœud Tron ne lit jamais un bloc Ethereum, ne connaît pas son état, et n'a aucun moyen d'apprendre qu'une transaction y a eu lieu. Les ponts qui font circuler la valeur entre chaînes sont des systèmes ajoutés par-dessus, avec leurs propres contrats et leurs propres hypothèses de confiance — ils ne font pas partie du protocole.

### 2. Les formats d'adresse ne protègent que partiellement

| Chaîne | Format | Contenu | Contrôle d'intégrité |
|---|---|---|---|
| Bitcoin | bech32 / bech32m — `bc1…` | témoin du script | code BCH, détecte jusqu'à 4 erreurs |
| Ethereum et EVM | `0x` + 40 hexa | 20 octets | EIP-55, casse mixte, **optionnel** |
| Tron | base58check — `T…`, 34 car. | `0x41` + 20 octets | 4 octets de double SHA-256 |
| Solana | base58 | clé publique ed25519, 32 octets | **aucun** |

Un logiciel refuse une adresse Bitcoin collée dans un champ Ethereum : les formats ne se ressemblent pas. Ce garde-fou attrape les erreurs grossières. Il ne détecte que des erreurs de **forme**, jamais des erreurs de **chaîne**.

### 3. Le cas EVM : la même adresse, partout

Ethereum, BNB Smart Chain, Polygon, Avalanche C-Chain, Arbitrum, Optimism, X Layer — toutes ces chaînes dérivent l'adresse de la même façon : les 20 derniers octets de `keccak256(clé publique)`. La même clé privée produit donc **littéralement la même adresse** sur toutes. Et l'identifiant de chaîne introduit par EIP-155, le `chainId`, se trouve dans la transaction signée, pas dans l'adresse.

Tron pousse la chose plus loin : sa documentation officielle indique que le protocole utilise la même courbe elliptique secp256k1 qu'Ethereum, et que « les 20 octets qui suivent le préfixe `41` sont identiques à l'adresse Ethereum dérivée de la même clé publique ». Une adresse Tron et une adresse Ethereum issues de la même clé sont le même nombre, écrit dans deux alphabets.

<figure class="schema">
<svg viewBox="0 0 640 250" role="img" aria-label="Une même clé privée produit les mêmes vingt octets d'adresse sur Ethereum, BNB Chain et Tron ; OKX n'indexe que la chaîne qu'il t'a indiquée">
  <text x="8" y="18" font-size="11" fill="var(--texte-faible)">UNE SEULE CLÉ</text>
  <text x="310" y="18" font-size="11" fill="var(--texte-faible)">TROIS REGISTRES DISTINCTS</text>

  <rect x="8" y="102" width="86" height="40" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="51" y="120" font-size="11" fill="var(--texte)" text-anchor="middle">clé privée</text>
  <text x="51" y="134" font-size="9" fill="var(--texte-faible)" text-anchor="middle">secp256k1</text>

  <path d="M94 122 L114 122" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M108 118 L116 122 L108 126 Z" fill="var(--texte-faible)"/>

  <rect x="116" y="98" width="156" height="48" rx="4" fill="var(--accent-voile)" stroke="var(--accent)"/>
  <text x="194" y="117" font-size="10" fill="var(--accent)" text-anchor="middle">keccak256(clé publique)</text>
  <text x="194" y="134" font-size="10" fill="var(--code-texte)" text-anchor="middle">20 octets : 66d0…0428</text>

  <path d="M272 122 L292 60 M272 122 L292 122 M272 122 L292 190" stroke="var(--texte-faible)" stroke-width="1.2" fill="none"/>

  <rect x="294" y="36" width="222" height="46" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="304" y="55" font-size="10" fill="var(--texte)">Ethereum</text>
  <text x="304" y="72" font-size="10" fill="var(--code-texte)">0x66d0…0428</text>

  <rect x="294" y="98" width="222" height="46" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="304" y="117" font-size="10" fill="var(--texte)">BNB Smart Chain</text>
  <text x="304" y="134" font-size="10" fill="var(--code-texte)">0x66d0…0428</text>

  <rect x="294" y="166" width="222" height="46" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="304" y="185" font-size="10" fill="var(--texte)">Tron</text>
  <text x="304" y="202" font-size="10" fill="var(--code-texte)">41 66d0…0428 → base58check</text>

  <path d="M516 59 L534 59 M516 121 L534 121 M516 189 L534 189" stroke="var(--texte-faible)" stroke-width="1.2"/>

  <rect x="536" y="40" width="96" height="38" rx="3" fill="var(--accent-voile)" stroke="var(--accent)"/>
  <text x="584" y="56" font-size="10" fill="var(--accent)" text-anchor="middle">indexé</text>
  <text x="584" y="70" font-size="9" fill="var(--texte-doux)" text-anchor="middle">par OKX</text>

  <rect x="536" y="102" width="96" height="38" rx="3" fill="var(--fond-2)" stroke="var(--danger)"/>
  <text x="584" y="118" font-size="10" fill="var(--danger)" text-anchor="middle">non indexé</text>
  <text x="584" y="132" font-size="9" fill="var(--texte-faible)" text-anchor="middle">jamais crédité</text>

  <rect x="536" y="170" width="96" height="38" rx="3" fill="var(--fond-2)" stroke="var(--danger)"/>
  <text x="584" y="186" font-size="10" fill="var(--danger)" text-anchor="middle">non indexé</text>
  <text x="584" y="200" font-size="9" fill="var(--texte-faible)" text-anchor="middle">jamais crédité</text>

  <text x="294" y="232" font-size="10" fill="var(--texte-doux)">le chainId d'EIP-155 est dans la transaction —</text>
  <text x="294" y="245" font-size="10" fill="var(--attention)">jamais dans l'adresse</text>
</svg>
<figcaption>L'adresse ne dit rien de la chaîne. Aucun logiciel, aucun contrôle de format, aucune somme de contrôle ne peut donc détecter une erreur de réseau.</figcaption>
</figure>

### Pourquoi c'est irrécupérable

L'adresse de dépôt qu'OKX t'affiche est produite pour un couple **(actif, chaîne)**. Leur infrastructure fait tourner un indexeur qui surveille cette adresse sur cette chaîne-là. Un transfert arrivé sur une autre chaîne n'est jamais vu par le pipeline de crédit : ce n'est pas un rejet, c'est une absence. Personne ne cherche.

Ce qui reste possible dépend ensuite de qui détient la clé de l'adresse de destination :

| Situation | Qui contrôle la clé | Issue |
|---|---|---|
| Mauvaise chaîne EVM, adresse d'un exchange | l'exchange | possible si son infrastructure de signature couvre cette chaîne ; procédure manuelle, discrétionnaire, souvent payante, jamais garantie |
| Mauvaise chaîne EVM, adresse de ton propre portefeuille | toi | récupérable : tu ajoutes le réseau dans le portefeuille et tu déplaces les jetons — il te faut juste un peu de jeton natif pour payer les frais |
| Adresse mal recopiée sur une chaîne sans somme de contrôle | personne | définitif |
| Envoi vers l'adresse du contrat de jeton lui-même | personne | définitif : un contrat ERC-20 n'a pas de fonction d'annulation |

Dans les deux derniers cas, les jetons ne sont pas « détruits ». Ils sont inscrits, pour toujours, au crédit d'un compte dont personne au monde ne possède la clé privée.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> **C'est le même plan d'adressage sur deux VLAN non routés.**
>
> `192.168.10.20` est une adresse parfaitement bien formée sur le VLAN 10 comme sur le VLAN 20. Si tu envoies ta trame sur le mauvais VLAN, elle n'est pas rejetée : elle est livrée. Simplement, elle est livrée à *l'autre* machine, celle qui porte cette adresse sur ce VLAN-là. Aucune erreur ne remonte, aucun ICMP, rien. Ta seule trace, c'est que le service attendu ne répond jamais.
>
> Le jeton USDT, c'est le nom d'hôte. La chaîne, c'est le VLAN. Une adresse `0x…` est valide sur toutes les chaînes EVM à la fois, et c'est précisément pour ça que rien ne peut refuser l'envoi.
>
> Pousse l'analogie jusqu'au bout et tu retrouves la cause exacte : **le tag 802.1Q est dans la trame, pas dans l'adresse IP.** Le `chainId` d'EIP-155 est dans la transaction signée, pas dans l'adresse. Dans les deux cas, l'information qui dit « sur quel réseau » ne voyage pas avec l'identifiant du destinataire. Un routeur mal configuré et un portefeuille mal réglé produisent la même classe de panne : une livraison correcte au mauvais endroit.

## Exemple chiffré

Le même USDT, deux chaînes, mesuré directement sur les réseaux le 22 août 2026.

**Le coût brut d'un transfert de jetons.**

Sur Ethereum, `eth_estimateGas` sur le contrat Tether renvoie **46 479 unités de gas** pour un `transfer`. Le bloc 25 811 841 porte une base fee de 0,162 834 gwei :

```
46 479 gas × 0,162 834 gwei = 7 568 gwei = 0,000 007 568 ETH
à 2 420,68 USDT/ETH         → 0,018 3 USDT
```

Sur Tron, `triggerconstantcontract` sur le contrat Tether renvoie **64 285 unités d'énergie** vers un destinataire qui détient déjà de l'USDT, et **130 285** vers un compte vierge. Le paramètre de chaîne `getEnergyFee` vaut 100 sun par unité d'énergie :

```
64 285 énergie × 100 sun = 6 428 500 sun = 6,428 5 TRX
à 0,344 23 USDT/TRX      → 2,213 USDT

130 285 énergie          = 13,028 5 TRX → 4,485 USDT (compte vierge)
```

**À cet instant, Tron coûte 121 fois plus cher qu'Ethereum pour le même transfert d'USDT.** Le réflexe « TRC-20, c'est le moins cher » date d'une époque où le gas Ethereum se comptait en dizaines de gwei. Le calcul s'inverse dès que la demande remonte : à 30 gwei, le même transfert Ethereum revient à 3,375 USDT.

Deux nuances qui comptent, et qu'on ne lit nulle part :

- Sur Tron, le TRX n'est brûlé que si le compte n'a pas gelé de TRX pour obtenir de l'énergie. Un exchange en gèle. Son coût marginal réel est proche de zéro — ce qui n'a aucun rapport avec le montant qu'il te facture au retrait.
- Sur les 64 285 unités d'énergie, 49 635 sont une **pénalité**. Le modèle d'énergie dynamique de Tron surtaxe les contrats les plus sollicités, avec un facteur plafonné à 4,4×. Le contrat USDT tourne à 4,39× : il est taxé quasiment au maximum prévu par le protocole.

**Le temps.** Mesuré sur les 1 000 derniers blocs de chaque chaîne :

| | Ethereum | Tron |
|---|---|---|
| Intervalle moyen mesuré | 12,06 s | 3,00 s |
| Coût mesuré du transfert USDT | 0,018 USDT | 2,21 USDT |
| Adresse | `0x` + 20 octets | `T…` base58check |
| Somme de contrôle d'adresse | EIP-55, optionnelle | 4 octets, obligatoire |

À nombre de confirmations égal, Tron rend la main quatre fois plus vite. Mais le nombre de confirmations exigé par OKX n'est pas le même d'une chaîne à l'autre, et n'est pas lisible sans clé API — voir [Dépôts et retraits](/okx/depots-retraits).

## Sur OKX

- **L'écran de dépôt impose le choix du réseau avant d'afficher l'adresse.** Chaque réseau a sa propre adresse. Il n'existe pas d'adresse « USDT » tout court.
- **Les noms d'OKX sont ceux du jeton, pas de la chaîne.** Le champ `chain` de l'API v5 prend des valeurs de la forme `USDT-ERC20`, `USDT-TRC20`, `BTC-Bitcoin`. « ERC-20 » est un standard de contrat, pas un réseau : c'est la façon d'OKX de dire « Ethereum ». Le raccourci est répandu et il entretient exactement la confusion que cette page décrit.
- **Au retrait par API, `chain` est un paramètre à part entière.** La documentation précise que s'il n'est pas renseigné, la chaîne principale de l'actif est utilisée par défaut. Un script qui oublie ce champ enverra sur une chaîne qu'il n'a pas choisie.
- **X Layer**, la chaîne d'OKX, est une chaîne EVM de plus dans la liste : même format d'adresse, registre différent, mêmes conséquences en cas d'erreur.

## Les pièges

> [!piege] « L'application a accepté l'adresse, donc c'est la bonne »
> Une adresse EVM est valide sur toutes les chaînes EVM simultanément. La validation de format ne peut pas détecter l'erreur de chaîne, parce que l'information de chaîne n'est pas dans l'adresse. L'absence de message d'erreur ne prouve rien.

> [!piege] Solana n'a aucune somme de contrôle d'adresse
> Une adresse Solana est le simple encodage base58 d'une clé publique ed25519 de 32 octets. N'importe quelle suite de 32 octets est une adresse valide. Une faute de frappe qui conserve la longueur produit une adresse acceptée, dont la clé privée n'existe nulle part. Tron encode 4 octets de double SHA-256 et bech32 embarque un code correcteur : ces deux-là refusent la coquille. Solana, non.

> [!piege] « USDT » sur une chaîne absente de la liste Tether n'est pas de l'USDT Tether
> Tether publie la liste de ses chaînes d'émission. Sur une chaîne qui n'y figure pas, un jeton nommé USDT est une représentation créée par un pont : un contrat tiers qui promet de détenir l'original ailleurs. Même symbole, même prix affiché, risque de contrepartie supplémentaire.

> [!piege] Le mauvais réseau et le mémo oublié ne sont pas le même incident
> Mémo oublié : les fonds sont chez l'exchange, mal rattachés. Mauvais réseau : ils sont sur une autre chaîne, souvent hors de portée de tout le monde. Le premier se résout par un ticket, le second par un miracle.

> [!verifier] Les réseaux proposés changent
> OKX ouvre et ferme des chaînes de dépôt et de retrait sans préavis, actif par actif. La liste qui fait foi est celle affichée dans l'écran de dépôt au moment où tu envoies, doublée du champ `chain` de [l'API v5](https://www.okx.com/docs-v5/en/). Les mesures de coût et de temps de cette page sont un instantané du 22 août 2026 : le gas Ethereum et le prix du TRX varient en continu.

## Pour aller plus loin

- [Dépôts et retraits](/okx/depots-retraits) — l'adresse, le mémo, les confirmations
- [On-chain vs off-chain](/okx/on-chain-off-chain) — pourquoi seuls ces deux moments touchent une chaîne
- [Les frais chez OKX](/okx/frais) — ce que le choix du réseau change sur ta facture
- [Les fonctions de hachage](/fondamentaux/hachage) — keccak, SHA-256 et les sommes de contrôle d'adresse
