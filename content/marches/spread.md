---
titre: "Le spread"
section: "marches"
ordre: 30
resume: "L'écart entre le meilleur prix d'achat et le meilleur prix de vente. C'est un coût que tu payes sans qu'il apparaisse jamais sur une facture."
niveau: "bases"
prerequis: ["/marches/carnet-ordres"]
termes: ["spread", "liquidite", "carnet-ordres", "maker", "taker"]
sources:
  - titre: "OKX — API v5, endpoint market/books"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — Order Execution Policy"
    url: "https://tr.okx.com/en/help/order-execution-policy"
statut: "redige"
---

**Le spread est l'écart entre le meilleur prix d'achat et le meilleur prix de vente d'un carnet d'ordres.**

## Le problème que ça résout

Il ne résout rien : c'est une conséquence, pas un dispositif. Personne ne fixe le spread. Il apparaît mécaniquement dès qu'il existe un écart entre ce que le vendeur le moins cher demande et ce que l'acheteur le plus généreux propose.

Ce qu'il faut comprendre, c'est ce qu'il **coûte** et ce qu'il **révèle**.

## Comment ça marche

Si tu achètes puis revends immédiatement, sans que le marché ait bougé, tu perds le spread. Tu as acheté au prix des vendeurs et revendu au prix des acheteurs.

C'est un coût de transaction invisible : il n'apparaît sur aucune ligne, aucun relevé, aucun décompte de frais. Il est déjà dans le prix.

Sa taille traduit directement l'état du marché : plus il y a de participants prêts à se placer des deux côtés, plus l'écart se resserre. Un spread large signale qu'il n'y a personne, ou que personne ne veut s'engager — typiquement en pleine panique, ou sur une paire que personne n'échange.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> C'est une marge d'hystérésis. Entre le seuil de déclenchement montant et le seuil descendant d'un comparateur, il existe une zone morte où rien ne bascule. Le carnet fonctionne pareil : entre le meilleur bid et le meilleur ask, aucune transaction ne peut avoir lieu.
>
> Et comme en électronique, la largeur de la zone morte est une caractéristique du système, pas un réglage qu'on choisit : elle dépend de qui participe.

## Exemple chiffré

Relevé réel sur BTC-USDT, le 22 août 2026 :

```
meilleur bid   77 137,4 USDT
meilleur ask   77 137,5 USDT
spread          0,1 USDT   =  0,00013 %
```

Un aller-retour immédiat de 1 BTC te coûte donc 0,1 USDT en spread. Sur 77 137 USDT engagés, c'est négligeable — c'est ce que veut dire « paire très liquide ».

Maintenant l'ordre de grandeur inverse. Sur une paire confidentielle, un spread de 1 % n'a rien d'exceptionnel. Le même aller-retour immédiat coûterait alors 1 % du montant engagé, **avant** le moindre frais de trading. Soit, sur 1 000 euros, 10 euros perdus sans que rien n'ait bougé et sans qu'aucune ligne de frais n'apparaisse.

Le rapport entre les deux situations est de l'ordre de 7 000 pour un, sur la même plateforme, le même jour.

## Sur OKX

Le spread ne s'affiche pas comme une valeur. Il se lit au milieu du carnet : c'est l'écart entre le premier chiffre rouge et le premier chiffre vert. Sur les paires principales il est souvent d'un seul pas de cotation — le `tickSz`, la granularité minimale de prix de l'instrument, que l'endpoint `public/instruments` donne pour chaque paire.

Quand le spread vaut exactement un tick, il ne peut mécaniquement pas être plus serré.

## Les pièges

> [!piege] « Zéro frais » ne veut pas dire gratuit
> Un service de conversion sans commission affichée se rémunère sur le spread qu'il applique. Le coût existe toujours ; il a simplement quitté la ligne « frais » pour entrer dans le prix. Le seul moyen de le mesurer est de comparer le prix proposé avec le carnet au même instant.

> [!piege] Le spread se creuse quand tu en as le plus besoin
> Il est étroit quand tout est calme, et s'élargit brutalement quand le marché s'agite — précisément parce que les participants qui le tenaient serré retirent leurs ordres. C'est un fait de structure, pas une malveillance.

> [!piege] Un spread serré ne signifie pas un carnet profond
> Ce sont deux propriétés indépendantes. Le meilleur ask peut être à un tick du meilleur bid pour une quantité minuscule, et le carnet s'effondrer au deuxième niveau. Voir l'exemple du [carnet d'ordres](/marches/carnet-ordres), où vingt niveaux ne totalisent que 1,13 BTC.

## Pour aller plus loin

- [Le carnet d'ordres](/marches/carnet-ordres) — d'où vient l'écart
- [Maker et taker](/marches/maker-taker) — qui paie le spread et qui l'encaisse
- [Les frais chez OKX](/okx/frais) — le coût qui, lui, est facturé
