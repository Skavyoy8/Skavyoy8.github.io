---
titre: "C'est quoi la crypto ?"
section: "commencer"
ordre: 10
resume: "Un journal de transactions répliqué sur des milliers de machines, dont l'ordre des écritures est décidé sans serveur d'autorité."
niveau: "bases"
termes: []
sources:
  - titre: "Satoshi Nakamoto — Bitcoin: A Peer-to-Peer Electronic Cash System"
    url: "https://bitcoin.org/bitcoin.pdf"
statut: "redige"
---

**Une crypto, c'est un journal de transactions répliqué sur des milliers de machines indépendantes, dont l'ordre des écritures est décidé sans serveur d'autorité.**

## Le problème que ça résout

Une banque, c'est une base de données avec un propriétaire. Elle seule écrit dedans, et tu n'as aucun moyen de vérifier ce qu'elle y met.

Répliquer cette base sur des milliers de machines règle la vérification : chacun détient l'historique complet, lisible par n'importe qui depuis 2009.

Mais ça crée le vrai problème, et c'est le seul qui compte : **sans autorité centrale, qui décide de l'ordre des écritures ?**

Si j'émets deux transactions contradictoires — les mêmes fonds vers deux destinataires — et que je les injecte simultanément à deux endroits du réseau, les deux sont valides prises isolément. Il faut trancher, sans que personne n'ait le dernier mot.

Toute la technique de la crypto découle de là. C'est un problème de consensus distribué, pas un problème de finance.

## Trois conséquences directes

- **Aucun solde n'est stocké.** Un solde se recalcule en rejouant les transactions, comme un état dérivé d'un journal d'événements.
- **Rien n'est secret.** L'intégralité du journal est publique. La confidentialité n'a jamais fait partie du cahier des charges.
- **Ce n'est pas anonyme, c'est pseudonyme.** Les écritures portent des adresses au lieu d'identités, mais elles se chaînent et s'analysent.

## Un transfert, étape par étape

Tu envoies 0,01 BTC :

1. Ton portefeuille construit la transaction et la **signe** avec ta clé privée — au sens exact où tu signes un commit ou t'authentifies en SSH.
2. Il la diffuse à ses pairs, qui la propagent de proche en proche. En quelques secondes elle a fait le tour du réseau.
3. Une dizaine de minutes plus tard, elle est incluse dans un bloc et devient très coûteuse à annuler.

Aucune autorisation demandée à personne. Aucun tiers dans la boucle.

## La suite

- [C'est quoi une blockchain ?](/commencer/cest-quoi-une-blockchain) — la structure de données qui rend le journal infalsifiable
- [Ce qui se passe quand tu achètes sur OKX](/commencer/acheter-sur-okx) — et pourquoi ça n'a rien à voir avec ce qui précède
