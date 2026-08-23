---
titre: "Les faux sites"
section: "securite"
ordre: 30
resume: "Une copie parfaite du vrai site, à une lettre près dans l'adresse. C'est le vecteur le plus rentable du secteur."
niveau: "bases"
prerequis: ["/securite/arnaques"]
termes: []
sources:
  - titre: "Cybermalveillance.gouv.fr — l'hameçonnage"
    url: "https://www.cybermalveillance.gouv.fr/"
  - titre: "AMF — listes noires et mises en garde"
    url: "https://www.amf-france.org/fr/espace-epargnants/proteger-son-epargne/listes-noires-et-mises-en-garde"
statut: "redige"
---

**Un faux site reproduit le vrai à l'identique. La seule différence est dans l'adresse, et elle est faite pour ne pas se voir.**

## Pourquoi ça vise la crypto en priorité

Copier un site ne coûte rien : il suffit d'aspirer les pages du vrai.

Ce qui varie, c'est ce qu'on peut en tirer. Sur un faux site bancaire, il faut ensuite réussir un virement, qui peut être détecté et parfois annulé. Sur un faux site crypto, une fois les identifiants ou la phrase de récupération obtenus, les fonds partent en une transaction définitive.

Même effort, meilleur rendement, aucun risque de retour en arrière.

## Comment ils passent inaperçus

**L'adresse presque juste.** Une lettre ajoutée, un tiret, une extension différente, un caractère d'un autre alphabet qui ressemble à un « o » ou à un « a ». À la lecture rapide, c'est identique.

**La publicité en tête des résultats.** Chercher le nom d'une plateforme sur un moteur de recherche fait parfois remonter un lien sponsorisé qui pointe vers la copie. Le vrai site est juste en dessous, dans les résultats normaux.

**Le lien dans un message.** Un e-mail annonce une vérification à faire, un blocage, une opération suspecte. Le lien mène à la copie. C'est le message qui crée l'urgence, et l'urgence qui empêche de vérifier.

**Le faux formulaire de récupération.** Certains sites ne demandent ni mot de passe ni identifiant, mais proposent de « restaurer » ou « synchroniser » un portefeuille en saisissant sa phrase de récupération. Il n'existe aucune situation légitime où l'on saisit cette phrase sur un site web.

## Les deux réflexes qui suffisent

**Ne jamais arriver par un lien.** Un favori enregistré une fois pour toutes, ou l'adresse tapée à la main. Aucun message, aucun résultat de recherche, aucune publicité. C'est la mesure la plus efficace, et la seule qui marche aussi quand la copie est parfaite.

**Vérifier le cadenas puis le nom.** Le cadenas seul ne prouve rien — un faux site en a un aussi, ça ne coûte rien. Ce qui compte est le nom de domaine complet, lu **de droite à gauche** : ce qui précède immédiatement le `.com` est le vrai propriétaire.

> [!exemple] Lire une adresse dans le bon sens
> `okx.com.securite-connexion.net` n'appartient pas à OKX. Le domaine réel est `securite-connexion.net` — tout ce qui est à gauche n'est qu'un décor choisi par le propriétaire du site.
>
> On lit toujours le segment **juste avant l'extension finale**. C'est là, et nulle part ailleurs, que se trouve l'identité réelle.

## Ce qu'il faut savoir

> [!piege] Le cadenas ne veut pas dire « site de confiance »
> Il signifie uniquement que la connexion est chiffrée. Un site frauduleux obtient ce certificat gratuitement, en quelques minutes. Le cadenas dit que personne n'écoute la conversation, pas que l'interlocuteur est honnête.

> [!piege] Le code anti-hameçonnage règle le cas des e-mails
> Si la plateforme propose ce réglage, tout message qui ne contient pas ton mot personnel est faux, sans avoir à examiner quoi que ce soit d'autre. Voir [sécuriser son compte](/securite/compte-exchange).

> [!piege] Connecter son portefeuille à un site est une opération sensible
> Sur certains faux sites, il n'y a rien à saisir : la simple connexion du portefeuille suffit, parce qu'on te fait ensuite signer une autorisation. C'est le sujet des [autorisations données aux applications](/securite/approbations).

> [!piege] Les applications aussi sont copiées
> On trouve de fausses applications sur les magasins officiels. Vérifier le nom exact de l'éditeur et le nombre de téléchargements, et passer par le lien donné sur le site officiel plutôt que par la recherche du magasin.

## Pour aller plus loin

- [Sécuriser son compte](/securite/compte-exchange) — le code anti-hameçonnage et la liste blanche
- [Les autorisations données aux applications](/securite/approbations)
- [La phrase de récupération](/securite/seed-phrase) — ce qu'on ne saisit jamais nulle part
