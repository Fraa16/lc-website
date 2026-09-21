import { ArrowRight } from 'lucide-react';
import Container from './ui/Container';
import Reveal from './ui/Reveal';
import { scrollToId } from '../lib/motion';

export default function MiniCTASection() {
  return (
    <section className="bg-navy pb-section-tight">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl lc-shadow-dark-3">
            {/* The photograph was previously buried under a 90–95% opaque
                gold wash — it rendered as a flat gold rectangle. The scrim
                now falls off across the panel so the image is actually
                visible on the right. */}
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              width={1600}
              height={1067}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-navy via-navy/92 to-navy/55 md:to-navy/25"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"
            />

            <div className="relative px-7 py-14 sm:px-12 md:px-14 md:py-16 lg:px-16 lg:py-20">
              <div className="max-w-[46ch]">
                <h2 className="text-display-md text-sheet-1">
                  Bereit für ein Benefit-System, das wirklich funktioniert?
                </h2>

                <p className="mt-5 text-body-lg text-sheet-2">
                  In einer kostenfreien Analyse beleuchten wir Ihre bestehende
                  Struktur und identifizieren klar, wo ungenutzte Chancen und
                  steuerliche Vorteile liegen.
                </p>

                <a
                  href="#contact-form-section"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToId('contact-form-section');
                  }}
                  className="group mt-9 inline-flex items-center gap-2.5 rounded-xl bg-gold-gradient bg-[length:200%_100%] bg-left px-7 py-4 text-body-lg font-semibold text-navy shadow-[0_2px_10px_rgb(182_143_64_/_0.3)] transition-[background-position,transform,box-shadow] duration-300 ease-brand hover:bg-right hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(182_143_64_/_0.4)]"
                >
                  Jetzt kostenlose Analyse sichern
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
