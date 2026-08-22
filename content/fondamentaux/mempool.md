---
titre: "Mempool et confirmations"
section: "fondamentaux"
ordre: 140
resume: "La file d'attente des transactions non encore inscrites, et la profondeur qui rend une inscription irréversible en pratique."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-une-blockchain"]
termes: ["confirmation", "reorganisation", "frais-de-reseau", "txid", "empreinte"]
sources:
  - titre: "Satoshi Nakamoto — Bitcoin, section 11 (calcul de probabilité)"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "Bitcoin Developer Reference — Block Chain"
    url: "https://developer.bitcoin.org/reference/block_chain.html"
  - titre: "mempool.space — état du mempool en direct"
    url: "https://mempool.space"
statut: "redige"
---

**Le mempool est la file d'attente des transactions valides mais pas encore inscrites dans un bloc. Une confirmation, c'est un bloc ajouté par-dessus celui qui contient la tienne.**

## Le problème que ça résout

Entre le moment où tu diffuses une transaction et celui où elle est inscrite, elle existe — elle circule sur le réseau — mais elle n'est acquise nulle part. Il faut bien la stocker quelque part en attendant.

Chaque nœud tient donc son propre mempool : les transactions qu'il a reçues, vérifiées, et qu'il est prêt à relayer. Ce n'est pas un registre partagé mais une vue locale, et deux nœuds n'ont jamais exactement le même contenu.

## Comment ça marche

Quand un mineur construit un bloc, il pioche dans son mempool en commençant par ce qui paie le mieux à l'unité de taille. Tout ce qui reste attend le bloc suivant.

Une fois inscrite, la transaction n'est pas définitive pour autant. Deux mineurs peuvent trouver un bloc quasi simultanément : le réseau se retrouve avec deux branches, et finit par retenir la plus lourde. Les transactions de la branche abandonnée retournent au mempool. C'est une **réorganisation**.

Chaque bloc empilé par-dessus rend ce scénario exponentiellement plus coûteux, puisqu'il faudrait refaire tout le travail de la branche. C'est ce que compte le nombre de confirmations : **une mesure de profondeur, pas une durée**.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> C'est une file d'attente avec priorité, où la clé de tri est le prix par octet plutôt qu'une valeur de QoS. Elle a une capacité bornée et une politique d'éviction : quand elle sature, les transactions les moins bien payées sont jetées.
>
> Les confirmations, elles, sont un facteur de réplication avant acquittement. Tu n'accuses pas une écriture parce qu'un nœud l'a acceptée, mais parce qu'assez de nœuds l'ont répliquée pour que revenir en arrière devienne impraticable. « 6 confirmations » est un seuil de durabilité, exactement comme un `w=3` dans un stockage distribué.

## Exemple chiffré

État réel du mempool Bitcoin le 22 août 2026 :

```
89 584 transactions en attente
44,81 Mvo de poids cumulé
```

Un bloc emporte environ 1 Mvo. L'arriéré représente donc **environ 45 blocs**, soit quelque sept heures et demie au rythme de dix minutes — pour les transactions qui paient au minimum.

C'est là que la file de priorité devient visible : les frais recommandés au même instant étaient de **2 sat/vB pour passer vite** et **1 sat/vB pour l'économique**. Un seul satoshi d'écart par unité de poids sépare « prochain bloc » de « quelque part dans les 45 prochains ».

Ordre de grandeur des seuils habituels :

| Confirmations | Délai moyen sur Bitcoin | Usage courant |
|---|---|---|
| 0 | immédiat | rien de sérieux, la transaction peut disparaître |
| 1 | ~10 min | petits montants |
| 3 | ~30 min | seuil fréquent des exchanges |
| 6 | ~1 h | convention historique pour les gros montants |

Ces seuils ne sont pas dans le protocole : ce sont des politiques de risque, choisies par chaque service.

## Sur OKX

Un dépôt reste en « en attente » tant que le nombre de confirmations exigé n'est pas atteint. Ce nombre dépend de la chaîne — quelques blocs sur Bitcoin, davantage sur des chaînes à blocs rapides, où un bloc pèse beaucoup moins lourd en travail accumulé.

Le TxID s'affiche dès la diffusion, bien avant le crédit. Le voir ne signifie donc pas que les fonds sont arrivés : il signifie que la transaction existe.

## Les pièges

> [!piege] Zéro confirmation n'est pas « presque confirmé »
> Tant qu'elle n'est dans aucun bloc, la transaction peut être remplacée par une autre qui dépense les mêmes entrées. C'est prévu par le protocole, pas une faille.

> [!piege] Le mempool n'est pas unique
> Chaque nœud a le sien. Les statistiques d'un explorateur reflètent la vue de **son** nœud, pas un état global — il n'en existe pas.

> [!piege] Une transaction bloquée n'est pas perdue
> Trop peu payée, elle attend, et finit par être évincée du mempool après un délai. Les fonds n'ont jamais bougé : ils sont restés dépensables tout du long.

## Pour aller plus loin

- [Les frais de réseau](/fondamentaux/frais-reseau) — ce qui détermine ta place dans la file
- [Dépôts et retraits](/okx/depots-retraits) — les confirmations exigées côté exchange
- [Proof of Work](/fondamentaux/proof-of-work) — ce qui rend une réorganisation trop chère
