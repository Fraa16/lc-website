import { Search, Cog, Users } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import ArrowCircle from './ui/ArrowCircle';

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
    <section id="implementation" className="bg-navy py-section">
      <Container>
        <SectionHead
          eyebrow="Unser Ablauf"
          title={
            <>
              <span className="block text-sheet-3">Schnell eingeführt.</span>
              <span className="block">Und von Anfang an wirksam.</span>
            </>
          }
          aside="Wir übernehmen die komplette Implementierung – von der Analyse bis zur laufenden Betreuung. Für Sie bleibt der Aufwand minimal."
        />

        {/* Route card on the left, stepped rows on the right. */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-8">
          <Reveal>
            <div className="flex h-full flex-col rounded-3xl bg-gold-gradient p-8 lg:p-10">
              <span className="text-meta uppercase text-navy/70">Ihr Weg zum System</span>

              <span className="lc-index mt-6 block text-display-xl text-navy">01–03</span>

              <div aria-hidden="true" className="mt-8 h-px w-full bg-navy/20" />

              <ul className="mt-6 space-y-3.5">
                {steps.map((step) => (
                  <li key={step.number} className="flex items-start gap-3 text-body-sm font-medium text-navy">
                    <span
                      aria-hidden="true"
                      className="mt-[0.45rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-navy/60"
                    />
                    {step.title}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="overflow-hidden rounded-3xl ring-1 ring-inset ring-white/10">
            {steps.map(({ number, icon: Icon, title, description }, index) => (
              <Reveal
                key={number}
                delay={index * 90}
                className="group border-white/10 [&:not(:first-child)]:border-t"
              >
                <div className="flex items-start gap-5 bg-navy-2 px-6 py-7 transition-colors duration-300 ease-brand group-hover:bg-navy-3 sm:items-center sm:gap-7 sm:px-9">
                  <span className="lc-index inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3.5 py-2 text-meta text-gold-light">
                    {number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-display-sm text-sheet-1">{title}</h3>
                    <p className="mt-2 max-w-measure text-body-sm text-sheet-3">{description}</p>
                  </div>

                  <Icon
                    className="hidden h-5 w-5 flex-shrink-0 text-sheet-3 transition-colors duration-300 group-hover:text-gold-light lg:block"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <ArrowCircle tone="dark" size="sm" className="hidden sm:inline-flex" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200} className="mt-14 text-center">
          <h3 className="mx-auto max-w-[24ch] text-display-md text-sheet-1">
            Wie könnte Ihr Benefit-System aussehen?
          </h3>
          <p className="mx-auto mt-4 max-w-measure-sm text-body-lg text-sheet-2">
            Wir zeigen Ihnen konkrete Szenarien für Ihre Unternehmensgröße.
          </p>
          <div className="mt-8">
            <Button toId="contact-form-section" className="rounded-full">
              Kostenlose Analyse anfordern
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
