---
titre: "Deux façons de compter"
section: "chaines"
ordre: 60
resume: "Bitcoin fonctionne comme des espèces, Ethereum comme un compte bancaire. Ça change beaucoup de choses en pratique."
niveau: "intermediaire"
prerequis: ["/fondamentaux/transaction"]
termes: ["utxo", "evm", "frais-de-reseau"]
sources:
  - titre: "Documentation technique de Bitcoin — les transactions"
    url: "https://developer.bitcoin.org/reference/transactions.html"
  - titre: "Documentation officielle d'Ethereum — les comptes"
    url: "https://ethereum.org/en/developers/docs/accounts/"
statut: "redige"
---

**Bitcoin ne stocke aucun solde : il tient la liste des sommes reçues et non dépensées. Ethereum tient au contraire un solde par adresse, mis à jour à chaque opération.**

## Le modèle Bitcoin : des espèces

Il n'existe nulle part une case indiquant combien tu possèdes. Il existe une liste de sommes qui te sont parvenues et que tu n'as pas encore dépensées.

Pour payer, tu dois consommer une ou plusieurs de ces sommes **en entier**, et te renvoyer la différence. Exactement comme un billet de 20 € qu'on ne peut pas couper pour payer 7 €.

Ton solde est donc un calcul, pas une donnée.

## Le modèle Ethereum : un compte

Chaque adresse a un solde enregistré. Une transaction le diminue d'un côté, l'augmente de l'autre.

C'est plus proche de l'intuition bancaire, et beaucoup plus simple à manipuler pour des programmes — ce qui était nécessaire, puisque Ethereum devait faire tourner des contrats.

## Ce que ça change concrètement

| | Bitcoin | Ethereum |
|---|---|---|
| Ton solde | calculé à partir des sommes reçues | lu directement |
| Frais d'un envoi | dépendent du **nombre de sommes** consommées | dépendent du travail demandé |
| Vider un portefeuille plein de petits restes | cher | même prix que d'habitude |
| Deux envois en même temps | possible | non, ils s'exécutent l'un après l'autre |
| Confidentialité | un peu meilleure, on peut changer d'adresse à chaque fois | moins bonne, l'adresse est réutilisée |

> [!exemple] Pourquoi une transaction Bitcoin coûte parfois cher sans raison apparente
> Si tu as reçu cent fois 5 €, tu détiens 500 €. Mais pour envoyer 400 €, il faut consommer quatre-vingts sommes distinctes.
>
> La transaction devient longue, donc lourde, donc chère — alors que le montant est modeste. Sur Ethereum, ce problème n'existe pas.

## L'ordre des opérations sur Ethereum

Chaque compte Ethereum a un compteur qui numérote ses transactions : 0, 1, 2, et ainsi de suite.

Le réseau les exécute strictement dans cet ordre. Si la transaction numéro 5 reste bloquée parce qu'elle paie trop peu, **les numéros 6 et 7 attendent**, même si elles paient bien.

C'est la cause la plus fréquente de portefeuille apparemment figé. La solution consiste à renvoyer la transaction bloquée avec des frais plus élevés, ce que les applications proposent sous le nom « accélérer » ou « annuler ».

Sur Bitcoin, il n'y a pas d'ordre imposé : chaque transaction est indépendante.

## Ce qu'il faut savoir

> [!piege] Aucun des deux modèles n'est meilleur
> Ce sont des compromis différents. Le modèle Bitcoin se vérifie plus simplement et se prête mieux au changement d'adresse. Le modèle Ethereum est indispensable pour faire tourner des programmes.

> [!piege] La monnaie rendue n'est pas suspecte
> En consultant une transaction Bitcoin, on voit souvent une seconde sortie vers une adresse inconnue. C'est ta propre monnaie, renvoyée vers une nouvelle adresse de ton portefeuille.

> [!piege] Sur Ethereum, l'adresse est réutilisée
> Toute ton activité est donc regroupée sous un même identifiant, indéfiniment. C'est bien plus facile à suivre qu'une succession d'adresses Bitcoin.

## Pour aller plus loin

- [Anatomie d'une transaction](/fondamentaux/transaction) — le détail des entrées et sorties
- [Ethereum](/chaines/ethereum) — pourquoi ce modèle était nécessaire
