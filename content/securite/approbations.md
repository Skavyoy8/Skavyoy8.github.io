---
titre: "Les autorisations données aux applications"
section: "securite"
ordre: 50
resume: "Connecter son portefeuille à un site lui donne parfois le droit de puiser dedans, sans limite et sans date de fin."
niveau: "intermediaire"
prerequis: ["/securite/seed-phrase"]
termes: ["evm", "erc-20", "gel-de-fonds"]
sources:
  - titre: "EIP-20 — le standard des jetons et sa fonction d'autorisation"
    url: "https://eips.ethereum.org/EIPS/eip-20"
  - titre: "Cybermalveillance.gouv.fr — dispositif national d'assistance"
    url: "https://www.cybermalveillance.gouv.fr/"
statut: "redige"
---

**Pour qu'une application puisse échanger tes jetons, tu dois l'autoriser à y toucher. Cette autorisation est souvent illimitée et permanente, et elle reste active longtemps après que tu as quitté le site.**

## Pourquoi ça existe

Une application décentralisée ne détient pas tes fonds. Pour faire un échange, elle a besoin de prendre des jetons dans ton portefeuille au moment de l'opération.

Le standard des jetons prévoit donc une étape préalable : tu accordes à un programme le droit de prélever jusqu'à un certain montant. C'est une **autorisation**, et elle est nécessaire au fonctionnement normal.

Le problème n'est pas le mécanisme. C'est la façon dont il est utilisé en pratique.

## Le piège

Pour éviter de redemander une autorisation à chaque opération, la plupart des applications en demandent une **illimitée**, valable pour toujours.

Deux conséquences.

**Elle survit à ta visite.** Tu échanges une fois pour vingt euros, tu fermes l'onglet, tu oublies. L'autorisation reste active des mois plus tard. Si le programme autorisé est un jour compromis — ou s'il était malveillant dès le départ — il peut prélever tout ce que tu détiens de ce jeton, sans rien te demander.

**Elle ne se voit pas.** L'écran de confirmation affiche une demande technique, souvent sans montant lisible. Beaucoup de gens signent sans savoir qu'ils viennent d'accorder un accès permanent.

C'est le vecteur qui vide le plus de portefeuilles personnels, loin devant le vol de phrase de récupération.

## Les deux règles

**Limiter le montant.** Les portefeuilles récents permettent de modifier la somme autorisée au moment de signer. Autoriser exactement ce dont l'opération a besoin, plutôt que l'illimité proposé par défaut, ferme le problème à la source.

**Révoquer ce qui ne sert plus.** Une autorisation se retire. Des outils listent celles qui sont actives sur une adresse et permettent de les annuler. Une révision de temps en temps suffit — et devient nécessaire après avoir utilisé un site inconnu.

> [!exemple] Ce que ça donne concrètement
> Tu échanges 20 € de jetons sur une application. Elle demande une autorisation illimitée, tu signes.
>
> Six mois plus tard, tu détiens 3 000 € du même jeton. Le programme autorisé est compromis. Il peut prélever les 3 000 €, parce que l'autorisation portait sur le jeton, pas sur le montant de l'époque.

## Ce qu'il faut savoir

> [!piege] Signer n'est pas toujours payer
> Une signature ne déplace pas forcément des fonds sur le moment. Elle peut accorder un droit à venir. C'est justement ce qui la rend dangereuse : rien ne se passe, donc rien n'alerte.

> [!piege] Un portefeuille séparé pour les essais coûte moins cher qu'une révocation
> Utiliser une adresse dédiée, contenant seulement ce qui est nécessaire, pour tout ce qui n'est pas parfaitement connu. Ce qui n'est pas dans le portefeuille ne peut pas être prélevé.

> [!piege] Révoquer coûte des frais de réseau
> C'est une opération sur la blockchain comme une autre. Quelques centimes à quelques euros selon le réseau et le moment. C'est le seul cas où payer des frais pour « ne rien faire » est justifié.

> [!piege] Ça ne concerne pas les comptes de plateforme
> Ce mécanisme est propre aux portefeuilles personnels connectés à des applications. Un compte sur une plateforme d'échange ne fonctionne pas comme ça.

## Pour aller plus loin

- [La phrase de récupération](/securite/seed-phrase) — l'autre grand vecteur de perte
- [Les faux sites](/securite/phishing) — ceux qui font signer ces autorisations
