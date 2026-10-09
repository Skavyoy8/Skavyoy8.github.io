// Source : document « Projet homelab MS-01 » de Luke (config retenue, plan du rack, services).

export type RackUnitKind = 'router' | 'screen' | 'patch' | 'switch' | 'server' | 'reserve' | 'vent' | 'blank'

export type RackUnit = {
  id: RackUnitKind
  name: string
  detail: string
  /** Hauteur en U (1U = 44,45 mm). 0 = posé sur le rack. */
  heightU: number
  phase: 1 | 2
}

export const homelab = {
  name: 'Homelab MS-01',
  section: {
    index: '03',
    command: 'cat homelab.conf',
    title: ['Un vrai lab,', 'sur mon bureau.'],
    intro: 'Un rack 10 pouces de 8U autour d’un mini-serveur sous Proxmox, relié en 10G. Services maison et labs cyber isolés, en LAN uniquement.',
    rackLabel: 'Plan du rack 8U du homelab, de haut en bas',
    details: 'Le plan complet : services, RAM, câblage',
  },
  status: 'En préparation · LAN uniquement',
  rack: 'DeskPi RackMate T1 Plus · 8U · noir',
  // Du haut vers le bas.
  units: [
    { id: 'router', name: 'Routeur GL.iNet Slate AX', detail: 'Posé sur le rack, il isolera le lab du réseau de la maison.', heightU: 0, phase: 2 },
    { id: 'screen', name: 'Écran tactile 7,84"', detail: 'Console Proxmox et btop, en continu.', heightU: 2, phase: 2 },
    { id: 'patch', name: 'Patch panel 12 ports Cat6', detail: 'Les câbles passent derrière, des cordons de 25 cm en façade.', heightU: 0.5, phase: 1 },
    { id: 'switch', name: 'Switch MokerLink', detail: '8 × 2.5G + 1 × SFP+ 10G, VLAN, sans ventilateur.', heightU: 1, phase: 1 },
    { id: 'server', name: 'Minisforum MS-01', detail: 'i5-12600H, 32 Go, NVMe 1 To : l’hôte Proxmox, relié en 10G.', heightU: 2, phase: 1 },
    { id: 'reserve', name: 'Réserve NAS', detail: '1U gardé pour un futur NAS.', heightU: 1, phase: 1 },
    { id: 'vent', name: 'Cache ventilé', detail: 'Les blocs d’alimentation respirent derrière.', heightU: 1, phase: 2 },
    { id: 'blank', name: 'Cache plein', detail: 'Ferme le rack.', heightU: 0.5, phase: 2 },
  ] as readonly RackUnit[],
  labels: {
    phase1: 'Phase 1',
    phase2: 'Phase 2',
    onTop: 'posé dessus',
  },
} as const
