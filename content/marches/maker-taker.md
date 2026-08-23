---
titre: "Maker et taker"
section: "marches"
ordre: 70
resume: "Le même achat coûte deux tarifs différents selon que ton ordre attend ou qu'il se sert immédiatement."
niveau: "bases"
prerequis: ["/marches/carnet-ordres"]
termes: ["maker", "taker", "carnet-ordres", "liquidite", "rebate", "frais-de-trading"]
sources:
  - titre: "OKX — barème officiel des frais"
    url: "https://www.okx.com/fees"
  - titre: "OKX — règles de frais de trading"
    url: "https://www.okx.com/help/trading-fee-rules-faq"
statut: "redige"
---

**Un ordre qui attend dans le carnet est un ordre « maker ». Un ordre qui se sert tout de suite est un ordre « taker ». Le second coûte plus cher.**

## Pourquoi ça existe

Un marché où personne n'affiche d'offre à l'avance ne fonctionne pas : il n'y aurait jamais rien à acheter.

Ceux qui acceptent d'afficher un prix et d'attendre rendent donc un service — ils prennent le risque que le marché leur passe dessus. Les plateformes les récompensent en leur facturant moins cher que ceux qui se servent immédiatement.

## Comment ça marche

| | Maker | Taker |
|---|---|---|
| Ton ordre | attend dans le carnet | prend une offre déjà présente |
| Exécution | incertaine, parfois jamais | immédiate |
| Prix obtenu | celui que tu as choisi | celui du marché |
| Tarif | le moins cher | le plus cher |

Ce qui détermine ton tarif, ce n'est pas le bouton sur lequel tu as cliqué, c'est **ce qui arrive à ton ordre** :

- Un ordre **au marché** est toujours taker : il est fait pour s'exécuter tout de suite.
- Un ordre **limite** est maker s'il attend. Mais si le prix que tu fixes croise une offre déjà présente, il s'exécute immédiatement — et devient taker.

> [!exemple] Le vide-grenier
> Le maker, c'est celui qui installe son stand, affiche ses prix et attend le chaland. Le taker, c'est celui qui arrive et achète ce qui est déjà exposé.
>
> Sans stands, il n'y a pas de vide-grenier. C'est pour ça que l'organisateur fait payer moins cher ceux qui en tiennent un.

## Un exemple concret

Un aller-retour de 1 000 €, avec des taux courants de 0,08 % et 0,10 % :

| Façon de faire | Coût total |
|---|---|
| Deux ordres au marché | 2,00 € |
| Deux ordres limites qui attendent | 1,60 € |

40 centimes d'écart, soit 20 % de frais en moins pour exactement la même opération.

La contrepartie est réelle : un ordre qui attend peut ne jamais s'exécuter, et le marché peut partir sans toi.

> [!verifier] Les taux ci-dessus sont des ordres de grandeur
> Ils servent à illustrer le calcul. Les vrais dépendent de la plateforme, du volume échangé et du pays. À relever sur la page officielle des frais.

## Ce qu'il faut savoir

> [!piege] Un ordre limite n'est pas automatiquement au tarif réduit
> C'est l'erreur la plus fréquente. Si ton prix croise une offre existante, tu payes le tarif le plus cher, quel que soit le type d'ordre choisi.

> [!piege] Économiser des frais ne compense pas un mauvais prix
> Gagner 0,02 % en attendant, puis voir le marché bouger de 1 %, n'est pas une économie. Les deux chiffres ne jouent pas dans la même catégorie.

> [!piege] Ce ne sont pas des statuts
> Le même utilisateur est maker sur un ordre et taker sur le suivant. Ça décrit ce qu'a fait un ordre, pas qui tu es.

## Pour aller plus loin

- [D'où vient le prix](/marches/carnet-ordres) — le carnet que l'un remplit et l'autre vide
- [Les frais d'une plateforme](/okx/frais) — tous les coûts, réunis
- [Le spread](/marches/spread) — celui qui n'est jamais facturé
