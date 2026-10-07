// Génère public/og.png (1200×630) et src/app/apple-icon.png (180×180) avec Chromium.
// Usage : npm run assets:og
import { chromium } from '@playwright/test'

const fonts =
  'https://fonts.googleapis.com/css2?family=Geist:wght@500;600&family=Geist+Mono&family=Instrument+Serif:ital@1&display=block'

const og = `<!doctype html><html><head><link rel="stylesheet" href="${fonts}"><style>
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#050506;color:#ededef;font-family:Geist,sans-serif;overflow:hidden;position:relative}
canvas{position:absolute;inset:0}
.dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1.3px);background-size:24px 24px;-webkit-mask-image:radial-gradient(60% 70% at 20% 40%,#000,transparent)}
.brand{position:absolute;left:72px;top:60px;display:flex;gap:14px;align-items:center;font-size:30px;font-weight:500;letter-spacing:-.02em}
.pill{position:absolute;left:72px;top:190px;font-family:'Geist Mono',monospace;font-size:20px;color:rgba(237,237,239,.8);border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);border-radius:8px;padding:8px 16px;display:flex;gap:12px;align-items:center}
.pill i{width:9px;height:9px;border-radius:50%;background:#c8ff2e;box-shadow:0 0 10px #c8ff2e}
h1{position:absolute;left:72px;top:262px;font-size:92px;line-height:1.02;letter-spacing:-.045em;font-weight:600}
h1 em{display:block;font-family:'Instrument Serif',serif;font-weight:400;letter-spacing:-.02em;color:rgba(237,237,239,.9)}
</style></head><body><canvas id="c" width="1200" height="630"></canvas><div class="dots"></div>
<div class="brand"><svg viewBox="0 0 32 32" width="44" height="44"><rect width="32" height="32" rx="8" fill="#c8ff2e"/><path d="M6 20h5v-8h5v8h5v-8h5" fill="none" stroke="#0b0d05" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Skavyoy</div>
<p class="pill"><i></i>Bac Pro CIEL · recherche une alternance</p>
<h1>Comprendre le signal,<em>puis le protéger.</em></h1>
<script>
// Le ruban de fibres du héros, dessiné en 2D : une épingle lumineuse et un éventail vers la droite.
const c=document.getElementById('c').getContext('2d');let s=11;const r=()=>(s=(s*16807)%2147483647)/2147483647;
const P=[[1300,-120],[1010,120],[800,330],[700,470],[820,600],[1000,760]];
const cr=(a,b,d,e,u)=>{const u2=u*u,u3=u2*u;return 0.5*(2*b+(-a+d)*u+(2*a-5*b+4*d-e)*u2+(-a+3*b-3*d+e)*u3)};
const at=(t)=>{const x=t*5,i=Math.min(Math.floor(x),4),u=x-i,g=(k)=>P[Math.max(0,Math.min(5,k))];const a=g(i-1),b=g(i),d=g(i+1),e=g(i+2);return[cr(a[0],b[0],d[0],e[0],u),cr(a[1],b[1],d[1],e[1],u)]};
c.globalCompositeOperation='lighter';
const halo=c.createRadialGradient(700,470,0,700,470,260);halo.addColorStop(0,'rgba(220,255,140,.35)');halo.addColorStop(1,'rgba(200,255,46,0)');c.fillStyle=halo;c.fillRect(0,0,1200,630);
for(let k=0;k<170;k++){const w=r()*2-1,pick=r(),wob=r()*6.28;const col=pick<.2?'106,190,255':pick<.5?'110,190,40':'200,255,46';
const near=10,start=360,end=170;c.beginPath();for(let i=0;i<=120;i++){const t=i/120;const [x,y]=at(t),[x2,y2]=at(Math.min(t+.004,1));const tx=x2-x,ty=y2-y,l=Math.hypot(tx,ty)||1;
const d=Math.abs(t-.6)/(t<.6?.6:.4),sm=Math.min(d,1);const spr=near+((t<.6?start:end)-near)*sm*sm*(3-2*sm);const off=(w+Math.sin(t*9+wob)*.08)*spr;
const px=x-ty/l*off,py=y+tx/l*off;i?c.lineTo(px,py):c.moveTo(px,py)}
const a=.12+.5*Math.pow(r(),2.2);c.strokeStyle='rgba('+col+','+a+')';c.lineWidth=1.1;c.shadowColor='rgba('+col+',.8)';c.shadowBlur=8;c.stroke()}
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
