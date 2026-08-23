---
titre: "La liquidation"
section: "derives"
ordre: 80
resume: "La fermeture automatique d'une position à levier quand la garantie ne suffit plus. Elle se calcule à l'avance, et elle ne se négocie pas."
niveau: "intermediaire"
prerequis: ["/derives/levier"]
termes: ["liquidation", "levier", "collateral", "spread", "liquidite"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "AMF — autorité des marchés financiers"
    url: "https://www.amf-france.org/fr"
statut: "redige"
---

**Une liquidation est la fermeture forcée d'une position par la plateforme, quand la perte approche du montant déposé en garantie. Elle est automatique et immédiate.**

## Pourquoi ça existe

Quand tu utilises du levier, une partie de la position est prêtée par la plateforme. Elle doit récupérer cet argent quoi qu'il arrive.

Elle surveille donc en permanence l'écart entre ta garantie et ta perte. Si l'écart se réduit trop, elle ferme la position avant que la perte ne dépasse ce que tu as déposé — ce qui te ferait devoir de l'argent.

Ce n'est pas une sanction. C'est le mécanisme qui protège le prêteur, et accessoirement toi.

## Le calcul

Le seuil se calcule à l'ouverture de la position, et il est affiché avant validation.

En simplifiant, une position s'approche de la liquidation quand la baisse atteint environ **100 % divisé par le levier** :

| Levier | Baisse qui liquide (environ) |
|---|---|
| 2 | 50 % |
| 5 | 20 % |
| 10 | 10 % |
| 20 | 5 % |
| 50 | 2 % |
| 100 | 1 % |

En pratique, la liquidation se déclenche un peu **avant** ces valeurs, parce que la plateforme garde une marge et prélève des frais.

La dernière ligne mérite d'être lue deux fois : avec un levier de 100, un mouvement de 1 % suffit. Sur une crypto, 1 % peut se produire en quelques minutes.

## Le prix qui compte n'est pas celui que tu vois

Point technique important, et source de nombreuses incompréhensions.

La liquidation ne se déclenche pas sur le dernier prix affiché, mais sur un prix de référence calculé à partir de plusieurs plateformes — souvent appelé prix **mark** ou prix index.

La raison est protectrice : sans ça, il suffirait de faire brièvement dévier le prix sur une seule plateforme pour déclencher des liquidations en masse et récupérer les positions à bas prix. C'est une manipulation connue, et le prix de référence la rend beaucoup plus coûteuse.

Conséquence pour toi : ta position peut survivre à une mèche visible à l'écran, ou au contraire être liquidée à un prix qui ne correspond pas exactement à ce que tu lisais.

> [!exemple] Pourquoi il n'y a rien à faire au moment où ça arrive
> La liquidation est déclenchée par un programme, en quelques millisecondes, sans notification préalable et sans possibilité d'intervenir.
>
> Tout se joue **avant** : au moment de choisir le levier, et donc le seuil.

## Ce qu'il faut savoir

> [!piege] Ajouter de la garantie éloigne le seuil, mais ne le supprime pas
> Rajouter des fonds recule le prix de liquidation. Ça ne change rien au mécanisme, et ça augmente le montant total exposé.

> [!piege] Les liquidations s'enchaînent
> Quand beaucoup de positions ont des seuils proches, la première vague de fermetures forcées fait bouger le prix, ce qui déclenche la suivante. C'est ce qui explique les mouvements très brutaux et très rapides qu'on observe parfois.

> [!piege] Le prix obtenu peut être pire que le seuil
> S'il n'y a pas assez d'acheteurs en face au moment de la fermeture, la position se solde plus bas que prévu. Sur les marchés peu profonds, l'écart peut être important.

> [!piege] Une liquidation n'est pas un dysfonctionnement
> C'est le fonctionnement normal, décrit dans les conditions du produit et affiché avant l'ouverture de la position.

## Pour aller plus loin

- [Le levier](/derives/levier) — d'où vient le seuil
- [Le carnet d'ordres](/marches/carnet-ordres) — pourquoi le prix obtenu peut décevoir
- [La liquidité](/marches/liquidite) — ce qui manque au pire moment
