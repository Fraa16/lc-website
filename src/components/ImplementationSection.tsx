import { useIsDesktop } from '../hooks/useMediaQuery';
import { cx } from '../lib/cx';
import { ArrowRight } from './ui/icons';
import { Reveal } from './ui/Reveal';
import {
  SectionHeader,
  anchorClass,
  containerClass,
  h2Large,
  kickerClass,
  leadClass,
  sectionSpacing,
} from './ui/SectionHeader';

const steps = [
  {
    tag: '01 / GESPRÄCH',
    title: 'Erstgespräch führen',
    text: '30 Minuten per Video oder Telefon. Wir klären Ausgangslage, Ziele und Teamgröße.',
    textMobile: '30 Minuten per Video oder Telefon. Wir klären Ausgangslage, Ziele und Teamgröße.',
  },
  {
    tag: '02 / ANALYSE',
    title: 'Potenzial prüfen',
    text: 'Wir prüfen bestehende Strukturen und steuerliche Möglichkeiten und zeigen, welche Benefits wirklich wirken.',
    textMobile:
      'Wir prüfen bestehende Strukturen und steuerliche Möglichkeiten und zeigen, welche Benefits wirklich wirken.',
  },
  {
    tag: '03 / SYSTEM',
    title: 'System einrichten',
    text: 'Passende Gesundheits- und Vorsorgebausteine, zentrale Verwaltung, digitale Prozesse. Alles aus einer Hand.',
    textMobile: 'Passende Bausteine, zentrale Verwaltung, digitale Prozesse. Alles aus einer Hand.',
  },
  {
    tag: '04 / TEAM',
    title: 'Mitarbeitende onboarden',
    text: 'Wir erklären die Leistungen verständlich und sorgen dafür, dass Ihr Team sie tatsächlich nutzt.',
    textMobile: 'Wir erklären die Leistungen verständlich und sorgen dafür, dass Ihr Team sie nutzt.',
  },
];

const pathPoints = ['Analyse & Konzept', 'Einrichtung aus einer Hand', 'Laufende Betreuung'];

export default function ImplementationSection() {
  const desktop = useIsDesktop();

  return (
    <section
      id="ablauf"
      tabIndex={-1}
      aria-labelledby="ablauf-title"
      className={cx(anchorClass, containerClass, sectionSpacing)}
    >
      <SectionHeader
        eyebrow="So läuft es ab"
        titleId="ablauf-title"
        title="Vier Schritte. Ein System, das läuft."
        titleClassName={cx(h2Large, 'text-[40px] leading-none lg:leading-[0.98]')}
      >
        {desktop ? (
          <div className="flex flex-col gap-4">
            <p className={cx(leadClass, 'text-navy/68')}>
              Wir übernehmen die komplette Einführung, von der Analyse bis zur laufenden Betreuung.
              Ihr interner Aufwand bleibt bei wenigen Stunden.
            </p>
            <span className={kickerClass}>Gespräch / Analyse / Einrichtung / Onboarding</span>
          </div>
        ) : (
          <p className={cx(leadClass, 'text-navy/68')}>
            Wir übernehmen die komplette Einführung. Ihr interner Aufwand bleibt bei wenigen Stunden.
          </p>
        )}
      </SectionHeader>

      {desktop ? (
        <div className="mt-16 grid grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] items-stretch gap-5">
          <Reveal className="surface-dark flex flex-col rounded-[28px] bg-navy p-10 text-cream">
            <span className="text-[13px] font-semibold uppercase leading-none tracking-[0.08em]">
              Ihr Weg zum System
            </span>
            <span className="mt-9 text-[clamp(64px,6.4vw,96px)] font-medium leading-[0.9] tracking-[-0.06em] text-gold-light">
              01–04
            </span>
            <p className="mt-7 text-[18px] leading-[1.5] text-cream/82">
              Vom ersten Gespräch bis zum Team, das seine Benefits kennt und nutzt.
            </p>
            <ul className="mt-auto flex flex-col gap-4 border-t border-gold-light/25 pt-7 text-[16px] leading-none">
              {pathPoints.map((p) => (
                <li key={p} className="flex items-center gap-[14px]">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-cream" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="flex flex-col rounded-[28px] border border-navy/12 bg-cream-light">
            <ol>
              {steps.map((s, i) => (
                <li
                  key={s.tag}
                  className={cx(
                    'grid grid-cols-[170px_minmax(0,1fr)_40px] items-center gap-6 px-9 py-8',
                    i < steps.length - 1 && 'border-b border-navy/10'
                  )}
                >
                  <StepBadge>{s.tag}</StepBadge>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[28px] font-medium leading-[1.1] tracking-[-0.035em]">{s.title}</h3>
                    <p className="text-[16px] leading-[1.5] text-navy/64">{s.text}</p>
                  </div>
                  <ArrowRight className="text-gold" />
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      ) : (
        <Reveal className="mt-7 rounded-[24px] border border-navy/12 bg-cream-light">
          <ol>
            {steps.map((s, i) => (
              <li
                key={s.tag}
                className={cx(
                  'flex flex-col gap-3 px-5 py-[22px]',
                  i < steps.length - 1 && 'border-b border-navy/10'
                )}
              >
                <StepBadge mobile>{s.tag}</StepBadge>
                <h3 className="text-[22px] font-medium leading-[1.15] tracking-[-0.03em]">{s.title}</h3>
                <p className="text-[16px] leading-[1.5] text-navy/64">{s.textMobile}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      )}
    </section>
  );
}

function StepBadge({ children, mobile = false }: { children: string; mobile?: boolean }) {
  return (
    <span
      className={cx(
        'flex items-center rounded-full border border-gold/50 bg-gold-light/16 font-semibold leading-none tracking-[0.06em] text-gold-dark',
        mobile ? 'h-[34px] self-start px-[14px] text-[12px]' : 'h-[42px] justify-center text-[13px]'
      )}
    >
      {children}
    </span>
  );
}
