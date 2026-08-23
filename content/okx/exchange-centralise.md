---
titre: "Comment fonctionne une plateforme d'échange"
section: "okx"
ordre: 10
resume: "Un site qui met en relation acheteurs et vendeurs, garde l'argent de tout le monde, et tient ses comptes dans sa propre base de données."
niveau: "bases"
termes: ["cex", "moteur-appariement", "carnet-ordres", "priorite-prix-temps", "portefeuille-chaud", "portefeuille-froid", "off-chain"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — règles d'exécution des ordres"
    url: "https://tr.okx.com/en/help/order-execution-policy"
statut: "redige"
---

**Une plateforme d'échange centralisée est une entreprise qui garde les fonds de ses clients, met en relation ceux qui veulent acheter et ceux qui veulent vendre, et enregistre le tout dans ses propres registres.**

## Pourquoi ça existe

Acheter de la crypto directement à un inconnu pose des problèmes évidents : le trouver, se mettre d'accord sur un prix, et surtout savoir qui envoie en premier.

Une plateforme règle les trois. Elle rassemble des millions de participants au même endroit, elle laisse le prix se former tout seul par confrontation de l'offre et de la demande, et elle sert de tiers de confiance : elle détient les fonds des deux côtés, donc personne n'a besoin de faire confiance à personne d'autre qu'elle.

C'est pratique. C'est aussi tout le problème, puisqu'il faut alors lui faire confiance à elle.

## Comment ça marche

Trois pièces principales.

**Le carnet d'ordres.** La liste de toutes les intentions d'achat et de vente en attente, classées par prix. C'est un tableau public, visible dans l'application.

**Le moteur d'appariement.** Le programme qui regarde ce carnet en permanence et déclenche une transaction dès qu'un acheteur et un vendeur se rejoignent sur un prix. Il applique une règle simple et non négociable : **le meilleur prix passe en premier, et à prix égal, le plus ancien passe en premier.**

**Les portefeuilles de l'entreprise.** Les fonds de tous les clients sont regroupés dans des portefeuilles appartenant à la plateforme. Une petite partie reste accessible en permanence pour honorer les retraits — on parle de portefeuille « chaud ». Le reste est stocké hors ligne, dans des conditions bien plus protégées — le portefeuille « froid ».

C'est pour ça qu'un retrait est parfois un peu long : si la réserve accessible est vide, il faut une intervention humaine pour la réapprovisionner.

> [!exemple] Ce que ça change par rapport à une bourse classique
> Une bourse traditionnelle ne garde pas ton argent : ta banque ou ton courtier s'en charge, et les rôles sont séparés par la loi.
>
> Une plateforme crypto fait souvent tout à la fois : elle organise le marché, elle garde les fonds, et parfois elle prête ou spécule avec. Ce cumul est la source de la plupart des accidents du secteur.

## Un exemple concret

Tu passes un ordre d'achat de bitcoin :

1. Ton ordre arrive dans le carnet.
2. Le moteur cherche un vendeur au prix demandé, ou meilleur.
3. S'il en trouve un, la transaction est enregistrée en quelques millièmes de seconde : la plateforme retire des euros de ton compte, y ajoute du bitcoin, et fait l'inverse chez le vendeur.
4. S'il n'en trouve pas, ton ordre reste affiché dans le carnet et attend.

Rien de tout cela ne touche une blockchain. Ce sont des écritures internes, comme expliqué dans [on-chain et off-chain](/okx/on-chain-off-chain).

## Ce qu'il faut savoir

> [!piege] Le prix affiché n'est pas « le » prix du bitcoin
> C'est le prix de la dernière transaction **sur cette plateforme**. Deux plateformes affichent des prix légèrement différents au même instant, et il n'existe pas de cours officiel unique.

> [!piege] La plateforme n'est pas neutre par nature
> Elle fixe ses frais, décide quelles monnaies elle référence, peut suspendre les retraits, et connaît les ordres de tous ses clients avant tout le monde. Ce ne sont pas des accusations, ce sont des faits de structure.

> [!piege] « Décentralisé » ne s'applique pas ici
> La blockchain est décentralisée, la plateforme ne l'est pas du tout. C'est une entreprise, avec des serveurs, des dirigeants et un siège social. On en trouve d'autres, réellement décentralisées, décrites dans [DEX et CEX](/produits/dex-vs-cex).

## Pour aller plus loin

- [On-chain et off-chain](/okx/on-chain-off-chain) — ce qui se passe réellement quand tu achètes
- [Le carnet d'ordres](/marches/carnet-ordres) — comment le prix se forme
- [Qui détient vraiment tes fonds](/okx/custodial-non-custodial)
