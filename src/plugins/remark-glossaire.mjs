/**
 * Lie la PREMIÈRE occurrence de chaque terme déclaré dans le frontmatter
 * `termes:` d'une page vers sa définition du glossaire, avec la définition
 * en infobulle native (attribut title, donc zéro JavaScript).
 *
 * Trois brides délibérées, sans lesquelles la fonction devient nuisible :
 *  - seule la PREMIÈRE occurrence est liée ; lier les vingt suivantes
 *    transforme la page en champ de mines bleu ;
 *  - seuls les termes déclarés dans le frontmatter de LA page sont
 *    candidats, jamais les 250 du glossaire — sinon « position »,
 *    « marché » ou « volume » se lieraient dans n'importe quelle phrase ;
 *  - jamais dans un titre, un bloc de code, du code en ligne ni un lien
 *    existant.
 *
 * L'index vient de src/lib/glossaire.json, régénéré au build par
 * scripts/glossaire.mjs.
 */
import glossaire from '../lib/glossaire.json' with { type: 'json' };

/** Conteneurs dont on ne touche jamais le contenu. */
const INTOUCHABLES = new Set(['heading', 'link', 'linkReference', 'code', 'inlineCode', 'html', 'definition']);

/**
 * Motif tolérant à la casse et aux deux apostrophes, mais qui exige des
 * frontières de mot : « gas » ne doit pas se lier dans « gaspillage ».
 */
function motif(forme) {
  const echappe = forme
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/['’]/g, "['’]");
  return new RegExp(`(?<![\\p{L}\\p{N}-])${echappe}(?![\\p{L}\\p{N}-])`, 'iu');
}

export default function remarkGlossaire() {
  return (arbre, fichier) => {
    const declares = fichier?.data?.astro?.frontmatter?.termes;
    if (!Array.isArray(declares) || declares.length === 0) return;

    // Les formes les plus longues d'abord : « carnet d'ordres » doit
    // gagner contre « ordre » si les deux sont déclarés.
    const candidats = [];
    for (const slug of declares) {
      const entree = glossaire[slug];
      if (!entree) continue;
      for (const forme of entree.formes) {
        candidats.push({ slug, forme, motif: motif(forme), definition: entree.definition });
      }
    }
    candidats.sort((a, b) => b.forme.length - a.forme.length);

    const poses = new Set();

    const parcourir = (noeud) => {
      if (!noeud || typeof noeud !== 'object' || !Array.isArray(noeud.children)) return;
      if (INTOUCHABLES.has(noeud.type)) return;

      for (let i = 0; i < noeud.children.length; i++) {
        const enfant = noeud.children[i];

        if (enfant.type !== 'text') {
          parcourir(enfant);
          continue;
        }

        // Premier candidat non encore posé qui apparaît dans ce texte.
        let meilleur = null;
        for (const c of candidats) {
          if (poses.has(c.slug)) continue;
          const t = c.motif.exec(enfant.value);
          if (t && (!meilleur || t.index < meilleur.index)) {
            meilleur = { ...c, index: t.index, texte: t[0] };
          }
        }
        if (!meilleur) continue;

        const avant = enfant.value.slice(0, meilleur.index);
        const apres = enfant.value.slice(meilleur.index + meilleur.texte.length);

        const lien = {
          type: 'link',
          url: `/glossaire/${meilleur.slug}`,
          title: meilleur.definition,
          data: { hProperties: { className: ['terme'] } },
          children: [{ type: 'text', value: meilleur.texte }],
        };

        const remplacement = [];
        if (avant) remplacement.push({ type: 'text', value: avant });
        remplacement.push(lien);
        if (apres) remplacement.push({ type: 'text', value: apres });

        noeud.children.splice(i, 1, ...remplacement);
        poses.add(meilleur.slug);

        // On repart sur le fragment restant, qui peut contenir un autre terme.
        i += remplacement.length - 2;
      }
    };

    parcourir(arbre);
  };
}
