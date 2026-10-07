/**
 * État partagé du fond, lu à chaque image par la boucle de rendu : aucun re-render React.
 * Le Konami y écrit un glitch qui retombe tout seul.
 */
export const ribbonState = {
  glitch: 0,
}
