import { useState } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { cx } from '../lib/cx';
import { ArrowUpRight } from './ui/icons';
import { Reveal } from './ui/Reveal';
import { SectionHeader, anchorClass, containerClass, h2Large, leadClass } from './ui/SectionHeader';

const modules = [
  {
    tag: 'Struktur',
    title: 'Klare Struktur & Transparenz',
    effect: 'Alles in einem System, für alle nachvollziehbar.',
    detail:
      'Alle Benefits in einem strukturierten, verständlichen System. HR, Führungskräfte und Mitarbeitende sehen sofort, was gilt und wie es funktioniert.',
    detailMobile:
      'Alle Benefits in einem strukturierten, verständlichen System. HR, Führungskräfte und Mitarbeitende sehen sofort, was gilt.',
  },
  {
    tag: 'Steuer',
    title: 'Steuerlich optimierte Vorteile',
    effect: 'Mehr Wirkung pro investiertem Euro.',
    detail:
      'Wir nutzen relevante Fördermodelle und Steuervorteile, etwa den Freibetrag für Gesundheitsförderung und steuerfreie Sachbezüge, damit Leistungen budgeteffizient wirken.',
    detailMobile:
      'Wir nutzen relevante Fördermodelle und Steuervorteile, etwa den Freibetrag für Gesundheitsförderung und steuerfreie Sachbezüge.',
  },
  {
    tag: 'Gesundheit',
    title: 'Gesundheits- & Vorsorgeleistungen',
    effect: 'Weniger Ausfälle, mehr Sicherheit im Team.',
    detail:
      'Ein starkes Portfolio aus Gesundheits-, Präventions- und Vorsorgebausteinen, flexibel für jedes Teammitglied nutzbar.',
    detailMobile:
      'Ein starkes Portfolio aus Gesundheits-, Präventions- und Vorsorgebausteinen, flexibel für jedes Teammitglied nutzbar.',
  },
  {
    tag: 'Prozess',
    title: 'Digitale, schlanke Abläufe',
    effect: 'Kein Zusatzaufwand für HR.',
    detail:
      'Von Anmeldung bis Abrechnung laufen die Prozesse digital. Ein- und Austritte, Fristen und Dokumentation übernehmen wir.',
    detailMobile:
      'Von Anmeldung bis Abrechnung laufen die Prozesse digital. Ein- und Austritte, Fristen und Dokumentation übernehmen wir.',
  },
];

const desktopGrid = 'grid grid-cols-[110px_minmax(0,1.4fr)_minmax(0,1fr)_140px]';

