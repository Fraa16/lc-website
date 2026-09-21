import { Layers, FileText, Users, EyeOff, Percent } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import Chip from './ui/Chip';
import SectionHead from './ui/SectionHead';
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
        <SectionHead
          eyebrow="Was Unternehmen heute herausfordert"
          title={
            <>
              <span className="block text-sheet-3">Benefits sind relevanter denn je.</span>
              <span className="block">Doch kaum ein Unternehmen hat ein funktionierendes System.</span>
            </>
          }
          aside={
            <>
              <p>
                Viele Unternehmen wissen, dass attraktive Benefits die
                Mitarbeiterbindung, Gesundheit und Produktivität steigern. In der
                Praxis scheitert es jedoch oft an Zeit, Know-how und der richtigen
                Struktur – aus guten Ideen wird kein verlässliches System.
              </p>
              <Chip dot className="mt-6">
                05 Handlungsfelder
              </Chip>
            </>
          }
        />

        {/* Row table, as in the reference: an index column, the item, and what
            it means. Reads as a system rather than five loose cards. */}
        <div className="mt-16">
          <Reveal className="hidden grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.1fr)] gap-8 border-b border-white/10 pb-4 md:grid">
            <span className="text-meta uppercase text-sheet-3">Nr.</span>
            <span className="text-meta uppercase text-sheet-3">Herausforderung</span>
            <span className="text-meta uppercase text-sheet-3">Im Detail</span>
          </Reveal>

          <ul>
            {problems.map(({ icon: Icon, title, description }, index) => (
              <Reveal
                key={title}
                as="li"
                delay={index * 60}
                className="lc-row border-b border-white/10"
              >
                <div className="grid gap-3 py-7 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline md:gap-8">
                  <span className="lc-index text-title-lg text-gold md:text-display-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3 className="flex items-start gap-3 text-display-sm text-sheet-1">
                    <Icon
                      className="mt-1 h-5 w-5 flex-shrink-0 text-gold-light md:hidden"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    {title}
                  </h3>

                  <p className="max-w-measure text-body-sm text-sheet-3">{description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={120} className="mt-12">
          <Button toId="contact-form-section" className="rounded-full">
            Kostenlose Analyse anfordern
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
