---
titre: "Les produits « x3 » et pourquoi ils fondent"
section: "derives"
ordre: 120
resume: "Un produit qui promet de multiplier les variations par trois perd de la valeur avec le temps, même quand le prix de départ ne bouge pas."
niveau: "bases"
prerequis: ["/marches/carnet-ordres"]
termes: ["etf", "token-a-levier", "decroissance", "levier", "creance", "spot"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "AMF — autorité des marchés financiers"
    url: "https://www.amf-france.org/fr"
statut: "redige"
---

**Un produit « x3 » multiplie par trois la variation d'une journée, pas celle de la période. Sur plusieurs semaines, il perd de la valeur même si le prix de départ n'a pas bougé.**

## Pourquoi cette page

Deux choses très différentes portent le même mot dans les discussions.

**Un ETF au comptant** est un fonds réglementé, coté en bourse, qui détient réellement des bitcoins. C'est un produit encadré par un régulateur, conçu pour être conservé.

**Un « token à levier x3 »** est un jeton émis par une plateforme, qui n'est ni un fonds, ni coté en bourse, ni encadré de la même façon. Il est conçu pour une journée.

Les deux se retrouvent appelés « ETF » dans la conversation courante. Ce n'est pas la même chose du tout, et confondre les deux coûte cher.

## Comment ça marche

Un produit à levier vise à multiplier par trois la variation **du jour**. Chaque soir, il réajuste sa position pour repartir sur cette base.

C'est ce réajustement quotidien qui pose problème. Il n'y a **aucune raison** pour que la multiplication tienne sur plusieurs jours — et en pratique, elle ne tient jamais.

> [!exemple] Deux jours suffisent à comprendre
> Un actif vaut 100 €. Il perd 10 % le premier jour, puis regagne 10 % le lendemain. Il vaut alors 99 € : presque revenu au point de départ.
>
> Un produit « x3 » perd 30 % le premier jour, tombant à 70 €. Il regagne 30 % le lendemain : **91 €**.
>
> L'actif a perdu 1 %. Le produit à levier en a perdu 9. Et ça se reproduit à chaque aller-retour.

Plus le prix s'agite, plus l'effet est fort. Il ne dépend pas du sens du marché : il fonctionne à la hausse comme à la baisse.

## Un exemple concret

Voici le calcul refait sur les 90 derniers jours réels du bitcoin, en appliquant chaque jour le triple de la variation quotidienne :

| | Résultat sur 90 jours |
|---|---|
| Bitcoin, détenu simplement | **+0,87 %** |
| Ce qu'un « x3 » devrait faire, intuitivement | +2,60 % |
| Ce qu'un « x2 » aurait réellement fait | **−2,68 %** |
| Ce qu'un « x3 » aurait réellement fait | **−10,24 %** |

Le bitcoin a monté. Le produit x3 a perdu 10 %.

Ce n'est pas de la malchance : la période retenue est simplement celle des 90 derniers jours, sans sélection. Ce n'est pas non plus une anomalie de marché — c'est le fonctionnement normal du produit.

## Ce qu'il faut savoir

> [!piege] « x3 » ne veut dire x3 que sur une seule journée
> C'est écrit dans la documentation de tous ces produits, et pratiquement jamais lu. Sur n'importe quelle autre durée, le multiplicateur réel n'a pas de valeur fixe.

> [!piege] Le mot « ETF » ne garantit rien par lui-même
> Il désigne une forme juridique précise. Un jeton qui emprunte le mot sans en avoir le statut n'offre aucune des protections associées.

> [!piege] Même un ETF au comptant ne te donne aucune clé
> Tu détiens une part de fonds, donc une promesse d'un émetteur qui, lui, détient les bitcoins. Le raisonnement est le même que pour une plateforme : voir [on-chain et off-chain](/okx/on-chain-off-chain).

> [!verifier] Ces produits ne sont pas toujours proposés
> Au moment d'écrire cette page, aucun token à levier n'apparaissait dans la liste publique des produits d'OKX. L'offre change d'une plateforme à l'autre et d'un mois à l'autre.

## Pour aller plus loin

- [Le vocabulaire des marchés](/marches/vocabulaire) — les autres mots à décoder
- [On-chain et off-chain](/okx/on-chain-off-chain) — ce que tu détiens réellement
