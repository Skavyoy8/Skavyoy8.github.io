---
titre: "Le carnet d'ordres"
section: "marches"
ordre: 20
resume: "La liste des intentions d'achat et de vente en attente. C'est là, et nulle part ailleurs, que se forme le prix."
niveau: "bases"
prerequis: ["/okx/on-chain-off-chain"]
termes: ["carnet-ordres", "spread", "liquidite", "maker", "taker", "priorite-prix-temps", "moteur-appariement"]
sources:
  - titre: "OKX — API v5, endpoint market/books"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — Order Execution Policy (priorité prix-temps)"
    url: "https://tr.okx.com/en/help/order-execution-policy"
statut: "redige"
---

**Le carnet d'ordres est la liste ordonnée des ordres d'achat et de vente en attente d'exécution. Le prix affiché d'un actif n'est rien d'autre que le prix de sa dernière exécution dans ce carnet.**

## Le problème que ça résout

Un actif n'a pas de prix intrinsèque affiché quelque part. Il faut un mécanisme qui mette en face un acheteur et un vendeur, et qui décide à quel prix ils se rencontrent — sans arbitraire, et de façon reproductible.

Le carnet est ce mécanisme : deux files triées, et une règle d'appariement.

## Comment ça marche

Deux côtés, symétriques :

- les **bids** : les acheteurs, triés du prix le plus élevé au plus bas ;
- les **asks** : les vendeurs, triés du prix le plus bas au plus élevé.

En haut de chaque pile se trouvent les deux ordres les plus agressifs. Tant que le meilleur acheteur propose moins que ce que demande le meilleur vendeur, rien ne se passe : les deux attendent. Dès qu'un ordre arrive et croise le camp d'en face, l'appariement a lieu.

L'ordre de service est la **priorité prix-temps** : meilleur prix d'abord, et à prix égal, le plus ancien passe en premier.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> C'est une file de priorité, avec le prix comme clé et l'horodatage comme départage. Le moteur d'appariement dépile en tête, exactement comme un ordonnanceur.
>
> L'analogie tient jusque dans les détails : la latence compte, être arrivé en premier à prix égal a une valeur, et toute la course technologique du secteur consiste à s'insérer plus haut dans la file.

## Exemple chiffré

Voici un extrait réel du carnet BTC-USDT, relevé le 22 août 2026 :

| Côté | Prix (USDT) | Quantité (BTC) |
|---|---|---|
| ask | 77 139,2 | 0,1821 |
| ask | 77 138,9 | 0,0825 |
| **ask** | **77 137,5** | **0,5856** |
| **bid** | **77 137,4** | **0,4379** |
| bid | 77 137,0 | 0,0100 |
| bid | 77 134,4 | 0,0699 |

Le meilleur vendeur demande 77 137,5. Le meilleur acheteur propose 77 137,4. L'écart entre les deux — le **spread** — vaut **0,1 USDT**, soit 0,00013 % du prix. Personne ne peut acheter en dessous de 77 137,5 tout de suite, ni vendre au-dessus de 77 137,4.

Maintenant le chiffre qui surprend : **les vingt premiers niveaux du côté vendeur ne totalisent que 1,13 BTC**, soit environ 87 000 USDT. Sur la paire la plus liquide de la plateforme.

Conséquence directe :

- un achat au marché de **0,5 BTC** est entièrement servi au premier niveau, à 77 137,5. Aucun surcoût.
- un achat au marché de **2 BTC** épuise les vingt niveaux et continue de grimper au-delà.

C'est toute la différence entre un carnet qui a l'air profond et un carnet qui l'est. La profondeur ne se lit pas sur le prix affiché.

## Sur OKX

Le carnet est visible à droite de chaque paire, en mode Trading. La colonne de quantité cumulée et l'histogramme de fond représentent la profondeur — c'est elle qu'il faut regarder, pas le prix du haut.

L'endpoint public `market/books` renvoie les mêmes données. Chaque niveau y est un tableau de quatre valeurs : `[prix, quantité, "0", nombre d'ordres]`. La troisième est un vestige des contrats à échéance, toujours à `"0"` en spot.

## Les pièges

> [!piege] Le prix affiché n'est pas un prix disponible
> C'est celui de la dernière exécution. Le prix auquel tu peux réellement acheter maintenant, c'est le meilleur ask ; celui auquel tu peux vendre, le meilleur bid. Sur une paire peu échangée, le dernier prix peut dater d'il y a des heures et n'avoir aucun rapport avec le carnet actuel.

> [!piege] Un carnet peut se vider en une seconde
> Les ordres affichés ne sont pas des engagements : ils s'annulent librement, et la majorité le sont avant d'être exécutés. La profondeur que tu vois n'est pas garantie à l'instant où ton ordre arrive.

> [!piege] Les deux côtés ne se lisent pas dans le même sens
> Les asks sont souvent affichés du haut vers le bas en prix décroissant, ce qui met le meilleur vendeur juste au-dessus du meilleur acheteur, au milieu de l'écran. Les deux meilleurs prix sont donc collés au centre, pas aux extrémités.

## Pour aller plus loin

- [Le spread](/marches/spread) — ce que l'écart révèle
- [Maker et taker](/marches/maker-taker) — pourquoi le même trade coûte deux prix différents
- [Ce qu'est un exchange centralisé](/okx/exchange-centralise) — le moteur qui traite ce carnet
