---
titre: "Bitcoin (BTC)"
section: "cryptos"
ticker: "BTC"
instId: "BTC-USDT"
ordre: 10
resume: "La première blockchain. Registre public, offre plafonnée à 21 millions, sécurisé par la preuve de travail."
niveau: "bases"
prerequis: ["/fondamentaux/hachage"]
termes: ["utxo", "proof-of-work", "halving", "satoshi", "script", "difficulte", "coinbase"]
sources:
  - titre: "Satoshi Nakamoto — Bitcoin: A Peer-to-Peer Electronic Cash System (whitepaper)"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "Bitcoin Developer Reference — Block Chain"
    url: "https://developer.bitcoin.org/reference/block_chain.html"
  - titre: "BIP 141 — Segregated Witness (limite de poids de bloc)"
    url: "https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki"
  - titre: "Cambridge Centre for Alternative Finance — Bitcoin Electricity Consumption Index"
    url: "https://ccaf.io/cbnsi/cbeci"
statut: "redige"
---

<div data-okx-prix="BTC-USDT"></div>

<div data-okx-graphique="BTC-USDT"></div>

**Bitcoin est un registre public répliqué, dont les écritures sont ordonnées par une compétition de calcul et dont l'unité de compte a une offre plafonnée par le protocole.**

## Fiche d'identité

| Champ | Valeur |
|---|---|
| Bloc genèse | 3 janvier 2009 |
| Créateur | Satoshi Nakamoto — pseudonyme, identité inconnue |
| Chaîne | Bitcoin, chaîne native |
| Consensus | Preuve de travail (double SHA-256) |
| Modèle de comptabilité | UTXO |
| Offre maximale | 21 000 000 BTC |
| Unité minimale | 1 satoshi = 0,000 000 01 BTC (10⁻⁸) |
| Temps de bloc visé | 10 minutes |
| Ajustement de difficulté | tous les 2 016 blocs, soit ~2 semaines |
| Limite de bloc | 4 000 000 unités de poids (BIP 141) |
| Halving | tous les 210 000 blocs |

## À quoi ça sert

Le whitepaper pose un problème précis, et un seul : permettre un paiement électronique direct entre deux personnes **sans institution financière au milieu**. Le verrou n'était pas la cryptographie — signer un message était résolu depuis les années 1970 — mais l'ordre. Sans arbitre central, comment empêcher quelqu'un de dépenser deux fois la même unité en envoyant deux messages contradictoires à deux endroits du réseau ?

La réponse de Bitcoin : rendre l'écriture de l'histoire coûteuse. Celui qui veut ajouter un bloc doit dépenser de l'électricité pour trouver un nombre satisfaisant une condition sur son empreinte. Réécrire le passé exigerait de refaire ce travail plus vite que le reste du réseau.

## Comment ça marche

**Le modèle UTXO.** Il n'y a pas de « compte » avec un solde dans Bitcoin. Il y a des sorties de transaction non dépensées — des jetons indivisibles de montants arbitraires. Dépenser, c'est consommer entièrement une ou plusieurs sorties et en créer de nouvelles, dont une revient souvent à toi en monnaie rendue. Ton « solde » est une somme calculée par ton portefeuille, pas une valeur stockée dans la chaîne.

**Script.** Chaque sortie est verrouillée par un petit programme, dans un langage volontairement non Turing-complet : pas de boucle, pas de récursion. Ce n'est pas une limitation qu'on aurait oublié de lever, c'est un choix de surface d'attaque.

**L'émission.** Chaque bloc crée des BTC ex nihilo, via une transaction spéciale dite coinbase, sans entrée. Cette récompense est divisée par deux tous les 210 000 blocs.


