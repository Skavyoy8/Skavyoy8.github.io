/** Décode une adresse produite par scripts/encode-email.mjs (inversée puis en base64). */
export function decodeEmail(encoded: string): string {
  return atob(encoded).split('').reverse().join('')
}
