---
titre: "Les fonctions de hachage"
section: "fondamentaux"
ordre: 20
resume: "Transformer n'importe quelle donnée en un code court, unique en pratique, et impossible à remonter à l'envers. C'est la brique sur laquelle tout le reste est posé."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-une-blockchain"]
termes: ["hachage", "sha-256", "empreinte", "collision", "effet-avalanche", "merkle"]
sources:
  - titre: "NIST — la norme officielle qui définit SHA-256"
    url: "https://csrc.nist.gov/pubs/fips/180-4/upd1/final"
  - titre: "Satoshi Nakamoto — le document qui a lancé Bitcoin (2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
statut: "redige"
---

**Une fonction de hachage transforme n'importe quelle donnée en un code de longueur fixe, appelé empreinte, sans qu'on sache faire le chemin inverse.**

## Pourquoi ça existe

Trois besoins, une seule réponse.

Tu veux **vérifier que deux fichiers sont identiques** sans les comparer entièrement. Tu veux **détecter qu'un document a été modifié** sans garder une copie de l'original pour comparer. Tu veux **relier des blocs entre eux** de façon qu'on ne puisse pas en retoucher un sans que ça se voie.

Dans les trois cas, il suffit de savoir calculer un petit code qui dépend de la totalité du contenu, et qui change du tout au tout dès qu'on touche à quoi que ce soit.

## Comment ça marche

SHA-256 est la fonction utilisée par Bitcoin. Elle est définie par une norme publique du NIST, l'organisme américain de normalisation. Elle accepte n'importe quoi en entrée — un mot, un film, un fichier vide — et rend toujours **64 caractères**.

Quatre propriétés en font l'intérêt :

| Propriété | Ce que ça veut dire |
|---|---|
| **Toujours pareil** | La même entrée donne toujours la même empreinte, sur n'importe quel ordinateur, aujourd'hui comme dans dix ans. |
| **Sens unique** | À partir de l'empreinte, on ne sait pas retrouver l'entrée. Il faudrait essayer toutes les possibilités, une par une. |
| **Pas de doublon connu** | Personne ne sait fabriquer deux entrées différentes qui donneraient la même empreinte. |
| **Effet avalanche** | Changer un seul caractère change environ la moitié de l'empreinte. |

## Un exemple concret

Deux mots qui ne diffèrent que par une majuscule :

```
Registre  →  c83fa1db7c07b7214d8d16dc50e7a2cd075005197267fa1da276b28a72800325
registre  →  9f60d83e92d7ca4f038d58765514e5a84ddfa3ab9629cfb38e3f6c2ab5691202
```

Une seule lettre a changé de casse. Les deux résultats n'ont **pas un seul caractère en commun au début**, ni de ressemblance nulle part.

C'est ça, l'effet avalanche, et c'est ce qui rend le procédé utile : il n'existe aucune notion de « presque pareil ». Deux empreintes sont identiques, ou totalement différentes. On ne peut donc pas s'approcher progressivement d'un résultat visé.

> [!exemple] L'ordre de grandeur
> Une empreinte SHA-256 peut prendre environ 10⁷⁷ valeurs différentes — un 1 suivi de 77 zéros.
>
> C'est à peu près le nombre d'atomes qui composent l'univers observable. Chercher une entrée qui donnerait une empreinte imposée revient à fouiller un espace de cette taille, un élément à la fois.

## À quoi ça sert dans la crypto

- **Relier les blocs.** Chaque bloc contient l'empreinte du précédent. C'est ce qui rend la chaîne infalsifiable.
- **Identifier une transaction.** Le code que tu colles dans un site public pour suivre un virement est l'empreinte de cette transaction.
- **Fabriquer les adresses.** Une adresse est obtenue en hachant plusieurs fois une clé publique.
- **Miner.** Les mineurs cherchent, par essais successifs, une empreinte inférieure à un seuil donné. C'est tout le travail.

## Ce qu'il faut savoir

> [!piege] Hacher n'est pas chiffrer
> Chiffrer est réversible : avec la bonne clé, on retrouve le message. Hacher ne l'est pas, et il n'y a aucune clé. L'information de départ n'est plus là du tout — elle a été réduite à 64 caractères, ce qui détruit forcément la quasi-totalité du contenu.

> [!piege] « Une empreinte est unique » est faux
> Il y a une infinité d'entrées possibles pour un nombre fini d'empreintes. Des doublons existent donc forcément. La vraie propriété est plus modeste et plus utile : **personne ne sait en fabriquer un**. Pour des fonctions plus anciennes comme MD5 et SHA-1, on sait le faire aujourd'hui — c'est pourquoi elles ont été abandonnées.

> [!piege] Le résultat n'a rien d'aléatoire
> Il en a l'air, mais il est parfaitement déterminé. La même entrée donnera toujours exactement le même résultat. C'est justement ce qui permet à des milliers d'ordinateurs de vérifier la même chose et de tomber d'accord.

## Pour aller plus loin

- [C'est quoi une blockchain ?](/commencer/cest-quoi-une-blockchain) — le chaînage des blocs par l'empreinte
- [Adresses et sommes de contrôle](/fondamentaux/adresses) — comment une adresse est fabriquée
- [Proof of Work](/fondamentaux/proof-of-work) — la recherche d'empreinte qui protège le réseau
