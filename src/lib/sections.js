/**
 * Les sections du wiki, dans l'ordre de lecture du §7 de SPEC.md.
 * L'ordre de la barre latérale est l'ordre pédagogique, pas l'ordre
 * de rédaction (les phases de PROGRESS.md, elles, commencent par OKX).
 */
export const SECTIONS = [
  { id: 'commencer', titre: 'Commencer', resume: "Le strict nécessaire, en français simple. À lire d'abord." },
  { id: 'fondamentaux', titre: 'Fondamentaux', resume: 'Comment une blockchain fonctionne, sous le capot.' },
  { id: 'chaines',      titre: 'Les chaînes',  resume: 'Bitcoin, Ethereum, les L2, les stablecoins.' },
  { id: 'okx',          titre: 'OKX',          resume: "Ce qu'un exchange centralisé fait vraiment." },
  { id: 'marches',      titre: 'Marchés',      resume: "Carnet d'ordres, liquidité, types d'ordres." },
  { id: 'derives',      titre: 'Dérivés',      resume: 'Perpétuels, levier, liquidation, funding rate.' },
  { id: 'produits',     titre: 'Produits et DeFi', resume: 'Earn, staking, AMM, bots, NFT.' },
  { id: 'securite',     titre: 'Sécurité',     resume: 'Modèle de menace, phishing, approbations, arnaques.' },
  { id: 'fiscalite',    titre: 'Fiscalité',    resume: 'Le cadre français et européen, sourcé.' },
  { id: 'cryptos',      titre: 'Fiches cryptos', resume: 'Une fiche par actif, avec données live.' },
];

export const GLOSSAIRE = { id: 'glossaire', titre: 'Glossaire', resume: 'Chaque terme, défini en deux phrases.' };

export const TOUTES = [...SECTIONS, GLOSSAIRE];

export const parId = Object.fromEntries(TOUTES.map((s) => [s.id, s]));

export const NIVEAUX = {
  bases: 'Bases',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
};
