export const sections = [
  { id: 'accueil', index: '00', label: 'Accueil', preview: 'Qui je suis, en dix secondes.' },
  { id: 'a-propos', index: '01', label: 'À propos', preview: 'Le badge d’accès, et pourquoi le CIEL.' },
  { id: 'interets', index: '02', label: 'Ce que j’apprends', preview: 'Quatre piliers, du signal au shell.' },
  { id: 'lab', index: '03', label: 'Lab', preview: 'Le homelab MS-01 et les projets.' },
  { id: 'parcours', index: '04', label: 'Parcours', preview: 'TryHackMe et la suite des études.' },
  { id: 'rooms', index: '05', label: 'Rooms', preview: 'Les rooms TryHackMe terminées.' },
  { id: 'badges', index: '06', label: 'Badges', preview: 'Les petites étapes.' },
  { id: 'reseaux', index: '07', label: 'Contact', preview: 'On se parle ?' },
] as const

export type SectionId = (typeof sections)[number]['id']

export const navCopy = {
  skip: 'Aller au contenu',
  menu: 'Menu',
  close: 'Fermer',
  terminalHint: '⌘K',
  terminalLabel: 'Ouvrir le terminal',
  calmOn: 'Mode calme activé',
  calmOff: 'Mode calme',
  calmLabel: 'Mode calme : coupe la 3D et les animations lourdes',
  progressLabel: 'Progression de lecture',
} as const
