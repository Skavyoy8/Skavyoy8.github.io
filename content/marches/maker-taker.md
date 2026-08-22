---
titre: "Maker et taker"
section: "marches"
ordre: 70
resume: "Le même échange coûte deux tarifs différents selon que ton ordre attend dans le carnet ou le consomme."
niveau: "bases"
prerequis: ["/marches/carnet-ordres"]
termes: ["maker", "taker", "carnet-ordres", "liquidite", "rebate", "frais-de-trading", "spread"]
sources:
  - titre: "OKX — Barème des frais"
    url: "https://www.okx.com/fees"
  - titre: "OKX — Trading Fee Rules FAQ"
    url: "https://www.okx.com/help/trading-fee-rules-faq"
statut: "redige"
---

**Un ordre qui entre dans le carnet et attend est un ordre maker. Un ordre qui s'exécute immédiatement contre le carnet est un ordre taker. Les deux ne sont pas facturés au même tarif.**

## Le problème que ça résout

Un carnet vide ne sert à rien. Pour qu'un marché fonctionne, il faut des gens qui acceptent d'afficher un prix à l'avance et d'attendre, en prenant le risque que le marché leur passe dessus.

Ce service a une valeur, et la tarification différenciée est la façon dont la plateforme la rémunère : elle facture plus cher ceux qui consomment le carnet que ceux qui le remplissent.

## Comment ça marche

| | Maker | Taker |
|---|---|---|
| Ce que fait ton ordre | Se pose dans le carnet et attend | Frappe un ordre déjà présent |
| Effet sur la liquidité | Il en ajoute | Il en retire |
| Exécution | Incertaine, peut ne jamais venir | Immédiate et garantie |
| Prix obtenu | Celui que tu as choisi | Celui du carnet, quel qu'il soit |
| Tarif | Le moins cher, parfois négatif | Le plus cher |

La distinction ne dépend pas du type d'ordre que tu as choisi, mais **de ce qui s'est passé à l'arrivée** :

- Un ordre au marché est toujours taker : il est conçu pour s'exécuter tout de suite.
- Un ordre limite est maker **s'il ne croise pas** le camp d'en face. S'il le croise, il s'exécute immédiatement et devient taker.

Un ordre limite d'achat à 77 200 alors que le meilleur vendeur est à 77 137,5 s'exécute sur-le-champ : tu voulais poser un ordre, tu as payé le tarif taker.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> Le carnet est un cache. Le maker écrit dedans, le taker fait un cache hit et repart avec la donnée immédiatement.
>
> Le taker paie plus cher parce qu'il consomme une entrée que quelqu'un a dû préparer et maintenir à jour. Et quand le cache est vide, le tarif d'écriture devient négatif : on paie les gens pour le préchauffer — c'est exactement ce qu'est un rebate.

## Exemple chiffré

Un aller-retour de 10 000 USDT, avec un barème de 0,080 % en maker et 0,100 % en taker :

| | Achat | Vente | Total |
|---|---|---|---|
| Deux ordres au marché (taker/taker) | 10,00 USDT | 10,00 USDT | **20,00 USDT** |
| Deux ordres limites non croisés (maker/maker) | 8,00 USDT | 8,00 USDT | **16,00 USDT** |

4 USDT d'écart sur 10 000, soit 20 % de frais en moins, pour la même opération. La contrepartie est réelle : les ordres maker peuvent ne jamais s'exécuter, et le marché part parfois sans toi.

À ces frais s'ajoute le spread, qui n'apparaît sur aucune ligne : sur BTC-USDT il valait 0,1 USDT le 22 août 2026, soit environ 0,013 USDT sur 10 000 engagés — négligeable ici, mais dominant sur une paire peu échangée.

> [!verifier] Les barèmes changent
> Les taux ci-dessus servent d'ordre de grandeur pour le calcul. Les valeurs réelles dépendent du palier, de l'entité juridique et du type d'instrument, et OKX les ajuste régulièrement. À relever sur la page officielle des frais avant tout calcul sérieux.

## Sur OKX

Le type d'ordre se choisit à la saisie : « Marché » est toujours taker, « Limite » peut être l'un ou l'autre. Une option post-only, selon les interfaces, annule l'ordre au lieu de l'exécuter s'il devait croiser le carnet — c'est la seule façon d'avoir la garantie du tarif maker.

Le récapitulatif d'exécution indique lequel des deux tarifs a été appliqué. C'est là qu'on découvre parfois qu'un ordre limite est parti en taker.

## Les pièges

> [!piege] Un ordre limite n'est pas automatiquement maker
> C'est l'erreur la plus fréquente. Ce qui compte est de savoir si l'ordre croise le carnet à l'arrivée, pas le bouton sur lequel tu as cliqué.

> [!piege] Le tarif maker ne compense pas un mauvais prix
> Économiser 0,02 % de frais en attendant, puis se faire dépasser de 0,5 % par le marché, n'est pas une économie. Les deux effets sont d'ordres de grandeur différents.

> [!piege] Maker et taker ne sont pas des rôles, mais des états
> Le même participant est maker sur un ordre et taker sur le suivant. Ce n'est pas un statut de compte.

## Pour aller plus loin

- [Le carnet d'ordres](/marches/carnet-ordres) — ce que l'un remplit et l'autre vide
- [Le spread](/marches/spread) — l'autre coût, celui qui ne se facture pas
- [Les frais chez OKX](/okx/frais) — les paliers et leur calcul
