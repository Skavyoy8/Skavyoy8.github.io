// @ts-check
import { defineConfig } from 'astro/config';
import { unified, rehypeHeadingIds } from '@astrojs/markdown-remark';
import remarkEncadres from './src/plugins/remark-encadres.mjs';
import remarkGlossaire from './src/plugins/remark-glossaire.mjs';
import rehypeContenu from './src/plugins/rehype-contenu.mjs';

// https://astro.build/config
export default defineConfig({
  // Dépôt de type « site utilisateur » (Skavyoy8/Skavyoy8.github.io) : le
  // site est servi à la racine du domaine, donc `base` reste "/" et les
  // liens markdown [texte](/chemin) fonctionnent sans réécriture.
  site: 'https://skavyoy8.github.io',

  markdown: {
    // Astro 7 a déprécié markdown.remarkPlugins / rehypePlugins : les plugins
    // se déclarent maintenant sur le processeur lui-même.
    processor: unified({
      remarkPlugins: [remarkEncadres, remarkGlossaire],
      // rehypeHeadingIds d'abord : Astro ne pose les id de titres qu'APRÈS
      // les plugins utilisateur, or rehypeContenu en a besoin pour les ancres.
      // Astro le relancera ensuite et respectera les id déjà présents.
      rehypePlugins: [rehypeHeadingIds, rehypeContenu],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'ayu-dark' },
      wrap: false,
    },
  },
});
