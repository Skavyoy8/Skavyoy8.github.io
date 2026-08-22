---
titre: "Les frais chez OKX"
section: "okx"
ordre: 120
resume: "Trois barèmes indépendants qu'on confond en permanence : les frais de trading en pourcentage, les frais de retrait en montant fixe, et les frais de réseau que tu paies à la chaîne sans qu'OKX les voie."
niveau: "intermediaire"
prerequis: ["/okx/on-chain-off-chain", "/okx/depots-retraits"]
termes: ["maker", "taker", "frais-de-trading", "frais-de-retrait", "frais-de-reseau", "liquidite", "carnet-ordres", "rebate", "spread", "palier-vip"]
sources:
  - titre: "OKX — Barème des frais (entité européenne)"
    url: "https://www.okx.com/fees"
  - titre: "OKX Help — Trading Fee Rules FAQ"
    url: "https://www.okx.com/help/trading-fee-rules-faq"
  - titre: "OKX Help — What's OKX VIP and how do I qualify for it?"
    url: "https://www.okx.com/help/whats-okx-vip-and-how-do-i-qualify-for-it"
  - titre: "OKX — API v5, Funding Account (champs fee, wdTickSz, burningFeeRate, dest)"
    url: "https://www.okx.com/docs-v5/en/"
statut: "redige"
---

**Trois barèmes sans rapport entre eux : un pourcentage prélevé par OKX à chaque exécution, un montant fixe prélevé par OKX à chaque retrait, et un coût payé par toi à la blockchain lors d'un dépôt, qu'OKX ne touche jamais.**

## Le problème que ça résout

Un exchange doit couvrir trois coûts de natures complètement différentes.

Faire tourner un moteur d'appariement coûte de l'infrastructure, mais surtout : **un carnet d'ordres vide ne vaut rien**. Il faut que des ordres y soient posés en permanence pour que tu puisses acheter tout de suite. Ce stock d'ordres, c'est la **liquidité**. Elle ne tombe pas du ciel : elle est fournie par des acteurs qui prennent le risque de laisser un ordre en place. Le barème de trading sert autant à rémunérer OKX qu'à payer ces fournisseurs.

Sortir des fonds coûte autre chose : une transaction on-chain, dont le prix dépend de la chaîne et du moment. OKX facture ça séparément, en montant fixe.

Et faire entrer des fonds ne coûte rien à OKX du tout — c'est toi qui paies la chaîne, depuis ton portefeuille, avant même qu'OKX soit au courant.

Trois coûts, trois unités, trois destinataires. L'interface les affiche à trois endroits différents.

<figure class="schema">
<svg viewBox="0 0 640 214" role="img" aria-label="Trois familles de frais : trading et retrait vont à OKX, les frais de réseau du dépôt vont aux mineurs ou validateurs sans passer par OKX">
  <text x="8" y="20" font-size="11" fill="var(--texte-faible)">CE QUE TU PAIES</text>
  <text x="300" y="20" font-size="11" fill="var(--texte-faible)">À OKX</text>
  <text x="470" y="20" font-size="11" fill="var(--texte-faible)">AU RÉSEAU</text>

  <rect x="8" y="34" width="176" height="46" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="18" y="53" font-size="11" fill="var(--texte)">Frais de trading</text>
  <text x="18" y="70" font-size="10" fill="var(--texte-doux)">maker / taker, en %</text>

  <rect x="8" y="94" width="176" height="46" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="18" y="113" font-size="11" fill="var(--texte)">Frais de retrait</text>
  <text x="18" y="130" font-size="10" fill="var(--texte-doux)">montant fixe par chaîne</text>

  <rect x="8" y="154" width="176" height="46" rx="4" fill="var(--fond-2)" stroke="var(--attention)"/>
  <text x="18" y="173" font-size="11" fill="var(--attention)">Frais de réseau du dépôt</text>
  <text x="18" y="190" font-size="10" fill="var(--texte-doux)">gas × prix, énergie × prix</text>

  <path d="M184 57 L296 57 M184 117 L296 117" stroke="var(--texte-faible)" stroke-width="1.4"/>
  <path d="M290 53 L298 57 L290 61 Z M290 113 L298 117 L290 121 Z" fill="var(--texte-faible)"/>

  <rect x="300" y="34" width="118" height="106" rx="4" fill="var(--accent-voile)" stroke="var(--accent)"/>
  <text x="359" y="82" font-size="12" fill="var(--accent)" text-anchor="middle">OKX</text>
  <text x="359" y="100" font-size="9" fill="var(--texte-doux)" text-anchor="middle">encaisse</text>

  <path d="M184 177 L462 177" stroke="var(--attention)" stroke-width="1.4"/>
  <path d="M456 173 L464 177 L456 181 Z" fill="var(--attention)"/>

  <rect x="466" y="154" width="166" height="46" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="549" y="173" font-size="11" fill="var(--texte)" text-anchor="middle">mineurs / validateurs</text>
  <text x="549" y="190" font-size="9" fill="var(--texte-faible)" text-anchor="middle">jamais OKX</text>

  <text x="300" y="177" font-size="10" fill="var(--danger)">OKX ne perçoit rien ici</text>
