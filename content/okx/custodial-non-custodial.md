---
titre: "Qui détient vraiment tes fonds"
section: "okx"
ordre: 50
resume: "Sur une plateforme, c'est elle qui détient les clés. Dans un portefeuille personnel, c'est toi. Tout le reste en découle."
niveau: "bases"
prerequis: ["/okx/on-chain-off-chain"]
termes: ["custody", "creance", "gel-de-fonds", "portefeuille-chaud", "portefeuille-froid"]
sources:
  - titre: "OKX — documentation officielle de l'API"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "Règlement européen MiCA (UE 2023/1114), garde d'actifs pour compte de tiers"
    url: "https://eur-lex.europa.eu/eli/reg/2023/1114/oj"
statut: "redige"
---

**Sur une blockchain, il n'existe qu'une seule façon de déplacer des fonds : détenir le secret qui contrôle l'adresse. La seule question qui compte est donc : qui le détient ?**

## Pourquoi ça existe

La règle est absolue et sans exception : sans le secret, on ne peut rien déplacer. Avec, on peut tout déplacer.

Ça a une conséquence désagréable — perdre le secret, c'est perdre les fonds pour toujours — et ça explique pourquoi tout un métier consiste à garder ces secrets à la place des gens. Deux modèles cohabitent, et ils s'appellent en anglais *custodial* et *non-custodial*.

## Comment ça marche

| | Sur une plateforme | Dans ton portefeuille |
|---|---|---|
| Qui détient le secret | L'entreprise | Toi, sur ton téléphone ou ton ordinateur |
| Qui signe les opérations | L'entreprise | Toi |
| Ce que tu possèdes | Une promesse de l'entreprise | Les fonds eux-mêmes |
| Si tu perds ton téléphone | Tu récupères ton compte | Perdu, sauf si tu as noté ta phrase de récupération |
| Si tu te fais avoir par une arnaque | Parfois rattrapable | Définitif |
| Si l'entreprise fait faillite | Tu attends ton tour parmi les créanciers | Aucun effet |
| Si une décision de justice te vise | Ton compte peut être gelé | Rien à geler chez l'entreprise |

Le tableau n'oppose pas un bon et un mauvais modèle. Il décrit un **échange de risques** : dans un cas tu te reposes sur une entreprise, dans l'autre tu es seul responsable.

> [!exemple] Deux façons de ranger de l'argent
> Le premier modèle, c'est un compte en banque : quelqu'un garde, quelqu'un peut t'aider, quelqu'un peut aussi bloquer.
>
> Le second, c'est un coffre chez toi dont tu es seul à avoir la clé : personne ne peut y toucher, et personne ne peut rien pour toi si tu perds la clé ou si on te la vole.

## Un exemple concret

Le même montant, 500 €, et cinq scénarios :

| Ce qui arrive | Sur une plateforme | Dans ton portefeuille |
|---|---|---|
| Tu oublies ton mot de passe | Récupération après vérification d'identité | Tout dépend de ta phrase de récupération |
| Un faux site te vole tes accès | Le retrait peut être bloqué à temps | Les fonds partent, définitivement |
| L'entreprise dépose le bilan | Tu es créancier, remboursement incertain | Rien ne change pour toi |
| Ton pays interdit le service | Compte potentiellement gelé | Aucun effet |
| Tu envoies au mauvais endroit | Parfois récupérable par le support | Perdu |

Deux lignes penchent d'un côté, trois de l'autre. C'est exactement pourquoi les deux modèles existent, et pourquoi la question n'a pas de bonne réponse universelle.

## Sur OKX

Les deux modèles coexistent dans la même application, ce qui entretient la confusion en permanence :

- **Le compte OKX** est du premier type. Tu ne détiens aucun secret, tes soldes sont des lignes chez eux, tes retraits sont signés par eux.
- **OKX Wallet** est du second. La phrase de récupération est créée sur ton appareil et n'en sort pas. OKX ne peut ni signer à ta place, ni geler, ni t'aider si tu la perds.

Passer de l'un à l'autre est un vrai retrait, avec ses frais et son délai — même si l'interface donne l'impression d'un simple transfert interne.

## Ce qu'il faut savoir

> [!piege] « Not your keys, not your coins » n'est pas une opinion
> Traduit : « pas tes clés, pas tes pièces ». C'est la description exacte de la situation. Sur une plateforme, tu détiens un droit à être payé, pas des fonds.

> [!piege] Détenir ses clés ne protège pas de tout
> Le secret te protège de la plateforme, pas de l'émetteur du jeton. Certains stablecoins peuvent être gelés par leur émetteur sur n'importe quelle adresse, y compris dans un portefeuille personnel.

> [!piege] Un portefeuille ne contient pas de fonds
> Il contient des secrets. Les fonds, eux, sont des lignes dans le registre de la blockchain. Réinstaller son application avec la même phrase de récupération ne déplace rien.

## Pour aller plus loin

- [On-chain et off-chain](/okx/on-chain-off-chain) — d'où vient la promesse
- [Proof of Reserves](/okx/proof-of-reserves) — vérifier que les réserves existent
