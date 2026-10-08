export type TimelineStep = {
  when: string
  age?: string
  title: string
  detail: string
  state: 'en cours' | 'visé'
  points: readonly string[]
}

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

export const timelineCopy = {
  index: '05',
  command: 'history',
  title: ['D’où je viens,', 'où je vais.'],
  intro: 'Le bac cette année, puis un BTS en alternance.',
  states: { 'en cours': 'En cours', visé: 'Je cherche une entreprise' },
  cta: 'Me proposer une alternance',
} as const
