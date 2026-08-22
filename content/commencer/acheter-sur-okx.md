---
titre: "Ce qui se passe quand tu achètes sur OKX"
section: "commencer"
ordre: 30
resume: "Une écriture dans la base de données d'OKX, pas une transaction sur une chaîne. Ton solde est une créance, pas une détention."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-une-blockchain"]
termes: ["creance", "txid"]
sources:
  - titre: "OKX — API v5, documentation officielle"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — Proof of Reserves"
    url: "https://www.okx.com/proof-of-reserves"
statut: "redige"
---

**Un achat sur OKX est une transaction de base de données. Rien n'est écrit sur aucune chaîne.**

## Le problème que ça résout

Bitcoin encaisse quelques transactions par seconde, avec des frais à chaque écriture et plusieurs minutes avant qu'une écriture soit considérée comme acquise.

Un carnet d'ordres encaisse des milliers d'opérations par seconde, dont l'écrasante majorité sont des ordres annulés avant même d'être exécutés. Régler chaque exécution sur la chaîne est physiquement impossible — et sans intérêt, puisque les deux contreparties sont déjà clientes du même établissement.

D'où le montage classique : on ne déplace les actifs que quand ils entrent ou sortent du périmètre. À l'intérieur, on tient des comptes.

## Les trois moments

| Ce que tu fais | Ce qui se passe |
|---|---|
| Dépôt | Vraie transaction on-chain. **Tu** signes, vers une adresse qui appartient à OKX. |
| Achat, vente, annulation | **Rien on-chain.** Une écriture dans la base d'OKX. Pas de signature, pas de frais réseau, pas de TxID. |
| Retrait | Vraie transaction on-chain. **OKX** signe, avec ses clés à elle. |

Entre le dépôt et le retrait, tu peux passer 500 ordres : zéro octet écrit sur une chaîne.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> Off-chain, c'est un commit local : rapide, gratuit, réversible, invisible pour les autres. C'est le moteur d'appariement d'OKX.
>
> On-chain, c'est un `push` vers un dépôt répliqué chez des milliers d'inconnus qui vérifient chaque signature. Lent, coûteux, définitif, public. C'est le dépôt et le retrait, rien d'autre.

## Ce que tu détiens réellement

C'est le point de la page.

Ton solde affiché n'est pas une quantité de bitcoins. C'est une **créance** : une ligne dans la base d'OKX qui dit qu'ils te doivent ce montant.

La différence est invisible tant que tout va bien, et devient la seule chose qui compte le jour où la plateforme gèle les retraits, se fait pirater ou dépose son bilan. « Not your keys, not your coins » n'est pas un slogan : c'est la description exacte du montage.

## Le test

Après un achat, cherche un identifiant de transaction. Il n'y en a pas. Après un retrait, il y en a un, cliquable vers un explorateur de blocs.

Ce n'est pas un manque de l'interface : dans le premier cas, l'objet n'existe pas.

## La suite

- [On-chain vs off-chain](/okx/on-chain-off-chain) — la version complète, avec le schéma de la frontière
- [Custodial vs non-custodial](/okx/custodial-non-custodial) — ce que « garde » veut dire, techniquement et juridiquement
