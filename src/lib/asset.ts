const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/**
 * Préfixe un chemin de `public/` avec le basePath.
 * Obligatoire pour tout ce qui n'est pas chargé par next/link ou next/image
 * (textures, images dessinées dans un canvas, PDF…), sinon ça casse en prod.
 */
export function asset(path: string): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) return path
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
}

export const basePath = BASE_PATH
