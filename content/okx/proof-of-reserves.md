---
titre: "Le Proof of Reserves"
section: "okx"
ordre: 70
resume: "Une méthode pour vérifier soi-même que ton solde est bien compté dans les réserves annoncées. Elle ne dit rien des dettes de la plateforme."
niveau: "intermediaire"
prerequis: ["/okx/on-chain-off-chain"]
termes: ["merkle", "empreinte", "creance", "custody"]
sources:
  - titre: "OKX — Proof of Reserves"
    url: "https://www.okx.com/proof-of-reserves"
  - titre: "Satoshi Nakamoto — le document qui a lancé Bitcoin (2008)"
    url: "https://bitcoin.org/bitcoin.pdf"
statut: "redige"
---

**Le Proof of Reserves permet à chaque client de vérifier que son solde est bien compté dans le total que la plateforme affirme détenir — sans que personne voie les soldes des autres.**

## Pourquoi ça existe

Les soldes d'une plateforme sont des lignes dans sa base de données. Rien ne prouve qu'en face, il y a réellement des fonds.

Elle pourrait publier la liste complète de ses clients et de leurs avoirs : ça règlerait la question, et ça exposerait la fortune de millions de personnes.

Elle pourrait ne publier qu'un total : mais rien ne dirait que ton compte à toi est compté dedans.

Le Proof of Reserves résout exactement cette tension : **prouver qu'un élément fait partie d'un ensemble, sans montrer l'ensemble.**

## Comment ça marche

Chaque compte est transformé en une empreinte — un code court qui dépend du solde, mais dont on ne peut pas retrouver le solde.

Ces empreintes sont ensuite combinées deux par deux, puis les résultats combinés deux par deux à leur tour, et ainsi de suite jusqu'à obtenir **une seule valeur finale**, que la plateforme publie.

<figure class="schema">
<svg viewBox="0 0 640 250" role="img" aria-label="Les empreintes des comptes sont combinées deux à deux jusqu'à une valeur unique publiée">
  <rect x="230" y="14" width="180" height="34" rx="4" fill="var(--accent-voile)" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="320" y="36" font-size="12" fill="var(--accent)" text-anchor="middle" font-weight="600">valeur finale publiée</text>
  <path d="M290 48 L165 82 M350 48 L475 82" stroke="var(--texte-faible)" stroke-width="1.2" fill="none"/>

  <rect x="80" y="82" width="170" height="30" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="165" y="101" font-size="11" fill="var(--texte-doux)" text-anchor="middle">combinaison</text>
  <rect x="390" y="82" width="170" height="30" rx="4" fill="var(--attention-voile)" stroke="var(--attention)" stroke-width="1.5"/>
  <text x="475" y="96" font-size="11" fill="var(--attention)" text-anchor="middle">combinaison</text>
  <text x="475" y="108" font-size="9" fill="var(--texte-faible)" text-anchor="middle">on te la donne</text>

  <path d="M125 112 L60 150 M205 112 L270 150 M435 112 L400 150 M515 112 L575 150" stroke="var(--texte-faible)" stroke-width="1.2"/>

  <rect x="8" y="150" width="112" height="40" rx="4" fill="var(--accent-voile)" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="64" y="175" font-size="11" fill="var(--accent)" text-anchor="middle">ton compte</text>
  <rect x="216" y="150" width="112" height="40" rx="4" fill="var(--attention-voile)" stroke="var(--attention)" stroke-width="1.5"/>
  <text x="272" y="168" font-size="11" fill="var(--attention)" text-anchor="middle">un voisin</text>
  <text x="272" y="182" font-size="9" fill="var(--texte-faible)" text-anchor="middle">on te la donne</text>
  <rect x="344" y="150" width="112" height="40" rx="4" fill="var(--fond-2)" stroke="var(--bordure)"/>
  <text x="400" y="175" font-size="11" fill="var(--texte-faible)" text-anchor="middle">jamais vu</text>
  <rect x="520" y="150" width="112" height="40" rx="4" fill="var(--fond-2)" stroke="var(--bordure)"/>
  <text x="576" y="175" font-size="11" fill="var(--texte-faible)" text-anchor="middle">jamais vu</text>

  <text x="320" y="222" font-size="11" fill="var(--texte-doux)" text-anchor="middle">Deux valeurs suffisent pour relier ton compte au total publié.</text>
  <text x="320" y="240" font-size="11" fill="var(--texte-faible)" text-anchor="middle">Les soldes des autres ne sont jamais révélés.</text>
</svg>
<figcaption>Chacun peut vérifier sa propre présence sans rien apprendre sur les autres.</figcaption>
</figure>

Pour vérifier, la plateforme te donne quelques valeurs intermédiaires. Tu refais les combinaisons toi-même, et si tu retombes sur la valeur publiée, c'est que ton compte est bien compté dedans.

## Un exemple concret

Le nombre de valeurs à te fournir croît très lentement avec le nombre de clients :

| Nombre de clients | Valeurs nécessaires pour se vérifier |
|---|---|
| 1 000 | 10 |
| 1 000 000 | 20 |
| 50 000 000 | 26 |

Vingt-six valeurs suffisent pour se retrouver parmi cinquante millions de comptes. C'est ce qui rend la méthode utilisable en pratique.

## Ce que ça ne prouve pas

C'est la partie la plus importante de la page, et la plus souvent passée sous silence.

> [!piege] Rien sur les dettes
> La méthode prouve ce que la plateforme **possède**. Elle ne dit rien de ce qu'elle **doit** : emprunts, engagements, fonds dus à des tiers. Une entreprise peut détenir un milliard, le prouver parfaitement, et en devoir deux.

> [!piege] Une photo à un instant donné
> Rien n'empêche d'emprunter des fonds la veille de la vérification et de les rendre le lendemain. Sans contrôle indépendant des mouvements autour de la date, la preuve ne porte que sur un instant.

> [!piege] Publier n'est pas prouver
> Tant que tu n'as pas refait le calcul toi-même, tu fais confiance sur parole — ce que la procédure était précisément censée éviter. Très peu de gens le font.

> [!verifier] La méthode évolue
> Fréquence des publications, format des données et outil de vérification changent au fil du temps. Se reporter à la page officielle de la plateforme.

## Pour aller plus loin

- [On-chain et off-chain](/okx/on-chain-off-chain) — pourquoi cette preuve doit exister
- [Qui détient vraiment tes fonds](/okx/custodial-non-custodial)
- [Les fonctions de hachage](/fondamentaux/hachage) — ce qui rend les empreintes fiables
