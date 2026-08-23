---
titre: "Les adresses"
section: "fondamentaux"
ordre: 50
resume: "Où l'on envoie les fonds. Elles contiennent une clé de contrôle qui fait rejeter les fautes de frappe au lieu d'envoyer l'argent dans le vide."
niveau: "bases"
prerequis: ["/fondamentaux/hachage"]
termes: ["adresse", "bech32", "base58check", "empreinte", "chain-id"]
sources:
  - titre: "BIP 173 — le format d'adresse bech32 de Bitcoin"
    url: "https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki"
  - titre: "EIP-55 — la clé de contrôle des adresses Ethereum"
    url: "https://eips.ethereum.org/EIPS/eip-55"
statut: "redige"
---

**Une adresse est la destination d'un paiement. C'est une suite de caractères dérivée d'un secret que toi seul détiens, et elle contient une clé de contrôle qui permet de repérer les fautes de frappe.**

## Pourquoi ça existe

Sur une blockchain, une transaction envoyée à une adresse mal recopiée est **définitivement perdue**. Il n'y a ni retour à l'expéditeur, ni service de réclamation, ni personne à appeler. Une seule touche de travers, et l'argent part vers une destination que personne ne contrôle.

Il fallait donc un garde-fou : que le logiciel refuse d'envoyer avant même d'essayer, si l'adresse est manifestement mal recopiée.

## Comment ça marche

Une adresse ne sort pas de nulle part. Elle se calcule à partir de ta clé publique — l'équivalent d'un numéro de compte — qu'on passe à travers plusieurs fonctions de hachage. Le résultat est raccourci, puis encodé dans un format lisible.

À cet encodage, on ajoute une **clé de contrôle** : quelques caractères calculés à partir de tous les autres. Si un caractère change, le calcul ne tombe plus juste, et le logiciel rejette l'adresse.

Les formats se sont succédé :

| Format | Où on le voit | Clé de contrôle |
|---|---|---|
| Adresses commençant par `1` ou `3` | Bitcoin, format historique | oui, 4 caractères à la fin |
| Adresses commençant par `bc1` | Bitcoin, format actuel | oui, 6 caractères |
| Adresses `0x…` en minuscules | Ethereum au départ | **aucune** |
| Adresses `0x…` avec des majuscules | Ethereum aujourd'hui | oui, cachée dans les majuscules |

La dernière ligne est astucieuse. Les adresses Ethereum n'avaient aucune protection : quarante caractères, et une faute de frappe donnait une autre adresse parfaitement valide. Plutôt que d'allonger le format, on a décidé que **la casse des lettres porterait l'information** : certaines lettres passent en majuscule selon un calcul. Les anciens logiciels voient une adresse normale, les nouveaux vérifient les majuscules.

> [!exemple] Tu connais déjà ce principe
> C'est celui de la clé d'un RIB, ou du dernier chiffre d'un numéro de sécurité sociale : quelques caractères calculés à partir des autres, qui servent uniquement à détecter une erreur de saisie.
>
> La différence, ici, c'est ce qu'une erreur non détectée coûterait.

## Un exemple concret

Prenons une adresse Bitcoin valide, et changeons un seul caractère :

```
bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4   →  acceptée
bc1qw508d6qejxtdg4y5y3zarvary0c5xw7kv8f3t4   →  REJETÉE
```

Le `r` en vingt et unième position est devenu un `y`. La clé de contrôle ne correspond plus, et aucun portefeuille n'acceptera d'envoyer quoi que ce soit.

Sur Ethereum, la même vérification passe par les majuscules. L'adresse du contrat USDT s'écrit officiellement :

```
0xdAC17F958D2ee523a2206206994597C13D831ec7
```

Ces majuscules ne sont pas décoratives. Elles ont été calculées, et un logiciel à jour refuse une adresse dont elles ne correspondent pas.

## Ce qu'il faut savoir

> [!piege] La clé de contrôle détecte, elle ne corrige pas
> Aucun logiciel ne « répare » une adresse. Il refuse, point.

> [!piege] Elle ne protège que des fautes de frappe
> Si tu colles une adresse **valide** mais qui appartient à quelqu'un d'autre — parce qu'un logiciel malveillant l'a remplacée dans ton presse-papiers, par exemple — tout passera sans le moindre avertissement. Vérifier les premiers et derniers caractères après avoir collé reste la seule protection.

> [!piege] Une adresse n'est pas un compte
> Elle ne se crée nulle part, elle ne s'ouvre pas, elle ne s'enregistre pas. Elle existe dès qu'on peut la calculer. Il en existe déjà bien plus que d'étoiles dans l'univers, et personne n'a besoin de les inscrire quelque part.

> [!piege] La même adresse peut exister sur plusieurs réseaux
> Une adresse `0x…` est valide sur Ethereum, sur BNB Chain, sur Polygon et sur beaucoup d'autres. Ce sont pourtant des réseaux différents, et envoyer sur le mauvais peut faire perdre les fonds. C'est le sujet du [choix du réseau](/okx/choix-du-reseau).

## Pour aller plus loin

- [Les fonctions de hachage](/fondamentaux/hachage) — ce qui sert à fabriquer l'adresse
- [Le choix du réseau](/okx/choix-du-reseau) — l'erreur la plus coûteuse pour un débutant
