---
titre: "Les données publiques d'une plateforme"
section: "okx"
ordre: 110
resume: "N'importe qui peut récupérer les prix, les carnets d'ordres et l'historique d'une plateforme, gratuitement et sans compte."
niveau: "avance"
prerequis: ["/marches/carnet-ordres"]
termes: ["api", "endpoint", "cle-api", "rest", "websocket", "limite-de-debit", "liste-blanche-ip"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — journal des changements de l'API"
    url: "https://www.okx.com/docs-v5/log_en/"
statut: "redige"
---

**Une plateforme met ses données de marché à disposition de tout le monde, gratuitement et sans inscription. C'est ce qui permet à des sites tiers d'afficher des prix, et c'est ce qui alimente les cours affichés sur ce site.**

## Pourquoi ça existe

Une plateforme a intérêt à ce que ses prix circulent : plus ils sont repris ailleurs, plus elle attire de monde. Elle publie donc ses données dans un format que les programmes savent lire.

C'est ce qu'on appelle une **API** : un moyen pour un logiciel de demander une information à un autre, sans passer par une page web.

## Deux mondes séparés

C'est la distinction essentielle, et elle est rassurante.

**Les données publiques** — prix, carnets d'ordres, historiques — sont accessibles à tous. Aucun compte, aucune clé, aucune identification. On demande, on reçoit.

**Les données privées** — ton solde, tes ordres, tes retraits — exigent une clé personnelle que tu génères depuis ton compte, et qui prouve à chaque requête que c'est bien toi.

Autrement dit : que quelqu'un consulte les prix de la plateforme n'a **aucun rapport** avec l'accès à ton compte.

## Un exemple concret

Voici une vraie demande, que n'importe qui peut faire :

```
https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT
```

Et voici la réponse, telle qu'elle arrive :

```json
{
  "code": "0",
  "data": [{
    "instId": "BTC-USDT",
    "last": "76960.3",
    "open24h": "77651.7",
    "high24h": "78832.2",
    "low24h": "76515",
    "vol24h": "8904.98"
  }]
}
```

Tout est là : dernier prix, ouverture il y a 24 heures, plus haut, plus bas, volume échangé. C'est exactement ce que l'application affiche, dans sa forme brute.

> [!exemple] C'est cette requête qui fait vivre ce site
> Les prix et les graphiques que tu vois sur les fiches de ce site viennent de là. Aucun chiffre n'est écrit en dur : ils sont demandés à la plateforme au moment où tu ouvres la page. Si le service ne répond pas, la page affiche « indisponible » plutôt qu'un chiffre périmé.

## Si tu crées une clé personnelle

Cela n'a d'intérêt que pour faire tourner un programme sur ton compte. Trois précautions, et elles ne sont pas facultatives :

> [!piege] Ne jamais donner les droits de retrait
> Une clé peut être limitée à la lecture seule, ou autorisée à passer des ordres, ou autorisée à retirer. **Il n'y a presque jamais de raison d'activer le retrait.** Une clé volée avec ce droit vide le compte sans qu'on puisse rien faire.

> [!piege] Restreindre aux adresses connues
> Une clé peut n'être acceptée que depuis certaines connexions. Volée, elle devient inutilisable ailleurs.

> [!piege] Une clé volée ne se récupère pas
> Elle se supprime et se remplace. C'est immédiat, et c'est la première chose à faire au moindre doute.

## Ce qu'il faut savoir

> [!piege] Un outil qui demande tes identifiants de connexion est une arnaque
> Aucun service légitime n'a besoin de ton mot de passe. Ceux qui en ont besoin utilisent une clé, que tu génères toi-même et que tu peux révoquer.

> [!verifier] Les interfaces techniques changent
> Les adresses et les formats évoluent. La documentation officielle et son journal des changements, référencés en source, sont les seules références à jour.

## Pour aller plus loin

- [Le carnet d'ordres](/marches/carnet-ordres) — les données que ces requêtes renvoient
- [Se protéger](/securite/compte-exchange) — sécuriser un compte de plateforme
