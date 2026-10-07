import type { RoomCategory } from './tryhackme'

export type PillarDemo = 'enum' | 'osi' | 'virt' | 'signal'

export type Pillar = {
  index: string
  category: string
  title: string
  text: string
  tags: readonly string[]
  demo: PillarDemo
  link: { label: string; filter?: RoomCategory; href?: string }
}

export const interests = {
  index: '03 / COMPÉTENCES',
  pill: 'compétences',
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
    demo: 'enum',
    link: { label: 'Voir mes challenges', filter: 'challenges' },
  },
  {
    index: '02',
    category: 'Fondamentaux',
    title: 'Réseaux',
    text: 'Comprendre comment les machines communiquent : le modèle OSI couche par couche, les réseaux locaux, la résolution DNS et l’adressage IPv6.',
    tags: ['OSI', 'LAN', 'DNS', 'IPv6'],
    demo: 'osi',
    link: { label: 'Voir mes rooms réseau', filter: 'reseau' },
  },
  {
    index: '03',
    category: 'Systèmes',
    title: 'Linux & systèmes',
    text: 'Linux au quotidien sous Debian, et la virtualisation pour tout tester sans rien casser : VirtualBox aujourd’hui, Proxmox demain sur le homelab.',
    tags: ['Debian', 'VirtualBox', 'Proxmox'],
    demo: 'virt',
    link: { label: 'Voir mes rooms Linux', filter: 'linux' },
  },
  {
    index: '04',
    category: 'Signal',
    title: 'Électronique & signal',
    text: 'Ce qui distingue le CIEL : comprendre le signal sous toutes ses formes, de l’analogique au numérique, avant qu’il ne devienne des données.',
    tags: ['Analogique', 'Numérique', 'Signal'],
    demo: 'signal',
    link: { label: 'Voir le lab', href: '#lab' },
  },
]

/** Mini-interfaces des piliers. */
export const demos = {
  enum: {
    title: 'room anonymous',
    meta: 'méthode',
    steps: [
      { cmd: 'nmap -sV', note: 'cartographier' },
      { cmd: 'ftp anonyme', note: 'entrer' },
      { cmd: 'smbclient -L', note: 'énumérer' },
    ],
    done: 'room terminée',
    axis: ['scan', 'accès', 'partages', 'fin'],
    footer: 'tout commence par l’énumération',
  },
  osi: {
    title: 'modèle osi',
    meta: 'un paquet descend les couches',
    layers: [
      { n: '7', name: 'Application', proto: 'HTTP · DNS' },
      { n: '6', name: 'Présentation', proto: 'TLS' },
      { n: '5', name: 'Session', proto: 'sessions' },
      { n: '4', name: 'Transport', proto: 'TCP · UDP' },
      { n: '3', name: 'Réseau', proto: 'IPv4 · IPv6' },
      { n: '2', name: 'Liaison', proto: 'Ethernet · MAC' },
      { n: '1', name: 'Physique', proto: 'câble · signal' },
    ],
  },
  virt: {
    title: 'virtualisation',
    today: 'aujourd’hui',
    tomorrow: 'demain',
    toggleLabel: 'Comparer aujourd’hui et demain',
    stacks: {
      today: { host: 'PC · Debian', hypervisor: 'VirtualBox', guests: ['VM de test', 'VM de test'] },
      tomorrow: { host: 'MS-01 · 32 Go', hypervisor: 'Proxmox', guests: ['AdGuard', 'Jellyfin', 'Lab cyber', 'Pronote'] },
    },
    host: 'hôte',
    hypervisor: 'hyperviseur',
    footer: 'tout tester sans rien casser',
  },
  signal: {
    title: 'analogique → numérique',
    meta: 'échantillonnage',
    sliderLabel: 'Échantillons par période',
    analog: 'analogique',
    digital: 'numérique',
    footer: (n: number) => `${n} échantillons par période`,
  },
} as const

export const tools = ['Linux (Debian)', 'Kali', 'nmap', 'Proxmox', 'VirtualBox', 'Git / GitHub', 'Obsidian', 'Next.js'] as const
