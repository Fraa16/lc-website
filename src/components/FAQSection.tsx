import { useState } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { cx } from '../lib/cx';
import { pad2 } from '../lib/format';
import { Reveal } from './ui/Reveal';
import { Eyebrow, anchorClass, containerClass, h2Default, sectionSpacing } from './ui/SectionHeader';

const faqs = [
  {
    q: 'Wie viel interner Aufwand entsteht für uns?',
    a: 'In den meisten Projekten wenige Stunden. Einrichtung, Kommunikation, Onboarding und Updates übernehmen wir. Ihr HR muss weder Anträge prüfen noch Fristen überwachen.',
  },
  {
    q: 'Können alle Mitarbeitenden teilnehmen, auch Minijobber und Teilzeitkräfte?',
    a: 'Ja. Das System bindet alle Mitarbeitenden ein, unabhängig von Arbeitszeit, Standort oder Vertragsmodell. Bei Bedarf entwickeln wir unterschiedliche Pakete, damit es für alle fair bleibt.',
    aMobile:
      'Ja. Das System bindet alle Mitarbeitenden ein, unabhängig von Arbeitszeit, Standort oder Vertragsmodell. Bei Bedarf entwickeln wir unterschiedliche Pakete.',
  },
  {
    q: 'Welche steuerlichen Vorteile können wir konkret nutzen?',
    a: 'Viele Benefits lassen sich steuer- und sozialversicherungsbegünstigt gestalten, etwa über den Freibetrag für Gesundheitsförderung oder steuerfreie Sachbezüge. Ihr konkretes Potenzial zeigen wir im Erstgespräch.',
  },
  {
    q: 'Müssen wir bestehende Verträge ablösen?',
    a: 'Meist nicht. Bestehende Regelungen lassen sich oft einbinden oder sauber migrieren. Wir prüfen, was sinnvoll ist, und vermeiden Doppelstrukturen.',
  },
  {
    q: 'Wie stellen wir sicher, dass die Benefits genutzt werden?',
    a: 'Wir übernehmen die komplette Mitarbeiterinformation: digital, verständlich und regelmäßig aktualisiert. Das sorgt für Transparenz und echte Nutzung.',
    aMobile: 'Wir übernehmen die komplette Mitarbeiterinformation: digital, verständlich und regelmäßig aktualisiert.',
  },
  {
    q: 'Was passiert bei Ein- und Austritten oder Elternzeit?',
    a: 'Das System passt sich an. Neue Mitarbeitende werden eingegliedert, bei Austritten werden Leistungen beendet oder übertragen, rechtlich und finanziell sauber geregelt.',
  },
];

export default function FAQSection() {
  const desktop = useIsDesktop();
  const [open, setOpen] = useState(0);
  const toggle = (i: number) => setOpen((cur) => (cur === i ? -1 : i));

  return (
    <section
      id="faq"
      tabIndex={-1}
      aria-labelledby="faq-title"
      className={cx(
        anchorClass,
        containerClass,
        sectionSpacing,
        'lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] lg:items-start lg:gap-[clamp(40px,6vw,96px)]'
      )}
    >
      <Reveal className="flex flex-col gap-5 lg:sticky lg:top-[120px] lg:gap-[26px]">
        <Eyebrow>FAQ</Eyebrow>
        <h2 id="faq-title" className={cx(h2Default, 'lg:text-[clamp(40px,4vw,60px)]')}>
          Klare Antworten vor dem ersten Gespräch.
        </h2>
        {desktop && (
          <p className="m-0 text-[18px] leading-[1.55] text-navy/66">
            Aufwand, Ablauf, Steuern und Verträge: die Fragen, die Entscheider wirklich beschäftigen.
          </p>
        )}
      </Reveal>

      <div className="mt-6 flex flex-col border-b border-navy/12 lg:mt-0">
        {desktop && (
          <div className="flex justify-between pb-5 text-[13px] font-semibold uppercase leading-none tracking-[0.08em]">
            <span>Die wichtigsten Fragen</span>
            <span aria-hidden="true" className="text-gold-dark">
              Zum Öffnen tippen
            </span>
          </div>
        )}

        {faqs.map((item, i) => {
          const isOpen = open === i;
          const triggerId = `faq-trigger-${i}`;
          const panelId = `faq-panel-${i}`;
          const Wrapper = desktop ? Reveal : 'div';
          return (
            <Wrapper key={item.q} className="border-t border-navy/12">
              <h3>
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                  className={cx(
                    'grid w-full items-center text-left text-navy',
                    desktop
                      ? 'grid-cols-[64px_minmax(0,1fr)_64px] py-7'
                      : 'grid-cols-[minmax(0,1fr)_48px] gap-4 py-[22px]'
                  )}
                >
                  {desktop && (
                    <span className="text-[15px] font-semibold leading-none text-gold-dark">{pad2(i + 1)}</span>
                  )}
                  <span
                    className={cx(
                      'font-medium',
                      desktop
                        ? 'text-[clamp(22px,2vw,28px)] leading-[1.2] tracking-[-0.03em]'
                        : 'text-[19px] leading-[1.25] tracking-[-0.02em]'
                    )}
                  >
                    {item.q}
                  </span>
                  <PlusIcon open={isOpen} large={desktop} />
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
                <p
                  className={cx(
                    'm-0 leading-[1.6] text-navy/66',
                    desktop ? 'pb-8 pl-16 pr-[120px] text-[17px]' : 'pb-6 text-[16px]'
                  )}
                >
                  {desktop ? item.a : (item.aMobile ?? item.a)}
                </p>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}

/** Plus that turns into a minus: the vertical bar rotates flat when open. */
function PlusIcon({ open, large }: { open: boolean; large: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        'relative block justify-self-end rounded-full border transition-colors duration-[250ms]',
        large ? 'h-[60px] w-[60px]' : 'h-12 w-12',
        open ? 'border-navy bg-navy' : 'border-navy/18 bg-transparent'
      )}
    >
      <span
        className={cx(
          'absolute left-1/2 top-1/2 h-[1.5px] -translate-x-1/2 -translate-y-1/2',
          large ? 'w-[14px]' : 'w-[13px]',
          open ? 'bg-gold-light' : 'bg-navy'
        )}
      />
      <span
        className={cx(
          'absolute left-1/2 top-1/2 w-[1.5px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300',
          large ? 'h-[14px]' : 'h-[13px]',
          open ? 'rotate-90 bg-gold-light' : 'bg-navy'
        )}
      />
    </span>
  );
}