</svg>
<figcaption>Le troisième flux ne passe pas par OKX. C'est pour ça qu'aucune ligne « frais de dépôt » n'apparaît nulle part dans ton historique : il n'y en a pas.</figcaption>
</figure>

## Comment ça marche

### 1. Frais de trading — maker et taker

Un ordre est **taker** quand il s'exécute immédiatement contre un ordre déjà présent dans le carnet : il *prend* de la liquidité. Il est **maker** quand il ne trouve pas de contrepartie et vient se poser dans le carnet, où il attend : il *fournit* de la liquidité. La documentation d'OKX le formule ainsi : un ordre maker « va dans le carnet avec un prix et une quantité fixés ».

Ce n'est pas le *type* d'ordre qui décide, c'est le *résultat de l'exécution*. Un ordre limite placé exactement au prix du meilleur ordre opposé s'exécute sur-le-champ : il est taker, malgré son nom.

Pourquoi deux tarifs ? Parce que les deux camps ne rendent pas le même service. Le taker consomme le stock et obtient l'exécution immédiate. Le maker constitue le stock, et paie ça d'une incertitude : son ordre peut ne jamais être exécuté, ou l'être au pire moment. OKX facture donc le maker moins cher — et, aux niveaux élevés, le paie.

**Barème spot, entité européenne, relevé le 22 août 2026.** Les seuils sont libellés en euros ; l'onglet correspond aux paires spot hors stablecoins.

| Niveau | Volume 30 j | ou actifs | Maker | Taker |
|---|---|---|---|---|
| Utilisateur régulier | < 1 M€ | < 100 k€ | 0,080 % | 0,100 % |
| VIP 1 | > 1 M€ | > 100 k€ | 0,067 5 % | 0,080 % |
| VIP 2 | > 5 M€ | > 200 k€ | 0,060 % | 0,070 % |
| VIP 3 | > 10 M€ | > 2 M€ | 0,055 % | 0,065 % |
| VIP 4 | > 20 M€ | > 5 M€ | 0,030 % | 0,045 % |
| VIP 5 | > 100 M€ | > 20 M€ | 0,025 % | 0,035 % |
| VIP 6 | > 200 M€ | > 50 M€ | 0,000 % | 0,030 % |
| VIP 7 | > 500 M€ | > 100 M€ | −0,002 % | 0,025 % |
| VIP 8 | > 1 Md€ | > 250 M€ | −0,005 % | 0,020 % |
| VIP 9 | > 5 Md€ | > 500 M€ | −0,005 % | 0,015 % |

Trois choses à lire dans ce tableau.

**Le maker devient négatif.** À partir de VIP 7, OKX *verse* de l'argent au maker. La page d'aide donne l'exemple d'un maker à −0,002 % qui reçoit 0,000 02 BTC sur une transaction de 1 BTC. Ce n'est pas de la générosité : c'est le prix d'achat de la profondeur du carnet.

**Le niveau se prend au mieux-disant.** La documentation d'OKX indique que le palier est attribué à partir du plus favorable des critères — actifs détenus ou volume sur 30 jours — et qu'il s'applique ensuite à toutes les lignes de produits, spot comme dérivés.

**Le premier palier est très loin.** Passer d'« utilisateur régulier » à VIP 1 demande un million d'euros de volume sur 30 jours, ou cent mille euros d'actifs. Pour un compte ordinaire, la seule ligne du tableau qui compte est la première.

**Dans quelle monnaie ?** La FAQ officielle est nette : « Frais = taux × quantité de crypto achetée lors de l'exécution ». Sur un achat de BTC contre USDT, les frais sont prélevés en BTC. Sur une vente, en USDT. Tu reçois toujours un peu moins que ce que le prix affiché laisse croire.

### 2. Frais de retrait — un prix, pas une refacturation

Le champ `fee` de `GET /api/v5/asset/currencies` est décrit comme « le frais de retrait fixe, applicable au retrait on-chain ». Fixe : il ne dépend pas du montant retiré. Il est défini par couple (actif, chaîne), et c'est OKX qui le fixe. Rien n'oblige à ce qu'il corresponde au coût réel de la transaction au moment où elle part.

Autour de ce champ, l'API en expose d'autres qui structurent le retrait : `minWd` et `maxWd` (montants minimum et maximum par transaction), `wdTickSz` (précision décimale du retrait), `wdQuota` (plafond glissant sur 24 h, exprimé en dollars), et `burningFeeRate`, un taux de combustion appliqué à certains actifs en plus des frais.

