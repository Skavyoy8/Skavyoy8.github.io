'use client'

import type { ReactNode } from 'react'
import { contactCopy } from '@/content/links'
import { toast } from '@/lib/events'

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast(`${contactCopy.copied} : ${text}`)
  } catch {
    // Presse-papiers refusé (navigateur strict) : on affiche au moins le texte.
    toast(text)
  }
}

/** Un bouton qui copie un texte (le pseudo Discord) et le confirme par une notification. */
export function CopyButton({ text, label, className = '', children }: { text: string; label: string; className?: string; children: ReactNode }) {
  return (
    <button type="button" onClick={() => copy(text)} className={className} aria-label={label}>
      {children}
    </button>
  )
}
