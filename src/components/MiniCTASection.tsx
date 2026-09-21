import { ArrowUpRight } from 'lucide-react';
import Container from './ui/Container';
import Reveal from './ui/Reveal';
import { scrollToId } from '../lib/motion';

export default function MiniCTASection() {
  return (
    <section className="bg-navy pb-section-tight">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-inset ring-white/10">
            {/* The photograph used to sit under a 90–95% opaque gold wash and
                rendered as a flat rectangle. The scrim now falls off across
                the panel so the image is actually visible on the right. */}
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
              className="absolute inset-0 bg-gradient-to-r from-navy via-navy/94 to-navy/60 md:to-navy/30"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-navy/50"
            />

            {/* Top bar: label left, meta right, hairline under. */}
            <div className="relative flex flex-wrap items-center justify-between gap-3 px-7 py-5 sm:px-10">
              <span className="inline-flex items-center gap-3 text-meta uppercase text-gold-light">
                <span aria-hidden="true" className="h-px w-8 rounded-full bg-gold" />
                Kostenfreie Analyse
              </span>
              <span className="inline-flex items-center gap-2 text-meta uppercase text-sheet-3">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                Antwort in 24 Stunden
              </span>
            </div>
            <div aria-hidden="true" className="relative h-px w-full bg-white/10" />

            <div className="relative grid gap-10 px-7 py-11 sm:px-10 md:py-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-12">
              <div>
                <h2 className="max-w-[20ch] text-display-md text-sheet-1">
                  Bereit für ein Benefit-System, das wirklich funktioniert?
                </h2>

                <p className="mt-5 max-w-measure text-body-lg text-sheet-2">
                  In einer kostenfreien Analyse beleuchten wir Ihre bestehende
                  Struktur und identifizieren klar, wo ungenutzte Chancen und
                  steuerliche Vorteile liegen.
                </p>
              </div>

              <div className="rounded-2xl border border-white/12 bg-navy/60 p-6 backdrop-blur-xl sm:p-7">
                <a
                  href="#contact-form-section"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToId('contact-form-section');
                  }}
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-gradient bg-[length:200%_100%] bg-left px-7 py-4 text-body-lg font-semibold text-navy shadow-[0_2px_10px_rgb(182_143_64_/_0.3)] transition-[background-position,transform,box-shadow] duration-300 ease-brand hover:bg-right hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(182_143_64_/_0.4)]"
                >
                  Jetzt kostenlose Analyse sichern
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