Le transfert interne échappe à tout ça : la documentation indique que « pour un transfert interne, les frais de transaction sont toujours de 0 ». Logique, puisqu'aucune transaction n'est produite.

### 3. Frais de réseau au dépôt — payés par toi, à la chaîne

Ces frais ne figurent nulle part chez OKX parce qu'ils ne le concernent pas. Ils sont prélevés dans ton portefeuille source, par le protocole, selon une formule propre à chaque chaîne :

```
Bitcoin   : taille de la transaction (vB) × prix du marché (sat/vB)
Ethereum  : gas consommé × (base fee + pourboire)
Tron      : énergie consommée × 100 sun, si tu n'as pas gelé de TRX
```

Conséquence pratique : sur une chaîne à jeton natif, tu dois détenir ce jeton natif pour bouger tes jetons. Un portefeuille rempli d'USDT ERC-20 mais sans ETH est immobile.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> **Le carnet d'ordres est un cache, et OKX facture différemment les écritures et les lectures.**
>
> Un ordre maker écrit une entrée dans le cache : un prix, une quantité, qui restent disponibles jusqu'à ce que quelqu'un les consomme. Un ordre taker fait un *cache hit* : il lit l'entrée et l'invalide dans la foulée.
>
> Un cache vide ne sert à rien — toute requête part alors jusqu'à l'origine, avec la latence que ça implique. C'est pour ça que le tarif d'écriture est plus bas que le tarif de lecture, et devient négatif aux niveaux élevés : OKX **paie** les gros pourvoyeurs pour garnir le cache, exactement comme on préchauffe un cache pour que les premières requêtes ne s'effondrent pas. Le taker paie la latence nulle. Le maker est payé pour accepter l'attente et le risque que son entrée soit consommée au mauvais moment.
>
> Deuxième angle, sur les trois barèmes : c'est un problème de couches. Les frais de réseau sont facturés par le transport, les frais de retrait par l'intermédiaire, les frais de trading par le service applicatif. Les additionner sans distinguer les couches, c'est comme mélanger le coût d'un lien, celui d'un routeur et celui d'un abonnement logiciel dans une seule ligne de facture — ça donne un chiffre, mais plus aucun levier d'analyse.

## Exemple chiffré

Un parcours complet, au prix relevé le 22 août 2026 : `BTC-USDT` à 77 232,70. Compte « utilisateur régulier » : maker 0,080 %, taker 0,100 %.

**Étape 1 — dépôt de 1 000 USDT depuis un portefeuille Tron.**
Coût réseau mesuré pour un transfert USDT TRC-20 : 64 285 unités d'énergie × 100 sun = 6,428 5 TRX, soit **2,21 USDT** à 0,344 23 USDT/TRX. Payé par toi à Tron. OKX encaisse 0.

**Étape 2 — achat de BTC au marché (taker).**

```
1 000 USDT ÷ 77 232,70   = 0,012 947 88 BTC bruts
frais 0,100 % en BTC      = 0,000 012 95 BTC   (= 1,00 USDT)
crédité                   = 0,012 934 94 BTC
```

**Si le même achat avait été exécuté en maker** (0,080 %), les frais auraient été de 0,000 010 36 BTC, soit 0,80 USDT. Écart : 20 centimes sur 1 000 euros engagés.

**L'aller-retour.** Achat puis revente immédiate au même prix, sans que le marché bouge :

| | Taker / taker | Maker / maker |
|---|---|---|
| Reçu final | 998,00 USDT | 998,40 USDT |
| Coût du passage | 2,00 USDT | 1,60 USDT |
| En pourcentage | 0,200 % | 0,160 % |

Un aller-retour coûte deux fois le taux, parce que le taux s'applique à chaque exécution. À prix inchangé, tu ressors avec moins que tu n'as mis : ce n'est pas une anomalie, c'est la définition d'une commission.

**Étape 3 — retrait des 0,012 934 94 BTC on-chain.**
Sur la valeur d'exemple publiée dans la documentation v5 pour la chaîne `BTC-Bitcoin`, le frais fixe est de 0,000 05 BTC, soit **3,86 USDT**.

Comparons au coût réel de cette transaction sur le réseau au même instant. Le marché des frais Bitcoin est à 1 sat/vB ; une transaction P2WPKH à une entrée et deux sorties pèse environ 140 vB :

```
coût réseau réel   :   140 sats  = 0,108 USDT
frais prélevé      : 5 000 sats  = 3,861 USDT
rapport            : 35,7×
```

**Le frais de retrait n'est pas une refacturation du coût réseau.** C'est un prix, fixé à l'avance, qui doit couvrir le coût moyen sur une longue période — y compris les épisodes de congestion où le réseau coûte cent fois plus cher qu'aujourd'hui. Sur un marché calme, l'écart est brutal.

