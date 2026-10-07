# CLAUDE.md

Portfolio 3D de Luke (élève en Bac Pro CIEL) — Next.js en export statique, déployé sur GitHub Pages.

- Spécification complète : `BRIEF.md` (source de vérité). Suivi : `PLAN.md`, à cocher au fur et à mesure.
- Luke apprend Git et le dev web : dans tes récaps (en français), explique en une phrase chaque choix non évident.

## Commandes

- `npm run dev` — serveur de dev
- `npm run lint` · `npm run typecheck` · `npm run build`
- `npm run test:e2e` — Playwright sur le build statique
- `npm run lh` — Lighthouse CI

## Règles

- Avant d'utiliser l'API d'une lib, vérifie la doc de la version installée (Next, Tailwind v4, R3F, postprocessing, GSAP, Motion bougent vite).
- Export statique : pas de route handlers dynamiques, middleware, ISR, Server Actions, `cookies()` / `headers()`, ni optimisation d'image Next.
- Tout fichier de `public/` chargé hors `next/link` / `next/image` passe par `asset()` (`src/lib/asset.ts`) à cause du basePath.
- Tout le texte du site vit dans `src/content/` (typé). N'invente jamais de stats, rooms, badges ou projets : laisse `[À REMPLIR]`.
- 3D : un seul `<Canvas>` (ruban et rack dans la même scène), import dynamique `ssr: false`, aucun `setState` ni allocation dans `useFrame`, valeurs de scroll transmises par refs (`ribbonState`, `rackState`).
- GSAP via `useGSAP` avec `scope` (nettoyage auto). Lenis synchronisé avec ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`, Lenis piloté par `gsap.ticker`, `gsap.ticker.lagSmoothing(0)`).
- GSAP = scroll et chorégraphie ; Motion (`motion/react`) = UI et micro-interactions. Jamais les deux sur le même élément.
- `prefers-reduced-motion` et le mode calme donnent toujours un site complet et beau.
- Ne désactive jamais une règle lint / TS / a11y et ne baisse jamais un seuil pour faire passer un test : corrige la cause.

## Vérifier son travail

- Après chaque tâche : lint + typecheck.
- Après chaque phase : build + tests e2e + captures de l'aperçu à 1440 px et 390 px, et une en reduced-motion.
- Ne coche une case de `PLAN.md` qu'avec la preuve sous les yeux (sortie de commande ou capture).

## Git

Commits petits et fréquents (Conventional Commits, en anglais), un par tâche cohérente. Jamais de secret commité.
