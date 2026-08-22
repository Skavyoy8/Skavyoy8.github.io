/**
 * Hydrate tous les blocs de prix de la page.
 *
 * Un bloc s'écrit, dans n'importe quel fichier Markdown du vault :
 *     <div data-okx-prix="BTC-USDT"></div>
 *
 * Le même attribut est produit par le composant PrixLive.astro. Un seul
 * chemin de code pour les deux, comme demandé par SPEC §8.
 */
import { ticker, instrument, variation24h, formaterPrix, formaterVolume, formaterHeure, decimalesDepuisTick } from './okx.js';

const RAFRAICHIR = 60_000;

function squelette(instId) {
  // Logo en CC0 (cryptocurrency-icons), servi depuis /icones/. Absent pour
  // les actifs récents : onerror le retire plutôt que d'afficher une image
  // cassée.
  const base = instId.split('-')[0].toLowerCase();
  return `
    <div class="live__entete">
      <img class="live__logo" src="/icones/${base}.svg" alt="" width="22" height="22"
           onerror="this.remove()">
      <span class="live__paire">${instId}</span>
      <span class="live__prix">—</span>
      <span class="live__var"></span>
    </div>
    <div class="live__grille">
      <div class="live__cellule"><span class="live__cle">Haut 24 h</span><span class="live__valeur" data-champ="high24h">—</span></div>
      <div class="live__cellule"><span class="live__cle">Bas 24 h</span><span class="live__valeur" data-champ="low24h">—</span></div>
      <div class="live__cellule"><span class="live__cle">Volume 24 h</span><span class="live__valeur" data-champ="vol24h">—</span></div>
      <div class="live__cellule"><span class="live__cle">Ouverture 24 h</span><span class="live__valeur" data-champ="open24h">—</span></div>
    </div>
    <div class="live__pied">
      <span>API publique OKX</span>
      <span class="live__ts">chargement…</span>
    </div>`;
}

async function remplir(bloc) {
  const instId = bloc.dataset.okxPrix;
  if (!instId) return;

  if (!bloc.querySelector('.live__prix')) {
    bloc.classList.add('live');
    bloc.setAttribute('data-etat', 'charge');
    bloc.innerHTML = squelette(instId);
  }

  const $ = (sel) => bloc.querySelector(sel);

  try {
    // Le pas de cotation donne le bon nombre de décimales : afficher
    // le BTC avec 8 décimales ou un altcoin avec 2 serait faux dans
    // les deux sens.
    const [t, inst] = await Promise.all([
      ticker(instId),
      instrument(instId).catch(() => null),
    ]);

    const dec = inst ? decimalesDepuisTick(inst.tickSz) : 2;
    const variation = variation24h(t);

    $('.live__prix').textContent = formaterPrix(t.last, dec);

    const varEl = $('.live__var');
    if (variation === null) {
      varEl.textContent = '';
    } else {
      const signe = variation >= 0 ? '+' : '−';
      varEl.textContent = `${signe}${Math.abs(variation).toFixed(2).replace('.', ',')} %`;
      varEl.dataset.sens = variation >= 0 ? 'hausse' : 'baisse';
    }

    $('[data-champ="high24h"]').textContent = formaterPrix(t.high24h, dec);
    $('[data-champ="low24h"]').textContent = formaterPrix(t.low24h, dec);
    $('[data-champ="open24h"]').textContent = formaterPrix(t.open24h, dec);
    $('[data-champ="vol24h"]').textContent =
      `${formaterVolume(t.vol24h)} ${inst?.baseCcy ?? ''}`.trim();

    $('.live__ts').textContent = `à ${formaterHeure(t.ts)}`;
    bloc.setAttribute('data-etat', 'ok');
  } catch (erreur) {
    // État dégradé : la page reste lisible, on dit ce qui s'est passé.
    bloc.setAttribute('data-etat', 'erreur');
    const pied = $('.live__pied');
    if (pied) pied.querySelector('.live__ts').textContent = 'indisponible';
    if (!bloc.querySelector('.live__message')) {
      const msg = document.createElement('p');
      msg.className = 'live__message';
      // Pas de recopie du message d'OKX : il est en anglais et parfois
    // très verbeux. On garde le code, qui est ce qui sert à diagnostiquer.
    msg.textContent =
        erreur?.code === 'reseau'
          ? "L'API OKX est injoignable. Le reste de la page reste à jour."
          : `Données de marché indisponibles (code ${erreur?.code ?? 'inconnu'}).`;
      bloc.append(msg);
    }
  }
}

function tout() {
  document.querySelectorAll('[data-okx-prix]').forEach(remplir);
}

tout();

// Rafraîchissement discret : seulement quand l'onglet est visible, pour
// ne pas marteler l'API depuis vingt onglets ouverts.
setInterval(() => {
  if (document.visibilityState === 'visible') tout();
}, RAFRAICHIR);
