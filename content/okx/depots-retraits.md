---
titre: "Dépôts et retraits"
section: "okx"
ordre: 30
resume: "Les deux seules opérations d'un compte OKX qui écrivent sur une blockchain : comment un dépôt est identifié, à partir de quand il est acquis, et pourquoi un retrait passe par une file d'attente."
niveau: "bases"
prerequis: ["/okx/on-chain-off-chain"]
termes: ["depot", "retrait", "adresse-de-depot", "memo", "destination-tag", "confirmation", "reorganisation", "portefeuille-chaud", "portefeuille-froid", "liste-blanche", "transfert-interne", "txid"]
sources:
  - titre: "OKX — API v5, Funding Account (Get deposit address, Get currencies, Withdrawal, Get withdrawal history)"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX Help — How do I enable allowlist? (web)"
    url: "https://www.okx.com/help/how-do-i-enable-allowlist-web"
  - titre: "XRP Ledger — Source and Destination Tags"
    url: "https://xrpl.org/docs/concepts/transactions/source-and-destination-tags"
  - titre: "XRP Ledger — Reserves"
    url: "https://xrpl.org/docs/concepts/accounts/reserves"
  - titre: "mempool.space — API des frais recommandés (donnée réseau brute)"
    url: "https://mempool.space/api/v1/fees/recommended"
statut: "redige"
---

**Le dépôt et le retrait sont les deux seules opérations d'un compte OKX qui produisent une transaction signée sur une blockchain ; tout ce qui se passe entre les deux reste une écriture dans leur base.**

## Le problème que ça résout

Un exchange doit raccorder deux systèmes qui n'ont rien en commun. D'un côté un registre public répliqué, où l'unité d'action est une transaction signée, irréversible, et visible de tous. De l'autre une base de données interne, où l'unité d'action est une ligne modifiable.

Le raccordement pose trois problèmes concrets :

1. **Attribution.** Des milliers de transactions entrantes arrivent sur les adresses d'OKX. Rien dans une transaction Bitcoin ou Ethereum ne dit « ceci appartient au client 4021 ». Il faut fabriquer cette information.
2. **Finalité.** Une transaction incluse dans le dernier bloc peut disparaître si une branche concurrente s'impose. Créditer immédiatement, c'est accepter de créditer une transaction qui n'existera peut-être plus dans dix minutes.
3. **Exposition des clés.** Signer un retrait exige une clé privée. Une clé privée sur un serveur connecté à Internet est une clé qui peut être volée. Or il faut bien signer, en continu, sans intervention humaine.

Chacune de ces trois contraintes produit un mécanisme visible dans l'interface.

## Comment ça marche

### L'adresse de dépôt, et pourquoi certaines chaînes exigent un mémo

L'endpoint `GET /api/v5/asset/deposit-address` renvoie, pour un actif donné, une entrée **par chaîne**, avec les champs `addr`, `chain`, et selon les cas `tag`, `memo`, `pmtId` ou `addrEx`. La documentation précise que ces derniers champs ne sont pas renvoyés « si la devise ne demande pas de tag pour le dépôt ». Le champ `to` indique le compte crédité : `6` pour le compte de financement, `18` pour le compte de trading.

Deux modèles d'attribution coexistent, et ils ne dépendent pas d'OKX mais de la chaîne.

