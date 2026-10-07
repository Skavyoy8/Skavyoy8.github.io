export const sections = [
  { id: 'accueil', index: '00', label: 'Accueil' },
  { id: 'a-propos', index: '01', label: 'À propos' },
  { id: 'interets', index: '02', label: 'Compétences' },
  { id: 'homelab', index: '03', label: 'Homelab' },
  { id: 'lab', index: '04', label: 'Projets' },
  { id: 'parcours', index: '05', label: 'Parcours' },
  { id: 'pratique', index: '06', label: 'TryHackMe' },
  { id: 'reseaux', index: '07', label: 'Contact' },
] as const

/** Liens visibles dans la barre (ordinateur). */
export const navLinks = [
  { id: 'a-propos', label: 'À propos' },
  { id: 'interets', label: 'Compétences' },
  { id: 'homelab', label: 'Homelab' },
  { id: 'lab', label: 'Projets' },
  { id: 'parcours', label: 'Parcours' },
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
  calmLabel: 'Mode calme : fige le fond et coupe les animations',
  cta: 'Me contacter',
} as const
