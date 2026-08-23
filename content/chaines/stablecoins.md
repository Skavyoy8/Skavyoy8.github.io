---
titre: "Les stablecoins"
section: "chaines"
ordre: 30
resume: "Des cryptos dont le prix ne bouge pas, parce qu'elles représentent un dollar déposé quelque part. C'est ce que la plupart des gens détiennent sans le savoir."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-la-crypto"]
termes: ["erc-20", "trc-20", "creance", "gel-de-fonds", "on-chain"]
sources:
  - titre: "Tether — page de transparence sur les réserves"
    url: "https://tether.to/en/transparency/"
  - titre: "Circle — transparence sur les réserves de l'USDC"
    url: "https://www.circle.com/transparency"
  - titre: "Règlement européen MiCA (UE 2023/1114)"
    url: "https://eur-lex.europa.eu/eli/reg/2023/1114/oj"
statut: "redige"
---

**Un stablecoin est une crypto qui vaut toujours à peu près un dollar, parce qu'une entreprise détient un dollar réel pour chaque jeton émis.**

## Pourquoi ça existe

Un problème pratique se pose dès qu'on utilise une plateforme : quand on veut sortir du bitcoin sans revenir à l'euro, où met-on l'argent ?

Repasser en euros implique un virement bancaire, des délais, parfois des frais. Les stablecoins règlent ça : ce sont des jetons qui vivent sur les blockchains, s'échangent instantanément, et dont le prix ne bouge pas.

Résultat : ils sont devenus la monnaie de fait du secteur. La plupart des prix sont affichés en USDT, pas en dollars.

## Comment ça marche

Le mécanisme le plus courant est aussi le plus simple : **une entreprise reçoit un dollar, elle émet un jeton. Quelqu'un rend le jeton, elle rend le dollar et le détruit.**

Les dollars sont conservés sur des comptes bancaires et en placements à court terme. C'est ce stock qui garantit que chaque jeton peut être échangé contre un vrai dollar.

Les deux principaux :

| | USDT (Tether) | USDC (Circle) |
|---|---|---|
| Émetteur | Tether Limited | Circle |
| Le plus utilisé pour | échanger sur les plateformes | les usages réglementés |
| Transparence | rapports périodiques | rapports périodiques |

Il existe d'autres approches — des stablecoins garantis par de la crypto plutôt que par des dollars — mais elles sont minoritaires.

## Le point important

**Un stablecoin est une créance sur une entreprise.**

Sa valeur ne repose pas sur des mathématiques ni sur un réseau décentralisé. Elle repose sur le fait qu'une société privée détient réellement les réserves annoncées, et qu'elle acceptera de les rendre.

C'est un modèle qui fonctionne — ces jetons tiennent leur valeur depuis des années. Mais la nature du risque doit être claire : ce n'est pas un risque technique, c'est un risque d'entreprise, exactement comme un compte en banque.

> [!exemple] Un ticket de vestiaire
> Le jeton est un ticket qui dit « un dollar est déposé quelque part ». Il vaut un dollar tant que le vestiaire existe, tient ses comptes, et accepte de rendre le manteau.
>
> Le ticket n'est pas le manteau. C'est la différence entre détenir du bitcoin — que personne ne peut te retirer — et détenir un stablecoin.

## Ce qu'il faut savoir

> [!piege] Le même stablecoin existe sur plusieurs réseaux
> L'USDT est émis sur Ethereum, Tron, Solana et une dizaine d'autres. Ce sont des jetons distincts, incompatibles entre eux. Se tromper de réseau lors d'un envoi fait perdre les fonds — voir [le choix du réseau](/okx/choix-du-reseau).

> [!piege] L'émetteur peut geler n'importe quelle adresse
> Les stablecoins centralisés contiennent une fonction permettant à l'émetteur de rendre les jetons d'une adresse intransférables. Elle est utilisée, notamment sur demande judiciaire. Détenir ses propres clés ne protège pas de ça.

> [!piege] « Stable » ne veut pas dire « garanti »
> Ces jetons se sont déjà écartés temporairement du dollar en période de tension. Et des stablecoins fondés sur d'autres mécanismes se sont effondrés complètement, entraînant des pertes considérables.

> [!verifier] La réglementation européenne évolue
> Le règlement MiCA encadre l'émission de ces jetons dans l'Union européenne, avec des obligations de réserves et de transparence. Les modalités et le calendrier sont à vérifier sur le texte, référencé en source.

## Pour aller plus loin

- [Le choix du réseau](/okx/choix-du-reseau) — l'erreur classique avec l'USDT
- [Qui détient vraiment tes fonds](/okx/custodial-non-custodial)
