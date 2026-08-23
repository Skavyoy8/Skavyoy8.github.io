---
titre: "Dépôts et retraits"
section: "okx"
ordre: 30
resume: "Les deux seules opérations qui touchent réellement une blockchain. Ce sont aussi celles où l'on perd des fonds quand on se trompe."
niveau: "bases"
prerequis: ["/okx/on-chain-off-chain"]
termes: ["depot", "retrait", "adresse-de-depot", "confirmation", "memo", "destination-tag", "liste-blanche", "portefeuille-chaud"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — activer la liste blanche de retrait"
    url: "https://www.okx.com/help/how-do-i-enable-allowlist-web"
statut: "redige"
---

**Un dépôt et un retrait sont de vraies transactions inscrites sur une blockchain. Tout le reste de ce que tu fais sur une plateforme n'en est pas une.**

## Pourquoi c'est le moment délicat

Ce sont les deux seuls instants où des fonds franchissent la frontière entre le monde public de la blockchain et les registres privés de l'entreprise.

Et c'est là que se produisent la quasi-totalité des pertes définitives : mauvaise adresse, mauvais réseau, information manquante. Une fois la transaction partie, personne ne peut l'annuler.

## Comment ça marche

**Le dépôt.** La plateforme te donne une adresse. Tu y envoies des fonds depuis l'endroit où ils se trouvent. Elle surveille cette adresse, attend un certain nombre de confirmations, puis crédite ton compte.

Trois choses à ne pas rater :

- **Le réseau.** Une même monnaie existe souvent sur plusieurs blockchains. Il faut choisir exactement le même des deux côtés. C'est l'erreur la plus coûteuse, détaillée dans [le choix du réseau](/okx/choix-du-reseau).
- **Le mémo.** Certaines blockchains obligent à joindre un code en plus de l'adresse. Sans lui, la plateforme ne sait pas à quel client attribuer le dépôt.
- **L'attente.** Le crédit n'est pas immédiat. Il faut le nombre de confirmations exigé, qui varie selon la monnaie.

**Le retrait.** Tu indiques une adresse de destination et un montant. La plateforme prélève ses frais, construit la transaction, la signe avec ses propres clés et la diffuse.

Le délai n'est pas toujours celui de la blockchain : il y a souvent des vérifications internes, une file d'attente, et parfois une intervention humaine si la réserve accessible est vide.

> [!info] La protection la plus efficace, et la moins utilisée
> La **liste blanche de retrait** limite les retraits à des adresses que tu as enregistrées à l'avance, avec un délai avant qu'un ajout devienne actif.
>
> Concrètement, quelqu'un qui prend le contrôle de ton compte ne peut envoyer les fonds nulle part ailleurs que chez toi. C'est la mesure qui transforme un piratage en simple frayeur, et elle se règle une fois pour toutes.

## Un exemple concret

Un dépôt de bitcoin, étape par étape :

| Étape | Ce qui se passe | Durée |
|---|---|---|
| Tu copies l'adresse fournie | rien encore | — |
| Tu envoies depuis ton portefeuille | la transaction part sur le réseau | quelques secondes |
| Elle entre dans un bloc | 1re confirmation | ~10 minutes |
| Le nombre exigé est atteint | ton compte est crédité | 10 à 60 minutes selon la plateforme |

Pendant tout ce temps, l'identifiant de transaction est visible sur un site public. Tu peux suivre l'avancement toi-même, sans dépendre du support.

## Ce qu'il faut savoir

> [!piege] Vérifie l'adresse après l'avoir collée
> Certains logiciels malveillants remplacent l'adresse dans le presse-papiers au moment du collage. L'adresse est valide, elle est simplement celle de quelqu'un d'autre. Comparer les premiers et les derniers caractères prend trois secondes.

> [!piege] Un premier envoi de test coûte moins cher qu'une erreur
> Sur un montant important et une adresse jamais utilisée, envoyer d'abord une petite somme coûte quelques centimes de frais. Une adresse erronée coûte tout.

> [!piege] Les frais de retrait ne sont pas les frais du réseau
> La plateforme fixe ses propres frais de retrait. Ils couvrent le coût réseau, avec une marge, et ne descendent pas quand le réseau est calme.

> [!piege] Un retrait bloqué n'est pas forcément un problème technique
> Vérification d'identité incomplète, sécurité récemment modifiée, réserve accessible vide : les causes sont souvent administratives. Le délai annoncé par le support est en général le bon.

## Pour aller plus loin

- [Le choix du réseau](/okx/choix-du-reseau) — l'erreur la plus coûteuse
- [L'attente et les confirmations](/fondamentaux/mempool) — pourquoi il faut patienter
- [On-chain et off-chain](/okx/on-chain-off-chain) — pourquoi seules ces deux opérations comptent
