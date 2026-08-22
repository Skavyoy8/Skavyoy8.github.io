---
titre: "Les fonctions de hachage"
section: "fondamentaux"
ordre: 20
resume: "Transformer n'importe quelle donnée en une empreinte de taille fixe et impossible à inverser. C'est la brique sur laquelle tout le reste est posé."
niveau: "bases"
prerequis: []
termes: ["hachage", "sha-256", "empreinte", "collision", "effet-avalanche", "preimage", "merkle"]
sources:
  - titre: "NIST — FIPS 180-4, Secure Hash Standard (SHA-256)"
    url: "https://csrc.nist.gov/pubs/fips/180-4/upd1/final"
  - titre: "Satoshi Nakamoto — Bitcoin: A Peer-to-Peer Electronic Cash System"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "Bitcoin Developer Reference — Block Chain"
    url: "https://developer.bitcoin.org/reference/block_chain.html"
statut: "redige"
---

**Une fonction de hachage transforme une donnée de n'importe quelle taille en une empreinte de taille fixe, sans moyen connu de faire le chemin inverse.**

## Le problème que ça résout

Tu veux prouver que deux fichiers sont identiques sans les comparer octet par octet. Tu veux détecter qu'un fichier a été modifié sans garder une copie de l'original. Tu veux relier des blocs de données entre eux de façon qu'on ne puisse pas en retoucher un seul sans que ça se voie.

Les trois problèmes ont la même solution : calculer une empreinte courte, déterministe, et telle que la moindre modification de l'entrée produise une empreinte totalement différente.

## Comment ça marche

SHA-256 est normalisée par le NIST dans FIPS 180-4. Elle prend une suite d'octets de longueur quelconque et rend toujours **256 bits**, soit 32 octets, soit 64 caractères en hexadécimal.

<figure class="schema">
<svg viewBox="0 0 640 250" role="img" aria-label="Trois entrées de tailles très différentes passent par SHA-256 et produisent trois empreintes de taille identique">
  <text x="10" y="18" font-size="11" fill="var(--texte-faible)">ENTRÉE — taille quelconque</text>
  <text x="255" y="18" font-size="11" fill="var(--texte-faible)">FONCTION</text>
  <text x="430" y="18" font-size="11" fill="var(--texte-faible)">SORTIE — toujours 32 octets</text>

  <rect x="10" y="34" width="150" height="22" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="20" y="49" font-size="12" fill="var(--texte)">8 octets</text>

  <rect x="10" y="92" width="150" height="76" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="20" y="135" font-size="12" fill="var(--texte)">1,4 Go</text>

  <rect x="10" y="204" width="150" height="14" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="20" y="215" font-size="11" fill="var(--texte-doux)">0 octet</text>

  <path d="M165 45 L245 100 M165 130 L245 130 M165 211 L245 160"
        stroke="var(--texte-faible)" stroke-width="1.2" fill="none"/>

  <rect x="250" y="86" width="130" height="88" rx="6" fill="var(--accent-voile)" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="315" y="126" font-size="14" fill="var(--accent)" text-anchor="middle" font-weight="600">SHA-256</text>
  <text x="315" y="146" font-size="10" fill="var(--texte-doux)" text-anchor="middle">déterministe</text>

  <path d="M385 110 L425 55 M385 130 L425 130 M385 150 L425 205"
        stroke="var(--texte-faible)" stroke-width="1.2" fill="none"/>

  <rect x="428" y="44" width="202" height="22" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="436" y="59" font-size="11" fill="var(--code-texte)">c83fa1db…72800325</text>

  <rect x="428" y="119" width="202" height="22" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="436" y="134" font-size="11" fill="var(--code-texte)">9f60d83e…b5691202</text>

  <rect x="428" y="194" width="202" height="22" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="436" y="209" font-size="11" fill="var(--code-texte)">e3b0c442…7852b855</text>
</svg>
<figcaption>La taille de l'entrée n'a aucune influence sur la taille de la sortie. Même une entrée vide produit une empreinte de 32 octets.</figcaption>
</figure>

Quatre propriétés font l'intérêt de la chose :

