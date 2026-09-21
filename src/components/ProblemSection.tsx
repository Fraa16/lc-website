import { Layers, FileText, Users, EyeOff, Percent } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';

const problems = [
  {
    icon: Layers,
    title: 'Zu viel Komplexität',
    description:
      'Tarife, Anbieter, Fristen – ohne klares System kostet jedes Benefit-Projekt mehr Zeit, Nerven und Budget als geplant.',
  },
  {
    icon: FileText,
    title: 'Hoher Administrationsaufwand',
    description:
      'HR und Geschäftsführung hängen in Excel-Listen fest, statt sich auf Strategie und Führung zu konzentrieren.',
  },
  {
    icon: Users,
    title: 'Fehlende Attraktivität im Wettbewerb',
    description:
      'Benefits sind vorhanden, aber wenig sichtbar oder nicht auf die Bedürfnisse der Mitarbeitenden abgestimmt.',
  },
  {
    icon: EyeOff,
    title: 'Keine Transparenz für Mitarbeitende',
    description:
      'Mitarbeitende wissen nicht, was ihnen zusteht, wo sie Leistungen abrufen oder welche Vorteile tatsächlich bestehen.',
  },
  {
    icon: Percent,
    title: 'Keine steuerliche Optimierung',
    description:
      'Potenziale aus Förderungen und steuerlichen Vorteilen bleiben ungenutzt – Geld, das im Unternehmen liegen bleibt.',
  },
];

export default function ProblemSection() {
  return (
    <section id="problem-section" className="bg-navy py-section">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 xl:gap-20">
          {/* Sticky intro — the list opposite is long enough that the
              argument would otherwise scroll out of sight before the
              evidence has been read. */}
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
            <Reveal>
              <Eyebrow>Was Unternehmen heute herausfordert</Eyebrow>
            </Reveal>

            <Reveal delay={70} as="p" className="lc-gradient-text mt-6 font-display text-title-lg font-medium">
              Benefits sind relevanter denn je.
            </Reveal>

            <Reveal delay={120} as="h2" className="mt-3 max-w-[18ch] text-display-md text-sheet-1">
              Doch kaum ein Unternehmen hat ein funktionierendes System.
            </Reveal>

            <Reveal delay={180} as="p" className="mt-6 max-w-measure text-body-lg text-sheet-2">
              Viele Unternehmen wissen, dass attraktive Benefits die
              Mitarbeiterbindung, Gesundheit und Produktivität steigern. In der
              Praxis scheitert es jedoch oft an Zeit, Know-how und der richtigen
              Struktur – aus guten Ideen wird kein verlässliches System.
            </Reveal>

            <Reveal delay={240} className="mt-9">
              <Button toId="contact-form-section">Kostenlose Analyse anfordern</Button>
            </Reveal>
          </div>

          {/* Hairline list rather than five boxes. Five items never divide
              cleanly into a two-column card grid — the old layout left the
              fifth card orphaned and centred under the other four. */}
          <ul className="border-b border-white/10">
            {problems.map(({ icon: Icon, title, description }, index) => (
              <Reveal
                key={title}
                as="li"
                delay={index * 70}
                className="group relative border-t border-white/10"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-gold-gradient transition-transform duration-500 ease-brand group-hover:scale-y-100"
                />
                <div className="flex gap-5 py-7 pl-0 transition-[padding] duration-500 ease-brand group-hover:pl-5 sm:gap-6">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:bg-gold/10 group-hover:ring-gold/30"
                  >
                    <Icon className="h-5 w-5 text-gold-light" strokeWidth={1.5} />
                  </span>

                  <div>
                    <h3 className="text-title-lg font-semibold text-sheet-1">{title}</h3>
                    <p className="mt-2 max-w-measure text-body-sm text-sheet-3">{description}</p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="ml-auto hidden self-center font-display text-body-sm tabular-nums text-white/50 sm:block"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
