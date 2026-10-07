# PLAN — Portfolio 3D « SIGNAL » de Skavyoy

> Suivi d'exécution du `BRIEF.md`. Une case n'est cochée qu'avec la preuve sous les yeux (sortie de commande ou capture).
> Direction artistique retenue au kickoff (2026-10-07) : **SIGNAL** (nuage de particules unique qui change de forme au scroll).

## Versions (vérifiées sur npm et dans la doc embarquée le 2026-10-07)

| Lib | Version | Note |
| --- | --- | --- |
| next | 16.4.0 | App Router, Turbopack, `output: 'export'` ; doc lue dans `node_modules/next/dist/docs` |
| react / react-dom | 19.3.0 | R3F 9.8 accepte `>=19 <19.4` |
| typescript | 6.0.3 | **pas 7.0** : typescript-eslint 8.71 exige `<6.1` (TS 7 est la réécriture en Go) |
| tailwindcss / @tailwindcss/postcss | 4.3.3 | config CSS-first via `@theme`, pas de `tailwind.config.js` |
| eslint / eslint-config-next | 9.39.5 / 16.4.0 | **pas ESLint 10** : eslint-plugin-react, jsx-a11y et import s'arrêtent à ESLint 9 |
| three / @types/three | 0.186.1 / 0.186.0 | |
| @react-three/fiber | 9.8.1 | |
| @react-three/drei | 10.7.9 | `<View>` rend en `useFrame` priorité ≥ 1 → rendu de la scène principale explicite |
| @react-three/postprocessing / postprocessing | 3.1.3 / 6.39.5 | |
| @react-three/rapier | 2.2.0 | `useRopeJoint`, `useSphericalJoint` pour le lanyard |
| gsap / @gsap/react | 3.15.0 / 2.1.2 | ScrollTrigger, SplitText (`mask: 'lines'`, `autoSplit`), ScrambleText, tous gratuits |
| lenis | 1.3.26 | `autoRaf: false`, piloté par `gsap.ticker` |
| motion | 14.0.0 | `motion/react` : `LazyMotion` + `m`, `domMax` chargé à la demande |
| @next/mdx / @mdx-js/loader / @mdx-js/react | 16.4.0 / 3.1.1 / 3.1.1 | `mdx-components.tsx` obligatoire en App Router |
| qrcode | 1.5.4 | QR du badge (matrice dessinée dans le canvas) |
| @playwright/test / @axe-core/playwright | 1.63.0 / 4.13.0 | |
| @lhci/cli | 0.15.1 | Lighthouse CI |
| Actions GitHub | checkout v7, setup-node v7, configure-pages v6, upload-pages-artifact v5, deploy-pages v5 | dernières releases au 2026-10-07 |

## Arborescence

```
.github/workflows/deploy.yml     build + export + déploiement Pages (push main, manuel, cron hebdo)
scripts/                         serve-out.mjs (sert out/ avec basePath), lighthouse.mjs, generate-og.mjs
public/                          .nojekyll, images/avatar.jpg, og.png, icônes
src/app/                         layout, page (one-page), lab/[slug] (MDX statique), link/, sitemap, robots, not-found
src/components/layout/           Nav, Menu, Footer, SmoothScroll, Providers, Overlays (grain, grille)
src/components/sections/         Hero, About, Interests, Lab, Parcours, Rooms, Badges, Contact
src/components/ui/               boutons magnétiques, chips, Todo, Frame viseur, Scramble, Counter, Toast, Cursor, Terminal, Preloader…
src/components/three/            SceneLoader (dynamic ssr:false), Experience, Particles, Effects, Lanyard, Fallback
src/content/                     tout le texte, typé ; les manques sont des `TODO('[À REMPLIR] …')`
src/hooks/ · src/lib/            calm (store), sceneState (refs partagées GSAP → useFrame), gsap, lenis, github, asset()
src/shaders/                     GLSL des particules (chaînes TS)
tests/e2e/                       Playwright : desktop 1440×900, mobile 390×844, reduced-motion
```

## Découpage technique de la scène 3D

