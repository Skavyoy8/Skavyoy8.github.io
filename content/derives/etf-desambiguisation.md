---
titre: "« ETF » : deux produits sans aucun rapport"
section: "derives"
ordre: 120
resume: "Un ETF Bitcoin au comptant et un token à levier « x3 » portent le même mot et n'ont rien en commun. Le second perd de la valeur même quand le prix ne bouge pas."
niveau: "intermediaire"
prerequis: ["/okx/on-chain-off-chain"]
termes: ["etf", "token-a-levier", "decroissance", "levier", "creance", "custody", "spot"]
sources:
  - titre: "OKX — API v5, liste publique des instruments"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "AMF — autorité des marchés financiers"
    url: "https://www.amf-france.org/fr"
  - titre: "ESMA — autorité européenne des marchés financiers"
    url: "https://www.esma.europa.eu/"
statut: "redige"
---

**Un ETF Bitcoin au comptant est un fonds coté qui détient réellement des bitcoins. Un « token à levier x3 » est un produit dérivé rebalancé chaque jour qui perd de la valeur avec le temps. Les deux portent le mot ETF dans le langage courant, et n'ont rien en commun.**

## Le problème que ça résout

Cette page n'explique pas un mécanisme : elle sépare deux objets que le vocabulaire courant confond, et dont la confusion coûte cher.

Le sigle ETF signifie *exchange-traded fund*, fonds négocié en bourse. Il désigne un produit financier régulé, qui détient un panier d'actifs et dont les parts s'échangent comme une action.

Certaines plateformes crypto ont repris le mot pour des jetons qui ne sont ni des fonds, ni négociés en bourse, ni régulés de la même façon.

## Comment ça marche

| | ETF Bitcoin au comptant | Token à levier « x3 » |
|---|---|---|
| Nature | Fonds régulé, coté en bourse | Jeton émis par une plateforme |
| Ce qu'il détient | Des bitcoins en garde | Des positions sur dérivés |
| Où il s'échange | Bourse traditionnelle | Sur la plateforme émettrice |
| Horizon | Indifférent | Une journée |
| Superviseur | Régulateur des marchés | La plateforme elle-même |
| Détention à long terme | Suit le prix | **Perd de la valeur mécaniquement** |

Le point décisif est la dernière ligne, et il est mathématique, pas conjoncturel.

Un produit à levier vise à multiplier par *k* la variation **quotidienne** du sous-jacent. Chaque soir il rééquilibre sa position pour retrouver son levier cible. Cette contrainte de rebalancement fait qu'il n'y a **aucune raison** que le produit multiplie par *k* la variation sur plusieurs jours.

Sur une série de variations, l'écart s'écrit approximativement :

```
perte ≈ k(k−1)/2 × σ² × nombre de jours
```

où σ est la volatilité quotidienne. Le terme est toujours négatif dès que *k* > 1, et il croît avec le **carré** de la volatilité. Il ne dépend pas du sens du marché : il fonctionne à la hausse comme à la baisse.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> C'est une erreur d'intégration cumulée. Le produit asservit correctement sa **dérivée** — la variation du jour est bien multipliée par trois — mais personne n'asservit la **valeur intégrée**. Chaque rebalancement remet le gain à zéro et repart de la nouvelle base.
>
> Résultat : l'écart entre la sortie réelle et la sortie « x3 attendue » ne se corrige jamais, il s'accumule. Exactement comme une dérive d'intégrateur qu'aucune boucle de retour ne rattrape.

## Exemple chiffré

Voici la démonstration sur des données réelles, à partir des 90 dernières bougies quotidiennes de BTC-USDT relevées le 22 août 2026.

Le sous-jacent, d'abord :

```
BTC au départ    76 519 USDT
BTC à l'arrivée  76 956 USDT
variation          +0,57 % sur 90 jours
```

L'intuition dit qu'un produit x3 aurait fait environ **+1,71 %**. Reconstituons ce qu'il aurait réellement fait, en appliquant chaque jour trois fois la variation quotidienne :

| Produit | Résultat sur 90 jours | Écart avec l'attendu |
|---|---|---|
| BTC au comptant | +0,57 % | — |
| « x2 » rebalancé chaque jour | **−3,25 %** | −4,39 points |
| « x3 » rebalancé chaque jour | **−11,02 %** | −12,74 points |

Le sous-jacent a monté et le produit à levier a perdu 11 %.

Et la formule tient : la volatilité quotidienne mesurée sur la période est de 2,23 %, ce qui prédit une perte de décroissance de

```
3 × 2 / 2 × 0,0223² × 89 = 13,3 %
```

contre 12,74 points constatés. L'approximation retombe sur l'observation à un demi-point près.

> [!info] Ce n'est pas de la malchance
> La période choisie est simplement les 90 derniers jours, sans sélection. Le phénomène ne dépend pas du sens du marché : plus le sous-jacent s'agite, plus le produit fond, quelle que soit sa direction.

## Sur OKX

Vérification faite le 22 août 2026 via l'endpoint public `public/instruments?instType=SPOT` : **aucun instrument au format des tokens à levier** (`BTC3L`, `BTC3S` et équivalents) n'apparaît dans la liste spot, et aucun instrument ne comporte « ETF » dans son identifiant.

Autrement dit, le produit décrit ici n'est pas listé sur la plateforme au moment où j'écris. La page reste parce que le mot circule partout ailleurs et que la confusion, elle, est bien réelle.

> [!verifier] Deux points que je n'ai pas pu vérifier d'ici
> L'approbation des ETF Bitcoin au comptant aux États-Unis en janvier 2024 est un fait largement documenté, mais `sec.gov` bloque les requêtes automatisées depuis cette machine — je n'ai donc pas pu confirmer l'URL de l'ordre d'approbation. À recouper directement sur sec.gov.
> De même, l'offre de produits d'OKX évolue : l'absence constatée aujourd'hui ne vaut que pour aujourd'hui.

## Les pièges

> [!piege] « x3 » ne veut dire x3 que sur une journée
> C'est écrit dans la documentation de tous ces produits, et à peu près jamais lu. Sur toute autre durée, le facteur réel n'a pas de valeur fixe : il dépend du chemin parcouru, pas seulement des points de départ et d'arrivée.

> [!piege] Un ETF au comptant ne te donne aucune clé
> Tu détiens une part de fonds, donc une créance sur un émetteur qui détient les bitcoins via un dépositaire. C'est le même raisonnement que pour un solde d'exchange : voir [on-chain vs off-chain](/okx/on-chain-off-chain).

> [!piege] Le mot « ETF » ne garantit rien en soi
> Il décrit une forme juridique, pas une qualité. Un jeton qui emprunte le mot sans en avoir le statut n'offre aucune des protections associées.

## Pour aller plus loin

- [On-chain vs off-chain](/okx/on-chain-off-chain) — ce que tu détiens vraiment dans les deux cas
- [Le vocabulaire des marchés](/marches/vocabulaire) — les autres mots à décoder
