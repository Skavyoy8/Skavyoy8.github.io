export const about = {
  index: '01',
  command: 'whoami',
  title: ['Derrière le pseudo,', 'un élève en CIEL.'],
  // Les mots entre [crochets] ressortent en blanc.
  statement: 'Je m’appelle Luke, [Skavyoy] en ligne. J’apprends comment les machines [communiquent], pour mieux les [protéger].',
  paragraphs: [
    'Le CIEL couvre tout ce qui transporte un signal : l’électronique, les réseaux, les systèmes et leur sécurité. C’est exactement ce qui m’attire : comprendre comment une machine parle à une autre, puis comment on la protège.',
    'Je pratique sur TryHackMe depuis Kali, je vis sous Linux au quotidien et je prépare un homelab Proxmox dans un rack 10 pouces. Côté cyber, j’aime le blue team.',
    'Prochaine étape : un BTS SIO option SISR en alternance. Je cherche l’entreprise qui m’accueillera.',
  ],
  githubCta: 'Mon GitHub',
  // Fiche façon neofetch : clé en citron, valeur en blanc.
  card: {
    command: 'neofetch',
    user: 'luke@skavyoy',
    facts: [
      { label: 'OS', value: 'Debian (Linux)' },
      { label: 'Filière', value: 'Bac Pro CIEL' },
      { label: 'Pratique', value: 'TryHackMe · Kali' },
      { label: 'Lab', value: 'Proxmox · rack 8U' },
      { label: 'Objectif', value: 'BTS SIO SISR' },
      { label: 'Pays', value: 'France' },
    ],
    cta: 'Tous mes profils',
  },
} as const
