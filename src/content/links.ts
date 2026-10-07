import { site } from './site'
import { type Fillable, TODO } from './types'

export type SocialId = 'github' | 'tryhackme' | 'discord' | 'linkedin' | 'instagram' | 'tiktok'

export type SocialLink = {
  id: SocialId
  label: string
  /** Deux ou trois lettres pour les petites tuiles. */
  short: string
  handle: Fillable<string>
  href: Fillable<string>
  /** Le handle se copie au clic (Discord). */
  copy?: boolean
}

export const socials: readonly SocialLink[] = [
  { id: 'github', label: 'GitHub', short: 'gh', handle: site.github.user, href: site.github.url },
  {
    id: 'tryhackme',
    label: 'TryHackMe',
    short: 'thm',
    handle: TODO('[À REMPLIR] pseudo TryHackMe'),
    href: TODO('[À REMPLIR] URL du profil TryHackMe'),
  },
  {
    id: 'discord',
    label: 'Discord',
    short: 'dc',
    handle: TODO('[À REMPLIR] pseudo Discord'),
    href: TODO('[À REMPLIR] lien https://discord.com/users/<ID numérique>'),
    copy: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    short: 'in',
    handle: TODO('[À REMPLIR] nom LinkedIn'),
    href: TODO('[À REMPLIR] URL LinkedIn'),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    short: 'ig',
    handle: TODO('[À REMPLIR] pseudo Instagram'),
    href: TODO('[À REMPLIR] URL Instagram'),
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    short: 'tt',
    handle: TODO('[À REMPLIR] pseudo TikTok'),
    href: TODO('[À REMPLIR] URL TikTok'),
  },
]

/**
 * Email jamais en clair dans le HTML ni dans le JS.
 * Pour le remplir : node scripts/encode-email.mjs prenom@exemple.fr
 * puis colle la valeur obtenue ici : email: { encoded: '…' }
 */
export const email: Fillable<{ encoded: string }> = TODO('[À REMPLIR] adresse email publique (de préférence dédiée)')

/** Fichier attendu : public/cv.pdf, puis remplacer par '/cv.pdf'. */
export const cv: Fillable<string> = TODO('[À REMPLIR] CV en PDF (public/cv.pdf)')

export const contactCopy = {
  index: '07 / ME RETROUVER',
  title: 'Mes profils.',
  handle: '@Skavyoy8',
  intro: 'Pour suivre mon parcours, ou me proposer une alternance.',
  kicker: 'Une alternance à proposer ?',
  cta: 'Écris-moi',
  ctaNote: 'BTS SIO SISR · dès la rentrée 2027',
  emailLabel: 'Email',
  emailReveal: 'Afficher l’email',
  copied: 'Copié dans le presse-papiers',
  copyHandle: 'Copier le pseudo',
  cvLabel: 'Télécharger mon CV',
  missing: 'Bientôt disponible',
}

export const linkPage = {
  title: 'Liens',
  intro: 'Tous mes liens au même endroit.',
  home: 'Voir le portfolio',
}
