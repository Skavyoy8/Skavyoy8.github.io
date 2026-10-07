import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  h2: ({ children }) => <h2 className="mt-16 mb-5 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-none font-semibold tracking-[-0.04em]">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-10 mb-3 text-xl font-semibold tracking-tight">{children}</h3>,
  p: ({ children }) => <p className="my-4 max-w-[68ch] text-pretty text-fg/85">{children}</p>,
  ul: ({ children }) => <ul className="my-5 max-w-[68ch] list-none space-y-2 border-l border-line pl-5 text-fg/85">{children}</ul>,
  ol: ({ children }) => <ol className="my-5 max-w-[68ch] list-decimal space-y-2 pl-5 text-fg/85 marker:font-mono marker:text-accent">{children}</ol>,
  li: ({ children }) => <li className="text-pretty">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
  a: ({ children, href }) => (
    <a href={href} className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent" target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
      {children}
    </a>
  ),
  code: ({ children }) => <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-accent">{children}</code>,
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="label border-b border-line bg-surface px-4 py-3 font-normal text-muted">{children}</th>,
  td: ({ children }) => <td className="border-b border-line px-4 py-3 align-top text-fg/85">{children}</td>,
}

export function useMDXComponents(): MDXComponents {
  return components
}