<figure class="schema">
<svg viewBox="0 0 640 250" role="img" aria-label="Récompense de bloc divisée par deux à chaque époque de 210 000 blocs">
  <line x1="58" y1="30" x2="58" y2="200" stroke="var(--bordure-forte)"/>
  <line x1="58" y1="200" x2="620" y2="200" stroke="var(--bordure-forte)"/>
  <text x="10" y="34" font-size="10" fill="var(--texte-faible)">BTC/bloc</text>
  <text x="34" y="54" font-size="10" fill="var(--texte-faible)">50</text>
  <text x="34" y="129" font-size="10" fill="var(--texte-faible)">25</text>
  <text x="30" y="196" font-size="10" fill="var(--texte-faible)">0</text>

  <path d="M58 50 H150 V125 H241 V163 H332 V181 H423 V191 H514 V196 H605"
        fill="none" stroke="var(--accent)" stroke-width="2"/>

  <path d="M58 50 H150 V200 H58 Z M150 125 H241 V200 H150 Z M241 163 H332 V200 H241 Z M332 181 H423 V200 H332 Z"
        fill="var(--accent-voile)" stroke="none"/>
  <path d="M423 191 H514 V200 H423 Z" fill="var(--attention-voile)" stroke="none"/>

  <text x="104" y="215" font-size="10" fill="var(--texte-doux)" text-anchor="middle">2009</text>
  <text x="195" y="215" font-size="10" fill="var(--texte-doux)" text-anchor="middle">2012</text>
  <text x="286" y="215" font-size="10" fill="var(--texte-doux)" text-anchor="middle">2016</text>
  <text x="377" y="215" font-size="10" fill="var(--texte-doux)" text-anchor="middle">2020</text>
  <text x="468" y="215" font-size="10" fill="var(--attention)" text-anchor="middle">2024</text>
  <text x="559" y="215" font-size="10" fill="var(--texte-faible)" text-anchor="middle">2028</text>

  <text x="104" y="44" font-size="9" fill="var(--texte-faible)" text-anchor="middle">10,5 M émis</text>
  <text x="195" y="119" font-size="9" fill="var(--texte-faible)" text-anchor="middle">5,25 M</text>
  <text x="286" y="157" font-size="9" fill="var(--texte-faible)" text-anchor="middle">2,63 M</text>
  <text x="377" y="175" font-size="9" fill="var(--texte-faible)" text-anchor="middle">1,31 M</text>
  <text x="468" y="185" font-size="9" fill="var(--attention)" text-anchor="middle">en cours</text>

  <line x1="468" y1="30" x2="468" y2="200" stroke="var(--attention)" stroke-dasharray="3 3" stroke-width="1"/>
  <text x="474" y="40" font-size="10" fill="var(--attention)">époque actuelle</text>
</svg>
<figcaption>Chaque palier dure 210 000 blocs, soit environ quatre ans. La moitié de tous les BTC a été émise pendant les quatre premières années.</figcaption>
</figure>

| Époque | Blocs | Récompense | BTC émis |
|---|---|---|---|
| 0 | 0 – 209 999 | 50 BTC | 10 500 000 |
| 1 | 210 000 – 419 999 | 25 BTC | 5 250 000 |
| 2 | 420 000 – 629 999 | 12,5 BTC | 2 625 000 |
| 3 | 630 000 – 839 999 | 6,25 BTC | 1 312 500 |
| 4 | 840 000 – … | 3,125 BTC | en cours |

La série géométrique 50 + 25 + 12,5 + … converge : la somme totale émise ne peut pas dépasser 21 millions. Le plafond n'est pas une règle écrite quelque part, c'est une conséquence arithmétique du calendrier d'émission.

## Ce qui le distingue

- **L'offre est bornée et le calendrier est connu à l'avance**, ce qui n'est le cas d'aucune monnaie étatique et d'assez peu de cryptos.
- **La chaîne est délibérément peu capable.** Pas de contrats arbitraires, débit faible, pas de mise à jour rapide. La contrepartie est un protocole qui a très peu changé depuis 2009 et une surface d'attaque réduite.
- **Le budget de sécurité est explicite** : ce qui protège la chaîne, c'est le coût de l'électricité nécessaire pour la réécrire.

## Exemple chiffré

Combien de BTC existent aujourd'hui ? Ça se calcule, ça ne se cherche pas.

