---
titre: "La liquidité"
section: "marches"
ordre: 40
resume: "La capacité à acheter ou vendre une quantité donnée sans faire bouger le prix. C'est ce qui manque toujours au pire moment."
niveau: "bases"
prerequis: ["/marches/carnet-ordres"]
termes: ["liquidite", "carnet-ordres", "spread", "whale"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — règles d'exécution des ordres"
    url: "https://tr.okx.com/en/help/order-execution-policy"
statut: "redige"
---

**Un marché liquide est un marché où l'on peut acheter ou vendre une grosse quantité sans déplacer le prix. Un marché illiquide est un marché où l'on entre facilement et d'où l'on sort mal.**

## Pourquoi ça compte

C'est la propriété la moins visible et la plus déterminante d'un marché.

Le prix affiché ne dit rien de la quantité disponible à ce prix. Une monnaie peut afficher un cours parfaitement normal, et pourtant être impossible à revendre pour plus de quelques centaines d'euros sans faire chuter ce cours.

Le problème n'apparaît jamais à l'achat. Il apparaît à la revente, et souvent au moment où tout le monde veut vendre en même temps.

## Comment ça se mesure

Trois indices, du plus trompeur au plus fiable.

**Le spread**, l'écart entre le prix d'achat et de vente. Utile, mais insuffisant : il peut être serré pour une quantité minuscule.

**La profondeur du carnet**, c'est-à-dire la quantité réellement proposée aux prix voisins. C'est la vraie mesure, et elle est visible dans l'application.

**Le volume échangé**, le total sur 24 heures. Indicatif, mais manipulable : rien n'empêche de faire tourner des ordres entre ses propres comptes pour gonfler un volume.

## Un exemple concret

Relevé sur le bitcoin, le marché le plus actif qui existe :

```
les 20 meilleures offres de vente réunies : 2,5 BTC
soit environ 194 000 $
```

Un ordre d'achat de 200 000 $ suffit donc à épuiser ces offres et à faire monter le prix. Sur **le marché le plus profond du secteur**.

Maintenant, transpose. Sur une monnaie confidentielle dont le carnet est cent fois plus fin, **quelques milliers d'euros produisent le même effet**. Sur certains jetons récents, quelques centaines suffisent.

C'est ce qui explique une expérience très courante : acheter un petit jeton, voir le prix afficher un gain, et constater à la revente que le prix s'effondre dès les premiers ordres.

## Ce qu'il faut savoir

> [!piege] La liquidité disparaît quand on en a besoin
> Elle est abondante quand tout est calme, et s'évapore en période de panique — précisément parce que ceux qui la fournissaient retirent leurs ordres. Compter sur la liquidité observée un jour ordinaire est une erreur de raisonnement classique.

> [!piege] Un gros volume ne prouve pas une bonne liquidité
> Le volume peut être gonflé artificiellement. La profondeur du carnet, elle, se lit directement et se vérifie à l'œil.

> [!piege] Le prix affiché est celui de la dernière transaction
> Même minuscule. Sur une monnaie peu échangée, il peut résulter d'un ordre de trois euros passé il y a deux heures, et n'avoir aucun rapport avec ce que tu obtiendrais.

> [!piege] Entrer est toujours plus facile que sortir
> Il y a toujours quelqu'un pour te vendre. Il n'y a pas toujours quelqu'un pour te racheter, surtout au prix affiché et surtout en quantité.

## Pour aller plus loin

- [D'où vient le prix](/marches/carnet-ordres) — où lire la profondeur
- [Le spread](/marches/spread) — l'autre indice, plus visible mais moins fiable
- [Le vocabulaire des marchés](/marches/vocabulaire) — pourquoi « whale » est une notion relative
