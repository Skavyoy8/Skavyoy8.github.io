import { delay, vars } from '@/components/ui/Primitives'
import type { SkillVisual as Kind } from '@/content/pillars'

/** Radar : un balayage citron qui tourne et trois échos qui s'allument à son passage. */
export function Radar({ className = 'size-36' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {[0, 1, 2].map((ring) => (
        <span key={ring} className="absolute rounded-full border border-white/[0.09]" style={{ inset: `${ring * 18}%` }} />
      ))}
      <span className="absolute inset-x-0 top-1/2 h-px bg-white/[0.06]" />
      <span className="absolute inset-y-0 left-1/2 w-px bg-white/[0.06]" />
      <span className="radar-sweep" />
      {[
        { x: 26, y: 30, d: 0.6 },
        { x: 70, y: 62, d: 2.1 },
        { x: 38, y: 74, d: 3.3 },
      ].map(({ x, y, d }) => (
        <span key={`${x}-${y}`} className="blip absolute size-1.5 rounded-full bg-accent shadow-[0_0_10px_#c8ff2e]" style={{ left: `${x}%`, top: `${y}%`, ...delay(d) }} />
      ))}
      <svg viewBox="0 0 24 24" className="absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 text-fg" fill="#0b0b0d" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 9.5 4.1-1.9 7-5.3 7-9.5V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  )
}

/** Réseau : des paquets circulent entre un routeur central et quatre machines. */
function Network() {
  const nodes = [
    [30, 26],
    [210, 26],
    [30, 124],
    [210, 124],
  ]
  return (
    <svg viewBox="0 0 240 150" className="h-36 w-auto" fill="none">
      <path d="M30 26H210V124H30Z" stroke="rgb(255 255 255 / .08)" />
      {nodes.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <path d={`M120 75L${x} ${y}`} stroke="rgb(255 255 255 / .12)" />
          <path className="flow" d={`M120 75L${x} ${y}`} stroke="#c8ff2e" strokeOpacity=".8" strokeLinecap="round" />
          <circle cx={x} cy={y} r="7" fill="#0b0b0d" stroke="rgb(143 216 255 / .7)" />
        </g>
      ))}
      <circle cx="120" cy="75" r="22" fill="rgb(200 255 46 / .06)" />
      <circle cx="120" cy="75" r="13" fill="#0b0b0d" stroke="#c8ff2e" strokeWidth="1.3" />
      <path d="M114 75h12M120 69v12" stroke="#c8ff2e" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

/** Couches : la machine, l'hyperviseur, les VM, empilés en perspective. */
function Layers() {
  return (
    <div className="relative h-36 w-44">
      {[2, 1, 0].map((level) => (
        <div key={level} className="layer absolute inset-x-0" style={{ top: `${level * 22 + 18}%`, ...delay(level * -0.8) }}>
          <div
            className={`mx-auto h-20 w-20 rounded-lg border ${level === 0 ? 'border-accent/60 bg-accent/[0.08]' : 'border-white/15 bg-white/[0.03]'}`}
            style={{ transform: 'rotateX(58deg) rotateZ(-45deg)' }}
          />
        </div>
      ))}
      <span className="layer mono absolute top-[24%] left-1/2 -translate-x-1/2 text-[0.95rem] font-semibold text-accent" style={vars({ '--d': '0s' })}>
        &gt;_
      </span>
    </div>
  )
}

/** Signal : l'onde analogique et sa version numérique défilent en boucle. */
function Wave() {
  const analog = 'M0 40 C 25 10, 50 10, 75 40 S 125 70, 150 40 S 200 10, 225 40 S 275 70, 300 40'
  const digital = 'M0 112 H37 V88 H112 V112 H187 V88 H262 V112 H300'
  return (
    <div className="relative h-36 w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)]">
      <div className="wave-track absolute inset-y-0 left-0 flex w-[200%]">
        {[0, 1].map((copy) => (
          <svg key={copy} viewBox="0 0 300 144" preserveAspectRatio="none" className="h-full w-1/2" fill="none">
            <path d={analog} stroke="rgb(220 225 235 / .75)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <path d={digital} stroke="#c8ff2e" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          </svg>
        ))}
      </div>
      <span className="label absolute top-0 left-[18%] text-[0.6rem] text-muted">analogique</span>
      <span className="label absolute bottom-0 left-[18%] text-[0.6rem] text-accent/80">numérique</span>
    </div>
  )
}

export function SkillVisual({ kind }: { kind: Kind }) {
  return (
    <div className="grid h-44 place-items-center" aria-hidden="true">
      {kind === 'radar' ? <Radar /> : kind === 'network' ? <Network /> : kind === 'layers' ? <Layers /> : <Wave />}
    </div>
  )
}
