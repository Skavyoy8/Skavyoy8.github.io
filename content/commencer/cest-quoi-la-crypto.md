---
titre: "C'est quoi la crypto ?"
section: "commencer"
ordre: 10
resume: "Une monnaie qui n'existe que sous forme d'une liste de transactions, tenue en même temps par des milliers d'ordinateurs, sans banque au centre."
niveau: "bases"
termes: []
sources:
  - titre: "Satoshi Nakamoto — le document qui a lancé Bitcoin (2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
statut: "redige"
---

**Une crypto est une monnaie qui n'existe que sous forme d'une liste de transactions, tenue simultanément par des milliers d'ordinateurs qui se surveillent les uns les autres, sans banque ni entreprise au centre.**

## Pourquoi ça existe

Quand tu paies par carte, ta banque tient un registre. Elle sait combien tu as, elle enregistre chaque opération, et c'est elle qui décide si le paiement passe.

Ça marche très bien, à condition de lui faire confiance. Elle peut se tromper, bloquer un compte, appliquer des frais que tu découvres après coup, ou fermer un vendredi soir. Tu n'as aucun moyen de vérifier ce qu'elle écrit dans son registre : tu vois seulement ce qu'elle veut bien t'afficher.

La crypto part d'une autre idée : **et si le registre n'appartenait à personne ?** S'il était recopié à l'identique sur des milliers d'ordinateurs, consultable par tous, et modifiable seulement quand une majorité est d'accord ?

## Comment ça marche

Ce registre contient uniquement des lignes du type « telle adresse a envoyé tel montant à telle adresse ». Rien d'autre.

Trois conséquences, qui surprennent au début :

**Ton solde n'est écrit nulle part.** Il se calcule en additionnant tout ce que tu as reçu et en retranchant tout ce que tu as envoyé. Il n'existe aucune case « solde de Luc » quelque part.

**Personne ne peut écrire à ta place.** Pour envoyer des fonds, il faut produire une preuve mathématique qu'on détient le secret associé à l'adresse — c'est ce qu'on appelle une signature. Sans ce secret, aucune opération n'est possible. Avec, personne ne peut t'en empêcher.

**Tout est public.** N'importe qui peut lire l'intégralité des transactions depuis 2009. Ce n'est pas un défaut du système, c'est son fonctionnement : c'est justement parce que tout le monde voit tout que personne n'a besoin de faire confiance à quelqu'un en particulier.

## Le vrai problème à résoudre

Un registre sans propriétaire pose une question difficile : **qui décide de l'ordre des lignes ?**

Imagine que j'envoie les mêmes 10 euros à deux personnes en même temps, en annonçant l'une des opérations à Paris et l'autre à Tokyo. Chacune paraît valable. Sans arbitre pour trancher, les deux moitiés du réseau ne seraient pas d'accord sur qui a été payé.

C'est ce problème — et pas la monnaie, ni les prix, ni la spéculation — que la technologie derrière la crypto résout. Tout le reste en découle.

## Un exemple concret

Tu envoies 0,01 bitcoin à quelqu'un :

1. **Ton application prépare la transaction** et la signe avec ton secret. Cette signature prouve que tu es autorisé, sans jamais révéler le secret lui-même.
2. **Elle envoie l'opération à quelques ordinateurs du réseau**, qui la vérifient et la transmettent à leurs voisins. En quelques secondes, elle a fait le tour du monde.
3. **Une dizaine de minutes plus tard**, elle est inscrite définitivement dans le registre.

Personne n'a donné d'autorisation. Aucun guichet n'a ouvert. Aucun dossier n'a été instruit.

## Ce qu'il faut savoir

> [!piege] Ce n'est pas anonyme
> C'est l'idée fausse la plus répandue. Les transactions portent des adresses au lieu de noms, mais elles sont publiques, permanentes et reliées entre elles. Une seule adresse rattachée à ton identité — par un achat, un retrait, un site — et une bonne partie de ton historique devient lisible. On parle de pseudonymat, pas d'anonymat.

> [!piege] Il n'existe aucune pièce
> Rien n'est stocké nulle part, il n'y a pas de fichier « un bitcoin ». Il n'y a que des lignes dans un registre, et un calcul qui en déduit combien chaque adresse peut dépenser.

> [!piege] Aucun recours en cas d'erreur
> Une transaction partie ne se rappelle pas, et une adresse mal recopiée envoie les fonds dans le vide. Il n'y a ni service client, ni procédure d'annulation. C'est la contrepartie directe de l'absence d'autorité centrale.

## Pour aller plus loin

- [C'est quoi une blockchain ?](/commencer/cest-quoi-une-blockchain) — comment on empêche de modifier le registre après coup
- [Ce qui se passe quand tu achètes sur une plateforme](/commencer/acheter-sur-okx) — et pourquoi ça ne se passe pas du tout comme ci-dessus
