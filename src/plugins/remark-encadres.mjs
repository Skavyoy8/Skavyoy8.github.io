/**
 * Transforme les callouts de syntaxe Obsidian en encadrés stylés.
 *
 *   > [!exemple] Titre optionnel
 *   > le texte
 *
 * devient <aside class="encadre encadre--exemple"> avec un titre.
 *
 * Pourquoi cette syntaxe plutôt que des directives `:::` : c'est un
 * blockquote Markdown standard. Obsidian le stylise nativement sur
 * l'iPhone, et n'importe quel autre lecteur le rend proprement en
 * citation. Aucune dépendance, aucun rendu cassé.
 *
 * Pas de dépendance externe : la traversée de l'arbre tient en dix lignes,
 * inutile d'ajouter unist-util-visit (cf. SPEC §4, « zéro dépendance inutile »).
 */

const TYPES = {
  info: { classe: 'info', libelle: 'Bon à savoir' },
  note: { classe: 'info', libelle: 'Bon à savoir' },
  exemple: { classe: 'exemple', libelle: 'En clair' },
  piege: { classe: 'piege', libelle: 'Piège' },
  'piège': { classe: 'piege', libelle: 'Piège' },
  attention: { classe: 'piege', libelle: 'Piège' },
  verifier: { classe: 'verifier', libelle: 'À vérifier' },
  'vérifier': { classe: 'verifier', libelle: 'À vérifier' },
  'a-verifier': { classe: 'verifier', libelle: 'À vérifier' },
};

// > [!type]  ou  > [!type]+ Titre   (le +/- est le pliage d'Obsidian)
const MARQUEUR = /^\[!([^\]]+)\][+-]?[ \t]*(.*?)(\n|$)/;

function parcourir(noeud, visiteur) {
  if (!noeud || typeof noeud !== 'object') return;
  visiteur(noeud);
  if (Array.isArray(noeud.children)) {
    for (const enfant of noeud.children) parcourir(enfant, visiteur);
  }
}

export default function remarkEncadres() {
  return (arbre, fichier) => {
    parcourir(arbre, (noeud) => {
      if (noeud.type !== 'blockquote') return;

      const premier = noeud.children?.[0];
      if (!premier || premier.type !== 'paragraph') return;

      const texte = premier.children?.[0];
      if (!texte || texte.type !== 'text') return;

      const trouve = MARQUEUR.exec(texte.value);
      if (!trouve) return;

      const cle = trouve[1].trim().toLowerCase();
      const type = TYPES[cle];
      if (!type) {
        // Callout inconnu : on laisse la citation intacte plutôt que de
        // produire un encadré muet, et on prévient dans la console du build.
        console.warn(
          `[encadres] type inconnu « ${cle} » dans ${fichier?.path ?? 'un fichier'} — ` +
            `types acceptés : info, exemple, piege, verifier`
        );
        return;
      }

      const titrePropre = trouve[2].trim();

      // On retire le marqueur du texte, en gardant le reste du paragraphe.
      const reste = texte.value.slice(trouve[0].length);
      if (reste) {
        texte.value = reste;
      } else if (premier.children.length > 1) {
        premier.children.shift();
      } else {
        noeud.children.shift();
      }

      const titre = {
        type: 'paragraph',
        data: { hName: 'p', hProperties: { className: ['encadre__titre'] } },
        children: [{ type: 'text', value: titrePropre || type.libelle }],
      };

      noeud.children.unshift(titre);
      noeud.data = {
        hName: 'aside',
        hProperties: { className: ['encadre', `encadre--${type.classe}`] },
      };
    });
  };
}
