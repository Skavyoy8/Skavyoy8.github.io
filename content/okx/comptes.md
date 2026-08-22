---
titre: "Comptes de trading et de financement"
section: "okx"
ordre: 80
resume: "Pourquoi OKX découpe ton solde en deux comptes, ce que chacun peut faire, et pourquoi le transfert entre les deux est gratuit et instantané."
niveau: "bases"
prerequis: ["/okx/on-chain-off-chain", "/okx/exchange-centralise"]
termes: ["compte-financement", "compte-trading", "sous-compte", "transfert-interne", "collateral", "gel-de-fonds", "uid"]
sources:
  - titre: "OKX — API v5, Funding Account : Funds transfer et Get balance"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — Comment transférer mes fonds (app et web)"
    url: "https://www.okx.com/help/assets-transfer-app-web-based"
  - titre: "OKX — Transferts et dépôts avec les sous-comptes"
    url: "https://www.okx.com/help/how-do-i-transfer-deposit-crypto-with-my-sub-accounts"
  - titre: "OKX — Pourquoi je ne vois pas ou ne peux pas utiliser mon solde"
    url: "https://www.okx.com/help/why-cant-i-see-or-use-my-crypto-balance"
statut: "redige"
---

**OKX découpe ton solde en deux comptes : le compte de financement, seul relié à la blockchain et aux moyens de paiement, et le compte de trading, seul relié au carnet d'ordres.**

## Le problème que ça résout

Un compte qui encaisse un dépôt on-chain et un compte qui sert de collatéral à une position à levier n'ont pas les mêmes contraintes. Le **collatéral**, c'est ce qui est immobilisé pour garantir une position : tant que la position est ouverte, ces fonds ne t'appartiennent plus vraiment, ils garantissent une dette.

Côté dépôt-retrait, le solde doit être stable, réconciliable avec ce que contiennent les portefeuilles d'OKX, et protégé par la permission la plus forte du système.

Côté trading, le solde n'est pas une quantité fixe : c'est une **équité** recalculée en continu par le moteur de risque, à partir des positions ouvertes, du prix de marque et du profit ou perte non réalisé. Elle bouge sans que tu fasses quoi que ce soit.

Mélanger les deux crée un problème concret : un ordre de retrait pourrait vider le collatéral d'une position pendant que le moteur de risque calcule la marge. La séparation n'est pas une décoration d'interface, c'est une frontière de responsabilité entre deux sous-systèmes qui ne tournent pas au même rythme.

## Comment ça marche

