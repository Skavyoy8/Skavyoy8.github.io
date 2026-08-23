---
titre: "Anatomie d'une transaction"
section: "fondamentaux"
ordre: 110
resume: "Ce qu'il y a vraiment dans un envoi, de sa création à son inscription définitive."
niveau: "bases"
prerequis: ["/fondamentaux/cles"]
termes: ["txid", "confirmation", "frais-de-reseau", "empreinte", "utxo"]
sources:
  - titre: "Documentation technique de Bitcoin — les transactions"
    url: "https://developer.bitcoin.org/reference/transactions.html"
  - titre: "Satoshi Nakamoto — le document qui a lancé Bitcoin (2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
statut: "redige"
---

**Une transaction est un message qui dit d'où viennent des fonds, où ils vont, et qui porte la preuve que l'expéditeur avait le droit de les déplacer.**

## Ce qu'elle contient

Quatre éléments, et rien de plus :

| Élément | À quoi ça sert |
|---|---|
| **Les entrées** | d'où viennent les fonds : des sommes reçues précédemment, encore non dépensées |
| **Les sorties** | où ils vont : une ou plusieurs adresses, avec un montant chacune |
| **Les frais** | ce qui n'est pas attribué à une sortie revient au mineur |
| **La signature** | la preuve que l'expéditeur détenait bien le secret |

Il n'y a ni nom, ni motif, ni référence, ni date de valeur. Une transaction est purement comptable.

## Le point qui déroute : la monnaie rendue

Sur Bitcoin, on ne peut pas dépenser une partie d'une somme reçue. Il faut la consommer **entièrement**, et se renvoyer la différence à soi-même.

C'est exactement le fonctionnement des espèces : pour payer 7 € avec un billet de 20, on donne le billet entier et on récupère 13 €.

C'est pour ça qu'en consultant une transaction sur un site public, on voit souvent deux sorties : le destinataire, et une seconde adresse qui t'appartient. Cette seconde sortie n'est pas un mouvement suspect, c'est la monnaie.

> [!exemple] Pourquoi ton solde n'est pas un chiffre stocké
> Ton portefeuille ne lit pas un « solde » quelque part. Il fait la liste de toutes les sommes reçues et non encore dépensées, et il les additionne.
>
> C'est aussi pourquoi vider un portefeuille qui a reçu beaucoup de petits montants coûte plus cher : il faut consommer chaque petite somme séparément, ce qui alourdit la transaction.

## Le parcours complet

1. **Construction.** Le portefeuille choisit les sommes à consommer, calcule la monnaie et les frais.
2. **Signature.** Avec la clé privée, sur l'appareil. Rien ne sort encore.
3. **Diffusion.** La transaction part vers quelques ordinateurs, qui la vérifient et la transmettent. En quelques secondes, tout le réseau l'a.
4. **Attente.** Elle patiente jusqu'à ce qu'un mineur la retienne — les mieux payées d'abord.
5. **Inscription.** Elle entre dans un bloc. Première confirmation.
6. **Confirmations suivantes.** Chaque bloc ajouté par-dessus rend l'annulation plus improbable.

Entre les étapes 3 et 5, la transaction existe mais n'est acquise nulle part. C'est le fameux « en attente ».

## L'identifiant

Chaque transaction reçoit un identifiant, calculé à partir de son contenu : le **TxID**. C'est le code que tu peux coller dans un site public pour suivre l'opération.

Comme il dépend du contenu, il change dès qu'on touche à quoi que ce soit. Il n'existe donc pas deux transactions différentes avec le même identifiant.

## Ce qu'il faut savoir

> [!piege] Une transaction ne s'annule pas
> Une fois diffusée et inscrite, il n'y a pas de retour possible. Certains réseaux permettent de **remplacer** une transaction non encore inscrite par une version mieux payée, mais c'est la seule marge de manœuvre.

> [!piege] Les frais dépendent de la taille, pas du montant
> Envoyer 10 € ou 10 000 € coûte pareil. Ce qui fait monter le prix, c'est le nombre de sommes à consommer en entrée.

> [!piege] L'adresse d'expéditeur n'existe pas vraiment
> Une transaction ne contient pas de champ « expéditeur ». On le déduit des sommes consommées. C'est pour ça que « répondre » à une transaction n'a pas de sens.

## Pour aller plus loin

- [Les clés et les signatures](/fondamentaux/cles) — la preuve qui autorise l'envoi
- [L'attente et les confirmations](/fondamentaux/mempool) — ce qui se passe entre la diffusion et l'inscription
- [Les frais de réseau](/fondamentaux/frais-reseau)
