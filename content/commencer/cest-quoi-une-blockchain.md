---
titre: "C'est quoi une blockchain ?"
section: "commencer"
ordre: 20
resume: "Un journal append-only découpé en blocs, chaque bloc contenant l'empreinte du précédent. Modifier une entrée ancienne invalide tout ce qui suit."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-la-crypto"]
termes: ["empreinte"]
sources:
  - titre: "Satoshi Nakamoto — Bitcoin: A Peer-to-Peer Electronic Cash System"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "Bitcoin Developer Reference — Block Chain"
    url: "https://developer.bitcoin.org/reference/block_chain.html"
statut: "redige"
---

**Une blockchain, c'est un journal append-only découpé en blocs, où chaque bloc embarque l'empreinte du précédent.**

## Le problème que ça résout

Le journal est répliqué partout. Très bien. Mais qu'est-ce qui empêche une machine de modifier une entrée vieille de trois mois dans sa copie, puis de la propager ?

Il faut que toute altération d'une entrée ancienne soit détectable en temps constant, sans comparer les historiques entrée par entrée.

## Comment ça marche

Les transactions sont groupées en **blocs** — environ 3 000 par bloc sur Bitcoin, un bloc toutes les dix minutes environ.

L'en-tête de chaque bloc contient l'**empreinte** du bloc précédent : une valeur de taille fixe calculée sur son contenu.

Modifie une transaction dans un bloc ancien, et son empreinte change. L'en-tête du bloc suivant ne correspond plus. Ni celui d'après. **Toute la suite de la chaîne devient invalide d'un coup**, et n'importe quel nœud le détecte en recalculant.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> C'est la structure de l'historique Git : chaque commit référence l'empreinte de son parent, donc réécrire un commit ancien réécrit tous ses descendants — c'est exactement pour ça qu'un `rebase` change tous les identifiants en aval.
>
> Une blockchain, c'est ça, plus deux choses : les commits sont signés, et une règle de consensus désigne la branche qui fait autorité quand deux existent.

## Pourquoi personne ne réécrit l'histoire

Recalculer l'empreinte d'un bloc ne suffit pas : il faut refaire tous les blocs suivants, **plus vite que le reste du réseau qui continue d'en produire**. Le coût en électricité dépasse largement ce qu'on pourrait en tirer.

Donc « immuable » n'est pas une propriété mathématique, c'est une propriété économique : trop cher pour que ça vaille le coup. La nuance a son importance, et elle disparaît dans la plupart des présentations.

## Où en est la chaîne

Bitcoin en est au bloc **963635** au moment où j'écris. Chacun référence le précédent sans interruption depuis le bloc 0, le 3 janvier 2009.

## La suite

- [Ce qui se passe quand tu achètes sur OKX](/commencer/acheter-sur-okx)
- [Les fonctions de hachage](/fondamentaux/hachage) — ce qu'est exactement une empreinte, et pourquoi on ne peut pas l'inverser
