import { getCollection } from 'astro:content';
import { SECTIONS } from './sections.js';

/**
 * getCollection avertit bruyamment pour chaque collection vide. Or ici une
 * section vide est l'état NORMAL tant que la phase correspondante de
 * PROGRESS.md n'est pas écrite : sur dix sections, ça noie les vrais
 * messages d'erreur du build sous des dizaines de lignes inutiles.
 * On tait ce seul message, et rien d'autre.
 */
export async function pagesDe(id) {
  const avertir = console.warn;
  console.warn = (msg, ...reste) => {
    if (typeof msg === 'string' && msg.includes('does not exist or is empty')) return;
    avertir(msg, ...reste);
  };
  try {
    return await getCollection(id);
  } finally {
    console.warn = avertir;
  }
}

const ordreFr = (a, b) =>
  (a.data.ordre ?? 999) - (b.data.ordre ?? 999) ||
  a.data.titre.localeCompare(b.data.titre, 'fr');

/** Arbre complet de la navigation : les 9 sections et leurs pages. */
export async function arbreNavigation() {
  return Promise.all(
    SECTIONS.map(async (section) => {
      const entrees = await pagesDe(section.id);
      return {
        ...section,
        pages: entrees.sort(ordreFr).map((e) => ({
          titre: e.data.titre,
          url: `/${section.id}/${e.id}`,
          statut: e.data.statut,
        })),
      };
    })
  );
}

/** Page précédente et suivante dans la même section. */
export async function voisines(sectionId, id) {
  const entrees = (await pagesDe(sectionId)).sort(ordreFr);
  const i = entrees.findIndex((e) => e.id === id);
  if (i === -1) return { precedente: null, suivante: null };
  const lien = (e) => (e ? { titre: e.data.titre, url: `/${sectionId}/${e.id}` } : null);
  return { precedente: lien(entrees[i - 1]), suivante: lien(entrees[i + 1]) };
}

/** Table URL → titre, pour afficher des prérequis lisibles. */
export async function titresParUrl() {
  const table = {};
  for (const section of SECTIONS) {
    for (const e of await pagesDe(section.id)) {
      table[`/${section.id}/${e.id}`] = e.data.titre;
    }
  }
  return table;
}
