export const about = {
  index: '01 / À PROPOS',
  title: 'Un peu sur moi.',
  // Trois lignes courtes, le pseudo en gras.
  statement: ['Moi, c’est Luke, [Skavyoy] en ligne.', 'Terminale Bac Pro CIEL, en France.', 'J’apprends la cybersécurité.'],
  paragraphs: [
    'Le CIEL couvre tout ce qui transporte un signal : l’électronique, les réseaux, les systèmes et leur sécurité. C’est exactement ce qui m’attire : comprendre comment une machine parle à une autre, puis comment on la protège.',
    'Je pratique sur TryHackMe depuis Kali, je vis sous Linux au quotidien et je prépare un homelab Proxmox dans un rack 10 pouces. Côté cyber, j’aime le blue team.',
    'Prochaine étape : un BTS SIO option SISR en alternance. Je cherche l’entreprise qui m’accueillera.',
  ],
  githubCta: 'Mon GitHub',
  card: {
    title: 'skavyoy.',
    subtitle: 'Profil personnel',
    facts: [
      { label: 'Pays', value: 'France' },
      { label: 'Filière', value: 'Bac Pro CIEL' },
      { label: 'Système', value: 'Linux · Debian' },
      { label: 'Je pratique sur', value: 'TryHackMe' },
      { label: 'Objectif', value: 'BTS SIO SISR' },
    ],
    cta: 'Tous mes profils',
  },
} as const