export default function BenefitSystemSection() {
  const desktop = useIsDesktop();
  const [open, setOpen] = useState(-1);
  const toggle = (i: number) => setOpen((cur) => (cur === i ? -1 : i));

  return (
    <section
      id="system"
      tabIndex={-1}
      aria-labelledby="system-title"
      className={cx(anchorClass, 'surface-dark mt-[88px] bg-navy text-cream lg:mt-[clamp(96px,10vw,144px)]')}
    >
      <div className={cx(containerClass, 'py-20 lg:py-[clamp(96px,10vw,136px)]')}>
        <SectionHeader
          eyebrow="Das Benefit-System"
          titleId="system-title"
          title="Ein System. Vier Bausteine."
          titleClassName={cx(h2Large, 'text-[44px]')}
          dark
        >
          {desktop ? (
            <div className="flex flex-col items-start gap-6">
              <p className={cx(leadClass, 'text-cream/72')}>
                Wir verbinden die wirkungsvollsten Gesundheits- und Vorsorgeleistungen: klar
                strukturiert, steuerlich optimiert, nachhaltig wirksam.
              </p>
              <span className="flex h-11 items-center gap-2.5 rounded-full border border-cream/20 px-5 text-[13px] font-semibold uppercase leading-none tracking-[0.08em]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold-light" />
                04 Bausteine · ein Ansprechpartner
              </span>
            </div>
          ) : (
            <p className={cx(leadClass, 'text-cream/72')}>
              Gesundheits- und Vorsorgeleistungen, klar strukturiert, steuerlich optimiert und
              nachhaltig wirksam.
            </p>
          )}
        </SectionHeader>

        {desktop ? (
          <div className="mt-20">
            <div
              aria-hidden="true"
              className={cx(
                desktopGrid,
                'border-b border-cream/14 px-8 pb-5 text-[12px] font-semibold uppercase leading-none tracking-[0.08em] text-cream/50'
              )}
            >
              <span className="text-gold-light">Nr.</span>
              <span>Baustein</span>
              <span>Was er bewirkt</span>
              <span className="text-right">Details</span>
            </div>

            {modules.map((m, i) => {
              const isOpen = open === i;
              return (
                <Reveal
                  key={m.title}
                  className={cx(
                    'border-b border-cream/14 transition-colors duration-[250ms]',
                    isOpen ? 'bg-cream/5' : 'hover:bg-cream/4'
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={`system-trigger-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`system-panel-${i}`}
                      onClick={() => toggle(i)}
                      className={cx(desktopGrid, 'w-full items-center px-8 py-11 text-left text-cream')}
                    >
                      <span className="text-[36px] font-medium leading-none tracking-[-0.04em] text-gold-light">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex flex-col gap-2.5">
                        <span className="text-[12px] font-semibold uppercase leading-none tracking-[0.08em] text-cream/50">
                          {m.tag}
                        </span>
                        <span className="text-[clamp(28px,2.6vw,38px)] font-medium leading-[1.05] tracking-[-0.04em]">
                          {m.title}
                        </span>
                      </span>
                      <span className="pr-6 text-[18px] font-normal leading-[1.45] text-cream/72">{m.effect}</span>
                      <span className="flex items-center justify-end gap-[14px] text-[13px] font-semibold leading-none tracking-[0.08em]">
                        MEHR
                        <span
                          className={cx(
                            'flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gold-light/45 transition-transform duration-300',
                            isOpen && 'rotate-90'
                          )}
                        >
                          <ArrowUpRight className="text-gold-light" />
                        </span>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`system-panel-${i}`}
                    role="region"
                    aria-labelledby={`system-trigger-${i}`}
                    hidden={!isOpen}
                  >
                    <p className="m-0 max-w-[900px] pb-11 pl-[142px] pr-[172px] text-[17px] leading-[1.6] text-cream/78">
                      {m.detail}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 border-t border-cream/14">
            {modules.map((m, i) => {
              const isOpen = open === i;
              return (
                <div key={m.title} className="border-b border-cream/14">
                  <h3>
                    <button
                      type="button"
                      id={`system-trigger-m-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`system-panel-m-${i}`}
                      onClick={() => toggle(i)}
                      className="grid w-full grid-cols-[48px_minmax(0,1fr)_48px] items-center gap-2 py-6 text-left text-cream"
                    >
                      <span className="text-[24px] font-medium leading-none tracking-[-0.04em] text-gold-light">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-semibold uppercase leading-none tracking-[0.08em] text-cream/50">
                          {m.tag}
                        </span>
                        <span className="text-[21px] font-medium leading-[1.15] tracking-[-0.03em]">{m.title}</span>
                      </span>
                      <span
                        className={cx(
                          'flex h-11 w-11 items-center justify-center rounded-full border border-gold-light/45 transition-transform duration-300',
                          isOpen && 'rotate-90'
                        )}
                      >
                        <ArrowUpRight size={13} className="text-gold-light" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`system-panel-m-${i}`}
                    role="region"
                    aria-labelledby={`system-trigger-m-${i}`}
                    hidden={!isOpen}
                  >
                    <p className="m-0 pb-6 pl-14 text-[16px] leading-[1.55] text-cream/78">{m.detailMobile}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
