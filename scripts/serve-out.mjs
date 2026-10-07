// Sert le dossier out/ comme GitHub Pages : index.html des dossiers, 404.html,
// et un préfixe optionnel (BASE_PATH) pour tester le basePath en local.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, sep } from 'node:path'

const ROOT = join(process.cwd(), 'out')
const BASE = (process.env.BASE_PATH ?? '').replace(/\/$/, '')
const PORT = Number(process.env.PORT ?? 4173)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.wasm': 'application/wasm',
  '.webmanifest': 'application/manifest+json',
}

async function send(res, file, status = 200) {
  const body = await readFile(file)
  res.writeHead(status, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' })
  res.end(body)
}

async function notFound(res) {
  try {
    await send(res, join(ROOT, '404.html'), 404)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('404')
  }
}

createServer(async (req, res) => {
  let path = decodeURIComponent((req.url ?? '/').split('?')[0] ?? '/')
  if (BASE) {
    if (path === BASE) {
      res.writeHead(301, { Location: `${BASE}/` })
      res.end()
      return
    }
    if (!path.startsWith(`${BASE}/`)) return notFound(res)
    path = path.slice(BASE.length)
  }
  let file = normalize(join(ROOT, path))
  if (file !== ROOT && !file.startsWith(ROOT + sep)) return notFound(res)
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html')
  } catch {
    if (!extname(file)) file = `${file}.html`
  }
  try {
    await send(res, file)
  } catch {
    await notFound(res)
  }
}).listen(PORT, () => {
  console.log(`out/ servi sur http://localhost:${PORT}${BASE}/`)
})
