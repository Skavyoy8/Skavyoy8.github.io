/**
 * Marqueur de contenu manquant. Le texte contient toujours « [À REMPLIR] »
 * pour être retrouvé avec : grep -rn "À REMPLIR" src/content
 * L'interface affiche un repère discret à la place de la valeur.
 */
export type Todo = { readonly todo: string }

export const TODO = (hint: string): Todo => ({ todo: hint })

export function isTodo(value: unknown): value is Todo {
  return typeof value === 'object' && value !== null && 'todo' in value
}

/** Une valeur connue, ou un `TODO(...)` en attendant que Luke la fournisse. */
export type Fillable<T> = T | Todo
