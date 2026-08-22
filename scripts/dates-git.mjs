/**
 * Génère src/lib/dates-git.json : pour chaque fichier de content/,
 * la date du dernier commit qui l'a touché.
 *
 * Pourquoi : le champ `maj` du frontmatter pourrit dès qu'on oublie de
 * le mettre à jour à la main. La date du commit, elle, est toujours vraie.
 * Le frontmatter reste prioritaire s'il est renseigné explicitement.
 *
 * Un seul appel à git, pas un par fichier.
 * En CI, il faut `fetch-depth: 0` sinon l'historique est tronqué.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const SORTIE = new URL('../src/lib/dates-git.json', import.meta.url);

let sortie = '';
try {
  sortie = execFileSync(
    'git',
    ['log', '--format=@%cI', '--name-only', '--', 'content'],
    { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
  );
} catch {
  // Pas de dépôt git, ou aucun commit : on écrit un fichier vide plutôt
  // que de casser le build.
  console.warn('[dates-git] git indisponible, dates ignorées');
}

const dates = {};
let courante = null;
for (const ligne of sortie.split('\n')) {
  if (ligne.startsWith('@')) {
    courante = ligne.slice(1);
  } else if (ligne.trim() && courante) {
    // Le log est antichronologique : la première date vue est la plus récente.
    if (!dates[ligne]) dates[ligne] = courante;
  }
}

mkdirSync(new URL('.', SORTIE), { recursive: true });
writeFileSync(SORTIE, JSON.stringify(dates, null, 0));
console.log(`[dates-git] ${Object.keys(dates).length} fichier(s) datés`);
