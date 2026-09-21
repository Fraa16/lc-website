import smImg from '../images/sm-144.webp';
import sm1Img from '../images/sm-1-144.webp';
import sm2Img from '../images/sm-2-144.webp';
import Container from './ui/Container';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';

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
  return (
    <section id="kundenstimmen" className="on-light bg-cream-sunken py-section">
      <Container>
        <div className="mx-auto max-w-[52rem] text-center">
          <Reveal>
            <Eyebrow tone="light">Kundenstimmen</Eyebrow>
          </Reveal>

          <Reveal delay={80} className="mt-6">
            <h2 className="text-display-lg text-ink-1">
              <span className="block font-medium text-ink-3">Was unsere Kunden sagen.</span>
              <span className="block">Echte Ergebnisse. Echte Menschen.</span>
            </h2>
          </Reveal>

          <Reveal delay={160} as="p" className="mx-auto mt-6 max-w-measure text-body-lg text-ink-2">
            Von der Lehrerin bis zum Anwalt – unsere Kunden kommen aus
            unterschiedlichen Lebenssituationen und haben eines gemeinsam: Sie
            vertrauen auf klare, individuelle Beratung.
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} as="li" delay={index * 100} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-navy/10 bg-paper p-7 transition-[transform,box-shadow,border-color] duration-300 ease-brand hover:-translate-y-1 hover:border-navy/15 hover:lc-shadow-3 lg:p-8">
                <span
                  aria-hidden="true"
                  className="block h-0.5 w-10 rounded-full bg-gold-gradient"
                />

                <blockquote className="mt-6 flex-1">
                  <p className="text-body-sm text-ink-2">{testimonial.quote}</p>
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-4 border-t border-navy/10 pt-6">
                  <img
                    src={testimonial.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width={144}
                    height={144}
                    className="h-12 w-12 flex-shrink-0 rounded-full object-cover ring-1 ring-navy/10"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-body-sm font-semibold text-ink-1">
                      {testimonial.name}
                    </p>
                    {/* The role was present in the data all along but never
                        rendered — the strongest credibility signal in the
                        section was being dropped on the floor. */}
                    <p className="truncate text-caption text-ink-3">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
