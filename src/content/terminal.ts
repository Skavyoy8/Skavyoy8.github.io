import { site } from './site'

export const terminalCopy = {
  title: 'skavyoy@signal: ~',
  label: 'Terminal du portfolio',
  placeholder: 'tape « help »',
  hint: 'Tab pour compléter · ↑ ↓ pour l’historique · Échap pour fermer',
  welcome: [`Bienvenue sur le terminal de ${site.name}.`, 'Tape « help » pour voir les commandes.'],
  help: [
    ['help', 'liste des commandes'],
    ['whoami', 'qui je suis'],
    ['ls', 'les sections du site'],
    ['cd <section>', 'aller à une section'],
    ['cat about', 'ma présentation'],
    ['projects', 'les projets du lab'],
    ['rooms --filter <catégorie>', 'filtrer les rooms TryHackMe'],
    ['open github|thm|discord', 'ouvrir un profil'],
    ['calm', 'activer ou couper le mode calme'],
    ['clear', 'vider l’écran'],
    ['exit', 'fermer le terminal'],
  ] as const,
  whoami: [`${site.name} (Luke) — ${site.tagline}`, `${site.seeking}.`],
  notFound: (cmd: string) => `commande introuvable : ${cmd}. Tape « help ».`,
  cdUsage: 'usage : cd <section>   (ls pour la liste)',
  cdUnknown: (s: string) => `section inconnue : ${s}`,
  cdOk: (s: string) => `→ ${s}`,
  roomsUsage: 'usage : rooms --filter <reseau|web|challenges|bases|linux|tout>',
  roomsOk: (c: string) => `rooms filtrées : ${c}`,
  openUsage: 'usage : open github|thm|discord',
  openMissing: (what: string) => `${what} : lien pas encore renseigné.`,
  openOk: (what: string) => `ouverture de ${what}…`,
  calmOn: 'mode calme activé : 3D et animations lourdes coupées.',
  calmOff: 'mode calme désactivé.',
  sudo: [
    '[sudo] mot de passe pour recruteur : ********',
    'Vérification des prérequis… curiosité ✔  rigueur ✔  envie d’apprendre ✔',
    'Accès accordé. Prochaine étape : un BTS SIO SISR en alternance.',
    '→ cd reseaux pour me contacter.',
  ],
  sudoDenied: 'Bien essayé. Cette commande est réservée : sudo hire-luke',
}

export const konamiCopy = {
  toast: 'Signal intercepté. Tu connais les classiques : bienvenue dans le lab.',
}
