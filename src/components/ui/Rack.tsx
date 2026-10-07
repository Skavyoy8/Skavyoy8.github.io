import { vars } from '@/components/ui/Primitives'
import { homelab, type RackUnit } from '@/content/homelab'

// Hauteurs des barres de l'écran (btop), fixes pour un rendu identique serveur / client.
const BARS = [62, 38, 80, 54, 90, 46, 70, 30, 84, 58, 42, 76, 50, 66]

function Face({ unit }: { unit: RackUnit }) {
  switch (unit.id) {
    case 'screen':
      return (
        <>
          <span className="mono w-10 shrink-0 text-[0.6rem] leading-tight text-cold/80">btop</span>
          <span className="screen">
            {BARS.map((v, i) => (
              <i key={i} style={vars({ '--v': `${v}%`, '--d': `${-i * 0.37}s` })} />
            ))}
          </span>
        </>
      )
    case 'patch':
      return (
        <span className="flex flex-1 justify-between">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className="port !h-[0.5rem] !w-[0.62rem]" />
          ))}
        </span>
      )
    case 'switch':
      return (
        <>
          <span className="mono hidden w-16 shrink-0 text-[0.6rem] text-muted sm:block">MokerLink</span>
          <span className="flex flex-1 items-center justify-between gap-1">
            {Array.from({ length: 8 }, (_, i) => (
              <span key={i} className="flex flex-col items-center gap-1">
                <span className={`led ${i < 3 ? 'led-blink' : 'opacity-20'} !size-[3px]`} style={vars({ '--d': `${i * 0.21}s` })} />
                <span className="port" />
              </span>
            ))}
          </span>
          <span className="flex flex-col items-center gap-1 border-l border-white/10 pl-2">
            <span className="led led-cold led-blink !size-[3px]" style={vars({ '--d': '0.4s' })} />
            <span className="port !w-[1.1rem]" />
          </span>
        </>
      )
    case 'server':
      return (
        <>
          <span className="flex flex-col gap-1.5">
            <span className="text-[0.8rem] font-semibold tracking-tight">MS-01</span>
            <span className="mono text-[0.6rem] text-muted">proxmox</span>
          </span>
          <span className="vents mx-2" />
          <span className="flex flex-col items-center gap-2">
            <span className="led" />
            <span className="led led-cold led-blink" style={vars({ '--d': '0.2s' })} />
          </span>
        </>
      )
    case 'reserve':
      return <span className="mono flex-1 text-center text-[0.65rem] text-muted">réserve · futur NAS</span>
    case 'vent':
      return <span className="vents" />
    default:
      return null
  }
}

/** Vue de face du rack 8U, en HTML et CSS : chaque unité à sa vraie hauteur. */
export function Rack({ className = '' }: { className?: string }) {
  const router = homelab.units.find((unit) => unit.heightU === 0)
  const placed = homelab.units.filter((unit) => unit.heightU > 0)
  return (
    <div role="img" aria-label={`Plan du rack : ${homelab.rack}`} className={`mx-auto w-full max-w-[26rem] ${className}`}>
      {router ? (
        <div className="rack-router mx-auto mb-2 flex h-9 w-1/2 items-center justify-between rounded-lg border border-dashed border-white/20 bg-[#101013] px-3">
          <span className="mono text-[0.6rem] text-muted">GL.iNet</span>
          <span className="flex gap-1">
            <span className="led !size-[3px]" />
            <span className="led led-cold led-blink !size-[3px]" />
          </span>
        </div>
      ) : null}
      <div className="rack">
        {placed.map((unit) => (
          <div
            key={unit.id}
            className="rack-unit"
            data-unit={unit.id}
            data-phase={unit.phase}
            data-main={unit.id === 'server' ? '' : undefined}
            style={vars({ '--h': unit.heightU })}
          >
            <div className="rack-face">
              <Face unit={unit} />
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-[86%] justify-between" aria-hidden="true">
        <span className="h-2 w-8 rounded-b-md bg-[#18181c]" />
        <span className="h-2 w-8 rounded-b-md bg-[#18181c]" />
      </div>
    </div>
  )
}