<figure class="schema">
<svg viewBox="0 0 640 320" role="img" aria-label="Le compte de financement est relié à la blockchain et aux moyens de paiement, le compte de trading au moteur d'appariement, et un transfert interne unique relie les deux">
  <rect x="14" y="26" width="252" height="30" rx="4" fill="var(--fond-alt)" stroke="var(--bordure)"/>
  <text x="140" y="45" font-size="10" fill="var(--texte-doux)" text-anchor="middle">BLOCKCHAIN · CARTE · P2P</text>

  <rect x="374" y="26" width="252" height="30" rx="4" fill="var(--fond-alt)" stroke="var(--bordure)"/>
  <text x="500" y="45" font-size="10" fill="var(--texte-doux)" text-anchor="middle">CARNET · MOTEUR DE RISQUE</text>

  <path d="M140 56 L140 70 M500 56 L500 70" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M136 66 L140 72 L144 66 Z M496 66 L500 72 L504 66 Z" fill="var(--texte-faible)"/>

  <rect x="14" y="72" width="252" height="196" rx="6" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="26" y="92" font-size="12" fill="var(--texte-fort)" font-weight="600">Compte de financement</text>
  <text x="26" y="107" font-size="10" fill="var(--code-texte)">funding — valeur 6 dans l'API</text>
  <line x1="26" y1="115" x2="254" y2="115" stroke="var(--bordure)"/>
  <text x="26" y="133" font-size="10" fill="var(--texte)">adresse de dépôt on-chain</text>
  <text x="26" y="151" font-size="10" fill="var(--texte)">ordre de retrait on-chain</text>
  <text x="26" y="169" font-size="10" fill="var(--texte)">achat par carte, P2P, fiat</text>
  <text x="26" y="187" font-size="10" fill="var(--texte)">Earn, staking, prêts, cadeaux</text>
  <text x="26" y="205" font-size="10" fill="var(--texte)">transferts vers les sous-comptes</text>
  <rect x="26" y="222" width="228" height="34" rx="4" fill="var(--danger-voile)" stroke="var(--danger)"/>
  <text x="140" y="236" font-size="10" fill="var(--danger)" text-anchor="middle">seul compte d'où un retrait</text>
  <text x="140" y="249" font-size="10" fill="var(--danger)" text-anchor="middle">on-chain peut partir</text>

  <rect x="374" y="72" width="252" height="196" rx="6" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="386" y="92" font-size="12" fill="var(--texte-fort)" font-weight="600">Compte de trading</text>
  <text x="386" y="107" font-size="10" fill="var(--code-texte)">trading — valeur 18 dans l'API</text>
  <line x1="386" y1="115" x2="614" y2="115" stroke="var(--bordure)"/>
  <text x="386" y="133" font-size="10" fill="var(--texte)">carnet spot et marge</text>
  <text x="386" y="151" font-size="10" fill="var(--texte)">perpétuels, futures, options</text>
  <text x="386" y="169" font-size="10" fill="var(--texte)">marge, PnL, liquidation</text>
  <text x="386" y="187" font-size="10" fill="var(--texte)">gel des fonds d'un ordre ouvert</text>
  <text x="386" y="205" font-size="10" fill="var(--texte)">équité recalculée en continu</text>
  <rect x="386" y="222" width="228" height="34" rx="4" fill="var(--info-voile)" stroke="var(--info)"/>
  <text x="500" y="236" font-size="10" fill="var(--info)" text-anchor="middle">aucune route vers</text>
  <text x="500" y="249" font-size="10" fill="var(--info)" text-anchor="middle">l'extérieur</text>

  <text x="320" y="158" font-size="10" fill="var(--accent)" text-anchor="middle">transfert interne</text>
  <path d="M274 172 L366 172" stroke="var(--accent)" stroke-width="1.6"/>
  <path d="M282 168 L274 172 L282 176 Z M358 168 L366 172 L358 176 Z" fill="var(--accent)"/>
  <text x="320" y="190" font-size="10" fill="var(--texte-faible)" text-anchor="middle">0 frais</text>
  <text x="320" y="203" font-size="10" fill="var(--texte-faible)" text-anchor="middle">instantané</text>

  <text x="320" y="292" font-size="11" fill="var(--code-texte)" text-anchor="middle">POST /api/v5/asset/transfer</text>
  <text x="320" y="308" font-size="10" fill="var(--texte-faible)" text-anchor="middle">{"ccy":"USDT","amt":"1.5","from":"6","to":"18"}</text>
</svg>
<figcaption>Un seul endpoint relie les deux comptes, avec deux valeurs autorisées de chaque côté. Tout le reste passe par l'un ou par l'autre, jamais par les deux.</figcaption>
</figure>

### Deux comptes, deux modules d'API

La preuve que la séparation est structurelle et non cosmétique est dans la documentation : ce ne sont pas deux vues d'une même table, ce sont deux endpoints, dans deux modules distincts, avec des limites de débit différentes.

| | Compte de financement | Compte de trading |
|---|---|---|
| Module d'API | Funding Account | Trading Account |
| Lire le solde | `GET /api/v5/asset/balances` | `GET /api/v5/account/balance` |
| Limite de débit | 6 req/s, par User ID | 10 req/2 s, par User ID |
| Journal des mouvements | `GET /api/v5/asset/bills` | `GET /api/v5/account/bills` |
| Filtres du journal | par devise | par devise **et par instrument** (`SPOT`, `MARGIN`, `SWAP`, `FUTURES`, `OPTION`) |

Le journal des mouvements est le plus parlant. Côté financement, la liste des types d'écriture comprend `1: Deposit`, `2: Withdrawal`, `28: Manually claimed Airdrop`, `83: Staking yield`, `116: [Fiat] Place an order`, `176: Loan`, `272: [Convert] Buy Crypto/Fiat`, `313: Sent by gift`… plus de deux cents types, dont exactement deux concernent l'autre compte : `130: Transferred from Trading account` et `131: Transferred to Trading account`.

Côté trading, les écritures sont indexées par instrument et par mode de marge. Il n'y a pas de type « dépôt » : ce compte n'a aucun contact avec une chaîne.

Le compte de financement est donc le hub de tout ce qui touche à l'extérieur. Le compte de trading est un compartiment fermé branché sur un seul système : le moteur d'appariement.

### Le transfert

Un seul endpoint, deux valeurs par champ :

```
POST /api/v5/asset/transfer
{"ccy":"USDT","amt":"1.5","from":"6","to":"18"}
```

| Champ | Valeurs | Signification |
|---|---|---|
| `from` | `6` / `18` | compte émetteur : financement / trading |
| `to` | `6` / `18` | compte destinataire |
| `type` | `0` | transfert à l'intérieur de ton compte (défaut) |
| | `1` | compte principal → sous-compte, clé du principal |
| | `2` | sous-compte → compte principal, clé du principal |
| | `3` | sous-compte → compte principal, clé du sous-compte |
| | `4` | sous-compte → sous-compte, clé du sous-compte |
| `subAcct` | nom | obligatoire si `type` vaut `1`, `2` ou `4` |

