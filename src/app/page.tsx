import { Reveals } from '@/components/motion/Reveals'
import { About } from '@/components/sections/About'
import { Hero } from '@/components/sections/Hero'
import { Interests } from '@/components/sections/Interests'
import { Lab } from '@/components/sections/Lab'
import { Manifesto } from '@/components/sections/Manifesto'
import { Parcours } from '@/components/sections/Parcours'
import { Badges, Contact, Rooms } from '@/components/sections/Showcase'
import { socials } from '@/content/links'
import { pillars } from '@/content/pillars'
import { site } from '@/content/site'
import { isTodo } from '@/content/types'
import { getRepos } from '@/lib/github'

export default async function Home() {
  const { repos } = await getRepos()

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
    sameAs: socials.flatMap((s) => (isTodo(s.href) ? [] : [s.href])),
  }

  return (
    <>
      <Reveals />
      <main id="contenu" tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <About />
        <Manifesto />
        <Lab repos={repos} />
        <Interests />
        <Parcours />
        <Rooms />
        <Badges />
        <Contact />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }} />
    </>
  )
}
