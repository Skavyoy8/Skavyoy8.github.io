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

export const parcoursCopy = {
  index: '04 / MON PARCOURS',
  pill: 'parcours',
  title: { before: 'Mon', accent: 'parcours', after: '.' },
  consoleTitle: 'tryhackme --profil',
  intro: 'Des rooms pour apprendre, des challenges pour pratiquer. Le relevé est daté : il vieillit honnêtement.',
  labels: {
    rooms: 'Rooms terminées',
    badges: 'Badges',
    top: 'Classement global',
    rank: 'Rang',
    snapshot: 'Relevé le',
    profile: 'Profil public TryHackMe',
    username: 'Utilisateur',
  },
  timelineTitle: 'La suite',
  dashboard: {
    year: 'l’année de terminale, semaine par semaine',
    week: (n: number, total: number) => `semaine ${n} sur ${total}`,
    soon: 'avant la rentrée',
    gauge: 'de la terminale déjà passée',
    profile: 'tryhackme --profil',
    lastRoom: 'dernière room',
    roomsLink: 'Toutes les rooms',
    status: 'statut',
    statusValue: 'recherche une alternance',
    statusDetail: 'BTS SIO SISR · dès 2027',
    statusCta: 'On se parle ?',
  },
  months: ['sept', 'oct', 'nov', 'déc', 'janv', 'févr', 'mars', 'avr', 'mai', 'juin'],
}

export const roomsCopy = {
  index: '05 / LA PRATIQUE',
  pill: 'la pratique',
  title: { before: 'Mes', accent: 'rooms', after: '.' },
  intro: 'Les rooms terminées sur TryHackMe, avec ce que chacune m’a appris.',
  all: 'Tout',
  searchLabel: 'Chercher une room',
  searchPlaceholder: 'nmap, SMB, DNS…',
  sortLabel: 'Trier par',
  sortDate: 'Date',
  sortDifficulty: 'Difficulté',
  shown: (n: number) => (n > 1 ? 'rooms affichées' : 'room affichée'),
  emptyTitle: 'Aucune room ici… pour l’instant.',
  emptyText: 'Essaie un autre filtre ou une autre recherche.',
  emptyReset: 'Tout afficher',
  learnedLabel: 'Ce que j’ai appris',
  open: 'Voir la room',
  todoRooms: 'D’autres rooms arrivent',
}

export const badgesCopy = {
  index: '06 / LES BADGES',
  pill: 'les badges',
  title: { before: 'Petites', accent: 'étapes', after: '.' },
  intro: 'Chaque badge TryHackMe marque une étape franchie.',
  slot: 'Emplacement libre',
  link: 'Voir mes badges sur TryHackMe',
}
