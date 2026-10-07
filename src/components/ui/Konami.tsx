'use client'

import { useEffect } from 'react'
import { konamiCopy } from '@/content/terminal'
import { emit, toast } from '@/lib/events'
import { ribbonState } from '@/lib/ribbonState'

const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export function Konami() {
  useEffect(() => {
    let position = 0
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      position = key === SEQUENCE[position] ? position + 1 : key === SEQUENCE[0] ? 1 : 0
      if (position < SEQUENCE.length) return
      position = 0
      ribbonState.glitch = 1
      document.documentElement.classList.add('glitching')
      window.setTimeout(() => document.documentElement.classList.remove('glitching'), 900)
      toast(konamiCopy.toast)
      emit('konami')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return null
}
