import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

// Le basePath vient toujours de l'environnement : vide en local et pour un dépôt
// <user>.github.io, « /<repo> » quand actions/configure-pages le fournit.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
}

// remark-gfm : tableaux Markdown dans les pages du lab (nom en texte, comme l'exige Turbopack).
export default createMDX({ options: { remarkPlugins: ['remark-gfm'] } })(nextConfig)
