import { Check, Shield, TrendingUp, Users } from 'lucide-react';
import lcLogo from '../images/lc-logo-lang-420.webp';
import heroImage from '../images/cedrik-leibinn-hero-960.webp';
import heroImageSmall from '../images/cedrik-leibinn-hero-560.webp';
import Container from './ui/Container';
import Button from './ui/Button';
import Reveal from './ui/Reveal';

const benefits = [
  'Bis zu 30% weniger Fehlzeiten durch bessere Gesundheitsleistungen',
  'Messbar höhere Mitarbeiterbindung & stärkere Arbeitgebermarke',
  'Schlanke Implementierung ohne Mehraufwand für HR',
];

const trustMarkers = [
  { icon: Shield, label: 'Rechtssicher & GKV-konform' },
  { icon: TrendingUp, label: 'Ø 28% weniger Fehlzeiten' },
  { icon: Users, label: '100% digitale Verwaltung' },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="lc-vignette relative overflow-hidden bg-navy pt-header"
    >
      <Container size="wide" className="relative">
        <div className="grid items-center gap-14 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24 xl:gap-16">
          {/* --- Copy ------------------------------------------------ */}
          <div className="lg:col-span-7">
            <Reveal>
              <img
                src={lcLogo}
                alt="Leibinn Consulting"
                width={420}
                height={61}
                fetchPriority="high"
                className="h-7 w-auto md:h-8"
              />
            </Reveal>

            <Reveal delay={80} className="mt-8">
              {/* Gradient text is kept here because both stops clear AA on
                  navy (#B68F40 6.8:1, #DCC383 11.9:1). It is dropped on the
                  cream sections, where the same ramp falls to 1.6–2.7:1. */}
              <p className="lc-gradient-text max-w-measure-sm font-display text-title-lg font-medium">
                Mehr Leistung im Team. Weniger Aufwand im Alltag.
              </p>
            </Reveal>

            <Reveal delay={140} as="h1" className="mt-4 max-w-[18ch] text-display-xl text-sheet-1">
              Das moderne Benefit-System für Unternehmen
            </Reveal>

            <Reveal delay={200} as="p" className="mt-6 max-w-measure text-lead text-sheet-2">
              Wir bündeln die wirkungsvollsten Gesundheits- und Vorsorgebenefits in
              einem System — verwaltungsarm, steuerlich optimiert und flexibel für
              jedes Teammitglied nutzbar.
            </Reveal>

            <ul className="mt-9 space-y-4">
              {benefits.map((benefit, index) => (
                <Reveal
                  key={benefit}
                  as="li"
                  delay={260 + index * 70}
                  className="flex items-start gap-3.5 text-body-lg text-sheet-1"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold/15 ring-1 ring-inset ring-gold/30"
                  >
                    <Check className="h-3.5 w-3.5 text-gold-light" strokeWidth={2.5} />
                  </span>
                  <span className="max-w-measure">{benefit}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={500} className="mt-10">
              <Button toId="contact-form-section" size="lg">
                Jetzt Erstgespräch sichern
              </Button>
            </Reveal>
          </div>

          {/* --- Portrait --------------------------------------------- */}
          <Reveal delay={260} className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Offset rule behind the photo — a passe-partout edge that
                  gives the image a frame without a heavy container. */}
              <div
                aria-hidden="true"
                className="absolute -right-3 -top-3 hidden h-full w-full rounded-3xl border border-gold/25 sm:block"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-full bg-gold/10 blur-3xl"
              />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 lc-shadow-dark-3">
                <img
                  src={heroImage}
                  srcSet={`${heroImageSmall} 560w, ${heroImage} 960w`}
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 24rem, 88vw"
                  alt="Cedrik Leibinn, Berater für betriebliche Benefit- und Vorsorgesysteme"
                  width={960}
                  height={1344}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-top lg:aspect-[5/7]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy/60 to-transparent"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* --- Trust strip ---------------------------------------------
            Previously three stacked chips pinned over the photo's bottom
            corner, where they cropped the subject and collided on small
            screens. As a base rule they anchor the whole hero instead. */}
        <Reveal delay={560}>
          <ul className="grid grid-cols-1 gap-px overflow-hidden border-t border-white/10 sm:grid-cols-3">
            {trustMarkers.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 py-5 sm:justify-center sm:px-4 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-white/10"
              >
                <Icon className="h-4 w-4 flex-shrink-0 text-gold-light" strokeWidth={1.75} aria-hidden="true" />
                <span className="text-caption font-medium tracking-wide text-sheet-2">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
