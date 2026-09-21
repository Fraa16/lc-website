import { useCallback, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import smImg from '../images/sm-144.webp';
import sm1Img from '../images/sm-1-144.webp';
import sm2Img from '../images/sm-2-144.webp';
import Container from './ui/Container';
import SectionHead from './ui/SectionHead';
import Reveal from './ui/Reveal';
import { cx } from '../lib/cx';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Winsome Okafor',
    role: 'Lehrerin',
    quote:
      'Cedrik überzeugt durch eine herausragende Beratung, hohe Kundenorientierung und tiefes Fachwissen. Seine Vertrauenswürdigkeit und Zuverlässigkeit machen ihn zu einem idealen Ansprechpartner für alle, die eine professionelle und individuelle Beratung suchen. Kleine Extras wie eine regelmäßige Überprüfung der bestehenden Verträge zeigen, dass er auch langfristig an einer optimalen Absicherung seiner Kunden interessiert ist.',
    image: smImg,
  },
  {
    name: 'Tom Müller',
    role: 'Selbstständiger Tätowierer',
    quote:
      'Dank der Beratung von Herrn Leibinn konnte ich mich voll und ganz auf mein Kerngeschäft konzentrieren, ohne mir Sorgen um meinen Vermögensaufbau machen zu müssen. Als Selbstständiger ist Zeit für mich das wertvollste Gut, und durch die klaren, effizienten Strategien, die er für mich entwickelt hat, wurde mein finanzieller Fortschritt gesichert.',
    image: sm2Img,
  },
  {
    name: 'Luka Šilić',
    role: 'Anwalt',
    quote:
      'Als Anwalt bin ich es gewohnt, komplexe Sachverhalte zu durchdringen und sichere Entscheidungen zu treffen. Bei meinen Investments und Versicherungen verlasse ich mich deshalb voll und ganz auf die Expertise von Herrn Leibinn. Dank der umfassenden Beratung und maßgeschneiderten Lösungen fühle ich mich bestens abgesichert und weiß, dass meine finanziellen Ziele in guten Händen sind.',
    image: sm1Img,
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const active = testimonials[index];

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + total) % total),
    [total]
  );

  return (
    <section id="kundenstimmen" className="bg-navy py-section">
      <Container>
        <SectionHead
          eyebrow="Kundenstimmen"
          title={
            <>
              <span className="block text-sheet-3">Was unsere Kunden sagen.</span>
              <span className="block">Echte Ergebnisse. Echte Menschen.</span>
            </>
          }
          aside="Von der Lehrerin bis zum Anwalt – unsere Kunden kommen aus unterschiedlichen Lebenssituationen und haben eines gemeinsam: Sie vertrauen auf klare, individuelle Beratung."
        />

        {/* One quote at a time, at a size that makes it a statement rather
            than a card in a row of three. */}
        <Reveal delay={120} className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-navy-2 px-7 py-9 ring-1 ring-inset ring-white/8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
            />

            <div className="relative flex flex-wrap items-center justify-between gap-5">
              <span className="lc-index rounded-full bg-gold px-4 py-2 text-meta text-navy">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-2" aria-hidden="true">
                {testimonials.map((t, i) => (
                  <span
                    key={t.name}
                    className={cx(
                      'h-1 rounded-full transition-all duration-500 ease-brand',
                      i === index ? 'w-10 bg-gold' : 'w-6 bg-white/20'
                    )}
                  />
                ))}
              </div>
            </div>

            <blockquote
              aria-live="polite"
              className="relative mt-9 min-h-[11rem] sm:min-h-[12rem]"
            >
              <p key={active.name} className="animate-fade-in text-display-sm text-sheet-1">
                „{active.quote}“
              </p>
            </blockquote>

            <div className="relative mt-9 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-7">
              <div className="flex items-center gap-4">
                <img
                  src={active.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  width={144}
                  height={144}
                  className="h-12 w-12 flex-shrink-0 rounded-full object-cover ring-1 ring-white/15"
                />
                <div className="min-w-0">
                  <p className="text-body-lg font-semibold text-sheet-1">{active.name}</p>
                  <p className="text-body-sm text-sheet-3">{active.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Vorherige Kundenstimme"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-sheet-1 transition-colors duration-200 hover:border-white/40 hover:bg-white/[0.06]"
                >
                  <ArrowLeft className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Nächste Kundenstimme"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy transition-colors duration-200 hover:bg-gold-light"
                >
                  <ArrowRight className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
