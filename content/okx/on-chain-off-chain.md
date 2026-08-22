---
titre: "On-chain vs off-chain"
section: "okx"
ordre: 20
resume: "Quand tu achètes du BTC sur OKX, rien n'est écrit sur la blockchain. OKX change deux lignes dans sa base de données. C'est la page la plus importante du site."
niveau: "bases"
prerequis: ["/fondamentaux/hachage"]
termes: ["on-chain", "off-chain", "custody", "moteur-appariement", "txid", "confirmation", "creance"]
sources:
  - titre: "OKX — API v5, documentation officielle (Funding, Deposit, Withdrawal)"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — Proof of Reserves"
    url: "https://www.okx.com/proof-of-reserves"
  - titre: "Satoshi Nakamoto — Bitcoin: A Peer-to-Peer Electronic Cash System"
    url: "https://bitcoin.org/bitcoin.pdf"
statut: "redige"
---

**Acheter du BTC sur OKX n'écrit rien sur la blockchain : OKX débite une ligne et en crédite une autre dans sa propre base de données.**

## Le problème que ça résout

Un bloc Bitcoin sort environ toutes les dix minutes. La chaîne encaisse quelques transactions par seconde, chacune coûte des frais de réseau, et il faut attendre plusieurs blocs avant de considérer qu'une transaction ne sera pas réorganisée.

Un carnet d'ordres, lui, encaisse des milliers d'opérations par seconde, dont l'immense majorité sont des ordres annulés avant même d'être exécutés. Régler chaque exécution sur la chaîne est physiquement impossible, et n'aurait aucun intérêt : les deux contreparties sont déjà clientes du même établissement.

La solution est vieille comme la banque : on ne déplace les actifs que quand ils entrent ou sortent du système. À l'intérieur, on tient des comptes.

## Comment ça marche

<figure class="schema">
<svg viewBox="0 0 640 320" role="img" aria-label="Frontière entre la base de données d'OKX et la blockchain : seuls les dépôts et les retraits la traversent">
  <line x1="345" y1="10" x2="345" y2="310" stroke="var(--bordure-forte)" stroke-width="1.5" stroke-dasharray="5 5"/>
  <text x="14" y="22" font-size="11" fill="var(--texte-faible)">CHEZ OKX — off-chain</text>
  <text x="358" y="22" font-size="11" fill="var(--texte-faible)">SUR LA BLOCKCHAIN — on-chain</text>

  <rect x="14" y="36" width="310" height="150" rx="6" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="26" y="56" font-size="12" fill="var(--texte-fort)" font-weight="600">Base de données OKX</text>
  <line x1="26" y1="64" x2="312" y2="64" stroke="var(--bordure)"/>
  <text x="26" y="84" font-size="11" fill="var(--code-texte)">client 4021   BTC    0.01000000</text>
  <text x="26" y="102" font-size="11" fill="var(--code-texte)">client 4021   USDT        0.00</text>
  <text x="26" y="120" font-size="11" fill="var(--code-texte)">client 7788   BTC    0.00000000</text>
  <text x="26" y="138" font-size="11" fill="var(--code-texte)">client 7788   USDT      769.12</text>
  <rect x="26" y="150" width="286" height="26" rx="4" fill="var(--accent-voile)" stroke="var(--accent)"/>
  <text x="169" y="167" font-size="11" fill="var(--accent)" text-anchor="middle">moteur d'appariement — 0 transaction on-chain</text>

  <rect x="376" y="60" width="72" height="46" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="412" y="88" font-size="11" fill="var(--texte-doux)" text-anchor="middle">bloc n</text>
  <rect x="460" y="60" width="72" height="46" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="496" y="88" font-size="11" fill="var(--texte-doux)" text-anchor="middle">bloc n+1</text>
  <rect x="544" y="60" width="72" height="46" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="580" y="88" font-size="11" fill="var(--texte-doux)" text-anchor="middle">bloc n+2</text>
  <path d="M448 83 L458 83 M532 83 L542 83" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <text x="496" y="126" font-size="10" fill="var(--texte-faible)" text-anchor="middle">répliqué par des milliers de nœuds</text>

  <path d="M600 150 L330 150" stroke="var(--accent)" stroke-width="1.6" fill="none"/>
  <path d="M338 146 L330 150 L338 154 Z" fill="var(--accent)"/>
  <text x="470" y="144" font-size="11" fill="var(--accent)" text-anchor="middle">DÉPÔT — 1 transaction on-chain</text>

  <path d="M330 250 L600 250" stroke="var(--info)" stroke-width="1.6" fill="none"/>
  <path d="M592 246 L600 250 L592 254 Z" fill="var(--info)"/>
  <text x="470" y="244" font-size="11" fill="var(--info)" text-anchor="middle">RETRAIT — 1 transaction on-chain</text>

  <rect x="14" y="222" width="310" height="56" rx="6" fill="var(--fond-alt)" stroke="var(--bordure)"/>
  <text x="26" y="242" font-size="11" fill="var(--texte)">10 achats, 200 ordres annulés, 3 ventes</text>
  <text x="26" y="264" font-size="12" fill="var(--attention)">→ 0 octet écrit sur la blockchain</text>
</svg>
<figcaption>Seules deux opérations traversent la frontière : le dépôt et le retrait. Tout ce qui se passe entre les deux reste une écriture comptable interne.</figcaption>
</figure>

Le parcours complet, dans l'ordre :

