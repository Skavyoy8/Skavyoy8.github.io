import type { RoomCategory } from './tryhackme'

export type PillarMotif = 'shell' | 'graph' | 'trace' | 'wave'

export type Pillar = {
  index: string
  category: string
  title: string
  text: string
  tags: readonly string[]
  motif: PillarMotif
  link: { label: string; filter?: RoomCategory; href?: string }
}

export const interests = {
  index: '02 / CE QUE J’APPRENDS',
  title: { before: 'Ce que', accent: 'j’apprends', after: '.' },
  intro: 'Quatre piliers. Le CIEL ajoute l’électronique aux trois classiques : c’est le signal sous tout le reste.',
}

export const pillars: readonly Pillar[] = [
  {
    index: '01',
    category: 'Sécurité',
    title: 'Cybersécurité & hacking éthique',
    text: 'Je m’entraîne sur TryHackMe depuis Kali : énumération de services avec nmap, FTP et SMB, puis les premières vulnérabilités web comme les IDOR.',
    tags: ['TryHackMe', 'Kali', 'nmap', 'SMB', 'IDOR'],
    motif: 'shell',
    link: { label: 'Voir mes challenges', filter: 'challenges' },
  },
  {
    index: '02',
    category: 'Fondamentaux',
    title: 'Réseaux',
    text: 'Comprendre comment les machines communiquent : le modèle OSI couche par couche, les réseaux locaux, la résolution DNS et l’adressage IPv6.',
    tags: ['OSI', 'LAN', 'DNS', 'IPv6'],
    motif: 'graph',
    link: { label: 'Voir mes rooms réseau', filter: 'reseau' },
  },
  {
    index: '03',
    category: 'Systèmes',
    title: 'Linux & systèmes',
    text: 'Linux au quotidien sous Debian, et la virtualisation pour tout tester sans rien casser : VirtualBox aujourd’hui, Proxmox demain sur le homelab.',
    tags: ['Debian', 'VirtualBox', 'Proxmox'],
    motif: 'trace',
    link: { label: 'Voir mes rooms Linux', filter: 'linux' },
  },
  {
    index: '04',
    category: 'Signal',
    title: 'Électronique & signal',
    text: 'Ce qui distingue le CIEL : comprendre le signal sous toutes ses formes, de l’analogique au numérique, avant qu’il ne devienne des données.',
    tags: ['Analogique', 'Numérique', 'Signal'],
    motif: 'wave',
    link: { label: 'Voir le lab', href: '#lab' },
  },
]

export const tools = ['Linux (Debian)', 'Kali', 'nmap', 'Proxmox', 'VirtualBox', 'Git / GitHub', 'Obsidian', 'Next.js'] as const
