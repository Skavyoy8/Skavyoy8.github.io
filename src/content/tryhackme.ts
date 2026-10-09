export type RoomCategory = 'reseau' | 'web' | 'challenges' | 'bases' | 'linux'
export type Difficulty = 'info' | 'easy' | 'medium' | 'hard' | 'insane'

export const roomCategories: readonly { id: RoomCategory; label: string }[] = [
  { id: 'reseau', label: 'Réseau' },
  { id: 'web', label: 'Web' },
  { id: 'challenges', label: 'Challenges / CTF' },
  { id: 'bases', label: 'Bases cyber' },
  { id: 'linux', label: 'Linux' },
]

export type Room = {
  slug: string
  name: string
  category: RoomCategory
  /** Une phrase sur la room (rédigée par Claude : Luke peut la réécrire avec ses mots). */
  learned: string
  url: string
}

// Relevé fait sur le profil public le 2026-10-09 (capture envoyée par Luke).
export const tryhackme = {
  username: 'skavyoy8',
  profileUrl: 'https://tryhackme.com/p/skavyoy8',
  stats: {
    rooms: 7,
    badges: 1,
    topPercent: 35,
    rank: '0x3 · Pathfinder',
    snapshotDate: '2026-10-09',
  },
  // 5 des 7 rooms terminées.
  rooms: [
    {
      slug: 'picklerick',
      name: 'Pickle Rick',
      category: 'challenges',
      learned: 'Un CTF sur le thème de Rick et Morty : fouiller un serveur web pour retrouver trois ingrédients.',
      url: 'https://tryhackme.com/room/picklerick',
    },
    {
      slug: 'anonymous',
      name: 'Anonymous',
      category: 'challenges',
      learned: 'Cartographier la machine avec nmap, entrer en FTP anonyme et énumérer les partages SMB : tout commence par l’énumération.',
      url: 'https://tryhackme.com/room/anonymous',
    },
    {
      slug: 'whatisnetworking',
      name: 'What is Networking?',
      category: 'reseau',
      learned: 'Les bases : ce qu’est un réseau, les adresses IP et MAC, et le ping.',
      url: 'https://tryhackme.com/room/whatisnetworking',
    },
    {
      slug: 'introtolan',
      name: 'Intro to LAN',
      category: 'reseau',
      learned: 'Les réseaux locaux : topologies, sous-réseaux, ARP et DHCP.',
      url: 'https://tryhackme.com/room/introtolan',
    },
    {
      slug: 'osimodelzi',
      name: 'OSI Model',
      category: 'reseau',
      learned: 'Les sept couches du modèle OSI et le rôle de chacune.',
      url: 'https://tryhackme.com/room/osimodelzi',
    },
  ] as readonly Room[],
}

export const practiceCopy = {
  index: '06',
  command: 'tryhackme --profil',
  title: ['Sur le terrain,', 'room après room.'] as const,
  flag: 'THM{on_apprend_en_pratiquant}',
  labels: {
    rooms: 'Rooms terminées',
    badges: 'Badge',
    top: 'Classement',
    rank: 'Rang',
    snapshot: 'Relevé le',
  },
  profileLink: 'Voir mon profil TryHackMe',
  roomsTitle: 'Dernières rooms',
  open: 'Voir la room',
}
