/**
 * Client de l'API publique OKX v5.
 *
 * Endpoints publics uniquement : aucune clé API, aucune authentification,
 * aucune donnée personnelle. Tout est appelé depuis le navigateur.
 *
 * Champs vérifiés contre l'API réelle le 2026-08-22.
 * Documentation : https://www.okx.com/docs-v5/
 */

const BASE = 'https://www.okx.com/api/v5/';

/** Durées de cache par famille d'endpoint, en millisecondes. */
const TTL = {
  ticker: 20_000,
  tickers: 30_000,
  bougies: 60_000,
  carnet: 5_000,
  instrument: 24 * 60 * 60 * 1000,
  funding: 5 * 60 * 1000,
};

export class ErreurOkx extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ErreurOkx';
    this.code = code;
  }
}

/* ── Cache de session ──────────────────────────────────────
   sessionStorage plutôt que localStorage : les données de
   marché n'ont aucune raison de survivre à l'onglet.
   ──────────────────────────────────────────────────────── */

function lireCache(cle) {
  try {
    const brut = sessionStorage.getItem(cle);
    if (!brut) return null;
    const { expire, donnees } = JSON.parse(brut);
    if (Date.now() > expire) {
      sessionStorage.removeItem(cle);
      return null;
    }
    return donnees;
  } catch {
    return null; // mode privé, quota plein, JSON corrompu : on ignore le cache
  }
}

function ecrireCache(cle, donnees, ttl) {
  try {
    sessionStorage.setItem(cle, JSON.stringify({ expire: Date.now() + ttl, donnees }));
  } catch {
    /* quota dépassé : tant pis, on se passe de cache */
  }
}

/**
 * Appelle un endpoint public et renvoie le tableau `data`.
 * Lève une ErreurOkx en cas d'échec réseau, HTTP ou métier.
 */
async function appeler(chemin, ttl = 30_000) {
  const cle = `okx:${chemin}`;
  const cache = lireCache(cle);
  if (cache) return cache;

  let reponse;
  try {
    reponse = await fetch(BASE + chemin, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
  } catch (cause) {
    throw new ErreurOkx('API injoignable', 'reseau');
  }

  if (!reponse.ok) {
    throw new ErreurOkx(`HTTP ${reponse.status}`, String(reponse.status));
  }

  const json = await reponse.json();

  // Enveloppe commune : code "0" = succès, tout le reste est une erreur métier.
  if (json.code !== '0') {
    throw new ErreurOkx(json.msg || 'Erreur API', json.code);
  }

  ecrireCache(cle, json.data, ttl);
  return json.data;
}

/* ── Endpoints ─────────────────────────────────────────────── */

/** Ticker d'un instrument. `last`, `open24h`, `high24h`, `low24h`, `vol24h`, `volCcy24h`, `ts`. */
export async function ticker(instId) {
  const data = await appeler(`market/ticker?instId=${encodeURIComponent(instId)}`, TTL.ticker);
  if (!data.length) throw new ErreurOkx(`Instrument inconnu : ${instId}`, 'vide');
  return data[0];
}

/** Tous les tickers d'un type d'instrument. Utilisé par le tableau exhaustif. */
export function tickers(instType = 'SPOT') {
  return appeler(`market/tickers?instType=${instType}`, TTL.tickers);
}

/**
 * Bougies. Chaque entrée est un tableau de chaînes, du plus RÉCENT au plus ancien :
 * [ ts, open, high, low, close, vol, volCcy, volCcyQuote, confirm ]
 */
export function bougies(instId, bar = '1D', limit = 100) {
  return appeler(
    `market/candles?instId=${encodeURIComponent(instId)}&bar=${bar}&limit=${limit}`,
    TTL.bougies
  );
}

/**
 * Carnet d'ordres. Chaque niveau est [ prix, quantité, "0", nombre d'ordres ].
 * La 3e valeur est un vestige des contrats à échéance, toujours "0" en spot.
 */
export async function carnet(instId, sz = 20) {
  const data = await appeler(`market/books?instId=${encodeURIComponent(instId)}&sz=${sz}`, TTL.carnet);
  return data[0];
}

/** Fiche technique d'un instrument : tickSz, lotSz, minSz, baseCcy, quoteCcy, state. */
export async function instrument(instId, instType = 'SPOT') {
  const data = await appeler(
    `public/instruments?instType=${instType}&instId=${encodeURIComponent(instId)}`,
    TTL.instrument
  );
  if (!data.length) throw new ErreurOkx(`Instrument inconnu : ${instId}`, 'vide');
  return data[0];
}

/** Funding rate d'un perpétuel. `fundingRate` est une FRACTION (0.0001 = 0,01 %). */
export async function fundingRate(instId) {
  const data = await appeler(`public/funding-rate?instId=${encodeURIComponent(instId)}`, TTL.funding);
  if (!data.length) throw new ErreurOkx(`Perpétuel inconnu : ${instId}`, 'vide');
  return data[0];
}

/* ── Formatage ─────────────────────────────────────────────── */

/**
 * Nombre de décimales à afficher, déduit du pas de cotation.
 * tickSz "0.1" → 1 décimale ; "0.00000001" → 8.
 */
export function decimalesDepuisTick(tickSz) {
  const s = String(tickSz);
  const point = s.indexOf('.');
  return point === -1 ? 0 : s.length - point - 1;
}

/** Formate un prix en français, avec le bon nombre de décimales. */
export function formaterPrix(valeur, decimales = 2) {
  const n = Number(valeur);
  if (!Number.isFinite(n)) return '—';
  return n.toLocaleString('fr-FR', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

/** Formate un gros volume : 690704951 → « 690,7 M ». */
export function formaterVolume(valeur) {
  const n = Number(valeur);
  if (!Number.isFinite(n)) return '—';
  if (n >= 1e9) return `${(n / 1e9).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Md`;
  if (n >= 1e6) return `${(n / 1e6).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M`;
  if (n >= 1e3) return `${(n / 1e3).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} k`;
  return n.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
}

/** Variation en pourcentage entre l'ouverture 24 h et le dernier prix. */
export function variation24h(t) {
  const ouverture = Number(t.open24h);
  const dernier = Number(t.last);
  if (!ouverture || !Number.isFinite(dernier)) return null;
  return ((dernier - ouverture) / ouverture) * 100;
}

/** Horodatage OKX (millisecondes epoch, chaîne) → heure locale lisible. */
export function formaterHeure(ts) {
  const n = Number(ts);
  if (!Number.isFinite(n)) return '—';
  return new Date(n).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
