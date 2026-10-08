import { Caret, delay, vars } from '@/components/ui/Primitives'
import { type SkillVisual as Kind, visuals } from '@/content/pillars'

// Cases « ouvertes » du scan, fixes pour un rendu identique serveur / client.
const OPEN = [2, 9, 13, 20, 27, 30]

/** Scan de ports : une grille de ports, quelques-uns s'allument en citron. */
function Ports() {
  return (
    <div className="grid grid-cols-8 gap-1.5">
      {Array.from({ length: 32 }, (_, i) => {
        const open = OPEN.indexOf(i)
        return open >= 0 ? (
          <span key={i} className="port-cell size-4 rounded-[4px] bg-accent shadow-[0_0_12px_rgb(200_255_46/0.5)]" style={delay(open * 0.45)} />
        ) : (
          <span key={i} className="size-4 rounded-[4px] border border-white/10 bg-white/[0.02]" />
        )
      })}
    </div>
  )
}

/** Modèle OSI : sept couches, un paquet citron qui les descend une à une. */
function Osi() {
  return (
    <div className="relative w-56" style={vars({ '--step': '1.25rem' })}>
      <ol className="space-y-1">
        {visuals.osi.map((name, i) => (
          <li key={name} className="mono flex h-4 items-center gap-2.5 rounded-[4px] border border-white/[0.07] bg-white/[0.02] px-2 text-[0.6rem] leading-none text-muted">
            <span className="text-fg/60">{7 - i}</span>
            {name}
          </li>
        ))}
      </ol>
      <span className="osi-packet absolute top-0.5 right-1.5 h-3 w-7 rounded-[3px] bg-accent shadow-[0_0_14px_rgb(200_255_46/0.6)]" />
    </div>
  )
}

/** Shell : trois commandes et leur sortie, le curseur qui attend la suite. */
function Shell() {
  return (
    <div className="w-full max-w-60 rounded-xl border border-white/[0.08] bg-black/40 p-3.5 font-mono text-[0.68rem] leading-relaxed">
      {visuals.shell.map((line) => (
        <div key={line.cmd} className="mb-1.5">
          <p className="text-fg/90">
            <span className="text-accent">$</span> {line.cmd}
          </p>
          <p className="text-muted">{line.out}</p>
        </div>
      ))}
      <p>
        <span className="text-accent">$</span> <Caret className="h-3 w-1.5 translate-y-0.5" />
      </p>
    </div>
  )
}

/** Oscilloscope : l'onde analogique et sa version numérique défilent sur la grille. */
function Scope() {
  const analog = 'M0 34 C 25 6, 50 6, 75 34 S 125 62, 150 34 S 200 6, 225 34 S 275 62, 300 34'
  const digital = 'M0 112 H37 V86 H112 V112 H187 V86 H262 V112 H300'
  return (
    <div className="scope-grid relative h-36 w-full max-w-sm overflow-hidden rounded-xl border border-cold/20 bg-[#060b0d] shadow-[inset_0_0_30px_rgb(143_216_255/0.06)]">
      <div className="wave-track absolute inset-y-0 left-0 flex w-[200%]">
        {[0, 1].map((copy) => (
          <svg key={copy} viewBox="0 0 300 144" preserveAspectRatio="none" className="h-full w-1/2" fill="none">
            <path d={analog} stroke="rgb(220 225 235 / .8)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <path d={digital} stroke="#c8ff2e" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          </svg>
        ))}
      </div>
      <span className="label absolute top-2 left-3 text-[0.55rem] text-fg/60">{visuals.scope.analog}</span>
      <span className="label absolute bottom-2 left-3 text-[0.55rem] text-accent/80">{visuals.scope.digital}</span>
    </div>
  )
}

export function SkillVisual({ kind }: { kind: Kind }) {
  return (
    <div className="grid h-44 w-full place-items-center" aria-hidden="true">
      {kind === 'ports' ? <Ports /> : kind === 'osi' ? <Osi /> : kind === 'shell' ? <Shell /> : <Scope />}
    </div>
  )
}
