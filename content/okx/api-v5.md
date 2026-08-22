---
titre: "L'API OKX v5"
section: "okx"
ordre: 110
resume: "Les données de marché sont publiques et interrogeables au curl ; tout le reste passe par une signature HMAC-SHA256 avec un secret qui ne circule jamais."
niveau: "intermediaire"
prerequis: ["/okx/exchange-centralise", "/fondamentaux/hachage"]
termes: ["api", "rest", "websocket", "endpoint", "hmac", "cle-api", "passphrase", "liste-blanche-ip", "limite-de-debit", "polling", "push"]
sources:
  - titre: "OKX — API v5, documentation officielle"
    url: "https://www.okx.com/docs-v5/en/"
  - titre: "OKX — Journal des changements de l'API v5"
    url: "https://www.okx.com/docs-v5/log_en/"
  - titre: "RFC 2104 — HMAC: Keyed-Hashing for Message Authentication"
    url: "https://www.rfc-editor.org/rfc/rfc2104"
  - titre: "RFC 6455 — The WebSocket Protocol"
    url: "https://www.rfc-editor.org/rfc/rfc6455"
statut: "redige"
---

**L'API v5 est l'interface HTTP et WebSocket dont l'app OKX est elle-même un client : les données de marché sont ouvertes, tout le reste est derrière une signature HMAC-SHA256.**

## Le problème que ça résout

Deux problèmes distincts, et ils n'ont rien à voir l'un avec l'autre.

**Le premier est un problème de format.** L'app affiche des pixels. Si tu veux archiver un carnet d'ordres, comparer deux plateformes, ou juste vérifier ce que l'interface te raconte, il te faut le protocole, pas l'écran. L'app iPhone, le site web et un `curl` dans un terminal sont trois clients du même service HTTP, et aucun n'a de privilège sur les autres.

**Le second est un problème d'autorisation.** Comment laisser une machine agir sur ton compte sans lui confier ton mot de passe, sans que le secret circule sur le réseau, et sans qu'une requête interceptée puisse être rejouée ou modifiée en vol ? Ce n'est pas un problème spécifique à la crypto — c'est le problème de l'authentification de message, et la réponse standard s'appelle HMAC.

## Comment ça marche

### Endpoints publics : rien à demander à personne

Base : `https://www.okx.com/api/v5/`. Les mêmes routes répondent aussi sur `openapi.okx.com`, `my.okx.com` et `eea.okx.com` — vérifié depuis cette machine le 22 août 2026, les trois renvoient la même chose.

Une requête complète, sans clé, sans compte, sans en-tête particulier :

```
GET /api/v5/market/ticker?instId=BTC-USDT HTTP/1.1
Host: www.okx.com
```

La réponse, telle quelle, le 22 août 2026 à 16 h 35 min 24 s UTC :

```
HTTP/1.1 200 OK
Date: Sat, 22 Aug 2026 16:35:24 GMT
Content-Type: application/json
Transfer-Encoding: chunked
Connection: keep-alive
Cache-Control: no-cache, no-store, max-age=0, must-revalidate
Server: cloudflare

{"code":"0","msg":"","data":[{"instType":"SPOT","instId":"BTC-USDT",
"last":"77218.1","lastSz":"0.03765138","askPx":"77218.2","askSz":"0.13437612",
"bidPx":"77218.1","bidSz":"2.46761283","open24h":"77323.8","high24h":"78832.2",
"low24h":"76515","volCcy24h":"652281908.20076346","vol24h":"8409.04706791",
"ts":"1787416524064","sodUtc0":"78338.1","sodUtc8":"76991.1"}]}
```

Toutes les réponses ont la même enveloppe : `code`, `msg`, `data`. `code` vaut `"0"` quand tout va bien. Chaque nombre est une **chaîne de caractères**, pas un nombre JSON — c'est délibéré, un `float64` ne représente pas exactement `0.03765138`.

Les principaux endpoints publics :

