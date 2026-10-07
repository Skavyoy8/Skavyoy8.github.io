export const site = {
  name: 'Skavyoy',
  firstName: 'Luke',
  url: 'https://skavyoy8.github.io',
  title: 'Skavyoy — élève en Bac Pro CIEL',
  description:
    'Portfolio de Skavyoy, élève en Bac Pro CIEL : cybersécurité, réseaux, Linux et électronique. À la recherche d’une alternance en BTS SIO SISR.',
  tagline: 'Élève en Bac Pro CIEL. Cybersécurité, réseaux, Linux et électronique : j’apprends en pratiquant.',
  location: 'France',
  timezone: 'Europe/Paris',
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
  eyebrow: 'Portfolio · CIEL / FR',
  ctaPrimary: { label: 'Mon parcours', href: '#parcours' },
  ctaSecondary: { label: 'On se parle ?', href: '#reseaux' },
  scrollHint: 'Défiler',
  statsLabel: 'TryHackMe',
} as const

export const footer = {
  backToTop: 'Retour en haut',
  builtWith: 'Next.js · React Three Fiber · GSAP · Tailwind',
  buildLabel: 'Dernier build',
  timeLabel: 'Paris',
  rights: 'Fait main, sans tracker ni cookie.',
} as const
