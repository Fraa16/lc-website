import { Layers, Percent, Heart, Workflow } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';

const pillars = [
  {
    icon: Layers,
    title: 'Klare Struktur & Transparenz',
    description:
      'Alle Benefits in einem strukturierten, verständlichen System — für HR, Führungskräfte und Mitarbeitende sofort nachvollziehbar.',
  },
  {
    icon: Percent,
    title: 'Steuerlich optimierte Vorteile',
    description:
      'Wir nutzen alle relevanten Fördermodelle und Steuervorteile, damit Leistungen maximal wirksam und budgeteffizient eingesetzt werden.',
  },
  {
    icon: Heart,
    title: 'Moderne Gesundheits- & Vorsorgeleistungen',
    description:
      'Ein starkes Portfolio aus Gesundheits-, Präventions- und Vorsorgebausteinen — flexibel für jedes Teammitglied nutzbar.',
  },
  {
    icon: Workflow,
    title: 'Digitale & schlanke Prozesse',
    description:
      'Von Anmeldung bis Abrechnung: Digitale Abläufe reduzieren den Aufwand für HR und steigern die Nutzung durch Mitarbeitende.',
  },
];

export default function BenefitSystemSection() {
  return (
    <section id="benefit-system" className="on-light bg-cream py-section">
      <Container>
        <div className="max-w-measure">
          <Reveal>
            <Eyebrow tone="light">Das moderne Benefit-System</Eyebrow>
          </Reveal>

          <Reveal delay={80} as="h2" className="mt-6 max-w-[18ch] text-display-lg text-ink-1">
            Ein System, das für jedes Unternehmen funktioniert.
          </Reveal>

          <Reveal delay={140} as="p" className="mt-6 text-lead text-ink-2">
            Wir verbinden die wirkungsvollsten Gesundheits- und Vorsorgeleistungen
            in einem System — klar strukturiert, steuerlich optimiert und
            nachhaltig wirksam.
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
          {pillars.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} as="li" delay={index * 80} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-paper p-8 transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:-translate-y-1 hover:border-navy/15 hover:lc-shadow-3 lg:p-10">
                {/* Accent rule reveals on hover rather than sitting there
                    permanently — the original drew it on every card at all
                    times, which flattened the hierarchy. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-gradient transition-transform duration-500 ease-brand group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between gap-4">
                  {/* Navy chip with a gold glyph: 11.9:1. The previous chip
                      was a 20%-opacity gold wash with a gold icon on white,
                      which sits under the 3:1 non-text minimum. */}
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-navy transition-transform duration-300 ease-brand group-hover:scale-105"
                  >
                    <Icon className="h-6 w-6 text-gold-light" strokeWidth={1.5} />
                  </span>

                  <span
                    aria-hidden="true"
                    className="font-display text-body-sm tabular-nums text-ink-3"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-7 text-display-sm text-ink-1">{title}</h3>
                <p className="mt-3 text-body-sm text-ink-2">{description}</p>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Inline CTA bar. Kept visually distinct from the centred CTA block
            in the next section so five calls-to-action down the page don't
            all read as the same component repeated. */}
        <Reveal delay={200} className="mt-14">
          <div className="flex flex-col gap-6 rounded-2xl border border-navy/12 bg-paper px-8 py-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:px-10">
            <div>
              <h3 className="text-display-sm text-ink-1">
                Bereit für ein funktionierendes Benefit-System?
              </h3>
              <p className="mt-2 max-w-measure text-body-sm text-ink-2">
                Wir analysieren Ihre aktuelle Situation kostenlos und zeigen
                konkrete Potenziale auf.
              </p>
            </div>
            <Button toId="contact-form-section" className="flex-shrink-0">
              Jetzt kostenlose Analyse sichern
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
