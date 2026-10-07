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
  pill: 'Disponible pour une alternance · BTS SIO SISR · rentrée 2027',
  // Deux lignes : la seconde en serif italique.
  title: { line: 'Luke, alias Skavyoy.', accent: 'Cyber, réseaux & Linux.' },
  intro:
    'Élève en terminale Bac Pro CIEL, je m’entraîne en cybersécurité sur TryHackMe et je monte mon propre homelab sous Proxmox. Je cherche une entreprise pour mon BTS SIO SISR en alternance.',
  ctaPrimary: { label: 'Voir mes projets', href: '#lab' },
  ctaSecondary: { label: 'Me contacter', href: '#reseaux' },
  meta: 'France / terminale 2026–27 / Debian au quotidien / TryHackMe depuis Kali',
  scrollHint: 'défiler',
  scrollLabel: 'Défiler vers À propos',
  statsLabel: 'TryHackMe',
} as const

/** Carte de présentation du héros : profil + session de terminal. */
export const profileCard = {
  prompt: 'skavyoy@lab:~$',
  status: 'disponible',
  name: 'Luke · Skavyoy',
  role: 'Terminale Bac Pro CIEL · France',
  focus: ['Cybersécurité', 'Réseaux', 'Linux', 'Électronique'],
  session: [
    { cmd: 'whoami', out: 'luke — alias skavyoy, élève en bac pro ciel' },
    { cmd: 'cat objectif.txt', out: 'BTS SIO SISR en alternance · rentrée 2027' },
    { cmd: 'ls ~/projets', out: 'homelab-ms01/  dashboard-pronote/  wiki-crypto/  portfolio/' },
    { cmd: 'tryhackme --derniere-room', out: 'anonymous ✓ — nmap, ftp anonyme, smb' },
  ],
  links: { github: 'GitHub', projects: 'Projets', contact: 'Me contacter' },
} as const

/** Écran de chargement (une fois par session). */
export const preloader = {
  brand: 'Skavyoy · fibre',
  skip: 'clic ou touche pour passer',
  boot: ['init fibre…………… ok', 'montage /dev/lab…… ok', 'calibrage………………… ok', 'session ouverte'],
} as const

/** Plan réseau du homelab, façon éditeur de flux (section Lab). */
export const networkPanel = {
  title: 'homelab-ms01',
  meta: '8U / 10G / LAN',
  status: 'en préparation',
  zoom: '100%',
  nodes: {
    entry: { title: 'Switch MokerLink', sub: 'quel vlan ?' },
    lab: { title: 'Lab cyber', sub: 'isolé, sans internet' },
    home: { title: 'Services maison', sub: 'adguard · jellyfin · immich' },
    host: { title: 'Proxmox · MS-01', sub: 'héberge tout' },
  },
  edges: { lab: 'vlan lab', home: 'vlan maison', host: '10G' },
  logTitle: 'câblage prévu',
} as const

export const toolsStrip = {
  intro: 'mes outils au quotidien, et ceux que j’apprends',
  // Abréviation affichée dans la tuile, dans l'ordre de `tools`.
  abbr: ['LX', 'KL', 'NM', 'PX', 'VB', 'GT', 'OB', 'NX'],
} as const

export const footer = {
  backToTop: 'Retour en haut',
  builtWith: 'Next.js · WebGL · GSAP · Tailwind',
  buildLabel: 'Dernier build',
  timeLabel: 'Paris',
  rights: 'Fait main, sans tracker ni cookie.',
  tagline: 'Cybersécurité, réseaux, Linux et électronique, appris en pratiquant.',
  stack: 'next.js / webgl / gsap / github pages',
  columns: {
    sections: 'sections',
    projects: 'projets',
    links: 'liens',
    site: 'le site',
  },
  linkPage: 'Tous mes liens',
  source: 'Code source',
} as const
