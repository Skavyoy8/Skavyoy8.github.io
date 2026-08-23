---
titre: "Le staking (Proof of Stake)"
section: "fondamentaux"
ordre: 100
resume: "L'autre façon de sécuriser un réseau : au lieu de dépenser de l'électricité, on immobilise de l'argent qu'on peut perdre en cas de triche."
niveau: "bases"
prerequis: ["/fondamentaux/proof-of-work"]
termes: ["proof-of-work", "confirmation"]
sources:
  - titre: "Documentation officielle d'Ethereum — la preuve d'enjeu"
    url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/"
  - titre: "Documentation officielle d'Ethereum — le staking"
    url: "https://ethereum.org/en/staking/"
statut: "redige"
---

**Au lieu de dépenser de l'électricité pour gagner le droit d'écrire, on immobilise une somme en garantie. Tricher fait perdre cette garantie.**

## Pourquoi ça existe

Le minage protège le réseau en rendant l'écriture coûteuse. Ça fonctionne, mais ça consomme énormément.

L'idée du Proof of Stake est de remplacer la dépense d'énergie par une **mise en jeu**. Pour participer, il faut immobiliser une somme dans le réseau. Si l'on essaie de tricher, cette somme est détruite, en tout ou partie.

Le raisonnement est le même dans les deux cas : rendre la triche plus coûteuse que le gain espéré. Seule la nature du coût change — de l'électricité brûlée d'un côté, un capital immobilisé de l'autre.

## Comment ça marche

Ceux qui participent s'appellent des **validateurs**. Ils immobilisent une somme, et le réseau en désigne un régulièrement, plus ou moins au hasard, pour proposer le bloc suivant. Les autres vérifient et approuvent.

Un validateur honnête reçoit une petite rémunération. Un validateur qui tente de valider deux versions contradictoires, ou qui reste indisponible, perd une partie de sa mise — c'est ce qu'on appelle le *slashing*.

Ethereum fonctionne ainsi depuis 2022. Il faut 32 ethers pour être validateur seul, ce qui représente une somme importante ; c'est pourquoi la plupart des gens passent par un service qui met en commun les mises de plusieurs participants.

## La différence qui compte : la finalité

Sur Bitcoin, une transaction n'est jamais définitive à 100 %. Elle devient simplement de plus en plus coûteuse à annuler, bloc après bloc. C'est probabiliste.

Sur Ethereum, au bout d'un certain nombre de blocs, l'état devient **finalisé** : le revenir en arrière exigerait de détruire une part énorme des sommes immobilisées. C'est une garantie de nature différente, et plus forte à ce stade.

> [!exemple] Deux façons de garantir
> Le minage, c'est payer une facture d'électricité pour avoir le droit d'écrire. Si tu triches, tu as brûlé ton argent pour rien.
>
> Le staking, c'est laisser une caution. Si tu triches, la caution est saisie.
>
> Dans les deux cas, la question posée à l'attaquant est la même : combien ça te coûte, et combien ça te rapporte ?

## Ce qu'il faut savoir

> [!piege] « Staking » ne veut pas dire la même chose partout
> Sur un réseau, c'est immobiliser une somme pour sécuriser la chaîne. Sur une plateforme d'échange, un produit appelé « staking » peut recouvrir tout autre chose : un prêt, un placement, une opération interne. Le mot est le même, le risque n'a rien à voir.

> [!piege] Les fonds immobilisés ne sont pas toujours disponibles
> Selon le réseau et le service utilisé, retirer sa mise peut prendre des jours, voire des semaines. Ce délai est une caractéristique du mécanisme, pas un dysfonctionnement.

> [!piege] Un rendement affiché n'est pas garanti
> Il dépend du nombre de participants et de l'activité du réseau. Un rendement présenté comme fixe et élevé n'est probablement pas du staking de réseau — voir [les arnaques les plus courantes](/securite/arnaques).

> [!info] Le débat entre les deux modèles n'est pas tranché
> Les partisans du minage estiment qu'une dépense réelle et extérieure au système offre une garantie plus solide qu'une mise interne. Les partisans du staking répondent que consommer autant d'énergie est indéfendable. Les deux camps ont des arguments, et aucun consensus n'existe.

## Pour aller plus loin

- [Le minage](/fondamentaux/proof-of-work) — l'autre mécanisme
- [C'est quoi une blockchain ?](/commencer/cest-quoi-une-blockchain)
