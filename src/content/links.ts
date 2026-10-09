import { site } from './site'

export type SocialId = 'github' | 'tryhackme' | 'discord' | 'instagram' | 'tiktok' | 'steam'

export type SocialLink = {
  id: SocialId
  label: string
  handle: string
  /** Pas de lien pour Discord : le pseudo se copie au clic. */
  href?: string
}

// Steam : l'identifiant du profil = code ami + 76561197960265728.
export const socials: readonly SocialLink[] = [
  { id: 'github', label: 'GitHub', handle: site.github.user, href: site.github.url },
  { id: 'tryhackme', label: 'TryHackMe', handle: 'skavyoy8', href: 'https://tryhackme.com/p/skavyoy8' },
  { id: 'discord', label: 'Discord', handle: 'skavyoy_' },
  { id: 'instagram', label: 'Instagram', handle: 'luke_albt', href: 'https://www.instagram.com/luke_albt/' },
  { id: 'tiktok', label: 'TikTok', handle: 'luke_abt', href: 'https://www.tiktok.com/@luke_abt' },
  { id: 'steam', label: 'Steam', handle: 'Skavyoy · code ami 1161545108', href: 'https://steamcommunity.com/profiles/76561199121810836' },
]

/** Le pseudo Discord, copié par le grand bouton du contact. */
export const discord = 'skavyoy_'

export const contactCopy = {
  index: '07',
  command: 'ping skavyoy',
  title: ['Parlons alternance,', 'ou juste de cyber.'] as const,
  intro: 'Je cherche une entreprise pour mon BTS SIO SISR, dès la rentrée 2027. Le plus simple pour me joindre : Discord.',
  pong: '64 octets de skavyoy : prêt à discuter',
  socialsTitle: 'Me retrouver',
  cta: 'Écris-moi sur Discord',
  ctaHint: (handle: string) => `Copie mon pseudo : ${handle}`,
  copied: 'Copié dans le presse-papiers',
  copyHandle: 'Copier le pseudo',
}

export const linkPage = {
  title: 'Liens',
  intro: 'Tous mes liens au même endroit.',
  home: 'Voir le portfolio',
}