| Usage | Route | Limite |
|---|---|---|
| Tous les tickers d'un type | `GET market/tickers?instType=SPOT` | 20 req / 2 s, par IP |
| Un ticker | `GET market/ticker?instId=BTC-USDT` | 20 req / 2 s, par IP |
| Carnet d'ordres | `GET market/books?instId=BTC-USDT&sz=20` | 40 req / 2 s, par IP |
| Bougies | `GET market/candles?instId=BTC-USDT&bar=1D` | 40 req / 2 s, par IP |
| Instruments listés | `GET public/instruments?instType=SPOT` | 20 req / 2 s, par IP + type |
| Funding rate d'un perpétuel | `GET public/funding-rate?instId=BTC-USDT-SWAP` | 10 req / 2 s, par IP + instrument |
| Heure serveur | `GET public/time` | 10 req / 2 s, par IP |

### Endpoints privés : quatre en-têtes

Tout ce qui touche à un compte demande quatre en-têtes HTTP :

| En-tête | Contenu |
|---|---|
| `OK-ACCESS-KEY` | la clé API, un identifiant public |
| `OK-ACCESS-SIGN` | la signature, encodée en base64 |
| `OK-ACCESS-TIMESTAMP` | horodatage ISO 8601 UTC à la milliseconde, ex. `2020-12-08T09:08:57.715Z` |
| `OK-ACCESS-PASSPHRASE` | la passphrase choisie à la création de la clé |

Le serveur les vérifie dans un ordre précis, et ça s'observe. Trois requêtes, trois erreurs différentes :

```bash
# 1. aucun en-tête
curl -s https://www.okx.com/api/v5/account/balance
{"msg":"Request header OK-ACCESS-KEY can not be empty.","code":"50103"}

# 2. en-têtes présents, horodatage de 2020
{"msg":"Timestamp request expired","code":"50102"}

# 3. horodatage valide, clé inconnue
{"msg":"API key doesn't exist","code":"50119"}
```

Le contrôle d'horodatage passe **avant** la recherche de la clé. Le serveur rejette les requêtes dont l'horodatage s'écarte de plus de **30 secondes** de son heure.

### La signature