Au 22 août 2026, la hauteur de bloc est **963 602**. On additionne les époques complètes, puis les blocs de l'époque en cours :

```
époques 0 à 3 : 210 000 × (50 + 25 + 12,5 + 6,25)  = 19 687 500 BTC
époque 4      : (963 602 − 840 000 + 1) × 3,125     =    386 259,375 BTC
                                              total = 20 073 759,375 BTC
```

Soit **95,6 % des 21 millions déjà émis**, dix-sept ans après le lancement. Les 4,4 % restants s'étaleront jusqu'aux alentours de 2140, la récompense étant divisée par deux tous les quatre ans environ.

Le prochain halving aura lieu au bloc 1 050 000, soit environ 86 400 blocs après cette hauteur — de l'ordre de vingt mois au rythme de dix minutes par bloc.

> [!verifier] La hauteur de bloc est un instantané
> Le chiffre ci-dessus a été relevé le 22 août 2026. Il augmente d'environ 144 blocs par jour. Pour la valeur du moment, un explorateur de blocs répond en une requête.

> [!ciel] Tu connais déjà ça
> Le nombre total de BTC ne se lit nulle part : il se **recalcule** à partir de la règle et de la hauteur courante. C'est exactement la différence entre une valeur stockée et une valeur dérivée. Bitcoin ne stocke pas son offre, il stocke l'historique qui permet de la déduire — comme un journal d'événements dont on rejoue les entrées plutôt qu'une colonne `solde` qu'on met à jour.

## Critiques et controverses

- **Consommation électrique.** La preuve de travail consomme par construction : c'est le mécanisme de sécurité lui-même, pas un défaut d'implémentation. L'ordre de grandeur est mesuré en continu par le Cambridge Centre for Alternative Finance, dont l'indice est la référence institutionnelle sur le sujet. Le débat porte sur la comparaison pertinente et sur le mix énergétique employé, pas sur l'existence de la consommation.
- **Débit.** Quelques transactions par seconde au maximum, contre plusieurs milliers pour un réseau de cartes bancaires. C'est assumé : la scalabilité est renvoyée à des couches supérieures comme le Lightning Network.
- **Concentration du minage.** L'activité s'est concentrée dans un petit nombre de pools et de zones géographiques. Un mineur individuel ne mine plus seul depuis longtemps.
- **La guerre des blocs.** Le conflit sur l'augmentation de la taille des blocs a abouti en août 2017 à une scission : Bitcoin Cash. L'épisode montre qu'une règle de consensus ne se change pas par vote mais par fork, et que la coordination sociale fait partie du protocole autant que le code.

## Sur OKX

Huit paires BTC sont ouvertes à la négociation, relevées via l'API publique le 22 août 2026 :

`BTC-USDT` · `BTC-USDC` · `BTC-USD` · `BTC-EUR` · `BTC-AUD` · `BTC-BRL` · `BTC-TRY` · `BTC-AED`

Le bloc de prix en haut de cette page interroge `BTC-USDT`, la paire la plus liquide.

> [!piege] Le BTC de ton compte OKX n'est pas sur la chaîne Bitcoin
> Tant qu'il est sur l'exchange, c'est une ligne dans leur base de données. Voir [On-chain vs off-chain](/okx/on-chain-off-chain).

> [!piege] Bitcoin, BTC, ₿, sats, XBT
> « Bitcoin » avec une majuscule désigne le réseau et le protocole, « bitcoin » l'unité de compte. `BTC` est le code habituel, `XBT` une variante conforme à l'ISO 4217 qu'on croise encore sur certaines plateformes. Un « sat » est un cent-millionième de bitcoin.

## Pour aller plus loin

- [Les fonctions de hachage](/fondamentaux/hachage) — le double SHA-256 du minage
- [Proof of Work](/fondamentaux/proof-of-work) — la difficulté, le hashrate, l'ajustement
- [UTXO vs comptes](/chaines/utxo-vs-comptes) — pourquoi Ethereum a fait l'inverse
- [On-chain vs off-chain](/okx/on-chain-off-chain) — ce que tu détiens vraiment sur un exchange
