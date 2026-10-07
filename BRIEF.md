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

- **miray-28.github.io (2026-10-08)** → la *direction actuelle* (§4) : un site simple et fluide, fond noir avec étoiles et fils fins qui ondulent, grand pseudo en dégradé métal, cartes sombres, sections numérotées « 01 / À PROPOS ». Luke : « fais un site quasi comme lui, juste à notre manière ». On reprend la mise en page et l'esprit, avec le contenu, l'accent citron et le homelab de Luke ; aucun texte, code ni asset n'est copié.
- **Vidéo « Relay » envoyée par Luke (2026-10-07)** *(direction abandonnée le 2026-10-08 : jugée lourde et peu optimisée)* → la *direction retenue* (§4) : landing SaaS générée par Opus 5.5, ruban de fibres lumineuses en 3D qui serpente sur toute la page, panneaux en verre, accent citron, mini-interfaces vivantes. On reprend l'esprit et les techniques (Three.js, bloom, caméra liée au scroll, verre dépoli) ; aucun texte, logo ni asset n'est copié.

---

## 2. Stack (imposée)

- **Next.js** (App Router, TypeScript strict) en export statique (`output: 'export'`)
- **Tailwind CSS v4** (config CSS-first via `@theme`) + CSS custom pour les effets
- **Fond animé en canvas 2D** maison (`Ambient`), sans librairie
- **Animations en CSS** (keyframes, transitions) + un seul `IntersectionObserver` pour les apparitions au scroll ; défilement natif (`scroll-behavior: smooth`)
- *(2026-10-08 : Three.js / R3F / postprocessing, GSAP, Lenis et Motion retirés pour alléger le site.)*
- **Playwright** + **@axe-core/playwright** pour les tests e2e ; **Lighthouse CI** pour l'audit

Installe les dernières versions stables et vérifie la doc officielle de chaque lib avant d'utiliser son API (Tailwind v4 n'a plus de `tailwind.config.js` par défaut, etc.). Note les versions exactes dans `PLAN.md`.

**Animations — règle simple :** uniquement `transform` et `opacity` (et des dégradés), coupées en mode calme. Rien ne suit la souris.

---

## 3. Contenu (validé avec Luke au kickoff du 2026-10-07)

Tout le texte vit dans `src/content/` (fichiers TS typés). Aucun texte en dur dans les composants. Les manques restent des `TODO('[À REMPLIR] …')` dans `src/content/`.

**Direction artistique** : SIGNAL au kickoff, puis FIBRE le 2026-10-07 (vidéo « Relay »), puis **SIMPLE** (§4) le 2026-10-08, d'après miray-28.github.io : « beaucoup plus simple et fluide ».

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

**Concept : « SIMPLE ».** *(Décidé avec Luke le 2026-10-08 : plusieurs personnes ont trouvé FIBRE lourd et pas optimisé. Remplace FIBRE, dont la suite de cette section garde la trace.)* Fond noir avec des étoiles qui scintillent et deux rubans de fils fins (argent → citron) qui ondulent lentement, dessinés en canvas 2D. Héros : pastille de domaines, pseudo `skavyoy` géant en dégradé métal avec un point citron lumineux, deux lignes de présentation, deux boutons, carte de profil inclinée avec deux puces flottantes. Puis des sections numérotées (« 02 / COMPÉTENCES ») au grand titre ponctué d'un point : À propos, Compétences (4 cartes avec mini-illustrations CSS), Homelab (rack 8U dessiné en CSS + services), Projets, Parcours, TryHackMe, Contact. Cartes sombres presque opaques, aucun flou sauf la barre de navigation.

