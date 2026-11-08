import { useIsDesktop } from '../hooks/useMediaQuery';
import { cx } from '../lib/cx';
import { scrollToSection } from '../lib/scroll';
import { ArrowUpRight, EyeOff, FileText, Layers, PercentLarge, Users } from './ui/icons';
import { Reveal } from './ui/Reveal';
import {
  SectionHeader,
  anchorClass,
  containerClass,
  kickerClass,
  leadClass,
  sectionSpacing,
} from './ui/SectionHeader';

const fields = [
  {
    icon: Layers,
    // Soft hyphens (­) mirror the design's manual break points.
    title: 'Zu viel Komplexität',
    text: 'Tarife, Anbieter, Fristen: Jedes Benefit-Projekt kostet mehr Zeit und Budget als geplant.',
  },
  {
    icon: FileText,
    title: 'Hoher Verwaltungs­aufwand',
    text: 'HR und Geschäftsführung pflegen Excel-Listen, statt zu führen.',
  },
  {
    icon: Users,
    title: 'Fehlende Attraktivität',
    text: 'Benefits sind da, aber kaum sichtbar oder am Bedarf des Teams vorbei.',
  },
  {
    icon: EyeOff,
    title: 'Keine Transparenz',
    text: 'Mitarbeitende wissen nicht, was ihnen zusteht und wie sie es abrufen.',
  },
  {
    icon: PercentLarge,
    title: 'Ungenutzte Steuer­vorteile',
    text: 'Förderungen und Freibeträge bleiben liegen. Geld, das im Unternehmen bleiben könnte.',
  },
];

