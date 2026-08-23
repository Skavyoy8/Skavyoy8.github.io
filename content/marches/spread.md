---
titre: "Le spread"
section: "marches"
ordre: 30
resume: "L'écart entre le prix d'achat et le prix de vente. Un coût que tu payes toujours, et qui n'apparaît sur aucune facture."
niveau: "bases"
prerequis: ["/marches/carnet-ordres"]
termes: ["spread", "liquidite", "carnet-ordres"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — règles d'exécution des ordres"
    url: "https://tr.okx.com/en/help/order-execution-policy"
statut: "redige"
---

**Le spread est l'écart entre le prix auquel on peut acheter tout de suite et celui auquel on peut vendre tout de suite. Il se paie sans jamais apparaître comme un frais.**

## Pourquoi ça existe

Personne ne le décide. Il apparaît tout seul, parce qu'il y a toujours un écart entre ce que le vendeur le moins cher demande et ce que l'acheteur le plus généreux propose.

Ce qui est intéressant, c'est ce qu'il **coûte** et ce qu'il **révèle**.

## Comment ça marche

Si tu achètes puis revends immédiatement, sans que le marché ait bougé d'un centime, **tu perds le spread**. Tu as acheté au prix des vendeurs et revendu au prix des acheteurs.

C'est un coût réel, mais il n'apparaît sur aucune ligne de frais, aucun récapitulatif, aucun relevé. Il est déjà contenu dans le prix qu'on t'affiche.

Sa taille dit quelque chose du marché : plus il y a de participants prêts à acheter et à vendre en permanence, plus l'écart se resserre. Un écart large veut dire qu'il n'y a presque personne — ou que plus personne ne veut s'engager, ce qui arrive en période de panique.

> [!exemple] Le bureau de change
> C'est exactement le principe d'un bureau de change qui affiche « nous achetons à 1,05 € — nous vendons à 1,09 € ».
>
> Si tu changes puis rechanges immédiatement, tu perds 4 centimes par unité, sans qu'aucune commission ne t'ait été facturée. La différence vit dans les deux prix affichés.

## Un exemple concret

Relevé réel sur le bitcoin :

```
on peut vendre à   77 235,10 $
on peut acheter à  77 235,20 $
écart               0,10 $  soit 0,00013 %
```

Un aller-retour immédiat sur un bitcoin entier coûte donc 10 centimes. Négligeable — c'est ce que veut dire « marché très liquide ».

Maintenant l'autre extrême. Sur une monnaie confidentielle, un écart de 1 % n'a rien d'exceptionnel. Le même aller-retour immédiat coûterait alors 1 % du montant, **avant tout frais de la plateforme**. Sur 1 000 €, cela fait 10 € perdus sans que rien n'ait bougé et sans qu'aucune ligne de frais n'apparaisse.

Entre les deux situations, il y a un facteur de l'ordre de sept mille — sur le même site, le même jour.

## Ce qu'il faut savoir

> [!piege] « Zéro frais » ne veut pas dire gratuit
> Les fonctions de conversion rapide, présentées sans commission, se rémunèrent en général sur un spread élargi. Le coût existe toujours, il a juste changé de nom. Pour le mesurer, il faut comparer le prix proposé avec celui du carnet au même moment.

> [!piege] Le spread se creuse au pire moment
> Il est étroit quand tout est calme, et s'élargit brutalement quand le marché s'agite — précisément parce que ceux qui le tenaient serré retirent leurs offres.

> [!piege] Un écart serré ne veut pas dire un gros volume disponible
> Les deux meilleurs prix peuvent être collés l'un à l'autre pour une quantité minuscule, et le marché s'effondrer dès la deuxième offre. Voir [d'où vient le prix](/marches/carnet-ordres).

## Pour aller plus loin

- [D'où vient le prix](/marches/carnet-ordres) — l'origine de l'écart
- [Les frais d'une plateforme](/okx/frais) — les coûts qui, eux, sont facturés
