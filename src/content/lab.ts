import { site } from './site'

export type ProjectStatus = 'en-projet' | 'en-cours' | 'termine'

export const statusLabel: Record<ProjectStatus, string> = {
  'en-projet': 'En projet',
  'en-cours': 'En cours',
  termine: 'Terminé',
}

export type Project = {
  slug: string
  title: string
  summary: string
  status: ProjectStatus
  stack: readonly string[]
  href?: string
  /** Une page /lab/<slug>/ existe. */
  detail?: boolean
  private?: boolean
}

export const labCopy = {
  index: '04',
  command: 'ls ~/projets',
  title: ['Ce que je construis,', 'du rack au code.'] as const,
  intro: 'Des projets pour apprendre en vrai, pas juste en théorie.',
  githubCta: 'Tous mes repos sur GitHub',
  details: 'Lire le détail',
  source: 'Code',
  demo: 'Démo',
  privateLabel: 'Privé',
  back: 'Retour aux projets',
}

export const projects: readonly Project[] = [
  {
    slug: 'homelab',
    title: 'Homelab MS-01',
    summary:
      'Un rack 10 pouces de 8U autour d’un Minisforum MS-01 sous Proxmox, relié en 10G. Services maison et labs cyber isolés, accessible uniquement en LAN.',
    status: 'en-projet',
    stack: ['Proxmox', 'LXC', 'Docker', 'SFP+ 10G', 'VLAN'],
    detail: true,
  },
  {
    slug: 'dashboard-pronote',
    title: 'Dashboard Pronote',
    summary:
      'Un tableau de bord perso relié à l’ENT et à Pronote : notes, devoirs et fiches de révision au même endroit. Il tournera sur le homelab.',
    status: 'en-projet',
    stack: ['ENT', 'Pronote', 'Homelab'],
    detail: true,
    private: true,
  },
  {
    slug: 'portfolio',
    title: 'Ce portfolio',
    summary:
      'Next.js en export statique, un fond animé en canvas 2D et des animations en CSS. Léger, rapide, déployé sur GitHub Pages à chaque push.',
    status: 'en-cours',
    stack: ['Next.js', 'TypeScript', 'Canvas 2D', 'Tailwind CSS'],
    href: site.repoUrl,
    detail: true,
  },
]
