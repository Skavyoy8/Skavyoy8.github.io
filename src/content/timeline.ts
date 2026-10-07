export type TimelineStep = {
  when: string
  age?: string
  title: string
  detail: string
  state: 'en cours' | 'visé'
}

export const timeline: readonly TimelineStep[] = [
  {
    when: '2026 – 2027',
    age: '17 ans',
    title: 'Bac Pro CIEL',
    detail: 'Terminale : cybersécurité, informatique et réseaux, électronique.',
    state: 'en cours',
  },
  {
    when: 'À partir de 2027',
    title: 'BTS SIO option SISR',
    detail: 'En alternance : solutions d’infrastructure, systèmes et réseaux.',
    state: 'visé',
  },
]
