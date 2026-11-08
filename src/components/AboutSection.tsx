// TODO(foto): Replace with the second photo (Cedrik im Kundengespräch / Teamfoto) once delivered.
// Until then the founder portrait stands in, exactly like the drop slot in the design prototype.
import aboutImage from '../images/cedrik-leibinn-hero-1400.webp';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { cx } from '../lib/cx';
import { pad2 } from '../lib/format';
import { Reveal } from './ui/Reveal';
import { SectionHeader, anchorClass, containerClass, kickerClass, leadClass, sectionSpacing } from './ui/SectionHeader';

const points = [
  ['Passend statt Standard', 'Ein Modell, das Ihre Ziele, Ihr Team und Ihre Strukturen berücksichtigt.'],
  ['Weniger Aufwand im Alltag', 'Administration, Kommunikation und Einführung übernehmen wir.'],
  ['Spürbare Wirkung im Team', 'Weniger Ausfälle, mehr Zufriedenheit, bessere Bindung.'],
  ['Steuerlich sinnvoll genutzt', 'Förderungen so kombiniert, dass Ihr Budget dort ankommt, wo es wirkt.'],
  ['Für kleine Teams und KMU', 'Ob drei oder dreißig Mitarbeitende: Das System bleibt flexibel.'],
  ['Persönlich und digital', 'Ein fester Ansprechpartner, unterstützt durch klare digitale Prozesse.'],
];

export default function AboutSection() {
  const desktop = useIsDesktop();

  return (
    <section
      id="ueber"
      tabIndex={-1}
      aria-labelledby="ueber-title"
      className={cx(anchorClass, containerClass, sectionSpacing)}
    >
      <SectionHeader
        eyebrow="Über uns"
        titleId="ueber-title"
        title="Ein Ansprechpartner, der Ihr Unternehmen kennt."
        align="start"
        className="lg:border-b lg:border-navy/12 lg:pb-14"
      >
        {desktop ? (
          <div className="flex flex-col gap-[18px] pt-11">
            <p className={cx(leadClass, 'text-navy/68')}>
              Ein Benefitsystem braucht Klarheit, einfache Abläufe und jemanden, der Sie sicher durch
              den Prozess führt. Genau das liefern wir: maßgeschneidert, verständlich und mit Blick auf
              Ihren Alltag.
            </p>
            <span className={kickerClass}>— Cedrik Leibinn, Gründer</span>
          </div>
        ) : (
          <p className={cx(leadClass, 'text-navy/68')}>
            Klarheit, einfache Abläufe und jemand, der Sie sicher durch den Prozess führt:
            maßgeschneidert und mit Blick auf Ihren Alltag.
          </p>
        )}
      </SectionHeader>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <Reveal className="mt-7 lg:mt-0 lg:border-r lg:border-navy/12 lg:pr-12 lg:pt-12">
          <figure className="relative m-0 h-[440px] overflow-hidden rounded-[24px] bg-[#E9E6DD] lg:h-[560px] lg:rounded-[28px]">
            <img
              src={aboutImage}
              alt="Cedrik Leibinn"
              loading="lazy"
              data-todo="replace-with-client-meeting-photo"
              className="absolute inset-0 block h-full w-full object-cover object-[50%_14%]"
            />
            <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-[18px] bg-cream-light/92 px-[18px] py-4 backdrop-blur-[10px] lg:inset-x-4 lg:bottom-4 lg:rounded-[20px] lg:px-[22px] lg:py-[18px]">
              <span className="flex flex-col gap-1.5">
                <span className="text-[19px] font-medium leading-none tracking-[-0.02em] lg:text-[20px]">
                  Cedrik Leibinn
                </span>
                <span className="text-[14px] leading-none text-navy/60">Gründer, Leibinn Consulting</span>
              </span>
              <span aria-hidden="true" className="hidden h-2.5 w-2.5 rounded-full bg-gold lg:block" />
            </figcaption>
          </figure>
        </Reveal>

        {desktop ? (
          <ol className="grid grid-cols-2 content-start gap-x-10 pl-12 pt-12">
            {points.map(([title, text], i) => (
              <li key={title} className="contents">
                <Reveal
                  className={cx(
                    'flex flex-col gap-3',
                    i < 2 ? 'pb-8' : 'py-8',
                    i < 4 && 'border-b border-navy/10'
                  )}
                >
                  <span className="text-[14px] font-semibold leading-none text-gold-dark">{pad2(i + 1)}</span>
                  <h3 className="text-[24px] font-medium leading-[1.1] tracking-[-0.03em]">{title}</h3>
                  <p className="text-[15px] leading-[1.5] text-navy/64">{text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        ) : (
          <ol className="mt-3 flex flex-col">
            {points.map(([title, text], i) => (
              <li
                key={title}
                className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-0 gap-y-1 border-b border-navy/10 py-5"
              >
                <span className="text-[14px] font-semibold leading-[1.5] text-gold-dark">{pad2(i + 1)}</span>
                <h3 className="text-[20px] font-medium leading-[1.15] tracking-[-0.025em]">{title}</h3>
                <span />
                <p className="mt-1.5 text-[15px] leading-[1.5] text-navy/64">{text}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
