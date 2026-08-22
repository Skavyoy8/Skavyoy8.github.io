# Guide d'utilisation — Registre

Site en ligne : **https://skavyoy8.github.io**
Dépôt : **https://github.com/Skavyoy8/Skavyoy8.github.io**

Ce guide explique comment faire tourner, écrire et publier le wiki.
Pour le cahier des charges, voir [SPEC.md](SPEC.md). Pour l'avancement, [PROGRESS.md](PROGRESS.md).

---

## 1. La règle Node à connaître

Astro 7 exige Node 22. Ta machine avait Node 20, qui est installé à côté et sert
à d'autres choses. Node 22 a été ajouté via **nvm**, qui se charge à l'ouverture
d'un terminal.

Si une commande `npm` échoue avec « Node.js v20 is not supported », c'est que tu
es dans un shell où nvm n'a pas été chargé. Deux solutions :

```bash
source ~/.nvm/nvm.sh && nvm use 22
```

Vérification : `node -v` doit répondre `v22.23.2`.

---

## 2. Voir le site sur ton PC

```bash
cd ~/registre && npm run dev
```

Ouvre http://localhost:4321. Chaque enregistrement de fichier recharge la page.

Une seule chose ne marche pas en mode `dev` : **la recherche**. Son index est
construit après le build. Pour la tester :

```bash
cd ~/registre && npm run build && npm run preview
```

---

## 3. Écrire une page

### Ouvrir le vault

Dans Obsidian : *Ouvrir un autre vault* → *Ouvrir un dossier comme vault* →
`~/registre/content`.

Ce dossier ne contient que du Markdown. Le code du site est ailleurs, tu ne le
verras jamais dans Obsidian. La config du vault est déjà en place : thème repris
de ton vault `~/Notes`, liens en markdown (pas de `[[wikilink]]`), et trois
modèles de note.

Sur iPhone, synchronise `~/registre/content` comme n'importe quel vault.

### Créer la note

Le dossier détermine la section du site :

| Fichier | Adresse |
|---|---|
| `content/okx/frais.md` | `/okx/frais` |
| `content/fondamentaux/hachage.md` | `/fondamentaux/hachage` |
| `content/cryptos/eth.md` | `/cryptos/eth` |

Utilise un modèle (`Ctrl+P` → *Insérer un modèle*) :

- **page-contenu** — une page normale
- **fiche-crypto** — une fiche d'actif, avec le bloc de prix
- **terme-glossaire** — une définition courte

### Le frontmatter

Seul `titre` est **obligatoire**. Tout le reste a une valeur par défaut, pour
qu'une note écrite dans le métro ne casse jamais la mise en ligne.

```yaml
---
titre: "Le funding rate"          # obligatoire
resume: "Le mécanisme qui…"       # affiché sous le titre et dans les listes
niveau: "intermediaire"           # bases | intermediaire | avance
ordre: 40                         # position dans la section (par pas de 10)
prerequis: ["/derives/perpetuels"] # liens cliquables « À lire avant »
termes: ["funding-rate"]          # pour le futur glossaire
sources:
  - titre: "OKX — documentation"
    url: "https://…"
statut: "redige"                  # ebauche | redige | verifie
---
```

Tu n'as pas à écrire de date : elle est prise automatiquement dans le dernier
commit qui a touché le fichier.

---

## 4. La syntaxe disponible

### Les quatre encadrés

```markdown
> [!info] Précision utile
> Le texte de l'encadré.

> [!ciel] Tu connais déjà ça
> Le pont vers un truc de ton cours. C'est la signature du site.

> [!piege] Titre du piège
> L'erreur de compréhension classique.

> [!verifier]
> Information susceptible d'avoir changé, avec le lien vers la source.
```

C'est la syntaxe native d'Obsidian : ces encadrés s'affichent déjà stylés sur
ton téléphone, et le site les restyle à sa façon.

### Un bloc de prix en direct

```markdown
<div data-okx-prix="BTC-USDT"></div>
```

Rien d'autre à faire. Le prix, la variation 24 h, le haut, le bas et le volume
sont récupérés sur l'API publique d'OKX au chargement de la page, avec le bon
nombre de décimales pour la paire. Si l'API ne répond pas, le bloc affiche
« indisponible » et le reste de la page continue de fonctionner.

N'écris **jamais** un prix en dur dans une page.

### Les liens

```markdown
[le carnet d'ordres](/marches/carnet-ordres)
```

Toujours cette forme, jamais `[[wikilink]]`. La config du vault force déjà ce
format quand tu insères un lien avec `Ctrl+K`.

### Un schéma

Un `<figure class="schema">` contenant du SVG écrit à la main. Les couleurs
doivent être des variables (`var(--accent)`, `var(--texte-doux)`…) et jamais des
codes hexadécimaux, sinon le schéma devient illisible en thème clair. Regarde
`content/okx/on-chain-off-chain.md` pour un exemple complet.

---

## 5. Publier

```bash
cd ~/registre && git add . && git commit -m "ajout de la page sur le spread" && git push
```

Le reste est automatique : GitHub reconstruit le site et le met en ligne en
une à deux minutes. Pour suivre :

```bash
gh run watch --repo Skavyoy8/Skavyoy8.github.io
```

Si l'exécution échoue, `gh run view --log-failed --repo Skavyoy8/Skavyoy8.github.io`
donne la raison exacte.

---

## 6. Les commandes

| Commande | Ce que ça fait |
|---|---|
| `npm run dev` | serveur local avec rechargement automatique |
| `npm run build` | construit le site dans `dist/` et l'index de recherche |
| `npm run preview` | sert le site construit, recherche comprise |
| `npm run liens` | liste les liens internes qui pointent vers des pages pas encore écrites |

`npm run liens` est utile après chaque session d'écriture : il te dit exactement
quelles pages tu as promises dans tes « Pour aller plus loin » sans les avoir
encore écrites.

---

## 7. Dépannage

**« Node.js v20 is not supported »** — voir la section 1.

**La recherche dit « index absent »** — normal en `npm run dev`. Lance un
`npm run build` puis `npm run preview`.

**Le build échoue sur une page** — le message donne le fichier et la ligne. La
cause la plus fréquente est un frontmatter mal formé : deux-points sans espace
après, guillemets non fermés, indentation cassée dans `sources:`.

**Une section reste vide sur le site** — c'est normal tant qu'aucun `.md` n'y
est. Le build affiche un avertissement par section vide, ce n'est pas une erreur.

**Le site en ligne n'est pas à jour** — vérifie que le push est parti
(`git log origin/main --oneline -1`) et que l'exécution GitHub est verte.

---

## 8. Ce que le site ne doit jamais contenir

Rappel des anti-objectifs du §3 de SPEC.md, parce que c'est ce qui définit le
projet autant que le reste :

- aucun conseil d'investissement, aucune stratégie, aucun « comment gagner »
- aucun bandeau moralisateur (« soyez prudent », « le trading est risqué »)
- aucun contenu promotionnel pour OKX
- aucun remplissage : une page courte et exacte vaut mieux qu'une page longue et vague
- rien d'inventé : en cas de doute, un encadré `> [!verifier]` et le lien vers la source

Le risque se traite comme de la mécanique : une formule, un exemple chiffré, un fait.