- **Un seul `<Canvas>`** fixe (`SceneLoader` → `dynamic(() => import('./Experience'), { ssr: false })`), monté après le premier rendu et après `requestIdleCallback` : le LCP reste le titre HTML. `eventSource` = racine du document, `eventPrefix: 'client'`, `frameloop="demand"` + `invalidate()` appelé par `gsap.ticker` tant que l'onglet est visible et que le mode calme est coupé.
- **`sceneState`** (objet module, pas de React) : `progress` (0 → 4 : noyau, onde, circuit, rack, portail), `square`, `explode`, `focus`, `dim`, `portal`, `glitch`, `pointer`. GSAP/ScrollTrigger l'écrivent (scrub), `useFrame` le lit et copie dans les uniforms. Zéro `setState`, zéro allocation par frame.
- **Particules** : `THREE.Points` + `ShaderMaterial`. 65 536 points desktop, 16 384 mobile ; `PerformanceMonitor` baisse le `drawRange` (les points sont mélangés, donc un préfixe = un sous-échantillon uniforme) et coupe le post-process. Attributs : `position` (noyau, sphère de Fibonacci), `aWave`, `aCircuit`, `aRack`, `aPortal`, `aRand` (délai, taille, phase, teinte), `aMeta` (piste, abscisse, unité du rack, LED). Formes générées par PRNG seedé (déterministe, pur).
- **Vertex shader** : mélange forme A → forme B avec délai par particule, bruit de curl au milieu de la transition, onde sinus→carré (`uSquare`), impulsions le long des pistes, LED qui clignotent, vue éclatée par unité (`uExplode`, même formule côté CPU pour projeter les légendes HTML), portail en rotation différentielle (`uPortal`), répulsion autour du pointeur (raycast sur le plan z=0), retrait (`uDim` : opacité ↓, taille ↑ façon flou).
- **Post-process** (desktop, coupé si les FPS chutent) : Bloom `mipmapBlur`, Noise, Vignette.
- **Badge lanyard** : drei `<View>` (index 2, rendu après la scène principale) dans la section À propos, chargé (rapier compris) à l'approche de la section ; corde de joints rapier, bande = ruban préalloué mis à jour en place, carte texturée en canvas (recto/verso, QR GitHub, avatar). Fallback : carte DOM en tilt CSS.
- **Fallback** : pas de WebGL ou mode calme → fond en dégradé + visuels SVG (schéma du rack, onde) ; le site reste complet.

## Phases

### P0 — Init
- [ ] P0.1 Dépendances installées en versions exactes — `npm ls --depth=0`
- [ ] P0.2 `next.config.ts` : `output: 'export'`, `trailingSlash`, `images.unoptimized`, `basePath` depuis `NEXT_PUBLIC_BASE_PATH` — `npm run build` → `out/index.html`
- [ ] P0.3 TypeScript strict + ESLint flat (core-web-vitals + typescript) — `npm run lint` et `npm run typecheck` sans erreur
- [ ] P0.4 Tailwind v4 CSS-first — classes présentes dans le CSS exporté
- [ ] P0.5 `asset()` + `public/.nojekyll` — `grep` : aucun basePath en dur
- [ ] P0.6 Playwright sur le build statique servi avec basePath `/e2e-base` (3 projets) — `npm run test:e2e`
- [ ] P0.7 Workflow Pages (configure-pages → `base_path`, upload, deploy ; push, manuel, cron) — run GitHub vert + URL en 200
- [ ] P0.8 Script Lighthouse CI mobile + desktop — `npm run lh` affiche les 4 scores