<figure class="schema">
<svg viewBox="0 0 640 340" role="img" aria-label="Construction de la signature OK-ACCESS-SIGN à partir de la chaîne pré-hash, du HMAC-SHA256 et de l'encodage base64, puis les quatre en-têtes envoyés">
  <text x="14" y="16" font-size="11" fill="var(--texte-faible)">1 · CHAÎNE PRÉ-HASH — concaténation de quatre morceaux</text>

  <text x="14" y="32" font-size="9" fill="var(--texte-faible)">timestamp</text>
  <text x="194" y="32" font-size="9" fill="var(--texte-faible)">méthode</text>
  <text x="250" y="32" font-size="9" fill="var(--texte-faible)">requestPath, query comprise</text>
  <text x="512" y="32" font-size="9" fill="var(--texte-faible)">body</text>

  <rect x="14" y="38" width="168" height="28" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="22" y="56" font-size="9" fill="var(--code-texte)">2026-08-22T16:20:00.000Z</text>
  <text x="186" y="57" font-size="12" fill="var(--texte-faible)">+</text>

  <rect x="196" y="38" width="44" height="28" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="204" y="56" font-size="9" fill="var(--code-texte)">GET</text>
  <text x="244" y="57" font-size="12" fill="var(--texte-faible)">+</text>

  <rect x="254" y="38" width="246" height="28" rx="4" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="262" y="56" font-size="9" fill="var(--code-texte)">/api/v5/account/balance?ccy=BTC</text>
  <text x="504" y="57" font-size="12" fill="var(--texte-faible)">+</text>

  <rect x="514" y="38" width="112" height="28" rx="4" fill="var(--fond-alt)" stroke="var(--bordure)"/>
  <text x="522" y="56" font-size="9" fill="var(--texte-faible)">body vide en GET</text>

  <path d="M320 66 L320 82" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M316 78 L320 84 L324 78 Z" fill="var(--texte-faible)"/>

  <rect x="14" y="90" width="120" height="26" rx="4" fill="var(--fond-2)" stroke="var(--danger)"/>
  <text x="74" y="107" font-size="10" fill="var(--danger)" text-anchor="middle">secretKey</text>
  <path d="M134 103 L146 103" stroke="var(--danger)" stroke-width="1.2"/>
  <path d="M142 99 L148 103 L142 107 Z" fill="var(--danger)"/>

  <rect x="150" y="84" width="340" height="38" rx="6" fill="var(--accent-voile)" stroke="var(--accent)" stroke-width="1.5"/>
  <text x="320" y="101" font-size="11" fill="var(--accent)" text-anchor="middle" font-weight="600">HMAC-SHA256(chaîne, secretKey)</text>
  <text x="320" y="115" font-size="9" fill="var(--texte-faible)" text-anchor="middle">RFC 2104</text>

  <path d="M320 122 L320 134" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M316 130 L320 136 L324 130 Z" fill="var(--texte-faible)"/>

  <rect x="150" y="138" width="340" height="26" rx="5" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="320" y="155" font-size="11" fill="var(--texte)" text-anchor="middle">encodage base64</text>

  <path d="M320 164 L320 176" stroke="var(--texte-faible)" stroke-width="1.2"/>
  <path d="M316 172 L320 178 L324 172 Z" fill="var(--texte-faible)"/>

  <rect x="100" y="180" width="440" height="28" rx="5" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="320" y="199" font-size="10" fill="var(--code-texte)" text-anchor="middle">FN++QZPqWIZja9FNV7ev3w3IvSQUleBYxtJidJKKB+E=</text>

  <text x="14" y="228" font-size="11" fill="var(--texte-faible)">2 · LES QUATRE EN-TÊTES ENVOYÉS</text>

  <rect x="14" y="236" width="612" height="88" rx="6" fill="var(--fond-2)" stroke="var(--bordure-forte)"/>
  <text x="26" y="256" font-size="10" fill="var(--code-texte)">OK-ACCESS-KEY:        37c541a1-****-****-****-10fe7a038418</text>
  <text x="26" y="274" font-size="10" fill="var(--code-texte)">OK-ACCESS-SIGN:       FN++QZPqWIZja9FNV7ev3w3IvSQUleBYxtJidJKKB+E=</text>
  <text x="26" y="292" font-size="10" fill="var(--code-texte)">OK-ACCESS-TIMESTAMP:  2026-08-22T16:20:00.000Z</text>
  <text x="26" y="310" font-size="10" fill="var(--code-texte)">OK-ACCESS-PASSPHRASE: ********</text>
</svg>
<figcaption>Le secretKey entre dans le calcul mais ne sort jamais sur le réseau. Le serveur, qui le connaît aussi, refait le même calcul et compare les deux signatures.</figcaption>
</figure>

Quatre étapes, telles que la documentation les décrit :

1. construire la chaîne pré-hash `timestamp + method + requestPath + body` ;
2. la signer par HMAC-SHA256 avec le secretKey ;
3. encoder le résultat en base64 ;
4. le mettre dans `OK-ACCESS-SIGN`.

Trois détails déterminants :

- **`requestPath` inclut la query string.** Pour un `GET`, les paramètres comptent comme partie du chemin, pas comme body. La documentation le dit explicitement : « `GET` request parameters are counted as requestpath, not body ».
- **Le body est la chaîne exacte envoyée.** Réordonner les clés du JSON, ajouter une espace, changer le nombre de décimales : la signature change et la requête est rejetée avec le code `50113`.
- **Le secret ne part jamais.** Il entre dans le calcul des deux côtés. C'est toute la différence avec un mot de passe.

### REST contre WebSocket

Trois points de terminaison en production :

```
wss://ws.okx.com:8443/ws/v5/public     canaux publics, aucune authentification
wss://ws.okx.com:8443/ws/v5/private    canaux de compte, après login signé
wss://ws.okx.com:8443/ws/v5/business   canaux métier
```

