# PLAN — Portfolio « SIMPLE » de Skavyoy

> Suivi d'exécution du `BRIEF.md`. Une case n'est cochée qu'avec la preuve sous les yeux (sortie de commande ou capture).
> Direction au kickoff (2026-10-07) : SIGNAL (particules). **Le même jour, Luke a changé de direction** sur la vidéo « Relay » : « je veux un site comme la vidéo ». Direction **FIBRE** : ruban de fibres 3D accroché à la page, bloom, verre dépoli, rack homelab en 3D, rien qui suive la souris. Les cases SIGNAL devenues sans objet sont marquées *remplacé* ; le travail FIBRE est suivi en P7.

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
| @react-three/postprocessing / postprocessing | 3.1.3 / 6.39.5 | Bloom `mipmapBlur`, ToneMapping ACES, Vignette ; `postprocessing` accepte three `< 0.187` |
| ~~@react-three/drei, @react-three/rapier~~ | — | désinstallés : plus de `View` ni de lanyard physique |
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
scripts/                         serve-out.mjs (sert out/ avec basePath), lighthouse.mjs, generate-og.mjs, encode-email.mjs
public/                          .nojekyll, images/avatar.jpg, og.png, icônes
src/app/                         layout, page (one-page), lab/[slug] (MDX statique), link/, sitemap, robots, not-found
src/components/layout/           Nav, Menu, Footer, SmoothScroll, Providers
src/components/sections/         Hero (+ HeroPanel, HeroLog), About, Interests (+ demos/), Manifesto, Lab (+ RackIso), Parcours (+ SchoolYear, TimelineSlider), Rooms, Showcase (Badges, Contact)
src/components/ribbon/           RibbonLoader (dynamic ssr:false), Scene (Canvas, bloom), path (chemin ancré aux sections), Rack + rack3d (rack 3D), RibbonPoster (SVG statique), webgl
src/components/ui/               Primitives (Pill, SectionHead, LogoMark…), Todo, Terminal, Preloader, BadgeFlip, HoloCard, Toaster, Konami
src/content/                     tout le texte, typé ; les manques sont des `TODO('[À REMPLIR] …')`
src/lib/                         calm (store), ribbonState + rackState (refs partagées GSAP → useFrame), gsap, scroll (Lenis), github, asset()
src/shaders/fibers.ts            GLSL des fibres et poussières
tests/e2e/                       Playwright : desktop 1440×900, mobile 390×844, reduced-motion
```

## Découpage technique de la scène 3D (FIBRE)

- **Un seul `<Canvas>`** R3F fixe (`RibbonLoader` → `dynamic(() => import('./Scene'), { ssr: false })`), monté après hydratation + `requestIdleCallback`, **sur ordinateur seulement** (`min-width: 1024px`, souris) et hors mode calme. `frameloop="never"` + `advance()` dans `gsap.ticker`, après Lenis : ruban et texte bougent dans la même image.
- **Caméra** : 10 unités = hauteur d'écran ; `y = -(scrollY + vh/2) × k` → le ruban est « imprimé » sur la page, avec une légère inertie au scroll rapide.
- **Chemin** (`path.ts`) : 34 ancres (section, fraction de hauteur, décalage en vh, x, z, écartement, surbrillance) → `CatmullRomCurve3` centripète → 4096 échantillons à longueur d'arc égale dans une `DataTexture` RGBA float (3 lignes). Recalculé sur `ResizeObserver(body)`, `ScrollTrigger` refresh et chargement des polices. Seule la portion visible (± marges) est dessinée.
- **Fibres** : 300 instances d'une bande de 900 segments, extrudée à l'écran (épaisseur en pixels), torsion, dérive et ondulation par fibre, impulsions lumineuses, couleurs HDR ; addition pure (ONE, ONE), `DoubleSide` (bandes vues « de dos » selon leur sens). **Poussières** : 2 600 points, bokeh.
- **Rack** (`rack3d.ts`, `Rack.tsx`) : cadre DeskPi 8U, unités à l'échelle (1U = 44,45 mm), façades en `CanvasTexture` + texture émissive (LED, écran Proxmox), cordons et DAC en `TubeGeometry`, lumières embarquées, environnement PMREM (`RoomEnvironment`). Posé chaque image sur `[data-rack-stage]` ; `rackState.explode` / `rackState.active` écrits par les ScrollTrigger du lab.
- **Post-process** : Bloom `mipmapBlur`, ToneMapping ACES, Vignette.
- **Sans GPU** (`RibbonLoader` sonde un contexte WebGL avec `failIfMajorPerformanceCaveat` et lit le nom du moteur) : `html[data-render="software"]`, pas de scène 3D, flou CSS remplacé par un verre opaque. La scène garde aussi une version allégée si jamais elle démarre en logiciel.
- **Flou** : `backdrop-filter` CSS (`.frost::before`, `glass-blur`), pas dans la 3D.
- **Fallback** : `RibbonPoster` (SVG calculé au build avec les mêmes formules) + `RackIso` (SVG isométrique) ; le site reste complet.

## Phases

### P0 — Init
- [x] P0.1 Dépendances installées en versions exactes — `npm ls --depth=0`
- [x] P0.2 `next.config.ts` : `output: 'export'`, `trailingSlash`, `images.unoptimized`, `basePath` depuis `NEXT_PUBLIC_BASE_PATH` — `npm run build` → `out/index.html`
- [x] P0.3 TypeScript strict + ESLint flat (core-web-vitals + typescript) — `npm run lint` et `npm run typecheck` sans erreur
- [x] P0.4 Tailwind v4 CSS-first — classes présentes dans le CSS exporté
- [x] P0.5 `asset()` + `public/.nojekyll` — `grep` : aucun basePath en dur
- [x] P0.6 Playwright sur le build statique servi avec basePath `/e2e-base` (3 projets) — `npm run test:e2e`
- [x] P0.7 Workflow Pages (configure-pages → `base_path`, upload, deploy ; push, manuel, cron) — run GitHub vert + URL en 200
- [ ] P0.8 Script Lighthouse CI mobile + desktop — `npm run lh` affiche les 4 scores

### P1 — Design system & contenu
- [x] P1.1 Tokens `@theme` (palette SIGNAL), polices `next/font` (Geist, Geist Mono, Instrument Serif)
- [x] P1.2 Grain SVG, grille 12 colonnes, coins viseur, index de section mono — *remplacé (FIBRE : verre, pastilles, grille de points)*
- [x] P1.3 Composants UI de base (boutons, chips, `Todo`, cadres, en-têtes de section)
- [x] P1.4 `src/content/` typé, réponses du kickoff reportées, `[À REMPLIR]` pour les manques
- [x] P1.5 Toutes les sections en HTML statique responsive (héros → footer, nav + menu)
- [x] P1.6 Pages `/lab/[slug]` en MDX (homelab, dashboard-pronote, portfolio) + page `/link/`
- [ ] P1.7 Repos GitHub récupérés au build, fallback JSON local
- [ ] P1.8 SEO : metadata, OG 1200×630, sitemap, robots, JSON-LD `Person`, icônes, `theme-color`
- [ ] P1.V lint + typecheck + build + e2e + captures 1440 / 390 / reduced-motion

### P2 — Motion
- [ ] P2.1 Lenis + ScrollTrigger synchronisés (`gsap.ticker`, `lagSmoothing(0)`)
- [ ] P2.2 Préloader : compteur sur le vrai chargement, lignes de boot, rideau, passable, une fois par session
- [ ] P2.3 Reveals SplitText par lignes masquées, scramble des labels, compteurs
- [ ] P2.4 Nav : barre de verre fumé, liens, pastille d'état, boutons-icônes, barre de progression ; menu plein écran (stagger, aperçu, focus trap, Échap)
- ~~P2.5 Curseur custom et boutons magnétiques~~ — *retiré à la demande de Luke : rien ne suit la souris*
- [x] P2.6 Rooms : chips + compteurs, recherche, tri, `layout` + `AnimatePresence`, compteur qui défile, état vide
- [x] P2.7 Piliers : scroll horizontal pinné (desktop) / cartes empilées (mobile), micro-animations SVG — *remplacé par P7.4*
- ~~P2.8 Frise SVG tracée au scroll, footer sticky révélé~~ — *remplacé par P7.6 (curseur « glisse dans le temps », pied de page façon vidéo)*
- [ ] P2.V lint + typecheck + build + e2e + captures

### P3 — Scène 3D
- [x] P3.1 Canvas unique chargé après le 1er rendu, `frameloop="demand"`, pause onglet caché / mode calme
- [x] P3.2 Particules + 5 formes procédurales — *remplacé par P7.1*
- [x] P3.3 Morphs pilotés au scroll (stagger, curl, taille, luminosité) — *remplacé par P7.1*
- ~~P3.4 Pointeur : parallaxe caméra + répulsion locale~~ — *retiré à la demande de Luke*
- [ ] P3.5 Post-process desktop, `PerformanceMonitor` + `AdaptiveDpr`, `drawRange` adaptatif
- [ ] P3.6 Retrait de la 3D sur les sections denses (verre dépoli CSS)
- [x] P3.7 Fallback sans WebGL / mode calme
- [ ] P3.V lint + typecheck + build + e2e + captures

### P4 — Fonctionnalités signature
- ~~P4.1 Badge lanyard physique~~ — *retiré à la demande de Luke → badge recto / verso (P7.3)*
- [ ] P4.2 Terminal `Ctrl+K` / `⌘K` / `` ` `` (commandes, Tab, historique, `aria-live`, `sudo hire-luke`)
- [x] P4.3 Mode calme (toggle nav, auto `prefers-reduced-motion`, mémorisé)
- [ ] P4.4 Badges en cartes holographiques
- [x] P4.5 Lab : séquence pinnée rack → vue éclatée légendée → services Proxmox → câblage — *remplacé par P7.5 (rack 3D)*
- [ ] P4.6 Contact : carte citron, email obfusqué révélé au clic, Discord copiable + toast
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

