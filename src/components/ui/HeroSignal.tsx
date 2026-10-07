/** Une fine ligne de signal qui ondule lentement derrière le titre (SVG + CSS, figée en mode calme). */
function wave(periods: number, amplitude: number, width = 2880, height = 160) {
  const steps = periods * 24
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width
    const y = height / 2 - Math.sin((i / steps) * periods * Math.PI * 2) * amplitude
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)} `
  }
  return d
}

const main = wave(8, 34)
const echo = wave(12, 18)

export function HeroSignal() {
  return (
    <div className="hero-signal pointer-events-none absolute inset-x-0 top-[24%] h-40 overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 2880 160" preserveAspectRatio="none" className="hero-signal-track hero-signal-slow h-full w-[200%]">
        <path d={main} fill="none" stroke="#6ae4ff" strokeOpacity="0.28" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg viewBox="0 0 2880 160" preserveAspectRatio="none" className="hero-signal-track hero-signal-fast absolute inset-0 h-full w-[200%]">
        <path d={echo} fill="none" stroke="#c8ff2e" strokeOpacity="0.16" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
