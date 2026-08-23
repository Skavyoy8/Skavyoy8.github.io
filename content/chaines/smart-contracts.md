---
titre: "Les smart contracts"
section: "chaines"
ordre: 40
resume: "Des programmes déposés sur une blockchain, que n'importe qui peut déclencher et que personne ne peut modifier."
niveau: "bases"
prerequis: ["/chaines/ethereum"]
termes: ["evm", "gas", "erc-20"]
sources:
  - titre: "Documentation officielle d'Ethereum — les smart contracts"
    url: "https://ethereum.org/en/developers/docs/smart-contracts/"
  - titre: "EIP-20 — le standard des jetons"
    url: "https://eips.ethereum.org/EIPS/eip-20"
statut: "redige"
---

**Un smart contract est un programme déposé sur une blockchain. Il s'exécute toujours de la même façon, personne ne peut le modifier, et personne ne peut l'arrêter.**

## Le nom est trompeur

Ce n'est ni intelligent, ni un contrat.

Ce n'est pas intelligent : c'est un programme classique, souvent court, qui applique des règles écrites à l'avance. Aucune intelligence artificielle, aucune capacité d'adaptation.

Ce n'est pas un contrat : il n'a aucune valeur juridique en soi, et aucun juge ne le fera appliquer. Le terme date des années 1990 et est resté.

## Ce que ça permet

L'intérêt tient en une phrase : **le programme fait ce qui est écrit, même si son auteur ne le veut plus.**

Une fois déposé, il ne dépend plus de personne. Pas de serveur qui peut tomber, pas d'entreprise qui peut changer d'avis, pas de conditions générales modifiées un matin.

C'est ce qui permet des applications où l'on n'a besoin de faire confiance à personne : un échange automatique, une distribution de jetons selon des règles fixées, un dépôt qui se libère à une date donnée.

## Ce que ça ne permet pas

C'est la partie que les présentations enthousiastes oublient.

**Il ne connaît que la blockchain.** Un contrat ne peut pas consulter un site, lire une météo, vérifier une livraison. Tout ce qui vient de l'extérieur doit être introduit par quelqu'un — et il faut alors faire confiance à ce quelqu'un.

**Il ne peut pas être corrigé.** Une erreur dans le code est définitive. Les plus grosses pertes du secteur viennent de là.

**Il n'est pas gratuit.** Chaque exécution coûte des frais, payés par celui qui la déclenche.

**Il ne garantit pas les intentions.** Un contrat peut être parfaitement fonctionnel et parfaitement malveillant. « C'est sur la blockchain » ne dit rien de l'honnêteté de l'auteur.

> [!exemple] Le distributeur automatique
> Un contrat est un distributeur : tu insères ce qu'il demande, il délivre ce pour quoi il est programmé, sans négociation possible.
>
> S'il a été mal réglé, il continuera à mal fonctionner indéfiniment. Et si quelqu'un l'a conçu pour garder ta pièce sans rien rendre, il fera exactement ça, tout aussi fidèlement.

## Ce qu'il faut savoir

> [!piege] Un contrat audité n'est pas un contrat sûr
> Un audit est une relecture par une société spécialisée. C'est mieux que rien, ce n'est pas une garantie : des contrats audités ont été vidés. Et beaucoup de projets affichent le mot sans avoir jamais fait auditer quoi que ce soit.

> [!piege] Le code est public, mais illisible pour presque tout le monde
> « Vérifiable par tous » suppose de savoir lire du code. En pratique, la quasi-totalité des utilisateurs font confiance à quelqu'un d'autre — ce qui ramène exactement au problème que la blockchain prétendait supprimer.

> [!piege] Interagir avec un contrat peut lui donner des droits
> Se connecter à une application demande souvent de signer une autorisation. C'est le principal vecteur de vol sur les portefeuilles personnels — voir [les autorisations données aux applications](/securite/approbations).

## Pour aller plus loin

- [Ethereum](/chaines/ethereum) — le réseau où vivent la plupart des contrats
- [Les standards de jetons](/chaines/standards-tokens) — les contrats les plus courants
- [Les autorisations données aux applications](/securite/approbations)
