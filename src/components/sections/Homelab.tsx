import { delay, SectionHead, vars } from '@/components/ui/Primitives'
import { Rack } from '@/components/ui/Rack'
import { homelab } from '@/content/homelab'

const format = (n: number) => String(n).replace('.', ',')

export function Homelab() {
  const s = homelab.section
  const ramUsed = homelab.services.always.reduce((sum, item) => sum + item.ram, 0)
  return (
    <section id="homelab" aria-labelledby="homelab-title" className="homelab container-x relative py-28 sm:py-36">
      <SectionHead id="homelab-title" index={s.index} command={s.command} title={s.title} intro={s.intro}>
        <p className="mono mt-5 flex items-center gap-2 text-fg/80">
          <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {homelab.status}
        </p>
      </SectionHead>

      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32" data-reveal>
            <Rack />
            <p className="mono mt-6 text-center text-muted">{homelab.rack}</p>
          </div>
        </div>

        <ol className="card divide-y divide-line self-start lg:col-span-7" aria-label={s.rackLabel} data-reveal style={delay(0.1)}>
          {homelab.units.map((unit) => (
            <li key={unit.id} data-unit-row={unit.id} className="group grid grid-cols-[4.75rem_1fr] gap-x-4 px-6 py-5 transition-colors hover:bg-white/[0.025]">
              <span className="mono pt-1 text-muted transition-colors group-hover:text-accent">
                {unit.heightU ? `${format(unit.heightU)}U` : homelab.labels.onTop}
              </span>
              <div>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-medium text-fg/95">
                  {unit.name}
                  <span className={`tag !py-0 ${unit.phase === 1 ? 'border-accent/30 text-accent' : ''}`}>
                    {unit.phase === 1 ? homelab.labels.phase1 : homelab.labels.phase2}
                  </span>
                </p>
                <p className="mt-1 text-[0.9rem] text-muted">{unit.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="card p-6 sm:p-8" data-reveal>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[1.35rem] font-medium tracking-tight">{s.servicesTitle}</h3>
            <span className="label text-accent">{homelab.labels.always}</span>
          </div>
          <div className="mt-5">
            <div className="ram-bar h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <span className="block h-full rounded-full bg-gradient-to-r from-cold to-accent" style={vars({ '--ram': ramUsed / homelab.ram.total })} />
            </div>
            <p className="mono mt-2 text-muted">{s.ramOf(format(ramUsed), homelab.ram.total)}</p>
          </div>
          <ul className="mt-6 divide-y divide-line">
            {homelab.services.always.map((service) => (
              <li key={service.name} className="flex items-baseline justify-between gap-4 py-3">
                <span>
                  <span className="text-fg/90">{service.name}</span>
                  <span className="block text-[0.85rem] text-muted">{service.role}</span>
                </span>
                <span className="mono shrink-0 text-muted">{format(service.ram)} Go</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div className="card p-6 sm:p-8" data-reveal style={delay(0.08)}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[1.35rem] font-medium tracking-tight">{s.onDemandTitle}</h3>
              <span className="label text-cold">{homelab.labels.onDemand}</span>
            </div>
            <ul className="mt-6 divide-y divide-line">
              {homelab.services.onDemand.map((service) => (
                <li key={service.name} className="flex items-baseline justify-between gap-4 py-3">
                  <span>
                    <span className="text-fg/90">{service.name}</span>
                    <span className="block text-[0.85rem] text-muted">{service.role}</span>
                  </span>
                  <span className="mono shrink-0 text-muted">{service.type}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card flex-1 p-6 sm:p-8" data-reveal style={delay(0.16)}>
            <h3 className="text-[1.35rem] font-medium tracking-tight">{s.linksTitle}</h3>
            <ul className="mt-5 space-y-3">
              {homelab.links.map((link) => (
                <li key={link.from} className="grid grid-cols-[1fr_auto] gap-x-4 text-[0.9rem]">
                  <span className="text-fg/85">
                    {link.from} <span className="text-muted">→ {link.to}</span>
                  </span>
                  <span className={`mono ${link.speed === '10G' ? 'text-accent' : 'text-muted'}`}>{link.speed}</span>
                  <span className="col-span-2 text-[0.82rem] text-muted">{link.role}</span>
                </li>
              ))}
            </ul>
            <p className="mono mt-6 flex items-center gap-2 text-fg/80">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {s.lanNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
