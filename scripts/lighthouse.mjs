// Audit Lighthouse CI du build de prod (basePath vide), en mobile puis en desktop.
// Usage : npm run lh  (ajoute --no-build pour réutiliser out/)
import { spawn, spawnSync } from 'node:child_process'
import { readdirSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from '@playwright/test'

const PORT = 4280
const URL = `http://localhost:${PORT}/`
const THRESHOLDS = {
  mobile: { performance: 0.8, accessibility: 0.95, 'best-practices': 0.95, seo: 0.95 },
  desktop: { performance: 0.9, accessibility: 0.95, 'best-practices': 0.95, seo: 0.95 },
}

function run(cmd, args, env = {}) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', env: { ...process.env, ...env } })
  if (r.status !== 0) process.exit(r.status ?? 1)
}

if (!process.argv.includes('--no-build')) run('npx', ['next', 'build'], { NEXT_PUBLIC_BASE_PATH: '' })

const server = spawn('node', ['scripts/serve-out.mjs'], { env: { ...process.env, PORT: String(PORT), BASE_PATH: '' } })
await new Promise((r) => setTimeout(r, 800))

const chromePath = chromium.executablePath()
const flags = '--headless=new --no-sandbox'
let failed = false

try {
  for (const preset of ['mobile', 'desktop']) {
    const dir = join('.lighthouseci', preset)
    rmSync(dir, { recursive: true, force: true })
    const args = [
      'lhci', 'collect', `--url=${URL}`, '--numberOfRuns=1', `--chromePath=${chromePath}`,
      `--settings.chromeFlags=${flags}`,
    ]
    if (preset === 'desktop') args.push('--settings.preset=desktop')
    run('npx', args)
    const ci = '.lighthouseci'
    const report = readdirSync(ci).filter((f) => f.startsWith('lhr-') && f.endsWith('.json')).sort().pop()
    if (!report) throw new Error('rapport Lighthouse introuvable')
    const lhr = JSON.parse(readFileSync(join(ci, report), 'utf8'))
    rmSync(join(ci, report))
    console.log(`\n── Lighthouse ${preset} ──`)
    for (const [id, min] of Object.entries(THRESHOLDS[preset])) {
      const score = lhr.categories[id].score
      const ok = score >= min
      if (!ok) failed = true
      console.log(`${ok ? '✔' : '✘'} ${id.padEnd(15)} ${Math.round(score * 100)}  (seuil ${min * 100})`)
    }
    const cls = lhr.audits['cumulative-layout-shift'].numericValue
    if (cls >= 0.05) failed = true
    console.log(`${cls < 0.05 ? '✔' : '✘'} CLS             ${cls.toFixed(3)}  (seuil < 0.05)`)
    for (const id of ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'speed-index']) {
      console.log(`  ${id.padEnd(26)} ${lhr.audits[id].displayValue}`)
    }
  }
} finally {
  server.kill()
}

process.exit(failed ? 1 : 0)
