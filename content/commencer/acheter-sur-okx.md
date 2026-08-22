---
titre: "Ce qui se passe quand tu achètes sur OKX"
section: "commencer"
ordre: 30
resume: "Rien sur la blockchain. OKX change deux chiffres dans sa propre base de données, et c'est tout."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-une-blockchain"]
termes: ["creance"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — Proof of Reserves"
    url: "https://www.okx.com/proof-of-reserves"
statut: "redige"
---

**Quand tu achètes du bitcoin sur OKX, rien n'est écrit sur la blockchain. OKX change deux chiffres dans sa propre base de données.**

## Pourquoi

Un bloc sort toutes les dix minutes et chaque ligne écrite coûte des frais. Une plateforme qui encaisse des milliers d'ordres par seconde ne peut pas écrire chacun d'eux dans le cahier mondial. Ce serait trop lent et trop cher.

Alors elle fait comme une banque : elle tient ses propres comptes, en interne.

## Les trois moments

| Ce que tu fais | Ce qui se passe vraiment |
|---|---|
| Tu déposes des fonds | Une vraie ligne dans le cahier mondial. Tu envoies à une adresse qui appartient à OKX. |
| Tu achètes, tu vends | **Rien.** OKX baisse un chiffre, monte un autre. Dans sa base à elle. |
| Tu retires | Une vraie ligne. C'est OKX qui signe, avec ses clés à elle. |

Entre le dépôt et le retrait, tu peux passer 500 ordres : **zéro trace sur la blockchain.**

## Ce que tu détiens vraiment

C'est le point important de toute la page.

Ton solde affiché n'est pas une quantité de bitcoins. C'est une **créance** : une ligne dans la base d'OKX qui dit qu'ils te doivent ce montant.

Tant que tout va bien, la différence ne se voit pas. Elle devient la seule chose qui compte le jour où la plateforme gèle les retraits, se fait pirater, ou fait faillite.

C'est ce que veut dire la phrase qu'on lit partout : *not your keys, not your coins*. Ce n'est pas un slogan militant, c'est la description exacte de ce qui se passe.

## Le test

Après un achat, cherche un identifiant de transaction. Il n'y en a pas.

Après un retrait, il y en a un, et il est cliquable vers un explorateur de blocs.

Ce n'est pas un oubli d'interface : dans le premier cas, l'objet n'existe pas.

## La suite

- [On-chain vs off-chain](/okx/on-chain-off-chain) — la version détaillée, avec le schéma
- [Étude de cas : la faillite de FTX](/okx/etude-ftx) — ce que ça donne quand la créance ne vaut plus rien
