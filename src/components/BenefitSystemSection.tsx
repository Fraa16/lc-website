import { Layers, Percent, Heart, Workflow } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import SectionHead from './ui/SectionHead';
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
    <section id="benefit-system" className="bg-navy-1 py-section">
      <Container>
        <SectionHead
          eyebrow="Das moderne Benefit-System"
          title="Ein System, das für jedes Unternehmen funktioniert."
          aside="Wir verbinden die wirkungsvollsten Gesundheits- und Vorsorgeleistungen in einem System — klar strukturiert, steuerlich optimiert und nachhaltig wirksam."
        />

        {/* Four columns split by hairlines — the reference's principle row.
            No boxes: the rules do the separating, which keeps the section
            quiet enough that the numbers and headings carry it. */}
        <ul className="mt-16 grid grid-cols-1 gap-y-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
          {pillars.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              key={title}
              as="li"
              delay={index * 80}
              className="group lg:border-l lg:border-white/10 lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="lc-index text-body-lg text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon
                  className="h-5 w-5 flex-shrink-0 text-sheet-3 transition-colors duration-300 group-hover:text-gold-light"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-7 text-display-sm text-sheet-1">{title}</h3>
              <p className="mt-3 max-w-measure text-body-sm text-sheet-3">{description}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200} className="mt-16">
          <div className="flex flex-col gap-7 rounded-3xl bg-navy-2 px-7 py-8 ring-1 ring-inset ring-white/8 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10">
            <div>
              <h3 className="text-display-sm text-sheet-1">
                Bereit für ein funktionierendes Benefit-System?
              </h3>
              <p className="mt-2 max-w-measure text-body-sm text-sheet-3">
                Wir analysieren Ihre aktuelle Situation kostenlos und zeigen
                konkrete Potenziale auf.
              </p>
            </div>
            <Button toId="contact-form-section" className="flex-shrink-0 rounded-full">
              Jetzt kostenlose Analyse sichern
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
