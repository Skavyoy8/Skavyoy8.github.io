---
titre: "Le choix du réseau"
section: "okx"
ordre: 40
resume: "La même monnaie existe sur plusieurs blockchains. Se tromper de réseau au moment d'un envoi fait perdre les fonds définitivement."
niveau: "bases"
prerequis: ["/okx/depots-retraits"]
termes: ["erc-20", "trc-20", "chain-id", "adresse", "frais-de-reseau", "pont"]
sources:
  - titre: "Tether — la liste officielle des réseaux où l'USDT existe"
    url: "https://tether.to/en/supported-protocols"
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
statut: "redige"
---

**Une même monnaie, comme l'USDT, existe en plusieurs exemplaires indépendants sur des blockchains différentes. Envoyer sur le mauvais réseau fait perdre les fonds.**

## Pourquoi ça existe

L'USDT n'est pas une blockchain. C'est un jeton, créé par une entreprise, qui peut être émis sur n'importe quelle blockchain existante.

Cette entreprise en a donc émis sur Ethereum, sur Tron, sur Solana, et sur une dizaine d'autres réseaux. Chacune de ces versions vaut un dollar et porte le même nom, **mais ce sont des objets totalement séparés.** Ils ne se voient pas, ne communiquent pas, et ne peuvent pas se remplacer.

C'est pour ça que toute application te demande de choisir un réseau au moment d'un envoi. Ce n'est pas une préférence : c'est une destination.

## Comment ça marche

Quand tu envoies, deux choses doivent correspondre exactement :

1. **le réseau que tu choisis au départ**, chez toi ;
2. **le réseau attendu à l'arrivée**, chez le destinataire.

Si les deux diffèrent, deux cas se présentent.

**Les adresses ne se ressemblent pas.** Envoyer de l'USDT « version Tron » vers une adresse Ethereum : l'application refuse, parce que le format de l'adresse ne correspond pas au réseau. Tu es protégé.

**Les adresses se ressemblent.** C'est le cas dangereux. Ethereum, BNB Chain, Polygon et beaucoup d'autres utilisent **exactement le même format d'adresse**. Ton envoi part sans le moindre avertissement, arrive sur la bonne adresse, mais sur la mauvaise blockchain. Les fonds sont là, visibles, et le destinataire ne peut pas les toucher s'il ne contrôle pas cette adresse sur ce réseau-là.

> [!piege] Une plateforme ne peut pas toujours récupérer
> Parfois, si elle contrôle la même adresse sur les deux réseaux, un support peut récupérer les fonds — avec des semaines de délai et parfois des frais. Souvent, ce n'est pas possible du tout. Il ne faut jamais compter dessus au moment d'envoyer.

## Un exemple concret

Les frais varient énormément d'un réseau à l'autre, et **pas dans le sens qu'on croit**.

Mesure faite sur Ethereum au moment d'écrire cette page :

```
frais de base du réseau : 0,0666 gwei
envoi d'USDT (version Ethereum) : environ 0,01 $
```

Or « ERC-20, c'est cher, TRC-20, c'est bon marché » est la règle que tout le monde répète. Elle était vraie il y a quelques années. Elle ne l'est plus systématiquement : quand Ethereum est calme, un envoi y coûte moins d'un centime, parfois moins que sur les réseaux réputés économiques.

La conclusion pratique n'est pas « choisis tel réseau », c'est **« regarde le tarif du moment avant d'envoyer »**. L'application affiche les frais avant validation.

## Ce qu'il faut savoir

> [!piege] Un jeton ne « voyage » pas entre les réseaux
> Il n'existe aucun moyen de déplacer directement un jeton d'une blockchain à une autre. Ce qui existe, ce sont des **ponts** : on bloque le jeton d'un côté et on en crée un équivalent de l'autre. C'est une opération distincte, avec ses propres risques.

> [!piege] Le nom affiché ne suffit pas
> « USDT » tout court ne veut rien dire. Il faut lire « USDT-ERC20 », « USDT-TRC20 », ou l'équivalent. Deux lignes portant le même nom dans deux applications peuvent désigner des jetons incompatibles.

> [!piege] Le réseau le moins cher n'est pas toujours accepté
> Le destinataire — plateforme, service, commerçant — n'accepte parfois qu'un seul réseau pour une monnaie donnée. C'est sa liste qui décide, pas ton choix.

## Pour aller plus loin

- [Dépôts et retraits](/okx/depots-retraits) — le déroulé complet d'un envoi
- [Les adresses](/fondamentaux/adresses) — pourquoi une même adresse peut exister sur plusieurs réseaux
- [Les frais de réseau](/fondamentaux/frais-reseau) — d'où vient l'écart de prix
