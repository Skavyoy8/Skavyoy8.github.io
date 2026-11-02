import { Atelier } from '@/components/atelier/Atelier'
import { socials } from '@/content/links'
import { pillars } from '@/content/pillars'
import { site } from '@/content/site'

export default function Home() {
  // Données structurées lues par Google : la personne (avec ses autres noms) et le site.
  const person = {
    '@type': 'Person',
    name: site.name,
    alternateName: ['Skavyoy', `${site.firstName} (${site.name})`],
    givenName: site.firstName,
    url: site.url,
    image: `${site.url}${site.avatar}`,
    jobTitle: 'Élève en Bac Pro CIEL',
    description: site.description,
    address: { '@type': 'PostalAddress', addressCountry: 'FR' },
    knowsAbout: pillars.map((p) => p.title),
    sameAs: socials.flatMap((s) => (s.href ? [s.href] : [])),
  }
  const website = {
    '@type': 'WebSite',
    name: site.name,
    alternateName: 'Skavyoy',
    url: site.url,
    inLanguage: 'fr-FR',
  }
  const graph = { '@context': 'https://schema.org', '@graph': [person, website] }

  return (
    <>
      <Atelier />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />
    </>
  )
}
