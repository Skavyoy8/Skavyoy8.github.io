'use client'

import { useState } from 'react'
import { contactCopy, email } from '@/content/links'
import { isTodo } from '@/content/types'
import { decodeEmail } from '@/lib/email'
import { toast } from '@/lib/events'

export function CopyButton({ text, label, className = '' }: { text: string; label: string; className?: string }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast(`${contactCopy.copied} : ${text}`)
    } catch {
      toast(text)
    }
  }
  return (
    <button type="button" onClick={copy} className={className} aria-label={`${label} : ${text}`}>
      {label}
    </button>
  )
}

/** L'adresse n'existe dans la page qu'après un clic : invisible pour les robots qui lisent le HTML. */
export function EmailReveal({ className = '' }: { className?: string }) {
  const [address, setAddress] = useState<string | null>(null)

  if (address) {
    return (
      <a href={`mailto:${address}`} className={className}>
        {address}
      </a>
    )
  }

  const reveal = () => {
    if (isTodo(email)) {
      toast(`${contactCopy.emailLabel} : ${contactCopy.missing.toLowerCase()}`)
      return
    }
    setAddress(decodeEmail(email.encoded))
  }

  return (
    <button type="button" onClick={reveal} className={className}>
      {contactCopy.emailReveal}
    </button>
  )
}

/** Gros CTA du contact : révèle l'email puis ouvre le client mail. */
export function useEmailAction() {
  return () => {
    if (isTodo(email)) {
      toast(`${contactCopy.emailLabel} : ${contactCopy.missing.toLowerCase()}`)
      return
    }
    const address = decodeEmail(email.encoded)
    toast(address)
    window.location.href = `mailto:${address}`
  }
}
