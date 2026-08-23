---
titre: "Ce qui se passe quand tu achètes sur une plateforme"
section: "commencer"
ordre: 30
resume: "Rien n'est écrit sur la blockchain. La plateforme modifie deux chiffres dans sa propre base, et ce que tu détiens n'est pas de la crypto mais une promesse."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-une-blockchain"]
termes: ["creance", "txid"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — Proof of Reserves"
    url: "https://www.okx.com/proof-of-reserves"
statut: "redige"
---

**Quand tu achètes du bitcoin sur une plateforme comme OKX, Binance ou Coinbase, rien n'est écrit sur la blockchain. La plateforme change deux chiffres dans sa propre base de données.**

## Pourquoi ça marche comme ça

Une blockchain est lente et coûteuse par nature : une dizaine de minutes par bloc sur Bitcoin, et des frais à chaque écriture.

Une plateforme d'échange traite des milliers d'ordres par seconde, dont la plupart sont annulés avant même d'être exécutés. Écrire tout ça sur la blockchain serait impossible techniquement, et absurde financièrement.

Alors elle fait comme une banque : elle tient ses propres comptes, en interne, et ne touche à la blockchain que quand des fonds entrent ou sortent réellement.

## Comment ça marche

Trois moments, et deux seulement concernent la blockchain :

| Ce que tu fais | Ce qui se passe vraiment |
|---|---|
| **Tu déposes** | Une vraie transaction sur la blockchain. Tu envoies des fonds vers une adresse qui appartient à la plateforme. |
| **Tu achètes ou tu vends** | **Rien du tout.** La plateforme diminue un chiffre et en augmente un autre, dans sa base à elle. |
| **Tu retires** | Une vraie transaction. C'est la plateforme qui la signe, avec ses propres secrets. |

Entre ton dépôt et ton retrait, tu peux passer cinq cents ordres : **aucune trace n'apparaîtra jamais sur la blockchain.**

## Ce que tu détiens vraiment

C'est le point important de cette page, et il vaut pour toutes les plateformes.

Le chiffre affiché sur ton compte n'est pas une quantité de bitcoins. C'est une **promesse** : une ligne dans la base de données de l'entreprise, qui dit qu'elle te doit ce montant.

Tant que tout va bien, la différence ne se voit pas. Tu peux retirer, ça marche, la question ne se pose pas.

Elle devient la seule chose qui compte le jour où l'entreprise suspend les retraits, se fait pirater, ou fait faillite. À ce moment-là, tu n'es pas propriétaire de crypto : tu es un créancier parmi des millions d'autres, et tu attends ton tour.

C'est ce que résume la phrase qu'on croise partout dans le milieu : *not your keys, not your coins* — « pas tes clés, pas tes pièces ». Ce n'est pas un slogan militant, c'est la description exacte de la situation.

> [!exemple] Le test qui ne trompe pas
> Après un achat, cherche un identifiant de transaction. Il n'y en a pas.
>
> Après un retrait, il y en a un, et tu peux le coller dans un site public pour voir l'opération.
>
> Ce n'est pas un oubli de l'application : dans le premier cas, il n'y a rien à identifier, parce que rien n'a eu lieu sur la blockchain.

## Est-ce que c'est grave ?

Non, pas en soi. C'est un arbitrage, et il a deux faces.

**Sur une plateforme**, tu délègues la garde. Tu perds ton téléphone, tu récupères ton compte. Tu te fais avoir par un faux site, un blocage peut te sauver. En échange, tu dépends entièrement du sérieux et de la solidité de l'entreprise.

**Dans ton propre portefeuille**, tu détiens réellement les fonds et personne ne peut te les bloquer. En échange, une erreur est définitive, et personne ne viendra t'aider.

Il n'y a pas de bonne réponse universelle. Il y a juste une chose à savoir : ce n'est pas la même chose, et beaucoup de gens l'apprennent au mauvais moment.

## Ce qu'il faut savoir

> [!piege] L'adresse de dépôt n'est pas ton portefeuille
> Elle appartient à la plateforme. Y envoyer des fonds, c'est les confier à quelqu'un d'autre.

> [!piege] « Instantané » ne veut pas dire « efficace grâce à la blockchain »
> Un achat est instantané précisément parce qu'il ne touche aucune blockchain. La rapidité d'une plateforme est celle de sa base de données, rien de plus.

## Pour aller plus loin

- [On-chain vs off-chain](/okx/on-chain-off-chain) — la version détaillée, avec le schéma
- [Qui détient tes fonds](/okx/custodial-non-custodial) — les deux modèles comparés en détail