### P1 — Design system & contenu
- [ ] P1.1 Tokens `@theme` (palette SIGNAL), polices `next/font` (Geist, Geist Mono, Instrument Serif)
- [ ] P1.2 Grain SVG, grille 12 colonnes, coins viseur, index de section mono
- [ ] P1.3 Composants UI de base (boutons, chips, `Todo`, cadres, en-têtes de section)
- [ ] P1.4 `src/content/` typé, réponses du kickoff reportées, `[À REMPLIR]` pour les manques
- [ ] P1.5 Toutes les sections en HTML statique responsive (héros → footer, nav + menu)
- [ ] P1.6 Pages `/lab/[slug]` en MDX (homelab, dashboard-pronote, portfolio) + page `/link/`
- [ ] P1.7 Repos GitHub récupérés au build, fallback JSON local
- [ ] P1.8 SEO : metadata, OG 1200×630, sitemap, robots, JSON-LD `Person`, icônes, `theme-color`
- [ ] P1.V lint + typecheck + build + e2e + captures 1440 / 390 / reduced-motion

### P2 — Motion
- [ ] P2.1 Lenis + ScrollTrigger synchronisés (`gsap.ticker`, `lagSmoothing(0)`)
- [ ] P2.2 Préloader : compteur sur le vrai chargement, lignes de boot, rideau, passable, une fois par session
- [ ] P2.3 Reveals SplitText par lignes masquées, scramble des labels, compteurs
- [ ] P2.4 Nav : `mix-blend-difference`, section courante décryptée, barre de progression ; menu plein écran (stagger, aperçu, focus trap, Échap)
- [ ] P2.5 Curseur custom (lien / drag / voir) et boutons magnétiques
- [ ] P2.6 Rooms : chips + compteurs, recherche, tri, `layout` + `AnimatePresence`, compteur qui défile, état vide
- [ ] P2.7 Piliers : scroll horizontal pinné (desktop) / cartes empilées (mobile), micro-animations SVG
- [ ] P2.8 Frise SVG tracée au scroll, footer sticky révélé
- [ ] P2.V lint + typecheck + build + e2e + captures

### P3 — Scène 3D
- [ ] P3.1 Canvas unique chargé après le 1er rendu, `frameloop="demand"`, pause onglet caché / mode calme
- [ ] P3.2 Particules + 5 formes procédurales
- [ ] P3.3 Morphs pilotés au scroll (stagger, curl, taille, luminosité)
- [ ] P3.4 Pointeur : parallaxe caméra + répulsion locale ; impulsions du circuit
- [ ] P3.5 Post-process desktop, `PerformanceMonitor` + `AdaptiveDpr`, `drawRange` adaptatif
- [ ] P3.6 Retrait de la 3D sur les sections denses
- [ ] P3.7 Fallback sans WebGL / mode calme
- [ ] P3.V lint + typecheck + build + e2e + captures

### P4 — Fonctionnalités signature
- [ ] P4.1 Badge lanyard physique (souris + tactile) + fallback
- [ ] P4.2 Terminal `Ctrl+K` / `⌘K` / `` ` `` (commandes, Tab, historique, `aria-live`, `sudo hire-luke`)
- [ ] P4.3 Mode calme (toggle nav, auto `prefers-reduced-motion`, mémorisé)
- [ ] P4.4 Badges en cartes holographiques
- [ ] P4.5 Lab : séquence pinnée rack → vue éclatée légendée → services Proxmox → câblage
- [ ] P4.6 Contact : portail qui accélère au survol, email obfusqué, Discord copiable + toast
- [ ] P4.7 Konami code (glitch + message)
- [ ] P4.V lint + typecheck + build + e2e + captures

### P5 — Polish
- [ ] P5.1 Lighthouse : Perf ≥ 80 mobile / ≥ 90 desktop, A11y ≥ 95, BP ≥ 95, SEO ≥ 95, CLS < 0,05
- [ ] P5.2 axe : 0 violation serious/critical (3 projets)
- [ ] P5.3 Responsive 360 → 2560 px
- [ ] P5.4 Réglage fin des timings, OG vérifiée

### P6 — QA finale & livraison
- [ ] P6.1 `npm run test:e2e` 100 % vert (desktop, mobile, reduced-motion), 0 erreur console
- [ ] P6.2 Captures de chaque section desktop + mobile vérifiées
- [ ] P6.3 README (local, contenu, déploiement)
- [ ] P6.4 Déploiement vérifié en ligne, `git status` propre, liste des `[À REMPLIR]` restants
