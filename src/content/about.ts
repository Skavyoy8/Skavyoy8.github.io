export const about = {
  index: '01',
  command: 'whoami',
  title: ['Derrière le pseudo,', 'un élève en CIEL.'],
  // Les mots entre [crochets] ressortent en blanc.
  statement: 'Je m’appelle Luke, [Skavyoy] en ligne. J’apprends comment les machines [communiquent], pour mieux les [protéger].',
  paragraphs: [
    'Je vis sous Linux au quotidien, je pratique sur TryHackMe depuis Kali et je prépare un homelab Proxmox dans un rack 10 pouces. Prochaine étape : un BTS SIO SISR en alternance.',
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
