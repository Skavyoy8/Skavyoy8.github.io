import { NetworkLog } from './NetworkLog'
import { networkPanel } from '@/content/site'

/**
 * Le plan réseau du homelab, dessiné comme un éditeur de flux :
 * nœuds en verre, liaisons en courbes, paquets lumineux qui circulent (SVG animé, coupé en mode calme).
 */

// Repère interne du graphe : 600 × 280.
const W = 600
const H = 280
const edges = {
  lab: 'M112 140 C152 140 160 62 200 62',
  home: 'M112 140 C152 140 160 218 200 218',
  labOut: 'M372 62 C412 62 402 140 440 140',
  homeOut: 'M372 218 C412 218 402 140 440 140',
}

function Node({ x, y, w, title, sub, className = '' }: { x: number; y: number; w: number; title: string; sub: string; className?: string }) {
  return (
    <div
      className={`absolute -translate-y-1/2 rounded-[0.7em] border border-white/10 bg-[#15170f]/95 px-[0.9em] py-[0.65em] shadow-[0_12px_30px_-12px_rgb(0_0_0/0.9)] ${className}`}
      style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, width: `${(w / W) * 100}%` }}
    >
      <p className="truncate font-medium text-fg">{title}</p>
      <p className="mt-[0.2em] truncate font-mono text-[0.85em] text-muted">{sub}</p>
    </div>
  )
}

function Packet({ path, begin }: { path: string; begin: string }) {
  return (
    <circle r="3" fill="#c8ff2e" className="packet" opacity="0">
      <animateMotion path={path} dur="3.6s" begin={begin} repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.28;1" calcMode="linear" />
      <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.28;0.29;1" dur="3.6s" begin={begin} repeatCount="indefinite" />
    </circle>
  )
}

const tools = [
  'M6 3.5 13 9.2 9.6 9.9 11.6 14 10 14.8 8 10.6 5.6 13Z',
  'M9.5 4v11M4 9.5h11',
  'M6 4v6.5a3 3 0 0 0 3 3h4M11 11l2.5 2.5L11 16',
]

export function NetworkPanel() {
  const { nodes } = networkPanel
  return (
    <div className="glass glass-blur overflow-visible rounded-[22px] text-[13px]">
      <div className="flex items-center gap-4 border-b border-white/[0.06] px-5 py-4 sm:px-6">
        <span className="text-fg/90">{networkPanel.title}</span>
        <span className="mono hidden text-muted sm:inline">{networkPanel.meta}</span>
        <span className="mono ml-auto flex items-center gap-2 text-accent">
          <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {networkPanel.status}
        </span>
      </div>

      <div className="flex gap-3 px-4 pt-5 pb-3 sm:gap-5 sm:px-6">
        <ul className="hidden shrink-0 flex-col gap-2 sm:flex" aria-hidden="true">
          {tools.map((d, i) => (
            <li key={d} className={`tile size-8 ${i === 0 ? 'text-fg' : 'text-muted'}`}>
              <svg viewBox="0 0 19 19" className="size-3.5" fill={i === 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d={d} />
              </svg>
            </li>
          ))}
        </ul>

        <div className="@container relative min-w-0 flex-1">
          <span className="mono absolute top-0 right-0 rounded-md border border-white/[0.08] px-2 py-0.5 text-[11px] text-muted" aria-hidden="true">
            {networkPanel.zoom}
          </span>
          <div className="relative mt-6 aspect-[600/280] text-[clamp(9px,2.15cqw,13.5px)]">
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
              {Object.values(edges).map((d) => (
                <path key={d} d={d} fill="none" stroke="rgb(200 255 46 / 0.45)" strokeWidth="1.2" />
              ))}
              {[
                [112, 140],
                [200, 62],
                [372, 62],
                [200, 218],
                [372, 218],
                [440, 140],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.2" fill="#0c0d0b" stroke="rgb(237 237 239 / 0.7)" strokeWidth="1.2" />
              ))}
              <Packet path={edges.lab} begin="0s" />
              <Packet path={edges.labOut} begin="1s" />
              <Packet path={edges.home} begin="1.8s" />
              <Packet path={edges.homeOut} begin="2.8s" />
            </svg>
            <span className="mono absolute rounded-md border border-white/10 bg-[#101209] px-[0.55em] py-[0.15em] text-[0.85em] text-fg/70" style={{ left: '22%', top: '24%' }}>
              {networkPanel.edges.lab}
            </span>
            <span className="mono absolute rounded-md border border-white/10 bg-[#101209] px-[0.55em] py-[0.15em] text-[0.85em] text-fg/70" style={{ left: '22%', top: '66%' }}>
              {networkPanel.edges.home}
            </span>
            <Node x={-34} y={140} w={146} title={nodes.entry.title} sub={nodes.entry.sub} className="z-10" />
            <Node x={200} y={62} w={172} title={nodes.lab.title} sub={nodes.lab.sub} />
            <Node x={200} y={218} w={172} title={nodes.home.title} sub={nodes.home.sub} />
            <Node x={440} y={140} w={160} title={nodes.host.title} sub={nodes.host.sub} />
            <span
              className="mono absolute flex items-center gap-[0.4em] rounded-md border border-white/10 bg-[#101209] px-[0.6em] py-[0.2em] text-[0.85em] text-fg/70"
              style={{ left: `${(452 / W) * 100}%`, top: `${(178 / H) * 100}%` }}
            >
              <span className="size-[0.45em] rounded-full bg-accent" aria-hidden="true" />
              {networkPanel.edges.host}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-5 pt-4 pb-5 sm:px-6">
        <p className="mono text-muted">{networkPanel.logTitle}</p>
        <NetworkLog />
      </div>
    </div>
  )
}