| Propriété | Ce que ça veut dire |
|---|---|
| Déterminisme | La même entrée donne toujours exactement la même empreinte, sur n'importe quelle machine. |
| Résistance à la préimage | À partir d'une empreinte, on ne sait pas retrouver l'entrée autrement qu'en essayant toutes les entrées possibles. |
| Résistance à la collision | On ne sait pas fabriquer deux entrées différentes qui donnent la même empreinte. |
| Effet avalanche | Changer un seul bit de l'entrée change environ la moitié des bits de la sortie. |

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> C'est exactement le `sha256sum` que tu lances après avoir téléchargé une ISO Debian ou Kali. Le site publie l'empreinte, tu la recalcules sur ton fichier, tu compares. Si un octet a été modifié en route — corruption réseau ou miroir compromis — les deux chaînes n'ont plus rien à voir.
>
> Une blockchain fait la même chose, mais en continu : chaque bloc contient l'empreinte du bloc précédent. Modifier une transaction ancienne change l'empreinte de son bloc, donc celle du suivant, donc toute la suite. C'est un `sha256sum` chaîné sur tout l'historique.

## Exemple chiffré

Deux chaînes qui ne diffèrent que par une majuscule :

```bash
printf 'Registre' | sha256sum
printf 'registre' | sha256sum
```

Sortie réelle :

```
c83fa1db7c07b7214d8d16dc50e7a2cd075005197267fa1da276b28a72800325  -
9f60d83e92d7ca4f038d58765514e5a84ddfa3ab9629cfb38e3f6c2ab5691202  -
```

Un seul bit change dans l'entrée — la différence entre `R` (0x52) et `r` (0x72) tient au bit 5. Les deux empreintes n'ont aucun préfixe commun. C'est l'effet avalanche : il n'existe aucune notion de « proximité » entre deux empreintes. On ne peut pas s'approcher progressivement d'une cible.

Un ordre de grandeur pour la résistance à la préimage : une empreinte SHA-256 a 2²⁵⁶ valeurs possibles, soit environ 1,2 × 10⁷⁷. Le nombre d'atomes dans l'univers observable est estimé autour de 10⁸⁰. Chercher une entrée qui donne une empreinte imposée revient à fouiller un espace du même ordre de grandeur.

## Sur OKX

Tu croises des empreintes SHA-256 à trois endroits, sans que l'interface emploie jamais le mot « hachage » :

- **Le TxID d'un retrait.** Quand tu retires du BTC, OKX affiche un identifiant de transaction de 64 caractères hexadécimaux : c'est le double SHA-256 de la transaction sérialisée. C'est ce que tu colles dans un explorateur de blocs pour vérifier toi-même.
- **Le Proof of Reserves.** OKX publie un arbre de Merkle, une structure entièrement construite avec des empreintes, qui permet de vérifier que ton solde est bien inclus dans le total annoncé sans révéler les soldes des autres clients.
- **Les adresses de dépôt.** Une adresse Bitcoin dérive de la clé publique par des fonctions de hachage successives, pas de la clé publique elle-même.

## Les pièges

> [!piege] Hacher n'est pas chiffrer
> Un chiffrement est réversible avec la bonne clé : c'est son but. Un hachage ne l'est pas, il n'y a pas de clé et pas de déchiffrement. Une empreinte n'est pas « du texte chiffré » : l'information de départ n'est plus là, on l'a détruite en la compressant sur 32 octets.

> [!piege] « Un hash est unique » est faux
> Il y a une infinité d'entrées possibles pour un nombre fini d'empreintes, donc des collisions existent forcément. La propriété réelle est plus faible et plus utile : personne ne sait *en fabriquer une*. Pour MD5 et SHA-1, on sait le faire aujourd'hui — c'est pour ça qu'on ne les utilise plus pour la sécurité.

> [!piege] Le double SHA-256 de Bitcoin
> Bitcoin n'applique pas SHA-256 une fois mais deux, sur le résultat de la première passe. Si tu recalcules à la main l'empreinte d'un bloc et que tu ne retrouves pas la valeur de l'explorateur, c'est probablement ça — plus le fait que l'affichage est en boutisme inversé.

## Pour aller plus loin

- [Qu'est-ce qu'une blockchain](/fondamentaux/blockchain) — comment le chaînage se construit concrètement
- [Cryptographie asymétrique](/fondamentaux/cryptographie-asymetrique) — l'autre brique, celle qui prouve qui tu es
- [Proof of Reserves](/okx/proof-of-reserves) — l'arbre de Merkle en pratique
