export const sections = [
  { id: 'accueil', index: '00', label: 'Accueil', preview: 'Qui je suis, en dix secondes.' },
  { id: 'a-propos', index: '01', label: 'À propos', preview: 'Mon histoire, mon badge d’accès.' },
  { id: 'lab', index: '02', label: 'Projets', preview: 'Le homelab en 3D et ce que je construis.' },
  { id: 'interets', index: '03', label: 'Compétences', preview: 'Quatre piliers, du signal au shell.' },
  { id: 'parcours', index: '04', label: 'Parcours', preview: 'Ma terminale, TryHackMe, la suite.' },
  { id: 'rooms', index: '05', label: 'Rooms', preview: 'Les rooms TryHackMe terminées.' },
  { id: 'badges', index: '06', label: 'Badges', preview: 'Les petites étapes.' },
  { id: 'reseaux', index: '07', label: 'Contact', preview: 'On se parle ?' },
] as const

/** Liens visibles au centre de la barre (desktop). */
export const navLinks = [
  { id: 'a-propos', label: 'À propos' },
  { id: 'lab', label: 'Projets' },
  { id: 'interets', label: 'Compétences' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'reseaux', label: 'Contact' },
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
  status: 'recherche une alternance',
  cta: 'Me contacter',
} as const
