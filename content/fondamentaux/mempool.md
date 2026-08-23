---
titre: "L'attente et les confirmations"
section: "fondamentaux"
ordre: 140
resume: "Pourquoi une transaction reste « en attente », et pourquoi on attend plusieurs blocs avant de la considérer comme acquise."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-une-blockchain"]
termes: ["confirmation", "reorganisation", "frais-de-reseau", "txid"]
sources:
  - titre: "Satoshi Nakamoto — le document qui a lancé Bitcoin (2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "mempool.space — état de l'attente en direct"
    url: "https://mempool.space"
statut: "redige"
---

**Une transaction envoyée n'est pas encore inscrite. Elle patiente dans une salle d'attente, et une « confirmation » signifie qu'un bloc supplémentaire a été empilé par-dessus le sien.**

## Pourquoi ça existe

Entre le moment où tu valides un envoi et celui où il est inscrit dans le registre, il se passe du temps. Ta transaction existe — elle circule sur le réseau, tout le monde la voit — mais elle n'est encore inscrite nulle part.

Il faut donc bien qu'elle attende quelque part. Cette salle d'attente s'appelle le **mempool**.

## Comment ça marche

Quand un mineur construit un bloc, il ne prend pas les transactions dans l'ordre d'arrivée. Il choisit **celles qui paient le mieux**, parce que les frais lui reviennent. Tout le reste attend le tour suivant.

C'est une file d'attente où l'on peut acheter sa place. Payer plus, c'est passer devant.

Une fois inscrite, la transaction n'est pas encore définitive. Il arrive que deux mineurs trouvent un bloc presque en même temps : le réseau se retrouve un instant avec deux versions concurrentes, et finit par garder celle qui aura accumulé le plus de travail. Les transactions de la version abandonnée retournent en salle d'attente.

C'est rare, ça se règle en général en un bloc ou deux, mais c'est possible. D'où la notion de **confirmation** : chaque bloc empilé par-dessus le tien rend ce scénario beaucoup plus improbable.

> [!info] Une confirmation est une profondeur, pas une durée
> « 3 confirmations » veut dire « trois blocs ont été ajoutés après le mien », pas « ça fait trente minutes ». Sur un réseau où les blocs sortent toutes les deux secondes, trois confirmations représentent six secondes — et beaucoup moins de sécurité que trois blocs Bitcoin.

## Un exemple concret

État réel de la salle d'attente Bitcoin lors d'un relevé :

```
89 584 transactions en attente
```

Un bloc peut en emporter quelques milliers. L'arriéré représentait donc **environ 45 blocs**, soit à peu près sept heures et demie — pour ceux qui paient le tarif minimum.

Au même moment, les tarifs conseillés étaient de **2 unités pour passer au prochain bloc** contre **1 pour le tarif économique**. Une seule unité d'écart séparait « dans dix minutes » de « quelque part dans les sept prochaines heures ».

Les seuils qu'on rencontre en pratique :

| Confirmations | Délai moyen sur Bitcoin | Ce que ça vaut |
|---|---|---|
| 0 | immédiat | rien de sérieux, ça peut encore disparaître |
| 1 | ~10 min | suffisant pour un petit montant |
| 3 | ~30 min | seuil courant des plateformes |
| 6 | ~1 heure | convention pour les montants importants |

Ces seuils ne sont écrits nulle part dans le protocole. Chaque service choisit le sien selon le risque qu'il accepte.

## Ce qu'il faut savoir

> [!piege] Voir l'identifiant ne veut pas dire que c'est arrivé
> L'identifiant de transaction apparaît dès l'envoi, bien avant l'inscription. Il prouve que la transaction existe et circule, pas qu'elle a été inscrite.

> [!piege] Une transaction bloquée n'est pas perdue
> Si elle paie trop peu, elle attend. Elle peut même finir par être oubliée du réseau au bout de quelques jours. Dans tous les cas, **les fonds n'ont jamais bougé** : ils sont restés disponibles tout du long, et l'opération peut être refaite.

> [!piege] Payer plus n'accélère rien quand il n'y a pas d'attente
> Si la salle est vide, la transaction au tarif minimum entre dans le prochain bloc comme les autres. Surpayer n'a d'effet qu'en période d'encombrement.

## Pour aller plus loin

- [Les frais de réseau](/fondamentaux/frais-reseau) — ce qui détermine ta place dans la file
- [Dépôts et retraits](/okx/depots-retraits) — le nombre de confirmations exigé par les plateformes
