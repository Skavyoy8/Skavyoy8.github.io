/**
 * Les sections du wiki, dans l'ordre de lecture du §7 de SPEC.md.
 * L'ordre de la barre latérale est l'ordre pédagogique, pas l'ordre
 * de rédaction (les phases de PROGRESS.md, elles, commencent par OKX).
 */
export const SECTIONS = [
  { id: 'commencer', titre: 'Commencer ici', resume: "Les trois pages à lire en premier si tu n'y connais rien." },
  { id: 'fondamentaux', titre: 'Comment ça marche', resume: 'Le hachage, les adresses, le minage, les frais, les confirmations.' },
  { id: 'chaines',      titre: 'Les réseaux',  resume: 'Bitcoin, Ethereum, les stablecoins, et pourquoi il y en a autant.' },
  { id: 'okx',          titre: 'Les plateformes', resume: "Ce qu'une plateforme d'échange fait vraiment de ton argent." },
  { id: 'marches',      titre: 'Les prix',      resume: "D'où vient un prix, et le vocabulaire qu'on lit partout." },
  { id: 'derives',      titre: 'Le levier',     resume: 'Les produits qui multiplient les gains et les pertes.' },
  { id: 'produits',     titre: 'La DeFi',       resume: 'Staking, prêts, échanges sans intermédiaire, NFT.' },
  { id: 'securite',     titre: 'Se protéger',   resume: 'Les arnaques courantes et comment on se fait avoir.' },
  { id: 'fiscalite',    titre: 'Impôts',        resume: 'Ce que dit la loi française, sources officielles à l\'appui.' },
  { id: 'cryptos',      titre: 'Les cryptos',   resume: 'Une fiche par monnaie, avec son cours en direct.' },
];

export const GLOSSAIRE = { id: 'glossaire', titre: 'Glossaire', resume: 'Tous les mots du domaine, définis en deux phrases.' };

export const TOUTES = [...SECTIONS, GLOSSAIRE];

export const parId = Object.fromEntries(TOUTES.map((s) => [s.id, s]));

export const NIVEAUX = {
  bases: 'Bases',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
};
