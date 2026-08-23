---
titre: "Les ponts entre réseaux"
section: "chaines"
ordre: 70
resume: "Faire passer une valeur d'une blockchain à une autre. C'est le maillon le plus fragile de tout l'écosystème."
niveau: "intermediaire"
prerequis: ["/okx/choix-du-reseau"]
termes: ["pont", "on-chain", "custody"]
sources:
  - titre: "Documentation officielle d'Ethereum — les ponts"
    url: "https://ethereum.org/en/developers/docs/bridges/"
  - titre: "Documentation officielle d'Ethereum — les rollups"
    url: "https://ethereum.org/en/developers/docs/scaling/"
statut: "redige"
---

**Aucune valeur ne passe réellement d'une blockchain à une autre. Un pont bloque des fonds d'un côté et en crée une représentation de l'autre.**

## Pourquoi ça existe

Deux blockchains ne se voient pas. Bitcoin ignore totalement l'existence d'Ethereum, et réciproquement. Il n'existe aucun canal entre elles.

Or les usages sont répartis : les jetons vivent sur un réseau, les applications sur un autre, les frais sont bas ici et élevés là. Il fallait bien un moyen de circuler.

## Comment ça marche

Le principe est toujours le même, quel que soit le pont :

1. Tu envoies tes fonds à une adresse contrôlée par le pont, sur le réseau de départ. **Ils y restent bloqués.**
2. Le pont constate le dépôt.
3. Il crée, sur le réseau d'arrivée, un jeton équivalent qu'il t'envoie.

Pour revenir, l'opération inverse : le jeton d'arrivée est détruit, et les fonds d'origine sont débloqués.

Rien n'a voyagé. Une valeur a été immobilisée d'un côté, et une représentation a été émise de l'autre.

> [!exemple] La consigne de bagages
> Tu déposes une valise à Paris et on te remet un ticket. À Lyon, le ticket permet de récupérer une valise identique.
>
> Ta valise n'a jamais fait le trajet. Et tout repose sur une question : la consigne a-t-elle vraiment gardé la valise ?

## Pourquoi c'est le point faible

Un pont concentre les fonds bloqués de tous ses utilisateurs à un seul endroit. Cela en fait la cible la plus rentable de tout l'écosystème.

Les plus gros vols de l'histoire de la crypto sont des attaques de ponts, très loin devant les plateformes d'échange. La raison est structurelle : un pont détient beaucoup, et son fonctionnement repose sur du code complexe ou sur un petit groupe d'opérateurs qui valident les passages.

Si ce mécanisme est compromis, l'attaquant peut créer des jetons du côté d'arrivée sans que rien n'ait été déposé du côté du départ. Les jetons émis ne valent alors plus rien, et ceux qui les détiennent ont tout perdu.

## Ce qu'il faut savoir

> [!piege] Un jeton « ponté » n'est pas le jeton d'origine
> Le bitcoin qu'on trouve sur Ethereum n'est pas du bitcoin : c'est un jeton adossé à du bitcoin détenu par quelqu'un. Sa valeur dépend entièrement du sérieux de ce quelqu'un.

> [!piege] Passer par une plateforme est souvent plus simple
> Déposer sur un réseau et retirer sur un autre revient au même résultat, en confiant les fonds à l'entreprise plutôt qu'à un contrat. Ce n'est pas sans risque non plus, mais c'est un risque mieux connu et généralement mieux capitalisé.

> [!piege] Les frais annoncés ne sont pas les seuls
> Il faut compter les frais de réseau des deux côtés, plus la commission du pont. Sur de petits montants, le total dépasse souvent le gain espéré.

> [!piege] Une opération de pont peut rester bloquée
> Certains ponts imposent un délai d'attente de plusieurs jours pour des raisons de sécurité. Ce n'est pas un incident, c'est le fonctionnement prévu.

## Pour aller plus loin

- [Le choix du réseau](/okx/choix-du-reseau) — pourquoi le problème se pose
- [Les smart contracts](/chaines/smart-contracts) — le code sur lequel reposent les ponts
