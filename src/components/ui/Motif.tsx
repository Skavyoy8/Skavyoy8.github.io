import type { PillarMotif } from '@/content/pillars'

/** Micro-animations des piliers, en SVG/CSS pur (figées en mode calme). */
export function Motif({ motif }: { motif: PillarMotif }) {
  return (
    <div className="motif relative h-40 w-full overflow-hidden rounded-md border border-line bg-bg/60" aria-hidden="true">
      {motif === 'shell' && <Shell />}
      {motif === 'graph' && <Graph />}
      {motif === 'trace' && <Trace />}
      {motif === 'wave' && <Wave />}
    </div>
  )
}

const shellLines = [
  { t: '$ nmap -sC -sV 10.10.x.x', c: 'text-fg' },
  { t: '21/tcp   open  ftp      vsftpd', c: 'text-muted' },
  { t: '22/tcp   open  ssh      OpenSSH', c: 'text-muted' },
  { t: '445/tcp  open  smb      Samba', c: 'text-accent' },
  { t: '$ smbclient -L //10.10.x.x -N', c: 'text-fg' },
]

function Shell() {
  return (
    <div className="flex h-full flex-col justify-end gap-1 p-4 font-mono text-[11px] leading-tight">
      <style>{`.sh-l{opacity:0;animation:sh 6s steps(1) infinite}@keyframes sh{0%{opacity:0}12%{opacity:1}92%{opacity:1}100%{opacity:0}}`}</style>
      {shellLines.map((line, i) => (
        <p key={line.t} className={`sh-l ${line.c}`} style={{ animationDelay: `${i * 0.7}s` }}>
          {line.t}
        </p>
      ))}
      <p className="text-accent">
        $ <span className="blink">▍</span>
      </p>
    </div>
  )
}

const nodes = [
  [40, 80],
  [120, 34],
  [130, 120],
  [210, 72],
  [290, 40],
  [300, 124],
] as const
const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
] as const

function Graph() {
  return (
    <svg viewBox="0 0 340 160" className="h-full w-full">
      <style>{`.pk{offset-rotate:0deg;animation:pk 2.8s linear infinite}@keyframes pk{from{offset-distance:0%}to{offset-distance:100%}}`}</style>
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgb(255 255 255 / .16)" strokeWidth="1" />
      ))}
      {edges.map(([a, b], i) => (
        <circle
          key={`p-${a}-${b}`}
          className="pk"
          r="2.2"
          fill={i % 2 ? '#6ae4ff' : '#c8ff2e'}
          style={{ offsetPath: `path('M${nodes[a][0]} ${nodes[a][1]} L${nodes[b][0]} ${nodes[b][1]}')`, animationDelay: `${i * 0.45}s` }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={i === 3 ? 7 : 5} fill="#050506" stroke={i === 3 ? '#c8ff2e' : 'rgb(255 255 255 / .5)'} strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  )
}

function Trace() {
  const path = 'M10 130 H70 L90 110 H150 V60 L170 40 H230'
  return (
    <svg viewBox="0 0 340 160" className="h-full w-full">
      <style>{`.tr{stroke-dasharray:18 300;animation:tr 2.6s linear infinite}@keyframes tr{from{stroke-dashoffset:318}to{stroke-dashoffset:0}}`}</style>
      <path d={path} fill="none" stroke="rgb(255 255 255 / .18)" strokeWidth="2" />
      <path d={path} fill="none" className="tr" stroke="#6ae4ff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M150 60 V130 H230" fill="none" stroke="rgb(255 255 255 / .12)" strokeWidth="2" />
      <circle cx="10" cy="130" r="4" fill="#050506" stroke="rgb(255 255 255 / .5)" />
      {['VM 1', 'VM 2', 'LXC'].map((label, i) => (
        <g key={label} transform={`translate(236 ${18 + i * 44})`}>
          <rect width="88" height="34" rx="3" fill="#0b0b0e" stroke={i === 0 ? '#c8ff2e' : 'rgb(255 255 255 / .2)'} />
          <text x="44" y="21" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill={i === 0 ? '#c8ff2e' : '#8b8b94'}>
            {label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function Wave() {
  const sine = Array.from({ length: 81 }, (_, i) => `${i === 0 ? 'M' : 'L'}${i * 8} ${80 - Math.sin((i / 80) * Math.PI * 6) * 44}`).join(' ')
  const square = Array.from({ length: 6 }, (_, i) => `${i === 0 ? 'M0 36' : ''} H${(i + 0.5) * 106.67} V${i % 2 ? 36 : 124} H${(i + 1) * 106.67}`).join(' ')
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" preserveAspectRatio="none">
      <style>{`.wv{animation:wv 5s ease-in-out infinite}.wq{animation:wq 5s ease-in-out infinite}@keyframes wv{0%,40%{opacity:1}55%,90%{opacity:0}100%{opacity:1}}@keyframes wq{0%,40%{opacity:0}55%,90%{opacity:1}100%{opacity:0}}`}</style>
      <line x1="0" y1="80" x2="320" y2="80" stroke="rgb(255 255 255 / .1)" strokeDasharray="2 4" />
      <path d={sine} className="wv" fill="none" stroke="#6ae4ff" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      <path d={square} className="wq" fill="none" stroke="#c8ff2e" strokeWidth="1.6" vectorEffect="non-scaling-stroke" transform="scale(0.5 1)" />
      <text x="8" y="152" fontFamily="var(--font-mono)" fontSize="9" fill="#8b8b94">
        ANALOGIQUE → NUMÉRIQUE
      </text>
    </svg>
  )
}
