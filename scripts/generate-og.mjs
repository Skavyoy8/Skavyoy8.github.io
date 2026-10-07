// Génère public/og.png (1200×630) et src/app/apple-icon.png (180×180) avec Chromium.
// Usage : npm run assets:og
import { chromium } from '@playwright/test'

const fonts =
  'https://fonts.googleapis.com/css2?family=Geist:wght@500;600&family=Geist+Mono&family=Instrument+Serif:ital@1&display=block'

const og = `<!doctype html><html><head><link rel="stylesheet" href="${fonts}"><style>
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#050506;color:#ededef;font-family:Geist,sans-serif;overflow:hidden;position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:100px 100%}
.glow{position:absolute;right:-120px;top:-160px;width:760px;height:760px;border-radius:50%;background:radial-gradient(circle,rgba(106,228,255,.22),transparent 62%)}
canvas{position:absolute;right:40px;top:40px}
.label{font-family:'Geist Mono',monospace;font-size:20px;letter-spacing:.16em;text-transform:uppercase;color:#8b8b94}
h1{position:absolute;left:72px;bottom:150px;font-size:190px;line-height:.8;letter-spacing:-.07em;font-weight:600}
h1 span{color:#c8ff2e}.top{position:absolute;left:72px;top:64px;display:flex;gap:14px;align-items:center}
.dot{width:10px;height:10px;border-radius:50%;background:#c8ff2e}
.tag{position:absolute;left:76px;bottom:72px;font-size:32px;letter-spacing:-.02em}.tag em{font-family:'Instrument Serif',serif;color:#c8ff2e}
</style></head><body><div class="grid"></div><div class="glow"></div><canvas id="c" width="560" height="560"></canvas>
<div class="top"><span class="dot"></span><span class="label">Portfolio · CIEL / FR</span></div>
<h1>Skavyoy<span>.</span></h1><p class="tag">Cybersécurité, réseaux, Linux et <em>électronique</em>.</p>
<script>
const c=document.getElementById('c').getContext('2d');let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;
for(let row=0;row<34;row++){const z=row/33,y0=470-row*11,amp=10+z*26;c.beginPath();for(let x=0;x<=560;x+=4){const n=Math.sin(x*.02+row*.5)*amp*.6+Math.sin(x*.047-row*.3)*amp*.4;const y=y0-n;x?c.lineTo(x,y):c.moveTo(x,y)}
c.strokeStyle=row%7===3?'rgba(200,255,46,.55)':'rgba(106,228,255,'+(.12+.5*(1-z))+')';c.lineWidth=1.2;c.stroke()}
</script></body></html>`

const icon = `<!doctype html><html><head><style>*{margin:0}body{width:180px;height:180px;background:#050506;display:grid;place-items:center}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="180" height="180"><path d="M41 21.5c-1.7-3-5-4.6-9.2-4.6-5.6 0-9.4 2.9-9.4 7.2 0 9.6 19.4 5.4 19.4 15.1 0 4.6-4.1 7.9-10 7.9-4.7 0-8.5-2-10.3-5.4" fill="none" stroke="#ededef" stroke-width="5.2" stroke-linecap="round"/><circle cx="49" cy="46" r="4" fill="#c8ff2e"/></svg></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(og, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: 'public/og.png' })
await page.setViewportSize({ width: 180, height: 180 })
await page.setContent(icon)
await page.screenshot({ path: 'src/app/apple-icon.png' })
await browser.close()
console.log('public/og.png et src/app/apple-icon.png générés')