Le dialogue complet, capturé le 22 août 2026 :

```
>>> {"op":"subscribe","args":[{"channel":"tickers","instId":"BTC-USDT"}]}
<<< {"event":"subscribe","arg":{"channel":"tickers","instId":"BTC-USDT"},"connId":"99e9eb98"}
<<< {"arg":{...},"data":[{"instId":"BTC-USDT","last":"77232.7",...,"ts":"1787415703063"}]}
<<< {"arg":{...},"data":[{"instId":"BTC-USDT","last":"77232.7",...,"ts":"1787415703164"}]}
<<< {"arg":{...},"data":[{"instId":"BTC-USDT","last":"77232.7",...,"ts":"1787415703362"}]}
```

Un message d'abonnement, un accusé, puis le serveur pousse. Les horodatages sont espacés de 101 ms puis 198 ms : le serveur émet quand la donnée change, pas à intervalle fixe.

Les contraintes documentées :

| Règle | Valeur |
|---|---|
| Ouverture de connexion | 3 requêtes par seconde, par IP |
| `subscribe` + `unsubscribe` + `login` | 480 par heure et par connexion |
| Rupture automatique | si rien n'a été poussé pendant plus de 30 s |
| Maintien en vie | envoyer la chaîne `ping`, attendre `pong` |
| Connexions par canal et par sous-compte | 30 |

Le keepalive n'est pas le ping/pong du protocole WebSocket : c'est la chaîne de caractères `ping` en texte, à laquelle le serveur répond `pong`. Vérifié :

```
>>> ping
<<< pong
```

Une erreur d'abonnement arrive elle aussi en texte, pas en code HTTP :

```
>>> {"op":"subscribe","args":[{"channel":"tickers","instId":"BTC-INEXISTANT"}]}
<<< {"event":"error","msg":"Wrong URL or channel:tickers,instId:BTC-INEXISTANT
     doesn't exist...","code":"60018","connId":"ed8c407d"}
```

### Les clés API

Trois objets, trois rôles différents :

| Objet | Rôle | Circule sur le réseau |
|---|---|---|
| **API key** | identifiant public, dit *qui* fait la requête | oui, en clair dans un en-tête |
| **Secret key** | clé du HMAC, prouve que c'est bien toi | **jamais** |
| **Passphrase** | second facteur lié à la clé | oui, en clair dans un en-tête |

OKX précise qu'il ne stocke qu'un **hash salé** de la passphrase et qu'il ne peut pas la retrouver : perdue, il faut recréer un jeu de clés.

Trois permissions cumulables :

- **Read** — consulter le compte, l'historique, les ordres.
- **Trade** — passer et annuler des ordres, transférer des fonds entre tes comptes, changer des réglages.
- **Withdraw** — faire sortir des fonds.

Et une sécurité qui devrait être le réflexe par défaut pour un profil réseau : la **liste blanche d'IP**. Chaque clé peut être liée à **20 adresses au maximum**, en IPv4, IPv6 ou en notation de plage réseau. Une requête venant d'ailleurs est rejetée avec le code `50110` — « Your IP {adresse} is not included in your API key's IP whitelist ».

Conséquence documentée, et elle mord : **une clé avec les permissions `trade` ou `withdraw` qui n'est liée à aucune IP expire après 14 jours d'inactivité.** Seuls les appels qui demandent réellement l'authentification comptent comme une utilisation ; côté WebSocket, seule l'opération de login compte.

### Les limites de débit

- Chaque endpoint a sa propre limite, indiquée dans sa fiche de documentation.
- Les endpoints **publics** sont limités **par adresse IP**.
- Les endpoints **privés** sont limités **par User ID** — et chaque sous-compte a son propre User ID.
- Les abonnements et logins WebSocket sont limités **par connexion**.
- Au niveau d'un sous-compte, **1 000 requêtes d'ordre par 2 secondes** au maximum, tous endpoints d'ordre confondus.

Dépassement : code `50011`.

## Le pont CIEL