### P7 — Direction FIBRE (vidéo « Relay », 2026-10-07)
- [ ] P7.1 Ruban de fibres Three.js ancré aux sections, caméra liée au scroll, bloom HDR, apparition depuis le héros
- [ ] P7.2 Héros en vraie présentation (nom, domaines, objectif, CTA) + carte-profil avec terminal, bandeau d'outils ; nav façon vidéo ; sections dans l'ordre d'un portfolio
- [ ] P7.3 À propos : carte hub + badge recto / verso + faits
- [ ] P7.4 Ce que j'apprends : 4 mini-interfaces (énumération, OSI, virtualisation, échantillonnage) + manifeste citron (s'ouvre / se referme en logo)
- [ ] P7.5 Projets (`#lab`) : rack 3D (vue éclatée, tiroirs, LED en bloom), ruban derrière le rack, cartes services / RAM, plan réseau (graphe + paquets), projets, repos
- [ ] P7.6 Parcours : tableau de bord (semaines, jauge, TryHackMe, statut) + curseur « glisse dans le temps » + cartes d'étapes
- [ ] P7.7 Rooms, badges, contact (carte citron), pied de page façon vidéo
- [ ] P7.8 Plus aucun effet lié à la souris (ruban, curseur, magnétisme, tilt)
- [ ] P7.9 Fallbacks : mode calme, téléphone et sans WebGL → ruban SVG + rack SVG, site complet

