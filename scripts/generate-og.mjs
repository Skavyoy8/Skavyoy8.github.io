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
.dot{position:absolute;left:748px;top:372px;width:80px;height:17px;background:#c8ff2e;box-shadow:0 0 30px rgba(200,255,46,.7)}
p{position:absolute;left:80px;top:445px;font-size:30px;line-height:1.45;color:rgba(241,241,243,.8)}
</style></head><body><canvas id="c" width="1200" height="630"></canvas><div class="glow"></div>
<div class="pill"><i></i>Disponible · alternance BTS SIO SISR · 2027</div>
<h1>skavyoy</h1><span class="dot"></span>
<p>Moi, c’est Luke. Linux, réseaux et cybersécurité.<br>Je cherche une alternance en BTS SIO SISR.</p>
<script>
// Le paysage de signal du fond du site, figé.
const c=document.getElementById('c').getContext('2d');const W=1200,H=630,N=30;
const g=c.createLinearGradient(0,0,W,0);g.addColorStop(0,'rgba(190,196,212,0)');g.addColorStop(.22,'rgba(195,202,220,.9)');g.addColorStop(.62,'rgba(200,255,46,1)');g.addColorStop(.88,'rgba(143,216,255,.75)');g.addColorStop(1,'rgba(143,216,255,0)');
for(let i=0;i<N;i++){const d=i/(N-1),base=H*(.5+.56*Math.pow(d,1.55)),amp=H*.11*(.3+.7*d),pts=[];
for(let x=0;x<=W;x+=10){const u=x/W,env=Math.exp(-Math.pow(u-.66,2)/(2*.17*.17)),w=.55*Math.sin(u*9+i*.55-1.4)+.3*Math.sin(u*17.5+i*1.3+2)+.45*Math.sin(u*4.2-i*.31+.8);pts.push([x,base-amp*env*(.75+.5*w)])}
c.globalAlpha=1;c.fillStyle='#050506';c.beginPath();pts.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.lineTo(W,base+4);c.lineTo(0,base+4);c.closePath();c.fill();
c.globalAlpha=.07+.5*Math.pow(d,1.3);c.strokeStyle=g;c.lineWidth=1.2;c.beginPath();pts.forEach(([x,y],k)=>k?c.lineTo(x,y):c.moveTo(x,y));c.stroke()}
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
