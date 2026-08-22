/**
 * Génère src/lib/glossaire.json depuis content/glossaire/.
 *
 * Le plugin remark qui pose les liens ne peut pas lire les collections
 * Astro : il tourne pendant le rendu du Markdown, avant que quoi que ce
 * soit ne soit disponible. D'où ce fichier intermédiaire, régénéré au
 * build par le script `prebuild`.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { load } from 'js-yaml';

const DOSSIER = new URL('../content/glossaire/', import.meta.url);
const SORTIE = new URL('../src/lib/glossaire.json', import.meta.url);

const termes = {};

if (existsSync(DOSSIER)) {
  for (const fichier of readdirSync(DOSSIER).filter((f) => f.endsWith('.md'))) {
    const brut = readFileSync(new URL(fichier, DOSSIER), 'utf8');
    const entete = brut.match(/^---\n([\s\S]*?)\n---/);
    if (!entete) continue;

    const data = load(entete[1]) ?? {};
    const slug = fichier.replace(/\.md$/, '');
    const corps = brut.slice(entete[0].length).trim();

    termes[slug] = {
      titre: data.titre ?? slug,
      // La définition affichée en infobulle : le résumé, sinon la première
      // phrase du corps.
      definition: (data.resume || corps.split('\n')[0] || '').trim(),
      formes: [data.titre, ...(data.formes ?? [])].filter(Boolean),
    };
  }
}

writeFileSync(SORTIE, JSON.stringify(termes, null, 0));
console.log(`[glossaire] ${Object.keys(termes).length} terme(s) indexé(s)`);
