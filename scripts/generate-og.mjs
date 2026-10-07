// Génère public/og.png (1200×630) et src/app/apple-icon.png (180×180) avec Chromium.
// Usage : npm run assets:og
import { chromium } from '@playwright/test'

const fonts = 'https://fonts.googleapis.com/css2?family=Geist:wght@500;600&family=Geist+Mono&display=block'

// Même direction que le site : fond noir, fils fins argent et citron, le pseudo en grand.
const og = `<!doctype html><html><head><link rel="stylesheet" href="${fonts}"><style>
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#050506;color:#f1f1f3;font-family:Geist,sans-serif;overflow:hidden;position:relative}
canvas{position:absolute;inset:0}
.glow{position:absolute;inset:0;background:radial-gradient(40% 50% at 80% 25%,rgba(200,255,46,.07),transparent 70%),radial-gradient(45% 55% at 8% 80%,rgba(120,160,255,.06),transparent 70%)}
.pill{position:absolute;left:80px;top:150px;font-family:'Geist Mono',monospace;font-size:17px;letter-spacing:.16em;text-transform:uppercase;color:rgba(241,241,243,.75);border:1px solid rgba(255,255,255,.08);border-radius:999px;padding:9px 20px;display:flex;gap:14px;align-items:center}
.pill i{width:8px;height:8px;border-radius:50%;background:#c8ff2e;box-shadow:0 0 10px #c8ff2e}
h1{position:absolute;left:72px;top:205px;font-size:190px;line-height:1;letter-spacing:-.065em;font-weight:600;color:#f4f4f7;-webkit-mask-image:linear-gradient(180deg,#000 20%,rgba(0,0,0,.52))}
.dot{position:absolute;left:746px;top:354px;width:30px;height:30px;border-radius:50%;background:#c8ff2e;box-shadow:0 0 36px rgba(200,255,46,.7)}
p{position:absolute;left:80px;top:445px;font-size:30px;line-height:1.45;color:rgba(241,241,243,.8)}
</style></head><body><canvas id="c" width="1200" height="630"></canvas><div class="glow"></div>
<div class="pill"><i></i>Cybersécurité / Réseaux / Bac Pro CIEL</div>
<h1>skavyoy</h1><span class="dot"></span>
<p>Moi, c’est Luke. Linux, réseaux et cybersécurité.<br>Je cherche une alternance en BTS SIO SISR.</p>
<script>
// Les deux rubans du fond du site, figés.
const c=document.getElementById('c').getContext('2d');const W=1200,H=630;
const R=[{y0:.86,slope:-.62,amp:.08,freq:2,spread:.16,twist:1.3,phase:0,alpha:1},{y0:.3,slope:.46,amp:.05,freq:2.8,spread:.08,twist:1.9,phase:2.1,alpha:.55}];
c.lineWidth=.9;
R.forEach((rb,r)=>{const g=c.createLinearGradient(0,0,W,0);g.addColorStop(0,'rgba(200,205,220,0)');g.addColorStop(.3,'rgba(205,212,228,.5)');g.addColorStop(.62,'rgba(218,236,190,.5)');g.addColorStop(.84,'rgba(200,255,46,.34)');g.addColorStop(1,'rgba(143,216,255,.05)');c.strokeStyle=g;
for(let i=0;i<34;i++){const th=i/33*Math.PI;c.globalAlpha=rb.alpha*(.14+.46*Math.sin(th));c.beginPath();
for(let x=-40;x<=W+40;x+=12){const u=x/W,t=4;const base=H*(rb.y0+rb.slope*u+rb.amp*Math.sin(u*rb.freq+rb.phase+t*.1));const sp=H*rb.spread*(.55+.45*Math.sin(u*2.2+rb.phase));const y=base+sp*Math.cos(th+u*rb.twist+t*.2)+H*.01*Math.sin(u*7+i*.37+r);x>-40?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}});
</script></body></html>`

const icon = `<!doctype html><html><head><style>*{margin:0}body{width:180px;height:180px;background:#050506;display:grid;place-items:center}</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="180" height="180"><rect width="32" height="32" rx="8" fill="#c8ff2e"/><path d="M6 20h5v-8h5v8h5v-8h5" fill="none" stroke="#0b0d05" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></body></html>`

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
