import { useState } from 'react';
import smImg from '../images/sm.jpg';
import sm1Img from '../images/sm-1.jpg';
import sm2Img from '../images/sm-2.jpg';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { cx } from '../lib/cx';
import { pad2 } from '../lib/format';
import { ArrowLeft, ArrowRight } from './ui/icons';
import { Reveal } from './ui/Reveal';
import { SectionHeader, anchorClass, containerClass, leadClass, sectionSpacing } from './ui/SectionHeader';

// Verbatim excerpts from the original client testimonials.
const testimonials = [
  {
    quote:
      'Cedrik überzeugt durch eine herausragende Beratung, hohe Kundenorientierung und tiefes Fachwissen.',
    name: 'Winsome Okafor',
    role: 'Lehrerin',
    image: smImg,
  },
  {
    quote:
      'Dank der Beratung von Herrn Leibinn konnte ich mich voll und ganz auf mein Kerngeschäft konzentrieren.',
    name: 'Tom Müller',
    role: 'Selbstständiger Tätowierer',
    image: sm2Img,
  },
  {
    quote:
      'Bei meinen Investments und Versicherungen verlasse ich mich voll und ganz auf die Expertise von Herrn Leibinn.',
    name: 'Luka Šilić',
    role: 'Anwalt',
    image: sm1Img,
  },
];

export default function TestimonialsSection() {
  const desktop = useIsDesktop();
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const t = testimonials[index];

  return (
    <section
      id="stimmen"
      tabIndex={-1}
      aria-labelledby="stimmen-title"
      className={cx(anchorClass, containerClass, sectionSpacing)}
    >
      <SectionHeader
        eyebrow="Kundenstimmen"
        titleId="stimmen-title"
        title="Was Kunden über die Zusammenarbeit sagen."
      >
        {desktop && (
          <p className={cx(leadClass, 'text-navy/68')}>
            Von der Lehrerin bis zum Anwalt: Unsere Kunden schätzen klare, individuelle Beratung.
          </p>
        )}
      </SectionHeader>

      <Reveal
        role="region"
        aria-roledescription="Karussell"
        aria-label="Kundenstimmen"
        className="surface-dark mt-7 flex min-h-[470px] flex-col rounded-[28px] bg-navy px-[22px] py-6 text-cream lg:mt-14 lg:min-h-[520px] lg:rounded-[32px] lg:p-[clamp(36px,4vw,56px)]"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-9 items-center rounded-full bg-gold-gradient-sm px-4 text-[14px] font-semibold leading-none text-navy lg:h-10 lg:px-[18px] lg:text-[15px]">
            {pad2(index + 1)} / {pad2(count)}
          </span>
          <div aria-hidden="true" className="flex gap-1.5 lg:gap-2">
            {testimonials.map((item, i) => (
              <span
                key={item.name}
                className={cx(
                  'h-[3px] w-8 rounded-sm transition-colors duration-300 lg:w-14',
                  i === index ? 'bg-gold-light' : 'bg-cream/20'
                )}
              />
            ))}
          </div>
        </div>

        <figure className="m-0 flex flex-1 flex-col" aria-live="polite" aria-atomic="true">
          <blockquote className="m-0 mt-9 lg:mt-14">
            <p className="max-w-[1060px] text-pretty text-[28px] font-medium leading-[1.14] tracking-[-0.035em] lg:text-[clamp(32px,3.6vw,54px)] lg:leading-[1.08] lg:tracking-[-0.04em]">
              „{t.quote}“
            </p>
          </blockquote>

          <div className="mt-auto flex items-center justify-between gap-3 pt-8 lg:items-end lg:pt-14">
            <figcaption className="flex min-w-0 items-center gap-3 lg:gap-4">
              <img
                src={t.image}
                alt=""
                width={56}
                height={56}
                className="block h-12 w-12 flex-none rounded-full object-cover lg:h-14 lg:w-14"
              />
              <span className="flex min-w-0 flex-col gap-[5px] lg:gap-1.5">
                <span className="text-[17px] font-medium leading-[1.1] lg:text-[20px] lg:leading-none">{t.name}</span>
                <span className="text-[14px] leading-[1.2] text-cream/60 lg:text-[15px] lg:leading-none">{t.role}</span>
              </span>
            </figcaption>

            <div className="flex flex-none gap-2 lg:gap-3">
              <button
                type="button"
                onClick={() => setIndex((i) => (i + count - 1) % count)}
                aria-label="Vorherige Stimme"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/22 bg-cream/6 text-cream transition-colors hover:bg-cream/12 lg:h-[60px] lg:w-[60px]"
              >
                <ArrowLeft size={desktop ? 18 : 16} />
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % count)}
                aria-label="Nächste Stimme"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient-sm text-navy transition-opacity hover:opacity-90 lg:h-[60px] lg:w-[60px]"
              >
                <ArrowRight size={desktop ? 18 : 16} />
              </button>
            </div>
          </div>
        </figure>
      </Reveal>
    </section>
  );
}
