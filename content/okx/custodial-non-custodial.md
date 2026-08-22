---
titre: "Custodial vs non-custodial"
section: "okx"
ordre: 50
resume: "Qui détient la clé privée détient les fonds. Tout le reste — interface, solde affiché, conditions générales — en découle."
niveau: "bases"
prerequis: ["/okx/on-chain-off-chain"]
termes: ["custody", "creance", "gel-de-fonds", "portefeuille-chaud", "portefeuille-froid", "on-chain"]
sources:
  - titre: "OKX — API v5, documentation officielle (Funding, Withdrawal)"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "Règlement (UE) 2023/1114 (MiCA) — garde d'actifs pour compte de tiers"
    url: "https://eur-lex.europa.eu/eli/reg/2023/1114/oj"
  - titre: "Satoshi Nakamoto — Bitcoin: A Peer-to-Peer Electronic Cash System"
    url: "https://bitcoin.org/bitcoin.pdf"
statut: "redige"
---

**Custodial : quelqu'un d'autre détient la clé privée et signe à ta place. Non-custodial : la clé est chez toi, et personne ne peut signer sans elle.**

## Le problème que ça résout

Sur une blockchain, il n'existe qu'une seule façon de déplacer des fonds : produire une signature valide avec la clé privée qui contrôle l'adresse. Il n'y a pas de service client, pas de recours, pas de procédure exceptionnelle.

Cette règle est absolue, et elle a une conséquence désagréable : perdre la clé, c'est perdre les fonds définitivement. D'où l'existence d'un métier — garder les clés à la place des gens — et d'une question qu'il faut se poser pour chaque produit : **qui signe ?**

## Comment ça marche

| | Custodial (compte OKX) | Non-custodial (OKX Wallet, Ledger) |
|---|---|---|
| Qui détient la clé | La plateforme | Toi, sur ton appareil |
| Qui signe la transaction | La plateforme | Toi |
| Ce que tu possèdes | Une créance sur l'entreprise | Les fonds eux-mêmes |
| Récupération d'accès | Support, KYC, procédure | Aucune, hors ta seed phrase |
| Gel possible | Oui | Non, sauf sur le token lui-même |
| Faillite de l'entreprise | Tu deviens créancier | Sans effet |
| Erreur de ta part | Souvent rattrapable | Définitive |

Ce tableau n'oppose pas un bon et un mauvais modèle. Il décrit un transfert de responsabilité : dans un cas tu délègues le risque technique et tu prends un risque de contrepartie, dans l'autre l'inverse.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> Custodial, c'est un compte sur une machine que tu n'administres pas. Tu as un identifiant, des droits, et l'administrateur peut à tout moment suspendre ton compte, changer tes quotas ou lire tes données. Ton accès dépend de sa bonne volonté et de sa disponibilité.
>
> Non-custodial, c'est ta clé privée SSH sur ta machine. Personne ne peut s'authentifier à ta place, personne ne peut te la révoquer — et si tu effaces `~/.ssh/id_ed25519` sans sauvegarde, personne ne te la régénérera.
>
> C'est le même arbitrage que partout en sécurité : le principe du moindre privilège protège des tiers, mais il te rend seul responsable de ton propre secret.

## Exemple chiffré

Un même montant, 0,5 BTC, dans les deux modèles. Que se passe-t-il selon l'événement :

| Événement | Sur ton compte OKX | Dans ton portefeuille |
|---|---|---|
| Tu perds ton téléphone | Reconnexion après vérification d'identité | Perdu, sauf si la seed est sauvegardée |
| Tu te fais hameçonner | Retrait bloqué si la liste blanche est active | Fonds partis, définitivement |
| La plateforme dépose son bilan | Tu es créancier dans la procédure | Aucun effet |
| Une décision de justice vise ton compte | Le solde peut être gelé | Rien à geler côté plateforme |
| Tu envoies au mauvais réseau | Parfois récupérable par le support | Perdu |

Deux lignes sur cinq penchent d'un côté, trois de l'autre. C'est exactement pour ça que les deux modèles coexistent, et pourquoi la question n'a pas de réponse unique.

## Sur OKX

Les deux produits vivent dans la même application, ce qui entretient la confusion en permanence :

- **Le compte OKX** est custodial. Tu ne détiens aucune clé. Tes soldes sont des lignes dans leur base, tes retraits sont signés par eux.
- **OKX Wallet** est non-custodial. La seed est générée sur ton appareil et n'en sort pas ; OKX ne peut pas signer à ta place, ni geler quoi que ce soit, ni t'aider si tu la perds.

Passer de l'un à l'autre est un vrai retrait on-chain, avec ses frais et son délai de confirmation — même si l'interface donne l'impression d'un simple virement interne.

## Les pièges

> [!piege] « Not your keys, not your coins » n'est pas une opinion
> C'est la description exacte du montage. Sur un exchange, tu détiens une créance : un droit d'exiger un paiement. La différence est nulle tant que tout va bien, et devient totale le jour où la contrepartie ne peut plus payer.

> [!piege] Non-custodial ne veut pas dire non gelable
> La clé conditionne la signature, pas les règles du token. L'émetteur d'un stablecoin centralisé peut inscrire une adresse sur sa liste noire et rendre ses jetons intransférables, quel que soit le portefeuille. Le contrôle des clés te protège de la plateforme, pas de l'émetteur.

> [!piege] Un portefeuille ne « contient » pas de fonds
> Il contient des clés. Les fonds sont des entrées dans le registre de la chaîne. Changer d'application de portefeuille en réimportant la même seed ne déplace rien du tout.

> [!verifier] Le cadre juridique de la garde évolue
> MiCA encadre la garde d'actifs numériques pour compte de tiers dans l'Union européenne. Les obligations exactes et leur calendrier d'application sont à vérifier sur le texte, référencé en source.

## Pour aller plus loin

- [On-chain vs off-chain](/okx/on-chain-off-chain) — d'où vient la créance
- [Proof of Reserves](/okx/proof-of-reserves) — la tentative de rendre la garde vérifiable
- [App OKX vs OKX Wallet](/okx/app-vs-wallet) — les deux produits en détail
