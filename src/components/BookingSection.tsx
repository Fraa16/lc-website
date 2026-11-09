import { useEffect, useState } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { cx } from '../lib/cx';
import { pad2 } from '../lib/format';
import { Calendar } from './ui/icons';
import { Reveal } from './ui/Reveal';
import { anchorClass } from './ui/SectionHeader';

/** The shared 60-minute event, the same link on every Leibinn site. VITE_CALENDLY_URL overrides it. */
const CALENDLY_URL =
  import.meta.env.VITE_CALENDLY_URL?.trim() || 'https://calendly.com/beratung-leibinn-consulting/60min';

const nextSteps = [
  ['Termin wählen', 'Ein Klick, keine Vorbereitung nötig.'],
  ['Gespräch führen', 'Wir klären Ausgangslage, Ziele und Teamgröße.'],
  ['Fahrplan erhalten', 'Sie wissen danach, welche Benefits sich für Sie lohnen.'],
];

export default function BookingSection() {
  const desktop = useIsDesktop();

  return (
    <section
      id="termin"
      tabIndex={-1}
      aria-labelledby="termin-title"
      className={cx(
        anchorClass,
        'mx-auto max-w-[1280px] px-3 py-[88px] sm:px-[clamp(24px,4vw,56px)] lg:py-[clamp(96px,10vw,144px)]'
      )}
    >
      <Reveal className="surface-dark rounded-[28px] bg-navy p-2.5 text-cream lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-[14px] lg:rounded-[32px] lg:p-[14px]">
        <div className="flex flex-col px-4 pb-[26px] pt-7 lg:px-10 lg:pb-10 lg:pt-12">
          <span className="text-[12px] font-semibold uppercase leading-none tracking-[0.08em] text-gold-light lg:text-[13px]">
            Erstgespräch
          </span>
          <h2
            id="termin-title"
            className="mt-5 text-[38px] font-medium leading-none tracking-[-0.045em] lg:mt-7 lg:text-balance lg:text-[clamp(40px,4vw,60px)]"
          >
            Lassen Sie uns Ihr Potenzial klären.
          </h2>
          <p className="mt-4 text-[16px] leading-[1.55] text-cream/72 lg:mt-[26px] lg:max-w-[440px] lg:text-[18px]">
            {desktop
              ? '60 Minuten per Video oder Telefon. Kostenfrei und unverbindlich, direkt mit Cedrik Leibinn.'
              : '60 Minuten per Video oder Telefon. Kostenfrei, direkt mit Cedrik Leibinn.'}
          </p>

          {desktop ? (
            <>
              <h3 className="mt-12 text-[17px] font-medium leading-none text-gold-light">Was als Nächstes passiert</h3>
              <ol className="mt-6 flex flex-col gap-6">
                {nextSteps.map(([title, text], i) => (
                  <li key={title} className="flex items-start gap-[18px]">
                    <span className="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-[14px] bg-cream text-[18px] font-medium leading-none text-navy">
                      {pad2(i + 1)}
                    </span>
                    <span className="flex flex-col gap-1.5 pt-1">
                      <span className="text-[19px] font-medium leading-[1.2]">{title}</span>
                      <span className="text-[15px] leading-[1.4] text-cream/62">{text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <ol aria-label="Was als Nächstes passiert" className="mt-6 grid grid-cols-3 gap-2">
              {nextSteps.map(([title], i) => (
                <li key={title} className="flex flex-col gap-2 rounded-[14px] bg-cream/6 px-2.5 py-[14px]">
                  <span className="text-[15px] font-medium leading-none text-gold-light">{pad2(i + 1)}</span>
                  <span className="text-[14px] font-medium leading-[1.25]">{title}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <BookingCard desktop={desktop} />
      </Reveal>
    </section>
  );
}

/** Calendly styled to the card: navy actions and text on the cream surface. */
function embedSrc(url: string) {
  const src = new URL(url);
  src.searchParams.set('embed_domain', window.location.hostname);
  src.searchParams.set('embed_type', 'Inline');
  // The card header already names the event, duration and format.
  src.searchParams.set('hide_event_type_details', '1');
  src.searchParams.set('hide_landing_page_details', '1');
  src.searchParams.set('hide_gdpr_banner', '1');
  src.searchParams.set('primary_color', '000022');
  src.searchParams.set('text_color', '000022');
  src.searchParams.set('background_color', 'f4f3ee');
  return src.toString();
}

/**
 * Calendly behind a click-to-load consent step, as on the other Leibinn sites:
 * nothing is requested from Calendly (USA) until the visitor clicks "Kalender laden".
 */
function BookingCard({ desktop }: { desktop: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState(700);

  useEffect(() => {
    if (!loaded) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      const data = e.data as { event?: string; payload?: { height?: string | number } };
      if (data?.event === 'calendly.page_height') {
        const h = parseInt(String(data.payload?.height ?? ''), 10);
        if (h > 0) setHeight(Math.max(h, 480));
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [loaded]);

  return (
    <div className="flex flex-col rounded-[20px] bg-cream px-4 py-[22px] text-navy lg:rounded-[24px] lg:p-[clamp(28px,3vw,44px)]">
      <div className="flex flex-col gap-2 lg:gap-2.5">
        <h3 className="text-[26px] font-medium leading-none tracking-[-0.04em] lg:text-[34px]">Termin wählen</h3>
        <span className="text-[14px] leading-[1.4] text-navy/60 lg:text-[15px]">
          60 Min. · Video oder Telefon · kostenfrei
        </span>
      </div>

      {loaded ? (
        <div className="-mx-3 mt-4 lg:mx-0 lg:mt-6">
          <iframe
            src={embedSrc(CALENDLY_URL)}
            title="Erstgespräch mit Cedrik Leibinn buchen"
            className="block w-full rounded-[14px] border-0"
            style={{ height }}
          />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-start justify-center gap-5 pb-2 pt-8 lg:pb-0 lg:pt-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold-light lg:h-16 lg:w-16">
            <Calendar size={desktop ? 26 : 24} />
          </span>
          <p className="text-[24px] font-medium leading-[1.1] tracking-[-0.03em] lg:text-[30px]">
            Termin direkt online wählen
          </p>
          <p className="max-w-[480px] text-[15px] leading-[1.6] text-navy/68 lg:text-[16px]">
            Die Terminbuchung läuft über Calendly. Erst mit Klick auf „Kalender laden“ wird der Kalender geladen; dabei
            werden Daten an Calendly LLC (USA) übertragen. Details in der{' '}
            <a href="/datenschutz" className="text-navy underline decoration-gold underline-offset-4 hover:text-gold-dark">
              Datenschutzerklärung
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="mt-1 flex h-[58px] w-full items-center justify-center gap-3 rounded-full bg-navy text-[17px] font-medium leading-none text-cream transition-colors hover:bg-navy-hover lg:h-[62px] lg:text-[18px]"
          >
            <Calendar size={18} className="text-gold-light" />
            Kalender laden
          </button>
          <span className="self-center text-center text-[13px] leading-[1.4] text-navy/50">
            {desktop
              ? 'Kostenfrei und unverbindlich. Ihre Daten nutzen wir nur für die Terminabstimmung.'
              : 'Kostenfrei und unverbindlich.'}
          </span>
        </div>
      )}
    </div>
  );
}
