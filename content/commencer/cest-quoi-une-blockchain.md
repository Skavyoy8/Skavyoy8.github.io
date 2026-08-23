---
titre: "C'est quoi une blockchain ?"
section: "commencer"
ordre: 20
resume: "La façon de ranger le registre qui rend impossible de modifier une vieille ligne sans que tout le monde s'en aperçoive."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-la-crypto"]
termes: ["empreinte"]
sources:
  - titre: "Satoshi Nakamoto — le document qui a lancé Bitcoin (2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "mempool.space — état de la chaîne Bitcoin en direct"
    url: "https://mempool.space"
statut: "redige"
---

**Une blockchain est un registre découpé en pages numérotées, reliées entre elles de telle sorte qu'on ne peut pas en modifier une seule sans casser toutes les suivantes.**

## Pourquoi ça existe

Le registre est recopié sur des milliers d'ordinateurs. Très bien. Mais qu'est-ce qui empêche l'un d'eux de modifier discrètement une ligne vieille de trois mois dans sa copie, puis de prétendre que c'est la bonne version ?

Il fallait un moyen de repérer instantanément toute modification du passé — sans avoir à comparer des millions de lignes une par une.

## Comment ça marche

Les transactions sont rassemblées par paquets qu'on appelle des **blocs**. Sur Bitcoin, un nouveau bloc est ajouté toutes les dix minutes environ, et contient quelques milliers de transactions.

Le mécanisme tient dans une seule idée. Chaque bloc contient une **empreinte** du bloc précédent : un petit code, d'une soixantaine de caractères, calculé à partir de la totalité de son contenu.

Cette empreinte a une propriété particulière : elle change complètement à la moindre modification. Changez une virgule dans le bloc, et l'empreinte n'a plus rien à voir avec la précédente.

Alors si quelqu'un modifie une transaction dans un vieux bloc :

- l'empreinte de ce bloc change ;
- le bloc suivant, qui contenait l'ancienne empreinte, ne correspond plus ;
- le bloc d'après non plus, et ainsi de suite jusqu'à aujourd'hui.

**Toute la suite s'écroule d'un coup**, et n'importe quel ordinateur du réseau s'en rend compte en une fraction de seconde.

C'est de là que vient le nom : une chaîne (*chain*) de blocs (*block*).

> [!exemple] L'image du sceau de cire
> C'est le principe d'un document dont chaque page porte le sceau de la précédente. Retirer ou modifier une page casse la continuité des sceaux, et ça se voit immédiatement, sans avoir à relire le document.

## Pourquoi personne ne triche

Recalculer l'empreinte d'un bloc modifié ne suffit pas. Il faudrait aussi refaire **tous les blocs suivants** — et plus vite que le reste du monde, qui continue d'en ajouter pendant ce temps.

Or produire un bloc coûte une quantité considérable d'électricité. Rattraper des mois de retard coûterait bien plus cher que ce qu'on pourrait espérer voler.

Ce point mérite d'être bien compris, parce qu'on lit souvent que la blockchain est « inviolable » :

> [!info] « Immuable » veut dire trop cher, pas impossible
> Rien dans les mathématiques n'interdit de réécrire l'histoire. Ce qui l'interdit, c'est le coût. C'est une garantie économique, pas une garantie absolue — et elle tient tant que personne ne peut mobiliser plus de puissance que le reste du réseau réuni.

## Un exemple concret

Au moment où cette page a été mise à jour, la chaîne Bitcoin en était à son bloc numéro **963718**.

Chacun de ces blocs contient l'empreinte du précédent, sans interruption depuis le tout premier, daté du 3 janvier 2009. Pour modifier une transaction faite l'an dernier, il faudrait refaire environ cinquante mille blocs, plus vite que la planète entière.

## Ce qu'il faut savoir

> [!piege] Une blockchain ne vérifie pas ce qui est vrai
> Elle garantit qu'une ligne écrite n'a pas été modifiée après coup. Elle ne garantit pas que cette ligne disait quelque chose de vrai au départ. Inscrire un mensonge dans une blockchain le rend permanent, pas exact.

> [!piege] Toutes les blockchains ne se valent pas
> Le principe est le même partout, la sécurité non. Elle dépend de la puissance ou des sommes engagées pour protéger le réseau. Une petite chaîne peu défendue peut être réécrite pour un coût modeste — c'est déjà arrivé plusieurs fois.

## Pour aller plus loin

- [Ce qui se passe quand tu achètes sur une plateforme](/commencer/acheter-sur-okx)
- [Les fonctions de hachage](/fondamentaux/hachage) — comment l'empreinte est calculée