Limite de débit : **2 requêtes par seconde**, par utilisateur *et par devise*. C'est bas comparé aux 10 ordres par seconde des endpoints de marché, ce qui n'a rien d'étonnant : chaque appel est une écriture, pas une lecture.

Pourquoi c'est gratuit et instantané : parce que rien ne bouge. C'est un `UPDATE` sur deux lignes de la même base, dans la même transaction SQL. Il n'y a aucune signature à produire, aucun frais de réseau à payer, aucune confirmation à attendre. Voir [On-chain vs off-chain](/okx/on-chain-off-chain).

### Les sous-comptes

Un sous-compte est un jeu de comptes supplémentaire — financement plus trading — sous le même titulaire. Il a ses propres soldes, ses propres clés API, ses propres limites de débit d'ordres, et il compte comme un utilisateur distinct pour le calcul des quotas.

Deux règles importantes, tirées de la documentation :

- **Un sous-compte standard peut recevoir un dépôt**, mais la fonction doit d'abord être activée depuis le compte principal.
- **Un sous-compte ne peut pas retirer.** La documentation de l'endpoint de retrait est explicite : « Only supported withdrawal of assets from funding account. Common sub-account does not support withdrawal. » Pour sortir des fonds d'un sous-compte, il faut d'abord les rapatrier vers le compte principal.

Le transfert sous-compte vers sous-compte est désactivé par défaut et demande une autorisation explicite depuis le compte principal.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> C'est une architecture DMZ.
>
> Le compte de financement est la zone démilitarisée : c'est le seul compte qui a une interface vers l'extérieur. Une adresse publique en entrée (l'adresse de dépôt), une porte de sortie en sortie (l'ordre de retrait). C'est là que se concentre le risque, donc c'est là que se concentrent les protections — permission `Withdraw` de la clé API, liste blanche d'adresses, délais, vérifications supplémentaires.
>
> Le compte de trading est le réseau interne. Aucune route vers l'extérieur : la documentation d'OKX le dit littéralement, un retrait ne peut partir que du compte de financement. Pour faire sortir un satoshi du compte de trading, il faut d'abord le faire repasser par la DMZ.
>
> Et le transfert, c'est le passage par le pare-feu. Un seul endpoint, deux valeurs autorisées pour `from`, deux pour `to`. Une ACL à quatre combinaisons possibles, dont une seule direction utile dans chaque sens. Le fait que le passage soit gratuit et instantané ne veut pas dire qu'il est ouvert : il est *contrôlé*, simplement le contrôle est un `UPDATE` transactionnel et pas un filtrage de paquets.
>
> Deuxième angle, plus proche encore : c'est du moindre privilège appliqué au stockage. Les trois permissions d'une clé API sont `Read`, `Trade`, `Withdraw`. Une clé `Trade` peut acheter, vendre, et transférer entre tes propres comptes — la documentation le précise, « funding transfer » fait partie de `Trade`. Elle ne peut rien faire sortir. Seule `Withdraw` le peut, et elle n'agit que sur le compte de financement. La zone où l'argent peut disparaître est réduite au minimum, exactement comme on limite la surface d'un compte de service.

## Exemple chiffré

Un dépôt de 500 USDT, jusqu'à l'achat, puis retour. Les deux colonnes sont les deux soldes, lus par deux appels d'API différents.

| # | Événement | Financement (`6`) | Trading (`18`) |
|---|---|---|---|
| 1 | Dépôt on-chain de 500 USDT confirmé | 500,0000 USDT | — |
| 2 | Ordre d'achat de BTC → **refusé** | 500,0000 USDT | — |
| 3 | `transfer` 500 USDT, `from:6 to:18` | 0,0000 USDT | 500,0000 USDT |
| 4 | Achat de 0,006 BTC à 77 229,4 | 0,0000 USDT | 0,006 BTC + 36,6236 USDT |
| 5 | `transfer` 0,006 BTC, `from:18 to:6` | 0,006 BTC | 36,6236 USDT |
| 6 | Retrait on-chain du BTC | possible | impossible |

**Étape 2.** L'ordre est refusé alors que l'application affiche bien 500 USDT quelque part. Le code renvoyé est `51008_1000` — « Order failed. Insufficient USDT balance in account ». Le moteur de risque ne regarde que le compte de trading ; pour lui, ton solde est nul.

**Étape 4.** Le calcul, hors frais :

```
0,006 BTC × 77 229,4 USDT = 463,3764 USDT
500,0000 − 463,3764        =  36,6236 USDT restants
```

