---
titre: "Les frais de réseau"
section: "fondamentaux"
ordre: 130
resume: "Une enchère permanente pour un espace de bloc limité. Sur Ethereum, le prix est même piloté par un asservissement qui vise 50 % de remplissage."
niveau: "intermediaire"
prerequis: ["/commencer/cest-quoi-une-blockchain"]
termes: ["frais-de-reseau", "gas", "satoshi", "confirmation", "empreinte"]
sources:
  - titre: "EIP-1559 — Fee market change for ETH 1.0 chain"
    url: "https://eips.ethereum.org/EIPS/eip-1559"
  - titre: "BIP 141 — Segregated Witness (unités de poids)"
    url: "https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki"
  - titre: "mempool.space — frais recommandés en direct"
    url: "https://mempool.space/api/v1/fees/recommended"
statut: "redige"
---

**Les frais de réseau sont le prix d'une enchère : l'espace dans un bloc est limité, et les transactions qui paient le mieux passent en premier.**

## Le problème que ça résout

Un bloc a une taille bornée. Sans coût d'entrée, n'importe qui pourrait le saturer de transactions inutiles pour quelques centimes, et bloquer tout le monde.

Les frais règlent deux choses d'un coup : ils rationnent l'accès à une ressource rare, et ils rémunèrent ceux qui produisent les blocs — d'autant plus que la récompense d'émission diminue de moitié à chaque halving.

## Comment ça marche

**Bitcoin** facture à la **taille**, pas au montant. Envoyer 10 BTC ou 0,001 BTC coûte la même chose si les deux transactions occupent le même espace. On paie en satoshis par unité de poids virtuel (`sat/vB`), et les mineurs servent les plus offrants.

**Ethereum** facture au **travail de calcul**, mesuré en `gas`. Depuis EIP-1559, le prix se décompose en deux :

- une **base fee** imposée par le protocole, identique pour tous dans le bloc, et **détruite** ;
- un **pourboire** libre, qui va au validateur.

La base fee n'est pas fixée par un marché d'enchères : elle est recalculée à chaque bloc en fonction du remplissage du précédent. Bloc plus qu'à moitié plein, elle monte ; moins qu'à moitié, elle descend.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> La base fee d'EIP-1559 est un **asservissement**. La consigne est 50 % de remplissage de bloc, la grandeur mesurée est le remplissage réel, l'actionneur est le prix, et le correcteur ajuste d'au plus 12,5 % par bloc pour éviter l'oscillation.
>
> C'est un régulateur proportionnel, avec sa constante de temps et son amortissement. Et comme tout asservissement, il ne tient la consigne qu'en moyenne : sur un bloc donné le remplissage s'écarte, c'est l'intégration dans le temps qui converge.
>
> Le mécanisme Bitcoin, lui, n'est pas asservi du tout : c'est une enchère pure, en boucle ouverte, et ça se voit à la nervosité de ses frais.

## Exemple chiffré

Relevés réels du 22 août 2026.

**Bitcoin.** Frais recommandés : 2 sat/vB pour la file rapide, 1 sat/vB pour l'économique. Une transaction segwit courante pèse environ 141 unités de poids virtuel :

```
141 vo × 2 sat/vB = 282 sat = 0,00000282 BTC ≈ 0,22 USDT
```

**Ethereum.** Bloc 25 813 438, base fee mesurée à **0,0940 gwei**. Un transfert simple consomme exactement 21 000 gas :

```
21 000 × 0,0940 gwei = 0,00000197 ETH ≈ 0,0048 USDT
```

Le transfert Bitcoin coûte donc environ **46 fois** le transfert Ethereum à cet instant. Ce rapport n'a rien de stable : il dépend de l'encombrement des deux chaînes et s'inverse régulièrement.

**La vérification qui vaut le détour.** Ce même bloc affichait `gasUsed = 29 956 386` pour un `gasLimit = 60 000 000`, soit **49,9 % de remplissage**. La consigne de l'asservissement est 50 %. Le régulateur fait exactement ce qu'il annonce, et on peut le constater sur un bloc pris au hasard.

## Sur OKX

Trois coûts distincts se confondent facilement, et un seul est un frais de réseau :

- **Les frais de trading** vont à OKX. Aucun rapport avec une chaîne.
- **Les frais de retrait** sont fixés par OKX. Ils couvrent le coût réseau, avec une marge, et ne suivent pas les variations du moment.
- **Les frais de dépôt** sont de vrais frais de réseau, payés par toi à la chaîne quand tu envoies vers ton adresse de dépôt. OKX n'en voit pas la couleur.

## Les pièges

> [!piege] Les frais ne dépendent pas du montant
> Sur Bitcoin, ils dépendent de la taille de la transaction en octets, donc du nombre d'entrées consommées. Un portefeuille rempli de petites sorties coûte plus cher à vider qu'un portefeuille avec une seule grosse — à montant identique.

> [!piege] La base fee est brûlée, pas encaissée
> Elle disparaît de la circulation. Le validateur ne touche que le pourboire. C'est pour ça qu'un pic d'activité sur Ethereum détruit des ETH.

> [!piege] Payer plus ne fait pas passer plus vite quand la file est vide
> Si le mempool est dégarni, la transaction au tarif minimum entre dans le prochain bloc comme les autres. Surpayer n'a d'effet qu'en période d'encombrement.

## Pour aller plus loin

- [Mempool et confirmations](/fondamentaux/mempool) — la file d'attente où se joue l'enchère
- [Le choix du réseau](/okx/choix-du-reseau) — pourquoi le même USDT coûte des sommes très différentes selon la chaîne
- [Les frais chez OKX](/okx/frais) — ceux qui ne sont pas des frais de réseau
