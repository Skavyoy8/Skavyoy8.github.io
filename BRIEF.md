# BRIEF — Portfolio 3D de Luke

> Source de vérité du projet. Claude Code : lis ce fichier en entier avant de planifier.
> Tout ce qui est marqué **[À REMPLIR]** ou **[À VALIDER]** doit être demandé à Luke au kickoff — jamais inventé.

---

## 0. Mission

Construire le portfolio personnel de Luke — élève en Bac Pro CIEL (Cybersécurité, Informatique et Réseaux, Électronique) — sous forme d'un site one-page immersif en 3D temps réel, déployé gratuitement sur GitHub Pages.

**Barre de qualité : niveau « Site of the Day » Awwwards.** Chaque section a une vraie idée de mise en scène. Rien de générique, rien qui « fait template IA ».

Le site reprend **toutes** les fonctionnalités de https://miray-28.github.io/ et les dépasse sur chaque point : design, 3D, motion, interactivité, performance, accessibilité, SEO.

Mais le contenu reste lisible et rapide : un recruteur doit comprendre en 10 secondes qui est Luke, ce qu'il sait faire et comment le contacter.

---

## 1. Références

- **miray-28.github.io** → la *structure fonctionnelle* à reprendre et surpasser (voir §5). On ne copie ni ses textes ni son identité visuelle.
- **motionsites.ai** et **getlayers.ai** → le *niveau de craft* visé : héros cinématiques, scènes WebGL temps réel (particules, fluides, terrains), gradients interactifs au pointeur, sections qui ont chacune leur propre motion au scroll ou à la souris. On s'inspire des principes ; on ne recopie aucun template, prompt ou asset.

Si tu peux ouvrir ces sites dans un navigateur (aperçu intégré), regarde-les vraiment : le texte seul ne suffit pas pour calibrer le niveau visuel.

---

## 2. Stack (imposée)

- **Next.js** (App Router, TypeScript strict) en export statique (`output: 'export'`)
- **Tailwind CSS v4** (config CSS-first via `@theme`) + CSS custom pour les effets
- **React Three Fiber** + **@react-three/drei** + **@react-three/postprocessing** ; **@react-three/rapier** pour le badge physique (§5.2)
- **GSAP** + **ScrollTrigger** + **SplitText** + **@gsap/react** (`useGSAP`) — GSAP et tous ses plugins sont gratuits
- **Lenis** pour le smooth scroll, synchronisé avec ScrollTrigger
- **Motion** (ex-Framer Motion, import depuis `motion/react`) pour l'UI
- **Playwright** + **@axe-core/playwright** pour les tests e2e ; **Lighthouse CI** pour l'audit

Installe les dernières versions stables et vérifie la doc officielle de chaque lib avant d'utiliser son API (R3F doit matcher la version de React, Tailwind v4 n'a plus de `tailwind.config.js` par défaut, etc.). Note les versions exactes dans `PLAN.md`.

**Répartition des rôles — jamais deux moteurs sur le même élément :**
- GSAP / ScrollTrigger → tout ce qui est piloté par le scroll : pins, scrub, chorégraphie de la scène 3D, reveals de texte
- Motion → états et micro-interactions d'UI : menu, filtres, terminal, toasts, curseur, layout animations
- R3F `useFrame` → animation continue de la 3D ; lit des valeurs (refs) que GSAP met à jour. Jamais de `setState` dans `useFrame`.

---

## 3. Contenu (validé avec Luke au kickoff du 2026-10-07)

Tout le texte vit dans `src/content/` (fichiers TS typés). Aucun texte en dur dans les composants. Les manques restent des `TODO('[À REMPLIR] …')` dans `src/content/`.

**Direction artistique** : SIGNAL (§4), choisie parmi SIGNAL / OSCILLO / MATIÈRE.

**Identité**
- Nom affiché : **Skavyoy** (pseudo) ; prénom Luke cité une fois dans « À propos »
- Accroche : « Élève en Bac Pro CIEL. Cybersécurité, réseaux, Linux et électronique : j'apprends en pratiquant. »
- Localisation affichée : France (pas de ville). Âge : **pas affiché** (sauf « 17 ans » sur la frise, à la demande de Luke)
- Avatar : image fournie par Luke → `public/images/avatar.jpg` (illustration de fan, droits non vérifiés : à remplacer si besoin)
- Statut : « en apprentissage » + **recherche une alternance** (BTS SIO SISR)