1. **Le dépôt.** OKX te donne une adresse de dépôt. Tu y envoies des fonds : c'est une vraie transaction, signée par toi, diffusée sur le réseau, incluse dans un bloc. L'adresse appartient à OKX, pas à toi. Une fois le nombre de confirmations requis atteint, OKX crédite ton solde interne.
2. **Le trade.** Ton ordre entre dans le moteur d'appariement. S'il rencontre un ordre compatible, l'exécution est enregistrée : OKX décrémente une colonne, en incrémente une autre. Aucune signature cryptographique, aucun frais de réseau, aucun TxID. C'est une transaction de base de données, au sens SQL du terme.
3. **Le retrait.** OKX construit une transaction depuis ses propres portefeuilles, la signe avec ses propres clés, et la diffuse. C'est le seul moment où des fonds bougent réellement à cause de toi — et ce n'est pas toi qui signes.

La conséquence est structurelle : **ton solde affiché n'est pas une quantité de bitcoins, c'est une créance sur OKX.** Une ligne dans leur base qui dit qu'ils te doivent ce montant.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> C'est la différence entre un commit local et un commit poussé.
>
> Off-chain, c'est ton dépôt local : tu commites, tu amendes, tu rebases, tu changes d'avis. Rapide, gratuit, réversible — et personne d'autre ne le voit. C'est le moteur d'appariement d'OKX.
>
> On-chain, c'est `git push` vers un dépôt répliqué chez des milliers d'inconnus qui vérifient chaque signature. Lent, coûteux, définitif, et public pour toujours. C'est le dépôt et le retrait.
>
> Deuxième angle, plus proche encore de ton cours : un CEX, c'est une base de données transactionnelle classique avec une file d'ordres devant. Les propriétés ACID viennent du SGBD, pas d'un consensus distribué. Il n'y a ni nœud, ni bloc, ni preuve de travail là-dedans — juste un serveur qui a autorité sur ses propres lignes.

## Exemple chiffré

Un mois d'utilisation typique :

| Action | Nombre | Transactions on-chain |
|---|---|---|
| Dépôt de 0,01 BTC | 1 | 1 |
| Ordres passés | 214 | 0 |
| Ordres annulés | 198 | 0 |
| Exécutions | 16 | 0 |
| Retrait de 500 USDT | 1 | 1 |
| **Total** | **430 opérations** | **2** |

Sur 430 opérations, deux seulement existent en dehors des serveurs d'OKX. Les 428 autres n'ont laissé aucune trace vérifiable par un tiers : elles n'existent que dans les journaux d'OKX, et tu dois les croire sur parole.

Le test décisif : après un achat, cherche un TxID. Il n'y en a pas. Ce n'est pas un oubli d'interface — l'objet n'existe pas.

## Sur OKX

- **Comptes de financement / de trading.** Cette séparation est purement interne. Transférer entre les deux est instantané et gratuit, précisément parce que rien ne bouge sur aucune chaîne.
- **L'historique.** Dans l'historique des retraits et dépôts, chaque ligne porte un TxID cliquable vers un explorateur de blocs. Dans l'historique des ordres, aucune ligne n'en porte. La différence est visible à l'œil nu.
- **OKX Wallet.** C'est un produit différent, non custodial, où les clés sont sur ton appareil. Les deux vivent dans la même application, ce qui entretient la confusion : d'un côté un compte chez un intermédiaire, de l'autre un vrai portefeuille.
- **Le Proof of Reserves** existe précisément parce que les soldes sont off-chain. Si tout était on-chain, il n'y aurait rien à prouver : n'importe qui pourrait vérifier.

## Les pièges

> [!piege] « J'ai acheté du BTC, donc je possède du BTC »
> Tu possèdes une créance libellée en BTC. La différence n'apparaît jamais tant que tout va bien, et devient la seule chose qui compte le jour où l'établissement fait défaut, gèle les retraits, ou se fait pirater. « Not your keys, not your coins » n'est pas un slogan militant, c'est la description exacte du montage juridique et technique.

> [!piege] L'adresse de dépôt n'est pas ton portefeuille
> Elle appartient à OKX. Y envoyer des fonds, c'est les remettre à un tiers. Elle peut être partagée avec d'autres clients, reposer sur un mémo ou un tag pour identifier le destinataire, et changer avec le temps.

> [!piege] Un trade instantané n'est pas un trade « rapide grâce à la blockchain »
> Il est instantané parce qu'il ne touche aucune blockchain. Quand on te vante la rapidité d'un exchange, on te vante la rapidité d'un SGBD.

> [!verifier] Les détails d'implémentation d'OKX ne sont pas publics
> L'architecture décrite ici est celle, standard, de tous les exchanges centralisés, et elle est cohérente avec ce que la documentation API v5 expose. Le fonctionnement interne exact du moteur d'appariement d'OKX, lui, n'est pas documenté publiquement. Sur les points spécifiques à OKX, s'en tenir à leur documentation officielle.

## Pour aller plus loin

- [Custodial vs non-custodial](/okx/custodial-non-custodial) — ce que « garde » veut dire juridiquement
- [Proof of Reserves](/okx/proof-of-reserves) — ce que l'arbre de Merkle prouve, et surtout ce qu'il ne prouve pas
- [Dépôts et retraits](/okx/depots-retraits) — les seules opérations qui traversent la frontière
- [Les fonctions de hachage](/fondamentaux/hachage) — d'où vient le TxID
