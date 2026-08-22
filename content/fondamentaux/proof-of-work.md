---
titre: "Proof of Work"
section: "fondamentaux"
ordre: 90
resume: "Chercher un nombre au hasard jusqu'à ce que l'empreinte du bloc passe sous une cible. Le coût de cette recherche est ce qui protège la chaîne."
niveau: "intermediaire"
prerequis: ["/fondamentaux/hachage", "/commencer/cest-quoi-une-blockchain"]
termes: ["proof-of-work", "difficulte", "empreinte", "sha-256", "coinbase", "halving"]
sources:
  - titre: "Satoshi Nakamoto — Bitcoin: A Peer-to-Peer Electronic Cash System"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "Bitcoin Developer Reference — Block Chain"
    url: "https://developer.bitcoin.org/reference/block_chain.html"
  - titre: "mempool.space — difficulté et hashrate en direct"
    url: "https://mempool.space"
statut: "redige"
---

**Le minage consiste à faire varier un nombre dans l'en-tête d'un bloc jusqu'à ce que l'empreinte de cet en-tête tombe sous une valeur cible. Il n'existe aucune méthode plus rapide que d'essayer.**

## Le problème que ça résout

Sans autorité centrale, il faut un moyen de désigner qui écrit le prochain bloc, et surtout de rendre coûteuse la réécriture du passé.

Voter ne marche pas : on peut créer autant d'identités qu'on veut. Il faut adosser le droit d'écrire à une ressource qu'on ne peut pas fabriquer gratuitement. La preuve de travail choisit le calcul, donc l'électricité.

## Comment ça marche

L'en-tête d'un bloc contient un champ libre, le **nonce**. Le mineur l'incrémente et recalcule l'empreinte de l'en-tête à chaque essai, jusqu'à en obtenir une inférieure à la cible fixée par la **difficulté**.

Comme l'empreinte se comporte comme un tirage aléatoire — c'est l'effet avalanche — il n'existe aucun raccourci. Pas de gradient à suivre, pas de solution partielle à améliorer. Le seul algorithme connu est la force brute.

Vérifier, en revanche, coûte un seul calcul. Cette asymétrie entre trouver et vérifier est tout le mécanisme.

La difficulté se réajuste tous les 2 016 blocs pour maintenir un rythme d'environ dix minutes par bloc, quelle que soit la puissance branchée sur le réseau.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> C'est une attaque par force brute sur un hachage — sauf qu'ici, c'est le fonctionnement légitime du système.
>
> Un mot de passe haché se casse en essayant des entrées jusqu'à retomber sur l'empreinte connue ; un bloc se mine en essayant des nonces jusqu'à obtenir une empreinte qui commence par assez de zéros. Même boucle, même absence de raccourci, mêmes contre-mesures — augmenter le coût unitaire d'un essai revient exactement à monter la difficulté.
>
> La différence est le sens du signe : en sécurité offensive on cherche à réduire ce coût, en minage on le paie volontairement parce que c'est lui qui achète la sécurité.

## Exemple chiffré

D'abord en local, pour rendre la chose tangible. On cherche une empreinte SHA-256 commençant par un nombre croissant de zéros :

```python
import hashlib
base = b"Registre bloc test "
n = 0
while not hashlib.sha256(base + str(n).encode()).hexdigest().startswith("0000"):
    n += 1
```

Résultats réels sur cette machine :

| Zéros exigés | Essais réels | Temps | Essais attendus (16ⁿ) |
|---|---|---|---|
| 2 | 540 | < 0,01 s | 256 |
| 3 | 740 | < 0,01 s | 4 096 |
| 4 | 48 333 | 0,09 s | 65 536 |
| 6 | 21 563 103 | 34,1 s | 16 777 216 |

Chaque zéro hexadécimal supplémentaire multiplie par 16 le travail attendu. Les essais réels collent aux valeurs théoriques : c'est bien un tirage aléatoire.

Maintenant l'échelle réelle. Difficulté relevée le 22 août 2026 : **1,275 × 10¹⁴**. Le nombre d'essais attendus pour un bloc vaut difficulté × 2³² :

```
5,476 × 10²³ essais attendus par bloc
```

Cette machine a soutenu 632 720 essais par seconde. Il lui faudrait donc :

```
5,476e23 / 632 720 = 8,7 × 10¹⁷ secondes ≈ 27 milliards d'années
```

Le réseau, lui, tourne à 913,7 EH/s, soit 9,137 × 10²⁰ essais par seconde :

```
5,476e23 / 9,137e20 = 599 secondes
```

**599 secondes, c'est-à-dire dix minutes.** Le calcul retombe exactement sur le rythme visé par le protocole, ce qui confirme au passage que les trois valeurs relevées sont cohérentes entre elles.

Le réseau est environ 1,4 × 10¹⁵ fois plus rapide que cette machine. C'est le chiffre qui explique pourquoi personne ne mine seul depuis quinze ans.

## Sur OKX

Rien, directement : le minage n'a aucune contrepartie dans l'interface d'un exchange. La preuve de travail intervient ailleurs — c'est elle qui rend un dépôt irréversible au bout de quelques blocs, et c'est pour ça qu'OKX attend un nombre de confirmations donné avant de créditer un compte.

## Les pièges

> [!piege] Le mineur ne « résout » pas de problème utile
> On lit souvent que les mineurs résolvent des « problèmes mathématiques complexes ». Il n'y a aucun problème et aucune complexité : c'est un tirage répété jusqu'à obtenir un résultat sous un seuil. L'inutilité du calcul est délibérée — c'est ce qui garantit qu'on ne peut pas prendre de raccourci.

> [!piege] La difficulté ne dit rien du prix
> Elle s'ajuste sur le temps de bloc observé, uniquement. Un ajustement à la hausse signale que de la puissance de calcul est arrivée, rien d'autre.

> [!piege] Le nonce du minage n'est pas celui d'Ethereum
> Deux objets sans rapport qui portent le même nom. Ici c'est un compteur d'essais dans un en-tête de bloc ; sur un compte Ethereum, c'est un numéro de séquence qui ordonne tes transactions.

## Pour aller plus loin

- [Les fonctions de hachage](/fondamentaux/hachage) — pourquoi il n'existe pas de raccourci
- [Bitcoin (BTC)](/cryptos/btc) — l'émission que ce travail rémunère
- [C'est quoi une blockchain ?](/commencer/cest-quoi-une-blockchain) — ce que ce coût protège