<figure class="schema">
<svg viewBox="0 0 640 224" role="img" aria-label="Deux modèles d'identification d'un dépôt : une adresse par client sur les chaînes où un compte est gratuit, un compte unique et un tag par client sur les chaînes où un compte coûte cher">
  <line x1="318" y1="6" x2="318" y2="216" stroke="var(--bordure-forte)" stroke-width="1.5" stroke-dasharray="5 5"/>

  <text x="8" y="18" font-size="11" fill="var(--texte-faible)">UNE ADRESSE PAR CLIENT</text>
  <text x="8" y="32" font-size="10" fill="var(--texte-faible)">BTC · ETH · TRON · SOL</text>

  <rect x="8" y="48" width="58" height="24" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="37" y="64" font-size="10" fill="var(--texte)" text-anchor="middle">client A</text>
  <rect x="8" y="90" width="58" height="24" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="37" y="106" font-size="10" fill="var(--texte)" text-anchor="middle">client B</text>
  <rect x="8" y="132" width="58" height="24" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="37" y="148" font-size="10" fill="var(--texte)" text-anchor="middle">client C</text>

  <path d="M66 60 L92 60 M66 102 L92 102 M66 144 L92 144" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M86 56 L94 60 L86 64 Z M86 98 L94 102 L86 106 Z M86 140 L94 144 L86 148 Z" fill="var(--texte-faible)"/>

  <rect x="94" y="48" width="124" height="24" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="102" y="64" font-size="10" fill="var(--code-texte)">bc1q…7f4a</text>
  <rect x="94" y="90" width="124" height="24" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="102" y="106" font-size="10" fill="var(--code-texte)">bc1q…2b19</text>
  <rect x="94" y="132" width="124" height="24" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="102" y="148" font-size="10" fill="var(--code-texte)">bc1q…c803</text>

  <path d="M218 60 L242 60 M218 102 L242 102 M218 144 L242 144" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M236 56 L244 60 L236 64 Z M236 98 L244 102 L236 106 Z M236 140 L244 144 L236 148 Z" fill="var(--texte-faible)"/>

  <rect x="244" y="48" width="58" height="108" rx="4" fill="var(--accent-voile)" stroke="var(--accent)"/>
  <text x="273" y="106" font-size="11" fill="var(--accent)" text-anchor="middle">OKX</text>

  <text x="8" y="182" font-size="10" fill="var(--texte-doux)">le client est identifié par</text>
  <text x="8" y="196" font-size="11" fill="var(--accent)">l'adresse de destination</text>

  <text x="332" y="18" font-size="11" fill="var(--texte-faible)">UN COMPTE, UN TAG PAR CLIENT</text>
  <text x="332" y="32" font-size="10" fill="var(--texte-faible)">XRP · XLM · TON · ATOM</text>

  <rect x="332" y="48" width="52" height="24" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="358" y="64" font-size="10" fill="var(--texte)" text-anchor="middle">client A</text>
  <rect x="332" y="90" width="52" height="24" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="358" y="106" font-size="10" fill="var(--texte)" text-anchor="middle">client B</text>
  <rect x="332" y="132" width="52" height="24" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="358" y="148" font-size="10" fill="var(--texte)" text-anchor="middle">client C</text>

  <rect x="396" y="48" width="56" height="24" rx="3" fill="var(--fond-2)" stroke="var(--attention)"/>
  <text x="424" y="64" font-size="10" fill="var(--attention)" text-anchor="middle">tag 4021</text>
  <rect x="396" y="90" width="56" height="24" rx="3" fill="var(--fond-2)" stroke="var(--attention)"/>
  <text x="424" y="106" font-size="10" fill="var(--attention)" text-anchor="middle">tag 7788</text>
  <rect x="396" y="132" width="56" height="24" rx="3" fill="var(--fond-2)" stroke="var(--attention)"/>
  <text x="424" y="148" font-size="10" fill="var(--attention)" text-anchor="middle">tag 1156</text>

  <path d="M384 60 L394 60 M384 102 L394 102 M384 144 L394 144" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M452 60 L472 88 M452 102 L472 102 M452 144 L472 116" stroke="var(--texte-faible)" stroke-width="1.2" fill="none"/>

  <rect x="472" y="80" width="96" height="44" rx="3" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="520" y="99" font-size="10" fill="var(--code-texte)" text-anchor="middle">rMdG…9Kk</text>
  <text x="520" y="114" font-size="9" fill="var(--texte-faible)" text-anchor="middle">compte unique</text>

  <path d="M568 102 L586 102" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M580 98 L588 102 L580 106 Z" fill="var(--texte-faible)"/>
  <rect x="588" y="48" width="44" height="108" rx="4" fill="var(--accent-voile)" stroke="var(--accent)"/>
  <text x="610" y="106" font-size="11" fill="var(--accent)" text-anchor="middle">OKX</text>

  <text x="332" y="182" font-size="10" fill="var(--texte-doux)">le client est identifié par</text>
  <text x="332" y="196" font-size="11" fill="var(--attention)">le tag, pas par l'adresse</text>
  <text x="332" y="212" font-size="10" fill="var(--texte-faible)">tag absent = dépôt non rattaché</text>
