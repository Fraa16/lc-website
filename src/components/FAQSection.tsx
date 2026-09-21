import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Container from './ui/Container';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';
import { faqs } from '../data/faqs';

export default function FAQSection() {
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set());
  const baseId = useId();

  const toggle = (index: number) =>
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <section id="faq-section" className="bg-navy-1 py-section">
      <Container>
        {/* Headline column stays put while the index scrolls beside it. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
            <Reveal>
              <Eyebrow>Häufige Fragen</Eyebrow>
            </Reveal>

            <Reveal delay={80} as="h2" className="mt-6 max-w-[14ch] text-display-lg text-sheet-1">
              Klarheit für Ihre Entscheidung
            </Reveal>

            <Reveal delay={140} as="p" className="mt-6 max-w-measure text-body-lg text-sheet-2">
              Antworten auf die Fragen, die Entscheider wirklich beschäftigen.
            </Reveal>
          </div>

          <dl>
            {faqs.map((faq, index) => {
              const panelId = `${baseId}-faq-panel-${index}`;
              const buttonId = `${baseId}-faq-button-${index}`;
              const isOpen = open.has(index);

              return (
                <Reveal
                  key={faq.question}
                  delay={Math.min(index, 5) * 50}
                  className="border-t border-white/10 last:border-b"
                >
                  <dt>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="group flex w-full items-start gap-5 py-6 text-left sm:gap-8"
                    >
                      <span className="lc-index mt-1 flex-shrink-0 text-body-sm text-gold">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="flex-1 text-title-lg font-semibold text-sheet-1 transition-colors duration-200 group-hover:text-gold-light">
                        {faq.question}
                      </span>

                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-300 ease-brand ${
                          isOpen
                            ? 'border-gold bg-gold text-navy'
                            : 'border-white/20 text-sheet-2 group-hover:border-gold/60 group-hover:text-gold-light'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-4 w-4" strokeWidth={2} />
                        ) : (
                          <Plus className="h-4 w-4" strokeWidth={2} />
                        )}
                      </span>
                    </button>
                  </dt>

                  {/* 0fr → 1fr expands to the answer's true height, so nothing
                      can be clipped the way a max-height guess would clip it. */}
                  <dd
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="lc-collapse"
                    data-open={isOpen}
                  >
                    <div>
                      <p className="max-w-measure pb-7 pl-0 pr-12 text-body-lg text-sheet-2 sm:pl-[3.25rem]">
                        {faq.answer}
                      </p>
                    </div>
                  </dd>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </Container>
    </section>
  );
}
