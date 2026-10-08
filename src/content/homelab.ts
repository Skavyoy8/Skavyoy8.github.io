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
    intro: 'Un rack 10 pouces de 8U, posé sur un bureau, autour d’un mini-serveur sous Proxmox. Voici le plan, unité par unité.',
    rackLabel: 'Plan du rack 8U du homelab, de haut en bas',
    servicesTitle: 'Services en continu',
    ramOf: (used: string, total: number) => `${used} Go sur ${total} Go de RAM`,
    onDemandTitle: 'Labs à la demande',
    linksTitle: 'Câblage prévu',
    lanNote: 'Aucun port ouvert : le lab reste en LAN.',
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
  ram: { total: 32, unit: 'Go' },
  services: {
    always: [
      { name: 'Proxmox', role: 'L’hôte qui fait tourner tout le reste', type: 'Système', ram: 2 },
      { name: 'AdGuard Home / Pi-hole', role: 'Bloque les pubs pour toute la maison', type: 'LXC', ram: 0.5 },
      { name: 'Homepage + Uptime Kuma', role: 'Accueil des services, alerte si l’un tombe', type: 'LXC Docker', ram: 1 },
      { name: 'Jellyfin', role: 'Streaming perso, transcodé par l’iGPU Intel', type: 'LXC', ram: 2 },
      { name: 'Samba', role: 'Mini NAS : dossiers partagés', type: 'LXC', ram: 0.5 },
      { name: 'Immich', role: 'Photos perso, hébergées à la maison', type: 'LXC Docker', ram: 4 },
      { name: 'Bot crypto', role: 'Tourne 24 h/24 sans laisser le PC allumé', type: 'LXC', ram: 1 },
      { name: 'Dashboard Pronote', role: 'Notes et devoirs, hébergés sur le lab', type: 'LXC', ram: 0.5 },
    ],
    onDemand: [
      { name: 'Lab cyber', role: 'Kali face à Metasploitable, réseau isolé sans Internet', type: '2 VM', ram: 5 },
      { name: 'Lab Active Directory', role: 'Windows Server + un poste client', type: '2 VM', ram: 8 },
      { name: 'OPNsense', role: 'Pare-feu et VLAN', type: 'VM', ram: 2 },
    ],
  },
  labels: {
    always: 'En continu',
    onDemand: 'À la demande',
    ram: 'RAM utilisée',
    phase1: 'Phase 1',
    phase2: 'Phase 2',
    onTop: 'posé dessus',
    lanOnly: 'LAN uniquement',
    detailsCta: 'Le plan complet',
  },
  links: [
    { from: 'Box internet', to: 'Switch · port 1', role: 'Accès Internet du lab', speed: '2.5G' },
    { from: 'MS-01 · SFP+ 1', to: 'Switch · SFP+', role: 'Lien principal Proxmox et VM (DAC)', speed: '10G' },
    { from: 'MS-01 · 2.5G n°1', to: 'Switch · port 2', role: 'Installation, puis secours', speed: '2.5G' },
    { from: 'Switch · ports 4 à 8', to: 'Libres', role: 'Futur NAS, Raspberry Pi, 2e serveur', speed: '—' },
  ],
} as const