**Concept : « FIBRE ».** *(Décidé avec Luke le 2026-10-07, d'après la vidéo « Relay » : remplace SIGNAL.)* Un faisceau de fibres optiques lumineuses, en vraie 3D, serpente du haut en bas de la page : épingle incandescente dans le héros, puis il passe derrière chaque section. Net là où il y a de la place, flouté en aurore derrière les sections denses (verre dépoli). C'est le signal qui transporte tout ce que Luke apprend : réseau, systèmes, sécurité.

**Ambiance** : sombre, précise, lumineuse. Panneaux en verre, mini-interfaces qui vivent (graphe réseau, couches OSI, signal échantillonné, rack), une seule couleur d'accent.

**Palette** (tokens `@theme`, modifiables en un endroit)
- fond `#050506`, surface `#0C0D0B`, lignes `rgb(255 255 255 / 0.07)`
- texte `#EDEDEF`, texte secondaire `#8D8F88`
- accent citron `#C8FF2E` (boutons, données, lueurs) ; encre sur citron `#0B0D05`
- froid secondaire `#6AE4FF` — quelques fibres et reflets

**Typo** (via `next/font/google`, auto-hébergée au build)
- **Geist** — titres et texte ; titres serrés (≈ 5 vw au héros, ≈ 3,5 vw en section)
- **Instrument Serif italique** — mots d'accent (« puis le *protéger*. », « Le *lab*. »)
- **Geist Mono** — légendes en minuscules façon console, pastilles, données, terminal

**Surfaces** : cartes en verre (`glass`), verre qui floute vraiment le fond (`glass-blur` : héros, nav, colonnes du lab), sections denses posées sur du verre dépoli (`frost`). Grille de points en filigrane. Plus de grain ni de grille 12 colonnes.

**Principes de motion**
- easing principal `cubic-bezier(0.16, 1, 0.3, 1)`, durées 0,6–1,2 s
- rien ne suit la souris *(demande de Luke, 2026-10-07)* : pas de curseur custom, pas d'effet magnétique, pas de tilt ; le scroll raconte, les survols restent sobres
- titres : révélation par mots / lignes masqués (SplitText) ; légendes : décryptage (scramble) ; chiffres : compteurs ; barres et jauges qui se remplissent

## 5. Sections — reprise de miray, en mieux

Ordre de la page *(2026-10-07, ordre d'un portfolio)* : héros, à propos, manifeste, projets (`#lab`), compétences (`#interets`), parcours, rooms, badges, contact. Les ancres ne changent pas. Pour chaque section : ce que fait miray → ce qu'on fait.

### 5.0 Préloader
Compteur `000 → 100` branché sur le vrai chargement des polices (la 3D arrive après, en fondu), puis 3–4 lignes de « boot » en mono, puis un rideau qui s'ouvre sur le héros. Moins de 2,5 s, passable (clic / touche), une seule fois par session (`sessionStorage`).

### 5.1 Héros `#accueil` *(2026-10-07 : Luke veut « une vraie présentation » plutôt qu'un slogan)*
- pastille « Disponible pour une alternance · BTS SIO SISR · rentrée 2027 », titre « Luke, alias Skavyoy. *Cyber, réseaux & Linux.* », présentation (terminale CIEL, TryHackMe, homelab Proxmox, recherche d'alternance), 2 CTA (« Voir mes projets » citron / « Me contacter »), ligne mono de méta
- à droite, **carte-profil en verre** légèrement inclinée : photo, nom, domaines, puis une session de terminal qui s'écrit ligne à ligne (`whoami`, objectif, projets, dernière room), liens GitHub / projets / contact
- le ruban 3D derrière : épingle incandescente sous les boutons, éventail vers la droite, flouté à travers la carte
- bandeau d'outils (Linux, Kali, nmap, Proxmox…) : tuiles reliées en pointillés, l'outil actif passe de l'une à l'autre

### 5.2 À propos `#a-propos`
- en-tête (pastille, titre, phrase-clé), carte « Le signal sous tout le reste » : textes + hub (avatar au centre relié à CIEL, TryHackMe, Linux, homelab)
- **badge d'accès recto / verso** en carte holographique : se retourne au clic et au clavier (recto identité + QR GitHub, verso infos rapides). *(Le badge physique sur lanyard a été retiré à la demande de Luke.)*
- bande « prochaine étape » + faits (pays, filière, plateforme, objectif)

### 5.3 Ce que j'apprends `#interets`
4 piliers en lignes alternées, chacun avec sa **mini-interface vivante** : méthode de la room Anonymous (barres en cascade), les 7 couches OSI parcourues par un paquet, virtualisation « aujourd'hui / demain » (VirtualBox → Proxmox, bascule animée), signal échantillonné (curseur : analogique → numérique). Lien vers les rooms filtrées.

**Manifeste** (entre les piliers et le lab) : une carte citron s'ouvre au scroll, les mots s'allument un à un, puis elle se referme autour du logo.

### 5.4 Lab `#lab`
- **rack 10" en 3D**, dans la même scène que le ruban : cadre DeskPi 8U, unités à l'échelle (écran Proxmox lumineux, patch panel et cordons, switch et ses LED, MS-01 sur sa tablette, réserve NAS en pointillés, caches), câble DAC 10G lumineux. Au scroll : vue éclatée, puis chaque étape de la colonne de droite fait sortir son unité comme un tiroir. Le ruban passe derrière le rack. Secours : dessin isométrique SVG (mode calme, téléphone, sans WebGL), et équivalent texte accessible.
- cartes : services en continu (RAM par service), mémoire prévue (11,5 Go sur 32), labs à la demande, **plan réseau** en éditeur de flux (switch → lab cyber / services maison → Proxmox, paquets lumineux, journal du câblage prévu)
- grille de projets (statut, stack, liens), repos GitHub du build, pages détail `/lab/[slug]` (MDX)

### 5.5 Parcours `#parcours`
- **tableau de bord** : l'année de terminale semaine par semaine (semaine en cours en citron), jauge « de la terminale déjà passée », profil TryHackMe (rooms, badges, rang, top %, relevé daté), dernière room, statut « recherche une alternance ». Dates calculées dans le navigateur, d'après le calendrier scolaire officiel.
- **« glisse dans le temps »** : curseur par année scolaire (terminale → BTS SIO SISR 1re et 2e année), et les deux étapes en cartes

### 5.6 Rooms `#rooms`
miray : compteur, filtres (Tout / Réseau / Challenges / Bases cyber), liste.
→ Nous :
- filtres en chips avec compteurs + recherche texte + tri (date / difficulté)
- réorganisation animée avec Motion (`layout`, `AnimatePresence`) ; le compteur « N rooms affichées » défile
- chaque room : catégorie, difficulté, date, « ce que j'ai appris », lien
- état vide soigné

### 5.7 Badges `#badges`
Badges en cartes de verre au reflet irisé (sans tilt), glyphes dessinés par nous, lien vers TryHackMe.

### 5.8 Contact `#reseaux`
- carte sombre (logo, identité, réseaux en tuiles) + **grande carte citron** « Une *alternance* à proposer ? » avec le champ email (adresse révélée au clic, jamais en clair), lien CV
- tous les réseaux en liste (handle Discord copiable avec toast)

### 5.9 Footer
Ligne d'état (recherche une alternance · terminale · heure de Paris en direct), colonnes sections / projets / liens / le site (date du dernier build, code source, retour en haut), mentions.

### Navigation globale
- barre fixe : logo, liens au centre, pastille « recherche une alternance », boutons-icônes (terminal, mode calme, menu), CTA citron ; verre fumé dès qu'on descend ; fine barre de progression citron
- menu plein écran : liens énormes en stagger, index, aperçu au survol, focus trap, fermeture Échap
- lien d'évitement « Aller au contenu » conservé

## 6. Fonctionnalités signature

1. **Scène 3D persistante « FIBRE »** : ruban de fibres + rack 3D, bloom (§8)
2. **Badge d'accès recto / verso** (§5.2)
3. **Terminal / palette de commandes** : `Ctrl+K`, `⌘K` ou `` ` `` ouvre un terminal en overlay. Commandes : `help`, `whoami`, `ls`, `cd <section>`, `cat about`, `projects`, `rooms --filter <catégorie>`, `open github|thm|discord`, `calm`, `clear`, `exit`, + easter egg `sudo hire-luke`. Autocomplétion Tab, historique ↑/↓, sortie en `aria-live`.
4. **Mode calme** (bouton dans la nav, automatique si `prefers-reduced-motion`) : coupe la 3D, Lenis et les pins ; reste un site complet (ruban en image statique, rack en dessin SVG).
5. Effet « décryptage » sur les légendes, compteurs, barres et jauges animées. *(Curseur custom et boutons magnétiques retirés : rien ne suit la souris.)*
6. Easter egg **Konami code** (glitch du ruban + message)
7. **Données GitHub au build** (§7)

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

## 8. Fond animé — spécification *(2026-10-08, direction SIMPLE)*

- **Un `<canvas>` 2D** fixe derrière la page (`Ambient`), contexte opaque, `dpr` ≤ 1,5 (≤ 1,25 sur téléphone).
- **Contenu** : ~90 étoiles qui scintillent (40 sur téléphone) et deux rubans de 34 fils (18 sur téléphone) : chaque fil suit `base(u) + écart(u) · cos(θ + torsion(u, t))`, plus une petite ondulation propre à chaque fil. Le scroll fait doucement glisser les rubans et les étoiles (parallaxe).
- **Perf** : la première image est dessinée au premier temps libre ; l'animation ne démarre qu'au premier geste du visiteur (scroll, souris, toucher, clavier), s'arrête quand l'onglet est caché, et ne dessine qu'une image sur deux sur téléphone ou machine lente.
- **Mode calme / mouvement réduit** : une image figée.
- Halos, voile et grain : calques CSS statiques au-dessus du canvas.

### Ancienne scène 3D *(direction FIBRE, retirée le 2026-10-08)*

- **Un seul `<Canvas>`** R3F fixe derrière la page, importé en `dynamic(..., { ssr: false })` quand le navigateur est libre, après le premier rendu du texte. Rendu piloté par `gsap.ticker` juste après Lenis (`frameloop="never"` + `advance`) : la 3D ne décroche jamais du texte.
- **Caméra liée au scroll** : 10 unités monde = la hauteur de l'écran ; la caméra suit `scrollY` au pixel près, donc le ruban est « imprimé » sur la page.
- **Ruban** : un chemin Catmull-Rom passant par des ancres posées dans chaque section (fraction de hauteur + décalage), échantillonné dans une `DataTexture` flottante (position + écartement, normale + surbrillance, tangente). ~300 fibres instanciées, extrudées à l'écran dans le vertex shader (épaisseur en pixels), torsion et dérive par fibre, impulsions lumineuses, couleurs HDR. Poussières et bokeh en `Points`. Seule la portion visible du chemin est dessinée. Apparition depuis le sommet du héros.
- **Rack** : modélisé en code (boîtes arrondies, façades dessinées en canvas avec texture émissive), éclairé (lumières qui voyagent avec lui, environnement PMREM), posé chaque image sur la carte collante du lab ; vue éclatée et unité active pilotées par ScrollTrigger via une ref (`rackState`).
- **Post-process** : Bloom `mipmapBlur`, tone mapping ACES, vignette. Coupé en rendu logiciel.
- **Flou** : pas dans la 3D, en CSS (`backdrop-filter`) sur les sections denses et les panneaux.
- **Perf** : `dpr` 1 → 1,5, aucune allocation dans `useFrame`. **Sans GPU** (rendu logiciel détecté par le nom du moteur WebGL) : pas de 3D, et le flou CSS en direct est remplacé par un verre opaque. **Téléphone : pas de 3D pour l'instant** (demande de Luke), image statique du ruban.
- **Fallback** : WebGL indisponible, mode calme ou téléphone → ruban en SVG statique (calculé au build avec les mêmes formules) et rack isométrique SVG.

## 9. Qualité, perf, accessibilité, SEO

- **Lighthouse** (build de prod) : Performance ≥ 80 mobile / ≥ 90 desktop, Accessibilité ≥ 95, Best Practices ≥ 95, SEO ≥ 95. CLS < 0,05.
- JS initial minimal : React + Next.js seulement, aucune lib d'animation.
- 60 fps visés au scroll ; aucun à-coup au chargement.
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
- [ ] Le ruban 3D suit la page de section en section (net / flouté), le rack 3D s'éclate et suit les étapes ; le fallback sans WebGL est propre *(remplace les 5 formes de particules, direction FIBRE du 2026-10-07)*
- [ ] Badge d'accès recto / verso au clic et au clavier *(remplace le lanyard, retiré à la demande de Luke)*
- [ ] Terminal : ouverture au clavier, `help`, autocomplétion, historique, `cd`, `calm`, `sudo hire-luke`
- [ ] Mode calme + `prefers-reduced-motion` : tout le contenu accessible, aucune animation lourde
- [ ] Filtres, recherche et tri des rooms fonctionnels et animés
- [ ] Tests Playwright verts (desktop, mobile, reduced-motion) : 0 erreur console, 0 violation axe serious/critical, navigation par ancres, filtres, terminal
- [ ] Lighthouse aux seuils du §9
- [ ] basePath géré sans valeur en dur ; assets chargés via `asset()` ; workflow Pages valide
- [ ] Aucun contenu inventé ; liste des `[À REMPLIR]` restants dans le récap final
- [ ] README à jour ; travail commité par étapes ; `git status` propre