export default function ProblemSection() {
  const desktop = useIsDesktop();

  return (
    <section
      id="herausforderung"
      tabIndex={-1}
      aria-labelledby="herausforderung-title"
      className={cx(anchorClass, containerClass, sectionSpacing)}
    >
      <SectionHeader
        eyebrow="Die Ausgangslage"
        titleId="herausforderung-title"
        title="Benefits sind relevanter denn je. Ein System dahinter haben die wenigsten."
        align="start"
      >
        {desktop ? (
          <div className="flex flex-col gap-[18px] pt-11">
            <p className={cx(leadClass, 'text-navy/68')}>
              Viele Unternehmen wissen, dass Benefits Bindung, Gesundheit und Produktivität stärken.
              In der Praxis fehlt es an Zeit, Know-how und Struktur.
            </p>
            <span className={kickerClass}>— Fünf Felder, die wir in jedem Erstgespräch prüfen</span>
          </div>
        ) : (
          <p className={cx(leadClass, 'text-navy/68')}>
            In der Praxis fehlt es an Zeit, Know-how und Struktur. Fünf Felder, die wir in jedem
            Erstgespräch prüfen:
          </p>
        )}
      </SectionHeader>

      {desktop ? (
        <ol className="mt-[72px] grid grid-cols-5">
          {fields.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="contents">
              <Reveal
                className={cx(
                  'flex flex-col gap-[18px]',
                  i === 0 && 'pr-[clamp(16px,2vw,28px)]',
                  i > 0 && i < fields.length - 1 && 'border-l border-navy/12 px-[clamp(16px,2vw,28px)]',
                  i === fields.length - 1 && 'border-l border-navy/12 pl-[clamp(16px,2vw,28px)]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold leading-none text-gold-dark">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icon className="text-navy" />
                </div>
                <h3
                  lang="de"
                  className="mt-2 hyphens-auto break-words text-[clamp(20px,2vw,26px)] font-medium leading-[1.08] tracking-[-0.035em]"
                >
                  {title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.5] text-navy/64 max-xl:hyphens-auto">{text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="mt-8 flex flex-col">
          {fields.map(({ title, text }, i) => (
            <li
              key={title}
              className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-0 gap-y-1 border-t border-navy/12 py-[22px]"
            >
              <span className="text-[14px] font-semibold leading-[1.6] text-gold-dark">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[22px] font-medium leading-[1.15] tracking-[-0.03em]">
                {title.replace('­', '')}
              </h3>
              <span />
              <p className="mt-1.5 text-[16px] leading-[1.5] text-navy/64">{text}</p>
            </li>
          ))}
        </ol>
      )}

      <ConsequencesCard desktop={desktop} />
    </section>
  );
}

const consequences = [
  ['Steigende Fehlzeiten und Produktivitätsverlust', 'Steigende Fehlzeiten, sinkende Produktivität'],
  ['Nachteil im Wettbewerb um Fachkräfte', 'Nachteil im Wettbewerb um Fachkräfte'],
  ['Geringere Bindung, höhere Fluktuation', 'Geringere Bindung, höhere Fluktuation'],
  ['Ungenutzte Förderungen und Steuervorteile', 'Ungenutzte Förderungen und Steuervorteile'],
];

function ConsequencesCard({ desktop }: { desktop: boolean }) {
  return (
    <Reveal className="surface-dark mt-12 overflow-hidden rounded-[28px] bg-navy text-cream lg:mt-[88px] lg:rounded-[32px]">
      <div className="flex items-center justify-between gap-4 border-b border-cream/10 px-[22px] py-[18px] text-[11px] font-semibold uppercase leading-[1.3] tracking-[0.08em] lg:px-10 lg:py-6 lg:text-[13px] lg:leading-none">
        <span className="text-gold-light">Wenn nichts passiert</span>
        {desktop ? (
          <span className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold-light" />
            Jeder Fehltag ≈ 144 € Produktionsausfall · BAuA
          </span>
        ) : (
          <span className="text-right">≈ 144 € je Fehltag · BAuA</span>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start lg:gap-[clamp(32px,5vw,80px)] lg:px-10 lg:pb-10 lg:pt-14">
        <div className="flex flex-col gap-[18px] px-[22px] pb-[22px] pt-[30px] lg:gap-6 lg:p-0 lg:pt-2">
          <h2 className="m-0 text-[40px] font-medium leading-[0.98] tracking-[-0.05em] lg:text-[clamp(44px,4.8vw,72px)]">
            Stillstand wird teuer.
          </h2>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.55] text-cream/76 lg:text-[19px]">
            {desktop
              ? 'Fehlende Struktur bei Gesundheits- und Vorsorgeleistungen führt zu messbaren Nachteilen, für das Unternehmen und das ganze Team.'
              : 'Fehlende Struktur führt zu messbaren Nachteilen, für das Unternehmen und das ganze Team.'}
          </p>
          <div>
            <button
              type="button"
              onClick={() => scrollToSection('termin')}
              className="mt-1.5 flex h-14 w-full items-center justify-between gap-3 rounded-full bg-cream pl-6 pr-[22px] text-[17px] font-medium leading-none text-navy transition-colors hover:bg-white sm:w-auto lg:mt-3 lg:inline-flex lg:pl-7 lg:pr-6"
            >
              Potenzial prüfen lassen
              <ArrowUpRight className="text-gold-dark" />
            </button>
          </div>
        </div>

        <div className="mx-2.5 mb-2.5 rounded-[20px] bg-gold-gradient px-5 pb-1.5 pt-5 text-navy lg:m-0 lg:rounded-[26px] lg:px-8 lg:pb-3 lg:pt-[30px]">
          <div className="flex items-center justify-between border-b border-navy/16 pb-[14px] lg:pb-5">
            <span className="text-[12px] font-semibold uppercase leading-none tracking-[0.08em] lg:text-[13px]">
              Die Folgen
            </span>
            <span className="text-[24px] font-medium leading-none tracking-[-0.04em] lg:text-[32px]">04</span>
          </div>
          <ol>
            {consequences.map(([long, short], i) => (
              <li
                key={long}
                className={cx(
                  'grid grid-cols-[44px_minmax(0,1fr)] items-center py-4 lg:grid-cols-[56px_minmax(0,1fr)] lg:py-5',
                  i < consequences.length - 1 && 'border-b border-navy/16'
                )}
              >
                <span className="text-[22px] font-medium leading-none tracking-[-0.04em] lg:text-[30px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[16px] font-medium leading-[1.35] lg:text-[17px]">
                  {desktop ? long : short}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Reveal>
  );
}
