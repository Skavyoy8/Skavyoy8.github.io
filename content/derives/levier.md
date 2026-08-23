---
titre: "Le levier"
section: "derives"
ordre: 60
resume: "Emprunter pour miser plus gros. Le levier multiplie les gains et les pertes exactement dans la même proportion."
niveau: "bases"
prerequis: ["/marches/carnet-ordres"]
termes: ["levier", "liquidation", "collateral", "long", "short", "spot"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "AMF — autorité des marchés financiers"
    url: "https://www.amf-france.org/fr"
statut: "redige"
---

**Le levier consiste à emprunter pour prendre une position plus grosse que ce qu'on possède. Un levier de 10 signifie qu'avec 100 €, on agit comme si on en avait 1 000.**

## Comment ça marche

Tu déposes une somme en garantie — on l'appelle la marge, ou le collatéral. La plateforme te prête le reste.

Avec 100 € et un levier de 10, tu contrôles 1 000 € de position. Les variations s'appliquent alors sur 1 000 €, pas sur 100.

| Le prix bouge de | Ton résultat sur 100 € |
|---|---|
| +1 % | +10 € |
| −1 % | −10 € |
| +5 % | +50 € |
| **−10 %** | **−100 €, soit tout** |

La dernière ligne est le point essentiel. **Avec un levier de 10, une baisse de 10 % efface toute la mise.** Avec un levier de 20, il suffit de 5 %.

Sur des actifs qui bougent régulièrement de plusieurs pourcents dans la journée, ces seuils sont atteints très vite.

## La liquidation

Quand les pertes approchent du montant déposé, la plateforme ferme la position d'office pour récupérer ce qu'elle a prêté. C'est la **liquidation** : la position disparaît, la mise est perdue, et il n'y a rien à faire.

Elle est automatique. Elle ne prévient pas, elle ne demande pas, et elle se déclenche même la nuit.

> [!exemple] Ce que multiplie réellement un levier de 10
> Il ne multiplie pas tes chances de gagner. Il multiplie **l'amplitude** : les gains, les pertes, et la vitesse à laquelle tout se termine.
>
> Un mouvement de marché parfaitement banal — 10 % en une journée sur une crypto, ça arrive souvent — devient une perte totale.

## Un exemple concret

Deux personnes achètent pour 1 000 € de bitcoin le même jour. Le prix baisse de 12 %, puis remonte à son point de départ un mois plus tard.

| | Sans levier | Avec un levier de 10 |
|---|---|---|
| Position ouverte | 1 000 € | 1 000 € avec 100 € de mise |
| Pendant la baisse de 12 % | perte latente de 120 € | **liquidée** à −10 % |
| Un mois plus tard | revenue à 1 000 €, perte nulle | 100 € perdus définitivement |

Le premier n'a rien perdu : il lui a suffi d'attendre. Le second avait raison sur la direction, mais sa position n'a pas survécu au trajet.

C'est le mécanisme le plus important à comprendre : **avec du levier, avoir raison ne suffit pas. Il faut avoir raison sans que le prix passe entre-temps par un niveau qui te liquide.**

## Ce qu'il faut savoir

> [!piege] Le levier ne change pas la probabilité de gagner
> Il change uniquement la taille des variations. Sur un grand nombre d'opérations, il accélère surtout l'usure : les frais et le financement s'appliquent au montant total emprunté, pas à ta mise.

> [!piege] Ce que tu perds peut dépasser ce que tu voulais risquer
> Certains dispositifs limitent la perte au montant déposé, d'autres non. En cas de mouvement brutal sans liquidité en face, la liquidation peut se faire à un prix bien pire que prévu.

> [!piege] « x10 » sur une position n'est pas « x10 » sur un produit
> Une position à levier se ferme quand tu le décides. Un jeton « x3 » se rééquilibre chaque jour et perd de la valeur avec le temps, même sans mouvement — voir [les produits « x3 »](/derives/etf-desambiguisation).

> [!info] Ce site n'a pas d'avis sur l'usage du levier
> Il décrit un mécanisme. Les chiffres du tableau ci-dessus ne sont ni un encouragement ni une mise en garde : ce sont des multiplications.

## Pour aller plus loin

- [La liquidation](/derives/liquidation) — le calcul du seuil, en détail
- [Les produits « x3 »](/derives/etf-desambiguisation) — l'autre façon d'avoir du levier
