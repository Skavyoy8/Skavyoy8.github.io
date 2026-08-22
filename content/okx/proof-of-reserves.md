---
titre: "Proof of Reserves"
section: "okx"
ordre: 70
resume: "Un arbre de Merkle qui prouve que ton solde est compté dans le total annoncé. Il ne prouve rien sur les dettes de la plateforme."
niveau: "intermediaire"
prerequis: ["/okx/on-chain-off-chain", "/fondamentaux/hachage"]
termes: ["merkle", "empreinte", "sha-256", "creance", "on-chain", "off-chain"]
sources:
  - titre: "OKX — Proof of Reserves"
    url: "https://www.okx.com/proof-of-reserves"
  - titre: "Satoshi Nakamoto — Bitcoin, section 7 (arbre de Merkle)"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "NIST — FIPS 180-4, Secure Hash Standard (SHA-256)"
    url: "https://csrc.nist.gov/pubs/fips/180-4/upd1/final"
statut: "redige"
---

**Le Proof of Reserves est un arbre de hachages qui te permet de vérifier que ton solde est bien compté dans le total que la plateforme affirme détenir, sans révéler les soldes des autres clients.**

## Le problème que ça résout

Les soldes d'un exchange sont off-chain : des lignes dans sa base de données. Rien ne prouve qu'en face de la somme de ces lignes, il y a réellement des fonds.

L'exchange pourrait publier son total et l'adresse de ses portefeuilles. Ça prouve qu'il détient quelque chose, mais pas que ton compte à toi est compté dedans — ni que le total correspond à la somme des comptes clients.

Il pourrait publier la liste complète des soldes : ça règle tout, et ça expose les avoirs de millions de gens.

L'arbre de Merkle résout exactement cette tension : **prouver qu'un élément appartient à un ensemble, sans publier l'ensemble.**

## Comment ça marche

Chaque client devient une feuille : l'empreinte de son identifiant et de son solde. On hache ensuite les feuilles deux à deux, puis les résultats deux à deux, jusqu'à une valeur unique — la **racine**, publiée.

<figure class="schema">
<svg viewBox="0 0 640 260" role="img" aria-label="Arbre de Merkle à quatre feuilles, avec le chemin de vérification de la première feuille mis en évidence">
  <rect x="230" y="14" width="180" height="34" rx="4" fill="var(--accent-voile)" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="320" y="30" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">RACINE publiée</text>
  <text x="320" y="43" font-size="10" fill="var(--texte-doux)" text-anchor="middle">36c31e71…</text>

  <path d="M290 48 L165 80 M350 48 L475 80" stroke="var(--texte-faible)" stroke-width="1.2" fill="none"/>

  <rect x="80" y="80" width="170" height="30" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="165" y="99" font-size="10" fill="var(--texte-doux)" text-anchor="middle">N12  3c715c9e…</text>

  <rect x="390" y="80" width="170" height="30" rx="4" fill="var(--attention-voile)" stroke="var(--attention)" stroke-width="1.5"/>
  <text x="475" y="94" font-size="10" fill="var(--attention)" text-anchor="middle">N34  e17afbf0…</text>
  <text x="475" y="106" font-size="9" fill="var(--texte-faible)" text-anchor="middle">fourni</text>

  <path d="M125 110 L60 148 M205 110 L270 148 M435 110 L400 148 M515 110 L575 148" stroke="var(--texte-faible)" stroke-width="1.2" fill="none"/>

  <rect x="8" y="148" width="112" height="42" rx="4" fill="var(--accent-voile)" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="64" y="164" font-size="10" fill="var(--accent)" text-anchor="middle">F1 — toi</text>
  <text x="64" y="178" font-size="9" fill="var(--texte-doux)" text-anchor="middle">808f14f4…</text>

  <rect x="216" y="148" width="112" height="42" rx="4" fill="var(--attention-voile)" stroke="var(--attention)" stroke-width="1.5"/>
  <text x="272" y="164" font-size="10" fill="var(--attention)" text-anchor="middle">F2</text>
  <text x="272" y="178" font-size="9" fill="var(--texte-faible)" text-anchor="middle">fourni</text>

  <rect x="344" y="148" width="112" height="42" rx="4" fill="var(--fond-2)" stroke="var(--bordure)"/>
  <text x="400" y="171" font-size="10" fill="var(--texte-faible)" text-anchor="middle">F3 — jamais vu</text>

  <rect x="520" y="148" width="112" height="42" rx="4" fill="var(--fond-2)" stroke="var(--bordure)"/>
  <text x="576" y="171" font-size="10" fill="var(--texte-faible)" text-anchor="middle">F4 — jamais vu</text>

  <text x="320" y="220" font-size="11" fill="var(--texte-doux)" text-anchor="middle">Pour prouver que F1 est dans l'arbre, il suffit de F2 et N34.</text>
  <text x="320" y="238" font-size="11" fill="var(--texte-faible)" text-anchor="middle">Les soldes de F3 et F4 ne sont jamais divulgués.</text>
