import { type Fillable, TODO } from './types'

export type RoomCategory = 'reseau' | 'web' | 'challenges' | 'bases' | 'linux'
export type Difficulty = 'info' | 'easy' | 'medium' | 'hard' | 'insane'

export const roomCategories: readonly { id: RoomCategory; label: string }[] = [
  { id: 'reseau', label: 'Réseau' },
  { id: 'web', label: 'Web' },
  { id: 'challenges', label: 'Challenges / CTF' },
  { id: 'bases', label: 'Bases cyber' },
  { id: 'linux', label: 'Linux' },
]

export const difficulties: readonly { id: Difficulty; label: string; rank: number }[] = [
  { id: 'info', label: 'Info', rank: 0 },
  { id: 'easy', label: 'Easy', rank: 1 },
  { id: 'medium', label: 'Medium', rank: 2 },
  { id: 'hard', label: 'Hard', rank: 3 },
  { id: 'insane', label: 'Insane', rank: 4 },
]

export type Room = {
  slug: string
  name: string
  category: RoomCategory
  difficulty: Fillable<Difficulty>
  /** Date ISO (AAAA-MM-JJ) de fin de la room. */
  date: Fillable<string>
  /** Rédigé par Claude au kickoff : Luke le réécrira avec ses mots. */
  learned: string
  url: string
}

export type Badge = { name: string; description: string; date?: string }

export const tryhackme = {
  username: TODO('[À REMPLIR] pseudo TryHackMe') as Fillable<string>,
  profileUrl: TODO('[À REMPLIR] URL du profil public TryHackMe') as Fillable<string>,
  stats: {
    rooms: TODO('[À REMPLIR] nombre de rooms terminées') as Fillable<number>,
    badges: TODO('[À REMPLIR] nombre de badges') as Fillable<number>,
    topPercent: TODO('[À REMPLIR] classement global (top %)') as Fillable<number>,
    rank: TODO('[À REMPLIR] rang / titre TryHackMe') as Fillable<string>,
    snapshotDate: TODO('[À REMPLIR] date du relevé (AAAA-MM-JJ)') as Fillable<string>,
  },
  rooms: [
    {
      slug: 'anonymous',
      name: 'Anonymous',
      category: 'challenges',
      difficulty: TODO('[À REMPLIR] difficulté de la room Anonymous'),
      date: TODO('[À REMPLIR] date de fin de la room Anonymous'),
      learned:
        'Cartographier la machine avec nmap, entrer en FTP anonyme et énumérer les partages SMB : tout commence par l’énumération.',
      url: 'https://tryhackme.com/room/anonymous',
    },
  ] as readonly Room[],
  roomsTodo: TODO('[À REMPLIR] autres rooms terminées (nom, catégorie, difficulté, date, ce que j’ai appris)'),
  badges: [] as readonly Badge[],
  badgesTodo: TODO('[À REMPLIR] badges obtenus (nom + description)'),
}

export const practiceCopy = {
  index: '06 / LA PRATIQUE',
  title: 'TryHackMe.',
  intro: 'Des rooms pour apprendre, des challenges pour pratiquer.',
  profile: 'Mon profil',
  profileLink: 'Profil public',
  labels: {
    rooms: 'Rooms terminées',
    badges: 'Badges obtenus',
    top: 'Classement global',
    snapshot: 'Relevé le',
  },
  roomsTitle: 'Mes rooms',
  learnedLabel: 'Ce que j’ai appris',
  open: 'Voir la room',
  done: 'Terminée',
  todoRooms: 'D’autres rooms arrivent',
  badgesTitle: 'Mes badges',
  badgeSlot: 'Emplacement libre',
}
