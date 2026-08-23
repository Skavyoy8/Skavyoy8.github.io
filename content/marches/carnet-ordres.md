---
titre: "D'où vient le prix"
section: "marches"
ordre: 20
resume: "Le prix n'est pas décidé par quelqu'un. Il sort d'une liste d'offres d'achat et de vente qui se rencontrent."
niveau: "bases"
prerequis: ["/okx/exchange-centralise"]
termes: ["carnet-ordres", "spread", "liquidite", "maker", "taker", "priorite-prix-temps"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — règles d'exécution des ordres"
    url: "https://tr.okx.com/en/help/order-execution-policy"
statut: "redige"
---

**Le prix d'une crypto n'est fixé par personne. C'est simplement le prix auquel la dernière transaction a eu lieu entre un acheteur et un vendeur.**

## Pourquoi ça existe

Il n'y a pas de bureau où quelqu'un déciderait que le bitcoin vaut tel montant aujourd'hui. Il n'y a pas non plus de valeur officielle.

Il y a des gens qui veulent acheter, d'autres qui veulent vendre, et un outil qui les met face à face : **le carnet d'ordres**.

## Comment ça marche

Le carnet est une liste à deux colonnes, visible dans toutes les applications.

D'un côté, **les acheteurs**, classés du plus généreux au moins généreux. De l'autre, **les vendeurs**, classés du moins cher au plus cher.

Tant que le meilleur acheteur propose moins que ce que demande le meilleur vendeur, rien ne se passe : chacun attend. Dès que quelqu'un accepte le prix d'en face, la transaction a lieu, et **ce prix devient le nouveau prix affiché**.

L'ordre de service est toujours le même : le meilleur prix passe en premier, et à prix égal, celui qui est arrivé le premier.

> [!exemple] Comme un marché aux enchères permanent
> Sauf qu'il n'y a pas de commissaire-priseur, et que les enchères des deux côtés sont affichées en continu, jour et nuit, pour que chacun voie ce que les autres proposent.

## Un exemple concret

Extrait réel du carnet du bitcoin, relevé au moment d'écrire cette page :

| | Prix | Quantité |
|---|---|---|
| Meilleur vendeur | 77 235,20 $ | 0,87 BTC |
| Meilleur acheteur | 77 235,10 $ | 0,26 BTC |

L'écart entre les deux — ce qu'on appelle le **spread** — vaut 10 centimes sur 77 000 dollars. Autant dire rien. C'est le signe d'un marché où beaucoup de monde participe.

Maintenant le chiffre qui surprend : **les vingt meilleures offres de vente réunies ne représentaient que 2,5 bitcoins**, soit environ 194 000 dollars. Sur le marché le plus actif qui existe.

Ça veut dire qu'un ordre d'achat de 200 000 dollars ne trouve pas son compte au prix affiché : il consomme les meilleures offres, puis les suivantes, plus chères, et le prix monte au fur et à mesure.

C'est toute la différence entre un prix serré et un marché profond. **Le prix affiché ne dit rien de la quantité disponible à ce prix.**

## Ce qu'il faut savoir

> [!piege] Le prix affiché n'est pas le prix que tu obtiendras
> C'est celui de la dernière transaction. Pour acheter maintenant, il faut payer ce que demande le meilleur vendeur — toujours un peu plus.

> [!piege] Sur une monnaie peu échangée, l'écart peut être énorme
> Ce qui vaut 10 centimes sur le bitcoin peut représenter plusieurs pourcents sur une monnaie confidentielle. Acheter puis revendre immédiatement fait alors perdre cet écart, sans que rien n'ait bougé.

> [!piege] Les offres affichées ne sont pas des engagements
> Elles s'annulent librement, et la plupart le sont avant d'être exécutées. Ce que tu vois à l'écran peut avoir disparu à l'instant où ton ordre arrive.

> [!piege] Chaque plateforme a son propre prix
> Deux sites affichent des montants légèrement différents au même moment, parce qu'ils ont chacun leur carnet. Il n'existe pas de cours officiel unique.

## Pour aller plus loin

- [Le spread](/marches/spread) — le coût caché de chaque aller-retour
- [Maker et taker](/marches/maker-taker) — pourquoi le même achat coûte deux tarifs différents
- [Le vocabulaire des marchés](/marches/vocabulaire) — les mots qu'on lit partout
