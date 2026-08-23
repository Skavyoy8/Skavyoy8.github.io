---
titre: "Le minage (Proof of Work)"
section: "fondamentaux"
ordre: 90
resume: "Une loterie mondiale où l'on achète des tickets avec de l'électricité. C'est ce coût, et lui seul, qui empêche de réécrire l'histoire."
niveau: "bases"
prerequis: ["/fondamentaux/hachage"]
termes: ["proof-of-work", "difficulte", "empreinte", "sha-256", "coinbase", "halving"]
sources:
  - titre: "Satoshi Nakamoto — le document qui a lancé Bitcoin (2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "mempool.space — difficulté et puissance du réseau en direct"
    url: "https://mempool.space"
statut: "redige"
---

**Miner, c'est essayer des milliards de combinaisons par seconde jusqu'à en trouver une qui donne une empreinte assez petite. Celui qui trouve gagne le droit d'ajouter le bloc suivant, et une récompense.**

## Pourquoi ça existe

Il faut désigner qui écrit la prochaine page du registre. Sans chef, comment choisir ?

Voter ne marche pas : sur Internet, n'importe qui peut créer un million de faux participants. Il faut donc adosser le droit d'écrire à quelque chose qu'on ne peut pas fabriquer gratuitement.

Le choix de Bitcoin : **l'électricité**. Pour avoir une chance d'écrire, il faut dépenser du calcul, donc du courant. On ne peut pas tricher là-dessus.

## Comment ça marche

Le mineur assemble un bloc de transactions, puis y ajoute un nombre quelconque. Il calcule l'empreinte de l'ensemble. Si elle commence par assez de zéros, il a gagné et diffuse son bloc. Sinon il change le nombre et recommence.

Il n'existe **aucune méthode plus rapide que d'essayer**. L'empreinte se comporte comme un tirage : on ne peut pas s'en approcher progressivement, il faut tomber dessus.

En revanche, une fois trouvée, **la vérification prend un seul calcul**. C'est ce déséquilibre — très cher à trouver, instantané à vérifier — qui fait tout fonctionner.

Le nombre de zéros exigés s'appelle la **difficulté**. Elle se réajuste automatiquement environ tous les quinze jours pour que le rythme reste d'un bloc toutes les dix minutes, quelle que soit la puissance branchée sur le réseau.

> [!exemple] Une loterie, pas un concours
> Le mineur ne résout aucun problème. Il achète des tickets de loterie avec de l'électricité, et plus il en achète, plus il a de chances de tirer le bon numéro.
>
> Un petit mineur n'est pas « en retard » sur un gros : il a simplement moins de tickets. Il peut gagner, c'est juste très improbable.

## Un exemple concret

Le principe se teste chez soi. On cherche une empreinte commençant par un nombre croissant de zéros, en essayant les nombres un par un :

| Zéros demandés | Essais nécessaires | Temps sur un ordinateur ordinaire |
|---|---|---|
| 2 | 540 | instantané |
| 3 | 740 | instantané |
| 4 | 48 333 | un dixième de seconde |
| 6 | 21 563 103 | 34 secondes |

Chaque zéro supplémentaire multiplie le travail par seize environ. Ces chiffres ont été réellement mesurés — ce ne sont pas des estimations.

Maintenant l'échelle réelle. Avec la difficulté relevée sur Bitcoin, il faut en moyenne :

```
547 600 000 000 000 000 000 000 essais pour trouver un bloc
```

Cet ordinateur en fait environ 630 000 par seconde. **Il lui faudrait 27 milliards d'années.**

Le réseau entier, lui, en fait 913 700 000 000 000 000 000 par seconde, et met donc :

```
599 secondes, soit très exactement dix minutes
```

Le calcul retombe précisément sur le rythme visé par le protocole. C'est la meilleure preuve que ces trois chiffres — difficulté, puissance du réseau, temps entre deux blocs — décrivent bien la même réalité.

Autrement dit : le réseau est environ **mille milliards de fois** plus rapide qu'un ordinateur personnel. C'est pour ça que plus personne ne mine seul depuis quinze ans.

## Ce qu'il faut savoir

> [!piege] Les mineurs ne résolvent pas de « problèmes mathématiques complexes »
> On lit ça partout, et c'est faux. Il n'y a aucun problème et aucune complexité : c'est un tirage répété jusqu'à obtenir un résultat sous un seuil. L'inutilité du calcul est **voulue** — c'est elle qui garantit qu'aucun raccourci n'existe.

> [!piege] La difficulté ne dit rien du prix
> Elle s'ajuste uniquement sur le temps observé entre les blocs. Une hausse signifie qu'il y a plus de machines branchées, rien d'autre.

> [!info] La consommation d'électricité n'est pas un défaut
> C'est le mécanisme lui-même. La dépense est exactement ce qui rend une réécriture du passé trop coûteuse. On peut trouver ce prix trop élevé — le débat existe et il est légitime — mais il faut savoir qu'on ne peut pas retirer la dépense sans retirer la protection. D'autres réseaux ont choisi un mécanisme différent, décrit dans [Proof of Stake](/fondamentaux/proof-of-stake).

## Pour aller plus loin

- [Les fonctions de hachage](/fondamentaux/hachage) — pourquoi aucun raccourci n'existe
- [C'est quoi une blockchain ?](/commencer/cest-quoi-une-blockchain) — ce que ce coût protège
- [Bitcoin (BTC)](/cryptos/btc) — la récompense que ce travail rapporte