**Total du parcours.**

| Poste | Destinataire | Montant |
|---|---|---|
| Frais de réseau du dépôt | Tron | 2,21 USDT |
| Frais de trading (taker) | OKX | 1,00 USDT |
| Frais de retrait | OKX | 3,86 USDT |
| **Total** | | **7,07 USDT** |

Soit 0,71 % de la somme de départ, dont un seul euro rémunère le moteur d'appariement. **Les frais de retrait représentent 55 % du coût total du parcours.** C'est l'inverse de l'intuition, et c'est structurel : les frais de trading sont proportionnels, les frais de retrait ne le sont pas. Plus le montant est petit, plus le retrait pèse.

> [!verifier] Les barèmes changent, et ils ne sont pas les mêmes partout
> Le tableau des frais de trading ci-dessus est un relevé du 22 août 2026 sur [okx.com/fees](https://www.okx.com/fees), page servie pour l'entité européenne, seuils en euros. Les autres entités d'OKX ont des grilles différentes, et OKX publie régulièrement des avis d'ajustement. Le frais de retrait de 0,000 05 BTC est la **valeur d'exemple** de la [documentation v5](https://www.okx.com/docs-v5/en/), pas un relevé en direct : l'endpoint `GET /api/v5/asset/currencies` qui expose le champ `fee` exige une clé API et renvoie l'erreur `50103` sans en-tête `OK-ACCESS-KEY`. Avant tout calcul, relis le montant affiché dans l'écran de retrait.

## Sur OKX

- **Ton niveau.** Il est affiché sur la page des frais et dans les paramètres du compte. Par API, `GET /api/v5/account/trade-fee` renvoie tes taux effectifs, mais c'est un endpoint privé.
- **Le détail par ordre.** L'historique des ordres porte une colonne « Frais », libellée dans la devise reçue. C'est le seul endroit où tu vois le montant réellement prélevé, exécution par exécution.
- **Pas de palier fondé sur OKB dans le barème européen.** Sur la grille servie à l'entité européenne, les seuils sont exprimés uniquement en volume de trading sur 30 jours et en actifs détenus ; aucun niveau n'y est conditionné à la détention du jeton OKB. D'autres entités d'OKX pratiquent d'autres structures.
- **Un barème séparé pour les paires de stablecoins.** La page des frais comporte un onglet distinct pour ces paires. Les taux n'y sont pas les mêmes que sur le tableau ci-dessus.
- **Les dérivés ont leur propre grille.** Futures et perpétuels sont sur un onglet à part, avec des taux différents — et un mécanisme de coût supplémentaire qui n'a rien à voir avec une commission, le funding rate.

## Les pièges

> [!piege] Un ordre limite n'est pas forcément un ordre maker
> C'est le résultat de l'exécution qui tranche, pas l'intitulé de l'ordre. Un ordre limite posé au prix du meilleur ordre opposé s'exécute instantanément et sera facturé au taux taker. Pour être maker, il faut que l'ordre n'ait *pas* pu s'exécuter à son arrivée.

> [!piege] Frais de retrait ≠ frais de réseau
> Le montant prélevé par OKX est fixe et décidé par OKX. Le coût réel de la transaction varie en continu avec la congestion de la chaîne. Les deux se croisent parfois, coïncident rarement, et l'écart peut aller dans les deux sens : très défavorable quand le réseau est calme, favorable en pleine congestion.

> [!piege] Il n'y a pas de « frais de dépôt »
> Cherche cette ligne dans ton historique OKX, elle n'existe pas. Le coût du dépôt a été prélevé dans le portefeuille émetteur, avant l'arrivée. Corollaire : si tu envoies exactement tout ton solde, la transaction échoue faute de jeton natif pour payer les frais.

> [!piege] « Zéro frais de trading » ne veut pas dire « gratuit »
> OKX présente son service Convert comme sans frais de trading et sans slippage. Sans commission affichée, la rémunération se déplace ailleurs : dans le **spread**, c'est-à-dire l'écart entre le prix ferme qu'on te propose et le prix du carnet au même instant. Un coût qui ne figure sur aucune ligne reste un coût. La seule façon de le mesurer est de relever les deux prix en même temps.

## Pour aller plus loin

- [Dépôts et retraits](/okx/depots-retraits) — la file d'attente et le portefeuille chaud derrière le frais fixe
- [Le choix du réseau](/okx/choix-du-reseau) — pourquoi le coût réseau varie d'un facteur 100 selon la chaîne
- [On-chain vs off-chain](/okx/on-chain-off-chain) — pourquoi le trade ne coûte rien à la blockchain
- [Le carnet d'ordres](/marches/carnet-ordres) — le stock que maker et taker alimentent et consomment
- [Le spread](/marches/spread) — le coût qui ne s'affiche jamais comme un frais
