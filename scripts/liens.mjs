/**
 * Vérifie les liens internes du site construit.
 *
 * Un wiki en cours de rédaction est plein de liens vers des pages pas
 * encore écrites — c'est normal, mais il faut savoir lesquels, sinon on
 * les découvre en cliquant.
 *
 *   node scripts/liens.mjs        (ou npm run liens, après un build)
 */
import { readFileSync } from 'node:fs';
import { glob } from 'node:fs/promises';

const pages = new Set();
const liens = [];

for await (const chemin of glob('dist/**/*.html')) {
  const url = '/' + chemin.replace(/^dist\//, '').replace(/index\.html$/, '').replace(/\.html$/, '');
  pages.add(url.replace(/\/$/, '') || '/');

  const html = readFileSync(chemin, 'utf8');
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const vers = m[1].replace(/\/$/, '') || '/';
    // On ignore les fichiers statiques (favicon, polices, images) : ce ne
    // sont pas des pages, ils n'ont rien à faire dans ce contrôle.
    if (/\.[a-z0-9]{2,5}$/i.test(vers)) continue;
    liens.push({ depuis: url.replace(/(.)\/$/, '$1'), vers });
  }
}

const casses = liens.filter(
  (l) => !pages.has(l.vers) && !l.vers.startsWith('/_astro') && !l.vers.startsWith('/pagefind')
);

const parCible = new Map();
for (const l of casses) {
  if (!parCible.has(l.vers)) parCible.set(l.vers, new Set());
  parCible.get(l.vers).add(l.depuis);
}

console.log(`${pages.size} page(s), ${liens.length} lien(s) interne(s).`);

if (parCible.size === 0) {
  console.log('Aucun lien cassé.');
} else {
  console.log(`\n${parCible.size} cible(s) manquante(s) — pages pas encore écrites :\n`);
  for (const [cible, sources] of [...parCible].sort()) {
    console.log(`  ${cible}`);
    for (const s of sources) console.log(`      ← ${s}`);
  }
}