</svg>
<figcaption>Le modèle de gauche est possible quand créer un compte sur la chaîne ne coûte rien. Celui de droite est imposé quand un compte coûte cher ou doit être provisionné.</figcaption>
</figure>

Sur le XRP Ledger, chaque compte immobilise une **réserve de base de 1 XRP**, plus 0,2 XRP par objet possédé, explicitement pour empêcher le registre de gonfler sous l'effet du spam. Un exchange avec des millions de clients ne peut donc pas se permettre un compte par client : il en tient un seul et démultiplexe les dépôts avec le **destination tag**, un entier non signé de 32 bits transporté dans la transaction. La documentation XRPL est très claire sur son statut : le tag n'a « aucune fonctionnalité directe sur le registre », il informe seulement le système hors chaîne du destinataire. Même logique pour le `memo` de Stellar ou de Cosmos, et pour le champ `comment` de TON — la doc OKX cite ce cas précisément dans le champ `addrEx`.

Côté API, le champ booléen `needTag` d'une chaîne dit si un tag est obligatoire. Au retrait, le tag ne voyage pas dans un champ séparé : la doc précise que `toAddr` prend alors la forme `'adresse:tag'`, avec pour exemple `'ARDOR-7JF3-8F2E-QUWZ-CAN7F:123456'`.

### Les confirmations : deux seuils, pas un

C'est le point le plus mal compris. OKX expose **deux** compteurs distincts par chaîne dans `GET /api/v5/asset/currencies` :

| Champ | Ce que dit la documentation |
|---|---|
| `minDepArrivalConfirm` | Nombre minimal de confirmations pour reconnaître le dépôt. Le compte est crédité après, **mais le dépôt ne peut pas être retiré**. |
| `minWdUnlockConfirm` | Nombre minimal de confirmations requis pour pouvoir retirer un dépôt. |

Ces deux seuils se retrouvent dans les états de `GET /api/v5/asset/deposit-history` : `0` en attente de confirmation, `1` dépôt crédité, `2` dépôt réussi. Entre `1` et `2`, les fonds sont dans ton solde, échangeables, et bloqués au retrait.

La raison est mécanique. Une transaction n'est pas dans un bloc « ou pas » : elle est enterrée sous *n* blocs. Une réorganisation de chaîne — deux mineurs trouvent un bloc quasi simultanément, une branche l'emporte — peut évincer une transaction du dernier bloc. Chaque bloc empilé au-dessus multiplie le coût d'une réécriture. Le seuil de crédit accepte un petit risque parce que la position reste chez OKX ; le seuil de retrait ne l'accepte pas, parce qu'une fois sortis les fonds ne reviennent pas.

### Le retrait : une file d'attente devant un portefeuille chaud

`POST /api/v5/asset/withdrawal` prend un paramètre `dest` qui vaut `3` pour un transfert interne ou `4` pour un retrait on-chain. Le transfert interne n'est pas un retrait : `toAddr` y est un UID, un e-mail ou un numéro de téléphone, et la doc indique que « pour un transfert interne, les frais de transaction sont toujours de 0 ». Rien ne sort du système.

Le retrait on-chain, lui, traverse une machine à états que la documentation découpe explicitement en trois étapes.

