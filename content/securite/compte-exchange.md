---
titre: "Sécuriser son compte"
section: "securite"
ordre: 20
resume: "Quatre réglages, dix minutes une seule fois. Ils transforment un piratage de compte en simple frayeur."
niveau: "bases"
prerequis: ["/okx/depots-retraits"]
termes: ["liste-blanche", "cle-api", "creance"]
sources:
  - titre: "OKX — activer la liste blanche de retrait"
    url: "https://www.okx.com/help/how-do-i-enable-allowlist-web"
  - titre: "Cybermalveillance.gouv.fr — dispositif national d'assistance"
    url: "https://www.cybermalveillance.gouv.fr/"
statut: "redige"
---

**Un compte de plateforme se protège en quelques réglages qui existent déjà dans les paramètres. Le point commun de tous : ils empêchent les fonds de sortir, même si quelqu'un entre.**

## Le raisonnement

Il faut distinguer deux choses très différentes : **entrer dans le compte**, et **en sortir des fonds**.

La plupart des gens se concentrent sur la première. C'est utile, mais insuffisant : un mot de passe fuit, un téléphone se perd, un ordinateur s'infecte.

L'idée qui change tout est de rendre la seconde impossible. Peu importe alors qu'on entre : il n'y a rien à emporter.

## Les quatre réglages

**1. La double authentification par application.** Un code à six chiffres qui change toutes les trente secondes, généré par une application sur ton téléphone.

À privilégier sur les codes par SMS : un numéro de téléphone peut être détourné par un tiers auprès de l'opérateur, ce qui est une attaque connue et documentée. L'application, elle, ne dépend d'aucun opérateur.

**2. La liste blanche de retrait.** C'est le réglage le plus important, et le moins utilisé.

Tu enregistres à l'avance les adresses vers lesquelles tu t'autorises à retirer. Ensuite, la plateforme refuse tout retrait vers une autre adresse. Ajouter une nouvelle adresse déclenche un délai d'attente de plusieurs heures, et une notification.

Résultat : quelqu'un qui prend le contrôle de ton compte ne peut envoyer les fonds nulle part ailleurs que chez toi. Et le délai te laisse le temps de réagir.

**3. Le code anti-hameçonnage.** Un mot que tu choisis, et que la plateforme insère dans tous ses e-mails.

Un message qui ne le contient pas ne vient pas d'elle. C'est une vérification instantanée, qui ne demande aucune analyse de l'adresse d'expéditeur ni du contenu.

**4. Un mot de passe unique, dans un gestionnaire.** Unique, c'est-à-dire utilisé nulle part ailleurs. Les fuites de données massives sont régulières ; un mot de passe réutilisé finit toujours par être essayé partout.

> [!exemple] L'ordre d'importance
> Si tu ne dois en faire qu'un seul, fais **la liste blanche de retrait**. C'est le seul qui protège encore quand tout le reste a échoué.
>
> Les trois autres empêchent d'entrer. Celui-là empêche de sortir — et c'est la sortie qui coûte de l'argent.

## Un exemple concret

Que se passe-t-il si quelqu'un obtient ton mot de passe :

| Protection en place | Ce qu'il peut faire |
|---|---|
| Rien | vider le compte en quelques minutes |
| Double authentification seule | rien, tant qu'il n'a pas aussi ton téléphone |
| Double authentification + liste blanche | même avec ton téléphone : il ne peut retirer que **vers tes propres adresses** |

La troisième ligne est la seule qui résiste à un téléphone volé ou à un ordinateur infecté.

## Ce qu'il faut savoir

> [!piege] Sauvegarde tes codes de secours
> Activer la double authentification génère des codes de récupération. Sans eux, un téléphone perdu peut te bloquer hors de ton propre compte pendant des semaines. Ils se notent sur papier, une fois.

> [!piege] Aucun support ne demande de code
> Ni le code à six chiffres, ni le mot de passe, ni une phrase de récupération. Une demande de ce type identifie l'interlocuteur à coup sûr : ce n'est pas le support.

> [!piege] Sécuriser le compte ne change pas qui détient les fonds
> Tous ces réglages protègent l'accès. Ils ne changent rien au fait que les fonds appartiennent, techniquement, à la plateforme — voir [qui détient vraiment tes fonds](/okx/custodial-non-custodial).

> [!info] Si le compte est déjà compromis
> Changer le mot de passe, révoquer les sessions actives et supprimer toute clé d'accès automatique, dans cet ordre. Puis contacter le support **depuis le site officiel**, jamais depuis un lien reçu.

## Pour aller plus loin

- [Les arnaques les plus courantes](/securite/arnaques)
- [Les faux sites](/securite/phishing)
- [Dépôts et retraits](/okx/depots-retraits) — où se trouve la liste blanche
