---
titre: "Échanger avec ou sans intermédiaire"
section: "produits"
ordre: 20
resume: "Deux façons d'échanger des cryptos : par une entreprise qui garde les fonds, ou par un programme qui n'en garde aucun."
niveau: "bases"
prerequis: ["/okx/exchange-centralise"]
termes: ["dex", "cex", "custody", "liquidite", "spread"]
sources:
  - titre: "Documentation officielle d'Ethereum — la finance décentralisée"
    url: "https://ethereum.org/en/defi/"
  - titre: "Uniswap — le document décrivant le modèle des pools"
    url: "https://uniswap.org/whitepaper.pdf"
statut: "redige"
---

**Une plateforme classique met en relation des personnes et garde leurs fonds. Un échange décentralisé est un programme qui échange automatiquement, sans jamais rien détenir.**

## Deux mécanismes différents

**La plateforme classique** tient un carnet d'ordres : elle affiche les intentions d'achat et de vente, et les fait se rencontrer. Elle détient les fonds des deux côtés.

**L'échange décentralisé** ne cherche pas d'acheteur. Il puise dans une **réserve** de deux monnaies, déposée par des particuliers, et calcule le prix avec une formule fixe : plus tu prends d'un côté, plus le prix monte.

Il n'y a personne en face. Tu échanges avec un programme, et le prix découle du contenu de la réserve.

## Ce qui change

| | Plateforme classique | Échange décentralisé |
|---|---|---|
| Qui garde tes fonds | l'entreprise | personne, ils restent chez toi |
| Identité | vérification obligatoire | aucune |
| Ce qu'on peut échanger | ce que l'entreprise référence | n'importe quel jeton |
| En cas d'erreur | un support existe | aucun recours |
| Frais | commission de la plateforme | frais du réseau, souvent plus élevés |
| Risque principal | l'entreprise | le code, et le jeton lui-même |

> [!exemple] Le bureau de change automatique
> Un échange décentralisé est un automate rempli de deux devises. Il applique sa formule, quelle que soit la personne en face.
>
> Personne ne tient la caisse. Si tu te trompes de bouton, il n'y a personne à qui le signaler.

## Un exemple concret

Un même échange, vu des deux côtés :

**Sur une plateforme** : tu dois avoir un compte vérifié, déposer des fonds, passer un ordre. Le jeton doit être référencé. La commission est faible, et un support existe.

**Sur un échange décentralisé** : tu connectes ton portefeuille, tu signes, l'échange a lieu en quelques secondes. Aucune inscription. Mais tu paies les frais du réseau, et **n'importe quel jeton est disponible — y compris les faux**.

C'est le point important : la liberté totale d'un échange décentralisé signifie aussi qu'aucun filtre n'existe. Un jeton portant le nom d'un projet connu peut être un contrat malveillant déployé dix minutes plus tôt.

## Ce qu'il faut savoir

> [!piege] « Décentralisé » ne veut pas dire « sûr »
> Ça veut dire qu'aucune entreprise ne garde tes fonds. Le risque ne disparaît pas, il se déplace : vers le code du contrat, vers le jeton que tu achètes, et vers toi.

> [!piege] Le nom d'un jeton ne prouve rien
> Sur un échange décentralisé, seule l'adresse du contrat identifie un jeton de façon fiable. Elle se vérifie sur le site officiel du projet, jamais dans un message reçu.

> [!piege] Connecter son portefeuille peut coûter cher
> L'échange demande une autorisation. Accordée sans limite, elle reste active indéfiniment — voir [les autorisations données aux applications](/securite/approbations).

> [!piege] Le prix affiché bouge pendant l'opération
> Comme le prix dépend du contenu de la réserve, un gros échange déplace le prix pendant qu'il s'exécute. Sur une réserve peu fournie, l'écart peut être considérable.

## Pour aller plus loin

- [Comment fonctionne une plateforme d'échange](/okx/exchange-centralise)
- [Les autorisations données aux applications](/securite/approbations)
- [La liquidité](/marches/liquidite) — pourquoi une réserve trop petite coûte cher