<figure class="schema">
<svg viewBox="0 0 640 212" role="img" aria-label="Pipeline d'un retrait OKX : file d'attente hors chaîne annulable, signature par le portefeuille chaud alimenté depuis le portefeuille froid, puis diffusion irréversible sur la chaîne">
  <line x1="386" y1="6" x2="386" y2="204" stroke="var(--bordure-forte)" stroke-width="1.5" stroke-dasharray="5 5"/>
  <text x="8" y="18" font-size="11" fill="var(--texte-faible)">ÉTAPE 1 — hors chaîne, annulable</text>
  <text x="398" y="18" font-size="11" fill="var(--texte-faible)">ÉTAPE 2 — sur la chaîne</text>

  <rect x="8" y="32" width="106" height="62" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="61" y="56" font-size="11" fill="var(--texte)" text-anchor="middle">Demande</text>
  <text x="61" y="74" font-size="10" fill="var(--code-texte)" text-anchor="middle">dest = 4</text>

  <path d="M114 63 L130 63" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M124 59 L132 63 L124 67 Z" fill="var(--texte-faible)"/>

  <rect x="132" y="32" width="112" height="62" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="188" y="52" font-size="11" fill="var(--texte)" text-anchor="middle">File d'attente</text>
  <text x="188" y="68" font-size="10" fill="var(--code-texte)" text-anchor="middle">0 · 7 · 17 · 19</text>
  <text x="188" y="84" font-size="9" fill="var(--texte-faible)" text-anchor="middle">revue, quotas</text>

  <path d="M244 63 L260 63" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M254 59 L262 63 L254 67 Z" fill="var(--texte-faible)"/>

  <rect x="262" y="32" width="112" height="62" rx="4" fill="var(--accent-voile)" stroke="var(--accent)"/>
  <text x="318" y="56" font-size="11" fill="var(--accent)" text-anchor="middle">Portefeuille chaud</text>
  <text x="318" y="74" font-size="10" fill="var(--texte-doux)" text-anchor="middle">signature en ligne</text>

  <path d="M374 63 L396 63" stroke="var(--info)" stroke-width="1.6"/>
  <path d="M390 59 L398 63 L390 67 Z" fill="var(--info)"/>

  <rect x="398" y="32" width="106" height="62" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="451" y="56" font-size="11" fill="var(--texte)" text-anchor="middle">Diffusion</text>
  <text x="451" y="74" font-size="10" fill="var(--code-texte)" text-anchor="middle">état 1 · 15</text>

  <path d="M504 63 L520 63" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M514 59 L522 63 L514 67 Z" fill="var(--texte-faible)"/>

  <rect x="522" y="32" width="110" height="62" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="577" y="56" font-size="11" fill="var(--texte)" text-anchor="middle">Succès</text>
  <text x="577" y="74" font-size="10" fill="var(--code-texte)" text-anchor="middle">état 2 + TxID</text>

  <text x="132" y="112" font-size="10" fill="var(--attention)">état 19 : portefeuille chaud à sec</text>
  <text x="398" y="112" font-size="10" fill="var(--danger)">plus rien n'est annulable ici</text>

  <path d="M318 154 L318 98" stroke="var(--texte-faible)" stroke-width="1.2" stroke-dasharray="4 3"/>
  <path d="M314 106 L318 96 L322 106 Z" fill="var(--texte-faible)"/>
  <rect x="252" y="154" width="132" height="46" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="318" y="174" font-size="11" fill="var(--texte-doux)" text-anchor="middle">Portefeuille froid</text>
  <text x="318" y="190" font-size="9" fill="var(--texte-faible)" text-anchor="middle">clés hors ligne, réappro. manuelle</text>
</svg>
<figcaption>Seuls les états 0, 17 et 19 sont annulables. Une fois la transaction diffusée, aucune opération ne peut la rappeler.</figcaption>
</figure>

Les états de l'étape 1 sont instructifs. On y trouve `0` en attente de retrait, `7` approuvé, `17` en attente de réponse du prestataire Travel Rule, plusieurs codes de revue manuelle — et surtout `19` : **« solde insuffisant dans le portefeuille chaud »**.

Cet état est la trace directe de l'architecture de garde. La quasi-totalité des fonds dort dans des portefeuilles froids dont les clés ne touchent jamais une machine connectée. Un portefeuille chaud, alimenté périodiquement, signe automatiquement les retraits courants. Quand il se vide, la file s'arrête, et il faut une opération humaine depuis la zone hors ligne pour la relancer. Ce n'est pas une panne : c'est le fonctionnement nominal.

