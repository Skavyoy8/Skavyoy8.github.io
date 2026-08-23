---
titre: "Les clés et les signatures"
section: "fondamentaux"
ordre: 30
resume: "Un secret qui reste chez toi, un identifiant public qu'on peut donner à tout le monde, et une preuve qui relie les deux sans jamais révéler le secret."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-la-crypto"]
termes: ["adresse", "empreinte", "custody"]
sources:
  - titre: "Satoshi Nakamoto — le document qui a lancé Bitcoin (2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "Documentation technique de Bitcoin — les transactions"
    url: "https://developer.bitcoin.org/reference/transactions.html"
statut: "redige"
---

**Tu détiens un secret, appelé clé privée. On peut en déduire un identifiant public, mais pas l'inverse. Signer, c'est prouver que tu détiens le secret sans jamais le montrer.**

## Pourquoi ça existe

Sur un registre public, il faut pouvoir prouver qu'on est autorisé à dépenser. Mais tout le monde voit tout : impossible d'envoyer un mot de passe, il serait lu et réutilisé par le premier venu.

Il fallait donc un moyen de prouver qu'on connaît un secret **sans le communiquer**. C'est exactement ce que font les signatures.

## Comment ça marche

Trois objets, toujours dans le même ordre :

**La clé privée.** Un très grand nombre, tiré au hasard à la création du portefeuille. C'est le secret. Il ne sort jamais de ton appareil.

**La clé publique.** Calculée à partir de la clé privée. Le calcul fonctionne dans un sens seulement : de la privée vers la publique, c'est immédiat ; dans l'autre, personne ne sait faire. On peut donc la publier sans risque.

**L'adresse.** La clé publique, raccourcie et mise en forme. C'est ce qu'on communique pour recevoir des fonds.

Pour dépenser, ton portefeuille prend la transaction et la combine avec ta clé privée pour produire une **signature**. N'importe qui peut ensuite vérifier, avec la seule clé publique, que cette signature a bien été produite par le détenteur du secret.

> [!exemple] Une signature qui change à chaque document
> Une signature manuscrite est toujours la même : elle se photocopie, et on peut la coller sur n'importe quel papier.
>
> Une signature numérique dépend **du document signé**. Changer un centime dans la transaction, et la signature ne correspond plus. On ne peut donc pas la découper pour la recoller ailleurs.

## Un exemple concret

Le déroulé complet d'un envoi :

1. Tu indiques une adresse de destination et un montant.
2. Ton portefeuille construit la transaction et la **signe** avec la clé privée. Le secret ne quitte pas l'appareil.
3. La transaction et sa signature partent sur le réseau.
4. Chaque ordinateur qui la reçoit vérifie la signature avec la clé publique. Si elle est valide, il la transmet.

À aucun moment ta clé privée n'a circulé. C'est ce qui permet de faire tourner un système ouvert où personne ne se connaît.

## L'ordre de grandeur

Une clé privée Bitcoin est un nombre parmi environ 10⁷⁷ possibilités.

Ce nombre est du même ordre que la quantité d'atomes dans l'univers observable. Essayer les clés une par une pour tomber sur la bonne n'est pas difficile : c'est hors de portée de toute machine imaginable.

C'est pour ça qu'on ne « pirate » pas une adresse. On vole la clé, en s'attaquant à l'appareil ou à la personne.

## Ce qu'il faut savoir

> [!piege] Une adresse ne révèle rien
> Donner son adresse est totalement sans risque : on ne peut pas remonter à la clé privée. C'est fait pour être communiqué, affiché, publié.

> [!piege] Ce n'est pas du chiffrement
> On ne « déchiffre » pas une transaction. Rien n'est caché : tout est public, seule l'autorisation est prouvée. Signer et chiffrer sont deux usages différents de la cryptographie.

> [!piege] Sur une plateforme, tu n'as ni clé ni signature
> C'est l'entreprise qui détient les clés et qui signe. Tu ne fais que lui demander d'agir. Voir [qui détient vraiment tes fonds](/okx/custodial-non-custodial).

> [!piege] Une clé privée volée ne se change pas
> Il n'y a pas de « réinitialisation ». La seule réponse est de transférer immédiatement les fonds vers une nouvelle adresse, générée à partir d'un nouveau secret.

## Pour aller plus loin

- [Les adresses](/fondamentaux/adresses) — comment on passe de la clé publique à l'adresse
- [La phrase de récupération](/securite/seed-phrase) — comment ce secret se sauvegarde
- [Anatomie d'une transaction](/fondamentaux/transaction) — ce que la signature protège
