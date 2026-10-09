import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Hero } from '@/components/sections/Hero'
import { Homelab } from '@/components/sections/Homelab'
import { Journey } from '@/components/sections/Journey'
import { Practice } from '@/components/sections/Practice'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
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
      <main id="contenu" tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <About />
        <Skills />
        <Homelab />
        <Projects />
        <Journey />
        <Practice />
        <Contact />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }} />
    </>
  )
}