### La liste blanche d'adresses

OKX appelle ça l'**allowlist**. La page d'aide officielle est explicite : « une fois cette fonction activée, tu ne peux retirer que vers des adresses enregistrées dans ton carnet d'adresses ». Elle ne se désactive qu'avec une validation 2FA. Un réglage avancé, le *New address withdrawal lock*, « empêche pendant 24 heures les retraits vers les nouvelles adresses de la liste ».

La logique de sécurité est celle du moindre privilège appliquée à un compte compromis : un attaquant qui obtient tes identifiants et ton second facteur devra encore ajouter son adresse, puis attendre 24 heures — délai pendant lequel les fonds ne bougent pas et les alertes partent.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> **Le portefeuille chaud et le portefeuille froid, c'est la DMZ et le réseau d'administration.**
>
> Le portefeuille chaud est en DMZ : exposé, automatisé, il détient un montant plafonné et sa clé vit sur une machine joignable. C'est le service qui répond aux requêtes, donc c'est lui qu'on attaque. Le portefeuille froid est dans la zone isolée : ses clés ne transitent par aucun hôte connecté, et l'alimentation de la DMZ est une opération manuelle, tracée, non automatisable. L'état `19` de l'API — « solde insuffisant dans le portefeuille chaud » — c'est exactement le message d'un service en DMZ qui ne peut plus servir sans intervention depuis l'intérieur.
>
> **Les confirmations, c'est de la profondeur de réplication.** Sur un stockage répliqué, tu choisis combien de réplicas doivent avoir accusé réception avant de répondre « OK » au client : un seul, c'est rapide et ça se perd sur une panne ; la majorité, c'est lent et ça tient. Une blockchain fait pareil, sauf que le compteur n'est pas un nombre de réplicas mais un nombre de blocs empilés au-dessus du tien. OKX règle deux niveaux de garantie différents pour deux opérations de risque différent : un seuil bas pour créditer, un seuil plus haut pour laisser sortir.

## Exemple chiffré

Un dépôt de BTC, minuté. Les seuils utilisés sont ceux de l'exemple de réponse publié dans la documentation v5 pour la chaîne `BTC-Bitcoin` : `minDepArrivalConfirm` = 1, `minWdUnlockConfirm` = 2.

| Instant | Événement | État API | Ce que tu peux faire |
|---|---|---|---|
| t = 0 | transaction diffusée, en mempool | `0` | rien |
| 1 bloc | incluse et confirmée une fois | `1` | trader, pas retirer |
| 2 blocs | une confirmation de plus | `2` | tout |

**Combien de temps ?** Le minage est un processus sans mémoire : quel que soit le moment où ta transaction arrive, le temps d'attente jusqu'au prochain bloc suit une loi exponentielle de moyenne 10 minutes. La probabilité que le premier bloc tombe en moins de *t* minutes vaut 1 − e^(−t/10) :

```
moins de  5 min : 1 − e^(−0,5) = 39,3 %
moins de 10 min : 1 − e^(−1)   = 63,2 %
moins de 30 min : 1 − e^(−3)   = 95,0 %
```

Il reste donc 5 % de chances d'attendre plus d'une demi-heure la *première* confirmation, sans que rien n'aille mal. En moyenne, 10 minutes pour être crédité, 20 minutes pour pouvoir retirer.

**Combien ça coûte ?** Le dépôt te coûte les frais de la chaîne, pas ceux d'OKX. Au 22 août 2026, à la hauteur de bloc 963 606, le marché des frais Bitcoin est à 1 sat/vB (relevé sur `mempool.space/api/v1/fees/recommended`). Une transaction P2WPKH à une entrée et deux sorties pèse de l'ordre de 140 vB :

```
140 vB × 1 sat/vB   = 140 sats
140 sats            = 0,000 001 40 BTC
à 77 232,70 USDT/BTC (ticker OKX au même instant) → 0,108 USDT
```

