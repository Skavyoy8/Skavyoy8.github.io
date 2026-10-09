export type SkillVisual = 'ports' | 'osi' | 'shell' | 'scope'

export type Pillar = {
  index: string
  category: string
  title: string
  text: string
  visual: SkillVisual
  status: string
}

export const interests = {
  index: '02',
  command: 'ls ~/competences',
  title: ['Ce que je travaille,', 'en cours et chez moi.'] as const,
}

export const pillars: readonly Pillar[] = [
  {
    index: '01',
    category: 'Sécurité',
    title: 'Cybersécurité',
    text: 'Sur TryHackMe depuis Kali : énumération avec nmap, FTP et SMB, premiers CTF.',
    visual: 'ports',
    status: 'En pratique',
  },
  {
    index: '02',
    category: 'Fondamentaux',
    title: 'Réseaux',
    text: 'Comment les machines communiquent : modèle OSI, réseaux locaux, DNS, IPv6.',
    visual: 'osi',
    status: 'En cours',
  },
  {
    index: '03',
    category: 'Systèmes',
    title: 'Linux & virtualisation',
    text: 'Debian au quotidien, et des VM pour tout tester sans rien casser : VirtualBox, puis Proxmox.',
    visual: 'shell',
    status: 'Au quotidien',
  },
  {
    index: '04',
    category: 'Signal',
    title: 'Électronique',
    text: 'Ce qui distingue le CIEL : le signal, de l’analogique au numérique.',
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
    { cmd: 'sudo apt update', out: 'Tout est à jour.' },
    { cmd: 'qm list', out: 'les VM du lab, bientôt' },
  ],
  scope: { analog: 'analogique', digital: 'numérique' },
} as const
