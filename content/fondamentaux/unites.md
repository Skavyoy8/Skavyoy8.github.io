---
titre: "Les unités et les décimales"
section: "fondamentaux"
ordre: 120
resume: "On peut acheter pour 10 €, sans acheter un bitcoin entier. Voici comment les montants sont découpés, et pourquoi ils sont toujours des nombres entiers."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-la-crypto"]
termes: ["satoshi", "gas", "erc-20"]
sources:
  - titre: "Documentation technique de Bitcoin"
    url: "https://developer.bitcoin.org/reference/block_chain.html"
  - titre: "EIP-20 — le standard des jetons et leur nombre de décimales"
    url: "https://eips.ethereum.org/EIPS/eip-20"
statut: "redige"
---

**Un bitcoin se divise en 100 millions de morceaux. On n'achète donc jamais « un bitcoin » : on achète une quantité, aussi petite qu'on veut.**

## Pourquoi ça compte

C'est un blocage fréquent chez les débutants : le bitcoin coûte des dizaines de milliers d'euros, donc il paraît inaccessible.

C'est un malentendu d'unité. Personne n'achète de bitcoin entier, exactement comme personne n'achète un lingot d'or entier pour posséder de l'or.

## Les unités

| Monnaie | Plus petite unité | Divisions |
|---|---|---|
| Bitcoin | le satoshi | 100 000 000 par bitcoin |
| Ethereum | le wei | 1 000 000 000 000 000 000 par ether |
| Euro | le centime | 100 par euro |

Un **satoshi** vaut donc un cent-millionième de bitcoin. C'est l'unité qu'on utilise quand on parle de petites sommes.

Sur Ethereum, on entend souvent parler de **gwei** : c'est un milliard de wei, l'unité pratique pour exprimer les frais.

## Un exemple concret

Avec un bitcoin à 77 000 € :

| Tu dépenses | Tu obtiens |
|---|---|
| 10 € | environ 0,00013 BTC, soit 13 000 satoshis |
| 50 € | environ 0,00065 BTC, soit 65 000 satoshis |
| 1 000 € | environ 0,013 BTC |

Aucun de ces montants n'a de statut particulier. Il n'y a pas de minimum imposé par la blockchain — seulement des minimums fixés par les plateformes, en général quelques euros.

## Pourquoi tout est en nombres entiers

C'est un détail invisible mais qui explique la forme des montants qu'on voit passer.

Un ordinateur ne compte pas exactement avec des nombres à virgule. C'est un défaut connu, valable partout : additionner 0,1 et 0,2 sur une machine ne donne pas exactement 0,3, mais 0,300000000000000044.

Sur des sommes d'argent, ce genre d'écart est inacceptable. Les blockchains ne manipulent donc **jamais de virgule** : elles comptent en satoshis, en wei, en unités indivisibles. La virgule n'apparaît qu'à l'affichage, au dernier moment.

> [!exemple] Le même principe qu'en comptabilité
> Les logiciels de gestion stockent les montants en centimes entiers pour la même raison. Un solde de 12,34 € est enregistré comme 1234.
>
> Sur Bitcoin, 0,001 BTC est enregistré comme 100 000 satoshis. C'est le même réflexe, poussé plus loin.

## Ce qu'il faut savoir

> [!piege] Chaque jeton a son propre nombre de décimales
> Sur Ethereum, un jeton déclare combien de décimales il utilise. La plupart en ont 18, mais l'USDT n'en a que 6. Un montant lu brut sur un explorateur peut donc paraître aberrant si l'on suppose le mauvais nombre.

> [!piege] Un prix bas ne veut pas dire « pas cher »
> Une monnaie à 0,000001 € n'est pas une bonne affaire par rapport à une monnaie à 50 000 €. Ce qui compte est le nombre total d'unités qui existent, pas le prix d'une seule. Une monnaie peut créer mille milliards d'unités et afficher un prix minuscule sans que ça signifie quoi que ce soit.

> [!piege] Les très petits montants peuvent devenir inutilisables
> Si les frais de réseau dépassent la somme détenue, on ne peut plus la déplacer. Elle reste visible et inaccessible. C'est fréquent sur les réseaux chers, avec des restes de quelques centimes.

## Pour aller plus loin

- [Anatomie d'une transaction](/fondamentaux/transaction) — comment ces montants circulent
- [Les frais de réseau](/fondamentaux/frais-reseau) — pourquoi les petites sommes coincent