Onze centimes, payés aux mineurs, qu'OKX ne voit jamais passer.

> [!verifier] Les seuils de confirmation ne sont pas publics en lecture libre
> `minDepArrivalConfirm` et `minWdUnlockConfirm` varient par chaîne et changent dans le temps. L'endpoint qui les expose, `GET /api/v5/asset/currencies`, exige une clé API : sans en-tête `OK-ACCESS-KEY`, il renvoie l'erreur `50103`. Les valeurs 1 et 2 citées ici sont celles de l'exemple de réponse de la [documentation v5](https://www.okx.com/docs-v5/en/), pas un relevé en direct. Le nombre exigé s'affiche aussi sur l'écran de dépôt de l'application.

## Sur OKX

- **Dépôt.** Actifs → Dépôt → choisir la crypto → **choisir le réseau** → adresse et QR code, plus un champ mémo si la chaîne l'impose. Il y a une adresse par réseau, jamais une adresse universelle.
- **Compte crédité.** Le champ `to` de l'API vaut `6` (compte de financement) ou `18` (compte de trading). La doc note que les utilisateurs de certaines entités — le Brésil est cité — ne peuvent déposer que sur le compte de trading.
- **Retrait.** Deux voies distinctes : *on-chain* (`dest = 4`) et transfert interne OKX vers OKX (`dest = 3`), par UID, e-mail ou téléphone. Le second est gratuit et instantané parce qu'il ne quitte pas la base de données.
- **Carnet d'adresses.** Sur okx.com : Actifs → Retirer → choisir la crypto → *On-chain* → carnet d'adresses, où se trouve l'interrupteur *Allowlist*.
- **Historique.** Chaque retrait terminé porte un `txId` cliquable vers un explorateur de blocs. C'est le seul endroit de l'interface où ton activité devient vérifiable par un tiers.
- **Limites.** L'API expose `minDep`, `minWd`, `maxWd`, une précision de retrait `wdTickSz`, et un quota glissant sur 24 heures `wdQuota` exprimé en dollars — quota qui dépend de ton niveau de compte.

## Les pièges

> [!piege] Crédité ne veut pas dire retirable
> Ce sont deux seuils différents, et l'interface ne les distingue pas toujours clairement. Entre les deux, ton solde est visible, échangeable, et bloqué au retrait. Ce n'est pas un incident, c'est l'état `1` de la machine à états.

> [!piege] Le mémo oublié n'est pas le mauvais réseau
> Un dépôt sans tag sur une chaîne qui en exige un arrive bien sur le compte d'OKX : les fonds sont sous leur contrôle cryptographique, mais rattachés à personne. C'est un problème d'identification, résolu par une procédure manuelle, discrétionnaire et parfois payante. Le mauvais réseau, lui, est un problème de possession — voir [Le choix du réseau](/okx/choix-du-reseau). Ne confonds pas les deux : le premier a une issue, le second souvent pas.

> [!piege] Un retrait n'est annulable qu'avant diffusion
> La documentation le dit sans ambiguïté : seuls les états `0`, `17` et `19` peuvent être annulés. Dès que la transaction est diffusée, l'annulation n'existe plus — ni chez OKX, ni nulle part. Il n'y a pas de service client dans un protocole.

> [!piege] Le transfert interne n'est pas un retrait
> Envoyer des fonds à un autre compte OKX est instantané et gratuit parce que rien ne sort. Ça ne teste rien de ta capacité à retirer, et ça ne prouve rien sur la solvabilité de la plateforme.

## Pour aller plus loin

- [Le choix du réseau](/okx/choix-du-reseau) — pourquoi la même adresse peut exister sur plusieurs chaînes
- [On-chain vs off-chain](/okx/on-chain-off-chain) — ce que contient réellement ton solde entre les deux opérations
- [Les frais chez OKX](/okx/frais) — qui encaisse quoi, du dépôt au retrait
- [Les fonctions de hachage](/fondamentaux/hachage) — d'où vient le TxID que tu colles dans un explorateur
