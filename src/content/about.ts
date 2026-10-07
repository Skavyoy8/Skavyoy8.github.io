export const about = {
  index: '01 / À PROPOS',
  pill: 'à propos',
  title: { before: 'Un peu', accent: 'sur moi', after: '.' },
  // Les mots entre [crochets] passent en accent.
  statement:
    'Je m’appelle Luke, [Skavyoy] en ligne. En terminale [Bac Pro CIEL], j’apprends comment les systèmes communiquent pour mieux les [défendre].',
  paragraphs: [
    'Le CIEL couvre tout ce qui transporte un signal : l’électronique, les réseaux, les systèmes et leur sécurité. C’est exactement ce qui m’attire : comprendre comment une machine parle à une autre, puis comment on la protège.',
    'Je pratique sur TryHackMe depuis Kali, je vis sous Linux au quotidien et je prépare un homelab Proxmox dans un rack 10 pouces. Côté cyber, j’aime le blue team.',
    'Prochaine étape : un BTS SIO option SISR en alternance. Je cherche l’entreprise qui m’accueillera.',
  ],
  facts: [
    { label: 'Pays', value: 'France' },
    { label: 'Filière', value: 'Bac Pro CIEL' },
    { label: 'Je pratique sur', value: 'TryHackMe' },
    { label: 'Objectif', value: 'BTS SIO SISR en alternance' },
  ],
  badge: {
    org: 'CIEL / FR',
    title: 'Badge d’accès',
    name: 'SKAVYOY',
    handle: '@Skavyoy8',
    role: 'Bac Pro CIEL',
    status: 'Terminale · 2026–27',
    access: 'Alternance · BTS SIO SISR',
    level: 'ACCÈS LAB',
    qrLabel: 'github.com/Skavyoy8',
    backTitle: 'Infos rapides',
    backLines: [
      ['Pays', 'France'],
      ['Filière', 'Bac Pro CIEL'],
      ['Plateforme', 'TryHackMe'],
      ['Système', 'Linux · Debian'],
      ['Lab', 'Proxmox · rack 10"'],
      ['Objectif', 'BTS SIO SISR'],
    ],
    flip: 'Retourner le badge',
    hint: 'Clique : il se retourne',
    strap: 'SKAVYOY · CIEL / FR · ACCÈS LAB · ',
  },
  who: {
    title: 'Le signal sous tout le reste',
    caption: 'électronique / réseaux / systèmes / sécurité',
    hub: [
      { abbr: 'CI', label: 'ciel' },
      { abbr: 'TH', label: 'tryhackme' },
      { abbr: 'LX', label: 'linux' },
      { abbr: 'LB', label: 'homelab' },
    ],
  },
  badgeCard: { title: 'Badge d’accès', text: 'Recto : l’identité. Verso : les infos rapides.' },
  next: { label: 'prochaine étape', cta: 'Me proposer une alternance' },
} as const