**Ce que j'apprends — 4 piliers** : validés tels quels
1. Cybersécurité & hacking éthique — TryHackMe sous Kali, énumération (nmap, FTP, SMB), vulnérabilités web type IDOR
2. Réseaux — modèle OSI, LAN, DNS, IPv6
3. Linux & systèmes — Linux au quotidien (Debian), virtualisation (VirtualBox, Proxmox)
4. Électronique & signal — analogique vs numérique

**Parcours TryHackMe** — Luke a demandé de tout lire sur son profil, mais le pseudo n'a pas été donné et tryhackme.com est bloqué dans l'aperçu
- Profil : pseudo + URL **[À REMPLIR]**
- Stats : rooms terminées, badges, classement (top %), rang/titre, date du relevé **[À REMPLIR]**
- Rooms : « Anonymous » (Challenges-CTF ; nmap, FTP, énumération SMB) — difficulté et date **[À REMPLIR]** ; autres rooms **[À REMPLIR]**. Les phrases « ce que j'ai appris » sont rédigées par Claude, Luke les reprendra.
- Badges : **[À REMPLIR]** — visuels holographiques dessinés par nous (pas d'images TryHackMe)

**Lab / Projets** (validés)
- **Homelab MS-01** (projet phare, en préparation, LAN uniquement) : DeskPi RackMate T1 Plus 8U noir ; de haut en bas : routeur GL.iNet Slate AX posé dessus (phase 2), écran tactile 7,84" 2U (phase 2), patch panel 12 ports Cat6 0,5U, switch MokerLink 8 × 2.5G + SFP+ 10G 1U, Minisforum MS-01 i5-12600H 2U (Proxmox, relié en 10G), réserve NAS 1U, cache ventilé 1U (phase 2), cache plein 0,5U (phase 2). Services prévus : Proxmox, AdGuard Home ou Pi-hole, Homepage + Uptime Kuma, Jellyfin, Samba, Immich, bot crypto, dashboard Pronote ; labs à la demande : Kali vs Metasploitable, Active Directory, OPNsense. Source : document « Projet homelab MS-01 » de Luke. Mise en scène : séquence au scroll spectaculaire (rack, vue éclatée, services).
- **Dashboard Pronote** : privé, en projet, hébergé sur le homelab (une fonctionnalité du lab)
- **Dual boot Linux (CachyOS)** sur le PC gaming — statut **[À REMPLIR]**
- **Wiki crypto en français** (cryptomonnaies) — statut et lien **[À REMPLIR]**
- **Ce portfolio** (Next.js, R3F, GSAP — lien vers le repo)
- **Repos GitHub publics** récupérés au build (sauf forks, ce portfolio et les repos vides), avec lien vers la démo Pages
- Pages détail : homelab, dashboard-pronote, portfolio
- Rien sur les stages / PFMP qui toucherait à des infos internes d'entreprise.

**Frise de parcours** : 17 ans — Bac Pro CIEL (terminale 2026–2027, en cours) → BTS SIO option SISR en alternance (visé). On s'arrête là pour l'instant.

**Outils (bandeau défilant)** : Linux (Debian), Kali, nmap, Proxmox, VirtualBox, Git / GitHub, Obsidian, Next.js — validés

**Liens** : GitHub (github.com/Skavyoy8) ; TryHackMe, Discord (handle copiable), LinkedIn, Instagram, TikTok **[À REMPLIR]** ; email **[À REMPLIR]** — jamais en clair dans le HTML (obfusqué, révélé au clic). Page `/link/` créée pour le lien du profil GitHub.

**CV** : PDF **[À REMPLIR]** (Luke le donnera plus tard ; bouton masqué tant que le fichier n'existe pas)

**Déploiement** : push sur `main` autorisé en fin de phase, après vérifications vertes.

---

## 4. Direction artistique

**Concept : « SIGNAL ».** CIEL, c'est le signal sous toutes ses formes : électrique, réseau, données. Fil rouge visuel : **un nuage de particules unique qui se transforme au fil du scroll** — terrain de signal, onde, circuit, rack, portail. *(2026-10-07 : Luke n'aimait pas la sphère « noyau » ; remplacée par un terrain de lignes d'onde en perspective, particules en « pixels » carrés.)* Si Luke préfère une autre direction au kickoff, propose 2 alternatives aussi fortes.

**Ambiance** : sombre, éditoriale, précise. Plus « labo de nuit » que « hacker Matrix ».

**Palette** (tokens `@theme`, modifiables en un endroit)
- fond `#050506`, surface `#0B0B0E`, lignes `rgb(255 255 255 / 0.08)`
- texte `#EDEDEF`, texte secondaire `#8B8B94`
- accent « phosphore » `#C8FF2E` — un seul accent, utilisé avec parcimonie : états actifs, données, lueurs
- froid secondaire `#6AE4FF` — réservé à la 3D (lueurs, impulsions)

**Typo** (via `next/font/google`, auto-hébergée au build)
- **Geist** — titres et texte ; titres énormes (jusqu'à ~14vw via `clamp`), interlettrage serré
- **Instrument Serif italique** — mots d'accent dans les titres (« Ce que *j'apprends*. »)
- **Geist Mono** — labels, index de section (`01 / À PROPOS`), données, terminal

**Texture & grille** : grain SVG animé très léger en overlay ; grille 12 colonnes visible en filigrane (lignes 1 px à ~4 % d'opacité) qui structure toute la page ; index de section en mono ; coins de cadre type « viseur » sur les éléments clés.

**Principes de motion**
- easing principal `cubic-bezier(0.16, 1, 0.3, 1)`, durées 0,6–1,2 s, stagger 0,03–0,08 s
- rien ne rebondit, rien ne bouge sans raison : le scroll raconte, la souris répond
- titres : révélation par lignes masquées (SplitText) ; labels mono : effet « décryptage » (scramble) ; chiffres : compteurs
- la 3D se met en retrait (opacité, flou, échelle) quand une section dense en texte occupe l'écran

---

## 5. Sections — reprise de miray, en mieux

Ordre de la page. Pour chaque section : ce que fait miray → ce qu'on fait.

### 5.0 Préloader
Compteur `000 → 100` branché sur le vrai chargement (polices + `useProgress` de drei), puis 3–4 lignes de « boot » en mono, puis un rideau qui s'ouvre sur le héros. Moins de 2,5 s, passable (clic / touche), une seule fois par session (`sessionStorage`).

### 5.1 Héros `#accueil`
miray : nom, tagline, 2 CTA, chips (âge + pays + handle), carte avatar « CYBER / FR01 », 2 stats.
→ Nous :
- « Skavyoy. » en très grand, révélation lettre par lettre ; la scène 3D derrière et à travers le texte : un **terrain de signal** (lignes d'onde empilées en perspective, qui défilent et se soulèvent sous le pointeur)
- tagline + 2 CTA magnétiques (« Mon parcours » / « On se parle ? »)
- barre de méta en mono : statut (« en apprentissage ● »), France, heure locale en direct, handle
- mini-stats TryHackMe en compteurs, cliquables vers leurs sections
- indicateur de scroll animé

### 5.2 À propos `#a-propos`
miray : texte + carte profil (âge, pays, intérêts, plateforme, Discord).
→ Nous :
- texte court en grand, mots-clés en accent
- **badge d'accès 3D sur lanyard physique** (rapier) : la carte pend depuis le haut, se balance, se drag à la souris et au doigt. Recto = carte d'identité « CIEL / FR » (nom, handle, filière, statut, QR vers GitHub) ; verso = infos rapides. Texture générée en canvas, aucune image externe. Fallback statique (carte en tilt CSS) en mode calme ou machine faible.
- les particules s'aplatissent en **onde sinusoïdale qui devient carrée** pendant le scroll : analogique → numérique, clin d'œil CIEL

### 5.3 Ce que j'apprends `#interets`
miray : 3 cartes.
→ Nous : 4 piliers en **scroll horizontal pinné** (desktop) / cartes empilées (mobile). Chaque carte : index, catégorie, titre, texte, lien vers les rooms filtrées, et sa propre micro-animation (onde, graphe réseau, prompt shell, piste de circuit). Les particules forment un **circuit imprimé** parcouru d'impulsions lumineuses.

### 5.4 Lab `#lab` (nouveau, absent chez miray)
- section pinnée : les particules s'assemblent en **mini rack 10"** (cadre, unités 1U, LED qui clignotent) ; au scroll, le rack passe en **vue éclatée** et chaque unité (switch, patch panel, nœud Proxmox, Pi-hole, NAS) reçoit une ligne de légende
- puis grille de projets : cartes avec projecteur qui suit le curseur (bordure lumineuse), statut (en cours / terminé), stack, lien
- pages détail `/lab/[slug]` générées statiquement (contenu MDX), transition de page soignée

### 5.5 Parcours `#parcours`
miray : carte profil TryHackMe, 3 stats, date du relevé, lien profil.
→ Nous :
- tableau de bord type « console » : stats en compteurs, rang, jauge du classement, date du relevé, lien profil
- frise du parcours qui se dessine au scroll (tracé SVG)
- la 3D en retrait ici, priorité à la lisibilité

### 5.6 Rooms `#rooms`
miray : compteur, filtres (Tout / Réseau / Challenges / Bases cyber), liste.
→ Nous :
- filtres en chips avec compteurs + recherche texte + tri (date / difficulté)
- réorganisation animée avec Motion (`layout`, `AnimatePresence`) ; le compteur « N rooms affichées » défile
- chaque room : catégorie, difficulté, date, « ce que j'ai appris », lien
- état vide soigné

### 5.7 Badges `#badges`
miray : texte + lien.
→ Nous : badges en **cartes holographiques** (tilt 3D + reflet irisé qui suit le pointeur), grille, lien vers TryHackMe.

### 5.8 Contact `#reseaux`
miray : liens + gros CTA Discord.
→ Nous :
- les particules convergent en **anneau / portail** ; le CTA « On se parle ? » est au centre, le portail accélère au survol
- liens GitHub, TryHackMe, LinkedIn, email obfusqué ; handle Discord copiable avec toast « copié »
- boutons magnétiques

### 5.9 Footer
- wordmark géant « LUKE. » révélé par un footer sticky (la page se soulève dessus)
- heure de Paris en direct, date du dernier build, « Retour en haut », crédit stack

### Navigation globale
miray : barre fixe + menu overlay + lien d'évitement.
→ Nous :
- barre fixe minimaliste en `mix-blend-difference` ; le nom de la section courante se « décrypte » à chaque changement ; barre de progression du scroll
- menu plein écran : liens énormes en stagger, index mono, aperçu au survol, focus trap, fermeture Échap
- lien d'évitement « Aller au contenu » conservé

---

## 6. Fonctionnalités signature

1. **Scène 3D persistante « SIGNAL »** (§8)
2. **Badge lanyard physique** (§5.2)
3. **Terminal / palette de commandes** : `Ctrl+K`, `⌘K` ou `` ` `` ouvre un terminal en overlay. Commandes : `help`, `whoami`, `ls`, `cd <section>` (scroll vers la section), `cat about`, `projects`, `rooms --filter <catégorie>`, `open github|thm|discord`, `calm`, `clear`, `exit`, + easter egg `sudo hire-luke`. Autocomplétion Tab, historique ↑/↓, sortie en `aria-live`. Hint discret « ⌘K » dans la nav.
4. **Mode calme** (toggle dans la nav, automatique si `prefers-reduced-motion`) : coupe la 3D lourde, Lenis et les pins ; reste un site éditorial beau et complet. Pensé pour les recruteurs pressés et les machines faibles.
5. **Curseur custom** (point + anneau, `mix-blend-difference`, états lien / drag / voir) — désactivé sur tactile et en mode calme
6. Effet « décryptage » sur labels et nav, compteurs animés, boutons magnétiques
7. Easter egg **Konami code** (glitch de la scène + message)
8. **Données GitHub au build** (§7)

Bonus si tout le reste est fini : version anglaise (`/en`), sons d'UI discrets (désactivés par défaut).

---

## 7. Architecture & déploiement GitHub Pages

- `next.config.ts` : `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`, `basePath` lu depuis une variable d'environnement (vide en local et si le repo s'appelle `<user>.github.io`). **Jamais de basePath en dur.**
- Helper `asset(path)` dans `src/lib/asset.ts` qui préfixe le basePath pour **tout** ce qui est chargé hors `next/link` / `next/image` : textures, polices custom, fichiers de `public/`, PDF du CV. Piège classique : la 3D qui charge `/texture.png` et casse en prod.
- Interdits en export statique : route handlers dynamiques, middleware, ISR, `cookies()` / `headers()`, Server Actions, optimisation d'image Next. Les données externes se récupèrent **au build** dans des Server Components.
- Données GitHub : au build, API REST GitHub (repos publics de Luke, triés par activité) ; en CI, utiliser `GITHUB_TOKEN`. Si l'appel échoue → fallback sur un JSON local. **Le build ne casse jamais à cause d'une API.**
- `public/.nojekyll`
- `.github/workflows/deploy.yml` : install, build, export et déploiement avec les actions officielles Pages (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`) ; basePath récupéré depuis la sortie de `configure-pages`. Déclencheurs : push sur `main`, `workflow_dispatch`, cron hebdo pour rafraîchir les données GitHub.
- Arborescence indicative : `src/app/` (layout, page, `lab/[slug]`), `src/components/{layout,sections,ui,three}`, `src/content/`, `src/hooks/`, `src/lib/`, `src/shaders/`, `tests/e2e/`
- Scripts npm : `dev`, `build`, `lint`, `typecheck`, `test:e2e` (Playwright sur le build statique servi en local, basePath compris), `lh` (Lighthouse CI)

---

## 8. Scène 3D — spécification

- **Un seul `<Canvas>`** fixe en arrière-plan, monté une fois, importé en `dynamic(..., { ssr: false })` **après** le premier rendu du texte : le LCP doit être du texte, pas la 3D. Le badge lanyard et les micro-scènes passent par `<View>` de drei (un seul contexte WebGL) — sinon, justifie dans `PLAN.md`.
- **Particules** : `THREE.Points` + `ShaderMaterial` custom. Desktop ~60–80k particules, mobile ~15–20k, ajusté en direct par `PerformanceMonitor`. Chaque forme cible est un nuage de N points **généré procéduralement** (aucun modèle 3D téléchargé), stocké en attribut ou en DataTexture :
  1. **terrain de signal** — lignes d'onde empilées en profondeur + bruit (remplace la sphère « noyau » à la demande de Luke)
  2. **onde** — sinus → carré (uniform de transition)
  3. **circuit** — pistes orthogonales sur un plan + pads
  4. **rack 10"** — boîtes échantillonnées (cadre + unités), avec des points « LED » marqués
  5. **portail** — tore / anneau
- **Morph** : le vertex shader mélange forme A → forme B avec un délai par particule (stagger), un bruit de curl pendant la transition, taille et luminosité modulées. La progression vient d'un ScrollTrigger en `scrub` par chapitre, écrite dans une ref lue par `useFrame` (zéro re-render React).
- **Interaction** : parallaxe caméra douce à la souris ; le pointeur repousse / déforme localement les particules (raycast sur un plan) ; impulsions qui parcourent le circuit.
- **Post-process** (desktop seulement, coupé si les FPS chutent) : Bloom léger (`mipmapBlur`), Noise, Vignette.
- **Perf** : `dpr={[1, 1.75]}`, `PerformanceMonitor` + `AdaptiveDpr`, rendu en pause quand l'onglet est caché ou la scène hors champ (`frameloop="demand"` + `invalidate`), disposal propre, aucune allocation dans `useFrame`. Objectif : jamais sous 55 fps sur un laptop récent.
- **Fallback** : WebGL indisponible ou mode calme → gradient / visuel statique soigné ; le site reste complet.

---

## 9. Qualité, perf, accessibilité, SEO

- **Lighthouse** (build de prod) : Performance ≥ 80 mobile / ≥ 90 desktop, Accessibilité ≥ 95, Best Practices ≥ 95, SEO ≥ 95. CLS < 0,05.
- JS initial minimal : three / R3F / rapier dans des chunks chargés après l'affichage ; rapier seulement à l'approche de la section À propos.
- 60 fps visés au scroll sur desktop ; aucun à-coup pendant le chargement de la 3D.
- Responsive impeccable de 360 px à 2560 px ; tactile pensé (rien qui n'existe qu'au survol).
- **Accessibilité** : HTML sémantique, `lang="fr"`, un seul `h1`, focus visible stylé, tout utilisable au clavier (menu, terminal, filtres), contrastes AA, canvas `aria-hidden` avec le contenu équivalent en HTML, `prefers-reduced-motion` respecté partout.
- **SEO / partage** : metadata Next complète, image Open Graph 1200×630, `sitemap.xml` et `robots.txt` statiques, JSON-LD `Person`, favicon + icônes, `theme-color`.
- Aucun tracker, aucun cookie.

---

## 10. Interdits

- Copier texte, visuels, code ou assets des sites de référence
- Lorem ipsum dans le rendu final (les manques restent marqués `[À REMPLIR]` dans `src/content/` et listés dans le récap)
- Inventer des stats, rooms, badges ou projets
- Assets payants ou à licence floue ; vidéos de fond lourdes
- Désactiver une règle lint / TS / a11y ou baisser un seuil pour faire passer un test
- Clichés « hacker » : pluie de code Matrix, têtes de mort, cadenas clipart

---

## 11. Phases

- **P0 — Init** : projet Next, Tailwind, lint / typecheck, Playwright, workflow Pages, page minimale déployable. Le pipeline de déploiement marche dès le premier jour.
- **P1 — Design system & contenu** : tokens, typo, grain, grille, composants UI de base, `src/content/` typé, toutes les sections en HTML statique responsive, sans 3D. Le site est déjà propre et complet à ce stade.
- **P2 — Motion** : Lenis + ScrollTrigger, préloader, reveals, nav + menu, curseur, compteurs, filtres des rooms.
- **P3 — Scène 3D** : canvas persistant, particules, 5 formes, morphs pilotés au scroll, interaction pointeur, post-process, fallbacks.
- **P4 — Signature** : badge lanyard, terminal, mode calme, badges holo, rack éclaté, portail, Konami, données GitHub.
- **P5 — Polish** : perf (Lighthouse), a11y (axe), responsive 360 → 2560, SEO / OG, réglage fin des timings.
- **P6 — QA finale & livraison** : tests e2e verts, captures desktop + mobile, README (lancer en local, modifier le contenu, déployer), commit final.

---

## 12. Critères d'acceptation

- [ ] `npm run lint`, `npm run typecheck` et `npm run build` passent ; `out/` contient le site exporté
- [ ] Toutes les sections du §5 existent avec leurs ancres, en desktop (1440×900) et mobile (390×844)
- [ ] Les 5 formes 3D et leurs transitions au scroll fonctionnent ; le fallback sans WebGL est propre
- [ ] Badge lanyard draggable (souris + tactile), avec fallback
- [ ] Terminal : ouverture au clavier, `help`, autocomplétion, historique, `cd`, `calm`, `sudo hire-luke`
- [ ] Mode calme + `prefers-reduced-motion` : tout le contenu accessible, aucune animation lourde
- [ ] Filtres, recherche et tri des rooms fonctionnels et animés
- [ ] Tests Playwright verts (desktop, mobile, reduced-motion) : 0 erreur console, 0 violation axe serious/critical, navigation par ancres, filtres, terminal
- [ ] Lighthouse aux seuils du §9
- [ ] basePath géré sans valeur en dur ; assets chargés via `asset()` ; workflow Pages valide
- [ ] Aucun contenu inventé ; liste des `[À REMPLIR]` restants dans le récap final
- [ ] README à jour ; travail commité par étapes ; `git status` propre
