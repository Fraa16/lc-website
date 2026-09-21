import { Shield, TrendingUp, Award, FileCheck, Users, Headphones } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';

const trustCards = [
  {
    icon: Shield,
    title: 'Ein System, das zu Ihrem Unternehmen passt',
    description:
      'Keine Standardlösungen. Wir entwickeln ein Modell, das Ihre Ziele, Ihre Mitarbeitenden und Ihre Strukturen berücksichtigt – praxisnah statt theoretisch.',
  },
  {
    icon: TrendingUp,
    title: 'Weniger Aufwand im Tagesgeschäft',
    description:
      'HR muss nicht noch eine Baustelle haben. Deshalb übernehmen wir Administration, Kommunikation und Einführung so, dass Sie spürbar entlastet werden.',
  },
  {
    icon: Award,
    title: 'Spürbare Wirkung im Team',
    description:
      'Weniger Ausfälle, mehr Zufriedenheit, bessere Bindung. Ein gutes Benefitsystem zeigt Wirkung – intern wie extern.',
  },
  {
    icon: FileCheck,
    title: 'Steuerliche Vorteile sinnvoll genutzt',
    description:
      'Wir kombinieren die passenden Förderungen und steuerlichen Möglichkeiten, damit Ihr Budget dort ankommt, wo es am meisten bringt.',
  },
  {
    icon: Users,
    title: 'Funktioniert für kleine Teams und wachsende Unternehmen',
    description:
      'Ob Selbstständige, kleine GmbH oder KMU: Das System bleibt flexibel und macht keinen Unterschied zwischen drei oder dreißig Mitarbeitenden.',
  },
  {
    icon: Headphones,
    title: 'Persönlich begleitet – digital unterstützt',
    description:
      'Sie haben immer einen festen Ansprechpartner. Dazu klare Prozesse und digitale Tools, die Ihnen Arbeit abnehmen statt neue zu schaffen.',
  },
];

export default function TrustSection() {
  return (
    <section id="vorteile" className="bg-navy-1 py-section">
      <Container>
        <SectionHead
          eyebrow="Ihre Vorteile auf einen Blick"
          title={
            <>
              <span className="block text-sheet-3">Struktur, die entlastet.</span>
              <span className="block">Expertise, die wirklich weiterhilft.</span>
            </>
          }
          aside="Wenn ein Benefitsystem funktionieren soll, braucht es Klarheit, einfache Abläufe und jemanden, der Sie sicher durch den Prozess führt. Genau das liefern wir – maßgeschneidert, verständlich und mit Blick auf Ihren Unternehmensalltag."
        />

        <ul className="mt-16 grid grid-cols-1 gap-x-0 gap-y-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {trustCards.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              key={title}
              as="li"
              delay={index * 70}
              className="group sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(2n)]:border-white/10 sm:[&:nth-child(2n)]:pl-8 lg:!border-l lg:border-white/10 lg:!pl-8 lg:pr-4 lg:[&:nth-child(3n+1)]:!border-l-0 lg:[&:nth-child(3n+1)]:!pl-0"
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

              <h3 className="mt-7 text-title-lg font-semibold text-sheet-1">{title}</h3>
              <p className="mt-3 max-w-measure text-body-sm text-sheet-3">{description}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={180} className="mt-14">
          <Button toId="contact-form-section" className="rounded-full">
            Jetzt Benefit-Potential prüfen lassen
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
