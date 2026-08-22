// @ts-check
import { defineConfig } from 'astro/config';
import remarkEncadres from './src/plugins/remark-encadres.mjs';
import rehypeContenu from './src/plugins/rehype-contenu.mjs';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  // Dépôt de type « site utilisateur » : le site est servi à la racine du
  // domaine, donc `base` reste "/" et les liens markdown [texte](/chemin)
  // fonctionnent sans réécriture. Remplacer <pseudo> par le compte GitHub.
  site: 'https://pseudo.github.io',

  markdown: {
    remarkPlugins: [remarkEncadres],
    // rehypeHeadingIds d'abord : Astro ne pose les id de titres qu'APRÈS
    // les plugins utilisateur, or rehypeContenu en a besoin pour les ancres.
    // Astro le relancera ensuite et respectera les id déjà présents.
    rehypePlugins: [rehypeHeadingIds, rehypeContenu],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'ayu-dark' },
      wrap: false,
    },
  },
});
