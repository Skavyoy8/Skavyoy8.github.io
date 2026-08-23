---
titre: "La phrase de récupération"
section: "securite"
ordre: 40
resume: "Douze ou vingt-quatre mots qui contiennent tout. Qui les a, a les fonds — et il n'existe aucune exception."
niveau: "bases"
prerequis: ["/okx/custodial-non-custodial"]
termes: ["portefeuille-froid", "portefeuille-chaud", "custody"]
sources:
  - titre: "BIP 39 — la norme qui définit ces listes de mots"
    url: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
  - titre: "Cybermalveillance.gouv.fr — dispositif national d'assistance"
    url: "https://www.cybermalveillance.gouv.fr/"
statut: "redige"
---

**Quand tu crées un portefeuille personnel, l'application affiche une liste de douze ou vingt-quatre mots. Cette liste n'est pas un mot de passe : c'est le portefeuille lui-même.**

## Pourquoi ça existe

Un portefeuille contient des secrets — de longs nombres impossibles à recopier à la main sans se tromper.

L'idée a donc été de tout faire dériver d'une seule source, et de représenter cette source par des mots courants tirés d'une liste normalisée. Les mots sont lisibles, prononçables, et se recopient sans ambiguïté.

Toutes les adresses de ton portefeuille, présentes et futures, se recalculent à partir de ces mots. C'est pour ça qu'on peut réinstaller l'application, changer de téléphone, ou passer à un autre logiciel : on saisit les mots, et tout revient.

## Ce que ça implique

Cette commodité a une contrepartie exacte : **la phrase donne un accès total, à quiconque la détient.**

Il n'y a ni identifiant associé, ni deuxième facteur, ni vérification d'identité. Les mots suffisent. Quelqu'un qui les lit, même une seule fois, même en photo, peut vider le portefeuille depuis n'importe où, à n'importe quel moment, y compris des mois plus tard.

Symétriquement : **perdue, elle ne se récupère pas.** Aucune entreprise ne la détient, aucun support ne peut la régénérer, aucune procédure n'existe. Les fonds restent visibles sur la blockchain, pour toujours, et personne ne peut y toucher.

> [!exemple] Ce n'est pas un mot de passe
> Un mot de passe oublié se réinitialise par e-mail. Une phrase de récupération perdue est définitive.
>
> La comparaison la plus juste est celle d'une clé de coffre unique, sans double et sans serrurier. C'est exactement pour ça qu'elle se traite autrement qu'un mot de passe.

## Les règles

**Sur papier, jamais en numérique.** Pas de photo, pas de capture d'écran, pas de note dans le téléphone, pas de fichier, pas d'e-mail à soi-même, pas de cloud. Tout ce qui est numérique se copie et se synchronise, souvent sans qu'on l'ait demandé.

**Deux copies, deux endroits.** Un seul exemplaire est un point de défaillance unique : un dégât des eaux ou un incendie suffit. Deux exemplaires dans deux lieux différents couvrent l'essentiel des scénarios.

**Jamais saisie sur un site.** Il n'existe aucune raison légitime de la taper ailleurs que dans l'application de portefeuille elle-même, au moment d'une restauration. Aucune vérification, aucune mise à jour, aucun cadeau, aucun support ne la demande.

**Vérifier la copie avant de déposer.** Recopier les mots, puis restaurer le portefeuille depuis cette copie sur un appareil vierge. Tant que ce test n'a pas été fait, on ne sait pas si la sauvegarde fonctionne.

## Un exemple concret

Ce qui se passe selon la situation :

| Situation | Avec la phrase notée | Sans |
|---|---|---|
| Téléphone perdu ou cassé | tout revient sur un autre appareil | fonds perdus définitivement |
| Application supprimée par erreur | tout revient | fonds perdus définitivement |
| Quelqu'un photographie la phrase | fonds volés, à n'importe quel moment | — |
| Entreprise du portefeuille qui ferme | tout revient, dans un autre logiciel | fonds perdus définitivement |

## Ce qu'il faut savoir

> [!piege] L'ordre des mots compte
> Ce n'est pas un ensemble mais une suite. Recopiés dans le désordre, ils ne donnent rien.

> [!piege] Elle ne concerne que les portefeuilles personnels
> Un compte sur une plateforme n'en a pas : c'est l'entreprise qui détient les secrets. Si un site présenté comme une plateforme d'échange te demande une phrase de récupération, c'est un faux.

> [!piege] Ajouter un mot à soi n'est pas une bonne idée sans le savoir
> Certains portefeuilles permettent d'ajouter un mot secret supplémentaire. C'est une vraie protection, mais elle crée un portefeuille **différent** : oublier ce mot revient à tout perdre, même avec les vingt-quatre autres.

## Pour aller plus loin

- [Qui détient vraiment tes fonds](/okx/custodial-non-custodial) — les deux modèles
- [Les faux sites](/securite/phishing) — ceux qui la réclament
