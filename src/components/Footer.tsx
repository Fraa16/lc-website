import { useState, type FormEvent } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { submitCallback } from '../lib/callback';
import { cx } from '../lib/cx';
import { scrollToSection, type SectionId } from '../lib/scroll';
import { ArrowUpRight, Check } from './ui/icons';
import { Eyebrow } from './ui/SectionHeader';

const pageLinks: Array<[string, SectionId]> = [
  ['Herausforderung', 'herausforderung'],
  ['Das System', 'system'],
  ['Ablauf', 'ablauf'],
  ['FAQ', 'faq'],
];

const services = ['Gesundheitsleistungen', 'Vorsorge', 'Steuerliche Optimierung', 'Digitale Verwaltung'];

// TODO(rechtliches): /datenschutz follows once the shared services are decided.
const legalLinks = [
  ['Impressum', '/impressum'],
  ['Datenschutz', '/datenschutz'],
];

export default function Footer() {
  const desktop = useIsDesktop();
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark overflow-hidden bg-navy text-cream">
      <div className="mx-auto max-w-[1280px] px-5 pt-[72px] sm:px-[clamp(24px,4vw,56px)] lg:pt-[clamp(88px,9vw,120px)]">
        <div className="lg:grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start lg:gap-[clamp(40px,6vw,96px)] lg:border-b lg:border-cream/12 lg:pb-16">
          <div className="flex flex-col gap-[22px] lg:gap-7">
            <Eyebrow dark>{desktop ? 'Benefit-Beratung für Unternehmen' : 'Benefit-Beratung'}</Eyebrow>
            <h2 className="m-0 text-[56px] font-medium leading-[0.92] tracking-[-0.055em] lg:text-[clamp(56px,7vw,112px)]">
              Benefits,
              <br />
              die wirken.
            </h2>
            {desktop && (
              <p className="m-0 max-w-[520px] text-[18px] leading-[1.55] text-cream/70">
                Gesundheit, Vorsorge und Steuervorteile in einem System. Mit einem festen Ansprechpartner
                und einem klaren nächsten Schritt.
              </p>
            )}
          </div>

          <CallbackCard desktop={desktop} />
        </div>

        {desktop ? (
          <div className="grid grid-cols-3 border-b border-cream/12">
            <nav aria-label="Seite" className="flex flex-col items-start gap-4 py-11 pr-8">
              <ColumnTitle>01 / SEITE</ColumnTitle>
              {pageLinks.map(([label, id]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className="text-left text-[18px] leading-none text-cream transition-colors hover:text-gold-light"
                >
                  {label}
                </button>
              ))}
            </nav>
            <div className="flex flex-col gap-4 border-l border-cream/12 px-8 py-11 text-[18px] leading-none">
              <ColumnTitle>02 / LEISTUNGEN</ColumnTitle>
              {services.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="flex flex-col items-start gap-4 border-l border-cream/12 py-11 pl-8 text-[18px] leading-none">
              <ColumnTitle>03 / RECHTLICHES</ColumnTitle>
              {legalLinks.map(([label, href]) => (
                <a key={label} href={href} className="text-cream transition-colors hover:text-gold-light">
                  {label}
                </a>
              ))}
              <span className="text-[15px] text-cream/50">© {year} Leibinn Consulting</span>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 border-b border-cream/12 pb-9">
              <nav aria-label="Seite" className="flex flex-col items-start gap-1">
                <ColumnTitle mobile>SEITE</ColumnTitle>
                {pageLinks.map(([label, id]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className="h-10 text-left text-[17px] leading-none text-cream"
                  >
                    {label}
                  </button>
                ))}
              </nav>
              <div className="flex flex-col items-start gap-1">
                <ColumnTitle mobile>RECHTLICHES</ColumnTitle>
                {legalLinks.map(([label, href]) => (
                  <a key={label} href={href} className="flex h-10 items-center text-[17px] leading-none text-cream">
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div className="py-5 text-[13px] leading-none text-cream/50">© {year} Leibinn Consulting</div>
          </>
        )}

        <div aria-hidden="true" className="h-[76px] overflow-hidden sm:h-[15vw] lg:mt-10 lg:h-[clamp(120px,15vw,210px)]">
          <div className="whitespace-nowrap bg-[linear-gradient(180deg,#C9A65C_0%,rgba(182,143,64,0.35)_100%)] bg-clip-text text-[96px] font-semibold leading-[0.8] tracking-[-0.065em] text-transparent sm:text-[21vw] lg:text-[clamp(150px,21vw,300px)]">
            LEIBINN
          </div>
        </div>
      </div>
    </footer>
  );
}

function ColumnTitle({ children, mobile = false }: { children: string; mobile?: boolean }) {
  return (
    <span
      className={cx(
        'text-[13px] font-semibold leading-none tracking-[0.08em] text-gold-light',
        mobile ? 'mb-2 text-[12px]' : 'mb-1.5'
      )}
    >
      {children}
    </span>
  );
}

function CallbackCard({ desktop }: { desktop: boolean }) {
  const [tel, setTel] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending || tel.trim().length <= 5) return;
    setSending(true);
    setError(false);
    try {
      await submitCallback(tel);
      setSent(true);
    } catch (err) {
      console.error('Callback request failed', err);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-9 flex flex-col gap-4 rounded-[24px] bg-gold-gradient p-[22px] text-navy lg:mt-0 lg:gap-[22px] lg:rounded-[28px] lg:p-8">
      <div className="flex items-center justify-between text-[12px] font-semibold uppercase leading-none tracking-[0.08em] lg:text-[13px]">
        <span>Direkter Draht</span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="hidden h-2 w-2 rounded-full bg-navy lg:block" />
          Mo–Fr
        </span>
      </div>
      <h3 className="text-[26px] font-medium leading-[1.05] tracking-[-0.04em] lg:text-[32px]">
        Lieber erst kurz sprechen?
      </h3>

      {sent ? (
        <div
          role="status"
          className="flex h-14 items-center gap-3 rounded-full bg-cream px-[18px] text-[15px] font-medium leading-none lg:h-[60px] lg:px-[22px] lg:text-[16px]"
        >
          {desktop && <Check size={18} className="text-gold-dark" />}
          Danke, wir rufen Sie zurück.
        </div>
      ) : (
        <form
          noValidate
          onSubmit={onSubmit}
          className="flex h-14 items-center gap-2 rounded-full bg-cream pl-[18px] pr-[5px] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-navy lg:h-[60px] lg:gap-2.5 lg:pl-[22px] lg:pr-1.5"
        >
          <input
            type="tel"
            autoComplete="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder="Ihre Telefonnummer"
            aria-label="Telefonnummer für Rückruf"
            className="min-w-0 flex-1 border-0 bg-transparent text-[16px] leading-none text-navy outline-none focus-visible:outline-none"
          />
          <button
            type="submit"
            aria-busy={sending}
            className="h-[46px] flex-none rounded-full bg-navy px-4 text-[12px] font-semibold leading-none tracking-[0.08em] text-cream transition-colors hover:bg-navy-hover lg:h-12 lg:px-5 lg:text-[13px]"
          >
            RÜCKRUF
          </button>
        </form>
      )}
      {error && (
        <p role="alert" className="-mt-1 text-[14px] leading-[1.4]">
          Es gab einen Fehler beim Absenden des Formulars. Bitte versuchen Sie es erneut.
        </p>
      )}

      {desktop && (
        <button
          type="button"
          onClick={() => scrollToSection('termin')}
          className="flex h-[60px] items-center justify-between rounded-full border border-navy/30 px-[22px] text-[16px] font-medium leading-none text-navy transition-colors hover:bg-navy/6"
        >
          Erstgespräch online buchen
          <ArrowUpRight className="text-navy" />
        </button>
      )}
    </div>
  );
}
