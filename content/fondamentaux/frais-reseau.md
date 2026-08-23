---
titre: "Les frais de réseau"
section: "fondamentaux"
ordre: 130
resume: "La place dans un bloc est limitée, donc elle se vend aux enchères. C'est pour ça que le même envoi coûte parfois quelques centimes et parfois plusieurs euros."
niveau: "bases"
prerequis: ["/fondamentaux/mempool"]
termes: ["frais-de-reseau", "gas", "satoshi", "confirmation"]
sources:
  - titre: "EIP-1559 — la réforme des frais sur Ethereum"
    url: "https://eips.ethereum.org/EIPS/eip-1559"
  - titre: "mempool.space — tarifs conseillés en direct"
    url: "https://mempool.space/api/v1/fees/recommended"
statut: "redige"
---

**Les frais de réseau sont le prix d'une enchère : la place dans un bloc est limitée, et les transactions qui paient le mieux passent en premier.**

## Pourquoi ça existe

Un bloc ne peut pas contenir un nombre illimité de transactions. Si l'accès était gratuit, n'importe qui pourrait le remplir d'opérations inutiles pour bloquer tout le monde.

Les frais règlent deux choses à la fois : ils rationnent une place limitée, et ils rémunèrent ceux qui font tourner le réseau. Ce second point devient de plus en plus important avec le temps, parce que la récompense automatique versée aux mineurs diminue de moitié tous les quatre ans environ.

## Comment ça marche

Les deux grands réseaux ne facturent pas la même chose.

**Bitcoin facture la place occupée**, pas le montant envoyé. Transférer 10 bitcoins ou 0,001 bitcoin coûte exactement pareil si les deux opérations prennent la même place. Ce qui fait varier le prix, c'est la complexité de la transaction — pas sa valeur.

**Ethereum facture le travail demandé**, mesuré en unités appelées `gas`. Un simple envoi coûte peu ; faire tourner un programme compliqué coûte beaucoup.

Ethereum a en plus un mécanisme automatique qui ajuste le tarif de base à chaque bloc : si le bloc précédent était plus qu'à moitié plein, le tarif monte ; s'il était moins qu'à moitié plein, il descend. Le système vise en permanence des blocs remplis à 50 %.

> [!exemple] Un péage qui s'ajuste tout seul
> C'est un péage dont le prix monte quand la file s'allonge et redescend quand elle se vide, sans que personne ne décide rien. L'objectif n'est pas de gagner plus, mais de garder la circulation fluide.
>
> Et le mécanisme fonctionne : sur un bloc pris au hasard lors d'un relevé, le remplissage mesuré était de **49,9 %** — pour un objectif de 50 %.

## Un exemple concret

Deux envois simples, mesurés le même jour.

**Sur Bitcoin**, au tarif « rapide » du moment :

```
environ 0,22 €
```

**Sur Ethereum**, pour un transfert simple au tarif de base du moment :

```
environ 0,005 €
```

Soit un rapport de **45 fois** entre les deux, à cet instant précis.

Ce rapport n'a rien de stable. Il dépend uniquement de l'encombrement de chaque réseau, et il s'inverse régulièrement : en période de forte activité sur Ethereum, le même envoi peut coûter plusieurs euros pendant que Bitcoin reste à quelques centimes.

C'est la raison pour laquelle il ne faut jamais retenir « tel réseau est cher, tel autre est bon marché ». Ça se vérifie au moment où l'on envoie, pas une fois pour toutes.

## Ce qu'il faut savoir

> [!piege] Les frais ne dépendent pas du montant
> Envoyer 10 € ou 10 000 € coûte la même chose. C'est très différent d'un virement bancaire ou d'un paiement par carte, où la commission est souvent proportionnelle.

> [!piege] Trois choses différentes s'appellent « frais »
> Les **frais de réseau** vont aux mineurs. Les **frais de la plateforme** vont à l'entreprise chez qui tu as un compte. Les **frais de retrait** sont fixés par cette entreprise et ne correspondent pas au coût réel du réseau. Seuls les premiers sont décrits ici.

> [!piege] Un tarif bas peut vouloir dire une longue attente
> Choisir le tarif économique n'est pas une astuce gratuite : c'est accepter d'attendre, parfois des heures, parfois de voir la transaction rester bloquée si le réseau s'encombre entre-temps.

## Pour aller plus loin

- [L'attente et les confirmations](/fondamentaux/mempool) — la file dans laquelle on achète sa place
- [Le choix du réseau](/okx/choix-du-reseau) — pourquoi le même jeton coûte des prix très différents selon la voie choisie
