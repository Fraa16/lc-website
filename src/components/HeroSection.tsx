import { Check, Shield, TrendingUp, Users } from 'lucide-react';
import heroImage from '../images/cedrik-leibinn-hero-960.webp';
import heroImageSmall from '../images/cedrik-leibinn-hero-560.webp';
import Container from './ui/Container';
import Button from './ui/Button';
import Eyebrow from './ui/Eyebrow';
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
    <section id="hero" className="lc-vignette relative overflow-hidden bg-navy pt-header">
      <Container size="wide" className="relative">
        <div className="grid items-center gap-14 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20 xl:gap-16">
          {/* --- Copy ------------------------------------------------ */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Mehr Leistung im Team. Weniger Aufwand im Alltag.</Eyebrow>
            </Reveal>

            <Reveal delay={90} as="h1" className="mt-6 max-w-[15ch] text-display-2xl text-sheet-1">
              Das moderne Benefit-System für Unternehmen
            </Reveal>

            <Reveal delay={170} as="p" className="mt-6 max-w-measure text-lead text-sheet-2">
              Wir bündeln die wirkungsvollsten Gesundheits- und Vorsorgebenefits in
              einem System — verwaltungsarm, steuerlich optimiert und flexibel für
              jedes Teammitglied nutzbar.
            </Reveal>

            <Reveal delay={240} className="mt-9 h-px bg-white/10" />

            <ul className="mt-7 space-y-3.5">
              {benefits.map((benefit, index) => (
                <Reveal
                  key={benefit}
                  as="li"
                  delay={290 + index * 70}
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

            

            <Reveal delay={560} className="mt-9">
              <Button toId="contact-form-section" size="lg" className="rounded-full">
                Jetzt Erstgespräch sichern
              </Button>
            </Reveal>
          </div>

          {/* --- Portrait --------------------------------------------- */}
          <Reveal delay={300} className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-10 -z-10 rounded-full bg-gold/10 blur-3xl"
              />

              <div className="relative overflow-hidden rounded-[2rem] bg-navy-2 ring-1 ring-inset ring-white/10">
                <img
                  src={heroImage}
                  srcSet={`${heroImageSmall} 560w, ${heroImage} 960w`}
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 24rem, 88vw"
                  alt="Cedrik Leibinn, Berater für betriebliche Benefit- und Vorsorgesysteme"
                  width={960}
                  height={1344}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy via-navy/15 to-navy/40"
                />

                {/* Floating marker card, as in the reference. Replaces the
                    three chips that used to crop the subject's torso. */}
                <ul className="absolute bottom-5 left-5 w-[min(18rem,calc(100%-2.5rem))] space-y-3 rounded-2xl border border-white/12 bg-navy/75 p-4 backdrop-blur-xl">
                  {trustMarkers.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-3">
                      <Icon
                        className="h-4 w-4 flex-shrink-0 text-gold-light"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="text-body-sm font-medium text-sheet-1">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