> [!ciel] Tu connais déjà ça
> **REST contre WebSocket, c'est polling contre push**, la distinction exacte que tu as vue en supervision réseau : interroger un agent SNMP toutes les *n* secondes, ou attendre qu'il envoie un trap. Le polling paie une requête complète — connexion, en-têtes, réponse — même quand rien n'a bougé, et rate tout ce qui se produit entre deux interrogations. Le push ouvre une connexion une fois, et le serveur parle quand il a quelque chose à dire. Les chiffres sont dans l'exemple ci-dessous, et ils sont sans appel.
>
> **La signature, c'est un `sha256sum` avec un secret.** Tu connais déjà la fonction : elle est sur la page [Les fonctions de hachage](/fondamentaux/hachage). Un hachage brut prouve l'intégrité mais pas l'origine — n'importe qui peut recalculer un `sha256sum`. HMAC ajoute une clé secrète dans le calcul, ce qui transforme « ce message n'a pas été modifié » en « ce message n'a pas été modifié **et** vient de quelqu'un qui connaît le secret ». C'est le même mécanisme que la signature d'un cookie de session, qu'un JWT en HS256, ou que l'en-tête d'authentification d'IPsec.
>
> **L'horodatage dans la chaîne pré-hash est un anti-rejeu.** Sans lui, une requête capturée resterait valide indéfiniment et pourrait être renvoyée telle quelle. En l'incluant dans ce qui est signé, on la rend valide 30 secondes et pas une de plus — même rôle que le numéro de séquence dans IPsec, ou qu'un nonce dans un challenge-response.
>
> **La liste blanche d'IP est une ACL**, avec les mêmes limites que toutes les ACL par adresse : elle ne protège pas si l'attaquant est sur ta machine, et elle casse dès que ton IP change. Sur une connexion domestique en IP dynamique ou derrière un CGNAT, une whitelist devient un piège opérationnel — et sans elle, la clé expire en 14 jours.

## Exemple chiffré

### 1 — Signer une requête, de bout en bout

Le script complet, avec la clé d'exemple de la documentation. Il tourne tel quel sur n'importe quel Linux :

```bash
KEY="00000000-0000-0000-0000-000000000000"
SECRET="22582BD0CFF14C41EDBF1AB98506286D"
PASS="ma-passphrase"

TS=$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)
METHODE="GET"
CHEMIN="/api/v5/account/balance?ccy=BTC"

SIGN=$(printf '%s' "${TS}${METHODE}${CHEMIN}" \
       | openssl dgst -sha256 -hmac "$SECRET" -binary | base64)

curl -s "https://www.okx.com${CHEMIN}" \
  -H "OK-ACCESS-KEY: $KEY" \
  -H "OK-ACCESS-SIGN: $SIGN" \
  -H "OK-ACCESS-TIMESTAMP: $TS" \
  -H "OK-ACCESS-PASSPHRASE: $PASS"
```

Sortie réelle :

```
{"msg":"API key doesn't exist","code":"50119"}
```

C'est **le bon résultat**. `50119` signifie que l'horodatage a été accepté, que le format de la signature a été accepté, et que le serveur est allé jusqu'à chercher la clé dans sa base. Toute la mécanique a fonctionné ; il ne manque qu'une vraie clé.

### 2 — L'effet avalanche sur la signature

Avec un horodatage figé pour que le calcul soit reproductible :

```bash
TS="2026-08-22T16:20:00.000Z"
SECRET="22582BD0CFF14C41EDBF1AB98506286D"

printf '%s' "${TS}GET/api/v5/account/balance?ccy=BTC" \
  | openssl dgst -sha256 -hmac "$SECRET" -binary | base64
printf '%s' "${TS}GET/api/v5/account/balance?ccy=ETH" \
  | openssl dgst -sha256 -hmac "$SECRET" -binary | base64
```

```
FN++QZPqWIZja9FNV7ev3w3IvSQUleBYxtJidJKKB+E=
8lEI1AU0lCMFovq/1s9srJLDVLAJvSMN/Mkmw5Tb6IQ=
```

