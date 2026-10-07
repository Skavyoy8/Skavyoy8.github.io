'use client'

import { useSyncExternalStore } from 'react'

/**
 * Support WebGL. On ne crée surtout pas de contexte « pour voir » pendant l'hydratation
 * (plusieurs secondes sur un rendu logiciel) : on teste la présence de l'API,
 * et si la création du vrai contexte échoue, le Canvas le signale via markWebGLFailed().
 */
let failed = false
const listeners = new Set<() => void>()

function supported(): boolean {
  return !failed && typeof window.WebGL2RenderingContext !== 'undefined'
}

export function markWebGLFailed() {
  failed = true
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useWebGL(): boolean {
  return useSyncExternalStore(subscribe, supported, () => false)
}

/** Rendu WebGL logiciel (machine sans GPU utilisable) : lu sur le contexte réel du Canvas. */
export function isSoftwareRenderer(gl: WebGL2RenderingContext | WebGLRenderingContext): boolean {
  const info = gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
  return /swiftshader|llvmpipe|softpipe|software/i.test(renderer)
}
