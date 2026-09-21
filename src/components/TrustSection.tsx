import { Shield, TrendingUp, Award, FileCheck, Users, Headphones } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';
import { cx } from '../lib/cx';

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

/* Bento spans: a lead tile and a full-width closer break the six-identical-
   boxes grid without changing a word of the content. */
const spans = [
  'lg:col-span-2',
  '',
  '',
  '',
  '',
  'lg:col-span-3',
];

export default function TrustSection() {
  return (
    <section id="vorteile" className="on-light bg-cream py-section">
      <Container>
        <div className="mx-auto max-w-[52rem] text-center">
          <Reveal>
            <Eyebrow tone="light">Ihre Vorteile auf einen Blick</Eyebrow>
          </Reveal>

          {/* Weight contrast instead of gold-gradient text: the original ramp
              measured 1.55–2.7:1 on cream, failing AA even at display sizes. */}
          <Reveal delay={80} className="mt-6">
            <h2 className="text-display-lg text-ink-1">
              <span className="block font-medium text-ink-3">Struktur, die entlastet.</span>
              <span className="block">Expertise, die wirklich weiterhilft.</span>
            </h2>
          </Reveal>

          <Reveal delay={160} as="p" className="mx-auto mt-6 max-w-measure text-body-lg text-ink-2">
            Wenn ein Benefitsystem funktionieren soll, braucht es Klarheit,
            einfache Abläufe und jemanden, der Sie sicher durch den Prozess
            führt. Genau das liefern wir – maßgeschneidert, verständlich und mit
            Blick auf Ihren Unternehmensalltag.
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {trustCards.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              key={title}
              as="li"
              delay={index * 70}
              className={cx('h-full', spans[index])}
            >
              <article
                className={cx(
                  'group flex h-full flex-col rounded-2xl border border-navy/10 bg-paper p-7 transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:-translate-y-1 hover:border-navy/15 hover:lc-shadow-3 lg:p-8',
                  // Wide tiles centre their content: paired with a taller
                  // neighbour they would otherwise sit in a pool ofdead space.
                  spans[index] && 'lg:flex-row lg:items-center lg:gap-8'
                )}
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-navy transition-transform duration-300 ease-brand group-hover:scale-105"
                >
                  <Icon className="h-5 w-5 text-gold-light" strokeWidth={1.5} />
                </span>

                <div className={cx('mt-6', spans[index] && 'lg:mt-0')}>
                  <h3 className="text-title-lg font-semibold text-ink-1">{title}</h3>
                  <p className="mt-2.5 max-w-measure text-body-sm text-ink-2">{description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200} className="mt-12 text-center">
          <Button toId="contact-form-section">Jetzt Benefit-Potential prüfen lassen</Button>
        </Reveal>
      </Container>
    </section>
  );
}
