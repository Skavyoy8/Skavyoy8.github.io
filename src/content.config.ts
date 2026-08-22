import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Le contenu vit dans /content à la racine du dépôt, pas dans src/.
 * Ce dossier est un vault Obsidian : il ne doit contenir que du Markdown.
 *
 * Frontmatter volontairement permissif : seul `titre` est obligatoire.
 * Une note écrite depuis l'iPhone sans `ordre` ni `sources` ne doit JAMAIS
 * casser le build GitHub Actions — voir le journal de PROGRESS.md.
 */

const source = z.object({
  titre: z.string().default(''),
  // Pas de .url() : les modèles Obsidian pré-remplissent `url: ""`,
  // et une chaîne vide ferait échouer le build. Les entrées vides
  // sont filtrées à l'affichage.
  url: z.string().default(''),
});

const base = z.object({
  titre: z.string(),
  resume: z.string().default(''),
  section: z.string().optional(),
  ordre: z.number().default(999),
  niveau: z.enum(['bases', 'intermediaire', 'avance']).default('bases'),
  prerequis: z.array(z.string()).default([]),
  termes: z.array(z.string()).default([]),
  sources: z.array(source).default([]),
  statut: z.enum(['ebauche', 'redige', 'verifie']).default('ebauche'),
  /** Renseigné automatiquement depuis la date du dernier commit git. */
  maj: z.coerce.date().optional(),
});

/** Fiches cryptos : identité + instrument OKX pour le bloc de données live. */
const fiche = base.extend({
  ticker: z.string().default(''),
  instId: z.string().default(''),
});

/** Un terme de glossaire : définition courte + page qui développe. */
const terme = base.extend({
  /** Page qui développe le terme, par exemple "/marches/spread". */
  voir: z.string().default(''),
  /**
   * Formes de surface à détecter dans le texte des pages, en plus du titre.
   * « carnet d'ordres » et « carnet d'ordre » désignent la même entrée.
   */
  formes: z.array(z.string()).default([]),
});

/** Fabrique une collection pointant vers content/<dossier>. */
const collection = (dossier: string, schema: z.ZodTypeAny = base) =>
  defineCollection({
    loader: glob({ base: `./content/${dossier}`, pattern: '**/*.md' }),
    schema,
  });

export const collections = {
  commencer: collection('commencer'),
  fondamentaux: collection('fondamentaux'),
  chaines: collection('chaines'),
  okx: collection('okx'),
  marches: collection('marches'),
  derives: collection('derives'),
  produits: collection('produits'),
  securite: collection('securite'),
  fiscalite: collection('fiscalite'),
  cryptos: collection('cryptos', fiche),
  glossaire: collection('glossaire', terme),
};
