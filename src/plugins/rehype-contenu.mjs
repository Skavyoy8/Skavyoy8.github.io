/**
 * Deux retouches sur le HTML produit par le Markdown :
 *
 * 1. Les tableaux sont enveloppés dans un conteneur qui défile
 *    horizontalement. Sans ça, un tableau large déborde et fait
 *    défiler la page entière sur iPhone — inacceptable, le mobile
 *    est le cas d'usage principal (SPEC §9).
 *
 * 2. Les titres h2/h3 reçoivent un lien d'ancre discret. Astro
 *    génère déjà les `id`, on ajoute seulement le lien.
 *
 * Pas de dépendance : la traversée fait dix lignes.
 */

const TITRES = new Set(['h2', 'h3']);

function parcourir(noeud, parent) {
  if (!noeud || typeof noeud !== 'object') return;

  if (Array.isArray(noeud.children)) {
    // Copie : on modifie children pendant l'itération.
    for (const enfant of [...noeud.children]) parcourir(enfant, noeud);
  }

  if (noeud.type !== 'element' || !parent) return;

  if (noeud.tagName === 'table') {
    const i = parent.children.indexOf(noeud);
    if (i === -1) return;
    parent.children[i] = {
      type: 'element',
      tagName: 'div',
      properties: { className: ['table-enveloppe'] },
      children: [noeud],
    };
    return;
  }

  if (TITRES.has(noeud.tagName) && noeud.properties?.id) {
    const deja = noeud.children.some(
      (e) => e.type === 'element' && e.properties?.className?.includes?.('ancre')
    );
    if (deja) return;
    noeud.children.push({
      type: 'element',
      tagName: 'a',
      properties: {
        className: ['ancre'],
        href: `#${noeud.properties.id}`,
        'aria-label': 'Lien vers cette section',
      },
      // Volontairement sans enfant texte : le collecteur de titres d'Astro
      // ramasse le texte des descendants, un « # » ici polluerait les
      // libellés du sommaire. Le glyphe est posé en CSS (.ancre::after).
      children: [],
    });
  }
}

export default function rehypeContenu() {
  return (arbre) => parcourir(arbre, null);
}