Un `B` remplacé par un `E` dans la query string, et les deux signatures n'ont aucun caractère commun. Un attaquant qui intercepte la première requête ne peut pas la transformer en une requête sur une autre devise : il faudrait recalculer la signature, donc connaître le secret.

### 3 — Ce que fait vraiment une limite de débit

L'endpoint `market/ticker` est limité à 20 requêtes par 2 secondes et par IP. Soixante requêtes lancées en parallèle depuis la même machine :

```bash
seq 1 60 | xargs -P 60 -I{} \
  curl -s "https://www.okx.com/api/v5/market/ticker?instId=BTC-USDT" -o resp_{}.json
grep -h -o '"code":"[0-9]*"' resp_*.json | sort | uniq -c
```

```
     33 "code":"0"
     27 "code":"50011"
```

Trente-trois passent, vingt-sept sont refusées avec :

```json
{"msg":"Too Many Requests","code":"50011"}
```

Aucune n'a été mise en file d'attente : le dépassement n'est pas ralenti, il est jeté.

### 4 — Polling contre push, mesuré

Trente secondes, sur la même machine, au même moment, sur `BTC-USDT`. D'un côté un `GET market/ticker` toutes les 200 ms — soit 5 requêtes par seconde, sous la limite de 10. De l'autre une connexion WebSocket abonnée au canal `tickers`.

| | REST, 5 req/s | WebSocket |
|---|---|---|
| Requêtes ou messages | 148 | 181 |
| Snapshots distincts obtenus | **104** | **181** |
| Redondance | 44 réponses déjà vues (30 %) | 0 |
| Octets de JSON | 53 374 | 70 336 |
| En-têtes HTTP mesurés | 974 o par réponse, 109 o par requête | néant après la poignée de main |
| **Total estimé sur le réseau** | **≈ 213 700 o** | **≈ 70 400 o** |
| **Coût par mise à jour utile** | **≈ 2 054 o** | **≈ 389 o** |

Trois fois plus de trafic total, pour 43 % de mises à jour en moins — soit **cinq fois plus d'octets par information utile**. Et ce n'est pas une question de réglage : pour égaler les 181 mises à jour du WebSocket il faudrait interroger environ 6 fois par seconde, en supposant que les changements tombent pile entre deux requêtes, ce qui n'arrive pas. Le polling échantillonne à intervalle fixe ; le marché ne bouge pas à intervalle fixe.

> [!info] Deux mesures, deux instants
> Les chiffres ci-dessus viennent d'une seule fenêtre de 30 secondes, les deux méthodes tournant simultanément dans le même processus. Le nombre de messages dépend directement de l'activité du marché à cet instant : sur une paire calme, le WebSocket enverrait moins et l'écart se creuserait encore.

## Sur OKX

**Créer une clé.** Dans l'espace de compte, section API : `https://www.okx.com/account/my-api`. À la création, tu choisis un nom, la passphrase, les permissions, et éventuellement les IP autorisées. La clé et le secret ne s'affichent qu'une fois.

> [!verifier] Le parcours exact dans l'interface change
> Les libellés de menu, les vérifications demandées et les permissions disponibles dépendent de la version de l'app, du niveau de KYC et de l'entité juridique dont dépend ton compte. La page de gestion des clés fait foi.

**Le mode démo.** OKX expose un environnement de trading simulé sur les mêmes routes, activé par un en-tête supplémentaire :

```
x-simulated-trading: 1
```

Côté WebSocket, les points de terminaison changent : `wss://wspap.okx.com:8443/ws/v5/public`, `.../private`, `.../business`. Détail utile : les clés de démo n'expirent pas au bout de 14 jours.

**Suivre les changements.** OKX publie un journal des modifications de l'API, avec les dates d'entrée en vigueur : `https://www.okx.com/docs-v5/log_en/`. C'est le seul endroit où lire ce qui va casser.

