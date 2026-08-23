---
titre: "Les frais d'une plateforme"
section: "okx"
ordre: 120
resume: "Trois types de frais qu'on confond tout le temps, plus un quatrième qui n'apparaît sur aucune facture."
niveau: "bases"
prerequis: ["/okx/on-chain-off-chain"]
termes: ["frais-de-trading", "frais-de-retrait", "frais-de-reseau", "maker", "taker", "spread", "palier-vip"]
sources:
  - titre: "OKX — barème officiel des frais"
    url: "https://www.okx.com/fees"
  - titre: "OKX — règles de frais de trading"
    url: "https://www.okx.com/help/trading-fee-rules-faq"
statut: "redige"
---

**Quatre choses différentes s'appellent « frais », elles n'ont pas la même destination, et la quatrième n'apparaît nulle part.**

## Les quatre

| Type | Qui l'encaisse | Quand |
|---|---|---|
| **Frais de trading** | la plateforme | à chaque achat et à chaque vente |
| **Frais de retrait** | la plateforme | quand tu sors des fonds |
| **Frais de réseau** | les mineurs de la blockchain | quand tu déposes depuis ton portefeuille |
| **Le spread** | personne en particulier | tout le temps, sans être facturé |

Les trois premiers sont écrits quelque part. Le quatrième, non — et c'est souvent le plus coûteux sur les petites sommes.

## Les frais de trading

Prélevés sur chaque transaction, en pourcentage. Deux tarifs différents existent selon la façon dont ton ordre s'exécute :

- **Tarif « taker »**, le plus cher : ton ordre s'exécute tout de suite, en prenant une offre déjà présente.
- **Tarif « maker »**, moins cher : ton ordre attend dans le carnet que quelqu'un vienne le prendre.

La logique est que celui qui attend rend service au marché : il donne à d'autres quelque chose à acheter. Celui qui se sert immédiatement paie ce confort.

Un ordre « au marché » est toujours au tarif le plus cher. Un ordre « limite » peut être à l'un ou à l'autre, selon qu'il s'exécute tout de suite ou non.

Les grosses plateformes appliquent en plus des paliers : plus on échange de volume, plus le pourcentage baisse.

## Les frais de retrait

Fixés par la plateforme, en montant fixe par monnaie et par réseau. Ils couvrent le coût réel du réseau, avec une marge.

Point important : **ils ne suivent pas les variations du réseau.** Quand la blockchain est calme et qu'un envoi coûte quelques centimes en réalité, le montant prélevé reste souvent le même.

## Le spread, celui dont personne ne parle

C'est l'écart entre le meilleur prix d'achat et le meilleur prix de vente à un instant donné.

Si tu achètes puis revends aussitôt, sans que rien n'ait bougé, tu perds cet écart. Il n'apparaît sur aucune ligne, aucun récapitulatif, aucun décompte : il est déjà dans le prix.

> [!piege] « Zéro frais » veut souvent dire « frais dans le prix »
> Les fonctions de conversion rapide, présentées sans commission, se rémunèrent en général par un spread plus large que le marché. Le coût existe toujours, il a simplement changé d'endroit. Le seul moyen de le mesurer est de comparer le prix proposé avec celui du carnet au même moment.

## Un exemple concret

Un aller-retour de 1 000 €, avec des taux courants de 0,08 % en maker et 0,10 % en taker :

| Façon de faire | Coût total |
|---|---|
| Deux ordres au marché | 2,00 € |
| Deux ordres limites qui attendent | 1,60 € |

40 centimes d'écart, soit 20 % de frais en moins pour la même opération. La contrepartie est réelle : un ordre qui attend peut ne jamais s'exécuter.

Sur les grandes paires, le spread ajoute quelques centimes à peine. Sur une monnaie peu échangée, il peut à lui seul dépasser tous les frais réunis.

> [!verifier] Les barèmes changent
> Les taux ci-dessus servent d'ordre de grandeur pour le calcul. Les vrais dépendent de la plateforme, du palier et du pays. À relever sur la page officielle des frais avant tout calcul précis.

## Ce qu'il faut savoir

> [!piege] Un ordre limite n'est pas automatiquement au tarif réduit
> Si le prix que tu fixes croise une offre déjà présente, il s'exécute immédiatement et bascule au tarif le plus cher.

> [!piege] Économiser des frais ne compense pas un mauvais prix
> Gagner 0,02 % de frais en attendant, puis voir le marché partir de 1 %, n'est pas une économie. Les deux ordres de grandeur n'ont rien à voir.

## Pour aller plus loin

- [Maker et taker](/marches/maker-taker) — les deux tarifs en détail
- [Le spread](/marches/spread) — le coût invisible
- [Les frais de réseau](/fondamentaux/frais-reseau) — ceux qui ne vont pas à la plateforme
