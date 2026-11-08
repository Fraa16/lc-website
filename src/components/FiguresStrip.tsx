import { useIsDesktop } from '../hooks/useMediaQuery';
import { cx } from '../lib/cx';
import { CountUp, Reveal } from './ui/Reveal';

const figures = [
  {
    // Non-breaking space keeps "Mrd. €" together when the figure wraps on desktop.
    value: '134 Mrd.\u00A0€',
    label: 'Produktionsausfall durch Krankheit in Deutschland',
    labelMobile: 'Produktionsausfall durch Krankheit',
    source: 'BAuA · 2024',
    sourceMobile: 'BAuA · 2024',
  },
  {
    value: '19,5 Tage',
    label: 'Fehlzeit pro Beschäftigtem und Jahr',
    labelMobile: 'Fehlzeit pro Kopf und Jahr',
    source: 'DAK-Gesundheitsreport · 2025',
    sourceMobile: 'DAK · 2025',
  },
  {
    value: '600 €',
    label: 'pro Person und Jahr steuerfrei für Gesundheit',
    labelMobile: 'pro Person und Jahr steuerfrei',
    source: '§ 3 Nr. 34 EStG',
    sourceMobile: '§ 3 Nr. 34 EStG',
  },
  {
    value: '50 €',
    label: 'steuerfreier Sachbezug pro Monat und Kopf',
    labelMobile: 'Sachbezug pro Monat und Kopf',
    source: '§ 8 Abs. 2 S. 11 EStG',
    sourceMobile: '§ 8 Abs. 2 EStG',
  },
];

// Mobile is a 2×2 grid, desktop a single row of four.
const cellBorders = [
  'border-b lg:border-b-0',
  'border-b border-l lg:border-b-0',
  'lg:border-l',
  'border-l',
];

export default function FiguresStrip() {
  const desktop = useIsDesktop();

  return (
    <section
      aria-label="Zahlen und Fakten"
      className="mx-auto max-w-[1280px] px-5 pt-5 sm:px-[clamp(24px,4vw,56px)] lg:pt-6"
    >
      <Reveal className="grid grid-cols-2 rounded-[24px] border border-navy/12 lg:grid-cols-4 lg:rounded-[28px]">
        {figures.map((f, i) => (
          <div
            key={f.value}
            className={cx(
              'flex min-w-0 flex-col gap-2 border-navy/12 px-[18px] py-6 lg:gap-3 lg:px-[clamp(20px,2.5vw,36px)] lg:py-10 xl:px-9',
              cellBorders[i]
            )}
          >
            <CountUp
              value={f.value}
              className="whitespace-nowrap text-[30px] font-medium leading-none tracking-[-0.05em] tabular-nums lg:whitespace-normal lg:text-[clamp(40px,4vw,58px)]"
            />
            <span className="text-[14px] leading-[1.35] text-navy/68 lg:text-[16px] lg:leading-[1.4]">
              {desktop ? f.label : f.labelMobile}
            </span>
            <span className="text-[11px] font-semibold uppercase leading-[1.3] tracking-[0.06em] text-gold-dark lg:mt-1.5 lg:tracking-[0.08em] xl:leading-none">
              {desktop ? f.source : f.sourceMobile}
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
