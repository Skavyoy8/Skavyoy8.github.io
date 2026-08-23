---
titre: "Ethereum"
section: "chaines"
ordre: 20
resume: "Une blockchain qui ne fait pas que transférer de l'argent : elle exécute des programmes. C'est là que vit presque tout ce qui n'est pas Bitcoin."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-une-blockchain"]
termes: ["evm", "gas", "erc-20", "proof-of-work"]
sources:
  - titre: "Documentation officielle d'Ethereum"
    url: "https://ethereum.org/en/developers/docs/"
  - titre: "Documentation officielle d'Ethereum — la preuve d'enjeu"
    url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/"
statut: "redige"
---

**Ethereum est une blockchain sur laquelle on peut faire tourner des programmes. Bitcoin enregistre qui possède quoi ; Ethereum enregistre aussi ce que des programmes ont fait.**

## Pourquoi ça existe

Bitcoin fait une chose, et la fait bien : transférer de la valeur. Son langage interne est volontairement limité — pas de boucles, pas de programmes complexes.

L'idée d'Ethereum, lancée en 2015, était d'ouvrir cette contrainte : permettre à n'importe qui de déposer un programme sur la blockchain, que tout le monde peut ensuite appeler, et dont le résultat est enregistré comme une transaction.

Ces programmes s'appellent des **contrats**. Le mot est trompeur : ce n'est pas un document juridique, c'est du code.

## Comment ça marche

Un contrat est déposé une fois sur la blockchain. Il a une adresse, comme un portefeuille. N'importe qui peut lui envoyer une transaction pour déclencher une de ses fonctions.

Trois propriétés en découlent :

**Il fait toujours exactement la même chose.** Tous les ordinateurs du réseau exécutent le même code et doivent trouver le même résultat, sinon il n'y aurait pas d'accord possible.

**Il ne peut pas être modifié.** Une fois déposé, le code est figé. S'il contient une erreur, elle est là pour toujours — il faut déployer un nouveau contrat et convaincre tout le monde de l'utiliser.

**Il coûte à l'usage.** Chaque opération consomme une quantité de travail appelée `gas`, payée par celui qui déclenche l'exécution. Un programme qui tourne longtemps coûte cher.

## À quoi ça sert concrètement

C'est sur Ethereum, et sur les blockchains qui l'ont copié, que vivent la plupart des choses dont on entend parler :

- **Les jetons.** L'USDT, l'USDC et des milliers d'autres ne sont pas des blockchains : ce sont des contrats sur Ethereum qui tiennent une liste de qui possède combien.
- **Les échanges décentralisés**, qui permettent d'échanger sans intermédiaire.
- **Les NFT**, qui sont des contrats attribuant des identifiants uniques à des adresses.

> [!exemple] Un distributeur automatique
> Un contrat fonctionne comme un distributeur : tu mets la somme demandée, il exécute ce pour quoi il a été programmé, toujours de la même façon.
>
> La différence est qu'il n'y a personne pour le réparer si le programme est mal écrit. Il continuera à faire exactement ce qui est écrit, y compris l'erreur.

## Ce qui a changé en 2022

Ethereum fonctionnait au minage, comme Bitcoin. En septembre 2022, le réseau est passé au staking : les validateurs immobilisent des fonds au lieu de dépenser de l'électricité.

La consommation électrique du réseau a chuté de plus de 99 %. C'est le seul grand réseau à avoir réussi ce changement en fonctionnement.

## Ce qu'il faut savoir

> [!piege] « Smart contract » n'a rien d'intelligent ni de contractuel
> C'est un programme. Le nom, choisi dans les années 1990, prête à confusion depuis.

> [!piege] Un contrat mal écrit ne se corrige pas
> Les pertes les plus lourdes du secteur viennent de failles dans des contrats, pas de blockchains piratées. Le code est public et figé : n'importe qui peut chercher l'erreur, et personne ne peut la réparer.

> [!piege] Ether et Ethereum ne sont pas la même chose
> Ethereum est le réseau. L'ether (ETH) est la monnaie qui sert à payer les frais. On dit couramment « de l'Ethereum », mais l'unité s'appelle l'ether.

## Pour aller plus loin

- [Les stablecoins](/chaines/stablecoins) — les jetons les plus utilisés sur ce réseau
- [Le staking](/fondamentaux/proof-of-stake) — le mécanisme adopté en 2022
- [Les autorisations données aux applications](/securite/approbations) — le risque propre aux contrats
