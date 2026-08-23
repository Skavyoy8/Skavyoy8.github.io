---
titre: "On-chain et off-chain"
section: "okx"
ordre: 20
resume: "La différence entre ce qui est réellement inscrit sur la blockchain et ce qui n'est qu'une ligne dans la base de données d'une entreprise."
niveau: "bases"
prerequis: ["/commencer/acheter-sur-okx"]
termes: ["on-chain", "off-chain", "creance", "txid", "confirmation", "moteur-appariement"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — Proof of Reserves"
    url: "https://www.okx.com/proof-of-reserves"
statut: "redige"
---

**On-chain veut dire « inscrit sur la blockchain », visible par tous et vérifiable par n'importe qui. Off-chain veut dire « dans les registres privés d'une entreprise », visible seulement par elle.**

## Pourquoi ça existe

Une blockchain traite quelques transactions par seconde et fait payer chacune d'elles. Une plateforme d'échange en traite des milliers par seconde, dont la plupart sont annulées avant d'exister.

Faire passer tout ça par la blockchain serait impossible. Et ce serait inutile : quand deux clients de la même plateforme échangent entre eux, rien n'a besoin de sortir de la maison. Il suffit de tenir des comptes.

C'est le même principe qu'une banque : elle ne transporte pas des billets d'un coffre à l'autre chaque fois que deux clients se virent de l'argent. Elle modifie deux lignes.

## Comment ça marche

<figure class="schema">
<svg viewBox="0 0 640 300" role="img" aria-label="Séparation entre les registres privés de la plateforme et la blockchain publique : seuls les dépôts et retraits franchissent la frontière">
  <line x1="345" y1="10" x2="345" y2="290" stroke="var(--bordure-forte)" stroke-width="1.5" stroke-dasharray="5 5"/>
  <text x="14" y="24" font-size="12" fill="var(--texte-doux)">CHEZ LA PLATEFORME</text>
  <text x="14" y="40" font-size="11" fill="var(--texte-faible)">personne d'autre ne voit</text>
  <text x="360" y="24" font-size="12" fill="var(--texte-doux)">SUR LA BLOCKCHAIN</text>
  <text x="360" y="40" font-size="11" fill="var(--texte-faible)">tout le monde voit</text>

  <rect x="14" y="56" width="310" height="118" rx="6" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="28" y="78" font-size="12" fill="var(--texte-fort)">Sa base de données</text>
  <line x1="28" y1="86" x2="310" y2="86" stroke="var(--bordure)"/>
  <text x="28" y="106" font-size="11" fill="var(--code-texte)">client 4021 …… 0,010 BTC</text>
  <text x="28" y="124" font-size="11" fill="var(--code-texte)">client 7788 …… 769,12 EUR</text>
  <rect x="28" y="136" width="282" height="26" rx="4" fill="var(--accent-voile)" stroke="var(--accent)"/>
  <text x="169" y="153" font-size="11" fill="var(--accent)" text-anchor="middle">achats et ventes : rien ne sort d'ici</text>

  <rect x="376" y="70" width="72" height="44" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="412" y="96" font-size="11" fill="var(--texte-doux)" text-anchor="middle">bloc</text>
  <rect x="460" y="70" width="72" height="44" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="496" y="96" font-size="11" fill="var(--texte-doux)" text-anchor="middle">bloc</text>
  <rect x="544" y="70" width="72" height="44" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="580" y="96" font-size="11" fill="var(--texte-doux)" text-anchor="middle">bloc</text>
  <path d="M448 92 L458 92 M532 92 L542 92" stroke="var(--texte-faible)" stroke-width="1.2"/>

  <path d="M600 200 L330 200" stroke="var(--accent)" stroke-width="1.6" fill="none"/>
  <path d="M338 196 L330 200 L338 204 Z" fill="var(--accent)"/>
  <text x="470" y="192" font-size="11" fill="var(--accent)" text-anchor="middle">DÉPÔT — inscrit sur la blockchain</text>

  <path d="M330 258 L600 258" stroke="var(--info)" stroke-width="1.6" fill="none"/>
  <path d="M592 254 L600 258 L592 262 Z" fill="var(--info)"/>
  <text x="470" y="250" font-size="11" fill="var(--info)" text-anchor="middle">RETRAIT — inscrit sur la blockchain</text>

  <rect x="14" y="222" width="310" height="52" rx="6" fill="var(--fond-alt)" stroke="var(--bordure)"/>
  <text x="28" y="242" font-size="11" fill="var(--texte)">10 achats, 200 ordres annulés, 3 ventes</text>
  <text x="28" y="263" font-size="12" fill="var(--attention)">→ rien du tout sur la blockchain</text>
</svg>
<figcaption>Seuls le dépôt et le retrait traversent la frontière. Tout ce qui se passe entre les deux reste une écriture interne.</figcaption>
</figure>

Le parcours complet :

1. **Le dépôt.** Tu envoies des fonds à une adresse que la plateforme te fournit. C'est une vraie transaction, signée par toi, inscrite dans un bloc. L'adresse appartient à la plateforme, pas à toi.
2. **Les achats et les ventes.** La plateforme diminue une ligne et en augmente une autre. Aucune signature, aucun frais de réseau, aucun identifiant de transaction. Ça n'existe que chez elle.
3. **Le retrait.** La plateforme construit une transaction depuis ses propres réserves et la signe avec ses propres clés. C'est le seul moment où des fonds bougent vraiment à cause de toi — et ce n'est pas toi qui signes.

## Un exemple concret

Un mois d'utilisation ordinaire :

| Action | Nombre | Inscrit sur la blockchain |
|---|---|---|
| Dépôt | 1 | 1 |
| Ordres passés | 214 | 0 |
| Ordres annulés | 198 | 0 |
| Achats et ventes réalisés | 16 | 0 |
| Retrait | 1 | 1 |
| **Total** | **430 opérations** | **2** |

Sur 430 opérations, deux seulement existent en dehors des serveurs de l'entreprise. Les 428 autres n'ont laissé aucune trace vérifiable par un tiers.

## Comment le vérifier soi-même

Dans l'historique des dépôts et retraits, chaque ligne porte un identifiant de transaction cliquable, qui mène à un site public où l'opération est visible.

Dans l'historique des achats et des ventes, aucune ligne n'en porte. La différence saute aux yeux, et elle dit tout.

## Ce qu'il faut savoir

> [!piege] Ton solde n'est pas de la crypto
> C'est une créance : une promesse de l'entreprise de te verser ce montant. Tant qu'elle tient ses engagements, la distinction est invisible. Le jour où elle ne les tient plus, c'est la seule qui compte.

> [!piege] L'adresse de dépôt n'est pas ton portefeuille
> Elle appartient à la plateforme. Elle peut changer, être partagée avec d'autres clients, ou demander un code supplémentaire selon le réseau.

> [!piege] La rapidité d'une plateforme n'a rien à voir avec la blockchain
> Un achat est instantané parce qu'il ne touche aucune blockchain. Quand on vante la vitesse d'une plateforme, on vante celle de sa base de données.

## Pour aller plus loin

- [Qui détient tes fonds](/okx/custodial-non-custodial) — les deux modèles, comparés
- [Proof of Reserves](/okx/proof-of-reserves) — la tentative de rendre les réserves vérifiables
- [Dépôts et retraits](/okx/depots-retraits) — les deux opérations qui franchissent la frontière
