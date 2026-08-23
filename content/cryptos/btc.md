---
titre: "Bitcoin (BTC)"
section: "cryptos"
ticker: "BTC"
instId: "BTC-USDT"
ordre: 10
resume: "La première crypto, lancée en 2009. Nombre limité à 21 millions, sécurisée par le minage."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-une-blockchain"]
termes: ["proof-of-work", "halving", "satoshi", "utxo", "coinbase"]
sources:
  - titre: "Satoshi Nakamoto — le document qui a lancé Bitcoin (2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "Documentation technique de Bitcoin"
    url: "https://developer.bitcoin.org/reference/block_chain.html"
  - titre: "Université de Cambridge — indice de consommation électrique de Bitcoin"
    url: "https://ccaf.io/cbnsi/cbeci"
statut: "redige"
---

<div data-okx-prix="BTC-USDT"></div>

<div data-okx-graphique="BTC-USDT"></div>

**Bitcoin est la première crypto-monnaie. Elle fonctionne depuis 2009 sans interruption, sans entreprise qui la dirige, et le nombre total d'unités est plafonné à 21 millions.**

## Carte d'identité

| | |
|---|---|
| Lancement | 3 janvier 2009 |
| Créateur | « Satoshi Nakamoto », pseudonyme, identité inconnue à ce jour |
| Nombre maximal | 21 000 000 |
| Déjà en circulation | environ 20 074 125 (soit 95,6 % du total) |
| Plus petite unité | 1 satoshi = 0,000 000 01 BTC |
| Nouvelle page du registre | toutes les 10 minutes environ |
| Sécurisé par | le minage (preuve de travail) |

## À quoi ça sert

Le document fondateur pose un objectif unique : permettre à deux personnes de se payer directement, **sans banque au milieu**.

La difficulté n'était pas de sécuriser les messages — on savait le faire depuis les années 1970. Elle était de se mettre d'accord sur l'ordre des opérations sans arbitre. Comment empêcher quelqu'un de dépenser deux fois la même somme, en envoyant deux messages contradictoires à deux endroits du monde ?

La réponse de Bitcoin : rendre l'écriture coûteuse. Pour ajouter une page au registre, il faut dépenser de l'électricité. Réécrire le passé demanderait de tout refaire, plus vite que la planète entière.

## Ce qui le distingue

**Le nombre d'unités est connu à l'avance, pour toujours.** Le rythme de création est inscrit dans le programme depuis le début, et il est divisé par deux tous les quatre ans environ. Aucune monnaie d'État ne fonctionne comme ça.

**Le réseau ne sait faire presque rien.** Pas de programmes complexes, peu de transactions par seconde, très peu de changements depuis 2009. C'est un choix : moins il y a de fonctionnalités, moins il y a de failles possibles.

## Un exemple concret : combien existe-t-il de bitcoins ?

Ça ne se cherche pas dans un tableau, ça se calcule.

La récompense versée pour chaque nouvelle page du registre était de 50 bitcoins au départ. Elle est divisée par deux tous les 210 000 blocs, soit environ quatre ans :

| Période | Récompense par bloc |
|---|---|
| 2009 – 2012 | 50 |
| 2012 – 2016 | 25 |
| 2016 – 2020 | 12,5 |
| 2020 – 2024 | 6,25 |
| depuis 2024 | 3,125 |

En additionnant tout ce qui a été créé jusqu'au bloc **963 719**, on arrive à environ **20 074 125 bitcoins**, soit **95,6 % du maximum**.

Les quelques pourcents restants s'étaleront jusqu'aux alentours de 2140. La série se divise par deux indéfiniment : c'est pour ça que le total ne peut jamais dépasser 21 millions. Le plafond n'est pas une règle écrite quelque part, c'est une conséquence du calcul.

## Les critiques

Elles sont réelles et documentées. Les passer sous silence n'aiderait personne.

**La consommation électrique.** Elle est considérable, et ce n'est pas un défaut de fabrication : c'est le mécanisme de sécurité lui-même. On peut juger le prix trop élevé, mais on ne peut pas retirer la dépense sans retirer la protection. L'université de Cambridge en publie une mesure en continu.

**La lenteur.** Quelques transactions par seconde, contre plusieurs milliers pour un réseau de cartes bancaires. C'est assumé, et renvoyé à d'autres couches construites par-dessus.

**La concentration.** Le minage est aujourd'hui concentré dans un petit nombre d'entreprises et de régions. Un particulier ne mine plus seul depuis longtemps.

## Ce qu'il faut savoir

> [!piege] Le bitcoin acheté sur une plateforme n'est pas sur la blockchain
> Tant qu'il est sur ton compte, c'est une ligne dans la base de données de l'entreprise. Voir [on-chain et off-chain](/okx/on-chain-off-chain).

> [!piege] Bitcoin, bitcoin, BTC, sats
> « Bitcoin » avec une majuscule désigne le réseau, « bitcoin » l'unité.  est son code. Un « sat » est un cent-millionième de bitcoin — c'est l'unité qu'on utilise pour les petits montants.

> [!verifier] Le chiffre de circulation bouge
> Il a été calculé à partir de la hauteur de bloc du jour, qui augmente d'environ 144 par jour.

## Pour aller plus loin

- [Le minage](/fondamentaux/proof-of-work) — ce qui protège le réseau
- [C'est quoi une blockchain ?](/commencer/cest-quoi-une-blockchain)
