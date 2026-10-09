# Skavyoy — portfolio

Le portfolio de Luke (Skavyoy), élève en Bac Pro CIEL : cybersécurité, réseaux, Linux et électronique.
Un site d'une page en export statique, simple et fluide, à l'esprit terminal : un fond où ondulent des lignes de signal, des cartes sombres et le rack du homelab dessiné en CSS.

En ligne : <https://skavyoy8.github.io>

## Stack

- **Next.js 16** (App Router) en export statique, **TypeScript**, **Tailwind CSS 4**
- Fond animé en **canvas 2D** fait maison, animations en **CSS**, aucune librairie d'animation
- **Playwright** + **axe** pour les tests, **Lighthouse CI** pour la performance

La spécification complète est dans [BRIEF.md](BRIEF.md), le suivi dans [PLAN.md](PLAN.md).

## Lancer le site en local

Il faut Node.js 20.9 ou plus récent.

```bash
npm install
```

```bash
npm run dev
```

Le site s'ouvre sur <http://localhost:3000>.

Autres commandes utiles :

| Commande | Rôle |
| --- | --- |
| `npm run lint` | vérifie le style du code (ESLint) |
| `npm run typecheck` | vérifie les types (TypeScript) |
| `npm run build` | construit le site statique dans `out/` |
| `npm run test:e2e` | lance les tests Playwright (ordinateur, téléphone, mouvement réduit) |
| `npm run lh` | lance Lighthouse sur le build (mobile et ordinateur) |

## Modifier le contenu

Tout le texte du site est dans `src/content/`, un fichier par section :

| Fichier | Contenu |
| --- | --- |
| `site.ts` | nom, accueil, pied de page |
| `about.ts` | « À propos » et la fiche de profil |
| `pillars.ts` | les 4 compétences, les outils |
| `homelab.ts` | le rack (unités), les services, le câblage |
| `lab.ts` | les projets |
| `timeline.ts` | le parcours scolaire |
| `tryhackme.ts` | profil, stats, rooms et badges TryHackMe |
| `links.ts` | réseaux sociaux, email, CV, contact |

Tout est rempli avec de vraies infos : rien n'est inventé. Pour mettre à jour les chiffres TryHackMe (rooms, badge, classement), modifie `tryhackme.stats` et la date `snapshotDate` dans `src/content/tryhackme.ts`. Pour ajouter une room, ajoute une entrée dans `tryhackme.rooms` (nom, catégorie, une phrase, lien).

Tes réseaux (GitHub, TryHackMe, Discord, Instagram, TikTok, Steam) sont dans `src/content/links.ts`. Il n'y a volontairement ni email ni CV sur le site : le contact passe par Discord.

## Déployer

Le site se déploie tout seul sur GitHub Pages à chaque push sur `main` (workflow `.github/workflows/deploy.yml`).
Le workflow vérifie le code, construit le site et le publie.

```bash
git push origin main
```

Le suivi du déploiement se trouve dans l'onglet **Actions** du dépôt sur GitHub.

## Bon à savoir

- **Mode calme** : le bouton en forme d'onde, dans la barre du haut, fige le fond et coupe les animations. Il s'active tout seul si l'appareil demande moins d'animations.
- **Fond animé** : il est dessiné tout de suite, mais ne bouge qu'au premier geste (scroll, souris, toucher) : la page se charge plus vite.
- **Terminal caché** : `Ctrl + K` (ou `⌘K`), puis tape `help`.
