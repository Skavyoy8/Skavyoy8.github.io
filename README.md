# Registre

Wiki personnel expliquant le fonctionnement **technique** de la crypto et d'OKX.
Cahier des charges complet : [SPEC.md](SPEC.md) · Suivi : [PROGRESS.md](PROGRESS.md)

## Lancer le site en local

Node 22 est installé via nvm. Si `node -v` ne répond pas `v22.x`, ouvre un nouveau terminal
(nvm se charge au démarrage du shell), puis :

```bash
cd ~/registre && npm run dev
```

Le site tourne alors sur http://localhost:4321 et se recharge à chaque enregistrement.

## Écrire une page

Tout le contenu est dans `content/`, en Markdown brut. **Ce dossier est un vault Obsidian** :
ouvre `~/registre/content` comme vault, sur PC comme sur iPhone.

- un fichier `.md` = une page du site
- le dossier détermine la section : `content/okx/frais.md` → `/okx/frais`
- les modèles de `_modeles/` remplissent le frontmatter automatiquement
- les liens internes s'écrivent `[texte](/okx/frais)` — la config du vault force ce format,
  pas les `[[wikilinks]]`

Écris, `git add . && git commit && git push` : le site se reconstruit tout seul.

## Les quatre encadrés

```markdown
> [!info] Précision utile
> [!ciel] Le pont vers ce que tu connais déjà
> [!piege] Erreur de compréhension classique
> [!verifier] Information susceptible d'avoir changé
```

Ils s'affichent déjà stylés dans Obsidian, et sont restylés sur le site.

## Structure

| Chemin | Rôle |
|---|---|
| `content/` | le contenu Markdown — le vault Obsidian |
| `src/components/` | les briques réutilisables (callouts, blocs de prix, navigation) |
| `src/layouts/` | les gabarits de page |
| `src/pages/` | les routes du site |
| `src/styles/` | le design system |
| `src/lib/okx.js` | le client de l'API publique OKX |

## Données de marché

Aucun prix n'est écrit en dur. Tout vient de l'API publique OKX v5, appelée depuis le
navigateur, sans clé API. Si l'API ne répond pas, la page reste lisible.