### P8 — Direction SIMPLE (miray-28.github.io, 2026-10-08)
- [x] P8.1 Retrait de Three.js / R3F / postprocessing, GSAP, Lenis, Motion, préloader, Konami, badge, manifeste — `npm ls --depth=0`
- [x] P8.2 Fond `Ambient` en canvas 2D (étoiles + 2 rubans de fils), animé au premier geste, figé en mode calme — capture 1440 px + test e2e `data-state`
- [x] P8.3 Héros façon miray (pseudo métal, carte inclinée, puces), sections numérotées, cartes sombres — captures 1440 / 390 / reduced-motion
- [x] P8.4 Homelab : rack 8U en CSS à l'échelle (écran btop, switch et LED, MS-01) + services, RAM, câblage — capture
- [x] P8.5 Apparitions en CSS + un seul `IntersectionObserver` ; menu, terminal, toasts en CSS
- [x] P8.6 e2e 24 / 24 (desktop, mobile, reduced-motion), 0 erreur console, 0 violation axe serious/critical — `npm run test:e2e`
- [ ] P8.7 Lighthouse — desktop 94 / 100 / 100 / 100 ✔ ; mobile 54 en simulation locale ✘ (le contenu s'affiche à 0,7 s mesuré avec le CPU ralenti 4×, mais Lighthouse compte le JS de base de React / Next comme dépendance du LCP)
- [x] P8.8 Image OG régénérée dans le nouveau style — `npm run assets:og`

## Journal

- 2026-10-07, session 1 : direction SIGNAL, particules, lanyard, 22 tests e2e sur 33 verts.
- 2026-10-07, session 2 : fond calme, badge recto / verso, puis changement de direction vers FIBRE sur la vidéo de Luke.
- 2026-10-08, session 3 : FIBRE jugé lourd par l'entourage de Luke → direction SIMPLE d'après miray-28.github.io ; 3D et libs d'animation retirées.

Corrigé en route (à retenir) :
- un texte en `background-clip: text` (couleur transparente) n'est pas compté par Chrome comme contenu visible (LCP) → dégradé métal fait avec un `mask-image`.
- un test qui fait défiler la page plus vite que le navigateur ne la dessine rate des apparitions → attendre deux `requestAnimationFrame` à chaque pas.
- les fibres extrudées à l'écran ont un sens de rotation variable → `DoubleSide`, sinon three les masque.
- Lightning CSS (Tailwind 4) fusionne `backdrop-filter` et `-webkit-backdrop-filter` en ne gardant que le dernier → n'écrire que la propriété standard.
- `frameloop="never"` : R3F prend le temps passé à `advance()` tel quel → lui donner des secondes.
- un pin GSAP placé plus haut dans la page doit être créé (ou rafraîchi, `refreshPriority`) avant les déclencheurs qui le suivent.
- `backdrop-filter` sur un parent fait de lui le repère des enfants en `position: fixed` (casse les pins) → verre dépoli en pseudo-élément.
- les apparitions en `visibility: hidden` (`autoAlpha`) cachent le contenu aux lecteurs d'écran et à Playwright → opacité seule.
- en rendu logiciel (SwiftShader, CI), préparer la scène complète (PBR, PMREM, bloom) gelait la page 40 s, et le `backdrop-filter` plein écran rendait chaque clic très lent → pas de 3D ni de flou en direct sans GPU.
- une balise `<output>` a le rôle ARIA `status` : les tests visent le toast par son texte.
