import { useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import lcLogoDark from '../images/lc-logo-lang-420-dark.webp';
import Container from './ui/Container';
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
    <section id="kontakt" className="relative z-10 on-light pt-section">
      {/* The ground is painted by a layer that stops --overlap short of the
          bottom, so the footer (pulled up by the same amount) shows through
          behind the card. Painting it on the section itself covered the
          overlap and the effect did nothing. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[var(--overlap)] top-0 bg-cream-sunken"
      />

      <Container className="relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-7 py-12 lc-shadow-4 sm:px-10 md:px-12 md:py-14 lg:px-14">
            <div
              aria-hidden="true"
              className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/50 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
            />

            <div className="relative grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-12 lg:gap-16">
              {/* --- Pitch --- */}
              <div className="flex flex-col items-start">
                <span className="inline-flex items-center gap-3 text-eyebrow uppercase text-gold-light">
                  <span aria-hidden="true" className="h-px w-10 rounded-full bg-gold" />
                  Jetzt beraten lassen
                </span>

                <h2 className="mt-6 max-w-[16ch] text-display-md text-sheet-1">
                  Starten Sie jetzt Ihr funktionierendes Benefit-System.
                </h2>

                <p className="mt-5 max-w-measure text-body-lg text-sheet-2">
                  Wir zeigen Ihnen, wie wir Ihre Benefits so strukturieren, dass
                  sie messbar wirken – für Mitarbeitende, HR und Geschäftsführung.
                </p>

                <button
                  type="button"
                  onClick={() => scrollToId('contact-form-section')}
                  className="mt-8 inline-flex items-center justify-center rounded-xl bg-gold-gradient bg-[length:200%_100%] bg-left px-7 py-4 text-body-lg font-semibold text-navy shadow-[0_2px_10px_rgb(182_143_64_/_0.3)] transition-[background-position,transform,box-shadow] duration-300 ease-brand hover:bg-right hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(182_143_64_/_0.4)]"
                >
                  Jetzt Benefit-Analyse anfragen
                </button>
              </div>

              {/* --- Quick contact --- */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                {isDone ? (
                  <div
                    ref={confirmationRef}
                    tabIndex={-1}
                    role="status"
                    className="flex flex-col items-center py-6 text-center focus:outline-none"
                  >
                    <CheckCircle2
                      className="h-9 w-9 text-success"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-body-sm text-sheet-1">
                      Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-title-lg font-semibold text-sheet-1">Schnellkontakt</h3>

                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="relative mt-5 flex flex-col gap-4"
                    >
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
                        className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gold-gradient bg-[length:200%_100%] bg-left px-5 py-3 text-body-sm font-semibold text-navy transition-[background-position,transform] duration-300 ease-brand hover:bg-right hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <Loader2
                            className="h-4 w-4 animate-spin"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/**
 * Site footer.
 *
 * Its own export so it can sit outside <main> — the page footer is not part
 * of the document's main content.
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    /* The overlap is a fixed token rather than a negative margin tuned to one
       card height, so the footer can't drift when the card above it reflows. */
    <footer className="on-light relative z-0 -mt-[var(--overlap)] rounded-t-3xl bg-footer-blue pb-10 pt-[calc(var(--overlap)+3.5rem)]">
      <Container>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          <div>
            {/* Navy variant: the standard mark is white and effectively
                invisible on the footer's light blue. */}
            <img
              src={lcLogoDark}
              alt="Leibinn Consulting"
              width={420}
              height={61}
              loading="lazy"
              decoding="async"
              className="h-7 w-auto"
            />
            <p className="mt-4 max-w-measure-sm text-body-sm text-ink-2">
              Strukturierte Benefit- &amp; Vorsorgekonzepte für Unternehmen
            </p>
          </div>

          <nav aria-label="Footer-Navigation" className="md:justify-self-end">
            <ul className="grid grid-cols-2 gap-x-10">
              {footerNav.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(item.id)}
                    className="inline-flex min-h-[2.75rem] items-center text-body-sm text-ink-2 transition-colors duration-200 hover:text-ink-1"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-1 border-t border-navy/10 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-caption text-ink-3">
            © {currentYear} Leibinn Consulting. Alle Rechte vorbehalten.
          </p>

          {/* NOTE: /impressum and /datenschutz do not exist yet. Both are
              legally required for a German commercial site (§5 DDG and
              Art. 13 GDPR) and must be built before launch. */}
          <ul className="flex flex-wrap gap-6">
            <li>
              <a
                href="/datenschutz"
                className="inline-flex min-h-[2.75rem] items-center text-caption text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-ink-1 hover:underline"
              >
                Datenschutz
              </a>
            </li>
            <li>
              <a
                href="/impressum"
                className="inline-flex min-h-[2.75rem] items-center text-caption text-ink-2 underline-offset-4 transition-colors duration-200 hover:text-ink-1 hover:underline"
              >
                Impressum
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
