---
titre: "Adresses et sommes de contrôle"
section: "fondamentaux"
ordre: 50
resume: "Une adresse dérive d'une clé publique par hachage, et embarque une somme de contrôle qui fait rejeter les fautes de frappe au lieu d'envoyer les fonds dans le vide."
niveau: "intermediaire"
prerequis: ["/fondamentaux/hachage"]
termes: ["adresse", "bech32", "base58check", "keccak", "empreinte", "chain-id"]
sources:
  - titre: "BIP 173 — Bech32, format d'adresse et somme de contrôle"
    url: "https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki"
  - titre: "EIP-55 — Mixed-case checksum address encoding"
    url: "https://eips.ethereum.org/EIPS/eip-55"
  - titre: "Bitcoin Developer Reference — Transactions"
    url: "https://developer.bitcoin.org/reference/transactions.html"
statut: "redige"
---

**Une adresse est une clé publique passée à la moulinette de plusieurs fonctions de hachage, puis encodée avec une somme de contrôle qui rend les fautes de frappe détectables.**

## Le problème que ça résout

Deux problèmes, en fait.

Le premier : une clé publique brute est longue et, sur certaines constructions, la publier avant d'avoir dépensé expose plus de surface que nécessaire. On la hache, ce qui la raccourcit et ajoute une couche.

Le second est plus concret. Sur une blockchain, une transaction envoyée à une adresse mal recopiée est perdue définitivement : personne ne détient la clé correspondante, il n'y a ni retour à l'envoyeur ni service de réclamation. Sans garde-fou, une seule touche de travers coûte l'intégralité du montant.

D'où une somme de contrôle intégrée à l'adresse elle-même. Le logiciel refuse d'envoyer avant d'avoir essayé.

## Comment ça marche

Sur Bitcoin, l'adresse dérive de la clé publique par deux hachages successifs — SHA-256 puis RIPEMD-160 — avant encodage. Sur Ethereum, on prend les vingt derniers octets du Keccak-256 de la clé publique.

Les formats d'encodage se sont succédé :

| Format | Où | Somme de contrôle |
|---|---|---|
| Base58Check | Bitcoin historique (`1…`, `3…`) | 4 octets ajoutés à la fin |
| Bech32 | Bitcoin segwit (`bc1…`) | 6 caractères, code BCH |
| Hexadécimal brut | Ethereum (`0x…`) | aucune |
| EIP-55 | Ethereum en pratique | **la casse des lettres** |

La ligne EIP-55 est la plus astucieuse du tableau. Une adresse Ethereum n'avait aucune protection : quarante caractères hexadécimaux, une faute de frappe donnait une autre adresse parfaitement valide. Plutôt que d'allonger le format et de casser la compatibilité, EIP-55 fait porter l'information par **la casse** : on hache l'adresse en minuscules, et chaque lettre passe en majuscule si le chiffre correspondant du hachage vaut 8 ou plus.

Un logiciel ancien voit une adresse hexadécimale ordinaire et l'accepte. Un logiciel récent vérifie la casse et rejette. Compatibilité ascendante totale, zéro caractère ajouté.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> C'est un CRC, exactement au même endroit de la chaîne et pour la même raison. Une trame Ethernet corrompue est jetée plutôt que remontée à la couche supérieure ; une adresse mal saisie est rejetée plutôt qu'utilisée.
>
> Même principe que le dernier chiffre d'un IBAN ou d'un numéro de sécurité sociale : de la redondance calculée sur le reste, qui ne corrige rien mais qui détecte. La seule différence, ici, c'est le prix d'une détection manquée.

## Exemple chiffré

**Bech32, sur le vecteur de test du BIP 173.** On vérifie la somme de contrôle, puis on modifie un seul caractère :

```
bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4   -> valide
bc1qw508d6qejxtdg4y5y3zarvary0c5xw7kv8f3t4   -> REJETÉE
```

Le `r` en vingt et unième position est devenu un `y`. Le code BCH ne tombe plus juste, et aucun portefeuille n'acceptera d'envoyer.

**EIP-55, sur le contrat Tether d'Ethereum.** On part de l'adresse tout en minuscules, on calcule son Keccak-256, et on remet en majuscule chaque lettre dont le chiffre correspondant vaut 8 ou plus :

```
minuscules  0xdac17f958d2ee523a2206206994597c13d831ec7
EIP-55      0xdAC17F958D2ee523a2206206994597C13D831ec7
```

La seconde forme est exactement celle que publie Tether et qu'affichent les explorateurs. Rien d'autre n'a changé que la casse de sept lettres — et c'est cette casse qui porte la somme de contrôle.

> [!info] Vérifier l'implémentation avant de vérifier l'adresse
> Le Keccak-256 d'Ethereum **n'est pas** SHA3-256, malgré leur parenté. Les deux diffèrent d'un octet de remplissage, et donnent des empreintes entièrement différentes. Le calcul ci-dessus a été validé contre le vecteur de test officiel : `keccak256("")` doit donner `c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470`. Une bibliothèque qui répond autre chose calcule du SHA-3.

## Sur OKX

Le champ d'adresse de retrait valide la somme de contrôle avant de laisser continuer. C'est ce qui bloque une faute de frappe — mais rien d'autre.

En particulier, il ne peut pas détecter que tu as collé une adresse **valide** appartenant à quelqu'un d'autre, ni qu'elle appartient à une autre chaîne. La somme de contrôle protège du bruit, pas de l'erreur de destinataire.

## Les pièges

> [!piege] Une adresse valide sur deux chaînes n'est pas la même adresse
> Le format d'adresse EVM est identique sur Ethereum, BNB Chain, Polygon et les autres. La même chaîne de caractères y est valide partout, mais ce sont des registres distincts. C'est le sujet entier du [choix du réseau](/okx/choix-du-reseau).

> [!piege] La somme de contrôle ne corrige pas, elle détecte
> Aucun logiciel ne « répare » une adresse. Il refuse, c'est tout.

> [!piege] Une adresse n'est pas un compte
> Elle ne contient rien et n'a pas de solde propre sur Bitcoin : ce sont les sorties de transaction qui lui sont associées. Elle n'a pas non plus besoin d'être créée quelque part — elle existe dès qu'on peut la calculer.

## Pour aller plus loin

- [Les fonctions de hachage](/fondamentaux/hachage) — les briques de la dérivation
- [Le choix du réseau](/okx/choix-du-reseau) — pourquoi une adresse valide peut quand même perdre tes fonds
