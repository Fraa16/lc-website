import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { useIsDesktop } from '../hooks/useMediaQuery';
import { EMAIL_PATTERN, submitBooking, useAvailability, type MeetingMode } from '../lib/booking';
import { cx } from '../lib/cx';
import { pad2 } from '../lib/format';
import { ArrowUpRight, Check } from './ui/icons';
import { Reveal } from './ui/Reveal';
import { anchorClass } from './ui/SectionHeader';

const nextSteps = [
  ['Termin wählen', 'Ein Klick, keine Vorbereitung nötig.'],
  ['Gespräch führen', 'Wir klären Ausgangslage, Ziele und Teamgröße.'],
  ['Fahrplan erhalten', 'Sie wissen danach, welche Benefits sich für Sie lohnen.'],
];

interface Fields {
  name: string;
  email: string;
  tel: string;
  firma: string;
}

const emptyFields: Fields = { name: '', email: '', tel: '', firma: '' };

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
              ? '30 Minuten per Video oder Telefon. Kostenfrei und unverbindlich, direkt mit Cedrik Leibinn.'
              : '30 Minuten per Video oder Telefon. Kostenfrei, direkt mit Cedrik Leibinn.'}
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

function BookingCard({ desktop }: { desktop: boolean }) {
  const { days, times, weekLabel, isFree } = useAvailability();
  const [mode, setMode] = useState<MeetingMode>('video');
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [showErrors, setShowErrors] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [done, setDone] = useState(false);

  const nameOk = fields.name.trim().length > 0;
  const emailOk = EMAIL_PATTERN.test(fields.email);
  const ready = day !== null && slot !== null && nameOk && emailOk;

  const buttonLabel =
    day === null
      ? 'Tag wählen'
      : !slot
        ? 'Uhrzeit wählen'
        : ready
          ? 'Termin verbindlich buchen'
          : 'Name und E-Mail ergänzen';

  const onField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!ready) {
      setShowErrors(true);
      return;
    }
    setSending(true);
    setSendError(false);
    try {
      await submitBooking({
        name: fields.name,
        email: fields.email,
        telefon: fields.tel,
        firma: fields.firma,
        mode,
        day: days[day],
        time: slot,
      });
      setDone(true);
    } catch (err) {
      console.error('Booking request failed', err);
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setDone(false);
    setSlot(null);
    setShowErrors(false);
  };

  const inputClass = (invalid: boolean) =>
    cx(
      'h-[52px] w-full min-w-0 rounded-[14px] border bg-cream-light px-4 text-[16px] leading-none text-navy outline-none transition-colors focus:border-navy/40 lg:h-[54px] lg:px-[18px]',
      invalid ? 'border-error' : 'border-navy/14'
    );

  if (done && day !== null && slot) {
    return (
      <div className="flex flex-col rounded-[20px] bg-cream px-4 py-[22px] text-navy lg:rounded-[24px] lg:p-[clamp(28px,3vw,44px)]">
        <div
          role="status"
          className="flex flex-1 flex-col justify-center gap-[18px] py-4 lg:gap-[22px] lg:py-6"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-gold-light lg:h-16 lg:w-16">
            <Check size={desktop ? 26 : 24} strokeWidth={1.6} />
          </span>
          <span className="text-[38px] font-medium leading-none tracking-[-0.05em] lg:text-[52px]">
            Ihr Termin steht.
          </span>
          <span className="max-w-[480px] text-[16px] leading-[1.55] text-navy/68 lg:text-[18px]">
            {days[day].long}, {slot} Uhr per {mode === 'video' ? 'Video-Call' : 'Telefon'}. Die Bestätigung geht
            an {fields.email}.
          </span>
          <div>
            <button
              type="button"
              onClick={reset}
              className="h-[50px] w-full rounded-full border border-navy/20 px-[22px] text-[15px] font-medium leading-none text-navy transition-colors hover:bg-navy/5 lg:w-auto"
            >
              Anderen Termin wählen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="booking-title"
      className="flex flex-col gap-5 rounded-[20px] bg-cream px-4 py-[22px] text-navy lg:gap-[26px] lg:rounded-[24px] lg:p-[clamp(28px,3vw,44px)]"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:flex-wrap lg:items-start lg:justify-between lg:gap-4">
        <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-2.5">
          <span
            id="booking-title"
            className="text-[26px] font-medium leading-none tracking-[-0.04em] lg:text-[34px]"
          >
            Termin wählen
          </span>
          <span className="text-[14px] leading-none text-navy/60 lg:text-[15px] lg:leading-[1.4]">
            {desktop ? 'Freie Termine der nächsten Woche' : weekLabel}
          </span>
        </div>
        <div
          role="group"
          aria-label="Gesprächsart"
          className="grid grid-cols-2 gap-1 rounded-full border border-navy/12 p-1"
        >
          {(['video', 'phone'] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={cx(
                'h-11 rounded-full text-[15px] font-medium leading-none transition-colors lg:h-[38px] lg:px-[18px] lg:text-[14px]',
                mode === m ? 'bg-navy text-cream' : 'text-navy hover:bg-navy/5'
              )}
            >
              {m === 'video' ? 'Video' : 'Telefon'}
            </button>
          ))}
        </div>
      </div>

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="sr-only">Tag</legend>
        <div className="grid min-w-0 grid-cols-5 gap-1.5 lg:gap-2">
          {days.map((d, i) => {
            const active = day === i;
            return (
              <button
                key={d.iso}
                type="button"
                aria-pressed={active}
                aria-label={d.long}
                onClick={() => {
                  setDay(i);
                  setSlot(null);
                }}
                className={cx(
                  'flex h-16 flex-col items-center justify-center gap-[5px] rounded-[14px] border p-0 transition-colors lg:h-[72px] lg:gap-1.5 lg:rounded-2xl',
                  active ? 'border-navy bg-navy text-cream' : 'border-navy/12 bg-cream-light text-navy hover:border-navy/30'
                )}
              >
                <span className="text-[11px] font-semibold leading-none tracking-[0.08em] opacity-70 lg:text-[12px]">
                  {d.weekday}
                </span>
                <span className="text-[17px] font-medium leading-none lg:text-[20px] lg:tracking-[-0.02em]">
                  {desktop ? d.label : d.dayOfMonth}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="sr-only">Uhrzeit</legend>
        <div className="grid grid-cols-3 gap-1.5 lg:grid-cols-[repeat(auto-fill,minmax(76px,1fr))] lg:gap-2">
          {times.map((t, i) => {
            const free = day === null || isFree(day, i);
            const active = slot === t;
            return (
              <button
                key={t}
                type="button"
                disabled={!free}
                aria-pressed={active}
                aria-disabled={day === null || undefined}
                aria-label={free ? `${t} Uhr` : `${t} Uhr, belegt`}
                onClick={() => day !== null && setSlot(t)}
                className={cx(
                  'h-[46px] rounded-full border text-[15px] font-medium leading-none transition-colors lg:h-12',
                  active && 'border-navy bg-navy text-gold-light',
                  !active && free && 'border-navy/12 bg-cream-light text-navy hover:border-navy/30',
                  !free && 'cursor-not-allowed border-navy/6 bg-transparent text-navy/30 line-through'
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-[14px]">
        <Field label="Name *" htmlFor="booking-name">
          <input
            id="booking-name"
            name="name"
            autoComplete="name"
            required
            value={fields.name}
            onChange={onField}
            placeholder="Vor- und Nachname"
            aria-invalid={showErrors && !nameOk}
            className={inputClass(showErrors && !nameOk)}
          />
        </Field>
        <Field label="E-Mail *" htmlFor="booking-email">
          <input
            id="booking-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={onField}
            placeholder="name@unternehmen.de"
            aria-invalid={showErrors && !emailOk}
            className={inputClass(showErrors && !emailOk)}
          />
        </Field>
        <Field label="Telefon" htmlFor="booking-tel">
          <input
            id="booking-tel"
            name="tel"
            type="tel"
            autoComplete="tel"
            value={fields.tel}
            onChange={onField}
            placeholder="+49"
            className={inputClass(false)}
          />
        </Field>
        {desktop && (
          <Field label="Unternehmen" htmlFor="booking-firma">
            <input
              id="booking-firma"
              name="firma"
              autoComplete="organization"
              value={fields.firma}
              onChange={onField}
              placeholder="Firmenname"
              className={inputClass(false)}
            />
          </Field>
        )}
      </div>

      <button
        type="submit"
        aria-busy={sending}
        className={cx(
          'flex h-[58px] items-center justify-center gap-3 rounded-full bg-navy text-[17px] font-medium leading-none text-cream transition-[background-color,opacity] hover:bg-navy-hover lg:h-[62px] lg:text-[18px]',
          ready && !sending ? 'opacity-100' : 'opacity-55'
        )}
      >
        {buttonLabel}
        <ArrowUpRight size={15} className="hidden text-gold-light lg:block" />
      </button>

      {sendError && (
        <p role="alert" className="-mt-2 text-center text-[14px] leading-[1.4] text-error">
          Es gab einen Fehler beim Absenden des Formulars. Bitte versuchen Sie es erneut.
        </p>
      )}

      <span className="text-center text-[13px] leading-[1.4] text-navy/50">
        {desktop
          ? 'Kostenfrei und unverbindlich. Ihre Daten nutzen wir nur für die Terminabstimmung.'
          : 'Kostenfrei und unverbindlich.'}
      </span>
    </form>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[14px] font-medium leading-none text-navy/66">
        {label}
      </label>
      {children}
    </div>
  );
}
