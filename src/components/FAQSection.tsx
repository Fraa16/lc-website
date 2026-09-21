import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
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
    <section id="faq-section" className="on-light bg-cream py-section">
      <Container>
        <div className="mx-auto max-w-prose text-center">
          <Reveal>
            <Eyebrow tone="light">Häufige Fragen</Eyebrow>
          </Reveal>

          <Reveal delay={80} as="h2" className="mt-6 text-display-lg text-ink-1">
            Klarheit für Ihre Entscheidung
          </Reveal>

          <Reveal delay={140} as="p" className="mx-auto mt-5 max-w-measure text-body-lg text-ink-2">
            Antworten auf die Fragen, die Entscheider wirklich beschäftigen.
          </Reveal>
        </div>

        {/* One column, not two. Two independent lists put their rules at
            different heights, and expanding an item on one side shifted
            nothing on the other — the eye read it as misalignment. */}
        <dl className="mx-auto mt-14 max-w-[56rem]">
          {faqs.map((faq, index) => {
            const panelId = `${baseId}-faq-panel-${index}`;
            const buttonId = `${baseId}-faq-button-${index}`;
            const isOpen = open.has(index);

            return (
              <Reveal
                key={faq.question}
                delay={Math.min(index, 5) * 55}
                className="border-t border-navy/12 last:border-b"
              >
                <dt>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-title-lg font-semibold text-ink-1 transition-colors duration-200 group-hover:text-gold">
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-navy/15 text-ink-2 transition-[transform,background-color,border-color,color] duration-300 ease-brand group-hover:border-navy/30 group-hover:bg-navy group-hover:text-cream"
                    >
                      <Plus
                        className={`h-4 w-4 transition-transform duration-300 ease-brand ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                        strokeWidth={2}
                      />
                    </span>
                  </button>
                </dt>

                {/* The old panel clamped answers to max-h-96 and faded
                    opacity; longer answers were silently cut off.
                    grid-template-rows animates to the true height. */}
                <dd
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="lc-collapse"
                  data-open={isOpen}
                >
                  <div>
                    <p className="max-w-measure pb-7 pr-12 text-body-lg text-ink-2">
                      {faq.answer}
                    </p>
                  </div>
                </dd>
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
