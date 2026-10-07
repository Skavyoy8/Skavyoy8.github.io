import { site } from './site'
import { type Fillable, TODO } from './types'

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
  status: Fillable<ProjectStatus>
  stack: readonly string[]
  href?: Fillable<string>
  /** Une page /lab/<slug>/ existe. */
  detail?: boolean
  private?: boolean
}

export const labCopy = {
  index: '03 / LE LAB',
  title: { before: 'Le', accent: 'lab', after: '.' },
  intro: 'Ce que je construis pour apprendre en vrai. Le projet phare : un homelab dans un rack 10 pouces, qui sort du papier en ce moment.',
  projectsTitle: 'Projets',
  reposTitle: 'Sur GitHub',
  reposIntro: 'Mes repos publics, récupérés automatiquement à chaque build.',
  open: 'Ouvrir',
  details: 'Lire le détail',
  source: 'Code',
  demo: 'Démo',
  privateLabel: 'Privé',
  back: 'Retour au lab',
  updated: 'Mis à jour le',
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
    slug: 'dual-boot-cachyos',
    title: 'Dual boot CachyOS',
    summary: 'Linux (CachyOS, une Arch optimisée) installé à côté de Windows sur le PC gaming.',
    status: TODO('[À REMPLIR] statut du dual boot CachyOS'),
    stack: ['CachyOS', 'Arch Linux', 'GRUB'],
  },
  {
    slug: 'wiki-crypto',
    title: 'Wiki crypto en français',
    summary: 'Un wiki en français pour expliquer les cryptomonnaies simplement, sans jargon ni promesses.',
    status: TODO('[À REMPLIR] statut du wiki crypto'),
    stack: ['Cryptomonnaies', 'Wiki'],
    href: TODO('[À REMPLIR] lien du wiki crypto'),
  },
  {
    slug: 'portfolio',
    title: 'Ce portfolio',
    summary:
      'Next.js en export statique, scène WebGL temps réel en React Three Fiber, chorégraphie au scroll avec GSAP. Déployé sur GitHub Pages à chaque push.',
    status: 'en-cours',
    stack: ['Next.js', 'React Three Fiber', 'GSAP', 'Tailwind CSS'],
    href: site.repoUrl,
    detail: true,
  },
]

export const githubRepos = {
  user: site.github.user,
  // Ce portfolio est déjà présenté ; skavyoy-cyber ne contient qu'un README.
  exclude: ['Skavyoy8.github.io', 'skavyoy-cyber'],
  max: 6,
}
