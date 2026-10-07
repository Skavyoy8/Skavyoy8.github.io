import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowIcon } from '@/components/ui/Primitives'
import { Fill } from '@/components/ui/Todo'
import { labCopy, projects, statusLabel } from '@/content/lab'
import { isTodo } from '@/content/types'
import { PageEnter } from './PageEnter'

const detailed = projects.filter((p) => p.detail)

export function generateStaticParams() {
  return detailed.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = detailed.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `./lab/${slug}/` },
    openGraph: { title: project.title, description: project.summary, url: `./lab/${slug}/` },
  }
}

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = detailed.find((p) => p.slug === slug)
  if (!project) notFound()
  const { default: Content } = await import(`@/content/lab/${slug}.mdx`)

  return (
    <main id="contenu" tabIndex={-1} className="relative z-10 min-h-svh pt-32 pb-[18vh] outline-none">
      <PageEnter />
      <article className="container-x relative">
        <Link href="/#lab" className="group label inline-flex items-center gap-2 text-muted hover:text-fg">
          <ArrowIcon direction="right" className="size-3.5 rotate-180" />
          {labCopy.back}
        </Link>
        <header className="mt-12 grid grid-cols-4 gap-x-(--gutter) gap-y-8 border-b border-line pb-12 lg:grid-cols-12">
          <div className="col-span-4 lg:col-span-8">
            <p className="label flex flex-wrap items-center gap-3 text-accent">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              <Fill value={project.status}>{(s) => statusLabel[s]}</Fill>
              {project.private ? <span className="text-muted">· {labCopy.privateLabel}</span> : null}
            </p>
            <h1 className="text-display mt-5 text-balance" data-page-title>
              {project.title}
            </h1>
          </div>
          <div className="col-span-4 self-end lg:col-span-4">
            <p className="text-pretty text-muted">{project.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                  {tech}
                </li>
              ))}
            </ul>
            {project.href && !isTodo(project.href) ? (
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="label mt-6 inline-flex items-center gap-2 hover:text-accent">
                {labCopy.source} <ArrowIcon className="size-3.5" />
              </a>
            ) : null}
          </div>
        </header>
        <div className="mt-6 lg:ml-[calc((100%-11*var(--gutter))/12+var(--gutter))]">
          <Content />
        </div>
      </article>
    </main>
  )
}
