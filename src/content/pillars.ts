export type SkillVisual = 'ports' | 'osi' | 'shell' | 'scope'

export type Pillar = {
  index: string
  category: string
  title: string
  text: string
  tags: readonly string[]
  visual: SkillVisual
  status: string
}

export const interests = {
  index: '02',
  command: 'ls ~/competences',
  title: ['Ce que je travaille,', 'en cours et chez moi.'] as const,
  intro: 'Quatre sujets, du câble au shell. Le CIEL ajoute l’électronique aux trois classiques.',
}

export const pillars: readonly Pillar[] = [
  {
    index: '01',
    category: 'Sécurité',
    title: 'Cybersécurité',
    text: 'Je m’entraîne sur TryHackMe depuis Kali : énumération de services avec nmap, FTP et SMB, puis les premières failles web comme les IDOR.',
    tags: ['TryHackMe', 'Kali', 'nmap', 'SMB'],
    visual: 'ports',
    status: 'En pratique',
  },
  {
    index: '02',
    category: 'Fondamentaux',
    title: 'Réseaux',
    text: 'Comprendre comment les machines communiquent : le modèle OSI couche par couche, les réseaux locaux, le DNS et l’adressage IPv6.',
    tags: ['OSI', 'LAN', 'DNS', 'IPv6'],
    visual: 'osi',
    status: 'En cours',
  },
  {
    index: '03',
    category: 'Systèmes',
    title: 'Linux & virtualisation',
    text: 'Linux au quotidien sous Debian, et la virtualisation pour tout tester sans rien casser : VirtualBox aujourd’hui, Proxmox demain.',
    tags: ['Debian', 'VirtualBox', 'Proxmox'],
    visual: 'shell',
    status: 'Au quotidien',
  },
  {
    index: '04',
    category: 'Signal',
    title: 'Électronique',
    text: 'Ce qui distingue le CIEL : comprendre le signal, de l’analogique au numérique, avant qu’il ne devienne des données.',
    tags: ['Analogique', 'Numérique', 'Signal'],
    visual: 'scope',
    status: 'En cours',
  },
]

/** Textes des mini-illustrations. */
export const visuals = {
  ports: 'scan des ports',
  osi: ['Application', 'Présentation', 'Session', 'Transport', 'Réseau', 'Liaison', 'Physique'],
  shell: [
    { cmd: 'whoami', out: 'luke' },
    { cmd: 'sudo apt update', out: 'Tous les paquets sont à jour.' },
    { cmd: 'qm list', out: 'les VM du lab, bientôt' },
  ],
  scope: { analog: 'analogique', digital: 'numérique' },
} as const
