---
titre: "Les standards de jetons"
section: "chaines"
ordre: 50
resume: "Pourquoi des milliers de jetons différents fonctionnent tous de la même façon dans le même portefeuille."
niveau: "bases"
prerequis: ["/chaines/smart-contracts"]
termes: ["erc-20", "trc-20", "evm"]
sources:
  - titre: "EIP-20 — le standard des jetons interchangeables"
    url: "https://eips.ethereum.org/EIPS/eip-20"
  - titre: "EIP-721 — le standard des jetons uniques (NFT)"
    url: "https://eips.ethereum.org/EIPS/eip-721"
statut: "redige"
---

**Un standard de jeton est une liste de fonctions que tout jeton doit proposer. C'est ce qui permet à un portefeuille de gérer des milliers de jetons différents sans les connaître à l'avance.**

## Pourquoi ça existe

Chaque jeton est un programme distinct, écrit par une équipe différente. Sans règle commune, chaque portefeuille devrait être adapté pour chacun — impossible à l'échelle de milliers de jetons.

La solution a été de se mettre d'accord sur un minimum : **si ton programme propose ces fonctions-là, avec ces noms-là, tout le monde saura l'utiliser.**

Ce sont des conventions publiques, proposées et discutées ouvertement. Personne ne les impose ; elles s'imposent parce que tout le monde les suit.

## Les deux principaux

**ERC-20 — les jetons interchangeables.** Tous les jetons classiques : USDT, USDC, et des milliers d'autres. Un jeton en vaut un autre, exactement comme un billet de 10 € en vaut un autre.

Le standard impose quelques fonctions : connaître le solde d'une adresse, transférer, et autoriser un programme à prélever. Cette dernière est celle des [autorisations](/securite/approbations).

**ERC-721 — les jetons uniques.** Ce sont les NFT. Chaque unité a un numéro et se distingue des autres, comme des places de concert numérotées.

Les mêmes idées ont été reprises sur d'autres réseaux sous d'autres noms : TRC-20 sur Tron, BEP-20 sur BNB Chain. Le fonctionnement est le même, seul le réseau change.

> [!exemple] Le format d'une prise électrique
> Personne ne décide qui a le droit de fabriquer un appareil. On s'entend simplement sur la forme de la prise.
>
> Résultat : n'importe quel appareil fonctionne sur n'importe quelle prise. Les standards de jetons jouent exactement ce rôle, et comme pour les prises, chaque région a fini par avoir le sien.

## Ce que ça implique en pratique

**Un jeton n'est pas dans ton portefeuille.** Il n'y a rien à stocker : le contrat du jeton tient une liste des adresses et de leurs soldes. Ton portefeuille ne fait que la consulter.

C'est pour ça qu'un jeton reçu n'apparaît pas toujours : l'application ne connaît pas encore ce contrat. Ajouter son adresse manuellement le fait apparaître — les fonds étaient là depuis le début.

**Créer un jeton ne demande rien.** Copier un contrat standard et le déposer coûte quelques euros et prend dix minutes. Le nom n'est pas protégé, le symbole non plus.

## Ce qu'il faut savoir

> [!piege] N'importe qui peut créer un jeton appelé « Bitcoin »
> Rien n'empêche de déployer un ERC-20 nommé BTC. Seule l'adresse du contrat identifie un jeton de façon fiable, jamais son nom ni son symbole.

> [!piege] Respecter le standard ne dit rien de l'honnêteté
> Un contrat peut suivre le standard **et** contenir une fonction permettant à son créateur de bloquer les reventes. C'est ce qu'on appelle un honeypot : on peut acheter, jamais vendre.

> [!piege] Le nombre de décimales varie
> La plupart des jetons en ont 18, l'USDT en a 6. Un montant lu brut sur un explorateur paraît aberrant si l'on suppose le mauvais nombre — voir [les unités](/fondamentaux/unites).

## Pour aller plus loin

- [Les smart contracts](/chaines/smart-contracts) — ce qu'est un jeton, techniquement
- [Le choix du réseau](/okx/choix-du-reseau) — pourquoi le même jeton existe en plusieurs exemplaires
