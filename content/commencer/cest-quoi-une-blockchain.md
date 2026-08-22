---
titre: "C'est quoi une blockchain ?"
section: "commencer"
ordre: 20
resume: "Le cahier de comptes, découpé en pages numérotées que personne ne peut modifier après coup."
niveau: "bases"
prerequis: ["/commencer/cest-quoi-la-crypto"]
termes: ["empreinte"]
sources:
  - titre: "Satoshi Nakamoto — Bitcoin, le document d'origine"
    url: "https://bitcoin.org/bitcoin.pdf"
  - titre: "mempool.space — état de la chaîne Bitcoin en direct"
    url: "https://mempool.space"
statut: "redige"
---

**Une blockchain, c'est le cahier de comptes découpé en pages numérotées, enchaînées de façon qu'on ne puisse pas en modifier une sans casser toutes les suivantes.**

## Le problème

Un cahier recopié partout, d'accord. Mais comment tu sais que personne n'a gommé une ligne d'il y a trois mois ?

## Comment on l'empêche

Les lignes sont regroupées par paquets : les **blocs**. Environ 3 000 lignes par bloc sur Bitcoin, un nouveau bloc toutes les dix minutes.

Chaque bloc contient une **empreinte** du bloc précédent : un petit code calculé à partir de tout son contenu.

Si tu modifies une seule ligne dans un vieux bloc, son empreinte change. Du coup le bloc suivant ne correspond plus. Du coup celui d'après non plus. **Toute la suite se casse d'un coup, et tout le monde le voit.**

C'est de là que vient le nom : une chaîne (*chain*) de blocs (*block*).

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> L'empreinte, c'est le `sha256sum` que tu lances après avoir téléchargé une ISO. Le site publie un code, tu le recalcules chez toi, tu compares. Si un seul octet a bougé en route, les deux codes n'ont plus rien à voir.
>
> Une blockchain fait exactement ça, mais en continu et sur tout son historique.

## Pourquoi personne ne triche

Réécrire un vieux bloc ne suffit pas. Il faudrait aussi refaire tous les blocs suivants — et plus vite que le reste du monde, qui continue d'en ajouter pendant ce temps.

Ça demande tellement d'électricité que ça coûterait bien plus cher que ce qu'on pourrait voler.

Donc « immuable » ne veut pas dire « mathématiquement impossible à changer ». Ça veut dire **« trop cher pour que ça vaille le coup »**. La nuance compte.

## Un exemple

Au moment où j'écris, la chaîne Bitcoin en est à son bloc numéro **963634**.

Chacun contient l'empreinte du précédent, sans interruption depuis le premier, le 3 janvier 2009. Pour changer une ligne écrite l'an dernier, il faudrait refaire des dizaines de milliers de blocs.

## La suite

- [Ce qui se passe quand tu achètes sur OKX](/commencer/acheter-sur-okx)
- [Les fonctions de hachage](/fondamentaux/hachage) — la version détaillée de l'empreinte, quand tu voudras creuser
