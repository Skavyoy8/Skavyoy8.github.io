/**
 * Trace un graphique de prix en SVG à partir des bougies de l'API OKX.
 *
 * S'écrit dans n'importe quel fichier Markdown du vault :
 *     <div data-okx-graphique="BTC-USDT"></div>
 *     <div data-okx-graphique="ETH-USDT" data-bar="1H" data-limite="72"></div>
 *
 * Aucune bibliothèque de graphiques : le SVG est calculé à la main, comme
 * les schémas du site. Les couleurs sont des variables CSS, donc le thème
 * clair fonctionne sans retouche.
 */
import { bougies, instrument, decimalesDepuisTick, formaterPrix } from './okx.js';

const L = 640;  // largeur du viewBox
const H = 200;  // hauteur du viewBox
const MARGE = { haut: 14, bas: 22, gauche: 8, droite: 68 };

function cheminSvg(points) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
}

async function tracer(bloc) {
  const instId = bloc.dataset.okxGraphique;
  if (!instId) return;

  const bar = bloc.dataset.bar || '1D';
  const limite = Number(bloc.dataset.limite || 90);

  bloc.classList.add('graphique');
  bloc.innerHTML = '<p class="graphique__message">Chargement du graphique…</p>';

  try {
    const [brut, inst] = await Promise.all([
      bougies(instId, bar, limite),
      instrument(instId).catch(() => null),
    ]);

    // L'API renvoie du plus récent au plus ancien : on remet dans l'ordre.
    const series = brut
      .map((b) => ({ ts: Number(b[0]), haut: Number(b[2]), bas: Number(b[3]), cloture: Number(b[4]) }))
      .reverse();

    if (series.length < 2) throw new Error('série trop courte');

    const dec = inst ? decimalesDepuisTick(inst.tickSz) : 2;
    const bas = Math.min(...series.map((p) => p.bas));
    const haut = Math.max(...series.map((p) => p.haut));
    const etendue = haut - bas || 1;

    const largeurUtile = L - MARGE.gauche - MARGE.droite;
    const hauteurUtile = H - MARGE.haut - MARGE.bas;

    const points = series.map((p, i) => ({
      x: MARGE.gauche + (i / (series.length - 1)) * largeurUtile,
      y: MARGE.haut + (1 - (p.cloture - bas) / etendue) * hauteurUtile,
    }));

    const premier = series[0].cloture;
    const dernier = series[series.length - 1].cloture;
    const hausse = dernier >= premier;
    const couleur = hausse ? 'var(--hausse)' : 'var(--baisse)';
    const variation = ((dernier - premier) / premier) * 100;

    const aire = `${cheminSvg(points)} L${points[points.length - 1].x.toFixed(1)} ${H - MARGE.bas} L${points[0].x.toFixed(1)} ${H - MARGE.bas} Z`;

    const dateFr = (ts) =>
      new Date(ts).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

    const idAire = `aire-${instId.replace(/[^a-z0-9]/gi, '')}`;

    bloc.innerHTML = `
      <svg viewBox="0 0 ${L} ${H}" role="img"
           aria-label="Évolution du prix de ${instId} sur ${series.length} périodes de ${bar}">
        <defs>
          <linearGradient id="${idAire}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${couleur}" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="${couleur}" stop-opacity="0"/>
          </linearGradient>
        </defs>

        <line x1="${MARGE.gauche}" y1="${MARGE.haut}" x2="${L - MARGE.droite}" y2="${MARGE.haut}"
              stroke="var(--bordure)" stroke-dasharray="3 4"/>
        <line x1="${MARGE.gauche}" y1="${H - MARGE.bas}" x2="${L - MARGE.droite}" y2="${H - MARGE.bas}"
              stroke="var(--bordure)" stroke-dasharray="3 4"/>

        <path d="${aire}" fill="url(#${idAire})"/>
        <path d="${cheminSvg(points)}" fill="none" stroke="${couleur}" stroke-width="1.6"
              stroke-linejoin="round" stroke-linecap="round"/>

        <circle cx="${points[points.length - 1].x.toFixed(1)}" cy="${points[points.length - 1].y.toFixed(1)}"
                r="2.6" fill="${couleur}"/>

        <text x="${L - MARGE.droite + 8}" y="${MARGE.haut + 4}" font-size="11" fill="var(--texte-faible)">${formaterPrix(haut, dec)}</text>
        <text x="${L - MARGE.droite + 8}" y="${H - MARGE.bas + 4}" font-size="11" fill="var(--texte-faible)">${formaterPrix(bas, dec)}</text>
        <text x="${MARGE.gauche}" y="${H - 6}" font-size="11" fill="var(--texte-faible)">${dateFr(series[0].ts)}</text>
        <text x="${L - MARGE.droite}" y="${H - 6}" font-size="11" fill="var(--texte-faible)" text-anchor="end">${dateFr(series[series.length - 1].ts)}</text>
      </svg>
      <p class="graphique__legende">
        <span class="graphique__paire">${instId}</span>
        <span>${series.length} × ${bar}</span>
        <span class="graphique__var" data-sens="${hausse ? 'hausse' : 'baisse'}">
          ${hausse ? '+' : '−'}${Math.abs(variation).toFixed(2).replace('.', ',')} %
        </span>
      </p>`;
  } catch (erreur) {
    bloc.setAttribute('data-etat', 'erreur');
    bloc.innerHTML = `<p class="graphique__message">Graphique indisponible (${
      erreur?.code === 'reseau' ? 'API injoignable' : `code ${erreur?.code ?? 'inconnu'}`
    }).</p>`;
  }
}

document.querySelectorAll('[data-okx-graphique]').forEach(tracer);