</svg>
<figcaption>Le chemin de Merkle : deux empreintes suffisent à relier ta feuille à la racine, sur un arbre de quatre feuilles.</figcaption>
</figure>

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> C'est la vérification d'intégrité partielle. Un client BitTorrent ne retélécharge pas le fichier entier pour valider un morceau : il remonte l'arbre de hachage jusqu'à la racine. Git fait pareil avec ses arbres d'objets.
>
> Ici, le « morceau » c'est ton solde, et la « racine » est publiée par l'exchange. Tu vérifies ton appartenance à l'ensemble sans jamais voir l'ensemble.

## Exemple chiffré

Quatre clients. Chaque feuille est le SHA-256 de l'identifiant et du solde :

```bash
printf 'client:4021|BTC:0.01000000' | sha256sum
printf 'client:7788|BTC:0.50000000' | sha256sum
```

Valeurs réelles obtenues :

```
F1  808f14f4c75338a2387adfcb9aafa1cbb82d86fa781acffc6280906a846138a4
F2  30a389dd32916cfbe0e704599d3c5e242a2f42992e56a5239e85c68dac50b52b
F3  660983b47351cd6952011d6ea578383cfe9b767fef7ebe7bfd4cae4ccb49c11e
F4  9fd28f645ce43cc863aa01c6c2561dbe59d8b402782b84ba3f927fa86c23d7b7
```

On hache les concaténations deux à deux :

```
N12    = SHA-256(F1 ‖ F2) = 3c715c9e20f97d5b650f8658e3b08a528aa19da6a03cb2778190433ce7c8e040
N34    = SHA-256(F3 ‖ F4) = e17afbf06a8b395416dcc284c55276006416f6c96eeb81355e682710e35c8604
RACINE = SHA-256(N12 ‖ N34) = 36c31e71a2ec18cf0d515c6679b4a4757b9845edc860e53d7dec60afc0768f62
```

Tu es le client 4021. On te donne **deux** empreintes : F2 et N34. Tu recalcules ta feuille, puis `SHA-256(F1 ‖ F2)`, puis `SHA-256(N12 ‖ N34)`. Si tu retombes sur la racine publiée, ton solde est bien dans l'arbre.

Vérifié : le recalcul donne exactement `36c31e71…`. Et tu n'as jamais vu les soldes de F3 ni de F4.

Le coût de la preuve croît en logarithme du nombre de clients :

| Clients | Empreintes à fournir |
|---|---|
| 4 | 2 |
| 1 000 | 10 |
| 1 000 000 | 20 |
| 50 000 000 | 26 |

Vingt-six valeurs pour vérifier son appartenance parmi cinquante millions. C'est ce qui rend la structure utilisable.

## Sur OKX

OKX publie périodiquement une racine de Merkle et les adresses de ses portefeuilles, avec un outil de vérification et les données permettant de recalculer son chemin soi-même. Le principe est le même chez tous les exchanges qui pratiquent l'exercice.

## Les pièges

> [!piege] Ça ne prouve rien sur les dettes
> C'est la limite centrale, et elle est décisive. L'arbre prouve l'**actif** : « voici ce que nous détenons, et ton solde est compté dedans ». Il ne dit rien du **passif** : emprunts, engagements, fonds dus à des tiers. Une plateforme peut détenir un milliard, le prouver proprement, et en devoir deux.

> [!piege] Ça ne vaut que pour un instant précis
> C'est un instantané. Rien n'empêche d'emprunter des fonds la veille de la photo et de les rendre le lendemain. Sans attestation indépendante des mouvements autour de la date, la preuve porte sur une seconde de l'année.

> [!piege] Une racine non vérifiée ne sert à rien
> Publier une racine, ce n'est pas prouver. Tant que tu ne recalcules pas ton propre chemin, tu fais confiance sur parole — exactement ce que la procédure était censée éviter.

> [!verifier] Fréquence et méthode évoluent
> La périodicité des publications, le format des données et l'outil de vérification changent au fil du temps. Se reporter à la page officielle avant de vérifier.

## Pour aller plus loin

- [On-chain vs off-chain](/okx/on-chain-off-chain) — pourquoi cette preuve doit exister
- [Les fonctions de hachage](/fondamentaux/hachage) — ce qui rend l'arbre infalsifiable
- [Étude de cas : la faillite de FTX](/okx/etude-ftx) — le passif que l'arbre ne montre pas
