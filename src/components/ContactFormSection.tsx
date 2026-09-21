import { useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import Container from './ui/Container';
import Reveal from './ui/Reveal';
import { Honeypot, SelectField, TextField } from './ui/Field';
import { GENERIC_SUBMIT_ERROR, isValidEmail, orNull, submitContact } from '../lib/contact';

const employeeOptions = [
  { value: '1-3', label: '1-3' },
  { value: '3-10', label: '3-10' },
  { value: '10-25', label: '10-25' },
  { value: '25-50', label: '25-50' },
  { value: '50+', label: '50+' },
];

const emptyForm = {
  vorname: '',
  nachname: '',
  email: '',
  telefon: '',
  firma: '',
  mitarbeiteranzahl: '',
};

type FieldErrors = Partial<Record<'vorname' | 'nachname' | 'email' | 'firma', string>>;

export default function ContactFormSection() {
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

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!formData.vorname.trim()) next.vorname = 'Bitte geben Sie Ihren Vornamen an.';
    if (!formData.nachname.trim()) next.nachname = 'Bitte geben Sie Ihren Nachnamen an.';
    if (!formData.email.trim()) next.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.';
    else if (!isValidEmail(formData.email)) next.email = 'Diese E-Mail-Adresse scheint nicht zu stimmen.';
    if (!formData.firma.trim()) next.firma = 'Bitte geben Sie Ihr Unternehmen an.';
    return next;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first problem instead of leaving the visitor to
      // hunt for a red outline.
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    // Silently accept-and-drop bot submissions.
    if (honeypot.trim() !== '') {
      setIsDone(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitContact({
        vorname: formData.vorname.trim(),
        nachname: orNull(formData.nachname),
        email: formData.email.trim(),
        telefon: orNull(formData.telefon),
        firma: orNull(formData.firma),
        mitarbeiteranzahl: orNull(formData.mitarbeiteranzahl),
        source: 'contact_form',
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
    <section id="contact-form-section" className="bg-navy py-section">
      <Container size="prose">
        <Reveal className="text-center">
          <h2 className="text-display-md text-sheet-1">
            Jetzt kostenlose Benefit-Analyse vereinbaren
          </h2>
          <p className="mx-auto mt-4 max-w-measure-sm text-body-lg text-sheet-2">
            Wir kontaktieren Sie innerhalb von 24 Stunden
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy-raised p-6 sm:p-9 lc-shadow-dark-2">
            <div
              aria-hidden="true"
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/50 to-transparent"
            />

            {isDone ? (
              /* A persistent confirmation panel. The old build showed a
                 banner that removed itself after five seconds, so a visitor
                 who looked away had no evidence the form had been sent. */
              <div
                ref={confirmationRef}
                tabIndex={-1}
                role="status"
                className="flex flex-col items-center py-8 text-center focus:outline-none"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 ring-1 ring-inset ring-success/30">
                  <CheckCircle2 className="h-7 w-7 text-success" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <p className="mt-5 font-display text-display-sm text-sheet-1">
                  Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt.
                </p>
                <p className="mt-3 max-w-measure-sm text-body-sm text-sheet-3">
                  Wir kontaktieren Sie innerhalb von 24 Stunden
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="relative">
                <Honeypot value={honeypot} onChange={setHoneypot} />

                <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                  <TextField
                    id="contact-vorname"
                    name="vorname"
                    label="Vorname"
                    required
                    autoComplete="given-name"
                    placeholder="Max"
                    value={formData.vorname}
                    error={errors.vorname}
                    onChange={(event) => setField('vorname')(event.target.value)}
                  />
                  <TextField
                    id="contact-nachname"
                    name="nachname"
                    label="Nachname"
                    required
                    autoComplete="family-name"
                    placeholder="Mustermann"
                    value={formData.nachname}
                    error={errors.nachname}
                    onChange={(event) => setField('nachname')(event.target.value)}
                  />
                  <TextField
                    id="contact-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    label="E-Mail Adresse"
                    required
                    autoComplete="email"
                    placeholder="max.mustermann@firma.de"
                    value={formData.email}
                    error={errors.email}
                    onChange={(event) => setField('email')(event.target.value)}
                  />
                  <TextField
                    id="contact-telefon"
                    name="telefon"
                    type="tel"
                    inputMode="tel"
                    label="Telefonnummer"
                    autoComplete="tel"
                    placeholder="+49 123 456789"
                    value={formData.telefon}
                    onChange={(event) => setField('telefon')(event.target.value)}
                  />
                  <TextField
                    id="contact-firma"
                    name="firma"
                    label="Firma"
                    required
                    autoComplete="organization"
                    placeholder="Muster GmbH"
                    value={formData.firma}
                    error={errors.firma}
                    onChange={(event) => setField('firma')(event.target.value)}
                  />
                  <SelectField
                    id="contact-mitarbeiteranzahl"
                    name="mitarbeiteranzahl"
                    label="Mitarbeiteranzahl"
                    placeholder="Bitte auswählen"
                    options={employeeOptions}
                    value={formData.mitarbeiteranzahl}
                    onChange={(event) => setField('mitarbeiteranzahl')(event.target.value)}
                  />
                </div>

                {submitError && (
                  <p
                    role="alert"
                    className="mt-5 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-body-sm text-danger"
                  >
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-gradient bg-[length:200%_100%] bg-left px-7 py-4 text-body-lg font-semibold text-navy shadow-[0_2px_10px_rgb(182_143_64_/_0.28)] transition-[background-position,transform,box-shadow] duration-300 ease-brand hover:bg-right hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgb(182_143_64_/_0.38)] disabled:pointer-events-none disabled:opacity-60"
                >
                  {isSubmitting && (
                    <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} aria-hidden="true" />
                  )}
                  {isSubmitting ? 'Wird gesendet...' : 'Jetzt kostenlose Analyse anfragen'}
                </button>

                <p className="mt-4 flex items-center justify-center gap-2 text-caption text-sheet-3">
                  <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  Mit dem Absenden akzeptieren Sie unsere Datenschutzbestimmungen
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