**Une incohérence dans la documentation.** La page d'introduction annonce `https://openapi.okx.com` comme URL REST de production. En pratique, `www.okx.com/api/v5/`, `my.okx.com/api/v5/` et `eea.okx.com/api/v5/` répondent aussi — les quatre ont été testés depuis cette machine et renvoient la même chose. Ce n'est pas documenté comme tel.

## Les pièges

> [!piege] HTTP 200 ne veut pas dire que ça a marché
> Une erreur métier revient avec un code HTTP de succès. Vérifié :
>
> ```
> GET /api/v5/market/ticker?instId=BTC-USDTT   → HTTP 200
> {"code":"51001","msg":"Instrument ID, Instrument ID code, or Spread ID doesn't exist.","data":[]}
> ```
>
> La source de vérité est le champ `code` de l'enveloppe, pas la ligne de statut. Les erreurs d'authentification, elles, sortent bien en `401`, et une route inconnue en `404`. Un client qui ne teste que `response.ok` avalera silencieusement des réponses vides.

> [!piege] La passphrase n'est pas le mot de passe du compte
> C'est une chaîne choisie au moment de créer la clé, propre à cette clé. Elle n'a rien à voir avec le mot de passe de connexion ni avec le code 2FA. OKX n'en stocke qu'un hash salé et ne peut pas la restituer : perdue, la clé est à refaire.

> [!piege] Le fuseau horaire local est la première cause de `50102`
> L'horodatage doit être en UTC, au format ISO 8601 avec les millisecondes. Un `date` sans `-u` produit une heure locale, donc un décalage d'une ou deux heures en France, donc un rejet immédiat. Si l'erreur persiste alors que le format est bon, c'est l'horloge de la machine qui dérive : `GET /api/v5/public/time` donne l'heure du serveur pour comparer.

> [!piege] Une clé « lecture seule » n'est pas une clé inoffensive
> `Read` ne peut rien déplacer, c'est vrai. Elle peut en revanche lire l'intégralité de tes soldes, de tes positions et de ton historique d'ordres. Une clé de lecture qui fuite est une fuite de données, pas un vol de fonds — ce sont deux problèmes différents, et le second n'est pas le seul qui compte.

> [!piege] Sans liste blanche d'IP, la clé s'auto-détruit
> Une clé avec `trade` ou `withdraw` non liée à une IP est supprimée après 14 jours sans utilisation authentifiée. Un bot qu'on laisse dormir deux semaines ne redémarrera pas. Et attention à ce qui compte comme « utilisation » : un appel à un endpoint public n'en est pas un, même si tu passes les en-têtes.

> [!piege] Les limites publiques sont par IP, pas par compte
> Derrière un NAT d'entreprise, un CGNAT d'opérateur mobile ou une IP de sortie de VPN partagée, tu partages le quota de 20 requêtes par 2 secondes avec des inconnus. Un `50011` peut donc arriver sans que tu aies rien fait d'anormal. La contre-mesure n'est pas de réessayer plus vite : c'est de passer au WebSocket.

> [!piege] Réordonner un JSON casse la signature
> Le body signé est la chaîne d'octets exacte envoyée. Une bibliothèque HTTP qui re-sérialise le JSON après le calcul de la signature — ordre des clés, espaces, format des nombres — produit un `50113` incompréhensible. Il faut signer et envoyer **la même chaîne**, construite une seule fois.

## Pour aller plus loin

- [Ce qu'est un exchange centralisé](/okx/exchange-centralise) — les étages que l'API expose
- [Les fonctions de hachage](/fondamentaux/hachage) — SHA-256, la primitive sous le HMAC
- [Comptes de trading et de financement](/okx/comptes) — pourquoi il y a deux endpoints de solde
- [Le carnet d'ordres](/marches/carnet-ordres) — lire `market/books` ligne par ligne
- [Sécuriser un compte d'exchange](/securite/compte-exchange) — clés API, 2FA, liste blanche de retrait
- [Les bots de trading OKX](/produits/bots-okx) — ce qui tourne au-dessus de cette API
