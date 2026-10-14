import { Atelier } from '@/components/atelier/Atelier'
import { socials } from '@/content/links'
import { pillars } from '@/content/pillars'
import { site } from '@/content/site'

export default function Home() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    givenName: site.firstName,
    url: site.url,
    image: `${site.url}${site.avatar}`,
    jobTitle: 'Élève en Bac Pro CIEL',
    description: site.description,
    address: { '@type': 'PostalAddress', addressCountry: 'FR' },
    knowsAbout: pillars.map((p) => p.title),
    sameAs: socials.flatMap((s) => (s.href ? [s.href] : [])),
  }

  return (
    <>
      <Atelier />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }} />
    </>
  )
}
