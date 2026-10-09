export const site = {
  name: 'Skavyoy',
  firstName: 'Luke',
  url: 'https://skavyoy8.github.io',
  title: 'Skavyoy — cybersécurité, réseaux & Linux',
  description:
    'Portfolio de Luke, alias Skavyoy, élève en Bac Pro CIEL : cybersécurité, réseaux, Linux et électronique. À la recherche d’une alternance en BTS SIO SISR.',
  tagline: 'Élève en Bac Pro CIEL. Cybersécurité, réseaux, Linux et électronique : j’apprends en pratiquant.',
  location: 'France',
  status: 'En apprentissage',
  seeking: 'Recherche une alternance · BTS SIO SISR',
  github: { user: 'Skavyoy8', url: 'https://github.com/Skavyoy8' },
  repoUrl: 'https://github.com/Skavyoy8/Skavyoy8.github.io',
  avatar: '/images/avatar.jpg',
  ogImage: '/og.png',
  themeColor: '#050506',
  keywords: ['Skavyoy', 'Bac Pro CIEL', 'cybersécurité', 'réseaux', 'Linux', 'homelab', 'Proxmox', 'TryHackMe', 'alternance', 'BTS SIO SISR'],
} as const

export const hero = {
  // Le h1 affiche le pseudo ; les lecteurs d'écran entendent aussi le prénom.
  name: 'skavyoy',
  srName: 'Luke, alias Skavyoy',
  lead: 'Moi, c’est Luke.',
  intro: 'Élève en Bac Pro CIEL. Je m’entraîne en cybersécurité, je monte mon homelab et je cherche une alternance en BTS SIO SISR.',
  ctaPrimary: { label: 'Voir mes projets', href: '#lab' },
  ctaSecondary: { label: 'Me contacter', href: '#reseaux' },
  photo: {
    alt: 'Photo de profil de Luke, alias Skavyoy',
    user: 'luke@skavyoy',
    meta: 'Bac Pro CIEL · France',
  },
} as const

export const footer = {
  tagline: 'Cybersécurité, réseaux, Linux et électronique, appris en pratiquant.',
  rights: 'Fait main, sans tracker ni cookie.',
  linkPage: 'Tous mes liens',
  source: 'Code source',
  backToTop: 'Retour en haut',
} as const
