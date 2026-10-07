export type SkillVisual = 'radar' | 'network' | 'layers' | 'wave'

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
  index: '02 / COMPÉTENCES',
  title: 'Ce que j’apprends.',
  intro: 'Quatre sujets que je travaille, en cours et sur mon temps libre.',
  toolsTitle: 'Mes outils',
}

export const pillars: readonly Pillar[] = [
  {
    index: '01',
    category: 'Sécurité',
    title: 'Cybersécurité',
    text: 'Je m’entraîne sur TryHackMe depuis Kali : énumération de services avec nmap, FTP et SMB, puis les premières failles web comme les IDOR.',
    tags: ['TryHackMe', 'Kali', 'nmap', 'SMB'],
    visual: 'radar',
    status: 'En pratique',
  },
  {
    index: '02',
    category: 'Fondamentaux',
    title: 'Réseaux',
    text: 'Comprendre comment les machines communiquent : le modèle OSI couche par couche, les réseaux locaux, le DNS et l’adressage IPv6.',
    tags: ['OSI', 'LAN', 'DNS', 'IPv6'],
    visual: 'network',
    status: 'En cours',
  },
  {
    index: '03',
    category: 'Systèmes',
    title: 'Linux & virtualisation',
    text: 'Linux au quotidien sous Debian, et la virtualisation pour tout tester sans rien casser : VirtualBox aujourd’hui, Proxmox demain.',
    tags: ['Debian', 'VirtualBox', 'Proxmox'],
    visual: 'layers',
    status: 'Au quotidien',
  },
  {
    index: '04',
    category: 'Signal',
    title: 'Électronique',
    text: 'Ce qui distingue le CIEL : comprendre le signal, de l’analogique au numérique, avant qu’il ne devienne des données.',
    tags: ['Analogique', 'Numérique', 'Signal'],
    visual: 'wave',
    status: 'En cours',
  },
]

export const tools = ['Linux (Debian)', 'Kali', 'nmap', 'Proxmox', 'VirtualBox', 'Git / GitHub', 'Obsidian', 'Next.js'] as const
