import { useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import lcLogo from '../images/lc-logo-lang-420.webp';
import Container from './ui/Container';
import Eyebrow from './ui/Eyebrow';
import Reveal from './ui/Reveal';
import { Honeypot, TextField } from './ui/Field';
import { GENERIC_SUBMIT_ERROR, isValidEmail, orNull, submitContact } from '../lib/contact';
import { scrollToId } from '../lib/motion';

const emptyForm = { name: '', email: '', telefon: '' };
type FieldErrors = Partial<Record<'name' | 'email', string>>;

const footerNav = [
  { label: 'Herausforderung', id: 'problem-section' },
  { label: 'Das System', id: 'benefit-system' },
  { label: 'Umsetzung', id: 'implementation' },
  { label: 'FAQ', id: 'faq-section' },
];

export default function FooterCTASection() {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const confirmationRef = useRef<HTMLDivElement>(null);

  const setField = (name: keyof typeof emptyForm) => (value: string) => {
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setSubmitError(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Bitte geben Sie Ihren Namen an.';
    if (!formData.email.trim()) nextErrors.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.';
    else if (!isValidEmail(formData.email))
      nextErrors.email = 'Diese E-Mail-Adresse scheint nicht zu stimmen.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(`footer-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }

    if (honeypot.trim() !== '') {
      setIsDone(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const [vorname, ...rest] = formData.name.trim().split(/\s+/);

    try {
      /* firma and source are what broke this form before: `source` did not
         exist on the table at all and `firma` was NOT NULL, so every single
         submission was rejected. See migration 20260921120000. */
      await submitContact({
        vorname,
        nachname: rest.length > 0 ? rest.join(' ') : null,
        email: formData.email.trim(),
        telefon: orNull(formData.telefon),
        firma: null,
        mitarbeiteranzahl: null,
        source: 'cta_footer_b2b',
      });

      setFormData(emptyForm);
      setIsDone(true);
      window.requestAnimationFrame(() => confirmationRef.current?.focus());
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : GENERIC_SUBMIT_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="bg-navy py-section">
      <Container>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16">
            {/* --- Pitch --- */}
            <div>
              <Eyebrow>Jetzt beraten lassen</Eyebrow>

              <h2 className="mt-7 max-w-[18ch] text-display-lg text-sheet-1">
                Starten Sie jetzt Ihr funktionierendes Benefit-System.
              </h2>

              <p className="mt-6 max-w-measure text-lead text-sheet-2">
                Wir zeigen Ihnen, wie wir Ihre Benefits so strukturieren, dass sie
                messbar wirken – für Mitarbeitende, HR und Geschäftsführung.
              </p>

              <button
                type="button"
                onClick={() => scrollToId('contact-form-section')}
                className="mt-9 inline-flex items-center justify-center rounded-full bg-gold-gradient bg-[length:200%_100%] bg-left px-7 py-4 text-body-lg font-semibold text-navy shadow-[0_2px_10px_rgb(182_143_64_/_0.3)] transition-[background-position,transform,box-shadow] duration-300 ease-brand hover:bg-right hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(182_143_64_/_0.4)]"
              >
                Jetzt Benefit-Analyse anfragen
              </button>
            </div>

            {/* --- Quick contact --- */}
            <div className="rounded-3xl bg-navy-2 p-7 ring-1 ring-inset ring-white/8 sm:p-8">
              {isDone ? (
                <div
                  ref={confirmationRef}
                  tabIndex={-1}
                  role="status"
                  className="flex flex-col items-center py-8 text-center focus:outline-none"
                >
                  <CheckCircle2 className="h-9 w-9 text-success" strokeWidth={1.75} aria-hidden="true" />
                  <p className="mt-4 text-body-lg text-sheet-1">
                    Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-display-sm text-sheet-1">Schnellkontakt</h3>

                  <form onSubmit={handleSubmit} noValidate className="relative mt-6 flex flex-col gap-4">
                    <Honeypot value={honeypot} onChange={setHoneypot} />

                    <TextField
                      id="footer-name"
                      name="name"
                      label="Ihr Name"
                      required
                      autoComplete="name"
                      placeholder="Max Mustermann"
                      value={formData.name}
                      error={errors.name}
                      onChange={(event) => setField('name')(event.target.value)}
                    />
                    <TextField
                      id="footer-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      label="Ihre E-Mail"
                      required
                      autoComplete="email"
                      placeholder="max.mustermann@firma.de"
                      value={formData.email}
                      error={errors.email}
                      onChange={(event) => setField('email')(event.target.value)}
                    />
                    <TextField
                      id="footer-telefon"
                      name="telefon"
                      type="tel"
                      inputMode="tel"
                      label="Telefonnummer"
                      autoComplete="tel"
                      placeholder="+49 123 456789"
                      value={formData.telefon}
                      onChange={(event) => setField('telefon')(event.target.value)}
                    />

                    {submitError && (
                      <p role="alert" className="text-caption text-danger">
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient bg-[length:200%_100%] bg-left px-6 py-3.5 text-body-sm font-semibold text-navy transition-[background-position,transform] duration-300 ease-brand hover:bg-right hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} aria-hidden="true" />
                      ) : (
                        <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                      )}
                      {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Site footer. Its own export so it can sit outside <main> — the page footer
 * is not part of the document's main content.
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-1 pt-14">
      <Container>
        <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-14">
          <div>
            <img
              src={lcLogo}
              alt="Leibinn Consulting"
              width={420}
              height={61}
              loading="lazy"
              decoding="async"
              className="h-7 w-auto"
            />
            <p className="mt-5 max-w-measure-sm text-body-sm text-sheet-3">
              Strukturierte Benefit- &amp; Vorsorgekonzepte für Unternehmen
            </p>
          </div>

          <nav aria-label="Footer-Navigation">
            <span className="lc-index text-meta uppercase text-gold">01 / Navigation</span>
            <ul className="mt-5 space-y-1">
              {footerNav.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(item.id)}
                    className="inline-flex min-h-[2.5rem] items-center text-body-sm text-sheet-2 transition-colors duration-200 hover:text-gold-light"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <span className="lc-index text-meta uppercase text-gold">02 / Rechtliches</span>
            {/* NOTE: /impressum and /datenschutz do not exist yet. Both are
                legally required for a German commercial site (§5 DDG and
                Art. 13 GDPR) and must be built before launch. */}
            <ul className="mt-5 space-y-1">
              <li>
                <a
                  href="/datenschutz"
                  className="inline-flex min-h-[2.5rem] items-center text-body-sm text-sheet-2 underline-offset-4 transition-colors duration-200 hover:text-gold-light hover:underline"
                >
                  Datenschutz
                </a>
              </li>
              <li>
                <a
                  href="/impressum"
                  className="inline-flex min-h-[2.5rem] items-center text-body-sm text-sheet-2 underline-offset-4 transition-colors duration-200 hover:text-gold-light hover:underline"
                >
                  Impressum
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-caption text-sheet-3">
          © {currentYear} Leibinn Consulting. Alle Rechte vorbehalten.
        </p>
      </Container>

      {/* Oversized wordmark, cropped by the viewport edge — the reference
          closes on the same move. Purely decorative: the name is already
          announced by the logo above. */}
      <div
        aria-hidden="true"
        className="pointer-events-none mt-12 h-[clamp(2.75rem,7.2vw,7rem)] select-none overflow-hidden"
      >
        <span className="block whitespace-nowrap text-center font-display text-[clamp(3.5rem,12vw,12rem)] font-bold leading-[0.82] tracking-[-0.045em] text-gold/[0.14]">
          Leibinn Consulting
        </span>
      </div>
    </footer>
  );
}
