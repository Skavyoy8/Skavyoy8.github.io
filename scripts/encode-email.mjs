// Encode une adresse email pour src/content/links.ts (jamais en clair dans le site).
// Usage : node scripts/encode-email.mjs prenom@exemple.fr
const address = process.argv[2]
if (!address || !address.includes('@')) {
  console.error('Usage : node scripts/encode-email.mjs prenom@exemple.fr')
  process.exit(1)
}
const encoded = Buffer.from(address.split('').reverse().join('')).toString('base64')
console.log(`email: { encoded: '${encoded}' },`)