**Le coût réel des étapes 3 et 5.** Deux requêtes HTTP, deux `UPDATE`, zéro octet écrit sur une chaîne, zéro frais, zéro attente de confirmation. Compare avec l'étape 1 et l'étape 6, qui sont chacune une transaction on-chain avec des frais de réseau et un délai de confirmation.

C'est le même montant qui se déplace, mais pas le même objet : aux étapes 3 et 5, on déplace une ligne comptable ; aux étapes 1 et 6, on déplace un actif.

## Sur OKX

**Où c'est dans l'app.** Onglet des actifs, puis l'action de transfert : tu choisis la portée (à l'intérieur du compte principal, ou entre principal et sous-compte), la source, la destination, l'actif et le montant.

> [!verifier] Les libellés exacts de l'interface changent
> Les noms affichés, la position des menus et les options disponibles varient selon la version de l'app, la langue et la juridiction du compte. Les valeurs `6` et `18`, elles, sont stables et documentées dans l'API. En cas de doute, la page d'aide officielle sur les transferts fait foi.

**Ce que l'interface ne montre pas.** L'endpoint `GET /api/v5/asset/asset-valuation` renvoie la valorisation détaillée par compte, et la liste est plus longue que deux :

```json
{"details":{"funding":"0.09","trading":"2544.28","earn":"1122.73","classic":"124.6"},
 "totalBal":"3790.09"}
```

`earn` est un troisième compartiment, `classic` un quatrième marqué **déprécié** dans la documentation. La dichotomie financement / trading est donc une simplification de présentation : le découpage réel en compartiments est plus fin, et les produits Earn constituent bien une poche à part.

**Un faux ami dans l'API.** L'endpoint `GET /api/v5/account/max-withdrawal` est décrit comme « the maximum transferable amount **from trading account to funding account** ». Dans le vocabulaire du compte de trading, *withdrawal* ne veut pas dire retrait on-chain : ça veut dire « sortie vers le compte de financement ». Rien ne quitte OKX.

## Les pièges

> [!piege] « Mes fonds ont disparu »
> Ils sont dans l'autre compte. C'est la première cause de panique sur cette plateforme, et OKX a une page d'aide dédiée à ce seul sujet. Le réflexe : vérifier les deux soldes avant toute autre chose. En API, ça fait deux requêtes, pas une.

> [!piege] Transfert gratuit ne veut pas dire retrait gratuit
> Le transfert `6 ↔ 18` est interne et coûte zéro. Le retrait on-chain coûte les frais de réseau, prélevés en plus du montant demandé. Ce sont deux endpoints différents pour deux opérations qui n'ont rien en commun sauf le mot « transfert » dans le langage courant.
>
> Cas limite qui embrouille tout le monde : l'endpoint de **retrait** avec `dest=3` envoie des fonds à un autre utilisateur OKX, et là aussi c'est gratuit — « For internal transfer, transaction fee is always 0 ». C'est un retrait au sens de l'API, pas au sens de la blockchain.

> [!piege] Un ordre ouvert ou une position bloque le transfert
> Les fonds engagés dans un ordre en attente sont gelés ; ceux qui servent de collatéral à une position ouverte le sont aussi. Le transfert vers le compte de financement échoue tant que l'ordre n'est pas annulé ou la position fermée. Ce n'est pas un bug, c'est la définition du collatéral : ces fonds garantissent un engagement.

> [!piege] Un sous-compte n'est pas un compte séparé
> Même titulaire, même KYC, même personne juridique, mêmes portefeuilles chez OKX. Un sous-compte isole des soldes et des clés API, pas des responsabilités ni des risques. Si l'établissement fait défaut, les sous-comptes tombent avec le reste. Ils servent à cloisonner des stratégies ou des quotas de débit, pas à cloisonner un risque de contrepartie.

> [!piege] La séparation n'existe que chez OKX
> Aucune blockchain ne connaît la notion de « compte de financement ». C'est un découpage interne à la base de données d'OKX. Un explorateur de blocs ne verra jamais la différence, parce qu'il n'y en a aucune à voir.

## Pour aller plus loin

- [On-chain vs off-chain](/okx/on-chain-off-chain) — pourquoi le transfert interne est gratuit
- [Ce qu'est un exchange centralisé](/okx/exchange-centralise) — les quatre étages derrière ces deux comptes
- [L'API OKX v5](/okx/api-v5) — les permissions `Read` / `Trade` / `Withdraw` en détail
- [Dépôts et retraits](/okx/depots-retraits) — ce qui se passe des deux côtés de la frontière
- [La marge](/derives/marge) — pourquoi l'équité du compte de trading bouge toute seule
