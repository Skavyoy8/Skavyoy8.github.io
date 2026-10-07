export type TimelineStep = {
  when: string
  age?: string
  title: string
  detail: string
  state: 'en cours' | 'visé'
  points: readonly string[]
}

/** Calendrier scolaire officiel 2026-2027 : rentrée des élèves, début des vacances d'été. */
export const schoolYear = { start: '2026-09-01', end: '2027-07-03' } as const

export const timeline: readonly TimelineStep[] = [
  {
    when: '2026 – 2027',
    age: '17 ans',
    title: 'Bac Pro CIEL',
    detail: 'Terminale : cybersécurité, informatique et réseaux, électronique.',
    state: 'en cours',
    points: ['Cybersécurité', 'Informatique et réseaux', 'Électronique'],
  },
  {
    when: 'À partir de 2027',
    title: 'BTS SIO option SISR',
    detail: 'En alternance : solutions d’infrastructure, systèmes et réseaux.',
    state: 'visé',
    points: ['Solutions d’infrastructure', 'Systèmes et réseaux', 'En alternance, dès 2027'],
  },
]

/** Curseur « glisse dans le temps » : une position par année scolaire. */
export const timelineSlider = {
  kicker: 'glisse dans le temps',
  question: 'Où j’en serai ?',
  label: 'Année scolaire',
  current: 'cette année',
  stops: [
    { year: '2026–27', step: 0, note: 'terminale' },
    { year: '2027–28', step: 1, note: '1re année, en alternance' },
    { year: '2028–29', step: 1, note: '2e année, en alternance' },
  ],
  cta: 'Me proposer une alternance',
  badges: { 'en cours': 'en cours', visé: 'je cherche une entreprise' },
} as const
