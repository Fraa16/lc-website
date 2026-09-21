import { Search, Cog, Users } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Analyse & Potenzialcheck',
    description:
      'Wir prüfen bestehende Strukturen, steuerliche Möglichkeiten und zeigen klar auf, welche Benefits wirklich Wirkung erzielen.',
  },
  {
    number: '02',
    icon: Cog,
    title: 'System einrichten',
    description:
      'Einbindung der passenden Gesundheits- und Vorsorgebausteine, zentrale Verwaltung, digitale Prozesse – alles aus einer Hand.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Mitarbeitende onboarden',
    description:
      'Wir übernehmen Kommunikation & Aufklärung, erklären Leistungen verständlich und sorgen für maximale Nutzung im Team.',
  },
];

export default function ImplementationSection() {
  return (
    <section id="implementation" className="on-light bg-cream-sunken py-section">
      <Container>
        <div className="max-w-measure">
          <Reveal>
            <Eyebrow tone="light">Unser Ablauf</Eyebrow>
          </Reveal>

          <Reveal delay={80} className="mt-6">
            <h2 className="text-display-lg text-ink-1">
              <span className="block font-medium text-ink-3">Schnell eingeführt.</span>
              <span className="block">Und von Anfang an wirksam.</span>
            </h2>
          </Reveal>

          <Reveal delay={140} as="p" className="mt-6 text-lead text-ink-2">
            Wir übernehmen die komplette Implementierung – von der Analyse bis zur
            laufenden Betreuung. Für Sie bleibt der Aufwand minimal.
          </Reveal>
        </div>

        {/* A process section should look like a process. Three detached cards
            said nothing about sequence; the rail carries the eye through it. */}
        <ol className="relative mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {/* Stacked layout: one continuous rail down the left. */}
          <span
            aria-hidden="true"
            className="absolute left-7 top-7 h-[calc(100%-4rem)] w-px bg-gradient-to-b from-gold/45 via-gold/25 to-transparent md:hidden"
          />

          {steps.map(({ number, icon: Icon, title, description }, index) => (
            <Reveal key={number} as="li" delay={index * 110} className="relative pl-20 sm:pl-20 md:pl-0">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full bg-navy font-display text-body-sm font-bold tabular-nums text-gold-light lc-shadow-2 md:relative md:h-14 md:w-14"
                >
                  {number}
                </span>

                {/* Row layout: each step bridges to the next one and the
                    last step draws nothing, so the rail ends where the
                    process does instead of trailing off the grid. */}
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-px flex-1 bg-gradient-to-r from-gold/45 to-gold/20 md:-mr-8 md:block lg:-mr-12"
                  />
                )}
              </div>

              <div className="md:mt-8">
                <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 text-display-sm text-ink-1">{title}</h3>
                <p className="mt-3 max-w-measure text-body-sm text-ink-2">{description}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={260} className="mt-20 text-center">
          <h3 className="mx-auto max-w-[22ch] text-display-md text-ink-1">
            Wie könnte Ihr Benefit-System aussehen?
          </h3>
          <p className="mx-auto mt-4 max-w-measure-sm text-body-lg text-ink-2">
            Wir zeigen Ihnen konkrete Szenarien für Ihre Unternehmensgröße.
          </p>
          <div className="mt-8">
            <Button toId="contact-form-section">Kostenlose Analyse anfordern</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
